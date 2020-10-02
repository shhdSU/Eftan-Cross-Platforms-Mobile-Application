/*Useful note for you, when you want to search for user attributes using his/her uid..

const user = firebase.auth().currentUser.uid;
    var email;
    firebase
      .database()
      .ref(`GraphicDesigner/` + user)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          firebase
            .database()
            .ref(`GraphicDesigner/` + user)
            .on("value", function (dataSnapshot) {
              email = dataSnapshot.child("DEmail").val();
            });
        }
      });
*/
import React, { Component } from "react";
import RadioForm from "react-native-simple-radio-button";
import Svg, { Defs, G, Path } from "react-native-svg";
import SvgComponent from "./uploadSVG";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Picker,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Svg, { Path } from "react-native-svg";
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
      designFileKey: "",
      isLoading: false,
      localpath: "",
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  uploadImage = async (uri, draftName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("DesignWork/" + draftName);
    //this.updateInputVal(response.url, "designFile");

    return ref.put(blob);
  };
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    this.updateInputVal(result.uri, "localpath");
    if (!result.cancelled) {
      this.uploadImage(result.uri, this.state.designTitle) ///////////////////////
        .then(() => {
          firebase
            .storage()
            .ref("DesignWork/" + this.state.designTitle)
            .getDownloadURL()
            .then((url) => {
              this.updateInputVal(url, "designFile");
            });
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };

  uploadDesign() {
    //here you put all validation checks

    const user = firebase.auth().currentUser.uid;
    firebase
      .child("Designs")
      .push({
        Duid: user,
        designTitle: this.state.designTitle,
        designDescription: this.state.designDescription,
        category: this.state.category,
        designFile: this.state.designFile,
      })
      .then((key) => {
        this.updateInputVal(key.key, "designFileKey");
      });
    /* firebase
      .database()
      .ref("Designs/" + this.state.designTitle)
      .set({
             });*/
  }
  setSelectedValue = (val) => {
    this.updateInputVal(val, "category");
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <Svg width={416} height={144} style={styles.tab}>
              <G data-name="Group 7">
                <G filter="url(#prefix__a)">
                  <Path
                    data-name="Path 117"
                    d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                    fill="#ffeed6"
                  />
                </G>
                <Path
                  data-name="Icon ionic-ios-arrow-back"
                  d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                  fill="#4f3c75"
                />
                <Path
                  data-name="Icon material-menu"
                  d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
                  fill="#4f3c75"
                />
              </G>
            </Svg>
            <Text
              style={{
                fontSize: 30,
                color: "#4F3C75",
                fontWeight: "700",
                top: "-14%",
                alignSelf: "center",
              }}
            >
              رفع تصميم جديد
            </Text>

            <SvgComponent style={styles.SvgComponentStyle}></SvgComponent>
            <Text
              style={[styles.inputStyle2, { color: "#4F3C75", top: "-4%" }]}
            >
              عنوان العمل{" "}
            </Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="عنوان العمل"
              value={this.state.designTitle}
              onChangeText={(val) => this.updateInputVal(val, "designTitle")}
            />
            <TouchableOpacity onPress={() => this.onChooseImagePress()}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/upload.png")}
              />
            </TouchableOpacity>
            <Image
              style={styles.preview}
              source={{
                uri: this.state.localpath,
              }}
            />
            <Text
              style={[styles.inputStyle2, { color: "#4F3C75", top: "-4%" }]}
            >
              وصف العمل{" "}
            </Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="وصف العمل"
              value={this.state.designDescription}
              onChangeText={(val) =>
                this.updateInputVal(val, "designDescription")
              }
            />
            <Text
              style={[styles.inputStyle2, { color: "#4F3C75", top: wp("-4%") }]}
            >
              فئة التصميم{" "}
            </Text>
            <Picker
              selectedValue={this.state.category}
              style={{ height: "22%", width: "80%", bottom: "4%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="اختيار التصنيف" value="" />
              <Picker.Item label="علامة تجارية" value="علامة تجارية" />
              <Picker.Item label="شعار" value="شعار" />
              <Picker.Item label="فلتر" value="فلتر" />
              <Picker.Item label="انفوجرافيك" value="انفوجرافيك" />
              <Picker.Item label="إعلان" value="إعلان" />
              <Picker.Item label="شهادة" value="شهادة" />
              <Picker.Item label="فن رقمي" value="فن رقمي" />
              <Picker.Item label="أخرى" value="أخرى" />
            </Picker>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.uploadDesign()}
            >
              <Text
                style={{
                  color: "#FFEED6",
                  fontSize: 25,
                }}
              >
                رفع العمل
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  } //End of Second return
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: wp("10%"),
    backgroundColor: "#fff",
  },
  tinyLogo: {
    width: 30,
    height: 30,
    paddingBottom: "3%",
    marginBottom: "3%",
  },
  preview: {
    width: 60,
    height: 60,
    right: 10,
  },
  inputStyle: {
    fontSize: 18,
    marginTop: hp("2%"),
    width: "100%",
    marginBottom: hp("2%"),
    paddingBottom: hp("2%"),
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: wp("-5%"),
  },
  inputStyle2: {
    fontSize: 18,
    marginTop: hp("4%"),
    width: "100%",
    marginBottom: hp("2%"),
    paddingBottom: hp("2%"),
    textAlign: "right",
    top: hp("0%"),
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: hp("1%"),
    borderRadius: 25,
    width: wp("80%"),
    height: hp("6%"),
    alignSelf: "center",
  },

  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  radio: {
    top: hp("-4%"),
    left: wp("23%"),
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    zIndex: 6,
  },
  radioText: {
    fontSize: 18,
    color: "#B7B7B7",
  },
  SvgComponentStyle: {
    top: "-8%",
  },
  uploadIcon: {
    top: "-400%",
  },
});
