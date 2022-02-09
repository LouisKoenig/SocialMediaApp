import React, { useState } from 'react';
import {
    StyleSheet,
    View
}
    from 'react-native';
import YoutubeVideo from '../components/YoutubeVideo';
import Post from '../components/Post';


export default function YoutubeTest() {
    return (
        <View style={styles.container}>
            <YoutubeVideo videoLink="https://www.youtube.com/watch?v=p74bzf-beGc"/>
            <View style={styles.container}>
                <Post
                    author="TestUser"
                    posting="This is a test post by TestUser."
                    onPressComment={() => console.log('I want to comment.')}
                    onPressLike={() => console.log('I want to like.')}/>
            </View>
        </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 20,
        paddingHorizontal: 20
    }
});
