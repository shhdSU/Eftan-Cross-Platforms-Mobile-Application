import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { List, Divider } from "react-native-paper";
import firebase from "../database/firebase";
import "firebase/firestore";
import Svg, { Defs, G, Path } from "react-native-svg";

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
        style={{ alignSelf: "center", top: "-3%", position: "relative" }}
      >
        <G data-name="Group 7">
          <G filter="url(#prefix__a)">
            <Path
              data-name="Path 117"
              d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
              fill="#ffeed6"
            />
          </G>
          <Path
            data-name="Icon ionic-ios-arrow-back"
            d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
            fill="#4f3c75"
            onPress={() => this.props.navigation.goBack()}
          />
          <Path
            data-name="Icon material-menu"
            onPress={() => this.props.navigation.toggleDrawer()}
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
