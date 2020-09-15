import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "../database/firebase";
// view its like div in web :)
//class LoadingScreen
export default class Cprofile extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isLoading: false,
      //  userType: 1,
    };
  }
  /*componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
  }
  */
  signOutUser = () => {
    const { email, password } = this.state;
    firebase.auth().signOut();
    this.props.navigation.navigate("صفحة الدخول");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>مرحبا أيها المصمم {this.state.email} !</Text>
        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
          <Text>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
//Style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
