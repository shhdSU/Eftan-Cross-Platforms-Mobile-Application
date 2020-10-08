import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  Dimensions,
} from "react-native";
import Home from "./Explore/Home";
import Category from "./Explore/Category";
const { width } = Dimensions.get("window");
import Svg, { Defs, G, Path } from "react-native-svg";

class others extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1,backgroundColor:"#fff" }}>
        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-5%", position: "relative" }}
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
              onPress={() => navigation.navigate("اكسبلور")}
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#4f3c75"
            />
            <Path
              data-name="Icon material-menu"
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            />
          </G>
        </Svg>
        <View
          style={{
            height: 130,
            // marginTop: 10,
            marginBottom: 30,
            height: this.startHeaderHeight,

            borderBottomWidth: 1,
            borderBottomColor: "#dddddd",
          }}
        >
          <Category
            imageUri={require("../assets/other.jpg")}
            // name="شعار"
          />
        </View>
        <ScrollView scrollEventThrottle={16}>
          <View style={{ flex: 1, paddingTop: 10 }}>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Home width={width} imageUri={require("../assets/logo1.jpg")} />
              <Home width={width} imageUri={require("../assets/logo2.jpg")} />
              <Home width={width} imageUri={require("../assets/logo3.jpg")} />
              <Home width={width} imageUri={require("../assets/logo4.jpg")} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default others;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
