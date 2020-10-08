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
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
import ClientGalleryScreen from "./components/ClientGallery";
import DesignerGalleryScreen from "./components/DesignerGallery";
// import designerGallery from "./components/designerGallery"; >> هي نفس اللي فوقها بس غيرت المسميات
//import DprofileScreen from "./components/DProfile"; // Access by Client <<قديمه
import privacyPolicyScreen from "./components/privacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import ChatPassword from "./components/chat";
import React, { Component } from "react";
import RequestScreen from "./components/requestForms";
import UploadNewDesign from "./components/uploadNewDesign";
import clientprofile from "./components/clientprofile";
import clientedit from "./components/clientedit";
import designerprofile from "./components/designerprofile";
import designeredit from "./components/designeredit";
import Explore from "./components/Explore";
import logos from "./components/logos";
import posters from "./components/posters";
import brands from "./components/brands";
import packages from "./components/packages";
import digitals from "./components/digitals";
import filters from "./components/filters";
import certifications from "./components/certifications";
import others from "./components/others";
// import UploadNewDesign from "./components/UploadNewDesign";
import test from "./components/test";
import DesignDetails from "./components/GDDetails";
//-------------------------------------------------------
// 1- login stack >> اساسية
const LoginStack = createStackNavigator(
  {
    "صفحة الدخول": LoginScreen,
    "صفحة التسجيل": SignupScreen,
    "سياسة الخصوصية": privacyPolicyScreen,
    "نسيت كلمة السر!": ForgotPassword,
  },
  {
    headerMode: "none",
  }
);
//-------------------------------------------------------
//  client gallery stack << لكل صفحة فيها سلسلة من الصفحات بنسوي لها ستاك بعدين نضيفها كشاشه في المنيو
const ClientGalleryNavigation = createStackNavigator(
  {
    "معرض التصاميم من منظور العميل": ClientGalleryScreen,
    "عرض تفاصيل التصميم": DesignDetails,
    //" عرض حساب المصمم للطلب":,
    "طلب تصميم": RequestScreen,
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
    "معرض التصاميم من منظور المصمم": DesignerGalleryScreen,
    "عرض تفاصيل التصميم": DesignDetails,
    // عرض حساب المصمم" >> بحيث يختفي زر الطلب" تحت الانشاء
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
    const DNav = createAppContainer(DPrimaryNav);
    const CNav = createAppContainer(CPrimaryNav);
    return (<DNav />), (<CNav />);
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
//Designer drawer navigation
const DesignerDrawer = createDrawerNavigator(
  {
    "معرض التصاميم": DesignerGalleryNavigation,
    // "حسابي كمصمم": DesignerProfileNavigation,
    // recived ordered screen
    "رفع تصميم جديد": { screen: UploadNewDesign },
    "محادثات": ChatPassword,
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
//Client drawer navigation
const ClientDrawer = createDrawerNavigator(
  {
    "معرض التصاميم": ClientGalleryNavigation,
    // "حسابي كعميل": ClientProfileNavigation,
    محادثات: ChatPassword,
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
//    كل التنقلات داخل المنيو تصير ستاك
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
    loginStack: { screen: LoginStack },
    drawer: { screen: CDrawerNavigation },
  },
  {
    // Default config for all screens
    headerMode: "none",
    title: "Main",
  }
);
//-------------------------------------------------------
const DPrimaryNav = createStackNavigator(
  {
    loginStack: { screen: LoginStack },
    drawer: { screen: DDrawerNavigation },
  },
  {
    // Default config for all screens
    headerMode: "none",
    title: "Main",
  }
);
//-------------------------------------------------------
//  client Profile stack
const ClientProfileNavigation = createStackNavigator(
  {
    "عرض حساب العميل": clientprofile,
    "تعديل حساب العميل": clientedit,
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
    "عرض حساب المصمم": designerprofile,
    "تعديل حساب المصمم": designeredit,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
//-------------------------------------------------------
// تست: { screen: test },
// اكسبلور: { screen: Explore },
// شعار: { screen: logos },
// ملصق: { screen: posters },
// "علامة تجارية": { screen: brands },
// "تغليف المنتج": { screen: packages },
// "الفن الرقمي": { screen: digitals },
// "فلاتر سنابتشات": { screen: filters },
// شهادات: { screen: certifications },
// "غير ذلك": { screen: others },
