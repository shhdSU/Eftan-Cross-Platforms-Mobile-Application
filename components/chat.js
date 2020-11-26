import React, { useState, useContext, useEffect,useRef } from "react";
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
} from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import firebase from "../database/firebase";
import Svg, { Defs, G, Path } from "react-native-svg";
import { View, StyleSheet ,Container,Text , TouchableOpacity ,Image} from "react-native";
import "firebase/firestore";
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import Display from "./allChat";

export default class RoomScreen extends React.Component {
  constructor(props) {
    super();

    this.state = {
      thread: props.navigation.state.params.thread,
      Imagekey: "",
      reciveID: "",
      chatID: "",
      title: "",
      notificationsKey: "",
      name:"",
      Cname:"",
      Dname:"",
      CAvatart:"",
      DAvatart:"",
      reciverName:"",
      reciverAvatar:"",
      did:"",
      // to: props.navigation.state.params.to,
    };
    var reciveID;

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
          console.log("CurrentID" + snapshot.child("CID").val())
          this.updateInputVal(reciveID, "reciveID");
          this.updateInputVal(snapshot.child("title").val(), "title")
          this.updateInputVal(snapshot.child("dname").val(), "Dname")
          this.updateInputVal(snapshot.child("DesignerProfileImage").val(), "DAvatart")
          this.updateInputVal(snapshot.child("dname").val(), "reciverName")
          this.updateInputVal(snapshot.child("DesignerProfileImage").val(), "reciverAvatar")
          
          
        } else if (snapshot.child("DID").val() == CurrentID) {
          reciveID = snapshot.child("CID").val();
          console.log("CurrentID///" + snapshot.child("DID").val())
          this.updateInputVal(reciveID, "reciveID");
          this.updateInputVal(snapshot.child("title").val(), "title")
          this.updateInputVal(snapshot.child("name").val(), "Cname")
          this.updateInputVal(snapshot.child("ClientProfileImage").val(), "CAvatart")
          this.updateInputVal(snapshot.child("name").val(), "reciverName")
          this.updateInputVal(snapshot.child("ClientProfileImage").val(), "reciverAvatar")
        }
       
