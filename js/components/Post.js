import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
}
    from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../../StyleSheet';
import YoutubeVideo from './YoutubeVideo';

interface PostProperties
{
    author: string,
    posting: string,
    url: string,
    onPressComment: event,
    onPressLike: event
}

const Post = (props: PostProperties) => {

    let video = CreateYoutubeVideo(props.url);

    return (
        <View style={styles.post}>
            <View style={[styles.profilePicContainer, styles.leftSide]}>
                <Image
                    source={require('./avatar.png')}
                    style={styles.profilePic}/>
            </View>
            <View style={styles.rightSide}>
                <Text style={styles.author}>{props.author}</Text>
                <Text style={styles.posting}>{props.posting}</Text>
                {
                    video !== undefined && (
                        <View style={Styles.field}>
                            {video}
                        </View>
                    )
                }
                <View style={[styles.itemRow, Styles.field]}>
                    <TouchableOpacity
                        style={[Styles.buttonContainer, styles.postMenuItem]}
                        onPress={props.onPressComment}>
                        <MaterialCommunityIcons
                            name="comment-multiple"
                            style={Styles.button}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[Styles.buttonContainer, styles.postMenuItem]}
                        onPress={props.onPressLike}>
                        <MaterialCommunityIcons
                            name="cards-heart"
                            style={Styles.button}/>
                    </TouchableOpacity>
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
    itemRow: {
        flexDirection: 'row',
    },
    postMenuItem: {
        marginRight: 5,
        marginBottom: 3
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
        width: '13%',
    },
    rightSide: {
        width: '87%',
        paddingLeft: 5
    }
});

export default Post;

