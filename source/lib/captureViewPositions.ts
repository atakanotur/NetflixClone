import { MutableRefObject } from "react";
import { View } from "react-native";

export const captureViewPosition = (ref: MutableRefObject<View>): Promise<{ pageX: number, pageY: number }> => {
    return new Promise((resolve) => {
        ref.current?.measure((x, y, width, height, pageX, pageY) => {
            resolve({
                pageX,
                pageY
            });
        });
    });
}