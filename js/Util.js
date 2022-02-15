import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function UrlToId(url)
{
    let video_id = url.split('v=')[1];
    let ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
}

export function CreateUserID(userName) {
    return "User_" + userName;
}

export async function StoreUser(user) {
    try {
        let result = await AsyncStorage.setItem(CreateUserID(user.userName), JSON.stringify(user));
        return true;

    } catch(e) {
        return false;
    }
}