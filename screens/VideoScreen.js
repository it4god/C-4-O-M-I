import React, { Component } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Share, Image, ScrollView } from "react-native";
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
  Text

} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageView2 from "./ImageView2";
export default class VideoScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      title: '',
      yt_id: '',
      selectedIndex: 0
    }
  }
  reverseString(str) {
    return str.split("").reverse().join("");
  }

  async componentDidMount() {
    try {
      this.API_URL = await AsyncStorage.getItem('API_URL');
      if (this.API_URL !== null) {

      }
      else {
        await AsyncStorage.setItem('API_URL', this.api_url);
      }
    } catch (e) {
      // error reading value
    }
    this.id = this.props.route.params.id;
    this.yt_id = this.props.route.params.youtube_id;
    this.category_id = this.props.route.params.category_id
    this.video_uri = "C4OMI-" + this.reverseString(this.yt_id) + "#Video"
    this.thumbnail = this.props.route.params.thumbnail
    console.log("Hei " + this.thumbnail)
    this.related_url = this.API_URL + "c4omi/api-v3/related_video.php?video_id=" + this.id

    await fetch(this.related_url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.data = responseJson

      });
    this.myvideo2 = []
    this.myvideodetail = []
    for (let j = 0; j < this.data.length; j++) {
      this.myvideo2.push(
        <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={Math.random()} onPress={() => {
          this.yt_id = this.data[j].youtube_id;
          this.video_uri = "C4OMI-" + this.reverseString(this.yt_id) + "#Video"
          this.setState({ selectedIndex: 0, yt_id: this.yt_id })

        }} >
          {this.thumbnail == "app" && (
            <ImageView2
              index={this.data[j].youtube_id}
            />
          )}
          {this.thumbnail != "app" && (
            <Image style={styles.box1}
              source={require('../assets/C4OMI-Logo.png')}
            />
          )}
          <View style={{ width: 300, flexShrink: 1 }}>
            {this.data[j].title.length > 25 && (
              <Text category="p2" style={{ flexWrap: "wrap", paddingHorizontal: 8 }}>
                {this.data[j].title}
              </Text>
            )}
            {this.data[j].title.length <= 25 && (
              <Text category="p2" style={{ paddingHorizontal: 8 }}>
                {this.data[j].title.substring(0, 25)}
              </Text>
            )}
            <Text appearance='hint' style={{ paddingHorizontal: 8, fontSize: 12, }}>C4OMI Indonesia</Text>
            <Text style={{ fontSize: 12, paddingHorizontal: 8, fontStyle: "italic" }}>
              {this.data[j].category_name}
            </Text>
          </View>

        </TouchableOpacity>)
    }

    this.setState({ title: this.title, yt_id: this.yt_id, video2: this.myvideo2 })
  }
  async Share() {
    try {
      const result = await Share.share({
        message:
          'Tonton Video C4OMI Indonesia ini di Aplikasi Mobile yang linknya diakses melalui \nhttps://c4omi.org/video.php?video_uri=' + this.video_uri + "\n\nNotes : Untuk menonton Video, terlebih dahulu harus mempunyai Aplikasi Mobile C4OMI Indonesia yang bisa di download di https://play.google.com/store/apps/details?id=com.it4god.c4omi"
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
          subtitle='Video'
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

        <View style={{ flex: 1 }}>
          {this.state.yt_id != '' && this.state.selectedIndex == 0 && (
            <YoutubePlayer
              width={windowWidth}
              height={windowWidth * 9 / 16}
              play={true}
              videoId={this.state.yt_id}
            />
          )}
          {this.state.selectedIndex == 1 && (
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View style={{ width: 2, height: 20 }}></View>
              {this.state.video2}
              <View style={{ width: 2, height: 100 }}>

              </View>
            </ScrollView>
          )}
        </View>
        <Divider />
        <BottomNavigation
          accessibilityIgnoresInvertColors={true}
          selectedIndex={this.state.selectedIndex}
          onSelect={async (index) => {
            this.setState({ selectedIndex: index })
            if (index == 0) {

            }
            if (index == 1) {

            }

          }}>
          <BottomNavigationTab title={"Simak"} icon={(props) => <Icon  {...props} name={'video-outline'} />} />
          <BottomNavigationTab title={"Video Terkait"} icon={(props) => <Icon  {...props} name={'link-2-outline'} />} />

        </BottomNavigation>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {


  },
  icon: {
    width: 24,
    height: 24,
  },
  box1: {
    marginRight: 5, width: 200, height: 9 / 16 * 200, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
  },
  boxmore: {
    marginRight: 5, width: 100, height: 100, borderRadius: 5
  }
})