import * as React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Styles from '../../StyleSheet';
import UIIconButton from './UIIconButton';

interface PreviewProps
{
    imageLink: string,
    onClick: event
}

const ImagePreview = (props: PreviewProps) => {
    return (
        <View style={Styles.itemRow}>
            <ImageBackground
                source={{uri: props.imageLink}}
                resizeMode="cover"
                style={[styles.previewItems]}>
            </ImageBackground>
            <View style={{alignSelf: "center"}}>
                <UIIconButton icon={"delete-forever"} size={35} disabled={false} onClick={props.onClick}/>
            </View>
        </View>
    );

}

export default ImagePreview;

const styles = StyleSheet.create({
    preview: {
        height: '100%',
        flex: 1
    },
    previewItems: {
        width: 160,
        height: 90
    }
});
