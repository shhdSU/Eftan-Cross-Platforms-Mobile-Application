import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Category from "./Explore/Category";
import Home from "./Explore/Home";
import Svg, { Defs, G, Path } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "../database/firebase";
var designGallery = [];

const { width, height } = Dimensions.get("window");

class Explore extends Component {
  constructor() {
    super();
    this.state = {
      designTitle: "",
      designDescription: "",
      category: "",
      designFileKey: "",
      isLoading: false,
      localpath: "",
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  readData = () => {
    var ref = firebase.database().ref("Designs");
    ref.on("value", function (snapshot) {
      var design = snapshot.val();
      var designKeys = Object.keys(design);
      for (var i = 0; i < designKeys.length; i++) {
        var designInfo = designKeys[i];
        var categ = design[designInfo].category;
        var desDis = design[designInfo].designDescription;
        var desFileKey = design[designInfo].designFileKey;
        var desTitle = design[designInfo].designTitle;
        var desUploadingdate = design[designInfo].designUploadingdate;

        designGallery[i] = {
          category: categ,
          designDescription: desDis,
          designFileKey: desFileKey,
          designTitle: desTitle,
          designUploadingdate: desUploadingdate,
        };
      }
    });
    return designGallery.map((element) => {
      return (
        <View style={{ marginBottom: 30 }}>
          <ScrollView>
            <View>
              <Image
                style={{ height: 180, width: 280 }}
                source={{ uri: element.designFileKey }}
              />
              <Text>{"اسم" + element.designTitle}</Text>
            </View>
          </ScrollView>
        </View>
      );
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#4f3c75",
            alignSelf: "center",
            top: "8%",
            position: "absolute",
            zIndex: 2,
          }}
        >
          معرض التصاميم
        </Text>
        <Svg
          width={416}
          height={144}
          style={{
            position: "absolute",
            alignSelf: "center",
            top: "-2%",
            zIndex: 1,
          }}
        >
          <Defs></Defs>
          <G data-name="Group 7">
            <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G>

            <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}

              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            />
          </G>
        </Svg>

        <View style={{ flex: 1 }}>
          <View
            style={{
              height: this.startHeaderHeight,
              //  backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
              marginBottom: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "white",
                marginHorizontal: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "black",
                shadowOpacity: 0.2,
                top: "35%",
                elevation: 1,
                marginTop: Platform.OS == "android" ? 30 : null,
              }}
            >
              <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="ابحث عن مصممك.."
                placeholderTextColor="#4f3c75"
                style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
              />
            </View>
          </View>

          <ScrollView scrollEventThrottle={16}>
            <View>
              <View
                style={{
                  height: 130,
                  marginTop: 90,
                  marginBottom: 30,
                  height: this.startHeaderHeight,

                  borderBottomWidth: 1,
                  borderBottomColor: "#dddddd",
                }}
              >
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <TouchableOpacity onPress={() => navigation.navigate("شعار")}>
                    <Category
                      imageUri={require("../assets/logo.jpg")}
                    // name="شعار"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate("ملصق")}>
                    <Category
                      imageUri={require("../assets/poster.jpg")}
                    //name="ملصق"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("علامة تجارية")}
                  >
                    <Category
                      imageUri={require("../assets/brand.jpg")}
                    // name="علامة تجارية"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("تغليف المنتج")}
                  >
                    <Category
                      imageUri={require("../assets/package.jpg")}
                    //name="تغليف منتج"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("الفن الرقمي")}
                  >
                    <Category
                      imageUri={require("../assets/digital.jpg")}
                    //name="الفن الرقمي"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("فلاتر سنابتشات")}
                  >
                    <Category
                      imageUri={require("../assets/filter.jpg")}
                    //name="فلاتر سنابتشات"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("شهادات")}
                  >
                    <Category
                      imageUri={require("../assets/cert.jpg")}
                    //name="شهادات"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("غير ذلك")}
                  >
                    <Category
                      imageUri={require("../assets/other.jpg")}
                    // name="غير ذلك"
                    />
                  </TouchableOpacity>
                </ScrollView>
              </View>

              <View
                style={{
                  //paddingHorizontal: 10,
                  marginTop: 40,
                }}
              >
                {this.readData()}

                {/* <View
                  style={{
                    // flex: 1,
                    // // flexDirection: "row",
                    // // flexWrap: "wrap",
                    // // justifyContent: "space-around",
                    paddingHorizontal: 20,
                    marginTop: -60,

                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <Home
                    width={width}
                    name="شعار مشروع مبتدئ"
                    //imageUri={designTitle}
                    // imageUri={profileImage}
                    source={{ uri: url }}
                  />
                  <Home
                    width={width}
                    name="شعار منشئة"
                    imageUri={require("../assets/logo2.jpg")}
                  />
                  <Home
                    width={width}
                    name="شعار سبا "
                    imageUri={require("../assets/logo3.jpg")}
                  />
                  <Home
                    name="شعار أعمال يدوية"
                    width={width}
                    imageUri={require("../assets/logo4.jpg")}
                  />
                </View> */}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    width: width * 0.9,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
