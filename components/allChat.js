import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { List, Divider } from "react-native-paper";
import firebase from "../database/firebase";
import "firebase/firestore";

export default class allChat extends React.Component {
  constructor(props) {
    super();
    var Requiest = props.navigation.state.params.obj;

    this.state = {
      Requiestt: Requiest,
      Imagekey: "",
      CID: "",
    };
    this.updateInputVal(Requiest.Imagekey, "Imagekey");
    this.updateInputVal(Requiest.CID, "CID");
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  render() {
    return <Display reqID={this.state.Requiestt} v={this.props.navigation} />;
  }
}
function Display(props) {
  const v = props.v;

  const reqID = props.reqID;
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("AllChat")
      //.orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            RoomTitle: "",
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              v.navigate("chat", {
                obj: reqID,
              })
            }
          >
            <List.Item
              title={item.RoomTitle}
              description="Item description"
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});
