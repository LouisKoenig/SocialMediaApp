import React, {useContext, useEffect, useState} from 'react';
import {
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
import {RealmContext} from '../context/RealmContext';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

interface DetailPostProperties
{
    id: string,
    isMain: boolean,
    author: string,
    posting: string,
    url: string,
    image: string,
    onPressEdit: event,
    onRefresh?: event,
    onPressGoBack?: event
}

const CommentPosting = (props: DetailPostProperties) => {
    let [lastSavedText, setLastSavedText] = useState(props.posting);
    let [editMode, setEditMode] = useState(false);
    let [posting, setPosting] = useState(props.posting);

    let video = CreateYoutubeVideo(props.url);
    const realmContext = useContext(RealmContext);
    const userContext = useContext(UserContext);
    const db = realmContext.realmDB;

    let isEditable = props.author === userContext.currentUser.userName;

    const onDelete = async () => {
        if(props.isMain)
        {
            await db.write(() => {
                db.delete(db.objectForPrimaryKey("Post", props.id))
            })

            let commentsFromPost = db.objects("Comment").filtered("post_id == $0", props.id);

            await db.write(() => db.delete(commentsFromPost));
            props.onPressGoBack();
        }
        else
        {
            await db.write(() => {
                db.delete(db.objectForPrimaryKey("Comment", props.id))
            })

            props.onRefresh();
        }
    }

    const onEdit = () => {
        setEditMode(true);
    }

    const onCancel = () => {
        setPosting(lastSavedText);
        setEditMode(false);
    }

    const onSaveChange = async () => {
        if(posting === lastSavedText){
            setEditMode(false);
            return;
        }

        await db.write(() => {
            const entry = db.objectForPrimaryKey(props.isMain ? "Post" : "Comment", props.id);

            entry.text = posting;
        })

        setLastSavedText(posting);
        setEditMode(false);
    }

    return (
        <View style={Styles.postings.post}>
            <View style={Styles.postings.leftSide}>
                {
                    props.isMain && (
                        <UIButton size="iconpreview" disabled={false} onClick={props.onPressGoBack}>
                            <MaterialCommunityIcons
                                name="keyboard-return" style={{fontSize: 20}}/>
                        </UIButton>
                    )
                }
                {
                    !props.isMain && (
                        <View style={Styles.postings.profilePicContainer}>
                            <Image
                                source={require('../../res/avatar.png')}
                                style={Styles.postings.profilePic}/>
                        </View>
                    )
                }
            </View>
            <View style={Styles.postings.rightSide}>
                <Text style={props.isMain ? Styles.postings.authorMainPost : Styles.postings.author}>{props.author}</Text>
                {
                    !editMode && (
                        <Text style={props.isMain ? Styles.postings.postingMainPost : Styles.postings.posting}>{posting}</Text>
                    )
                }
                {
                    editMode && (
                        <AutoGrowingTextInput
                            style={props.isMain ? Styles.postings.postingMainPost : Styles.postings.posting}
                            multiline={true}
                            maxLength={280}
                            defaultValue={posting}
                            value={posting}
                            onChangeText={setPosting}/>
                    )
                }

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
                    (isEditable && !editMode) && (
                        <View style={[Styles.itemRow, Styles.field]}>
                            <UIButton size="iconpreview" disabled={false} onClick={onEdit}>
                                <MaterialCommunityIcons
                                    name="pencil-outline" style={{fontSize: 20}}/>
                            </UIButton>
                            <UIButton size="iconpreview" disabled={false} onClick={onDelete}>
                                <MaterialCommunityIcons
                                    name="delete-forever" style={{fontSize: 20}}/>
                            </UIButton>
                        </View>
                    )
                }
                {
                    editMode && (
                        <View style={[Styles.itemRow, Styles.field]}>
                            <UIButton size="iconpreview" disabled={false} onClick={onCancel}>
                                <MaterialCommunityIcons
                                    name="close" style={{fontSize: 20}}/>
                            </UIButton>
                            <UIButton size="iconpreview" disabled={false} onClick={onSaveChange}>
                                <MaterialCommunityIcons
                                    name="check" style={{fontSize: 20}}/>
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

export default CommentPosting;

