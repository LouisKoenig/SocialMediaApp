import * as React from 'react';
import {
    View,
    TextInput,
    StyleSheet, Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../../StyleSheet';
import {useContext, useState} from 'react';
import Dialog from "react-native-dialog";
import ImagePreview from '../components/ImagePreview';
import UIButton from '../components/UIButton';
import {getIDFromURL} from '../Util';
import {RealmContext} from '../context/RealmContext';
import {ObjectId} from 'bson';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {UserContext} from '../context/UserContext';

export default function CreatePost () {
    let [posting, setPosting] = useState('');
    let [video, setVideo] = useState('');
    let [image, setImage] = useState('');
    let [videovisible, setVideoVisible] = useState(false);
    let [imagevisible, setImageVisible] = useState(false);
    let [imageadded, setImageAdded] = useState(false);
    let [videoadded, setVideoAdded] = useState(false);

    const realmContext = useContext(RealmContext);
    const userContext = useContext(UserContext);


    const onAddImage = () => {
        setImageVisible(true);
    };

    const onAddVideo = () => {
        setVideoVisible(true);
    };

    const onPost = () => {
        const db = realmContext.realmDB

        let currentdate = new Date();
        let datetime = currentdate.getDate() + "."
            + (currentdate.getMonth()+1)  + "."
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        let post = undefined;

        db.write(() => {
            post = db.create("Post", {
                _id: new ObjectId(),
                user_id: userContext.currentUser.userName,
                time: datetime,
                text: posting
            });
        });

        setPosting("");
        setImage("");
        setVideo("");
        setImageAdded(false);
        setVideoAdded(false);
        setImageVisible(false);
        setVideoVisible(false);
    }

        const onVideoCancel = () => {
        setVideo("");
        setVideoVisible(false);
    };

    const onVideoAdd = () => {
            if(video.substring(0, 31) === "https://www.youtube.com/watch?v" || video.substring(0, 29) === "https://m.youtube.com/watch?v")
            {
                setVideoVisible(false);
                setVideoAdded(true);
            }
            else
            {
                Alert.alert("Please choose a valid youtube link");
                return;
            }
        setVideoVisible(false);
        setVideoAdded(true);

    };


    const onImageCancel = () => {
        setImage("");
        setImageVisible(false);
    };

    const onImageAdd = () => {
        setImageVisible(false);
        setImageAdded(true);
    };

    const onImageDelete = () => {
        setImage("");
        setImageAdded(false);
    };

    const onVideoDelete = () => {
        setVideo("");
        setVideoAdded(false);
    };

    return(
        <View style={Styles.container}>
            <View>
                <Dialog.Container visible={imagevisible}>
                    <Dialog.Title>Add image</Dialog.Title>
                    <Dialog.Description>Add a link to an image you want to display:</Dialog.Description>
                    <Dialog.Input
                        label="Image-Link:"
                        onChangeText={value => setImage(value)}
                        value={image}
                        style={Styles.input}/>
                    <Dialog.Button
                        label="Cancel"
                        onPress={onImageCancel}
                        style={[Styles.buttonContainer, Styles.buttonSizes.dialog, Styles.textSizes.dialog, Styles.button]}/>
                    <Dialog.Button
                        label="Add"
                        onPress={onImageAdd}
                        style={[Styles.buttonContainer, Styles.buttonSizes.dialog, Styles.textSizes.dialog, Styles.button]}/>
                </Dialog.Container>
                <Dialog.Container visible={videovisible}>
                    <Dialog.Title>Add video</Dialog.Title>
                    <Dialog.Description>Add a link to a youtube video you want to display:</Dialog.Description>
                    <Dialog.Input
                        label="Youtube-Link:"
                        onChangeText={value => setVideo(value)}
                        value={video}
                        style={Styles.input}/>
                    <Dialog.Button
                        label="Cancel"
                        onPress={onVideoCancel}
                        style={[Styles.buttonContainer, Styles.buttonSizes.dialog, Styles.textSizes.dialog, Styles.button]}/>
                    <Dialog.Button
                        label="Add"
                        onPress={onVideoAdd}
                        style={[Styles.buttonContainer, Styles.buttonSizes.dialog, Styles.textSizes.dialog, Styles.button]}/>
                </Dialog.Container>
            </View>
            <View style={Styles.field}>
                <AutoGrowingTextInput
                    style={[Styles.input, styles.newPost]}
                    placeholder="Your new post"
                    multiline={true}
                    maxLength={280}
                    value={posting}
                    onChangeText={setPosting}/>

            </View>
            {
                (imageadded || videoadded) && (
                    <View style={[styles.previewBar, Styles.field]}>
                        {
                            imageadded && (
                                <ImagePreview imageLink={image} onClick={onImageDelete} style={styles.previewItems}/>
                            )
                        }
                        {
                            videoadded && (
                                <ImagePreview imageLink={GetYoutubeThumbnail(video)} onClick={onVideoDelete} style={styles.previewItems}/>
                            )
                        }
                    </View>
                )
            }
            <View style={[Styles.field, Styles.itemRow]}>
                <View style={[Styles.itemRow, styles.alignLeft]}>
                <UIButton size="iconmedium" disabled={imageadded} onClick={onAddImage}>
                    <MaterialCommunityIcons
                        name="image-plus" style={Styles.textSizes.iconmedium}/>
                </UIButton>
                <UIButton size="iconmedium" disabled={videoadded} onClick={onAddVideo}>
                    <MaterialCommunityIcons
                        name="video-plus" style={Styles.textSizes.iconmedium}/>
                </UIButton>
                </View>
                <View style={[styles.alignRight, Styles.itemRow]}>
                <UIButton size="medium" disabled={false} onClick={onPost}>Post</UIButton>
                </View>
            </View>
        </View>
    );
}

function GetYoutubeThumbnail(url)
{
    return "https://img.youtube.com/vi/" + getIDFromURL(url) + "/hqdefault.jpg";
}

const styles = StyleSheet.create({
    postMenuItem: {
        marginRight: 5,
        marginBottom: 3
    },
    alignLeft: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        width: '80%'
    },
    alignRight: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        alignContent: 'flex-end',
        textAlign: 'right'
    },
    newPost: {
        height: 250,
        textAlignVertical: 'top',
        textAlign: 'left'
    },
    previewBar: {
        flexDirection: 'row',
        height: 70,
    },
    previewItems: {
        width: 100
    }
});
