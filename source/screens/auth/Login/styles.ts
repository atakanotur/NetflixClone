import colors from "@/source/theme/colors";
import responsiveFontSize from "@/source/theme/responsiveFontSize";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

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
    padding: width / 8,
  },
  signInButton: {
    backgroundColor: colors.red,
    width: "100%",
    alignItems: "center",
    padding: 7,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  signInButtonDisabled: {
    backgroundColor: colors.darkRed,
    width: "100%",
    alignItems: "center",
    padding: 7,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10
  },
  signInButtonTitle: {
    fontSize: responsiveFontSize(15),
    color: colors.white,
    fontWeight: "bold",
  },
  signInButtonTitleDisabled: {
    color: colors.whiteGrey,
    fontWeight: "bold",
  },
  or: {
    color: colors.whiteGrey,
    marginBottom: 10,
  },
  signInWithCodeButton: {
    backgroundColor: colors.grey,
    width: "100%",
    alignItems: "center",
    padding: 7,
    borderRadius: 5,
    marginBottom: 10,
  },
  signInWithCodeButtonTitle: {
    fontSize: responsiveFontSize(15),
    color: colors.white,
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    backgroundColor: colors.black,
    width: "100%",
    alignItems: "center",
    padding: 7,
    borderRadius: 5,
    margin: 10,
  },
  forgotPasswordButtonTitle: {
    fontSize: responsiveFontSize(15),
    color: colors.whiteGrey,
    fontWeight: "bold",
  },
  reCAPTCHA: {
    fontSize: responsiveFontSize(13),
    color: colors.whiteGrey,
    margin: 10,
  },
});

export default styles;
