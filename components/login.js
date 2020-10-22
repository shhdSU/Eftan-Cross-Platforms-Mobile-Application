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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import App from "../App";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
    
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };


  userLogin = () => {
    var that = this;
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

              const user = firebase.auth().currentUser.uid;
              firebase
                .database()
                .ref(`Client/` + user)
                .on("value", (snapshot) => {
                  if (snapshot.exists()) {
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
           that.registerForPushNotificationsAsync(firebase.auth().currentUser.uid);
          }
         //   this.notify();
         //   this.componentDidMount();
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
 //notifications method
   registerForPushNotificationsAsync = async(user) => {
     let token;
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
     token = (await Notifications.getExpoPushTokenAsync()).data;
     //console.log(token);
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

console.log("token is: " + token);
   
   fetch('https://exp.host/--/api/v2/push/send', {
       method: 'POST',
       headers: {
             'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'host': 'exp.host'
        },
      body: JSON.stringify({
            to: token,
            title: 'New Notification',
            body: 'The notification worked!',
            priority: "high",
            sound:"default",
            channelId:"default",
                }),
    }).then((response) => response.json())
             .then((responseJson) => {
               console.log(responseJson);
               console.log(responseJson.data);
             })
                    .catch((error) => {
                       console.log("error "+ error);
                     });


 console.log("user is" + user);
  
   return token;

   }

// async componentDidMount(){
//   // get expo push token
//   console.log("componentDidMount");

//   const { status: existingStatus } = await Permissions.getAsync(
//       Permissions.NOTIFICATIONS
//     );
//     let finalStatus = existingStatus;
//     console.log("final status = " + finalStatus);
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     finalStatus = status;
// }//end if
// console.log("final status = " + finalStatus);

// if (finalStatus === 'granted'){
//   console.log("final status = " + finalStatus);
//   let token = await Notifications.getExpoPushTokenAsync();
//   fetch('https://exp.host/--/api/v2/push/send', {
//        method: 'POST',
//        headers: {
//              'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'accept-encoding': 'gzip, deflate',
//             'host': 'exp.host'
//         },
//       body: JSON.stringify({
//             to: token.data,
//             title: 'New Notification',
//             body: 'The notification worked!',
//             priority: "high",
//             sound:"default",
//             channelId:"default",
//                 }),
//     }).then((response) => response.json())
//              .then((responseJson) => {
//                console.log(responseJson);
//                console.log(responseJson.data);
//              })
//                     .catch((error) => {
//                        console.log("error "+ error);
//                      });
// const user = firebase.auth().currentUser.uid;
//     //inserting token in database
//                 firebase
//                  .database()
//                  .ref(`Client/` + user)
//                  .on("value", (snapshot) => {
//                    if (snapshot.exists()) {
//                    firebase.database().ref(`Client/` + user.uid).update({notificationsKey: token});
//                    }
//                  });
//                firebase
//                  .database()
//                  .ref(`GraphicDesigner/` + user)
//                  .on("value", (snapshot) => {
//                    if (snapshot.exists()) {
//                      firebase.database().ref(`GraphicDesigner/` + user).update({notificationsKey: token});
//                    }
//           });
// }


//      console.log("who cares");

// }//componentDidMount end

notify = async () => {
  console.log("componentDidMount");

  const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    console.log("final status = " + finalStatus);
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
}//end if
console.log("final status = " + finalStatus);

if (finalStatus === 'granted'){
  console.log("final status = " + finalStatus);
  let token = await Notifications.getExpoPushTokenAsync();
  fetch('https://exp.host/--/api/v2/push/send', {
       method: 'POST',
       headers: {
             'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'host': 'exp.host'
        },
      body: JSON.stringify({
            to: token,
            title: 'New Notification',
            body: 'The notification worked!',
            priority: "high",
            sound:"default",
            channelId:"default",
                }),
    }).then((response) => response.json())
             .then((responseJson) => {
               console.log(responseJson);
               console.log(responseJson.data);
             })
                    .catch((error) => {
                       console.log("error "+ error);
                     });
                     const user = firebase.auth().currentUser.uid;
                     //inserting token in database
                                 firebase
                                  .database()
                                  .ref(`Client/` + user)
                                  .on("value", (snapshot) => {
                                    if (snapshot.exists()) {
                                    firebase.database().ref(`Client/` + user.uid).update({notificationsKey: token});
                                    }
                                  });
                                firebase
                                  .database()
                                  .ref(`GraphicDesigner/` + user)
                                  .on("value", (snapshot) => {
                                    if (snapshot.exists()) {
                                      firebase.database().ref(`GraphicDesigner/` + user).update({notificationsKey: token});
                                    }
                           });
}

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
  },
  loginText2: {
    fontSize: 18,
    color: "#B7B7B7",
    marginTop: hp("3%"),
    textAlign: "center",
    alignItems: "center",
    top: hp("30%"),
  },
  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
  },
  loginButton2: {
    top: hp("0.75%"),
    color: "#FFEED6",
    fontSize: 27,
    height: hp("19%"),
    width: wp("42%"),
    textAlign: "center",
    justifyContent: "center",
  },
});
