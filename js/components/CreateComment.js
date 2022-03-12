import React, {useState} from 'react';
import {
    Image,
    StyleSheet, TextInput,
    View,
}
    from 'react-native';
import UIButton from './UIButton';
import Styles from '../../StyleSheet';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

interface CreateCommentProperties
{
    parentId: string
}

const CreateComment = (props: CreateCommentProperties) => {
    let [comment, setComment] = useState();

    return (
        <View style={[Styles.field, {borderBottomWidth: 1, borderBottomColor: "black", borderStyle: "solid", paddingBottom: 7}]}>
            <View style={Styles.itemRow}>
                <View style={[styles.profilePicContainer, styles.leftSide]}>
                    <Image
                        source={require('../../res/avatar.png')}
                        style={styles.profilePic}/>
                </View>
                <View style={styles.middle}>
                    <AutoGrowingTextInput
                        placeholder="Your comment..."
                        style = {[Styles.input, {marginRight: 5}]}
                        maxLength={280}/>
                </View>
                <View style={styles.rightSide}>
                    <UIButton size="small" disabled={false} onClick={() => console.log("Post")}>Post</UIButton>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    alignLeft: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        width: '68%',
        marginLeft: 40
    },
    alignRight: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        alignContent: 'flex-end',
        textAlign: 'right'
    },
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
        width: '19%',
        paddingRight: 5
    },
    middle: {
        width: '69%'
    },
    extendedInput: {
        width: '87%',
        marginRight: 5
    }
});

export default CreateComment;

