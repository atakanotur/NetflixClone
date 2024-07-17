import { StyleSheet, Dimensions } from "react-native";
import colors from "@/source/theme/colors";
import Constants from "expo-constants";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  banner: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: Constants.statusBarHeight,
  },
  logo: {
    height: 35,
    width: 100,
  },
  bannerButtons: {
    flexDirection: "row",
  },
  bannerButtonText: {
    color: colors.white,
    padding: 5,
    fontWeight: "bold",
    alignSelf: "center",
  },
  loginButton: {
    height: 50,
    width: "100%",
    backgroundColor: colors.red,
    padding: 12,
    borderRadius: 3,
    position: "absolute",
    bottom: Constants.statusBarHeight,
    justifyContent: "center",
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
  },
});

export default styles;
