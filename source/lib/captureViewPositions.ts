import { RefObject } from "react";
import { View } from "react-native";

export const captureViewPosition = (
  ref: RefObject<View>
): Promise<{ pageX: number; pageY: number }> => {
  return new Promise((resolve, reject) => {
    try {
      ref.current?.measure((x, y, width, height, pageX, pageY) => {
        resolve({
          pageX,
          pageY,
        });
      });
    } catch (error) {
      console.error("captureViewPosition.Error : ", error);
      reject(error);
    }
  });
};

export const captureViewDimensions = (
  ref: RefObject<View>
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    try {
      ref.current?.measure((x, y, width, height) => {
        resolve({
          width,
          height,
        });
      });
    } catch (error) {
      console.error("captureViewDimensions.Error : ", error);
      reject(error);
    }
  });
};
