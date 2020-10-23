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

 export default function NotifyPermission (){  

   const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
 const notificationListener = useRef();
 const responseListener = useRef();


  useEffect(() => {
    console.log("in useEffect");
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      // This listener is fired whenever a notification is received while the app is foregrounded
      console.log("afterRegister");

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
        console.log("before send");

        
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
  <TouchableOpacity>
    <Text>"Press to Send Notification"</Text>
  
  </TouchableOpacity>
</View>
);
  }


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
  token = (await Notifications.getExpoPushTokenAsync()).data;
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


//خططططررررررررر!!!!!!!!!!!!!!!!!!!!!!!