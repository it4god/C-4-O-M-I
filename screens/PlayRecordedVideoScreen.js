import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity, Alert, PermissionsAndroid, Dimensions
} from "react-native";
;
import { Layout, TopNavigation, Divider, Button, Card, Menu as UKMenu, TopNavigationAction, Icon, Text, OverflowMenu, Tab, Input, TabView, } from '@ui-kitten/components';

import styles from '../common/style1'
import VideoPlayer from 'react-native-video-controls';

const WindowWidth = Dimensions.get('window').width;
var moment = require('moment')
class PlayRecordedVideoScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.video_uri == "";
  }
  async AskPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  }

  componentDidMount = () => {

    this._isMounted = true;

    this.video_uri = this.props.route.params.video_uri
    console.log("this video uri : " + this.video_uri)
    this.setState({ isLoading: true })

  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={{ flex: 1 }}>

        <Layout style={{ flex: 1 }} level='1'>
          {this.state.isLoading == true && (
            <VideoPlayer
              onBack={() => {
                this.props.navigation.pop();
              }}

              source={{ uri: this.video_uri }}
              style={styles.backgroundVideo}
            />
          )}
        </Layout>
      </SafeAreaView>

    );


  }

}


export default PlayRecordedVideoScreen
