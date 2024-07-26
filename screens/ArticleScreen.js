import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Share } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {
  Icon,
  IconElement,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  BottomNavigation,
  BottomNavigationTab,
  Avatar,
  Divider,

} from '@ui-kitten/components';
import { WebView } from 'react-native-webview';
export default class ArticleScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      title: '',
      yt_id: '',
    }
  }

  componentDidMount() {
    this.id = this.props.route.params.id;
    this.title = this.props.route.params.title;
    this.url = this.props.route.params.url;
    this.setState({ title: this.title, url: this.url })
  }
  async Share() {
    try {
      const result = await Share.share({
        message:
          'Bagikan Video C4OMI ini di \nhttps://www.c4omi.org/c4omi.php?uri=' + this.yt_id
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          alignment='center'
          title='Articles'
          subtitle={this.title}
          accessoryLeft={(props) => (
            <React.Fragment>
              <TouchableOpacity onPress={() => {
                this.props.navigation.pop()
              }}>
                <Icon
                  style={styles.icon}
                  fill='#8F9BB3'
                  name='arrow-back-outline'
                />
              </TouchableOpacity>
            </React.Fragment>

          )}
          accessoryRight={(props) => (
            <React.Fragment>
              <TouchableOpacity onPress={() => {
         
              }}>

              </TouchableOpacity>
            </React.Fragment>
          )}
        />
        <Divider />
        <Layout style={{ flex: 1 }}>
          <WebView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: 'transparent', margin: 10, }}
            originWhitelist={['*']}
            automaticallyAdjustContentInsets={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            startInLoadingState={true}
            onMessage={(event) => { }}
            injectedJavaScript={"document.body.style.color = 'black';document.body.style.fontSize = 'medium';"}
            scalesPageToFit={false}
            source={{ uri: this.state.url }}
          />
        </Layout>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
  },
})