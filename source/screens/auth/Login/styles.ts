import colors from "@/source/theme/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: 35,
    width: 100,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
