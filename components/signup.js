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

        <SvgComponenet style={{top:-30}} />
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
        <Text style={[styles.inputStyle,{color:"#B7B7B7",top:15}]}>هل انت؟</Text>
        <View>
          <RadioForm 
          style={styles.radio}
            labelStyle={{ 
            position: "relative", 
            right: 5, 
            top:0,
            justifyContent:"center",
            alignSelf:"center"
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

              top:5
              //fontFamily: "Droid Sans Arabic",
            }}
          >
            بالنقر على هذا الزر أنت توافق على
            <Text
              style={{
                color: "#4F3C75",

                //fontFamily: "Droid Sans Arabic",
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
        <Text style={styles.radioText}>
عميل                   مصمم جرافيك
</Text>
        <Text
          style={[styles.createAccount, { color: "#4F3C75" }]}
          onPress={() => this.props.navigation.navigate("صفحة الدخول")} ///change it later
        >
          قم بتسجيل الدخول
        </Text>
        
      </View>
    );
  }
}
var radio_props = [
  { value: 0 },
  { value: 1 },
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
   
    fontSize:18,
    marginTop: 20,
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: 10,
    borderRadius: 25,
    width: 279,
    height: 50,
    alignSelf: "center",
    top: 0,
  },
  createAccount: {
    top: 60,
    fontSize: 18,
    textAlign: "center",
    alignSelf:"center",
    margin:-13,
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
  radio:{
    top:-5,
    left:90,
    textAlign:"left",
    alignItems:"flex-start",
    justifyContent:"space-evenly"
 },
 radioText:{
 fontSize:18,
 bottom:100,
 left:70,
 color:"#B7B7B7",
 }

});
