import React, { useState, useContext, useEffect } from "react";
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
} from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import firebase from "../database/firebase";
import { View, StyleSheet } from "react-native";
import "firebase/firestore";

export default class RoomScreen extends React.Component {
  constructor(props) {
    super();
    var Requiest = props.navigation.state.params.obj;
    this.state = {
      Imagekey: "",
      CID: "",
    };

    const DID = firebase.auth().currentUser.uid;
    this.updateInputVal(Requiest.Imagekey, "Imagekey");
    this.updateInputVal(Requiest.CID, "CID");
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  render() {
    return <Retrive ClinetID={this.state.CID} chatID={this.state.Imagekey} />;
  }
}

function Retrive(props) {
  const chatID = props.chatID;
  const ClinetID = props.ClinetID;
  const DID = firebase.auth().currentUser.uid;
  const [messages, setMessages] = useState([]);

  console.log("////////////////////");
  console.log(chatID);
  console.log(ClinetID);
  console.log(DID);

  //----------------------------------------------------------retrieve from database
  useEffect(() => {
    const messagesListener = firebase
      .firestore()
      .collection("AllChat")
      .doc(chatID)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });
    return () => messagesListener();
  }, []);

  // helper method that is sends a message
  function handleSend(messages) {
    console.log("in handler");
    const text = messages[0].text;
    firebase
      .firestore()
      .collection("AllChat")
      .doc(chatID) // بيكون اي دي الفورم
      .collection("MESSAGES")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: DID, // من الاوبجكت اذا جا نحط ايدي المصمم
          to: ClinetID, // من الاوبجكت اذا جا بنرسل للعميل
        },
      });

    firebase
      .firestore()
      .collection("AllChat")
      .doc(chatID) // بيكون اي دي الفورم
      .set(
        {
          latestMessage: {
            to: ClinetID, // من الاوبجكت اذا جا بنرسل للعميل
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      );
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      placeholder="اشتغل الله يرحم والديك..."
      user={{
        _id: DID,
        to: ClinetID,
      }}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  systemMessageWrapper: {
    backgroundColor: "#6646ee",
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});
