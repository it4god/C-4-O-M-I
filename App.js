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
import * as eva from '@eva-design/eva';

const Stack = createNativeStackNavigator();

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
                options={{ headerShown: false }} />
              <Stack.Screen name="Video" component={VideoScreen}
                options={{ headerShown: false }} />
              <Stack.Screen name="Videos" component={VideosScreen}
                options={{ headerShown: false }} />
              <Stack.Screen name="Article" component={ArticleScreen}
                options={{ headerShown: false }} />
              <Stack.Screen name="Articles" component={ArticlesScreen}
                options={{ headerShown: false }} />
              <Stack.Screen name="AIKonselor" component={AIKonselorScreen}
                options={{ headerShown: false }} />
              <Stack.Screen name="History" component={HistoryScreen}
                options={{ headerShown: false }} />
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