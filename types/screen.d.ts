import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home;
  Search;
  Upload;
  SelectPhoto;
  UploadForm;
  Profile;
  Login;
  CoffeeShopScreen;
  TakePhoto;
  User;
};

export type ScreenProps<RouteName extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
};
