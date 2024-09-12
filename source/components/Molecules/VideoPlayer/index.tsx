import { useVideoPlayer, VideoView, } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, Button, Dimensions } from 'react-native';

type VideoPlayerProps = {
    videoSource: string | undefined;
    fullscreen: boolean;
    visible: boolean;
}

const { width, height } = Dimensions.get('screen');

const VideoPlayer = ({ videoSource, fullscreen, visible }: VideoPlayerProps) => {
    const ref = useRef<VideoView>(null);
    const player = useVideoPlayer({ uri: videoSource ? videoSource.toString() : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, player => {
        player.play();
    });

    if (fullscreen) ref.current?.enterFullscreen();
    ref.current?.exitFullscreen();

    if (!visible) return null;

    return (
        <View style={styles.contentContainer}>
            <VideoView
                ref={ref}
                style={styles.video}
                player={player}
                allowsFullscreen={true}
                startsPictureInPictureAutomatically
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        height,
        width,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        backgroundColor: 'black',
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        padding: 10,
    },
});

export default VideoPlayer;
