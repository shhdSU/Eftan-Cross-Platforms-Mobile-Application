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
import uuid from "react-native-uuid";

export default class SubmitDesign extends React.Component {
  constructor(props) {
    super();
    var Requiest = props.navigation.state.params.obj;
    this.state = {
      Imagekey: "", // @HadeelHamad
      uploading: false,
      localpath: "",
      submissionUrl: "",
      status: "",
    };
    this.updateInputVal(Requiest.Imagekey, "Imagekey");
    this.updateInputVal(Requiest.status, "status");

  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  //---------------تحديث حالة الطلب من (الحالية) الى (المنجزة) --------------
  UpdateStatusAfterAccepted = () => {
    var key = this.state.Imagekey;
    this.updateInputVal("d", "status");
    firebase
      .database()
      .ref("Forms/" + key)
      .update({ status: this.state.status });
    this.props.navigation.navigate("DisplayRequest");
  };

  onChooseImagePress = async () => {
    //takes image from the mobile gallery
    let SelectResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
    });
    if (!SelectResult.cancelled)
      this.updateInputVal(SelectResult.uri, "localpath");
    this.handleImageSelected(SelectResult);
  };

  handleImageSelected = async (SelectResult) => {
    try {
      this.setState({ uploading: true });

      if (!SelectResult.cancelled) {
        const uploadUrl = await uploadImageAsync(SelectResult.uri);
        this.setState({ submissionUrl: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      Alert.alert(
        "تنبيه",
        "فشل في رفع التصميم ، حاول مرة أخرى ",
        [{ text: "حسنًا" }],
        {
          cancelable: false,
        }
      );
    } finally {
      this.setState({ uploading: false });
    }
  };

  RenderUploading = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  uploadDesign() {
    //upload info to realtime DB

    if (this.state.localpath === '') {
      Alert.alert("تنبيه", "الرجاء اختيار ملف التصميم", [{ text: "حسنًا" }], {
        cancelable: false,
      });

      return;
    }
    this.UpdateStatusAfterAccepted();

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var currentDate = year + "-" + month + "-" + date;

    firebase
      .database()
      .ref("Forms/")
      .child(this.state.Imagekey)
      .update({
        submissionUrl: this.state.submissionUrl,
        submissionDate: currentDate,
        status: "d",
      })
      .then(
        this.updateInputVal("", "submissionUrl"),

        Alert.alert("تنبيه", "تم تسليم الطلب بنجاح", [{ text: "حسنًا" }], {
          cancelable: false,
        }),
        this.updateInputVal("", "localpath")
      )
      .catch((error) => {
        Alert.alert("فشل في حفظ التصميم ، حاول مرة أخرى", [{ text: "حسنًا" }], {
          cancelable: false,
        });
      });
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
      <ScrollView style={styles.container}>
        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-3%", position: "relative" }}
        >
          <G data-name="Group 7">
            <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G>
            {
              <Path
                data-name="Icon ionic-ios-arrow-back"
                d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#4f3c75"
              />
            }
            <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            />
          </G>
        </Svg>
        <Text
          style={{
            fontSize: 25,
            color: "#4F3C75",
            fontWeight: "700",
            top: "-11%",
            alignSelf: "center",
            zIndex: 6,
            fontWeight: "700",
          }}
        >
          تسليم الطلب
        </Text>

        <SvgComponent
          style={{ alignSelf: "center", top: "-5.5%", position: "relative" }}
        ></SvgComponent>

        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-5%", fontWeight: "700" },
          ]}
        >
          اختيار ملف التصميم *{" "}
        </Text>

        <Image
          onTouchStart={this.onChooseImagePress}
          style={styles.tinyLogo}
          source={require("../assets/upload.png")}
        />
        <Image
          style={styles.preview}
          //onTouchStart={this.onChooseImagePress}
          source={{
            uri: this.state.localpath,
          }}
        />
        {this.RenderUploading()}

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Alert.alert(
              "تأكيد رفع العمل",
              "هل أنت متأكد من رغبتك في رفع هذا العمل؟",
              [
                {
                  text: "إلغاء",
                  onPress: () => {
                    this.props.navigation.navigate("SubmitDesign");
                  },
                },

                {
                  text: "تأكيد",
                  onPress: () => {
                    this.uploadDesign();
                  },
                },
              ],
              { cancelable: false }
            )
          }
        >
          <Text
            style={{
              color: "#FFEED6",
              fontSize: 20,
            }}
          >
            تسليم الطلب
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("فشل الطلب"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  var ref = firebase
    .storage()
    .ref()
    .child("SubmittedDesign/" + uuid.v4());
  const snapshot = await ref.put(blob);
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },

  tinyLogo: {
    width: 30,
    height: 30,
    right: "-12%",
    top: "-10.5%",
  },
  preview: {
    width: 300,
    height: 250,
    borderColor: "#ccc",
    borderWidth: 2,
    top: "-10%",
    borderRadius: 35,
    alignSelf: "center",
  },

  inputStyle2: {
    fontSize: 18,
    marginTop: "4%",
    width: "80%",
    marginBottom: "2%",
    paddingBottom: "2%",
    textAlign: "right",
    top: "0%",
    left: "10%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    justifyContent: "center",
    borderRadius: 25,
    width: "80%",
    height: "3.5%",
    alignSelf: "center",
    bottom: "6%",
  },

  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  SvgComponentStyle: {
    top: "-8%",
  },
});
