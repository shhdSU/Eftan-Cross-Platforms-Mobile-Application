// components/login.js
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import firebase from "../database/firebase";
import LoginScrees from "./LoginScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            if (!user.emailVerified) {
              Alert.alert(
                "تنبيه",
                "يرجى تفعيل البريد الإلكتروني",
                [{ text: "حسنًا" }],
                { cancelable: false }
              );
              firebase.auth().signOut;
            } else {
              this.setState({
                isLoading: false,
                email: "",
                password: "",
              });

              const user = firebase.auth().currentUser.uid;
              firebase
                .database()
                .ref(`Client/` + user)
                .on("value", (snapshot) => {
                  if (snapshot.exists()) {
                    this.props.navigation.navigate("معرض المصمم");
                  }
                  return;
                });

              firebase
                .database()
                .ref(`GraphicDesigner/` + user)
                .on("value", (snapshot) => {
                  if (snapshot.exists()) {
                    this.props.navigation.navigate("صفحة المصمم");
                  }
                  return;
                });
              this.setState({
                isLoading: false,
                email: "",
                password: "",
              });
            }
          }
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (this.state.email === "" || this.state.password === "") {
          Alert.alert(
            "تنبيه",
            "فضلًا تأكد من إدخال جميع بياناتك",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else if (errorCode == "auth/wrong-password") {
          Alert.alert(
            "تنبيه",
            "نرجو إدخال كلمة السر الصحيحة",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else if (errorCode == "auth/user-not-found") {
          Alert.alert(
            "تنبيه",
            "لا يوجد حساب مسجل بهذا البريد الإلكتروني",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else if (errorCode == "auth/invalid-email") {
          Alert.alert(
            "تنبيه",
            "نرجو كتابة البريد الإلكتروني بالطريقة الصحيحة.",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else {
          alert(errorMessage);
        }
        this.setState({
          isLoading: false,
          password: "",
        });
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <LoginScrees style={styles.svgComponant} />

        <TextInput
          style={styles.inputStyle}
          placeholder="البريد الالكتروني"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="كلمة السر"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, "password")}
          maxLength={15}
          secureTextEntry={true}
        />
        <Text
          style={{
            top: hp("13%"),
            color: "#4F3C75",
            textAlign: "left",
            textDecorationLine: "underline",
          }}
          onPress={() => this.props.navigation.navigate("نسيت كلمة السر!")}
        >
          نسيت كلمة المرور؟
        </Text>

        <Text style={styles.loginText2}>ليس لديك حساب ؟</Text>
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("صفحة التسجيل")}
        >
          إنشاء حساب جديد{" "}
        </Text>

        <View style={styles.loginButton}>
          <TouchableOpacity onPress={() => this.userLogin()}>
            <Text style={styles.loginButton2}>تسجيل الدخول</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: hp("5%"),
    backgroundColor: "#fff",
  },
  inputStyle: {
    fontSize: 18,
    marginTop: wp("4%"),
    width: "100%",
    marginBottom: hp("2%"),
    paddingBottom: hp("2%"),
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: hp("15%"),
  },
  loginText: {
    fontSize: 18,
    color: "#4F3C75",
    marginTop: hp("1%"),
    textAlign: "center",
    alignItems: "center",
    top: wp("63%"),
    textDecorationLine: "underline",
    zIndex: 10,
  },
  loginText2: {
    fontSize: 18,
    color: "#B7B7B7",
    marginTop: hp("3%"),
    textAlign: "center",
    alignItems: "center",
    top: hp("30%"),
  },
  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  svgComponant: {
    top: hp("-5%"),
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  loginButton: {
    top: hp("13%"),
    backgroundColor: "#4F3C75",
    height: hp("6%"),
    width: wp("80%"),
    borderRadius: 25,
    alignSelf: "center",
    alignItems: "center",
  },
  loginButton2: {
    top: hp("0.75%"),
    color: "#FFEED6",
    fontSize: 27,
    height: hp("19%"),
    width: wp("42%"),
    textAlign: "center",
    justifyContent: "center",
  },
});
