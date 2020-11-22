import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
import Svg, { Defs, G, Path } from "react-native-svg";
var cat = "";
export default class choice extends Component {
  constructor(props) {
    super();
    this.state = {
      designTitle: "",
      designDescription: "",
      category: "",
      designFileKey: "",
      designUrl: "",
      designUploadingdate: "",
      cat1: "",
      arr: [],
    };
    const { navigation } = props.navigation;
    cat = props.navigation.state.params.category;
    console.log(props.navigation.state.params.array);
    this.updateInputVal(props.navigation.state.params.array,"arr");
    this.updateInputVal(cat, "cat1");
    console.log(this.state.arr);
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  print = (arr) => {
    return arr.map((element) => {
      return (
        <View style={{ width: width / 2 - 40}}>
          <View
           style={{
            flex: 1,
            alignItems: "center",
            shadowOffset: { width: 0.5, height: 0.5 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 5,
            backgroundColor: "white",
            marginBottom: 10,
            width: 150,
            height: 150,
            borderRadius: 15,
          }}

        >
          <Image
            style={{
              width: 140,
    height: 140,
    borderColor: "#ccc",
    borderWidth: 1,
    top: "3%",
    borderRadius: 15,
    alignSelf: "center",
            }}
              source={{ uri: element.designUrl }}
            />
          </View>

          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#4f3c75" ,top:-5, marginBottom:4}}
              onPress={() => this.props.navigation.navigate("عرض تفاصيل التصميم", { obj: element })}
            >
              {element.designTitle}
            </Text>
          </View>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "700",
            color: "#4f3c75",
            alignSelf: "center",
            top: "8%",
            position: "absolute",
            zIndex: 2,
          }}
        >
          {cat}
        </Text>
        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-2%", position: "relative" }}
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
              onPress={() => this.props.navigation.navigate("معرض")}
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#4f3c75"
            />
            {/* <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            /> */}
          </G>
        </Svg>

        <ScrollView scrollEventThrottle={16}>
          <View style={{ flex: 1, paddingTop: 10 }}>
            <View
              style={{
                marginTop: 10,
                marginBottom: 50,
                paddingLeft: 30,
                paddingRight: 30,

                justifyContent: "space-between",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {this.print(this.state.arr)}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
