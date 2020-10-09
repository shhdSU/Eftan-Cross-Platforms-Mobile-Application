import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
import GalleryScreen from "./components/gallery";
import DprofileScreen from "./components/DProfile";
import privacyPolicyScreen from "./components/privacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import Explore from "./components/Explore";
import UploadNewDesign from "./components/UploadNewDesign";
import choice from "./components/choice";

const Navigation = createStackNavigator(
  {
    اكسبلور: { screen: Explore },

    "صفحة الدخول": { screen: LoginScreen },

    الإختيار: { screen: choice },

    "رفع تصميم جديد": { screen: UploadNewDesign },

    // شعار: { screen: logos },
    // ملصق: { screen: posters },
    // "علامة تجارية": { screen: brands },
    // "تغليف المنتج": { screen: packages },
    // "الفن الرقمي": { screen: digitals },
    // شهادات: { screen: certifications },
    // "غير ذلك": { screen: others },

    "صفحة التسجيل": { screen: SignupScreen },
    // "معرض المصمم": { screen: GalleryScreen },
    // "صفحة المصمم": { screen: DprofileScreen },
    // "سياسة الخصوصية": { screen: privacyPolicyScreen },
    // "نسيت كلمة السر!": { screen: ForgotPassword },
  },
  { headerMode: "none" }
);

export default createAppContainer(Navigation);
