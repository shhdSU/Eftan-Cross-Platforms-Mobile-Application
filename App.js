import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
import GalleryScreen from "./components/gallery";
import DprofileScreen from "./components/DProfile";
import privacyPolicyScreen from "./components/privacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import clientprofile from "./components/clientprofile";
import clientedit from "./components/clientedit";

const Navigation = createStackNavigator(
  {
    "صفحة الدخول": { screen: LoginScreen },
    "صفحة التسجيل": { screen: SignupScreen },
    "معرض المصمم": { screen: GalleryScreen },
    "صفحة المصمم": { screen: DprofileScreen },
    "سياسة الخصوصية": { screen: privacyPolicyScreen },
    "نسيت كلمة السر!": { screen: ForgotPassword },
    clientprofile: { screen: clientprofile },
    clientedit: { screen: clientedit },
  },
  { headerMode: "none" }
);

export default createAppContainer(Navigation);
