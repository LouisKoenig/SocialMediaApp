import React, { useState, useContext} from 'react';
import {
    View,
    FlatList
} from 'react-native';
import Styles from '../../StyleSheet';
import DetailPost from '../components/DetailPost';
import CreateComment from '../components/CreateComment';

const testPosts = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        author: 'TestUser',
        posting: 'Das ist ein Test Comment.',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-4458ba',
        author: 'TestUser1',
        posting: 'Test!!!!',
    },
    {
        id: 'bd7acbea-c3b1-46c2-aed5-4b28ba',
        author: 'TestUser2',
        posting: 'Das ist ein Test Comment',
    },
    {
        id: 'bd7acbea-c3asd1-46c2-aed5-4sdba',
        author: 'TestUser3',
        posting: 'Hallo ich teste.',
    },
    {
        id: 'bd7acbea-cd1-46c2-aed5-4sdba',
        author: 'TestUser3',
        posting: 'Das ist ein anderer Comment.',
    }
];


export default function CommentScreen({params})
{
    //const postId = params.postId;

    const renderItem = ({ item }) => (
        <DetailPost
            isMain={false}
            author={item.author}
            posting={item.posting}
            onPressEdit={() => console.log('Edit')}
            onPressDelete={() => console.log('Delete')}/>
    );

    return (<View>
        <View>
            <DetailPost isMain={true} author= "TestUser2" posting="Das ist ein Detail-Post" onPressComment={() => console.log('Comment')} onPressLike={() => console.log('Like')}/>
        </View>
        <View>
            <CreateComment parentId="IDK yet"/>
        </View>
        <View>
            <FlatList data={testPosts}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      contentContainerStyle={Styles.flatList}>
            </FlatList>
        </View>
    </View>);
};