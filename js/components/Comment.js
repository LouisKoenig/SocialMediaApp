import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    Image
}
    from 'react-native';
import Styles from '../../StyleSheet';
import {UserContext} from '../context/UserContext';
import {RealmContext} from '../context/RealmContext';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import UIIconButton from './UIIconButton';

interface DetailPostProperties
{
    id: string,
    isMain: boolean,
    author: string,
    posting: string,
    onPressEdit: event,
    onRefresh?: event
}

const Comment = (props: DetailPostProperties) => {
    let [lastSavedText, setLastSavedText] = useState(props.posting);
    let [editMode, setEditMode] = useState(false);
    let [posting, setPosting] = useState(props.posting);

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
            //TODO: Navigate back props.onPressGoBack();
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
        <View style={[props.style, Styles.postings.post]}>
            <View style={Styles.postings.leftSide}>
                {
                    props.isMain && (
                        <UIIconButton icon={"keyboard-return"} size={25} disabled={false} onClick={props.onPressGoBack}/>
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
                            onChangeText={setPosting}
                            selectionColor={"#4A0080"}/>
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
                            <UIIconButton style={{paddingRight: 5}} icon={"pencil"} size={23} disabled={false} onClick={onEdit}/>
                            <UIIconButton icon={"delete-forever"} size={23} disabled={false} onClick={onDelete}/>
                        </View>
                    )
                }
                {
                    editMode && (
                        <View style={[Styles.itemRow, Styles.field]}>
                            <UIIconButton style={{paddingRight: 5}} icon={"close"} size={23} disabled={false} onClick={onCancel}/>
                            <UIIconButton icon={"check"} size={23} disabled={false} onClick={onSaveChange}/>
                        </View>
                    )
                }
            </View>
        </View>
    );
}

export default Comment;

