import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
import GalleryScreen from "./components/gallery";
import privacyPolicyScreen from "./components/privacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import clientprofile from "./components/clientprofile";
import clientedit from "./components/clientedit";
import designerprofile from "./components/designerprofile";
import designeredit from "./components/designeredit";
import designerGallery from "./components/designerGallery";

const Navigation = createStackNavigator(
  {designerprofile: { screen: designerprofile },
    designerGallery: { screen: designerGallery },
    "صفحة الدخول": { screen: LoginScreen },
    "صفحة التسجيل": { screen: SignupScreen },
    "معرض المصمم": { screen: GalleryScreen },
    "سياسة الخصوصية": { screen: privacyPolicyScreen },
    "نسيت كلمة السر!": { screen: ForgotPassword },
    clientprofile: { screen: clientprofile },
    clientedit: { screen: clientedit },
    
    designeredit: { screen: designeredit },
   
  },
  { headerMode: "none" }
);

export default createAppContainer(Navigation);
