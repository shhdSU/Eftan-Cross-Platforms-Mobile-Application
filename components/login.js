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
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import firebase from "../database/firebase";

export default class LoginScreen extends Component {
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
        <Button
          color="#4F3C75"
          title="تسجيل الدخول"
          onPress={() => this.userLogin()}
        />

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("صفحة التسجيل")}
        >
          ليس لديك حساب ؟ انشاء حساب جديد
        </Text>
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
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#4F3C75",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
