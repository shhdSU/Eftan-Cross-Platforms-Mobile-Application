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

    this.state = {
      thread: props.navigation.state.params.thread,
      Imagekey: "",
      CID: "",
      title: "",
    };

    if (props.navigation.state.params.obj) {
      var Requiest = props.navigation.state.params.obj;

      this.updateInputVal(Requiest.Imagekey, "Imagekey");
      this.updateInputVal(Requiest.CID, "CID");
      this.updateInputVal(Requiest.title, "title");

    }
    ;

  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };


  render() {
    return (

      <Retrive ClinetID={this.state.CID} chatID={this.state.Imagekey} thread={this.state.thread} title={this.state.title} />)
  }
}

function Retrive(props) {
  var chatID;
  if (props.thread) {
    chatID = props.thread._id;
  }
  else {
    chatID = props.chatID;
  }
  const ClinetID = props.ClinetID;
  const title = props.title;
  const DID = firebase.auth().currentUser.uid;
  const [messages, setMessages] = useState([]);

  console.log("////////////////////");
  console.log("thread in chat" + chatID);
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
            // avatar: 'https://placeimg.com/140/140/any',

            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
              // avatar: 'https://placeimg.com/140/140/any',

            };
          }

          return data;
        });

        setMessages(messages);
      });
    return () => messagesListener();
  }, []);

  //if its the first chat 
  function AddClientIDtoTheFirestore() {
    const added = false

    firebase
      .firestore()
      .collection("UserID")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().DID == DID || doc.data().ClinetID == ClinetID) { // ClientID
            added = true
            console.log("inside added")

          }
        })

        if (!added) {
          console.log("inside !added")
          firebase.firestore().collection("UserID").doc(DID)
          firebase
            .firestore()
            .collection("UserID")
            .doc(DID)
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .collection("MESSAGES")
            .add({
              RoomTitle: title,
              chatID: chatID,
              to: DID,
              toID: ClinetID
            })



        }
      })
  }







  // helper method that is sends a message
  function handleSend(messages) {
    AddClientIDtoTheFirestore()
    const text = messages[0].text;
    firebase
      .firestore()
      .collection("UserID")
      .doc(DID)
      .collection("AllChat")
      .doc(chatID) // بيكون اي دي الفورم
      .collection("MESSAGES")
      .add({
        RoomTitle: title,
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: DID, // من الاوبجكت اذا جا نحط ايدي المصمم
          to: ClinetID, // من الاوبجكت اذا جا بنرسل للعميل
        },
      });

    firebase
      .firestore()
      .collection("UserID")
      .doc(DID)
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

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#4f3c75'
          },
          left: {
            backgroundColor: '#EFEEFF'
          },
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#4f3c75' />
        </View>
      </Send>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#4f3c75' />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }


  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      placeholder="...اكتب رسالتك هنا"
      user={{
        _id: DID,
        to: ClinetID,

      }}
      scrollToBottom
      renderBubble={renderBubble}
      renderSend={renderSend}
      alignItems
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
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
