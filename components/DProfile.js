import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "../database/firebase";
import * as React from "react"
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
// view its like div in web :)
//class LoadingScreen
export default class gallery extends React.Component {
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
      <View >




    <Svg  viewBox="0 0 375 812">
      <Defs>
        <ClipPath id="prefix__a">
          <Path d="M0 0h375v812H0z" />
        </ClipPath>
      </Defs>
      <G data-name="Gallery Screen" clipPath="url(#prefix__a)">
        <Path fill="#fff" d="M0 0h375v812H0z" />
        <G filter="url(#prefix__b)">
          <Rect
            data-name="Rectangle 6"
            width={398}
            height={126}
            rx={38}
            transform="translate(-11 -18)"
            fill="#ffeed6"
          />
        </G>
        <G data-name="Icon ionic-md-log-out" onPress={this.signOutUser}>
          <Path
            data-name="Path 104"
            d="M61.125 52.125H47.787l3.066-3.143-2.1-2.1L42 53.625l6.75 6.75 2.18-2.1-3.143-3.15h13.338z"
            fill="#4f3c75"
          />
          <G data-name="Group 3">
            <Path
              data-name="Path 105"
              d="M56.646 42.002a11.629 11.629 0 018.206 19.843 11.594 11.594 0 01-16.4.014l-2.13 2.13a15.541 15.541 0 001.95 1.636 14.637 14.637 0 10-1.941-22.352l2.124 2.118a11.509 11.509 0 018.191-3.389z"
              fill="#4f3c75"
            />
          </G>
        </G>
        <Path
          data-name="Icon material-menu"
          d="M316.676 71.883H357V67.4h-40.324zm0-11.2H357V56.2h-40.324zm0-15.683v4.48H357V45z"
          fill="#4f3c75"
        />
      </G>
    </Svg>
    <Text style={styles.forText} onPress={this.signOutUser}>تسجيل الخروج</Text>
    <Text style={styles.forText2} onPress={this.signOutUser}>مرحبًا ايها المصمم</Text>
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
  forText:{
    position:"absolute",
top:"9%",
left:"5%",
color:"#4F3C75",

  },
  forText2:{
    position:"absolute",
top:"45%",
left:"25%",
color:"#4F3C75",
fontSize:30

  }
});