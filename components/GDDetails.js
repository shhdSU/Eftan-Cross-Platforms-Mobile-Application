import { View, Text, StyleSheet, Image } from "react-native";
import * as React from "react";
import Svg, {
  Defs,
  ClipPath,
  Path,
  G,
  Rect,
  Circle,
  TSpan,
  Ellipse,
} from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SvgComponent from "./GD_detailsImage"

export default class GDDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      designId: "",
      title: "عنوان العمل",
      designerFName: "هديل",
      designerLName: "الهاجري",
      date:"22-5-2020",
      description: "بببببببببببببببببببببببببب ببببببببب بببببببببببببببب بببببببببببببببببببب ببببببببببببببب بببببببببببببب بببببب بببببببببببببببب بببببببببببببببببببببببب ببببببببببببببببببببببببببب بببببببببببببب بببببببببببببب بببببببببببببب بببببببب ببببببب ببببببببب ببببببب ببببب",
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.inputStyle2,
            {
              color: "#4F3C75",
              top: "5%",
              fontWeight: "700",
              position:"absolute",
              fontSize:30,
              textAlign:"center",
              alignSelf:"center",
              zIndex:1,
            },
          ]}
        >
          {this.state.title}
        </Text>
        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-2%", position: "absolute" }}
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
        <Image
          style={styles.preview}
          onTouchStart={this.onChooseImagePress}
          source={{
            uri: this.state.localpath,
          }}
        />
        <Svg
          width={39.676}
          height={39.676}
          viewBox="0 0 39.676 39.676"
          style={{
            top: 115,
            left: 135,
          }}
        >
          <Path
            data-name="Icon material-account-circle"
            d="M19.838 0a19.838 19.838 0 1019.838 19.838A19.845 19.845 0 0019.838 0zm0 5.951a5.951 5.951 0 11-5.951 5.949 5.943 5.943 0 015.951-5.949zm0 28.17a14.285 14.285 0 01-11.9-6.388c.06-3.948 7.935-6.11 11.9-6.11 3.948 0 11.843 2.162 11.9 6.11a14.285 14.285 0 01-11.9 6.388z"
            fill="#4f3c75"
          />
        </Svg>
        <Text
          style={[
            styles.inputStyle2,
            {
              color: "#4F3C75",
              top: "8%",
              left: "-23%",
              fontWeight: "700",
            },
          ]}
        >
          {this.state.designerFName + " " + this.state.designerLName}
        </Text>
        <Svg
          width={42}
          height={42}
          viewBox="0 0 42 42"
          style={{
            top: 70,
            left: 135,
          }}
        >
          <G
            data-name="Ellipse 26"
            fill="rgba(255,255,255,0.62)"
            stroke="#4f3c75"
            strokeWidth={2}
          >
            <Circle cx={21} cy={21} r={21} stroke="none" />
            <Circle cx={21} cy={21} r={20} fill="none" />
          </G>
          <Path
            data-name="Icon awesome-sticky-note"
            d="M25.17 23.964H32V10.705A1.2 1.2 0 0030.795 9.5h-20.09A1.2 1.2 0 009.5 10.705v20.09A1.2 1.2 0 0010.705 32h13.259v-6.83a1.209 1.209 0 011.206-1.206zm6.479 2.762l-2.625 2.624-2.3 2.3a1.2 1.2 0 01-.854.352h-.3v-6.431H32v.306a1.2 1.2 0 01-.352.85z"
            fill="#4f3c75"
          />
        </Svg>
        <Text
          style={[
            styles.inputStyle2,
            {
              color: "#4F3C75",
              top: "2%",
              left: "-23.5%",
              fontWeight: "700",
            },
          ]}
        >
          وصف العمل
        </Text>
        <Text
          style={[
            {
              color: "#4F3C75",
              top: "3%",
              left: "0%",
              textAlign:"center",
              fontWeight: "700",
              width:340,
              height:150,
              fontSize: 15,
              
            },
          ]}
        >
          {this.state.description}{" "}
        </Text>
        <SvgComponent style={{
          right:120,
        }}></SvgComponent>
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
    backgroundColor: "#fff",
  },
  forText: {
    position: "relative",
    top: wp("-200%"),
    left: hp("2%"),
    color: "#4F3C75",
  },
  forText2: {
    position: "absolute",
    top: hp("45%"),
    left: hp("11%"),
    color: "#4F3C75",
    fontSize: 30,
  },
  preview: {
    width: 330,
    height: 280,
    borderColor: "#ccc",
    borderWidth: 2,
    top: "12.5%",
    borderRadius: 35,
    alignSelf: "center",
  },
  inputStyle2: {
    fontSize: 18,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    textAlign: "right",
    top: "0%",
  },
});
