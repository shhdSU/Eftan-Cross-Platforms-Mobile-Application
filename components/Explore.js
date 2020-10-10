import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Category from "./Explore/Category";
import Svg, { Defs, G, Path } from "react-native-svg";
import firebase from "../database/firebase";

var designGallery = new Array();

var logo = [];
var brand = [];
var cert = [];
var packag = [];
var other = [];
var filter = [];
var poster = [];
var digital = [];

var design = "";
var designKeys = "";
const { width, height } = Dimensions.get("window");

export default class explore extends Component {
  constructor() {
    super();
    this.state = {
      designTitle: "",
      designDescription: "",
      category: "",
      designUrl: "",
      designUploadingdate: "",
      designGalleryState: [],
    };
    var b = 0;
    var l = 0;
    var c = 0;
    var g = 0;
    var o = 0;
    var d = 0;
    var f = 0;
    var p = 0;

    var ref = firebase.database().ref("Designs/");
    ref.on("value", (snapshot) => {
      design = snapshot.val();
      designKeys = Object.keys(design);
      for (var i = 0; i < designKeys.length; i++) {
        var designInfo = designKeys[i];
        var duid = design[designInfo].Duid;
        var categ = design[designInfo].category;
        var desDis = design[designInfo].designDescription;
        var desTitle = design[designInfo].designTitle;
        var desUploadingdate = design[designInfo].designUploadingdate;
        var desUrl = design[designInfo].designUrl;
        designGallery[i] = {
          duid: duid,
          category: categ,
          designDescription: desDis,
          designTitle: desTitle,
          designUploadingdate: desUploadingdate,
          designUrl: desUrl,
        };
        if (categ == "علامة تجارية") {
          brand[b++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "شعار") {
          logo[l++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "شهادة") {
          cert[c++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "انفوجرافيك") {
          packag[g++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "أخرى") {
          other[o++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "فلتر") {
          filter[f++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "إعلان") {
          poster[p++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "فن رقمي") {
          digital[d++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        }
      }
      this.updateInputVal(designGallery, "designGalleryState");
    });
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  readData = () => {
    /*
    var b = 0;
    var l = 0;
    var c = 0;
    var g = 0;
    var o = 0;
    var d = 0;
    var f = 0;
    var p = 0;

    var ref = firebase.database().ref("Designs/");
    ref.on("value", (snapshot) => {
      design = snapshot.val();
      designKeys = Object.keys(design);
      for (var i = 0; i < designKeys.length; i++) {
        var designInfo = designKeys[i];

        var categ = design[designInfo].category;
        var desDis = design[designInfo].designDescription;
        var desTitle = design[designInfo].designTitle;
        var desUploadingdate = design[designInfo].designUploadingdate;
        var desUrl = design[designInfo].designUrl;

        designGallery[i] = {
          category: categ,
          designDescription: desDis,
          designTitle: desTitle,
          designUploadingdate: desUploadingdate,
          designUrl: desUrl,
        };
        if (categ == "علامة تجارية") {
          brand[b++] = {
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "شعار") {
          logo[l++] = {
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "شهادة") {
          cert[c++] = {
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "انفوجرافيك") {
          packag[g++] = {
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "أخرى") {
          other[o++] = {
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "فلتر") {
          filter[f++] = {
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "إعلان") {
          poster[p++] = {
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        } else if (categ == "فن رقمي") {
          digital[d++] = {
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        }
      }
      this.updateInputVal(designGallery,"designGalleryState");
    });

   */

    return this.state.designGalleryState.map((element) => {
      return (
        <View
          style={{ width: width / 2 - 40, height: width / 2 - 20 }}
          key={element.designUrl}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              shadowOffset: { width: 0.5, height: 0.5 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 5,
              backgroundColor: "white",
              margin: 10,
            }}

          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("عرض تفاصيل التصميم", { obj: element })}
            >
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain",
                  margin: 5,
                }}
                width={width}
                source={{ uri: element.designUrl }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#4f3c75" }}
              onPress={() => this.props.navigation.navigate("عرض تفاصيل التصميم", { obj: element })}

            >
              {element.designTitle}
            </Text>
          </View>
        </View>
      );

      //return this.print(designGallery);
    });
  };
  /*
  print = (array) => {
    return array.map((element) => {
      return (
        <View
          style={{
            // width: width / 2 - 40,
            // // height: width / 2 - 20,
            // alignItems: "center",
            // justifyContent: "center",
            // margin: 1,
            // height: width / 2 - 20,
            flex: 1,
            width: width - 20,
            height: height / 3,
            backgroundColor: "white",
            margin: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0.5, height: 0.5 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 5,
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              style={{
                // flex: 1,
                // width: 290,
                // height: 180,
                // marginLeft: 10,
                // marginTop: 12,
                //resizeMode: "contain",
                width: width - 20,
                height: height / 3,
                borderRadius: 10,
              }}
              width={width}
              source={{ uri: element.designUrl }}
            />
          </View>

      //return this.print(designGallery);
    });
  };
  /*
    print = (array) => {
      return array.map((element) => {
        return (
          <View
            style={{
              width: width / 2 - 40,
              height: width / 2 - 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain",
                }}
                width={width}
                source={{ uri: element.designUrl }}
              />
            </View>
  
            <View
              style={{
                justifyContent: "space-evenly",
                paddingLeft: 10,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#4f3c75" }}
              >
                {"  عنوان العمل:" + element.designTitle}
              </Text>
            </View>
          </View>
        );
      });
    };
  */
  render() {
    //  const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#4f3c75",
            alignSelf: "center",
            top: "7%",
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
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
              marginBottom: 25,
            }}
          ></View>

          <ScrollView scrollEventThrottle={16}>
            <View>
              <View
                style={{
                  height: 130,
                  marginTop: 120,
                  marginBottom: 40,
                  height: this.startHeaderHeight,
                  borderBottomWidth: 1,
                  borderBottomColor: "#dddddd",
                }}
              >
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: logo,
                        category: "شعار",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/logo.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: poster,
                        category: "إعلان",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/poster.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: brand,
                        category: "علامة تجارية",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/brand.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: packag,
                        category: "انفوجرافيك",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/package.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: digital,
                        category: "فن رقمي",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/digital.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: filter,
                        category: "فلتر",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/filter.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: cert,
                        category: "شهادة",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/cert.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: other,
                        category: "أخرى",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/other.jpg")} />
                  </TouchableOpacity>
                </ScrollView>
              </View>

              <View
                style={{
                  marginTop: 40,
                }}
              >
                <View
                  style={{
                    marginTop: -60,
                    paddingLeft: 30,
                    paddingRight: 30,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {this.readData()}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
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

  img: {
    width: width * 0.9,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
});
