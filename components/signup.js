// components/signup.js

import React, { Component } from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";

import firebase from "../database/firebase";
//import * as firebase from "firebase";
import { NavigationContainer } from "react-navigation";
import LoginScreen from "./login";
import privacyPolicy from "./privacyPolicy";

export default class SignupScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isLoading: false,
      userType: 1,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.firstName === "" ||
      this.state.lastName === ""
    ) {
      Alert.alert("..فضلًا تأكد من إدخال جميع بياناتك");
    } else {
      this.setState({
        isLoading: true,
      });

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          /* res.user.updateProfile({
            firstName: this.state.firstName,
            lastName: this.state.lastName,   */
          if (this.state.userType == 1) {
            firebase
              .database()
              .ref("Client/" + res.user.uid)
              .set({
                CFirstName: this.state.firstName,
                CLastName: this.state.lastName,
                Cemail: this.state.email,
              });
          } else {
            firebase
              .database()
              .ref("GraphicDesigner/" + res.user.uid)
              .set({
                DFirstName: this.state.firstName,
                DLastName: this.state.lastName,
                DEmail: this.state.email,
              });
          }

          this.setState({
            isLoading: false,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
          this.props.navigation.navigate("صفحة الدخول");
        })

        .catch((error) => this.setState({ errorMessage: error.message }));
    }
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
          placeholder="الاسم الأول"
          value={this.state.firstName}
          onChangeText={(val) => this.updateInputVal(val, "firstName")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="الاسم الأخير"
          value={this.state.lastName}
          onChangeText={(val) => this.updateInputVal(val, "lastName")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="البريد الالكتروني"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="كلمة المرور"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, "password")}
          maxLength={15}
          secureTextEntry={true}
        />
        <View>
          <RadioForm
            labelStyle={{ position: "relative", left: 0 }}
            selectedButtonColor={"#4F3C75"}
            buttonColor={"#4F3C75"}
            formHorizontal={true}
            radio_props={radio_props}
            initial={1}
            onPress={(value) => {
              this.setState({ userType: value });
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.registerUser()}
        >
          <Text
            style={{
              color: "#FFEED6",
              fontSize: 16,

              //fontFamily: "Droid Sans Arabic",
            }}
          >
            إنشاء حساب
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#B7B7B7",
            fontSize: 11,
            textAlign: "center",
            margin: 20,
            //fontFamily: "Droid Sans Arabic",
          }}
        >
          بالنقر على هذا الزر أنت توافق على
          <Text
            style={{
              color: "#4F3C75",
              fontSize: 11,
              marginRight: 7,
              //fontFamily: "Droid Sans Arabic",
            }}
            onPress={() => this.props.navigation.navigate("سياسة الخصوصية")} ///change it later
          >
            تراخيص وخصوصية الاستخدام
          </Text>
        </Text>

        <Text
          style={{
            color: "#B7B7B7",
            fontSize: 14,
            margin: 15,
            textAlign: "center",
            //fontFamily: "Droid Sans Arabic",
          }}
        >
          لديك حساب بالفعل؟
        </Text>

        <Text
          style={{
            color: "#4F3C75",
            fontSize: 16,
            textAlign: "center",

            //fontFamily: "Droid Sans Arabic",
          }}
          onPress={() => this.props.navigation.navigate("صفحة الدخول")} ///change it later
        >
          قم بتسجيل الدخول
        </Text>
      </View>
    );
  }
}
var radio_props = [
  { label: "مصمم جرافيك", value: 0 },
  { label: "عميل", value: 1 },
];
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
    //fontFamily: "Droid Sans Arabic",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#B7B7B7",
    borderBottomWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: 10,
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
