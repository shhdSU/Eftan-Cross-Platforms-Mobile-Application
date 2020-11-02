import React, { useState, useContext, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "../database/firebase";
import "firebase/firestore";

export default function RoomScreen(props) {
  const sara = props.sara;
  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: "New room created.",
      createdAt: new Date().getTime(),
      system: true,
    },
    // example of chat message
    {
      _id: 1,
      text: "Henlo!",
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: "Test User",
      },
    },
  ]);

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  // async function handleSend(messages) {
  //   const text = messages[0].text;
  //   firebase
  //     .firestore()
  //     .collection('AllChat')
  //     .doc(thread._id) // بيكون اي دي الفورم
  //     .collection('MESSAGES')
  //     .add({
  //       text,
  //       createdAt: new Date().getTime(),
  //       user: {
  //         _id:  // من الاوبجكت اذا جا نحط ايدي المصمم
  //         to:  // من الاوبجكت اذا جا بنرسل للعميل
  //       }
  //     });

  //   firebase
  //     .firestore()
  //     .collection('AllChat')
  //     .doc(thread._id) // بيكون اي دي الفورم
  //     .set(
  //       {
  //         latestMessage: {
  //           to:// من الاوبجكت اذا جا بنرسل للعميل
  //             text,
  //           createdAt: new Date().getTime()
  //         }
  //       },
  //       { merge: true }
  //     );

  //   useEffect(() => {
  //     const messagesListener =
  //       firebase
  //         .firestore()
  //         .collection('AllChat')
  //         .doc(thread._id) // بيكون اي دي الفورم
  //         .collection('MESSAGES')
  //         .orderBy('createdAt', 'desc')
  //         .onSnapshot(querySnapshot => {
  //           const messages = querySnapshot.docs.map(doc => {
  //             const firebaseData = doc.data();

  //             const data = {
  //               _id: doc.id, // اتوقع بيكون ايدي المصمم
  //               to:// من الاوبجكت اذا جا بنرسل للعميل
  //               text: '',
  //               createdAt: new Date().getTime(),
  //               ...firebaseData
  //             };

  //             if (!firebaseData.system) {
  //               data.user = {
  //                 ...firebaseData.user,
  //                 name: firebaseData.user.email
  //               };
  //             }

  //             return data;
  //           });

  //           setMessages(messages);
  //         });

  //     return () => messagesListener();
  //   }, []);

  // }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{ _id: 1 }}
      // messages={messages}
      // onSend={handleSend}
      // user={{ _id: currentUser.uid }} //يبغالها تعديل
    />
  );
}
