import React, { useState, useContext, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "../database/firebase";
import "firebase/firestore";

export default function RoomScreen(props) {
  const chatID = props.chatID;
  const ClinetID = props.ClinetID;
  const DID = firebase.auth().currentUser.uid;

  console.log("////////////////////")
  console.log(chatID)
  console.log(ClinetID)
  console.log(DID)
  const [messages, setMessages] = useState([]);

  // helper method that is sends a message
  function handleSend(messages) {
    const text = messages[0].text;
    firebase
      .firestore()
      .collection('AllChat')
      .doc(chatID) // بيكون اي دي الفورم
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: DID,// من الاوبجكت اذا جا نحط ايدي المصمم
          to: ClinetID, // من الاوبجكت اذا جا بنرسل للعميل
        }
      });

    firebase
      .firestore()
      .collection('AllChat')
      .doc(chatID) // بيكون اي دي الفورم
      .set(
        {
          latestMessage: {
            to: ClinetID,// من الاوبجكت اذا جا بنرسل للعميل
            text,
            createdAt: new Date().getTime()
          }
        },
        { merge: true }
      );
  }
  // //----------------------------------------------------------retrieve from database
  // useEffect(() => {
  //   console.log("useEffect")
  //   const messagesListener =
  //     firebase
  //       .firestore()
  //       .collection('AllChat')
  //       .doc(chatID) // بيكون اي دي الفورم
  //       .collection('MESSAGES')
  //       .orderBy('createdAt', 'desc')
  //       .onSnapshot(querySnapshot => {
  //         const messages = querySnapshot.docs.map(doc => {
  //           const firebaseData = doc.data();

  //           const data = {
  //             _id: doc.id,
  //             text: '',
  //             createdAt: new Date().getTime(),
  //             ...firebaseData
  //           };

  //           if (!firebaseData.system) {
  //             data.user = {
  //               ...firebaseData.user,
  //               name: firebaseData.user.email
  //             };
  //           }

  //           return data;
  //         });

  //         setMessages(messages);
  //       });

  //   return () => messagesListener();
  // }, []);

  return (
    <GiftedChat
    //messages={messages}
    // onSend={newMessage => handleSend(newMessage)}
    // placeholder=''
    // user={{
    //   _id: DID,
    //   to: ClinetID,
    // }}
    />
  );
}
