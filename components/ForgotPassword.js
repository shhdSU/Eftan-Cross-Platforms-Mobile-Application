import React, { Component, Fragment } from "react";
import { Text, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../database/firebase";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function () {
        alert("الرجاء تفقد بريدك الالكتروني ");
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/user-not-found") {
          alert("البريد الالكتروني غير مسجل !");
        } else if (errorCode == "auth/invalid-email") {
          alert("نرجوا إعادة كتابة البريد الالكتروني بشكل صحيح");
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

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="البريد الالكتروني"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        <TouchableOpacity onPress={() => this.forgotPassword()}>
          <Text style={styles.buttonContainer}>ارسال</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 150,
  },
  text: {
    color: "#333",
    fontSize: 24,
    marginLeft: 25,
  },
  buttonContainer: {
    margin: 25,
  },
  inputStyle: {
    fontSize: 18,
    marginTop: 20,
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: 120,
  },
});

export default ForgotPassword;
