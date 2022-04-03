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
import YoutubeVideo from './YoutubeVideo';
import {useNavigation} from '@react-navigation/native';

interface DetailPostProperties
{
    id: string,
    isMain: boolean,
    userName: string,
    text: string,
    image?: string,
    video?: string,
    onRefresh?: event
}

const Comment = (props: DetailPostProperties) => {
    let [lastSavedText, setLastSavedText] = useState(props.text);
    let [editMode, setEditMode] = useState(false);
    let [text, setText] = useState(props.text);

    const realmContext = useContext(RealmContext);
    const userContext = useContext(UserContext);
    const navigation = useNavigation();
    const db = realmContext.realmDB;

    let isEditable = props.userName === userContext.currentUser.userName;

    const onDelete = async () => {
        if(props.isMain)
        {
            await db.write(() => {
                db.delete(db.objectForPrimaryKey("Post", props.id))
            })

            let commentsFromPost = db.objects("Comment").filtered("post_id == $0", props.id);

            await db.write(() => db.delete(commentsFromPost));

            navigation.navigate("TabBar");
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
        setText(lastSavedText);
        setEditMode(false);
    }

    const onSaveChange = async () => {
        if(text === lastSavedText){
            setEditMode(false);
            return;
        }

        await db.write(() => {
            const entry = db.objectForPrimaryKey(props.isMain ? "Post" : "Comment", props.id);

            entry.text = text;
        });

        setLastSavedText(text);
        setEditMode(false);
    }

    return (
        <View style={[props.style, Styles.postings.post]}>
            <View style={Styles.postings.leftSide}>
                <View style={Styles.postings.profilePicContainer}>
                    <Image
                        source={require('../../res/avatar.png')}
                        style={Styles.postings.profilePic}/>
                </View>
            </View>
            <View style={Styles.postings.rightSide}>
                <Text style={props.isMain ? Styles.postings.authorMainPost : Styles.postings.author}>{props.userName}</Text>
                {
                    !editMode && (
                        <Text style={props.isMain ? Styles.postings.postingMainPost : Styles.postings.posting}>{text}</Text>
                    )
                }
                {
                    editMode && (
                        <AutoGrowingTextInput
                            style={props.isMain ? Styles.postings.postingMainPost : Styles.postings.posting}
                            multiline={true}
                            maxLength={280}
                            defaultValue={text}
                            value={text}
                            onChangeText={setText}
                            selectionColor={"#4A0080"}/>
                    )
                }

                {
                    props.image !== "" && props.image !== undefined &&(
                        <Image source={{uri: props.image}}
                               resizeMode="contain"
                               style={[Styles.mediaContainer, Styles.field]}/>
                    )
                }
                {
                    props.video !== "" && props.video !== undefined &&(
                        <View style={[Styles.field, Styles.mediaContainer]}>
                            <YoutubeVideo videoLink={props.video}/>
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

