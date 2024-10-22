import { useRef } from 'react';
import { StyleSheet, View, Dimensions, ViewStyle, StyleProp } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

type VideoPlayerProps = {
    videoSource: string | undefined;
    fullscreen: boolean;
    visible: boolean;
    style?: StyleProp<ViewStyle> | undefined;
}

const { height } = Dimensions.get('screen');

const VideoPlayer = ({ videoSource, fullscreen, visible, style }: VideoPlayerProps) => {
    const ref = useRef<VideoView>(null);
    const player = useVideoPlayer({ uri: videoSource ? videoSource.toString() : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, player => { });

    if (fullscreen) ref.current?.enterFullscreen();
    ref.current?.exitFullscreen();

    if (!visible) return null;

    return (
        <View style={styles.contentContainer}>
            <VideoView
                ref={ref}
                style={[styles.video, style]}
                player={player}
                allowsFullscreen={true}
                startsPictureInPictureAutomatically
                contentFit='cover'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: 'black',
    },
    video: {
        height: height / 4,
    },
});

export default VideoPlayer;