        this.updateInputVal(snapshot.child("DID").val(), "did")
      })

      firebase
      .database()
      .ref(`GraphicDesigner/` + this.state.reciveID)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {

        this.updateInputVal(snapshot.child("notificationsKey").val(),"notificationsKey")
        }
      })
      firebase
      .database()
      .ref(`Client/` + this.state.reciveID)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {

        this.updateInputVal(snapshot.child("notificationsKey").val(),"notificationsKey")
        }
      })
      firebase
      .database()
      .ref(`GraphicDesigner/` + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          this.updateInputVal(snapshot.child("DFirstName").val() + " " + snapshot.child("DLastName").val() ,"name")

        }
      })
      firebase
      .database()
      .ref(`Client/` + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          this.updateInputVal(snapshot.child("CFirstName").val() + " " + snapshot.child("CLastName").val() ,"name")

        }
      })
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };


  render() {
    return (
      <Retrive chatID={this.state.chatID} reciveID={this.state.reciveID} title={this.state.title} receiveToken={this.state.notificationsKey} name={this.state.name} 
      Cname={this.state.Cname} Dname={this.state.Dname} DAvatart={this.state.DAvatart} CAvatart={this.state.CAvatart} did={this.state.did}
      reciverAvatar={this.state.reciverAvatar} reciverName={this.state.reciverName}/>)
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



 

async function sendPushNotification (expoToken,title,myMessage) {
const message = {
  to: expoToken, 
  sound: 'default',
  title: title,
  body: myMessage,
  data: { data: "object" },
};
console.log(title);
console.log(myMessage);
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

function Retrive(props) {
  const chatID = props.chatID;
  const reciveID = props.reciveID;
  const CurrentID = firebase.auth().currentUser.uid;
  const title = props.title;
  const Cname = props.Cname;
  const Dname = props.Dname;
  const DAvatart = props.DAvatart;
  const CAvatart= props.CAvatart;
  const reciverAvatar = props.reciverAvatar;
  const reciverName = props.reciverName;
  const did = props.did;
  const receiveToken = props.receiveToken;
  const name = props.name;
  const unreadCount = Number('0')
  console.log(receiveToken);
  console.log("title--------------" + title)
  console.log("chatID" + chatID)
  console.log("reciveID" + reciveID)
  console.log("CurrentID" + CurrentID)


  const [messages, setMessages] = useState([]);


  
  const [notification, setNotification] = useState(false);
 const notificationListener = useRef();
 const responseListener = useRef();
  console.log("designer token is   "+receiveToken)


  
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
            // Cname :Cname,
            // Dname :Dname,
            // DAvatart :DAvatart,
            // CAvatart:CAvatart,
            // reciverAvatar :firebaseData.reciverAvatar,
            // reciverName :firebaseData.reciverName,
            // title: title,
            // did:did,
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
      
      firebase
      .firestore()
      .collection("UserID")
      .doc(CurrentID)
      .collection('AllChat')
      .doc(chatID) // بيكون اي دي الفورم
      .update({
        unreadCountMassages: Number('0')
      })

      

        console.log("in useEffect");

          // This listener is fired whenever a notification is received while the app is foregrounded
          console.log("afterRegister");
    
          notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            this.props.navigation.navigate("allChat");

          });
    
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
              console.log(response);
            });
            console.log("before send");
    
          //sendPushNotification(receiveToken,"title","message");
            
            console.log("sent!");
    
          return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
        messagesListener();
      };

  }, []);
 
  firebase
  .firestore()
  .collection("UserID")
  .doc(CurrentID)
  .collection("AllChat")
  .doc(chatID) // بيكون اي دي الفورم
  .set({
      Dname:Dname,
      DAvatart:DAvatart,
      Cname:Cname,
      CAvatart:CAvatart,
      did:did,
      latestMessage: {
        to: reciveID,
        createdAt: new Date().getTime(),
      },
    },
    { merge: true }
  );

      // firebase
      // .firestore()
      // .collection("UserID")
      // .doc(reciveID)
      // .collection("AllChat")
      // .doc(chatID) // بيكون اي دي الفورم
      // .set({
      //     Dname:Dname,
      //     DAvatart:DAvatart,
      //     Cname:Cname,
      //     CAvatart:CAvatart,
      //     did:did,
      //     latestMessage: {
      //       to: CurrentID,
      //       createdAt: new Date().getTime(),
      //     },
      //   },
      //   { merge: true }
      // );

 
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
              //title: title,
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
            //  title: title,
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
                //title: title,
                latestMessage: {
                  to: reciveID,
                  text,
                  createdAt: new Date().getTime(),
                },
              },
              { merge: true }
            );

            firebase
            .firestore()
            .collection("UserID")
            .doc(reciveID)
            .collection("AllChat")
            .doc(chatID) // بيكون اي دي الفورم
            .set(
              {
               // title: title,
                latestMessage: {
                  to: reciveID,
                  text,
                  createdAt: new Date().getTime(),
                },
              },
              { merge: true }
            );
            firebase
      .firestore()
      .collection("UserID")
      .doc(reciveID)
      .collection('AllChat')
      .doc(chatID) // بيكون اي دي الفورم
      .update({
        unreadCountMassages: unreadCount+1
      })
        }
      });
    //------------------------------------------------------------------------------------------------------
    firebase
      .database()
      .ref(`GraphicDesigner/` + CurrentID)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("im GraphicDesigner")
          console.log("reciveID" + reciveID)
          console.log("CurrentID" + CurrentID)
          firebase
            .firestore()
            .collection("UserID")
            .doc(CurrentID)
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .collection("MESSAGES")
            .add({
             // title: title,
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
           //   title: title,
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
            .collection("AllChat")
            .doc(chatID) // بيكون اي دي الفورم
            .set(
              {
              //  title: title,
                latestMessage: {
                  to: reciveID,
                  text,
                  createdAt: new Date().getTime(),
                },
              },
              { merge: true }
            );
          firebase
            .firestore()
            .collection("UserID")
            .doc(CurrentID)
            .collection("AllChat")
            .doc(chatID) // بيكون اي دي الفورم
            .set(
              {
               // title: title,
                latestMessage: {
                  to: reciveID,
                  text,
                  createdAt: new Date().getTime(),
                },
              },
              { merge: true }
            );

          firebase
            .firestore()
            .collection("UserID")
            .doc(reciveID)
            .set({
              field: ""
            })

            firebase
            .firestore()
            .collection("UserID")
            .doc(reciveID)
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .update({
              unreadCountMassages: Number(unreadCount+1)
            })
        }
      });
    //------------------------------------------------------------------------------------------------------
  
  
    sendPushNotification(receiveToken,name,text,object);

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
  // function renderAvatar (props) {
  //   return (
  //     <SvgUri width="60" height="60" source={{ uri: reciverAvatar }} />
  //   )
  // }

  return (
    <View style={{flex: 1}}>
      <View >
             <Image
                style={{ height: 58, width: 58, borderRadius: 60,  position: "absolute", top:"40%" , zIndex: 2,  right:"4%"}}
                source={{ uri: reciverAvatar }}/>
            <Text
                style={{
                    fontSize: 25,
                    fontWeight: "600",
                    color: "#4f3c75",
                    alignSelf: "center",
                    position: "absolute",
                    zIndex: 2,
                    top: "50%",
                    right:"23%"
                }}
            >
                  {reciverName}
            </Text>
          
            <Svg
                width={416}
                height={144}
                style={{
                    alignSelf: "center", top: "-3%", position: "relative", shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,
                }}
            >
                <G data-name="Group 7">
                    <G filter="url(#prefix__a)">
                        <Path
                            data-name="Path 117"
                            d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                            fill="#ffeed6"
                        />
                    </G>
                    {/* <Path
                        data-name="Icon ionic-ios-arrow-back"
                        d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                        fill="#4f3c75"
                        onPress={() => navigation.goBack()}
                    /> */}
                     <Path
                data-name="Icon ionic-ios-arrow-back"
                onPress={() => this.props.navigation.goBack()}
                d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#4f3c75"
              />
                </G>
            </Svg>
           
            </View>
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
              </View>
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
  container: {
    backgroundColor: "#fff",
    flex: 1,
},
listTitle: {
    fontSize: 22,
    textAlign: "right",
    paddingRight: "5%",
},
listDescription: {
    fontSize: 16,
    textAlign: "right",
    paddingRight: "5%",
},
});


