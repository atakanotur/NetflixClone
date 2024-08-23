import colors from "@/source/theme/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    position: "absolute",
    zIndex: -1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
