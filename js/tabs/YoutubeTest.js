import React, { useState } from 'react';
import {
    StyleSheet,
    View
}
    from 'react-native';
import YoutubeVideo from '../components/YoutubeVideo';
import Post from '../components/Post';
import Styles from '../../StyleSheet';


export default function YoutubeTest() {
    return (
        <View style={Styles.container}>
            <Post
                author="TestUser"
                posting="This is a test post by TestUser."
                onPressComment={() => console.log('I want to comment.')}
                onPressLike={() => console.log('I want to like.')}
                url="https://www.youtube.com/watch?v=p74bzf-beGc"/>
        </View>);
}
