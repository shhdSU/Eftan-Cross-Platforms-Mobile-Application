/*Useful note for you, 
-------------when you want to search for user attributes using his/her uid..

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

/*-------------- retrieve link of imagr in storage
firebase
            .storage()
            .ref("DesignWork/" + this.state.designTitle)
            .getDownloadURL()
            .then((url) => {
              this.updateInputVal(url, "designFile");
              */
import React, { Component } from "react";
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
  ActivityIndicator,
  Picker,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../database/firebase";

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

  onChooseImagePress = async () => {
    //takes image from the mobile gallery
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) this.updateInputVal(result.uri, "localpath");
  };
  uploadImage = async (uri, draftName) => {
    //upload img to storage knowing its local path
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("DesignWork/" + this.state.designFileKey);
    return ref.put(blob);
  };

  uploadDesign() {
    //upload info to realtime DB, retreive their key to be the key of the img in storage
    if (
      this.state.category === "" ||
      this.state.designTitle === "" ||
      this.state.designDescription === ""
    ) {
      Alert.alert(
        "تنبيه",
        "الرجاء التأكد من إدخال جميع البيانات المطلوبة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      return;
    }
    if (this.state.localpath === "") {
      Alert.alert("تنبيه", "الرجاء اختيار ملف التصميم", [{ text: "حسنًا" }], {
        cancelable: false,
      });
      return;
    }

    var specialCheck = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var numCheck = /\d/;
    if (
      specialCheck.test(this.state.designTitle) ||
      numCheck.test(this.state.designTitle)
    ) {
      Alert.alert(
        "تنبيه",
        "يجب ان يحتوي العنوان على أحرف فقط",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "designTitle");
      return;
    }

    //const user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Designs/")
      .push({
        // Duid: user,
        designTitle: this.state.designTitle,
        designDescription: this.state.designDescription,
        category: this.state.category,
        designFileKey: "",
      })
      .then((key) => {
        this.updateInputVal(key.key, "designFileKey");
        this.updateInputVal("", "designTitle");
        this.updateInputVal("", "category");
        this.updateInputVal("", "designDescription");

        firebase
          .database()
          .ref("Designs/")
          .child(this.state.designFileKey)
          .update({ designFileKey: this.state.designFileKey })
          .then(
            this.uploadImage(this.state.localpath, this.state.designFileKey)
          );
        Alert.alert("تنبيه", "تم رفع العمل بنجاح", [{ text: "حسنًا" }], {
          cancelable: false,
        });
        this.updateInputVal("", "localpath");
      });
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
            fontSize: 24,
            color: "#4F3C75",
            fontWeight: "700",
            top: "-14%",
            alignSelf: "center",
            zIndex: 6,
          }}
        >
          رفع تصميم جديد
        </Text>

        <SvgComponent
          style={{ alignSelf: "center", top: "-5%", position: "relative" }}
        ></SvgComponent>

        <Text style={[styles.inputStyle2, { color: "#4F3C75", top: "-4%" }]}>
          عنوان العمل *{" "}
        </Text>
        <TextInput
          style={styles.inputStyle}
          value={this.state.designTitle}
          onChangeText={(val) => this.updateInputVal(val, "designTitle")}
        />

        <Text style={[styles.inputStyle2, { color: "#4F3C75", top: "-7%" }]}>
          وصف العمل *{" "}
        </Text>
        <TextInput
          style={styles.inputStyleDescription}
          maxLength={250}
          multiline={true}
          value={this.state.designDescription}
          onChangeText={(val) => this.updateInputVal(val, "designDescription")}
          scrollEnabled={true}
        />

        <Text style={[styles.inputStyle2, { color: "#4F3C75", top: "-9%" }]}>
          اختيار ملف التصميم *{" "}
          <TouchableOpacity onPress={() => this.onChooseImagePress()}>
            <Image
              style={styles.tinyLogo}
              source={require("../assets/upload.png")}
            />
          </TouchableOpacity>
        </Text>

        <Image
          style={styles.preview}
          source={{
            uri: this.state.localpath,
          }}
        />
        <Text style={[styles.inputStyle2, { color: "#4F3C75", top: "-4%" }]}>
          * فئة التصميم{" "}
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
    );
  } //End of Second return
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "10%",
    backgroundColor: "#fff",
  },
  inputStyleDescription: {
    alignSelf: "center",
    fontSize: 18,
    width: "80%",
    height: "15%",
    textAlign: "right",
    top: "-8%",
    borderColor: "#ccc",
    borderWidth: 2,
  },
  tinyLogo: {
    width: 30,
    height: 30,
    right: "1280%",
    top: "25%",
  },
  preview: {
    width: 300,
    height: 250,
    borderColor: "#B7B7B7",
    borderWidth: 1,
    top: "-8%",
    alignSelf: "center",
  },
  inputStyle: {
    fontSize: 18,
    marginTop: "3%",
    width: "100%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 2,
    textAlign: "right",
    top: "-6.7%",
  },
  inputStyle2: {
    fontSize: 18,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    textAlign: "right",
    top: "0%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    borderRadius: 25,
    width: "80%",
    height: "6%",
    alignSelf: "center",
  },

  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  radio: {
    top: "-4%",
    left: "23%",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    zIndex: 6,
  },

  SvgComponentStyle: {
    top: "-8%",
  },
});
