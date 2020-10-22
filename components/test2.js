 import React, { Component,useRef, useEffect, useState } from "react";
import { Text, View, Alert, TextInput, StyleSheet,TouchableOpacity } from "react-native";
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import firebase from "../database/firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";



Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
function test2 (){
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  

    useEffect(() => {
        console.log("Iam in useEffect1  ")
        registerForPushNotificationsAsync(firebase.auth().currentUser.uid).then(token => setExpoPushToken(token));
        // This listener is fired whenever a notification is received while the app is foregrounded
        console.log("Iam in useEffect2  ")

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
          });
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
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <TouchableOpacity
       onPress={async () => {
        await sendPushNotification(expoPushToken); }}>
          <Text>
        "Press to Send Notification" </Text>
       
       
      </TouchableOpacity>
    </View>
  );
    }
    

  const registerForPushNotificationsAsync = async(user) => {
    let token;
    console.log("Iam in register")
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      console.log("Iam in register, NOT granted")
      return;
    }
    console.log("Iam in register, YYYEEESSS granted")
    token = (await Notifications.getExpoPushTokenAsync()).data;
   console.log("token is 90  : " + token);
    console.log("after token assignment  ")
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    console.log("Iam in Android")
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

console.log("token is: " + token);
  

console.log("user is" + user);
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


const sendPushNotification = async (expoPushToken) =>{
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'بشرنا بما يسرنا يا كريم',
    body: 'And here is the body!',
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


export default test2;