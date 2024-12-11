import colors from "@/source/theme/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    alignItems: "flex-start",
    padding: 0,
  },
  searchBar: {
    marginHorizontal: 15,
  },
 
});

export default styles;
