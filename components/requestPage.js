import firebase from "../database/firebase";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Picker,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-datepicker";
import Svg, { Defs, G, Path } from "react-native-svg";
import { fromHsv, TriangleColorPicker, toHsv } from "react-native-color-picker";
import SvgComponent from "./rquestPageImage";

export default class RequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      color1: "",
      color2: "",
      color3: "",
      category: "",
      reference: "",
      deadLine: "",
      Cemail: "",
      Demail: "",
      ImageURL: "",
      show: false,
      colorNum: 0,
    };
  }
  trans(val) {
    return toHsv(val);
  }
  ColorPickerhandl = (val, num) => {
    let hexVal = fromHsv(val);
    let type = "NONE";

    switch (num) {
      case 1: {
        type = "color1";
        break;
      }
      case 2: {
        type = "color2";
        break;
      }
      case 3: {
        type = "color3";
        break;
      }
    }
    if (type !== "NONE") this.updateInputVal(hexVal, type);
    else console.log("Method fail");
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  showcolorpicker = (colorNum) => {
    if (this.state.colorNum !== 0) {
      this.updateInputVal(false, "show");
    }
    if (this.state.show == false) {
      this.updateInputVal(true, "show");
      this.updateInputVal(colorNum, "colorNum");
    } else this.updateInputVal(false, "show");
  };
  uploadImage = async (uri, draftName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("Draft/" + draftName);
    return ref.put(blob);
  };
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.uploadImage(result.uri, "Draft")
      .then(console.log("DONE"))
      // this.updateInputVal(result.uri, "ImageURL");
    }
  };
  setSelectedValue = (val) => {
    this.updateInputVal(val, "category");
  };

  storeResquset = () => {
    //Checking on colors only if not Empty
    let checkOnColor = /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/;
    let colors = this.state.color1 + this.state.color2 + this.state.color3;
    if (colors !== "") {
      if (
        (!checkOnColor.test(this.state.color1) || this.state.color1 === "") &&
        (!checkOnColor.test(this.state.color2) || this.state.color2 === "") &&
        (!checkOnColor.test(this.state.color3) || this.state.color3 === "")
      ) {
        Alert.alert(
          "تنبيه",
          "الرجاء إدخال رمز اللون بشكل صحيح او ترك الخانة فارغة",
          [{ text: "حسنًا" }],
          { cancelable: false }
        );
        this.updateInputVal("", "color1");
        this.updateInputVal("", "color2");
        this.updateInputVal("", "color3");
        return;
      }
    }
    //Checking on Required info
    if (
      this.state.category === "" ||
      this.state.title === "" ||
      this.state.description === ""
    ) {
      Alert.alert(
        "تنبيه",
        "الرجاء التأكد من إدخال جميع البيانات المطلوبة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      return;
    }
    //Checking on title
    var specialCheck = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var numCheck = /\d/;
    if (
      specialCheck.test(this.state.title) ||
      numCheck.test(this.state.title)
    ) {
      Alert.alert(
        "تنبيه",
        "يجب ان يحتوي العنوان على أحرف فقط",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "title");
      return;
    }
    // const Cemail = firebase.auth().currentUser.email;// الطريقة غلط...
    firebase.database().ref("Forms/").push({
      title: this.state.title,
      description: this.state.description,
      color1: this.state.color1,
      color2: this.state.color2,
      color3: this.state.color3,
      category: this.state.category,
      reference: this.state.reference,
      deadLine: this.state.deadLine,
      // Cemail: Cemail,
      Demail: "",
      ImageURL: this.state.ImageURL,
    });
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
            طلب تصميم
          </Text>

          <SvgComponent style={styles.SvgComponentStyle}></SvgComponent>
          <TextInput
            style={styles.inputStyle}
            placeholder="عنوان الطلب*"
            value={this.state.title}
            onChangeText={(val) => this.updateInputVal(val, "title")}
          />

          <TextInput
            editable={false}
            style={[styles.inputStyle, { width: "80%", left: "8.5%" }]}
            value={this.state.ImageURL}
            placeholder="رفع مسودة"
            onChangeText={(val) => this.updateInputVal(val, "title")}
            onTouchStart={() => this.onChooseImagePress()}
          />

          <View>
            <Svg
              width={30}
              height={30}
              onPress={() => this.onChooseImagePress()}
              style={styles.uploadIcon}
            >
              <G
                data-name="Icon feather-upload"
                fill="none"
                stroke="#c5c3c1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
              >
                <Path
                  data-name="Path 220"
                  d="M28.5 19.5v6a3 3 0 01-3 3h-21a3 3 0 01-3-3v-6"
                />
                <Path data-name="Path 221" d="M22.5 9L15 1.5 7.5 9" />
                <Path data-name="Path 222" d="M15 1.5v18" />
              </G>
            </Svg>
          </View>
          <Text
            style={{
              fontSize: 20,
              alignSelf: "flex-end",
              top: "-4%",
              color: "#4F3C75",
              fontWeight: "700",
            }}
          >
            الألوان المراد استخدامها
          </Text>
          {/* <ScrollView horizontal={true}> */}
          <TextInput
            style={[styles.inputStyle, { top: "-14%", overflow: "scroll" }]}
            numberOfLines={6}
            placeholder="وصف الطلب*"
            value={this.state.description}
            onChangeText={(val) => this.updateInputVal(val, "description")}
            scrollEnabled={true}
          />
          {/* </ScrollView> */}
          {this.state.show && this.state.colorNum == 1 && (
            <TriangleColorPicker
              onColorChange={(val) => this.ColorPickerhandl(val, 1)}
              style={styles.ColorPickerStyle}
              hideControls
              color={this.trans(this.state.color1)}
            />
          )}
          {this.state.show && this.state.colorNum == 2 && (
            <TriangleColorPicker
              onColorChange={(val) => this.ColorPickerhandl(val, 2)}
              style={styles.ColorPickerStyle}
              hideControls
              color={this.trans(this.state.color2)}
            />
          )}
          {this.state.show && this.state.colorNum == 3 && (
            <TriangleColorPicker
              onColorChange={(val) => this.ColorPickerhandl(val, 3)}
              style={styles.ColorPickerStyle}
              hideControls
              color={this.trans(this.state.color3)}
            />
          )}

          <TextInput
            style={[
              styles.coloresbutton,
              {
                backgroundColor:
                  this.state.color1 === "" ? "#fff" : this.state.color1,
                left: "83%",
              },
            ]}
            placeholder="اللون الأول"
            placeholderTextColor="#4F3C75"
            value={this.state.color1}
            onTouchStart={() => this.showcolorpicker(1)}
            onChangeText={(val) => this.updateInputVal(val, "color1")}
          />
          <TextInput
            style={[
              styles.coloresbutton,
              {
                backgroundColor:
                  this.state.color2 === "" ? "#fff" : this.state.color2,
                left: "67%",
              },
            ]}
            placeholder="اللون الثاني"
            placeholderTextColor="#4F3C75"
            value={this.state.color2}
            onTouchStart={() => this.showcolorpicker(2)}
            onChangeText={(val) => this.updateInputVal(val, "color2")}
          />
          <TextInput
            style={[
              styles.coloresbutton,
              {
                backgroundColor:
                  this.state.color3 === "" ? "#fff" : this.state.color3,
                left: "51%",
              },
            ]}
            placeholder="اللون الثالث"
            placeholderTextColor="#4F3C75"
            value={this.state.color3}
            onTouchStart={() => this.showcolorpicker(3)}
            onChangeText={(val) => this.updateInputVal(val, "color3")}
          />
          {this.state.show && (
            <TouchableOpacity
              style={styles.button2}
              onPress={() => this.updateInputVal(false, "show")}
            >
              <Text
                style={{
                  color: "#FFEED6",
                  fontSize: 13,
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                إغلاق اداة التقاط اللون
              </Text>
              <Text style={{ alignSelf: "center" }}> </Text>
              <Text
                style={{
                  color: "#FFEED6",
                  fontSize: 15,
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                X
              </Text>
            </TouchableOpacity>
          )}
          <Text
            style={{
              fontSize: 20,
              alignSelf: "flex-end",
              top: "-5%",
              color: "#4F3C75",
              fontWeight: "700",
            }}
          >
            التصنيف*
          </Text>
          <Picker
            selectedValue={this.state.category}
            style={{
              height: "22%",
              width: "80%",
              bottom: "5%",
              alignSelf: "center",
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.updateInputVal(itemValue, "category")
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

          <DatePicker
            style={{ width: 200 }}
            date={this.state.deadLine}
            mode="date"
            format="YYYY-MM-DD"
            minDate={new Date()}
            confirmBtnText="تم"
            cancelBtnText="إلغاء"
            hideText
            locale={"ar"}
            iconComponent={
              <Svg width={31.5} height={36} style={styles.dateIcon}>
                <Path
                  data-name="Icon awesome-calendar-alt"
                  d="M0 32.625A3.376 3.376 0 003.375 36h24.75a3.376 3.376 0 003.375-3.375V13.5H0zm22.5-13.781a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm0 9a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm-9-9a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm0 9a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm-9-9A.846.846 0 015.344 18h2.812a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844H5.344a.846.846 0 01-.844-.844zm0 9A.846.846 0 015.344 27h2.812a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844H5.344a.846.846 0 01-.844-.844zM28.125 4.5H24.75V1.125A1.128 1.128 0 0023.625 0h-2.25a1.128 1.128 0 00-1.125 1.125V4.5h-9V1.125A1.128 1.128 0 0010.125 0h-2.25A1.128 1.128 0 006.75 1.125V4.5H3.375A3.376 3.376 0 000 7.875v3.375h31.5V7.875A3.376 3.376 0 0028.125 4.5z"
                  fill="#c5c3c1"
                />
              </Svg>
            }
            onDateChange={(date) => {
              this.setState({ deadLine: date });
            }}
          />
          <TextInput
            editable={false}
            style={[
              styles.inputStyle,
              { width: "80%", left: "8%", top: "-12%" },
            ]}
            placeholder="آخر موعد للتسليم"
            value={this.state.deadLine}
            onChangeText={(val) => this.updateInputVal(val, "deadLine")}
          />
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => this.storeResquset()}
          >
            <Text
              style={{
                
              }}
            >
              رفع الطلب
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  } //End of Second return
}
const styles = StyleSheet.create({
  container: {
    padding: "10%",
    backgroundColor: "#fff",
  },
  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    alignSelf: "center",
    fontSize: 18,
    width: "100%",
    textAlign: "right",
    top: "-8%",
    borderColor: "#ccc",
    borderBottomWidth: 2,
    padding: "3%",
    margin: "4%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    borderRadius: 25,
    width: "100%",
    height: "5%",
    alignSelf: "center",
    bottom: "10%",
    justifyContent: "center",
  },
  button2: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#4F3C75",
    padding: "1%",
    borderRadius: 25,
    width: "50%",
    height: "3%",
    marginTop: "4%",
    top: "-31%",
  },
  dateIcon: {
    position: "absolute",
    bottom: "170%",
    right: "80%",
    zIndex: 2,
  },
  ColorPickerStyle: {
    position: "absolute",
    top: "56%",
    height: "10%",
    width: "40%",
    backgroundColor: "#fff",
    zIndex: 2,
  },
  coloresbutton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    width: "16%",
    height: "3.2%",
    borderWidth: 2,
    borderColor: "#4F3C75",
    fontSize: 9,
    textAlign: "center",
    position: "absolute",
    top: "52.5%",
  },
  tab: {
    alignSelf: "center",
    top: "-8%",
  },
  SvgComponentStyle: {
    top: "-8%",
  },
  uploadIcon: {
    top: "-400%",
  },
});
