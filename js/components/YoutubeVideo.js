import React, { useState } from 'react';
import {
    StyleSheet,
    View
}
    from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Styles from '../../StyleSheet';
import {UrlToId} from '../Util';

interface YoutubeProps
{
    videoLink: string
}

const YoutubeVideo = (props: YoutubeProps) => {
    const [playing, setPlaying] = useState(false);

    const onStateChanged = (state) => {
        if(state !== 'playing')
        {
            setPlaying(false);
        }
    };

    let id = UrlToId(props.videoLink);
    return (
        <View style={styles.videoContainer}>
            <YoutubePlayer
                height={300}
                play={playing}
                videoId={id}
                onChangeState={onStateChanged}/>
        </View>
        );

}

export default YoutubeVideo;

const styles = StyleSheet.create({
    videoContainer: {
        height: 150,
        paddingRight: 20
    }
});