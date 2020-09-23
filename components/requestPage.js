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

export default class RequestScreen extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
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
      <TextInput
        style={styles.inputStyle}
        placeholder="وصف مختصر"
        value={this.state.description}
        onChangeText={(val) => this.updateInputVal(val, "description")}
      />
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
