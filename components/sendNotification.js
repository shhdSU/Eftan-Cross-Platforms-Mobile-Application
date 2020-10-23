 import React, { Component,useRef, useEffect, useState } from "react";
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
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

//خططططررررررررر!!!!!!!!!!!!!!!!!!!!!!!


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

 export default function Notify (props){    //should have a parameter

  const [notification, setNotification] = useState(false);
 const notificationListener = useRef();
 const responseListener = useRef();
  const designerToken = props.designerToken;


  useEffect(() => {
    console.log("in useEffect");
      // This listener is fired whenever a notification is received while the app is foregrounded
      console.log("afterRegister");

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
        console.log("before send");

           sendPushNotification(designerToken);
        
        console.log("sent!");

      return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}, []);

return (
  <View
  style={{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  }}>
 
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
   
  </View>
  <TouchableOpacity onPress={async () => {
      await sendPushNotification();
    }}>
    <Text>"Press to Send Notification"</Text>
  
  </TouchableOpacity>
</View>
);
  }


 

async function sendPushNotification (designerToken) {
const message = {
  to: designerToken, 
  sound: 'default',
  title: 'عند رفع الطلب',
  body: 'تم بحمد الله',
  data: { data: 'goes here' },
};

console.log("in send function");
await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
          'Accept': 'application/json',
         'Content-Type': 'application/json',
         'accept-encoding': 'gzip, deflate',
         'host': 'exp.host'
     },
   body: JSON.stringify(
        message
        ),}).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          console.log(responseJson.data);
        })
               .catch((error) => {
                  console.log("error "+ error);
                });
                console.log("after sending");

}

//خططططررررررررر!!!!!!!!!!!!!!!!!!!!!!!