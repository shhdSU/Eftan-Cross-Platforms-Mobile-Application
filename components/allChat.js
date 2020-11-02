import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { List, Divider } from "react-native-paper";
import firebase from "../database/firebase";
import "firebase/firestore";

export default function allChat({ navigation }) {
  const [threads, setThreads] = useState([]);

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("AllChat")
      // .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            RoomTitle: "",
            ...documentSnapshot.data(),
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
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("chat")} //, { thread: item }
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
