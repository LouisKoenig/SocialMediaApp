import * as React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Styles from '../../StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UIButton from './UIButton';

interface PreviewProps
{
    imageLink: string,
    onClick: event
}

const ImagePreview = (props: PreviewProps) => {
    return (
        <View style={[styles.preview, props.style]}>
            <ImageBackground
                source={{uri: props.imageLink}}
                resizeMode="cover"
                style={[styles.preview, props.style]}>
                <View style={styles.test}>
                    <UIButton size="iconpreview" disabled={false} onClick={props.onClick}>
                        <MaterialCommunityIcons
                            name="delete-forever" style={Styles.textSizes.iconpreview}/>
                    </UIButton>
                </View>
            </ImageBackground>
        </View>
    );

}

export default ImagePreview;

const styles = StyleSheet.create({
    preview: {
        height: '100%',
        flex: 1
    }
});