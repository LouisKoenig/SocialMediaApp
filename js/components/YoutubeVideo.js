import React, { useState } from 'react';
import {
    StyleSheet,
    View
}
    from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Styles from '../../StyleSheet';
import {getIDFromURL} from '../Util';

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

    let id = getIDFromURL(props.videoLink);
    return (
            <YoutubePlayer
                height={300}
                play={playing}
                videoId={id}
                onChangeState={onStateChanged}/>
        );

}

export default YoutubeVideo;
