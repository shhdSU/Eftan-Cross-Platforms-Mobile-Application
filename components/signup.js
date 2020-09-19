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
import SvgComponenet from "./welcomeSVG";
import firebase from "../database/firebase";
//import * as firebase from "firebase";
import { NavigationContainer } from "react-navigation";
import LoginScreen from "./login";
import privacyPolicy from "./privacyPolicy";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    var specialCheck = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //check whether string contains special characters
    var numCheck = /\d/; //check whether string contains numbers
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.firstName === "" ||
      this.state.lastName === ""
    ) {
      Alert.alert("..فضلًا تأكد من إدخال جميع بياناتك");
    } else if (
      specialCheck.test(this.state.firstName) ||
      specialCheck.test(this.state.lastName)
    ) {
      alert("فضلًا تأكد من إدخال اسمك الأول والأخير بشكل صحيح");
    } else if (
      numCheck.test(this.state.firstName) ||
      numCheck.test(this.state.lastName)
    ) {
      alert("فضلًا تأكد من إدخال اسمك الأول والأخير بشكل صحيح");
    } else if (
      this.state.password.length < 8 ||
      !specialCheck.test(this.state.password) ||
      !numCheck.test(this.state.password)
    ) {
      alert("كلمة السر المدخلة ضعيفة");
    } else {
      this.setState({
        isLoading: true,
      });

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          firebase.auth().onAuthStateChanged(function (user) {
            user.sendEmailVerification();
          }); /* res.user.updateProfile({
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
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/invalid-email") {
            alert("نرجو كتابة البريد الإلكتروني بالطريقة الصحيحة.");
          } else if (
            errorCode == "auth/email-already-in-use" ||
            errorCode == "auth/email-already-exists"
          ) {
            alert("البريد الإلكتروني مسجل مسبقَا");
          } else {
            console.log(error);
          }
          this.setState({
            isLoading: false,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        });
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
        <Text
          style={{
            fontSize: 27,
            color: "#4F3C75",
            fontWeight: "700",
            alignSelf: "center",
            top: "0.5%",
          }}
        >
          انشاء حساب جديد
        </Text>
        <SvgComponenet style={{ top: "-4%" }} />

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
        <Text style={[styles.inputStyle2, { color: "#B7B7B7", top: "0%" }]}>
          هل انت؟
        </Text>
        <View>
          <RadioForm
            style={styles.radio}
            labelStyle={{
              position: "relative",
              right: "5%",
              justifyContent: "center",
              alignSelf: "center",
            }}
            top={300}
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
              fontSize: 25,

              //fontFamily: "Droid Sans Arabic",
            }}
          >
            إنشاء حساب
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#B7B7B7",
            fontSize: 10,
            textAlign: "center",
            top: "1%",
            //fontFamily: "Droid Sans Arabic",
          }}
          onPress={() => this.props.navigation.navigate("سياسة الخصوصية")} ///change it later
        >
          بالنقر على هذا الزر أنت توافق على
          <Text
            style={{
              color: "#4F3C75",
              textDecorationLine: "underline",
            }}
            onPress={() => this.props.navigation.navigate("سياسة الخصوصية")} ///change it later
          >
            {""} تراخيص وخصوصية الاستخدام
          </Text>
        </Text>

        <Text
          style={[
            styles.createAccount,
            {
              color: "#B7B7B7",
            },
          ]}
        >
          لديك حساب بالفعل؟
        </Text>
        <Text style={[styles.radioText, { left: "75%", bottom: "11.5%" }]}>
          عميل{" "}
        </Text>
        <View style={{ left: "15%", bottom: "15%" }}>
          <Text style={styles.radioText}> مصمم جرافيك</Text>
        </View>

        <Text
          style={[
            styles.createAccount,
            { color: "#4F3C75", textDecorationLine: "underline" },
          ]}
          onPress={() => this.props.navigation.navigate("صفحة الدخول")} ///change it later
        >
          قم بتسجيل الدخول
        </Text>
      </View>
    );
  }
}
var radio_props = [{ value: 0 }, { value: 1 }];

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
    marginTop: "5%",
    width: "100%",
    marginBottom: "5%",
    paddingBottom: "6%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: "2%",
  },
  inputStyle2: {
    fontSize: 18,
    marginTop: "5%",
    width: "100%",
    marginBottom: "5%",
    paddingBottom: "6%",
    textAlign: "right",
    top: "2%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "3%",
    borderRadius: 25,
    width: wp("80%"),
    height: hp("6%"),
    alignSelf: "center",
  },
  createAccount: {
    top: "8%",
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
    margin: "-8%",
  },
  preloader: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  radio: {
    top: "-4%",
    left: "230%",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    zIndex: 6,
  },
  radioText: {
    fontSize: 18,
    color: "#B7B7B7",
  },
});
