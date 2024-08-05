import React, { Component } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Share, Image, ScrollView } from "react-native";

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
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class ArticleScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      title: '',
      yt_id: '',
      selectedIndex: 0
    }
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
    this.category_id = this.props.route.params.category_id
    this.title = this.props.route.params.title;
    if (this.title.length > 35) {
      this.title = this.title.substring(0, 35) + "..."
    }
    this.url = this.API_URL+ "c4omi/articles/" + this.props.route.params.url;
    this.uri = "http://c4omi.org/article.php?article_title=" + this.props.route.params.title.replaceAll(" ", "%20")

    this.related_url = this.API_URL+ "c4omi/api-v2/related_article.php?article_id=" + this.id
    await fetch(this.related_url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.data = responseJson
        console.log(this.data)
      });
    this.myarticle2 = []
    this.myarticledetail = []



    this.myarticle2 = []
    for (let j = 0; j < this.data.length; j++) {
      this.myarticle2.push(
        <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={Math.random()} onPress={() => {
          this.generateNewArticleList(this.data[j].category_id, this.data[j].title, this.data[j].url)
          this.setState({ selectedIndex: 0 })

        }} >
          <Image style={styles.box1}
            source={require('../assets/C4OMI-Logo.png')}
          />

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

    this.setState({ article2: this.myarticle2, page: 2, title: this.title, url: this.url })



  }

  async generateNewArticleList(category_id, title, url) {
    this.category_id = category_id
    this.title = title
    if (this.title.length > 35) {
      this.title = this.title.substring(0, 35) + "..."
    }
    this.url = this.API_URL+ "c4omi/articles/" + url;
    this.uri = "http://c4omi.org/article.php?article_title=" + title.replaceAll(" ", "%20")
    this.related_url = this.API_URL+ "c4omi/api-v2/related_article.php?article_id=" + this.id
   this.setState({ article2: this.myarticle2, page: 2, title: this.title, url: this.url })




  }
  async Share() {

    this.message = 'Bagikan Artikel terjemahan C4OMI dengan judul *' + this.props.route.params.title + '* di \n' + this.uri + "\n\nNotes : Untuk membaca Artikel, terlebih dahulu harus mempunyai Aplikasi Mobile C4OMI Indonesia yang bisa di download di https://play.google.com/store/apps/details?id=com.it4god.c4omi"

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
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          alignment='center'
          title='Artikel'
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
        <Layout style={{ flex: 1 }}>
          {this.state.selectedIndex == 0 && (
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
            />)}
          {this.state.selectedIndex == 1 && (
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View style={{ width: 2, height: 20 }}></View>
              {this.state.article2}
              <View style={{ width: 2, height: 100 }}>

              </View>
            </ScrollView>
          )}
        </Layout>
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
          <BottomNavigationTab title={"Baca"} icon={(props) => <Icon  {...props} name={'book-open-outline'} />} />
          <BottomNavigationTab title={"Artikel Terkait"} icon={(props) => <Icon  {...props} name={'link-2-outline'} />} />

        </BottomNavigation>
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
    marginRight: 5, width: 200, height: 9 / 16 * 200, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
  },
  boxmore: {
    marginRight: 5, width: 100, height: 100, borderRadius: 5
  },

})