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

const DetailPost = (props: DetailPostProperties) => {

    let video = CreateYoutubeVideo(props.url);

    const userContext = useContext(UserContext);

    let isEditable = props.author === userContext.currentUser.userName;

    return (
        <View style={styles.post}>
            <View style={[styles.leftSide]}>
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
                        <View style={styles.profilePicContainer}>
                            <Image
                                source={require('../../res/avatar.png')}
                                style={styles.profilePic}/>
                        </View>
                    )
                }
            </View>
            <View style={styles.rightSide}>
                <Text style={props.isMain ? styles.author : styles.author2}>{props.author}</Text>
                <Text style={props.isMain ? styles.posting : styles.posting2}>{props.posting}</Text>
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
    posting2: {
        fontSize: 15,
        fontWeight: "400",
        color: '#000000'
    },
    author2: {
        fontSize: 17,
        fontWeight: "700",
        color: '#000000'
    },
    posting: {
        fontSize: 17,
        fontWeight: "500",
        color: '#000000'
    },
    author: {
        fontSize: 19,
        fontWeight: "800",
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

export default DetailPost;

