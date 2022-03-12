import React, {useContext, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
}
    from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../../StyleSheet';
import YoutubeVideo from './YoutubeVideo';
import UIButton from './UIButton';
import {UserContext} from '../context/UserContext';

interface DetailPostProperties
{
    isMain: boolean,
    author: string,
    posting: string,
    url: string,
    image: string,
    onPressEdit: event,
    onPressDelete: event
}

const CommentPosting = (props: DetailPostProperties) => {

    let video = CreateYoutubeVideo(props.url);

    const userContext = useContext(UserContext);

    let isEditable = props.author === userContext.currentUser.userName;

    return (
        <View style={Styles.postings.post}>
            <View style={Styles.postings.leftSide}>
                {
                    props.isMain && (
                        <UIButton size="iconpreview" disabled={false} onClick={() => console.log("Return")}>
                            <MaterialCommunityIcons
                                name="keyboard-return" style={{fontSize: 20}}/>
                        </UIButton>
                    )
                }
                {
                    !props.isMain && (
                        <View style={Styles.postings.profilePicContainer}>
                            <Image
                                source={require('../../res/avatar.png')}
                                style={Styles.postings.profilePic}/>
                        </View>
                    )
                }
            </View>
            <View style={Styles.postings.rightSide}>
                <Text style={props.isMain ? Styles.postings.authorMainPost : Styles.postings.author}>{props.author}</Text>
                <Text style={props.isMain ? Styles.postings.postingMainPost : Styles.postings.posting}>{props.posting}</Text>
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
                {
                    isEditable && (
                        <View style={[Styles.itemRow, Styles.field]}>
                            <UIButton size="iconpreview" disabled={false} onClick={props.onPressComment}>
                                <MaterialCommunityIcons
                                    name="pencil-outline" style={{fontSize: 20}}/>
                            </UIButton>
                            <UIButton size="iconpreview" disabled={false} onClick={props.onPressLike}>
                                <MaterialCommunityIcons
                                    name="delete-forever" style={{fontSize: 20}}/>
                            </UIButton>
                        </View>
                    )
                }
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

export default CommentPosting;

