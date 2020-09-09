import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";

//Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDtSPt8lV9R-dkmkCXxCI0xNadkq9aAtUk",
  authDomain: "eftan2020.firebaseapp.com",
  databaseURL: "https://eftan2020.firebaseio.com",
  projectId: "eftan2020",
  storageBucket: "eftan2020.appspot.com",
};

firebase.initializeApp(firebaseConfig);
import {
  Container,
  Content,
  Header,
  Item,
  Form,
  Input,
  Button,
  Label,
} from "native-base";
export default function App() {
  return (
    <Container style= {styles.container}>
      <Form>
        <Item>
          <Label>Email</Label>
          <Input 
          autoCorrect = {false}
          autoCapitalize = "none"
          />
        </Item>
      </Form>
    </Container> 
     );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
