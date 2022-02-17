import React, { useState } from 'react';
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
        <View style={styles.post}>
            <View style={[styles.profilePicContainer, styles.leftSide]}>
                <Image
                    source={require('../../res/avatar.png')}
                    style={styles.profilePic}/>
            </View>
            <View style={styles.rightSide}>
                <Text style={styles.author}>{props.author}</Text>
                <Text style={styles.posting}>{props.posting}</Text>
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
                  <UIButton size="iconmedium" disabled={false} onClick={props.onPressComment}>
                      <MaterialCommunityIcons
                          name="comment-multiple"/>
                  </UIButton>
                    <UIButton size="iconmedium" disabled={false} onClick={props.onPressLike}>
                        <MaterialCommunityIcons
                            name="cards-heart"/>
                    </UIButton>
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

const styles = StyleSheet.create({
    post: {
        alignSelf: 'center',
        width: '100%',
        padding: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1
    },
    posting: {
        fontSize: 15,
        fontWeight: "400",
        color: '#000000'
    },
    author: {
        fontSize: 17,
        fontWeight: "700",
        color: '#000000'
    },
    profilePicContainer: {
        flexShrink: 1,
        padding: 10,
        borderRadius: 21,
        margin: 5,
        backgroundColor: "#4A0080",
        alignItems: 'center',
        height: 35
    },
    profilePic: {
        width: 23,
        height: 23
    },
    leftSide: {
        width: '12%',
    },
    rightSide: {
        width: '88%',
        paddingLeft: 5
    }
});

export default Post;

