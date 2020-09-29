import firebase from "../database/firebase";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-datepicker";
import Svg, { Path } from "react-native-svg";

export default class RequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      color1: "",
      color2: "",
      color3: "",
      category: "",
      reference: "",
      deadLine: "",
      Cemail: "",
      Demail: "",
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  uploadImage = async (uri, draftName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("Draft/" + draftName);
    return ref.put(blob);
  };
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.uploadImage(result.uri, "test")
        .then(() => {
          Alert.alert("Success");
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };

  storeResquset = () => {
    firebase
      .database()
      .ref("Forms/" + "QQQWWW")
      .set({
        title: this.state.title,
        description: this.state.description,
        color1: this.state.color1,
        color2: this.state.color2,
        color3: this.state.color3,
        category: this.state.category,
        reference: this.state.reference,
        deadLine: this.state.deadLine,
        Cemail: "",
        Demail: "",
      });
  };

  submitRequestForm() {
    //here you put all validation checks
    this.setState({
      isLoading: true,
    });
    /*
    const user = firebase.auth().currentUser.uid;
              firebase
                .database()
                .ref(`RequestForms/` + user)
                .on("value", (snapshot) => {
                  if (snapshot.exists()) {
                    this.props.navigation.navigate("معرض المصمم");
                  }
                  return;
                });
                */
  }

  submitRequestForm() {
    //here you put all validation checks
    this.setState({
      isLoading: true,
    });
    /*
    const user = firebase.auth().currentUser.uid;
              firebase
                .database()
                .ref(`RequestForms/` + user)
                .on("value", (snapshot) => {
                  if (snapshot.exists()) {
                    this.props.navigation.navigate("معرض المصمم");
                  }
                  return;
                });
                */
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        {/* <Svg></Svg>//For Image and nav bar */}
        <TextInput
          style={styles.inputStyle}
          placeholder="عنوان الطلب"
          value={this.state.title}
          onChangeText={(val) => this.updateInputVal(val, "title")}
        />

        <TextInput
          style={styles.inputStyle}
          multiline={true}
          numberOfLines={6}
          placeholder="وصف الطلب"
          value={this.state.description}
          onChangeText={(val) => this.updateInputVal(val, "description")}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="اللون الأول"
          value={this.state.color1}
          onChangeText={(val) => this.updateInputVal(val, "color1")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="اللون الثاني"
          value={this.state.color2}
          onChangeText={(val) => this.updateInputVal(val, "color2")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="اللون الثالث"
          value={this.state.color3}
          onChangeText={(val) => this.updateInputVal(val, "color3")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="التصنيف"
          value={this.state.category}
          onChangeText={(val) => this.updateInputVal(val, "category")}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onChooseImagePress()}
        >
          <Text
            style={{
              color: "#FFEED6",
              fontSize: 25,
            }}
          >
            رفع مسودة
          </Text>
        </TouchableOpacity>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.deadLine}
          mode="date"
          format="YYYY-MM-DD"
          minDate="2020-10-26"
          confirmBtnText="تم"
          cancelBtnText="إلغاء"
          hideText
          iconComponent={
            <Svg width={31.5} height={36} style={styles.dateIcon}>
              <Path
                data-name="Icon awesome-calendar-alt"
                d="M0 32.625A3.376 3.376 0 003.375 36h24.75a3.376 3.376 0 003.375-3.375V13.5H0zm22.5-13.781a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm0 9a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm-9-9a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm0 9a.846.846 0 01.844-.844h2.813a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844h-2.813a.846.846 0 01-.844-.844zm-9-9A.846.846 0 015.344 18h2.812a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844H5.344a.846.846 0 01-.844-.844zm0 9A.846.846 0 015.344 27h2.812a.846.846 0 01.844.844v2.813a.846.846 0 01-.844.844H5.344a.846.846 0 01-.844-.844zM28.125 4.5H24.75V1.125A1.128 1.128 0 0023.625 0h-2.25a1.128 1.128 0 00-1.125 1.125V4.5h-9V1.125A1.128 1.128 0 0010.125 0h-2.25A1.128 1.128 0 006.75 1.125V4.5H3.375A3.376 3.376 0 000 7.875v3.375h31.5V7.875A3.376 3.376 0 0028.125 4.5z"
                fill="#c5c3c1"
              />
            </Svg>
          }
          onDateChange={(date) => {
            this.setState({ deadLine: date });
          }}
        />
        <TextInput
          editable={false}
          style={[styles.inputStyle, { width: "80%", left: "19%" }]}
          placeholder="آخر موعد للتسليم"
          value={this.state.deadLine}
          onChangeText={(val) => this.updateInputVal(val, "deadLine")}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.storeResquset()}
        >
          <Text
            style={{
              color: "#FFEED6",
              fontSize: 25,
            }}
          >
            رفع الطلب
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } //End of Second return
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "10%",
  },
  preloader: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    height: "10%",
    width: "10%",
    backgroundColor: "#DDD",
  },
  inputStyle: {
    fontSize: 18,
    width: "100%",
    textAlign: "right",
    top: "0%",
    borderColor: "#ccc",
    borderBottomWidth: 2,
    padding: "7%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    borderRadius: 25,
    width: "100%",
    height: "7%",
    alignSelf: "center",
    marginTop: "4%",
  },
  dateIcon: {
    position: "absolute",
    top: "140%",
    right: "80%",
  },
});
