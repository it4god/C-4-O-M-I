import React, { Component } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Linking, ScrollView} from "react-native";
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
  Card,
  Button,
  Text, Modal
} from '@ui-kitten/components';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class EventScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      menuvisible: false
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
    url = this.API_URL + "c4omi/api-v2/event.php"

    await fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.data = responseJson

      });
    this.event = []
    for (let i = 0; i < this.data.length; i++) {
      this.event.push(
        <Layout key={ Math.random() } style={{
        
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Card
            style={{ flex: 1, margin: 4 }}
            header={(props) => (
              <View {...props}>
                <Text category='h6' >
                  {this.data[i].title}
                </Text>
                <Text category='s1'>
                  {this.data[i].date}
                </Text>
                <Text category='s1'>
                  {this.data[i].time}
                </Text>
              </View>
            )
            }
            footer={(props) => (
              <View
                {...props}
                style={[props.style, styles.footerContainer]}
              >
                <Button size="small" onPress={() => {
                  Linking.openURL(this.data[i].url)
                }}
                  style={styles.footerControl}
                >
                  {this.data[i].url_description}
                </Button>
              </View>

            )}
          >
            <Text>
              {this.data[i].description}
            </Text>
          </Card>
        </Layout>
      )

    }
    this.setState({ event: this.event })

  }


  render() {
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          alignment='center'
          title='C4OMI Indonesia'
          subtitle='Kegiatan'
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
        />
        <Divider />
        <Layout style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} >
            {this.state.event}
          </ScrollView>
        </Layout>
        <Divider />
        <BottomNavigation
          appearance='noIndicator'
          accessibilityIgnoresInvertColors={true}
          selectedIndex={this.state.selectedIndex}
          onSelect={async (index) => {
            this.setState({ selectedIndex: index })
            if (index == 0) {
              this.props.navigation.popToTop()
              this.props.navigation.navigate("Videos")
            }
            if (index == 1) {
              this.props.navigation.popToTop()
              this.props.navigation.navigate("Articles")
            }
            if (index == 2) {
              this.props.navigation.popToTop()
              this.props.navigation.navigate("PDFs")
            }
            if (index == 3) {
              this.props.navigation.popToTop()
              this.props.navigation.navigate("Event")
            }
            if (index == 4) {
              this.props.navigation.replace("Home", { menuvisible: true })
              this.setState({ menuvisible: true })
            }
            if (index == 5) {
              this.props.navigation.popToTop()
              this.props.navigation.navigate("ChatClient")
            }
            if (index == 6) {
              this.props.navigation.popToTop()
              this.props.navigation.navigate("AIKonselor")
            }
          }}>
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'video-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'book-open-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'book-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'calendar-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'link-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'message-circle-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'message-square-outline'} />} />

        </BottomNavigation>
        <Modal visible={this.state.menuvisible}>
          <Card disabled={true}>
            <Text style={{ textAlign: "center" }}>
              Link-link
            </Text>
            <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.popToTop(); this.props.navigation.navigate("Links", { category_id: 1, luar_negeri: false }) }}>
              Info, Edukasi dan Layanan Konseling - Rehabilitasi
            </Button>
            <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.popToTop(); this.props.navigation.navigate("Links", { category_id: 2, luar_negeri: false }) }}>
              Platform Komunitas
            </Button>
            <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.popToTop(); this.props.navigation.navigate("Links", { category_id: 3, luar_negeri: false }) }}>
              Platform Konseling Basis Apps
            </Button>
            <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.popToTop(); this.props.navigation.navigate("Links", { category_id: 1, luar_negeri: true }) }}>
              Situs Luar Negeri
            </Button>
            <View style={{ paddingHorizontal: 50 }}>
              <Button size="small" appearance='outline' style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.popToTop(); }}>
                Tutup
              </Button>
            </View>
          </Card>
        </Modal>
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
  },
  footerContainer: {
    flexDirection: 'row-reverse',
  },
  footerControl: {
    marginHorizontal: 2,

  },
})