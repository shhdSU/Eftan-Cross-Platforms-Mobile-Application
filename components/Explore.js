import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Category from "./Explore/Category";
import Svg, { Defs, G, Path } from "react-native-svg";
import firebase from "../database/firebase";
import EmptyList from "./emptylist";
import Icon from 'react-native-vector-icons/Ionicons'
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
       searchResults: [],
       searching:false,
       found:false,
       includesSpec:false,
    };
    this.getData();


  }

  getData(){
    console.log("inside get data")
    designGallery=[];
    this.updateInputVal([],"designGalleryState")
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
        var desTags = design[designInfo].designTags;
        designGallery[i] = {
          duid: duid,
          category: categ,
          designDescription: desDis,
          designTitle: desTitle,
          designUploadingdate: desUploadingdate,
          designUrl: desUrl,
          designTags:desTags
        };
        if (categ == "علامة تجارية") {
          brand[brand.length++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
            designTags:desTags
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
            designTags:desTags

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
            designTags:desTags

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
            designTags:desTags

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
            designTags:desTags

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
            designTags:desTags

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
            designTags:desTags

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
            designTags:desTags

          };
        }
      }
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


    ////////////////////////////////////////////////////////////////////

    console.log("inside delete")
    
   
    var ref = firebase.database().ref("Designs/");
    ref.on("child_removed", (snapshot) => {
      designGallery=[];
      this.updateInputVal([],"designGalleryState")

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
        var desTags = design[designInfo].designTags;
        designGallery[i] = {
          duid: duid,
          category: categ,
          designDescription: desDis,
          designTitle: desTitle,
          designUploadingdate: desUploadingdate,
          designUrl: desUrl,
          designTags:desTags
        };
        if (categ == "علامة تجارية") {
          brand[brand.length++] = {
            duid: duid,
            category: categ,
            designDescription: desDis,
            designTitle: desTitle,
            designUploadingdate: desUploadingdate,
            designUrl: desUrl,
            designTags:desTags
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
            designTags:desTags

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
            designTags:desTags

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
            designTags:desTags

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
            designTags:desTags

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
            designTags:desTags

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
            designTags:desTags

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
            designTags:desTags

          };
        }
      }
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

 componentDidMount(){
   this.getData();
 }
 componentWillMount(){
  this.getData();
}
// componentDidUpdate(){
//   this.getData();
// }
     
    
    
  
  readData = (arr) => {
  
    return arr.map((element) => {
      return (
        <View
          style={{ width: width / 2 - 40 }}
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
  componentWillMount(){
    this.startHeaderHeight = 80;
    if(Platform.OS == 'android'){
      this.startHeaderHeight = 100 + StatusBar.currentHeight
    }
  }
  searchTags = (val) => {
    if(val == ""){
      this.updateInputVal(false,"searching");
      this.updateInputVal(false,"includesSpec")
      return;
    }
    if(/\s/.test(val)){
      return;
    }
    var specialCheck = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(specialCheck.test(val)){
      this.updateInputVal(true,"includesSpec");
      return;
    }
    this.updateInputVal(false,"includesSpec");
    this.updateInputVal(false,"found");
    this.updateInputVal(true,"searching");
    var tags = val.split(" ");
    console.log(tags);
    var searchResults= new Array();
designGallery.forEach(element => {
  if(element.designTags){
  if(element.designTags.some(r=> tags.includes(r))){
    this.updateInputVal(true,"found");
      searchResults.push(element);
      console.log(element.designTags);
  }
}
});    
this.updateInputVal(searchResults,"searchResults");
console.log(searchResults);
  }
  render() {

    return (
      <View  style={{ flex: 1, backgroundColor: "#fff" }}>
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
            shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          
          elevation: 9,
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
           
       
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "white",
                marginHorizontal: 10,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "black",
                shadowOpacity: 0.2,
                elevation: 1,
                height:"8%",
                borderRadius:30,
                marginTop:"35%"
              }}
            >
                  <Icon name="ios-search" size={20} style={{ marginRight: "10%",marginTop:"2.35%",color:"#4f3c75"}} />
                

<TextInput 
              maxLength={45}
              style = {{ flex: 1, fontWeight: "700", backgroundColor: "white",zIndex:10,textAlign:"right" }}
          placeholderTextColor="grey"
          placeholder=" ادخل كلمات مفتاحية مفصولة بمسافة..."
          onChangeText={(val) => this.searchTags(val)}
        />
        </View>
        
          {this.state.searching && !this.state.found && !this.state.includesSpec &&//no results found
       (<View style={{marginTop:"50%"}}> 
       <EmptyList style={styles.emptyImage}></EmptyList>
        <Text style={styles.emptyText}>نأسف، لم يتم العثور على أي تصاميم بهذه الكلمات المفتاحية</Text>
        </View>)
  }
   {this.state.searching && this.state.found && !this.state.includesSpec &&//search results found
      (  <View style={{ flex: 1 }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
              marginBottom: 25,
            }}
          ></View>

          <ScrollView scrollEventThrottle={16}>
            <View>

                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                </ScrollView>

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
                  {this.readData(this.state.searchResults)}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
       ) }

{this.state.includesSpec && //search results found
     (<View style={{marginTop:"50%"}}> 
     <EmptyList style={styles.emptyImage}></EmptyList>
      <Text style={styles.emptyText}>يجب ان تحتوي الكلمات المفتاحية على أحرف وأرقام فقط</Text>
      </View>)
        }



          {!this.state.searching && !this.state.found && !this.state.includesSpec && //default page (not searching anything)
      (  <View style={{ flex: 1 }}>
         

          <ScrollView scrollEventThrottle={16}>
            <View>
              <View
                style={{
                  height: 130,
                  marginTop: "5%",
                  
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
                  {this.readData(this.state.designGalleryState)}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
       ) }
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
  emptyText:{
    color: "#4f3c75",
    fontSize: 30,
    textAlign:"center",
    fontWeight:"200"
  },
  emptyImage:{
    alignSelf:"center",
    justifyContent:"center",
  },
  
  inputStyle: {
    fontSize: 18,
    marginTop: "4%",
    padding:0,
    marginBottom: "2%",
    textAlign: "left",
    alignSelf: "center",
    borderColor: "#ccc",
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
