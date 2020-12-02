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
import * as Animatable from "react-native-animatable";
import LottieView from 'lottie-react-native';
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
import { Feather } from '@expo/vector-icons'; 
import * as ImagePicker from "expo-image-picker";
import firebase from "../database/firebase";
import uuid from "react-native-uuid";

export default class UploadNewDesign extends Component {
  constructor() {
    super();
    this.state = {
      designTitle: "",
      designDescription: "",
      designTags:"",
      category: "",
      designFileKey: "",
      uploading: false,
      localpath: "",
      designUrl: "",
      popup: false,
      doneText:""
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  //-------------------------------
  popUpWindow = () => {
      this.updateInputVal(true, "popup");
  };
  //-----------------------------------------
  closePopUp = () => {
    this.updateInputVal(false, "popup");
    this.updateInputVal("", "doneText");
    this.props.navigation.navigate("معرض التصاميم من منظور المصمم")

  };
//--------------------------------------
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
        this.setState({ designUrl: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      Alert.alert(
        "للأسف",
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
    //upload info to realtime DB, retreive their key to be the key of the img in storage
    if (
      this.state.category === "" ||
      this.state.designTitle === "" ||
      this.state.designDescription === ""
    ) {
      Alert.alert(
        "لطفاً",
        "الرجاء التأكد من إدخال جميع البيانات المطلوبة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      return;
    }

    if (
      this.state.designTitle.trim() == "" ||
      this.state.designDescription.trim() == ""
    ) {
      Alert.alert(
        "لطفاً",
        "الرجاء التأكد من إدخال جميع البيانات المطلوبة",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      return;
    }

    if (this.state.localpath === "") {
      Alert.alert("لطفاً", "الرجاء اختيار ملف التصميم", [{ text: "حسنًا" }], {
        cancelable: false,
      });
      return;
    }
    var specialCheck = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    //we should not accept numbers, too
    var string = this.state.designTags.trim();
    var tags = string.split(" ");
    var containsSpecial = false;
    tags.forEach((element,index) => {
  
        tags = tags.filter(function(elem) {  return elem; })
      if (specialCheck.test(element)) {
        Alert.alert(
          "لطفاً",
          "يجب ان تحتوي الكلمات المفتاحية على أحرف وأرقام فقط",
          [{ text: "حسنًا" }],
          { cancelable: false }
        );
        
        this.updateInputVal("", "designTags");
        containsSpecial=true;
      }
      }
    );
    if(containsSpecial){
      return;
    }
    console.log(tags);
    if (specialCheck.test(this.state.designTitle)) {
      Alert.alert(
        "لطفاً",
        "يجب ان يحتوي العنوان على أحرف وأرقام فقط",
        [{ text: "حسنًا" }],
        { cancelable: false }
      );
      this.updateInputVal("", "designTitle");
      return;
    }
    this.updateInputVal(true, "popup");
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var currentDate = date + "/" + month + "/" + year;
    const user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Designs/")
      .push({
        Duid: user,
        designTitle: this.state.designTitle,
        designDescription: this.state.designDescription,
        category: this.state.category,
        designUrl: this.state.designUrl,
        designUploadingdate: currentDate,
        designTags: tags,
      })
      .then((key) => {
         this.updateInputVal(true, "popup");
        //this.updateInputVal(key.key, "designFileKey");
        this.updateInputVal("", "designTitle");
        this.updateInputVal("", "category");
        this.updateInputVal("", "designDescription");
        this.updateInputVal("", "designTags");
      
        // Alert.alert("تنبيه", "تم رفع العمل بنجاح", [{ text: "حسنًا" }], {
        //   cancelable: false,
        // }),
       // this.popUpWindow(),
      
          this.updateInputVal("", "localpath");
        //  this.props.navigation.navigate("معرض التصاميم من منظور المصمم")
         
      })
      .catch((error) => {
        Alert.alert("فشل في حفظ التصميم ، حاول مرة أخرى", [{ text: "حسنًا" }], {
          cancelable: false,
        });
      });

      
  }
  setSelectedValue = (val) => {
    this.updateInputVal(val, "category");
  };
  finish=()=>{
    this.updateInputVal("تم رفع العمل بنجاح", "doneText"), 
    setTimeout(() => {
      this.closePopUp()
    }, 2000)
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
          style={{ alignSelf: "center", top: "-1.5%", position: "relative" ,shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          
          elevation: 9, }}
        >
          <G data-name="Group 7">
            {/* <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G> */}
            {/* <Path
              data-name="Icon ionic-ios-arrow-back"
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#4f3c75"
            /> */}
            <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#FEB518"
            />
          </G>
        </Svg>
        <Text
          style={{
            fontSize: 25,
            color: "#4F3C75",
            fontWeight: "700",
            top: "-5.5%",
            alignSelf: "center",
            zIndex: 6,
            fontWeight:"700",
            fontFamily: "Tajawal-Regular"
          }}
        >
          رفع تصميم جديد
        </Text>

        <SvgComponent
          style={{ alignSelf: "center", top: "-4%", position: "relative" }}
        ></SvgComponent>

        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-5%", fontFamily: "Tajawal-Bold" },
          ]}
        >
          عنوان العمل *{" "}
        </Text>
        <TextInput
          style={styles.inputStyle}
          value={this.state.designTitle}
          maxLength={20}
          placeholder="الحد الأقصى 20 حرف"
          onChangeText={(val) => this.updateInputVal(val, "designTitle")}
        />

        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-6.5%", fontFamily: "Tajawal-Bold" },
          ]}
        >
          وصف العمل *{" "}
        </Text>
        <TextInput
          style={styles.inputStyleDescription}
          placeholder="الحد الأقصى 250 حرف"
          maxLength={250}
          multiline={true}
          value={this.state.designDescription}
          onChangeText={(val) => this.updateInputVal(val, "designDescription")}
          scrollEnabled={true}
        />
 

        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-7%", fontFamily: "Tajawal-Bold"},
          ]}
        >
          اختيار ملف التصميم *{" "}
        </Text>
        <Feather name="upload" size={30} color="#FEB518"style={styles.tinyLogo}  onPress={() => this.onChooseImagePress()} />
        {/* <Image
          onPress={this.onChooseImagePress}
          onTouchStart={this.onChooseImagePress}
          style={styles.tinyLogo}
          source={require("../assets/upload.png")}
        /> */}
        <Image
          style={styles.preview}
         // onTouchStart={this.onChooseImagePress}
          source={{
            uri: this.state.localpath,
          }}
        />
        {this.RenderUploading()}

        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-10%", fontFamily: "Tajawal-Bold", },
          ]}
        >
           كلمات مفتاحية للعمل  {" "}
        </Text>
        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-14%",left: "-35%", fontWeight: "100",fontSize:13 },
          ]}
        > (يجب ألا تحتوي على رموز)
        </Text>
        <TextInput
          style={styles.tags}
          placeholder="كلمات مفتاحية مفصولة بمسافة"
          maxLength={25}
          value={this.state.designTags}
          onChangeText={(val) => this.updateInputVal(val, "designTags")}
         
        />

        <Text
          style={[
            styles.inputStyle2,
            { color: "#4F3C75", top: "-14%", fontFamily: "Tajawal-Bold", },
          ]}
        >
          فئة التصميم*{" "}
        </Text>
        <Picker
          selectedValue={this.state.category}
          style={{
            height: "22%",
            width: "80%",
            bottom: "15%",
            alignSelf: "center",
            
          }}
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
        onPress={() =>
          Alert.alert(
            "تأكيد رفع العمل",
            "هل أنت متأكد من رغبتك في رفع هذا العمل؟",
            [
             
               {
                text: "إلغاء",
                onPress: () => {
                },
              },{
                text: "تأكيد",
                onPress: () => {
                this.uploadDesign()
                

                
                },
              },
            ],
            { cancelable: false }
          )
        }
      > 
        <Text
            style={{
              color: "#fff",
              fontSize: 25,
              fontFamily: "Tajawal-Medium",
              top:"5%",
            }}
          >
            رفع العمل
          </Text>
        </TouchableOpacity>
        {this.state.popup && (
        <Animatable.View style={styles.popUp} animation="bounceIn">
          
        <LottieView
        source={require('../assets/lottie/uploaded.json')}
        loop={false}
        onAnimationFinish={() => this.finish()}
       speed={1.5}
        autoPlay
     
        style={{ width: "90%", height: "90%" ,alignSelf:"center",justifyContent:"center",right:"1%",top:"-3%"
        
        //margin:"5%"
      }}
      />
      
      <Text style={{ color: "#603F98", fontSize: 18 , fontFamily:"Tajawal-Medium",marginBottom:"8%"}}>
           { this.state.doneText}
          </Text>
         
          </Animatable.View>)}
      </ScrollView>
    );
  } //End of Second return
  
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
    .child("DesignWork/" + uuid.v4());
  const snapshot = await ref.put(blob);
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // padding: "10%",
    backgroundColor: "#fff",
  },
 
  inputStyleDescription: {
    alignSelf: "center",
    fontSize: 18,
    width: "80%",
    height: "8%",
    textAlign: "right",
    top: "-7%",
    borderColor: "#ccc",
    borderWidth: 2,
    fontFamily: "Tajawal-Medium",
  },
  tags: {
    alignSelf: "center",
    fontSize: 18,
    width: "80%",
    // height: "8%",
    textAlign: "right",
    top: "-14%",
    borderColor: "#ccc",
    borderBottomWidth: 2,
    fontFamily: "Tajawal-Medium",
  },
  tinyLogo: {
    width: 30,
    height: 30,
    right: "-10%",
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
  inputStyle: {
    fontSize: 18,
    marginTop: "3%",
    width: "80%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 2,
    textAlign: "right",
    top: "-7%",
    fontFamily: "Tajawal-Regular"
  },
  popUp: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: "170%",
    height: "5%",
    width: "75%",
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
  inputStyle2: {
    fontSize: 18,
    marginTop: "4%",
    width: "80%",
    marginBottom: "2%",
    paddingBottom: "2%",
    textAlign: "right",
    top: "0%",
    left: "10%",
    fontFamily: "Tajawal-Light"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    justifyContent: "center",
    borderRadius: 25,
    width: "80%",
    height: "3.5%",
    alignSelf:"center",
    bottom: "20%", 
  },
  

  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    fontFamily: "Tajawal-Regular"
  },
  

  SvgComponentStyle: {
    top: "-8%",
  },
});
