// ------------------------------------------------------
import {
  createDrawerNavigator,
  DrawerItems,
  DrawerActions,
} from "react-navigation-drawer";
import {
  ImageBackground,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
// import ClientGalleryScreen from "./components/ClientGallery";
import DesignerGalleryScreen from "./components/designerGallery";
import privacyPolicyScreen from "./components/privacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import React, { Component } from "react";
import RequestScreen from "./components/requestForms";
import UploadNewDesign from "./components/uploadNewDesign";
import clientprofile from "./components/clientprofile";
import clientedit from "./components/clientedit";
import designerprofile from "./components/designerprofile";
import designeredit from "./components/designeredit";
import Explore from "./components/Explore";
import choice from "./components/choice";
import DesignDetails from "./components/GDDetails";
// import firebase from "./database/firebase";

//-------------------------------------------------------
// 1- login stack >> اساسية
const LoginStack = createStackNavigator(
  {
    "صفحة الدخول": { screen: LoginScreen },
    "صفحة التسجيل": { screen: SignupScreen },
    "سياسة الخصوصية": { screen: privacyPolicyScreen },
    "نسيت كلمة السر!": { screen: ForgotPassword },
  },
  {
    headerMode: "none",

  }
);
//-------------------------------------------------------
const category = createStackNavigator(
  {
    "معرض": { screen: Explore },
    "الإختيار": {screen: choice},
  },
  {
    headerMode: "none",
  }
);
//-------------------------------------------------------
const Explorescreen = createStackNavigator(
  {
    "معرض": category,
  },
  {
    headerMode: "none",
  }
);
//-------------------------------------------------------

//  client gallery stack << لكل صفحة فيها سلسلة من الصفحات بنسوي لها ستاك بعدين نضيفها كشاشه في المنيو
const ClientGalleryNavigation = createStackNavigator(
  {
    "معرض التصاميم من منظور العميل": Explorescreen,
    "عرض تفاصيل التصميم": DesignDetails,
    //" عرض حساب المصمم للطلب":,
    "طلب تصميم": { screen: RequestScreen },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
//  designer gallery stack << لكل صفحة فيها سلسلة من الصفحات بنسوي لها ستاك بعدين نضيفها كشاشه في المنيو
const DesignerGalleryNavigation = createStackNavigator(
  {
    "معرض التصاميم من منظور المصمم": Explorescreen,
    "عرض تفاصيل التصميم": DesignDetails,
    //" عرض حساب المصمم":DesignerGalleryScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
//client Profile stack
const ClientProfileNavigation = createStackNavigator(
  {
    "عرض حساب العميل": { screen: clientprofile },
    "تعديل حساب العميل": { screen: clientedit },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
//  Designer Profile stack
const DesignerProfileNavigation = createStackNavigator(
  {
    "عرض حساب المصمم": { screen: designerprofile },
    "تعديل حساب المصمم": { screen: designeredit },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);



//-------------------------------------------------------
// export navegtion

export default class App extends Component {
  render() {
    const Nav = createAppContainer(createSwitchNavigator(
      {
        DNav: DPrimaryNav,
        CNav: CPrimaryNav,
      }
    )
    );
    return (<Nav />);

  }
}
//-------------------------------------------------------

// Custom Drawers
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 290,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ImageBackground
        source={require("./assets/background.png")}
        style={{ width: undefined, padding: 50, paddingTop: 80 }}
      >
        <Image
          source={require("./assets/profile-pic.png")}
          style={{ height: 120, width: 120, borderRadius: 60 }}
        />
        <Text
          style={{
            color: "#4F3C75",
            fontSize: 15,
            marginVertical: 8,
            textAlign: "center",
          }}
        >
          sarah alqahatni{" "}
        </Text>
        <Text
          style={{
            color: "#4F3C75",
            fontSize: 12,
            marginVertical: 8,
            textAlign: "center",
          }}
        >
          sara@gmail.com{" "}
        </Text>
      </ImageBackground>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "تسجيل خروج",
            "هل انت متأكد من تسجيل خروجك ؟",
            [
              {
                text: "الغاء",
                onPress: () => {
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                },
              },
              {
                text: "تأكيد",
                onPress: () => {
                  AsyncStorage.clear();
                  props.navigation.navigate("صفحة الدخول");
                },
              },
            ],
            { cancelable: false }
          )
        }
      >
        <Text
          style={{
            margin: 16,
            fontWeight: "bold",
            color: "red",
            textAlign: "right",
          }}
        >
          تسجيل خروج
        </Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

//-------------------------------------------------------
//Client drawer navigation
const ClientDrawer = createDrawerNavigator(
  {
    "معرض التصاميم": ClientGalleryNavigation,
    "عرض حساب العميل": ClientProfileNavigation,
    //"محادثات": { screen: ChatPassword },
  },
  {
    contentComponent: CustomDrawerComponent,
    gesturesEnabled: false,
    drawerPosition: "right",
    drawerType: "slide",
    drawerWidth: Dimensions.get("window").width - 150,
    contentOptions: {
      activeTintColor: "#4F3C75",
      inactiveTintColor: "#4F3C75",
      activeBackgroundColor: "#FFEED6",
      itemStyle: {
        flexDirection: "row-reverse",
      },
    },
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);
//-------------------------------------------------------
//Designer drawer navigation
const DesignerDrawer = createDrawerNavigator(
  {
    "معرض التصاميم": DesignerGalleryNavigation,
    "عرض حساب المصمم": DesignerProfileNavigation,
    // recived ordered screen
    "رفع تصميم جديد": { screen: UploadNewDesign },
    //"محادثات": { screen: ChatPassword },
  },
  {
    contentComponent: CustomDrawerComponent,
    gesturesEnabled: false,
    drawerPosition: "right",
    drawerType: "slide",
    drawerWidth: Dimensions.get("window").width - 150,
    contentOptions: {
      activeTintColor: "#4F3C75",
      inactiveTintColor: "#4F3C75",
      activeBackgroundColor: "#FFEED6",
      itemStyle: {
        flexDirection: "row-reverse",
      },
    },
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);
//-------------------------------------------------------
//   كل التنقلات داخل المنيو تصير ستاك
const CDrawerNavigation = createStackNavigator(
  {
    DrawerStack: ClientDrawer,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
//    كل التنقلات داخل المنيو تصير ستاك
const DDrawerNavigation = createStackNavigator(
  {
    DrawerStack: DesignerDrawer,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
const CPrimaryNav = createStackNavigator(
  {
    loginStack: LoginStack,
    "Cdrawer": CDrawerNavigation,
  },
  {
    // Default config for all screens
    headerMode: "none",

  }
);
//-------------------------------------------------------
const DPrimaryNav = createStackNavigator(
  {
    loginStack: LoginStack,
    " Ddrawer": DDrawerNavigation,
  },
  {
    // Default config for all screens
    headerMode: "none",

  }
);
//-------------------------------------------------------
