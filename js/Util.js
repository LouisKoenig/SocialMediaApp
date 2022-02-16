import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getIDFromURL(url)
{
    let video_id = url.split('v=')[1];
    let ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
}

export function createUserID(userName) {
    return "User_" + userName;
}

export async function storeUser(user) {
    try {
        let result = await AsyncStorage.setItem(createUserID(user.userName), JSON.stringify(user));
        return true;

    } catch(e) {
        return false;
    }
}

/*export const loadDataToAsyncStorage = async () => {
    comments.map((comment) => {

    });

    posts.map((post) => {

    });

    votes.map((vote) => {

    });
}*/
