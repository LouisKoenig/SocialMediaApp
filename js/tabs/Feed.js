import * as React from 'react';
import {View} from 'react-native';
import Styles from '../../StyleSheet';
import Post from '../components/Post';

export default function Feed ()
{
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