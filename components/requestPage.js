import firebase from "../database/firebase";
import React, { Component } from "react";
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
import { Textarea } from "native-base";

export default class RequestScreen extends Component {
  constructor() {
    super();
    this.state = {
      requestTitle: "",
      requestDescription: "",
      colors: [],
      category: "",
      sketchFile: "",
      deadline: "",
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  submitRequestForm() {
    //here you put all validation checks
    this.setState({
      isLoading: true,
    });
    /*
    const user = firebase.auth().currentUser.uid;
              firebase
                .database()
                .ref(`RequestForms/` + user)
                .on("value", (snapshot) => {
                  if (snapshot.exists()) {
                    this.props.navigation.navigate("معرض المصمم");
                  }
                  return;
                });
                */
  }

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
          placeholder="عنوان الطلب"
          value={this.state.requestTitle}
          onChangeText={(val) => this.updateInputVal(val, "requestTitle")}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="وصف الطلب"
          value={this.state.requestDescription}
          onChangeText={(val) => this.updateInputVal(val, "requestDescription")}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submitRequestForm()}
        >
          <Text
            style={{
              color: "#FFEED6",
              fontSize: 25,
            }}
          >
            إرسال الطلب
          </Text>
        </TouchableOpacity>
      </View>
    );
  } //End of Second return
}
const styles = StyleSheet.create({
  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
