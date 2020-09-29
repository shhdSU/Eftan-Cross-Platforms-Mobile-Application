import React, { Component } from "react";
import RadioForm from "react-native-simple-radio-button";

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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class UploadNewDesign extends Component {
  constructor() {
    super();
    this.state = {
      designTitle: "",
      designDescription: "",
      category: "",
      designFile: "",
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  uploadDesign() {
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
          placeholder="عنوان العمل"
          value={this.state.requestTitle}
          onChangeText={(val) => this.updateInputVal(val, "designTitle")}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="وصف العمل"
          value={this.state.requestDescription}
          onChangeText={(val) => this.updateInputVal(val, "designDescription")}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.uploadDesign()}
        >
          <Text
            style={[styles.inputStyle2, { color: "#4F3C75", top: wp("-4%") }]}
          >
            فئة التصميم{" "}
          </Text>
          <View>
            <RadioForm
              style={styles.radio}
              labelStyle={{
                position: "relative",
                right: hp("5%"),
                justifyContent: "center",
                alignSelf: "center",
              }}
              top={300}
              selectedButtonColor={"#4F3C75"}
              buttonColor={"#4F3C75"}
              formVertical={true}
              radio_props={radio_props}
              initial={"other"}
              onPress={(value) => {
                this.setState({ category: value });
              }}
            />
          </View>

          <Text
            style={{
              color: "#FFEED6",
              fontSize: 25,
            }}
          >
            رفع العمل
          </Text>
        </TouchableOpacity>
      </View>
    );
  } //End of Second return
}

var radio_props = [
  { value: "logo" },
  { value: "filter" },
  { value: "branding" },
  { value: "digitalArt" },
  { value: "poster" },
  { value: "infographic" },
  { value: "certification" },
  { value: "other" },
];

const styles = StyleSheet.create({
  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
