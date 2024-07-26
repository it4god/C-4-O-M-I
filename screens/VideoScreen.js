import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Share} from "react-native";
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
export default class VideoScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      title: '',
      yt_id: '',
    }
  }

  componentDidMount() {
    this.yt_id = this.props.route.params.youtube_id;
    this.id = this.props.route.params.id;
    this.title = this.props.route.params.title;
    this.video_path = this.props.route.params.video_path;
    this.type = this.props.route.params.type;

    this.setState({ title: this.title, yt_id: this.yt_id })
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
          title='C4OMI Indonesia'
          subtitle='Videos'
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
              <TouchableOpacity onPress={()=>{
                this.Share();
              }}>
                <Icon
                  style={styles.icon}
                  fill='#8F9BB3'
                  name='share-outline'
                />
              </TouchableOpacity>
            </React.Fragment>
          )}
        />
        <Divider />

        <View>
          {this.state.yt_id != '' && (
            <YoutubePlayer
              width={windowWidth}
              height={windowWidth * 9 / 16}
              play={true}
              videoId={this.state.yt_id}
            />
          )}
        </View>
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