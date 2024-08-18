import { StyleSheet, Dimensions } from "react-native";
import colors from "@/source/theme/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blankText: {
    color: colors.black,
  },
  profilesListContentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilesList: {
    alignItems: "center",
  },
  profilesListRenderItemContainer: {
    width: width / 4.2,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  profileListRenderItemImageOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileListRenderItemImage: {
    height: width / 4.2,
    width: width / 4.2,
    borderRadius: 10,
    justifyContent: "center",
  },
  profileName: {
    color: colors.white,
    fontWeight: "600",
    paddingTop: 7,
  },
});

export default styles;
