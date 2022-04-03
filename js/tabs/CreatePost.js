import * as React from 'react';
import {
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import Styles from '../../StyleSheet';
import {useContext, useState} from 'react';
import Dialog from "react-native-dialog";
import ImagePreview from '../components/ImagePreview';
import UIButton from '../components/UIButton';
import {getIDFromURL, isEmpty} from '../Util';
import {RealmContext} from '../context/RealmContext';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {UserContext} from '../context/UserContext';
import {BSON} from 'realm';
import UIIconButton from '../components/UIIconButton';

export default function CreatePost () {
    let [posting, setPosting] = useState('');
    let [video, setVideo] = useState('');
    let [image, setImage] = useState('');
    let [videoVisible, setVideoVisible] = useState(false);
    let [imageVisible, setImageVisible] = useState(false);
    let [imageAdded, setImageAdded] = useState(false);
    let [videoAdded, setVideoAdded] = useState(false);

    const realmContext = useContext(RealmContext);
    const userContext = useContext(UserContext);


    const onAddImage = () => {
        setImageVisible(true);
    };

    const onAddVideo = () => {
        setVideoVisible(true);
    };

    const onPost = () => {
        if(isEmpty(posting))
        {
            console.log("Empty");
            return;
        }
        const db = realmContext.realmDB

        let post = undefined;

        db.write(() => {
            post = db.create("Post", {
                _id: new BSON.UUID(),
                userName: userContext.currentUser.userName,
                time: new Date(),
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
                <Dialog.Container visible={imageVisible}>
                    <Dialog.Title>Add Image</Dialog.Title>
                    <Dialog.Description>Add a link to an image you want to display:</Dialog.Description>
                    <Dialog.Input
                        label="Image-Link:"
                        onChangeText={value => setImage(value)}
                        value={image}/>
                    <Dialog.Button
                        label="Cancel"
                        onPress={onImageCancel}
                        style={{color: "#4A0080"}}/>
                    <Dialog.Button
                        label="Add"
                        onPress={onImageAdd}
                        style={{color: "#4A0080"}}/>
                </Dialog.Container>
                <Dialog.Container visible={videoVisible}>
                    <Dialog.Title>Add Video</Dialog.Title>
                    <Dialog.Description>Add a link to a youtube video you want to display:</Dialog.Description>
                    <Dialog.Input
                        label="Youtube-Link:"
                        onChangeText={value => setVideo(value)}
                        value={video}/>
                    <Dialog.Button label="Cancel"
                                   onPress={onVideoCancel}
                                   style={{color: "#4A0080"}}/>
                    <Dialog.Button label="Add"
                                   onPress={onVideoAdd}
                                   style={{color: "#4A0080"}}/>
                </Dialog.Container>
            </View>

            <View style={Styles.field}>
                <AutoGrowingTextInput
                    style={[Styles.input, styles.newPost]}
                    placeholder="Your new post"
                    multiline={true}
                    maxLength={280}
                    value={posting}
                    onChangeText={setPosting}
                    selectionColor={"#4A0080"}/>

            </View>
            {
                (imageAdded || videoAdded) && (
                    <View style={[styles.previewBar, Styles.field]}>
                        {
                            imageAdded && (
                                <ImagePreview imageLink={image} onClick={onImageDelete} style={styles.previewItems}/>
                            )
                        }
                        {
                            videoAdded && (
                                <ImagePreview imageLink={GetYoutubeThumbnail(video)} onClick={onVideoDelete} style={styles.previewItems}/>
                            )
                        }
                    </View>
                )
            }
            <View style={[Styles.field, Styles.itemRow]}>
                <View style={[Styles.itemRow, styles.alignLeft]}>
                    <UIIconButton style={{paddingRight: 10}} icon={"image-plus"} size={30} disabled={imageAdded} onClick={onAddImage}/>
                    <UIIconButton icon={"video-plus"} size={30} disabled={videoAdded} onClick={onAddVideo}/>
                </View>
                <View style={[styles.alignRight, Styles.itemRow, {flexGrow: 1}]}>
                    <UIButton size="small" disabled={false} onClick={onPost}>Post</UIButton>
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
        justifyContent: 'flex-start'
    },
    alignRight: {
        justifyContent: 'flex-end'
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
