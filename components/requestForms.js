import firebase from "../database/firebase";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-datepicker";
import Svg, { Defs, G, Path } from "react-native-svg";
import { fromHsv, TriangleColorPicker, toHsv } from "react-native-color-picker";
import SvgComponent from "./rquestPageImage";
import * as Animatable from "react-native-animatable";
import { Entypo } from '@expo/vector-icons';
import uuid from "react-native-uuid";
import Notify from "./sendNotification";
import React, { Component} from "react";
import moment from 'moment/min/moment-with-locales';
// import * as Permissions from 'expo-permissions';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';




export default class RequestForm extends Component {
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
      ImagePath: "",
      reference: "https://firebasestorage.googleapis.com/v0/b/eftan2020.appspot.com/o/Drafts%2Fno-photos.png?alt=media&token=27e6d1c3-0ce6-4dc2-9509-4aa7e5bc2e21",
      Imagekey: "",
      popup: false,
      colorNum: 0,
      mainStep: true,
      DID: "",
      uploading:false,
      designerToken: "",
      notify:false,
    };
    const DID = props.navigation.state.params.DID;
    this.updateInputVal(DID, "DID");
    firebase.database().ref('GraphicDesigner/'+DID).child("notificationsKey").on(('value'), (dataSnapshot)=> {
      console.log("dataSnapshot   "+ dataSnapshot.val())
      this.updateInputVal(dataSnapshot.val(),"designerToken");
      console.log("designer token    "+this.state.designerToken)
    })
    console.log("designer token    "+this.state.designerToken)


  
  }
  //////for udate state values @#$%^Y$#$%^&*&^%$#@#$%^&*(*&^%$#@$%^&*(*&^%$#$%^&*()))
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }; //////END of udate state values function

  ///Show nex Step @#$%^&*(*&^%$#@#$%^&*(*&^%$#@!#$%^&*()*&^%$#))
  shownexStep = () => {
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
    this.updateInputVal(false, "mainStep");
  };

  ///Pop Up Window @#$%^&*(*&^%$#@!@#$%^&*(*&^%$#@#$%^&*(&^%$E%^&*()*&^%$%^&*())))
  popUpWindow = (colorNum) => {
    this.closePopUp();
    this.updateInputVal(false, "popup");
    this.updateInputVal(true, "popup");
    this.updateInputVal(colorNum, "colorNum");
  };
  closePopUp = () => {
    let checkOnColor = /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/;
    let colors = this.state.color1 + this.state.color2 + this.state.color3;

    if (!checkOnColor.test(this.state.color1) && this.state.color1 !== "") {
      Alert.alert(
        "تنبيه",
        "الرجاء إدخال رمز اللون بشكل صحيح او ترك الخانة فارغة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "color1");
      return;
    } else if (
      !checkOnColor.test(this.state.color2) &&
      this.state.color2 !== ""
    ) {
      Alert.alert(
        "تنبيه",
        "الرجاء إدخال رمز اللون بشكل صحيح او ترك الخانة فارغة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "color2");
      return;
    } else if (
      !checkOnColor.test(this.state.color3) &&
      this.state.color3 !== ""
    ) {
      Alert.alert(
        "تنبيه",
        "الرجاء إدخال رمز اللون بشكل صحيح او ترك الخانة فارغة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "color3");
      return;
    }

    this.updateInputVal(false, "popup");
  };

  /////trans color hvs to hex code @#$%^&*&^%$#$%^&*(*&^%$#@)
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

  // uploadImage = async (uri, draftName) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();

  //   var ref = firebase
  //     .storage()
  //     .ref()
  //     .child("Draft/" + draftName).getDownloadURL().then((url) =>{
  //       firebase.database().ref("/Draft").child(this.state.Imagekey).update({
  //         reference: url,
  //         Imagekey:this.state.Imagekey
  //       })
  //     })
  //   return ref.put(blob);
  // };

  onChooseImagePress = async () => {
    let SelectResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
    });
    if (!SelectResult.cancelled)
      this.updateInputVal(SelectResult.uri, "ImagePath");
    this.handleImageSelected(SelectResult);
  };

  handleImageSelected = async (SelectResult) => {
    try {
      this.setState({ uploading: true });

      if (!SelectResult.cancelled) {
        const uploadUrl = await uploadImageAsync(SelectResult.uri);
        this.setState({ reference: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      Alert.alert(
        "تنبيه",
        "فشل في رفع المسودة ، حاول مرة أخرى ",
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


  cancelproccess = () => {
    Alert.alert(
      "تراجع عن الطلب",
      "هل انت متأكد من إلغاء الطلب سيتم حذف جميع البيانات المدخلة",
      [
        {
          text: "الغاء",
        },
        {
          text: "تأكيد",
          onPress: () => {
            this.props.navigation.goBack()
          },
        },
      ],
      { cancelable: false }
    )
  }

  doneButton = () => {
    Alert.alert(
      "تأكيد رفع الطلب",
      "هل انت متأكد من رفع طلبك",
      [
        {
          text: "الغاء",
        },
        {
          text: "تأكيد",
          onPress: () => {
            
            this.storeResquset()
           },
        },
      ],
      { cancelable: false }
    )
  }

  storeResquset = () => {
    const CID = firebase.auth().currentUser.uid;
    var fullTime = moment().format(); 
    
    firebase
      .database()
      .ref("Forms/"+this.state.DID)
      .push({
        title: this.state.title,
        description: this.state.description,
        color1: this.state.color1,
        color2: this.state.color2,
        color3: this.state.color3,
        category: this.state.category,
        deadLine: this.state.deadLine,
        CID: CID,
        DID: this.state.DID,
        status: 'w',
        reference: this.state.reference,
        fullTime:fullTime,
      })
      .then((key) => {
        firebase
          .database()
          .ref("Forms/"+this.state.DID)
         .child(key.key)
         .update({ Imagekey: key.key })
        
        
      });
      this.updateInputVal(true,"notify");
      console.log(this.state.designerToken);
    Alert.alert("تنبيه", "تم رفع الطلب بنجاح ", [{ text: "حسنًا" }], {
      cancelable: false,
    });

    this.props.navigation.navigate("معرض التصاميم من منظور العميل");
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 30,
              color: "#4F3C75",
              fontWeight: "700",
              top: "6.5%",
              alignSelf: "center",
              position: "absolute",
              zIndex: 10,
            }}
          >
            طلب تصميم
          </Text>
          <Svg
            width={416}
            height={144}
            style={{ alignSelf: "center", top: "-2%", position: "relative" }}
          >
            <G data-name="Group 7">
              <G filter="url(#prefix__a)">
                <Path
                  data-name="Path 117"
                  d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                  fill="#ffeed6"
                />
              </G>
              <Path
                onPress={() => this.cancelproccess()}
                data-name="Icon ionic-ios-arrow-back"
                d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#4f3c75"
              />
              {/* <Path
                data-name="Icon material-menu"
                d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
                fill="#4f3c75"
              /> */}
            </G>
          </Svg>
          <SvgComponent
            style={{ alignSelf: "center", top: "-2%", position: "relative" }}
          ></SvgComponent>
          {this.state.mainStep && (
            <View style={styles.mainScreen}>
              <TextInput
                style={styles.inputStyle}
                maxLength={20}
                placeholder="عنوان الطلب*"
                value={this.state.title}
                onChangeText={(val) => this.updateInputVal(val, "title")}
              />

              <TextInput
                style={styles.inputStyleDescription}
                maxLength={250}
                multiline={true}
                placeholder="وصف الطلب*"
                value={this.state.description}
                onChangeText={(val) => this.updateInputVal(val, "description")}
                scrollEnabled={true}
              />
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "flex-end",
                  top: "-10%",
                  color: "#4F3C75",
                  fontWeight: "700",
                  marginRight: "10%",
                }}
              >
                التصنيف*
              </Text>
              <Picker
                selectedValue={this.state.category}
                style={{
                  height: "22%",
                  width: "80%",
                  top: "-13%",
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


              <View style={{ flexDirection: "row", }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.cancelproccess()}
                >
                  <Text style={styles.buttonText}>إلغاء</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.shownexStep()}
                >
                  <Text style={styles.buttonText}>التالي</Text>
                </TouchableOpacity>
              </View>


            </View>
          )}

          {!this.state.mainStep && (
            <Animatable.View
              style={styles.fistStepScreen}
              animation="fadeInUpBig"
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 20,
                  color: "#ccc",
                  fontWeight: "400",
                  top: "1%",
                  alignSelf: "center",
                  marginTop: "5%",
                  position: "absolute",
                }}
              >
                جميع البيانات في هذا الخطوة اختيارية{" "}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 20,
                  color: "#4F3C75",
                  fontWeight: "700",
                  top: "0%",
                  alignSelf: "center",
                  marginTop: "15%",
                  position: "absolute",
                }}
              >
                الألوان المراد استخدامها:
              </Text>

              <View style={styles.colorsbuttoncontainar}>
                <TouchableOpacity
                  style={[
                    styles.colorsbutton,
                    { backgroundColor: this.state.color3 },
                  ]}
                  onPress={() => this.popUpWindow(3)}
                >
                  <Text style={styles.buttoncolorsText}>٣</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.colorsbutton,
                    { backgroundColor: this.state.color2 },
                  ]}
                  onPress={() => this.popUpWindow(2)}
                >
                  <Text style={styles.buttoncolorsText}>٢</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.colorsbutton,
                    { backgroundColor: this.state.color1 },
                  ]}
                  onPress={() => this.popUpWindow(1)}
                >
                  <Text style={styles.buttoncolorsText}>١</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                editable={false}
                style={[
                  styles.inputStyle,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "65%",
                    position: "absolute",
                    width: "80%",
                  },
                ]}
                value={this.state.ImagePath}
                placeholder="رفع رسم توضيحي"
                onTouchStart={() => this.onChooseImagePress()}
              />
              {this.RenderUploading()}
              <View>
                <Svg
                  width={30}
                  height={30}
                  onPress={() => this.onChooseImagePress()}
                  style={{ marginTop: "-28%", marginLeft: "-5%" }}
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

                <DatePicker
                  style={{ width: 200 }}
                  date={this.state.deadLine}
                  mode="date"
                  placeholder="آخر موعد للتسليم"
                  format="YYYY-MM-DD"
                  minDate={new Date()}
                  confirmBtnText="تم"
                  locale={"ar"}
                  cancelBtnText="إلغاء"
                  iconComponent={
                    <Entypo style={styles.dateIcon} name="calendar" size={35} color="#ccc" />

                  }
                  customStyles={{
                    placeholder: {
                      fontSize: 30,
                    },
                    dateInput: {
                      left: 40,
                      top: 50,
                      borderWidth: 0,
                      borderBottomWidth: 2,
                      borderBottomColor: "#ccc",
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {
                    this.updateInputVal(date, "deadLine");
                  }}
                />
              </View>
              {this.state.notify &&  <Notify token = {this.state.designerToken} myTitle= "بانتظار إبداعك" myMessage = "هناك طلب جديد بانتظارك"/>}
              <View style={{flexDirection: "row" , top:"10%"}}>
              <TouchableOpacity
                  style={[styles.button,{height:"50%"}]}
                  onPress={() => this.updateInputVal(true, "mainStep")}
                >
                  <Text style={styles.buttonText}> السابق </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { height: "50%" }]}
                  onPress={() => this.doneButton()}
                >
                  <Text style={styles.buttonText}> رفع الطلب </Text>
                </TouchableOpacity>

              </View>
            </Animatable.View>
          )}
          {this.state.popup && (
            <Animatable.View style={styles.popUp} animation="bounceIn">
              <TouchableOpacity
                style={{ alignSelf: "flex-end", top: "-15%", right: "5%" }}
                onPress={() => this.closePopUp()}
              >
                <Text style={styles.buttoncolorsText}>X</Text>
              </TouchableOpacity>
              {this.state.colorNum == 1 && (
                <TriangleColorPicker
                  onColorChange={(val) => this.ColorPickerhandl(val, 1)}
                  style={styles.ColorPickerStyle}
                  hideControls
                  color={this.trans(this.state.color1)}
                />
              )}
              {this.state.colorNum == 1 && (
                <TextInput
                  style={[
                    styles.coloresbutton,
                    {
                      backgroundColor:
                        this.state.color1 === "" ? "#fff" : this.state.color1,
                    },
                  ]}
                  placeholder="أدخل رمز اللون "
                  placeholderTextColor="#ccc"
                  value={this.state.color1}
                  onChangeText={(val) => this.updateInputVal(val, "color1")}
                />
              )}
              {this.state.colorNum == 2 && (
                <TriangleColorPicker
                  onColorChange={(val) => this.ColorPickerhandl(val, 2)}
                  style={styles.ColorPickerStyle}
                  hideControls
                  color={this.trans(this.state.color2)}
                />
              )}
              {this.state.colorNum == 2 && (
                <TextInput
                  style={[
                    styles.coloresbutton,
                    {
                      backgroundColor:
                        this.state.color2 === "" ? "#fff" : this.state.color2,
                    },
                  ]}
                  placeholder="أدخل رمز اللون "
                  placeholderTextColor="#ccc"
                  value={this.state.color2}
                  onChangeText={(val) => this.updateInputVal(val, "color2")}
                />
              )}
              {this.state.colorNum == 3 && (
                <TriangleColorPicker
                  onColorChange={(val) => this.ColorPickerhandl(val, 3)}
                  style={styles.ColorPickerStyle}
                  hideControls
                  color={this.trans(this.state.color3)}
                />
              )}
              {this.state.colorNum == 3 && (
                <TextInput
                  style={[
                    styles.coloresbutton,
                    {
                      backgroundColor:
                        this.state.color3 === "" ? "#fff" : this.state.color3,
                    },
                  ]}
                  placeholder="أدخل رمز اللون "
                  placeholderTextColor="#ccc"
                  value={this.state.color3}
                  onChangeText={(val) => this.updateInputVal(val, "color3")}
                />
              )}
            </Animatable.View>
          )}
        </View>
     
      </TouchableWithoutFeedback>
  
    ); // end of render return
  } //End of render
} //End of class

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
    .child("Drafts/" + uuid.v4());
  const snapshot = await ref.put(blob);
  blob.close();

  return await snapshot.ref.getDownloadURL();
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScreen: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  fistStepScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    borderRadius: 25,
    margin: "2%",
    width: "40%",
    height: "40%",
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFEED6",
    fontSize: 25,
    top: "-9%",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  inputStyle: {
    alignSelf: "center",
    fontSize: 18,
    width: "80%",
    textAlign: "right",
    top: "-10%",
    borderColor: "#ccc",
    borderBottomWidth: 2,
    padding: "3%",
    margin: "4%",
  },
  inputStyleDescription: {
    alignSelf: "center",
    fontSize: 18,
    width: "80%",
    height: "25%",
    textAlign: "right",
    top: "-10%",
    borderColor: "#ccc",
    borderWidth: 2,
    padding: "3%",
    margin: "4%",
  },
  colorsbutton: {
    borderWidth: 2,
    borderColor: "#4F3C75",
    height: "20%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  buttoncolorsText: {
    color: "#4F3C75",
    fontSize: 30,
    justifyContent: "center",
  },
  colorsbuttoncontainar: {
    height: "100%",
    flexDirection: "row",
  },
  popUp: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: "50%",
    height: "25%",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    borderRadius: 30,
  },
  ColorPickerStyle: {
    top: "-20%",
    alignSelf: "center",
    height: "50%",
    width: "50%",
  },
  coloresbutton: {
    bottom: "20%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    position: "absolute",
    width: "50%",
    height: "10%",
    textAlign: "center",
  },
  dateIcon: {
    position: "absolute",
    top: 50,
    left: -20,
    zIndex: 10,
  },
});
