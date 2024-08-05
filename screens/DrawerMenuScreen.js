import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import * as eva from '@eva-design/eva';
import { MenuItem, Layout, TopNavigation, Divider, Text, Card, Button, Menu as UKMenu, TopNavigationAction, Icon, OverflowMenu } from '@ui-kitten/components';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
class DrawerMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };



  }

  componentDidMount = () => {



  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1 }}>


        <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' }} level='1'>
          <View style={{ flex: 9, paddingTop: 15 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",

              }}
            >
              <Image
                style={{
                  borderRadius: 5,
                  width: 120,
                  height: 120,
                  alignItems: "center",
                }}
                source={require("../assets/c4omi.jpg")}
              />
            </View>
            <View style={styles.containertopRow}>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                C4OMI Indonesia
              </Text>
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
                  name='home-outline'
                  fill='#8F9BB3'
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.pop()
                  }
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      Beranda
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 10 }}></View>
            {this.can_download && (
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
                    name='download'
                    fill='#8F9BB3'
                  />
                </View>
                <View style={styles.containerBottom}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Download")}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                      <Text style={styles.txtBottom}>
                        Tentang C4OMI
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
                  name='info-outline'
                  fill='#8F9BB3'
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate("About") }}
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      Tentang C4OMI Indonesia
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 10 }}></View>
            {this.how_to && (
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
                </View>
                <View style={styles.containerBottom}>
                  <TouchableOpacity
                    onPress={() => { }}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                      <Text style={styles.txtBottom}>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}

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
                  name='smartphone-outline'
                  fill='#8F9BB3'
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Contact")}
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      Kontak C4OMI
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
                  name='person-outline'
                  fill='#8F9BB3'
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate("MobileDeveloper") }}
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      Mobile Developer
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
                  name='paper-plane-outline'
                  fill='#8F9BB3'
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate("Feedback") }}
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      Feedback
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 10 }}></View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginRight: 15,
              marginLeft: 15,
              alignItems: "center",
              justifyContent: "center",

              borderRadius: 5,

              flex: 1,
              marginBottom: 5,
              marginTop: 5,
              paddingHorizontal:20
            }}
          >
            <Image style={{ marginTop: 0, width: width - 50, height: (width - 50) / 5 }}
              source={require('../assets/logo.png')}
            />
            <View
              style={{
                flexDirection: "row-reverse",
                flex: 4,
              }}
            >

              <TouchableOpacity
                onPress={() => { }}
              >

              </TouchableOpacity>
            </View>
            <View style={{ flex: 6, paddingLeft: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                }}
                onPress={() => { }}
              >
                {this.state.app_language}
              </Text>
            </View>
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


export default DrawerMenuScreen;
