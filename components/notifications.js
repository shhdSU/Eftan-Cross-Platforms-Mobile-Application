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

 export default function Notify (){    //should have a parameter

   const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  //const designerToken = this.props.designerToken;



  useEffect(() => {
      registerForPushNotificationsAsync()//.then(token => setExpoPushToken(token));
      // This listener is fired whenever a notification is received while the app is foregrounded

    //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //     setNotification(notification);
    //   });

    //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //       console.log(response);
    //     });
    //   return () => {
    // Notifications.removeNotificationSubscription(notificationListener);
    // Notifications.removeNotificationSubscription(responseListener);
  //};
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
    onPress={async () => {
      await sendPushNotification();
    }}
  </TouchableOpacity>
</View>
);
  }


  async function registerForPushNotificationsAsync (){
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

const user1 = firebase.auth().currentUser.uid;
  //inserting token in database
              firebase
               .database()
               .ref(`Client/` + user1)
               .on("value", (snapshot) => {
                 if (snapshot.exists()) {
                 firebase.database().ref(`Client/` + user1).update({notificationsKey: token});
                 }
               });
             firebase
               .database()
               .ref(`GraphicDesigner/` + user1)
               .on("value", (snapshot) => {
                 if (snapshot.exists()) {
                   firebase.database().ref(`GraphicDesigner/` + user1).update({notificationsKey: token});
                 }
        });

       return token;
        
}


async function sendPushNotification () {////////////////////////////
const message = {
  to:"ExponentPushToken[nH02kWJeynyhaF9YXqpVSm]", //expoPushToken,  
  sound: 'default',
  title: 'عند رفع الطلب',
  body: 'جزء من النص مفقود...',
  data: { data: 'goes here' },
};


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
}

//خططططررررررررر!!!!!!!!!!!!!!!!!!!!!!!