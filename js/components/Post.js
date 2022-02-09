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

interface PostProperties
{
    author: string,
    posting: string,
    onPressComment: event,
    onPressLike: event
}

const Post = (props: PostProperties) => {
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
                <View style={[styles.fixToText, styles.field]}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={props.onPressComment}>
                        <MaterialCommunityIcons
                            name="comment-multiple"
                            style={styles.button}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={props.onPressLike}>
                        <MaterialCommunityIcons
                            name="cards-heart"
                            style={styles.button}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        alignSelf: 'center',
        width: '100%',
        borderWidth: 2,
        borderColor: '#000000',
        padding: 5,
        backgroundColor: 'white',
        flexDirection: 'row'
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
    fixToText: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flexShrink: 1,
        padding: 10,
        borderRadius: 21,
        margin: 5,
        backgroundColor: "purple",
        alignItems: 'center',
    },
    profilePicContainer: {
        flexShrink: 1,
        padding: 10,
        borderRadius: 21,
        margin: 5,
        backgroundColor: "purple",
        alignItems: 'center',
        height: 35
    },
    button: {
        fontSize: 17,
        color: "white"
    },
    field: {
        paddingTop: 15
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

