import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
import GalleryScreen from "./components/gallery";
import DprofileScreen from "./components/DProfile";
import privacyPolicyScreen from "./components/privacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import Explore from "./components/Explore";
import logos from "./components/logos";
import posters from "./components/posters";
import brands from "./components/brands";
import packages from "./components/packages";
import digitals from "./components/digitals";
import filters from "./components/filters";
import certifications from "./components/certifications";
import others from "./components/others";
import UploadNewDesign from "./components/uploadNewDesign";

const Navigation = createStackNavigator(
  {
    "رفع تصميم جديد": { screen: UploadNewDesign },

    اكسبلور: { screen: Explore },
    شعار: { screen: logos },
    ملصق: { screen: posters },
    "علامة تجارية": { screen: brands },
    "تغليف المنتج": { screen: packages },
    "الفن الرقمي": { screen: digitals },
    "فلاتر سنابتشات": { screen: filters },
    شهادات: { screen: certifications },
    "غير ذلك": { screen: others },

    // "صفحة الدخول": { screen: LoginScreen },
    // "صفحة التسجيل": { screen: SignupScreen },
    // "معرض المصمم": { screen: GalleryScreen },
    // "صفحة المصمم": { screen: DprofileScreen },
    // "سياسة الخصوصية": { screen: privacyPolicyScreen },
    // "نسيت كلمة السر!": { screen: ForgotPassword },
  },
  { headerMode: "none" }
);

export default createAppContainer(Navigation);
