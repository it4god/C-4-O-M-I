import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions, Share
} from "react-native";
import * as eva from '@eva-design/eva';
import { MenuItem, Layout, TopNavigation, Divider, Text, Card, Button, Menu as UKMenu, TopNavigationAction, Icon, OverflowMenu, } from '@ui-kitten/components';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
class MoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };



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


  };
  async Share() {

    this.message = 'Aplikasi Mobile C4OMI\n\nSilahkan Download di https://play.google.com/store/apps/details?id=com.it4god.c4omi'

    try {
      const result = await Share.share({
        message: this.message

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
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1 }}>


        <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' }} level='1'>
          <TopNavigation
            alignment='center'
            title='C4OMI Indonesia'
            subtitle='More...'
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
          <View style={{
            flex: 1,
            marginTop:height/4,
            alignItems: "center", 
          }}>
            <View
              style={{
                
              }}
            >

            </View>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: '#e4e9f2',
                borderRadius: 5,
                marginRight: 15,
                marginLeft: 15,
                backgroundColor: '#f7f9fc',
              }}
            >
              <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                <Icon
                  style={styles.icon}
                  name='person-outline'
                  fill='#8F9BB3'
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() => { }
                  }
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      Login
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 10 }}></View>
            {this.can_download && <View style={{ height: 10 }}></View>}
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: '#e4e9f2',
                borderRadius: 5,
                marginRight: 15,
                marginLeft: 15,
                backgroundColor: '#f7f9fc',
              }}
            >
              <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                <Icon
                  style={styles.icon}
                  name='person-add-outline'
                  fill='#8F9BB3'
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() => {  this.props.navigation.navigate("Register") }}
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      Registrasi
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 10 }}></View>

            {this.how_to && <View style={{ height: 10 }}></View>}
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: '#e4e9f2',
                borderRadius: 5,
                marginRight: 15,
                marginLeft: 15,
                backgroundColor: '#f7f9fc',
              }}
            >
              <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                <Icon
                  style={styles.icon}
                  name='settings-outline'
                  fill='#8F9BB3'
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      Setelan
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 10 }}></View>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: '#e4e9f2',
                borderRadius: 5,
                marginRight: 15,
                marginLeft: 15,
                backgroundColor: '#f7f9fc',
              }}
            >
              <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                <Icon
                  style={styles.icon}
                  name='person-delete-outline'
                  fill='#8F9BB3'
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      Log Out
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 10 }}></View>

          </View>
        </Layout>
      </SafeAreaView>

    );
  }

}
const styles = StyleSheet.create({
  header: {

  },
  container: {
    flex: 1,
    backgroundColor: "#3B64DB",
    flexDirection: "column",
  },
  containertopRow: {
    marginTop: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  txtBottom: {
    fontSize: 15,
    fontWeight: "100",
  },
  imageTopRow: {
    height: 80,
    width: 80,
    ...Platform.select({
      ios: {
        borderRadius: 80 / 2,
      },
      android: {
        borderRadius: 80,
      },
    }),
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  containertopRowText: {
    flexDirection: "column",
    marginLeft: 5,
  },

  containerBottom: {
    flex: 8,
    paddingRight: 20,
  },
  containerBottomItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",

  }, icon: {
    width: 24,
    height: 24,
  },
});


export default MoreScreen;
