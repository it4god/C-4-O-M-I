import React, { Component } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Linking } from "react-native";
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
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class PDFScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {

    }
    this.url = ''
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
    this.url = this.API_URL + "c4omi/pdf/" + this.props.route.params.url;
    console.log(this.url)
    this.setState({ url: this.url })
  }


  render() {
    const source = { uri: this.url };
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          alignment='center'
          title='C4OMI Indonesia'
          subtitle='PDF'
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
                Linking.openURL(this.url);
              }}>
                <Icon
                  style={styles.icon}
                  fill='#8F9BB3'
                  name='download-outline'
                />
              </TouchableOpacity>
            </React.Fragment>
          )}
        />
        <Divider />

        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          {this.url != "" && (
            <Pdf
              trustAllCerts={false}
              source={source}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf} />)}
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
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})