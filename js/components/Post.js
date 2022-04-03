import React from 'react';
import {
    View,
    Text,
    Image
}
    from 'react-native';
import Styles from '../../StyleSheet';
import YoutubeVideo from './YoutubeVideo';
import UIIconButton from './UIIconButton';

interface PostProperties
{
    author: string,
    posting: string,
    url: string,
    image: string,
    onPressComment: event,
    onPressLike: event
}

const Post = (props: PostProperties) => {
    let video = CreateYoutubeVideo(props.url);

    return (
        <View style={[props.style, Styles.postings.post]}>
            <View style={[Styles.postings.profilePicContainer, Styles.postings.leftSide]}>
                <Image
                    source={require('../../res/avatar.png')}
                    style={Styles.postings.profilePic}/>
            </View>
            <View style={Styles.postings.rightSide}>
                <Text style={Styles.postings.author}>{props.author}</Text>
                <Text style={Styles.postings.posting}>{props.posting}</Text>
                {
                    props.image !==  undefined &&(
                            <Image source={{uri: props.image}}
                                   resizeMode="stretch"
                                   style={[Styles.mediaContainer, Styles.field]}/>
                    )
                }
                {
                    video !== undefined && (
                        <View style={[Styles.field, Styles.mediaContainer]}>
                            {video}
                        </View>
                    )
                }
                <View style={[Styles.itemRow, Styles.field]}>
                    <UIIconButton style={{paddingRight: 10}} icon="comment-multiple" size={22} disabled={false} onClick={props.onPressComment}/>
                    <UIIconButton icon="cards-heart" size={22} disabled={false} onClick={props.onPressLike}/>
                </View>
            </View>
        </View>
    );
}

function CreateYoutubeVideo(url)
{
    if(url)
    {
        return (
            <YoutubeVideo videoLink={url}/>
        );
    }

    return undefined;
}

export default Post;

