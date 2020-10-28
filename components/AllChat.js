import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
//import { Title } from 'react-native-paper';
//import { AuthContext } from '../navigation/AuthProvider';
//import FormButton from '../components/FormButton';

export default function AllChat() {
  // function handleButtonPress() {
  //     if (roomName.length > 0) {
  //       firestore()
  //         .collection('THREADS')
  //         .add({
  //           name: roomName
  //           }
  //         })
  //         .then(() => {
  //           navigation.navigate('Home');
  //         });
  //     }
  //   }
  return (
    <View style={styles.container}>
      <Title>محادثاتي</Title>
      <Title>جميع المحادثات ستكون متواجدة هنا</Title>
      {/* <Title>{user.uid}</Title> */}
    </View>
  );
}
