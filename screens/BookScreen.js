import React, { Component } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Linking, Image, ScrollView } from "react-native";
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
  Text,
  Button
} from '@ui-kitten/components';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class BookScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      url: ''
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
    this.id = this.props.route.params.id;
    let url = this.API_URL + "c4omi/api-v3/ebooks.php?id=" + this.id
    await fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.data = responseJson
        this.description = this.data[0].description
        console.log(this.description)
      });


    this.url = this.props.route.params.url
    this.thumbnail = this.props.route.params.thumbnail
    this.author = this.props.route.params.author
    this.category_name = this.props.route.params.category_name
    this.title = this.props.route.params.title.substring(0, 40)
    console.log(this.thumbnail)
    this.setState({ url: "refresh" })
  }


  render() {
    const source = { uri: this.url };
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          alignment='center'
          title={this.category_name}
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
                Linking.openURL(this.url);
              }}>
                <Icon
                  style={styles.icon}
                  fill='#8F9BB3'
                  name='link-2-outline'
                />
              </TouchableOpacity>
            </React.Fragment>
          )}
        />
        <Divider />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            {this.state.url != "" && (
              <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
                {this.thumbnail != "" && (
                  <Image style={styles.box1}
                    source={{ uri: this.API_URL + "c4omi-admin/public/assets/uploads/files/thumbnail/" + this.thumbnail }}
                  />
                )}
                {this.thumbnail == "" && (
                  <Image style={styles.box1}
                    source={require('../assets/C4OMI-Logo.png')}
                  />
                )}
              </View>)}

            <Text category="p1" style={{ flex: 1, textAlign: "justify", paddingHorizontal: 10 }}>
              {this.description}
            </Text>
            <View style={{paddingVertical:7}}>
              <Button size="large" onPress={() => {
                Linking.openURL(this.url)
              }}
                style={{ marginHorizontal: 20 }}
              >
                {"Buka Link"}
              </Button>

            </View>

          </View>
          <View style={{ height: 25 }}></View>
        </ScrollView>
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
  box1: {
    marginRight: 5, width: 200, height: 11 / 7 * 200, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
  },
  boxmore: {
    marginTop: 20,
    marginRight: 5, width: 50, height: 50, borderRadius: 5, opacity: 0.7
  },
})