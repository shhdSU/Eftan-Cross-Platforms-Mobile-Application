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
      reciveID: "",
      chatID: "",


      // to: props.navigation.state.params.to,
    };

    const CurrentID = firebase.auth().currentUser.uid;


    if (props.navigation.state.params.obj) {
      var Requiest = props.navigation.state.params.obj;
      this.updateInputVal(Requiest.Imagekey, "chatID")
    }



    if (this.state.thread) {
      this.updateInputVal(this.state.thread._id, "chatID")

    }



    firebase
      .database()
      .ref(`chat/` + this.state.chatID)
      .on("value", (snapshot) => {
        if (snapshot.child("CID").val() == CurrentID) {
          reciveID = snapshot.child("DID").val();
          console.log("CurrentID" + snapshot.child("DID").val())

        } else if (snapshot.child("DID").val() == CurrentID) {
          reciveID = snapshot.child("CID").val();
          console.log("CurrentID///" + snapshot.child("CID").val())


        }
      })
    this.updateInputVal(reciveID, "reciveID");


  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };


  render() {
    return (

      <Retrive chatID={this.state.chatID} thread={this.state.thread} reciveID={this.state.reciveID} />)//to={this.state.to}
  }
}

function Retrive(props) {
  const chatID = props.chatID
  const reciveID = props.reciveID
  const CurrentID = firebase.auth().currentUser.uid;
  console.log("chatID" + chatID)
  console.log("reciveID" + reciveID)
  const [messages, setMessages] = useState([]);


  //----------------------------------------retrieve from database
  useEffect(() => {
    const messagesListener = firebase
      .firestore()
      .collection("UserID")
      .doc(CurrentID)
      .collection('AllChat')
      .doc(chatID) // بيكون اي دي الفورم
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


  // helper method that is sends a message
  function handleSend(messages) {
    const text = messages[0].text;
    //------------------------------------------------------------------------------------------------------client
    firebase
      .database()
      .ref(`Client/` + CurrentID)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("im client")
          firebase
            .firestore()
            .collection("UserID")
            .doc(CurrentID) //current
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .collection("MESSAGES")
            .add({
              text,
              createdAt: new Date().getTime(),
              user: {
                _id: CurrentID,//العميل
                to: reciveID,
              },
            });

          firebase
            .firestore()
            .collection("UserID")
            .doc(reciveID) //designer
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .collection("MESSAGES")
            .add({
              text,
              createdAt: new Date().getTime(),
              user: {
                _id: CurrentID,
                to: reciveID,
              },
            });

          firebase
            .firestore()
            .collection("UserID")
            .doc(CurrentID)
            .collection("AllChat")
            .doc(chatID) // بيكون اي دي الفورم
            .set(
              {
                latestMessage: {
                  to: reciveID,
                  text,
                  createdAt: new Date().getTime(),
                },
              },
              { merge: true }
            );
        }
      });
    //------------------------------------------------------------------------------------------------------

    firebase
      .database()
      .ref(`GraphicDesigner/` + CurrentID)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("im GraphicDesigner")
          firebase
            .firestore()
            .collection("UserID")
            .doc(CurrentID)
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .collection("MESSAGES")
            .add({
              text,
              createdAt: new Date().getTime(),
              user: {
                _id: CurrentID,
                to: reciveID,
              },
            });

          firebase
            .firestore()
            .collection("UserID")
            .doc(reciveID)
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .collection("MESSAGES")
            .add({
              text,
              createdAt: new Date().getTime(),
              user: {
                _id: CurrentID,
                to: reciveID,
              },
            });

          firebase
            .firestore()
            .collection("UserID")
            .doc(CurrentID)
            .collection("AllChat")
            .doc(chatID) // بيكون اي دي الفورم
            .set(
              {
                latestMessage: {
                  to: reciveID,
                  text,
                  createdAt: new Date().getTime(),
                },
              },
              { merge: true }
            );

        }
      });
    //------------------------------------------------------------------------------------------------------


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
        _id: CurrentID,
        to: reciveID,

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


