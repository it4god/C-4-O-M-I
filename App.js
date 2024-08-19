import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import HomeScreen from "./screens/HomeScreen";
import VideoScreen from "./screens/VideoScreen";
import VideosScreen from "./screens/VideosScreen";
import ArticleScreen from "./screens/ArticleScreen";
import ArticlesScreen from "./screens/ArticlesScreen";
import AIKonselorScreen from "./screens/AIKonselorScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import DrawerMenuScreen from "./screens/DrawerMenuScreen";
import MobileDeveloperScreen from "./screens/MobileDeveloperScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import ChatClientScreen from "./screens/ChatClientScreen";
import PDFsScreen from "./screens/PDFsScreen";
import PDFScreen from "./screens/PDFScreen";
import LinksScreen from "./screens/LinksScreen";
import EventScreen from "./screens/EventScreen";
import MoreScreen from "./screens/MoreScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BundlesScreen from "./screens/BundlesScreen";
import BundleScreen from "./screens/BundleScreen";
import DisclamerScreen from "./screens/DisclaimerScreen";
import BookScreen from "./screens/BookScreen";
const Stack = createNativeStackNavigator();
import * as eva from '@eva-design/eva';
export default class App extends React.Component {


  constructor(props) {
    super(props)

  }

  componentDidMount() {


  }

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Video" component={VideoScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Videos" component={VideosScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Article" component={ArticleScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Articles" component={ArticlesScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="AIKonselor" component={AIKonselorScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="History" component={HistoryScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="DrawerMenu" component={DrawerMenuScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="About" component={AboutScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Contact" component={ContactScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="MobileDeveloper" component={MobileDeveloperScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Feedback" component={FeedbackScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="ChatClient" component={ChatClientScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="PDFs" component={PDFsScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="PDF" component={PDFScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Links" component={LinksScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Event" component={EventScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="More" component={MoreScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Register" component={RegisterScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Bundles" component={BundlesScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Bundle" component={BundleScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Disclaimer" component={DisclamerScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Book" component={BookScreen}
                options={{ headerShown: false, animation: 'none' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  }
})