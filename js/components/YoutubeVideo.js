import React, { useState } from 'react';
import {
    StyleSheet,
    View
}
    from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

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
        <View style={styles.container}>
            <YoutubePlayer
                height={300}
                play={playing}
                videoId={id}
                onChangeState={onStateChanged}/>
        </View>);

}

export default YoutubeVideo;

function UrlToId(url)
{
    let video_id = url.split('v=')[1];
    let ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 20,
        paddingHorizontal: 20
    }
});