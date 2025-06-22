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
export default class ItemScreen extends React.Component {


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
    this.id = this.props.route.params.item_id;
    let url = this.API_URL + "c4omi/c4omi-api/items.php?item_id=" + this.id
    await fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.data = responseJson

        this.description = this.data[0].description
        this.thumbnail = this.data[0].thumbnail
        this.fullname = this.data[0].fullname
        this.price = this.data[0].price
        this.item_name = this.data[0].item_name
        this.about = this.data[0].about
        this.phone_number = this.data[0].phone_number
        this.photo = this.data[0].photo
        this.url = this.data[0].item_url
        this.category_name = this.capitalizeFirstLetter(this.data[0].category)
      });



    this.setState({ url: "refresh" })
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  render() {
    const source = { uri: this.url };
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          alignment='center'
          title={this.category_name}
          subtitle={this.item_name}
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
                if (this.url != undefined)
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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {this.thumbnail != "" && (
                  <Image resizeMode="stretch" style={styles.box1}
                    source={{ uri: this.API_URL + "admin/public/assets/uploads/files/itemphoto/" + this.thumbnail }}
                  />
                )}
                {this.thumbnail == "" && (
                  <Image resizeMode="stretch" style={styles.box1}
                    source={require('../assets/C4OMI-Logo.png')}
                  />
                )}
                <Text style={{ flex: 5, paddingLeft: 10, }} category="h6" >{this.item_name}</Text>
                <Text style={{ flex: 5, paddingLeft: 10, }} category="p2">{this.fullname}</Text>
                <Text style={{ flex: 5, paddingLeft: 10, fontWeight: "bold" }} category="p2">{this.price}</Text>

              </View>)}
            <Text category="p1" style={{ flex: 1, textAlign: "justify", paddingHorizontal: 10, marginVertical: 15 }}>
              {this.description}
            </Text>
            <Divider />
            <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
              {this.photo != undefined && (
                <Avatar size="giant" source={{ uri: this.API_URL + "admin/public/assets/uploads/files/memberphoto/" + this.photo }} />
              )}
              <Text category="h6" >Tentang {this.fullname}</Text>
            </View>
            <Text category="p1" style={{ flex: 1, textAlign: "justify", paddingHorizontal: 10 }}>
              {this.about}
            </Text>
            <View style={{ paddingVertical: 7 }}>
              <Button size="large" onPress={() => {
                Linking.openURL('https://wa.me/62' + this.phone_number.substring(1))
              }}
                style={{ marginHorizontal: 20 }}
              >
                {"Hubungi " + this.fullname}
              </Button>

            </View>
            {this.url !=undefined &&(
            <View style={{ paddingVertical: 7 }}>
              <Button size="large" onPress={() => {
                  Linking.openURL(this.url);
              }}
                style={{ marginHorizontal: 20 }}
              >
                {"Website"}
              </Button>
            </View>)}
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
     width: windowWidth, height: windowWidth, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
  },
  boxmore: {
    marginTop: 20,
    marginRight: 5, width: 50, height: 50, borderRadius: 5, opacity: 0.7
  },
})