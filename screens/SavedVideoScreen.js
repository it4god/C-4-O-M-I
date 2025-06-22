import React, { Component } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback } from "react-native";
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
  Input,
  Modal, Card, Button

} from '@ui-kitten/components';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImageView from "./ImageView";
import ImageView2 from "./ImageView2";
import SQLite from 'react-native-sqlite-2'
export default class SavedVideosScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      video: [],
      video2: [],
      page: 2,
      search: false,
      searchvalue: '',
      menuvisible: false
    }
    this.myvideo = []
    this.myvideodetail = []
    this.myvideo2 = []
  }

  async componentDidMount() {
    try {
      this.API_URL = await AsyncStorage.getItem('API_URL');
      if (this.API_URL !== null) {
        this.DoGenerateVideo("")
      }
      else {
        await AsyncStorage.setItem('API_URL', this.api_url);
      }
    } catch (e) {
      // error reading value
    }

  }

  async DoGenerateVideo(searchvalue) {


    this.myvideo = []
    this.myvideodetail = []
    this.myvideo2 = []
    let url = "";
    /*

*/

    const videos = await AsyncStorage.getItem('videos')
    if (videos && searchvalue == "") {
      try {
        this.data = JSON.parse(videos)
        console.log("Here")
      } catch (e) {
        console.warn("fetch Error: ", error)
      }

    }
    else {
      if (searchvalue == "")
        url = this.API_URL + "c4omi/c4omi-api/videos.php"
      else
        url = this.API_URL + "c4omi/c4omi-api/videos.php?keyword=" + searchvalue

      await fetch(url, {
        method: 'GET',
      })
        .then(response => response.json())
        .then((responseJson) => {
          this.data = responseJson

        });
    }
    let n = 0
    let category = []
    let category_name = []

    const db = SQLite.openDatabase('tag.db', '1.0', '', 1)
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS video_tag(' +
        'id INTEGER PRIMARY KEY NOT NULL, ' +
        'video_id TEXT, ' + 'youtube_id TEXT, ' + 'title TEXT, ' +  'thumbnail TEXT, ' +  'category_id TEXT, '+
        'tag_value TEXT);',
        [],
        this.successCB,
        this.errorStatementCB
      )
      tx.executeSql('SELECT * from video_tag ORDER BY id ASC', [], async (tx, results) => {

        const rows = results.rows;
        if (rows.length > 0) {
          console.log(rows)
          for (let i = 0; i < rows.length; i++) {
            this.myvideo2.push(
              <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={rows.item(i).video_id} onPress={() => {
                this.props.navigation.replace("Video", {
                  title:rows.item(i).title,
                  id: rows.item(i).video_id,
                  youtube_id: rows.item(i).youtube_id,
                  category_id : rows.item(i).category_id,
                  thumbnail: rows.item(i).thumbnail
                })
              }} >

                {rows.item(i).thumbnail== "app" && (
                  <ImageView2
                    index={rows.item(i).youtube_id}
                  />
                )}
                {rows.item(i).thumbnail!= "app" && (
                  <Image style={styles.box1}
                    source={{ uri: "https://nepho.id/c4omi/video_img/" + rows.item(i).youtube_id + "-MQ.jpg" }}
                  />
                )}
                <View style={{ width: 300, flexShrink: 1 }}>
                    <Text category="p2" style={{ flexWrap: "wrap", paddingHorizontal: 8 }}>
                      {rows.item(i).title}
                    </Text>
                  <Text appearance='hint' style={{ paddingHorizontal: 8, fontSize: 12, }}>C4OMI Indonesia</Text>
                  <Text style={{ paddingHorizontal: 8, fontSize: 12, fontStyle: "italic" }}>
                    {"Saved Videos"}
                  </Text>
                </View>

              </TouchableOpacity>)
          }
          this.setState({ video2: this.myvideo2, page: 2 })
          console.log(this.state.video2)
          console.log("Hahahahahaha")
        }
      
        
    
      }
    
    )
    })
     

    


  }
  shuffle(array) {
    let oldElement;
    for (let i = array.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      oldElement = array[i];
      array[i] = array[rand];
      array[rand] = oldElement;
    }
    return array;
  }
  DoSearch() {
    this.DoGenerateVideo(this.state.searchvalue)
  }
  SavedVideo() {
    this.props.navigation.navigate("SavedVideo")
  }
  render() {
    const toggleSearch = () => {
      this.DoSearch()
    };

    return (
      <Layout style={{ flex: 1 }}>
        {this.state.page == 1 && (
          <TopNavigation
            alignment='center'
            title='C4OMI Indonesia'
            subtitle='Saved video'
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
                  this.SavedVideo()
                }}>
                  <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name='archive-outline'
                  />
                </TouchableOpacity>
                <View style={{ width: 5 }}></View>
                <TouchableOpacity onPress={() => {
                  this.setState({ search: true })
                }}>
                  <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name='search-outline'
                  />
                </TouchableOpacity>
              </React.Fragment>
            )}
          />)}
        {this.state.page == 2 && (
          <TopNavigation
            alignment='center'
            title='C4OMI Indonesia'
            subtitle='Saved video'
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

          />)}

        <Divider />
        {this.state.search == true && (
          <Layout style={{ padding: 10 }}>
            <Input
              value={this.state.searchvalue}
              placeholder={'Kata Kunci'}
              onSubmitEditing={toggleSearch}
              accessoryRight={(props) => (<TouchableWithoutFeedback onPress={toggleSearch}>
                <Icon {...props} name={'search-outline'} />
              </TouchableWithoutFeedback>)}
              onChangeText={nextValue => {
                if (nextValue != "") this.setState({ searchvalue: nextValue })
                else this.setState({ searchvalue: "", search: false })
              }}
            />
          </Layout>
        )}
        {this.state.page == 1 && (
          <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 5, flex: 1 }}>
            {this.state.video}
          </ScrollView>
        )}
        {this.state.page == 2 && (

          <ScrollView style={{ flex: 1 }}>
            <View style={{ width: 2, height: 20 }}></View>
            {this.state.video2}
            <View style={{ width: 2, height: 100 }}>

            </View>
          </ScrollView>

        )}
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
              this.props.navigation.navigate("CopingSkill")
            }
            if (index == 6) {
              this.props.navigation.navigate("Charity")
            }
          }}>
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'video-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'book-open-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'book-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'calendar-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'link-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'bulb-outline'} />} />
          <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'gift-outline'} />} />

        </BottomNavigation>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: "column",
    paddingTop: 30
  },
  box1: {
    marginRight: 5, width: 250, height: 9 / 16 * 250, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
  },
  box2: {
    marginRight: 5, width: 200, height: 9 / 16 * 200, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
  },
  boxmore: {
    marginTop: 20,
    marginRight: 5, width: 50, height: 50, borderRadius: 5, opacity: 0.7
  },
  icon: {
    width: 24,
    height: 24,
  },
})