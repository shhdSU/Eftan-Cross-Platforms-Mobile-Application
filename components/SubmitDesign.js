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

} from "react-native";
import { Feather } from '@expo/vector-icons'; 
import * as ImagePicker from "expo-image-picker";
import firebase from "../database/firebase";
import uuid from "react-native-uuid";
import Notify from "./sendNotification";

export default class SubmitDesign extends React.Component {
  constructor(props) {
    super();
    var Requiest = props.navigation.state.params.obj;
    this.state = {
      Imagekey: "", // @HadeelHamad
      CID: "",
      uploading: false,
      localpath: "",
      submissionUrl: "",
      status: "",
      done: false,
      popup: false,
      doneText:"",
      dname: "",
      doneMessage: "",
      clientToken: "",
      price:""
    };
    this.updateInputVal(Requiest.Imagekey, "Imagekey");
    this.updateInputVal(Requiest.status, "status");
    this.updateInputVal(Requiest.CID, "CID");

    //---------------clientToken-------------------
    firebase.database().ref("Client/" + this.state.CID).child("notificationsKey").on("value", (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        firebase.database().ref("Client/" + this.state.CID).child("notificationsKey").on("value", (dataSnapshot) => {
          this.updateInputVal(dataSnapshot.val(), "clientToken");
          console.log(this.state.clientToken)
        })

      }
    })
    var designerName;
    const DID = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("GraphicDesigner/" + DID)
      .on("value", (dataSnapshot) => {
        designerName =
          dataSnapshot.child("DFirstName").val() +
          " " +
          dataSnapshot.child("DLastName").val();
        this.updateInputVal(designerName, "dname");
      });
    var doneMessage = " لقد تم إنجاز طلبك من قبل المصمم " + this.state.dname;
    this.updateInputVal(doneMessage, "doneMessage");

    console.log(doneMessage);

  }
  //------------------------------------
 
//-----------------------------------------
closePopUp = () => {
  this.updateInputVal(false, "popup");
  this.updateInputVal("", "doneText");
  this.props.navigation.navigate("DisplayRequest",{status:"d"});
};
//--------------------------------------
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  //---------------تحديث حالة الطلب من (الحالية) الى (المنجزة) --------------
  UpdateStatusAfterAccepted = () => {
    const DID = firebase.auth().currentUser.uid;
    var key = this.state.Imagekey;
    this.updateInputVal("d", "status");
    firebase
      .database()
      .ref("Forms/" + DID + "/" + key)
      .update({ status: this.state.status });

    
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
    //upload info to realtime DB

    if (this.state.localpath === "" || this.state.price === "") {
      Alert.alert("لطفاً", "الرجاء ادخال جميع البيانات المطلوبة", [{ text: "حسنًا" }], {
        cancelable: false,
      });

      return;
    }

    
            this.updateInputVal(true, "popup");
            this.UpdateStatusAfterAccepted();
            var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var currentDate = year + "-" + month + "-" + date;
    const DID = firebase.auth().currentUser.uid;
    this.updateInputVal(true, "done"),
      firebase
        .database()
        .ref("Forms/"+DID)
        .child(this.state.Imagekey)
        .update({
          submissionUrl: this.state.submissionUrl,
          submissionDate: currentDate,
          status: "d",
          reference :"",
          Price:this.state.price,
        })
        .then(
          this.updateInputVal("", "submissionUrl"),
          this.updateInputVal("", "localpath"),
          this.updateInputVal("", "price"),
         
        )
        .catch((error) => {
          Alert.alert("فشل في حفظ التصميم ، حاول مرة أخرى", [{ text: "حسنًا" }], {
            cancelable: false,
          });
        });

         
     
  
  };

  finish=()=>{
    this.updateInputVal("تم تسليم الطلب بنجاح", "doneText"), 
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
        { this.state.done && <Notify token={this.state.clientToken} myTitle="تهانينا" myMessage={this.state.doneMessage} />}

        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-3%", position: "relative",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          
          elevation: 9,
           }}
        >
          <G data-name="Group 7">
            {/* <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G> */}
            {
              <Path
                data-name="Icon ionic-ios-arrow-back"
                d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#FEB518"
              />
            }
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
            fontSize: 27,
            color: "#4F3C75",
            top: "-9%",
            alignSelf: "center",
            zIndex: 6,
            fontFamily: "Tajawal-Regular"
          }}
        >
          تسليم الطلب
        </Text>

        <SvgComponent
          style={{ alignSelf: "center", top: "-7%", position: "relative" }}
        ></SvgComponent>
        <Text
          style={[
            styles.inputStyle2,
            { color: "#4f3c75", top: "-8%",  fontFamily: "Tajawal-Bold"
          },
          ]}
        >
          سعر التصميم *{" "}
        </Text>
<TextInput
          style={styles.inputStyle}
          placeholder="  بالريال السعودي  "
          value={this.state.price}
          onChangeText={(val) => 
            this.setState({
              price: val.replace(/[^0-9]/g, '')
          })
          }
            
        />
        <Text
          style={[
            styles.inputStyle2,
            { color: "#4f3c75", top: "%", fontFamily: "Tajawal-Bold"},
          ]}
        >
          اختيار ملف التصميم *{" "}
        </Text>
        <Feather name="upload" size={32} color="#FEB518"style={styles.tinyLogo}  onPress={() => this.onChooseImagePress()} />
        
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
              "تأكيد تسليم الطلب",
              "هل أنت متأكد من رغبتك في تسليم هذا الطلب",
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
            )}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 25,
              top:"8%",
              fontFamily: "Tajawal-Medium",
            }}
          >
            تسليم الطلب
          </Text>
         
        </TouchableOpacity>

        {this.state.popup && 
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
         
          </Animatable.View>}
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
  popUp: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: "80%",
    height: "25%",
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
  tinyLogo: {
    width: 30,
    height: 30,
    right: "-12%",
    top: "-6%",
  },
  preview: {
    width: 300,
    height: 250,
    borderColor: "#ccc",
    borderWidth: 2,
    top: "-5%",
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
    fontFamily: "Tajawal-Regular"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    justifyContent: "center",
    borderRadius: 25,
    width: "80%",
    height: "6%",
    alignSelf: "center",
    bottom: "2%",
  },
  inputStyle: {
    position:"absolute",
    fontSize: 18,
    width: "80%",
    height:"6%",
    // marginBottom: "2%",
    // paddingBottom: "2%",
    top:"45%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius:15,
    textAlign: "right",
    padding:15,
    fontFamily: "Tajawal-Regular"
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
