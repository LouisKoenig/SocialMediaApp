import React from 'react';
import {sha256} from 'react-native-sha256';

export function getIDFromURL(url)
{
    let video_id = url.split('v=')[1];
    let ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
}

export const generateToken = (length) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let index;
    let token = "";
    for (let i = 0; i < length; i++) {
        index = Math.floor(Math.random() * 62);
        token = token + alphabet[index];
    }
    return token;
}

export function isEmpty(text)
{
    let checkWhiteSpaceOnly = text.replace(/\s/g, '');
    if(checkWhiteSpaceOnly.length === 0)
    {
        return true;
    }

    return  false;
}

export const loginUser = async (db, userName, password) => {

    let user = undefined;
    try {
        console.log(db.objects("User"));
        user = await db.objectForPrimaryKey("User", userName);
    } catch (e) {
        throw new Error("User does not exists");
    }

    if(! user){
        throw new Error("User does not exists");
    }

    let hash = await sha256(user.salt + password);
    if(user.password !== hash){
        throw new Error("Password wrong");
    }

    return user
}
