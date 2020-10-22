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
var design = "";
var designKeys = "";
const { width, height } = Dimensions.get("window");
var logo = [];
var brand = [];
var cert = [];
var packag = [];
var other = [];
var filter = [];
var poster = [];
var digital = [];
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
      logo: [],
       brand: [],
       cert : [],
       packag : [],
       other :[],
       filter : [],
       poster : [],
       digital : [],
       b:0,
       l:0,
       c:0,
       g:0,
       o:0,
       d:0,
       f:0,
       p:0,
    };
    logo = [];
    brand = [];
    cert = [];
    packag = [];
    other = [];
    filter = [];
    poster = [];
    digital = [];
    // this.updateInputVal(0,"d");
    // this.updateInputVal(0,"l");
    // this.updateInputVal(0,"o");
    // this.updateInputVal(0,"g");
    // this.updateInputVal(0,"p");
    // this.updateInputVal(0,"b");
    // this.updateInputVal(0,"f");
    // this.updateInputVal(0,"c");
    this.updateInputVal([],"logo");
    this.updateInputVal([],"brand");
    this.updateInputVal([],"other");
    this.updateInputVal([],"digital");
    this.updateInputVal([],"cert");
    this.updateInputVal([],"packag");
    this.updateInputVal([],"poster");
    this.updateInputVal([],"filter");

    var ref = firebase.database().ref("Designs/");
    ref.on("value", (snapshot) => {
      logo = [];
      brand = [];
      cert = [];
      packag = [];
      other = [];
      filter = [];
      poster = [];
      digital = [];
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
          brand[brand.length++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
          this.updateInputVal(this.state.b+1,"b")
        } else if (categ == "شعار") {
          logo[logo.length++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
          this.updateInputVal(this.state.l+1,"l")

        } else if (categ == "شهادة") {
          cert[this.state.c] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
          this.updateInputVal(this.state.c+1,"c")

        } else if (categ == "انفوجرافيك") {
          packag[this.state.g] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
          this.updateInputVal(this.state.g+1,"g")

        } else if (categ == "أخرى") {
          other[this.state.o] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
          this.updateInputVal(this.state.o+1,"o")

        } else if (categ == "فلتر") {
          filter[this.state.f] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
          this.updateInputVal(this.state.f+1,"f")

        } else if (categ == "إعلان") {
          poster[this.state.p] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
          this.updateInputVal(this.state.p+1,"p")

        } else if (categ == "فن رقمي") {
          digital[digital.length] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
          };
        }
      }
      if (this.state.designGalleryState.length != designGallery.length)
        this.updateInputVal(designGallery, "designGalleryState");

      this.updateInputVal(digital,"digital");
      this.updateInputVal(logo,"logo");
      this.updateInputVal(other,"other");
      this.updateInputVal(packag,"packag");
      this.updateInputVal(poster,"poster");
      this.updateInputVal(brand,"brand");
      this.updateInputVal(filter,"filter");
      this.updateInputVal(cert,"cert");




    });

  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  readData = () => {
  
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
                        array: this.state.logo,
                        category: "شعار",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/logo.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: this.state.poster,
                        category: "إعلان",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/poster.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: this.state.brand,
                        category: "علامة تجارية",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/brand.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: this.state.packag,
                        category: "انفوجرافيك",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/package.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: this.state.digital,
                        category: "فن رقمي",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/digital.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: this.state.filter,
                        category: "فلتر",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/filter.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: this.state.cert,
                        category: "شهادة",
                      })
                    }
                  >
                    <Category imageUri={require("../assets/cert.jpg")} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("الإختيار", {
                        array: this.state.other,
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
