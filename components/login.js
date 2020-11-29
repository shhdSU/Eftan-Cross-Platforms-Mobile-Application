// components/login.js
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";
import firebase from "../database/firebase";
import LoginScrees from "./LoginScreen";
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import App from "../App";
import NotifyPermission from './reqNotifyPermission';
import Constants from 'expo-constants';




async function registerForPushNotificationsAsync (){
  let token;
  console.log("begin register");

if (Constants.isDevice) {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  console.log("before");
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("after")
} else {
  alert('Must use physical device for Push Notifications');
}

if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}
console.log("end register");

const x = firebase.auth().currentUser.uid;
  //inserting token in database
              firebase
               .database()
               .ref(`Client/` + x)
               .on("value", (snapshot) => {
                 if (snapshot.exists()) {
                 firebase.database().ref(`Client/` + x).update({notificationsKey: token});
                 }
               });
             firebase
               .database()
               .ref(`GraphicDesigner/` + x)
               .on("value", (snapshot) => {
                 if (snapshot.exists()) {
                   firebase.database().ref(`GraphicDesigner/` + x).update({notificationsKey: token});
                 }
        });

       return token;
        
}
export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      loading:true,
    };
    
  }


  async componentWillMount(){
    await Font.loadAsync({
      'Tajawal-Black': require('../assets/fonts/Tajawal-Black.ttf'),
      'Tajawal-Bold': require('../assets/fonts/Tajawal-Bold.ttf'),
      'Tajawal-ExtraBold': require('../assets/fonts/Tajawal-ExtraBold.ttf'),
      'Tajawal-ExtraLight': require('../assets/fonts/Tajawal-ExtraLight.ttf'),
      'Tajawal-Light': require('../assets/fonts/Tajawal-Light.ttf'),
      'Tajawal-Medium': require('../assets/fonts/Tajawal-Medium.ttf'),
      'Tajawal-Regular': require('../assets/fonts/Tajawal-Regular.ttf'),
      ...Ionicons.font,
    });    
    this.updateInputVal(false,"loading")


  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };


  userLogin = () => {
   
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            if (!user.emailVerified) {
              Alert.alert(
                "تنبيه",
                "يرجى تفعيل البريد الإلكتروني",
                [{ text: "حسنًا" }],
                { cancelable: false }
              );
              firebase.auth().signOut;
            } else {
              this.setState({
                isLoading: false,
                email: "",
                password: "",
              });
              <NotifyPermission />
              registerForPushNotificationsAsync();
              const user = firebase.auth().currentUser.uid;
              firebase
                .database()
                .ref(`Client/` + user)
                .on("value", (snapshot) => {
                  if (snapshot.exists()) {
                    console.log('I am here');
                    this.props.navigation.navigate(
                      "معرض التصاميم من منظور العميل"
                    );
                  }
                  return;
                });

              firebase
                .database()
                .ref(`GraphicDesigner/` + user)
                .on("value", (snapshot) => {

                  if (snapshot.exists()) {
                    this.props.navigation.navigate(
                      "معرض التصاميم من منظور المصمم");
                  }
                  return;
                });
              this.setState({
                isLoading: false,
                email: "",
                password: "",
              });
            }
           
          }

        });

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (this.state.email === "" || this.state.password === "") {
          Alert.alert(
            "تنبيه",
            "فضلًا تأكد من إدخال جميع بياناتك",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else if (errorCode == "auth/wrong-password") {
          Alert.alert(
            "تنبيه",
            "نرجو إدخال كلمة السر الصحيحة",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else if (errorCode == "auth/user-not-found") {
          Alert.alert(
            "تنبيه",
            "لا يوجد حساب مسجل بهذا البريد الإلكتروني",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else if (errorCode == "auth/invalid-email") {
          Alert.alert(
            "تنبيه",
            "نرجو كتابة البريد الإلكتروني بالطريقة الصحيحة.",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else {
          alert(errorMessage);
        }
        this.setState({
          isLoading: false,
          password: "",
        });
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

    if (this.state.loading){
      return (
        <View></View>
      );
    }

    return (
      <View style={styles.container}>
        <LoginScrees style={styles.svgComponant} />

        <TextInput
          style={styles.inputStyle}
          placeholder="البريد الالكتروني"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="كلمة السر"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, "password")}
          maxLength={15}
          secureTextEntry={true}
        />
        <Text
          style={{
            top: hp("13%"),
            color: "#4F3C75",
            textAlign: "left",
            textDecorationLine: "underline",
            fontFamily:"Tajawal-Medium",
            
          }}
          onPress={() => this.props.navigation.navigate("نسيت كلمة السر!")}
        >
          نسيت كلمة المرور؟
        </Text>

        <Text style={styles.loginText2}>ليس لديك حساب ؟</Text>
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("صفحة التسجيل")}
        >
          إنشاء حساب جديد{" "}
        </Text>

        <View style={styles.loginButton}>
          <TouchableOpacity
            onPress={() => this.userLogin()}
          >
            <Text style={styles.loginButton2}>تسجيل الدخول</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: hp("5%"),
    backgroundColor: "#fff",
  },
  inputStyle: {
    fontSize: 18,
    marginTop: wp("4%"),
    width: "100%",
    marginBottom: hp("2%"),
    paddingBottom: hp("2%"),
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: hp("15%"),
    fontFamily:"Tajawal-Medium",
  },
  loginText: {
    fontSize: 18,
    color: "#4F3C75",
    marginTop: hp("1%"),
    textAlign: "center",
    alignItems: "center",
    top: wp("63%"),
    textDecorationLine: "underline",
    zIndex: 10,
    fontFamily:"Tajawal-Medium",
  },
  loginText2: {
    fontSize: 18,
    color: "#B7B7B7",
    marginTop: hp("3%"),
    textAlign: "center",
    alignItems: "center",
    top: hp("30%"),
    fontFamily:"Tajawal-Medium",
  },
  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    fontFamily:"Tajawal-Medium",
  },
  svgComponant: {
    top: hp("-5%"),
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  loginButton: {
    top: hp("13%"),
    backgroundColor: "#4F3C75",
    height: hp("6%"),
    width: wp("80%"),
    borderRadius: 25,
    alignSelf: "center",
    alignItems: "center",
    fontFamily:"Tajawal-Medium",
  },
  loginButton2: {
    top: hp("1.75%"),
    color: "#FFEED6",
    fontSize: 25,
    height: hp("19%"),
    width: wp("42%"),
    textAlign: "center",
    justifyContent: "center",
    fontFamily:"Tajawal-Medium",
  },
});
