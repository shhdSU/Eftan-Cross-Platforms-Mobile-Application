import React, { Component, Fragment } from "react";
import { Text, View, Alert, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../database/firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg";
class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function () {
        Alert.alert(
          "تنبيه",
          "الرجاء تفقد بريدك الالكتروني",
          [{ text: "حسنًا" }],
          { cancelable: false }
        );
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (this.state.email === "") {
          Alert.alert(
            "تنبيه",
            "فضلًا تأكد من إدخال البريد الالكتروني",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else if (errorCode == "auth/user-not-found") {
          Alert.alert(
            "تنبيه",
            "البريد الالكتروني غير مسجل !",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else if (errorCode == "auth/invalid-email") {
          Alert.alert(
            "تنبيه",
            "نرجو إعادة كتابة البريد الالكتروني بشكل صحيح",
            [{ text: "حسنًا" }],
            { cancelable: false }
          );
        } else {
          alert(errorMessage);
        }
        this.setState({
          isLoading: false,
          email: "",
          password: "",
        });
      });
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="البريد الالكتروني"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        {}
        <TouchableOpacity
          onPress={() => this.forgotPassword()}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>إرسال</Text>
        </TouchableOpacity>

        <Svg viewBox="0 0 375 812" style={{ position: "absolute" }}>
          <Defs>
            <ClipPath id="prefix__a">
              <Path d="M0 0h375v812H0z" />
            </ClipPath>
          </Defs>
          <G data-name="Policy Screen" clipPath="url(#prefix__a)">
            <G data-name="Group 6">
              <G filter="url(#prefix__b)">
                <Path
                  data-name="Path 117"
                  d="M27-32h322a38 38 0 0138 38v50a38 38 0 01-38 38H27a38 38 0 01-38-38V6a38 38 0 0138-38z"
                  fill="#ffeed6"
                />
              </G>
              <Path
                data-name="Icon ionic-ios-arrow-back"
                d="M33.706 58.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L30.45 57.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#4f3c75"
                onPress={() => this.props.navigation.navigate("صفحة الدخول")}
              />
              <G fill="#4f3c75">
                <Path
                  data-name="Path 1"
                  d="M280.38 65.823l-.122.244a53.007 53.007 0 00-2.154 5 3.815 3.815 0 00-.285 1.382q0 1.749 2.114 2.642a13.667 13.667 0 002.52.244 11.156 11.156 0 004.024-.732 15.346 15.346 0 004.877-2.926v-.366a12.6 12.6 0 00-.285-2.764q-.326-1.423-.732-2.764l2.195-5.081a12.539 12.539 0 011.3 5.528 13.88 13.88 0 01-.2 2.357 18.588 18.588 0 01-3.008 7.438 11.755 11.755 0 01-5.65 4.471 9.373 9.373 0 01-3.252.65 5.486 5.486 0 01-2.561-.61q-2.439-1.179-2.764-5.04v-.65q0-3.82 3.536-10.324.488-.893 1.077-1.91t1.118-1.951l.61.325.081.041 3.17 2.154q-.65 1.219-1.3 2.378t-1.3 2.3z"
                />
                <Path
                  data-name="Path 2"
                  d="M302.246 56.227q-1.951.366-3.9.711t-3.9.711l2.439-4.837q4.227-.771 7.8-1.463z"
                />
                <Path
                  data-name="Path 3"
                  d="M303.262 61.876a12.236 12.236 0 01-1.077 4.43 7.505 7.505 0 01-2.987 3.784q-2.439 1.382-8.17 1.748l.569-5.446h.041q6.3-.326 8.373-1.057a5.446 5.446 0 003.13-3.536z"
                />
                <Path
                  data-name="Path 4"
                  d="M328.391 57.193l-5.85-8.774-.007-.009-.031-.043a.731.731 0 00-1.171.043l-.007.009-5.85 8.774a.733.733 0 00.091.923 9.253 9.253 0 012.642 5.406 3.745 3.745 0 00-1.394 2.911.73.73 0 00.732.722h8.774a.73.73 0 00.732-.722 3.707 3.707 0 00-1.065-2.611 3.9 3.9 0 00-.327-.3 9.259 9.259 0 012.642-5.406.732.732 0 00.089-.923zm-6.6-.312a.732.732 0 11-.575.574.732.732 0 01.575-.574zm-3.389 8.809a2.235 2.235 0 012.069-1.511h2.925a2.234 2.234 0 012.069 1.511zm5.883-2.861a3.555 3.555 0 00-.889-.112h-2.921a3.555 3.555 0 00-.889.112 10.728 10.728 0 00-2.567-5.309l4.19-6.28v4.291a2.194 2.194 0 101.462 0V51.24l4.187 6.28a10.728 10.728 0 00-2.57 5.309z"
                />
                <Path
                  data-name="Path 5"
                  d="M320.011 69.667a8.867 8.867 0 011.253-.557 12.169 12.169 0 001.275-2.331c.081-.193.158-.382.233-.566-.161.016-.322.029-.484.038v.293a.508.508 0 11-1.016 0v-.309c-1.177-.1-2.337-.321-3.521-.333a.508.508 0 01-.162-.025 36.967 36.967 0 01-4.723.5q-.651.041-1.26.041a24.9 24.9 0 01-4.106-.325 5.6 5.6 0 01-3.616-1.666 3.549 3.549 0 01-.745-1.593 13.446 13.446 0 01-2.583 2.564.508.508 0 01-.44.111 6.1 6.1 0 00.393 1.848 5.246 5.246 0 003.273 3.17 16.556 16.556 0 005.466 1.016 8.5 8.5 0 00.855.041 31.984 31.984 0 005.12-.488 22.552 22.552 0 004.561-1.164.46.46 0 01.227-.265z"
                />
                <Path
                  data-name="Path 6"
                  d="M324.394 68.191c.845-.26 2.791-.778 2.675-1.96a.512.512 0 010-.126c-.045-.174-.09-.345-.142-.517a.617.617 0 01-.248 0 5.83 5.83 0 00-.508-.065.015.015 0 010 .007.514.514 0 01-.508.508 1 1 0 00-.136.008l-.079.018c-.05.012-.1.025-.148.041l-.066.023.014-.007a.515.515 0 01-.647-.161c-.773.1-1.538.243-2.314.284v.293a.508.508 0 01-1.016 0v-.308c-.131-.011-.263-.022-.394-.036l-.565 3.314a27.6 27.6 0 014.082-1.316z"
                />
                <Path
                  data-name="Path 7"
                  d="M335.69 68.941l.041-.041q.61-.244 1.626-.63t2.154-.793q1.137-.406 2.357-.854t2.317-.813l-1.179 1.87q-2.195.773-4.491 1.605a42.5 42.5 0 00-4.125 1.727v.041z"
                />
                <Path
                  data-name="Path 8"
                  d="M336.829 46.384l3.008-4.755 1.179 17.274-3.008 4.755z"
                />
                <Path
                  data-name="Path 9"
                  d="M320.279 40.065v-.081a6.957 6.957 0 00-2.52-.528 19.467 19.467 0 00-1.138-.041 3.266 3.266 0 00-1.788.366q-.2.163-.549.488a1.855 1.855 0 01-.467.366h-.041a6.47 6.47 0 01.528-1.545 10.487 10.487 0 011.5-2.479 3.426 3.426 0 012.479-.61h.732q2.6.122 3.211.772a1.514 1.514 0 01.406 1.016 4 4 0 01-.569 1.829 6.383 6.383 0 01-3.13 3.008 8.613 8.613 0 01-1.89.63 16.732 16.732 0 01-1.931.264l-.406-.041a8.211 8.211 0 012.52-1.484 10.168 10.168 0 003.053-1.93z"
                />
                <Path
                  data-name="Path 10"
                  d="M296.765 44.498q.649-.244 1.646-.61t2.134-.793q1.137-.427 2.357-.874t2.276-.813l-1.179 1.87q-2.195.771-4.451 1.605t-4.125 1.727z"
                />
                <Path
                  data-name="Path 11"
                  d="M321.76 47.11q-.546-.863-1.085-1.689t-1.057-1.681l2.488-1.626q.555.831 1.076 1.668t1.071 1.7z"
                />
              </G>
            </G>
          </G>
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  buttonContainer: {
    marginTop: wp("90%"),
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: wp("3%"),
    borderRadius: 25,
    width: wp("80%"),
    height: hp("7%"),
    alignSelf: "center",
  },
  Text: {
    fontSize: 12,
    color: "#4F3C75",
    left: wp("13%"),
    top: hp("35%"),
  },
  inputStyle: {
    fontSize: 18,
    height: hp("7%"),
    width: wp("80%"),
    marginBottom: wp("15%"),
    paddingBottom: wp("5%"),
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 3,
    textAlign: "right",
    top: hp("40%"),
    zIndex: 10,
  },
  buttonText: {
    fontSize: 23,
    color: "#FFEED6",
  },
});

export default ForgotPassword;
