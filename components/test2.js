import { Expo } from 'expo-server-sdk';
import React, { Component, Fragment, useEffect } from "react";
import { Text, View, Alert, TextInput, StyleSheet,TouchableOpacity } from "react-native";
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import firebase from "../database/firebase";
import FC from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg";
const test2 = () => {

// useEffect(() => {
//     (async() => {
//         const user = await firebase.database().ref("GraphicDesigner/"+firebase.auth().currentUser.uid).on(('value'), (dataSnapshot) => {
//             fName = dataSnapshot.child("DFirstName").val();
//             lName = dataSnapshot.child("DLastName").val();
//             bio = dataSnapshot.child("bio").val();
//             //num_rating = dataSnapshot.child("number_of_rating").val();
//             //total_rating = dataSnapshot.child("total_rating").val();
//             this.updateInputVal(fName, "firstName");
//             this.updateInputVal(lName, "lastName");
//             this.updateInputVal(bio, "bio");
//           });
//     })
// })
// useEffect(() => {
//     (async () => {
//         const user = await firebase.database().ref("GraphicDesigner/"+firebase.auth().currentUser.uid).once(('value',dataSnap
//     })
// })
// useEffect(() => {
//     (()=>registerForPushNotificationsAsync())();
// },[]);
const sendNotification = async () => {
    
        const message = {
          to: "ExponentPushToken[nH02kWJeynyhaF9YXqpVSm] " ,
          sound: 'default',
          title: 'افتن',
          body: 'And here is the body!',
          data: { data: 'goes here' },
        };
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      
}


// const registerForPushNotificationsAsync = async () => {
//     let token;
//     if (Constants.isDevice) {
//       const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!');
//         return;
//       }
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log(token);
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }

//     if(token){
//         const res = await firebase.database().ref("GraphicDesigner/"+firebase.auth().currentUser.uid).update({notificationsKey: token});
//     }
//     const user = firebase.auth().currentUser.uid;
//  const res = await firebase.database().ref("GraphicDesigner/"+user).update({notificationsKey: token});
//     if (Platform.OS === 'android') {
//       Notifications.setNotificationChannelAsync('default', {
//         name: 'default',
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: '#FF231F7C',
//       });
//     }
  
//     return token;
//   }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => sendNotification()}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>إرسال</Text>
        </TouchableOpacity>

      
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  buttonContainer: {
    marginTop: wp("90%"),
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: wp("3%"),
    borderRadius: 25,
    width: wp("80%"),
    height: hp("7%"),
    alignSelf: "center",
  },
  Text: {
    fontSize: 12,
    color: "#4F3C75",
    left: wp("13%"),
    top: hp("35%"),
  },
  inputStyle: {
    fontSize: 18,
    height: hp("7%"),
    width: wp("80%"),
    marginBottom: wp("15%"),
    paddingBottom: wp("5%"),
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: hp("40%"),
    zIndex: 10,
  },
  buttonText: {
    fontSize: 23,
    color: "#FFEED6",
  },
});
export default test2;