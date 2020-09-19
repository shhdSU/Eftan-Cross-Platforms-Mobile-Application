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
import { color } from "react-native-reanimated";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import firebase from "../database/firebase";
import LoginScrees from "./LoginScreen";
import { AppLoading } from "expo";
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
        firebase.auth().onAuthStateChanged(function (user) {
          if (user.emailVerified) {
            console.log(res);
            console.log("User logged-in successfully!");
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
                console.log("مادخل جاليري");
                return;
              });

            firebase
              .database()
              .ref(`GraphicDesigner/` + user)
              .on("value", (snapshot) => {
                if (snapshot.exists()) {
                  this.props.navigation.navigate("صفحة المصمم");
                }
                console.log("مادخل بروفايل");
                return;
              });
          } else {
            alert("يرجى تفعيل بريدك الإلكتروني");
            firebase.auth().signOut;
          }
        });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/wrong-password") {
          alert("نرجو إدخال كلمة السر الصحيحة");
        } else if (errorCode == "auth/user-not-found") {
          alert("لا يوجد حساب مسجل بهذا البريد الإلكتروني");
        } else if (errorCode == "auth/invalid-email") {
          alert("نرجو كتابة البريد الإلكتروني بالطريقة الصحيحة.");
        } else {
          alert(errorMessage);
        }
        this.setState({
          isLoading: false,
          email: "",
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
            top: "19%",
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
          انشاء حساب جديد
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
    padding: "10%",
    backgroundColor: "#fff",
  },
  inputStyle: {
    fontSize: 18,
    marginTop: "4%",
    width: "100%",
    marginBottom: "5%",
    paddingBottom: "5%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: "21%",
  },
  loginText: {
    fontSize: 18,
    color: "#4F3C75",
    marginTop: "1%",
    textAlign: "center",
    alignItems: "center",
    top: "32%",
    textDecorationLine: "underline",
    zIndex: 10,
  },
  loginText2: {
    fontSize: 18,
    color: "#B7B7B7",
    marginTop: "14%",
    textAlign: "center",
    alignItems: "center",
    top: "33%",
  },
  preloader: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  svgComponant: {
    top: "1%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  loginButton: {
    top: "13%",
    backgroundColor: "#4F3C75",
    height: hp("6%"),
    width: wp("80%"),
    borderRadius: 25,
    alignSelf: "center",
    alignItems: "center",
  },
  loginButton2: {
    top: "4%",
    color: "#FFEED6",
    fontSize: 27,
    height: hp("19%"),
    width: wp("42%"),
    textAlign: "center",
    justifyContent: "center",
  },
});
