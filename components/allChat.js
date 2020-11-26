import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity ,Image} from "react-native";
import Svg, { Defs, G, Path } from "react-native-svg";
import { List, Divider ,Avatar} from "react-native-paper";
import firebase from "../database/firebase";
import "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';
import { firestore } from "firebase";


export default function Display({ navigation }) {
    const CurrentID = firebase.auth().currentUser.uid;
    const [count, setCount] = useState(0);
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const unsubscribe =
            firebase
                .firestore()
                .collection("UserID")
                .doc(CurrentID)
                .collection("AllChat")
                .orderBy('latestMessage.createdAt', 'desc')
                .onSnapshot(querySnapshot => {
                    const threads = querySnapshot.docs.map(documentSnapshot => {
                        console.log("documentSnapshot.data().Cname  "+documentSnapshot.data().Cname)
                        //--------------------------- to remove chat after payed
                        firebase
                        .database()
                        .ref("Forms/" + documentSnapshot.data().did + "/" + documentSnapshot.id)
                        .on("value", (snapshot) => {
                          if(snapshot.child("status").val() == "f")
                          {
                            firebase
                            .firestore()
                            .collection("UserID")
                            .doc(snapshot.child("DID").val())
                            .collection('AllChat')
                            .doc(documentSnapshot.id) 
                            .delete()

                    
                            firebase
                            .firestore()
                            .collection("UserID")
                            .doc(snapshot.child("CID").val())
                            .collection('AllChat')
                            .doc(documentSnapshot.id) 
                            .delete()

                        //--------------------------- 
                          }
                        })
                    
                        return {
                            _id: documentSnapshot.id,
                            // title: documentSnapshot.data().title,
                            // did:documentSnapshot.data().did,
                            // reciverAvatar:documentSnapshot.data().reciverAvatar,
                            // reciverName:documentSnapshot.data().reciverName,
                            // Cname: documentSnapshot.data().Cname,
                            // Dname: documentSnapshot.data().Dname,
                            // CAvatart: documentSnapshot.data().CAvatart,
                            // DAvatart: documentSnapshot.data().DAvatart,
                            ...documentSnapshot.data()
                            
                            
                        };
                    });
                   
                    setThreads(threads);


                });

        /**
         * unsubscribe listener
         */
        return () => unsubscribe();
    }, []);


    

   
    
    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 25,
                    fontWeight: "700",
                    color: "#4f3c75",
                    alignSelf: "center",
                    position: "absolute",
                    zIndex: 2,
                    top: "6.5%",
                }}
            >
                محادثاتي{" "}
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
                        data-name="Icon material-menu"
                        onPress={() => navigation.toggleDrawer()}
                        d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
                        fill="#4f3c75"
                    />
                </G>
            </Svg>
            <FlatList
                data={threads}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                   
                    <TouchableOpacity

                        onPress={() =>
                            navigation.navigate("chat", {
                                thread: item,
                                title: item.title,
                            })
                        }
                        
                    >
                        
                        <List.Item
                      style = { {backgroundColor:"#f2f2f2", width:'95%', borderRadius:30, margin:10, marginBottom:10, paddingTop:10, paddingBottom:10, paddingLeft:10}}
                        right={()=> {
                            console.log("inside choosing avatar   "+item.did+"    "+item.CAvatart+"    "+item.DAvatart)
                            if(CurrentID == item.did){
                            return (
                                <Avatar.Image
                                    source={{uri: item.CAvatart}}
                                    size={55}
                                    />
                                    );}
                                    else{ 
                                        return (
                                            <Avatar.Image
                                                source={{uri: item.DAvatart}}
                                                size={55}
                                                />
                                                );
                                    }
                                }
                            }

                            title={(CurrentID == item.did)? (item.Cname) : (item.Dname)}
                            description={item.latestMessage.text}
                            titleNumberOfLines={1}
                            titleStyle={styles.listTitle}
                            descriptionStyle={styles.listDescription}
                            descriptionNumberOfLines={1}
                            left={()=>{   
                                var x                  
                                firebase
                                .firestore()
                                .collection("UserID")
                                .doc(CurrentID)
                                .collection('AllChat')
                                .doc(item._id)
                                .get()
                                .then(documentSnapshot => { 
                                   setCount(documentSnapshot.data().unreadCountMassages)
                                   console.log("-------"+documentSnapshot.data().unreadCountMassages)
                               })
                               
                               if (Number(count) != Number(0) ) { 
                                console.log("-------"+count)
                                return <Icon name="comments-o" size={25} color="#e33232" style={{right:50} ,{top:20}}/>
                            }
                            else{console.log("read")}
                            }
}
                            

                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    listTitle: {
        fontSize: 22,
        textAlign: "right",
        paddingRight: "5%",
        color:"#4f3c75"
    },
    listDescription: {
        fontSize: 16,
        textAlign: "right",
        paddingRight: "5%",
    },
});

