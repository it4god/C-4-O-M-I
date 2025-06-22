import React, { Component } from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import io from "socket.io-client";
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
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
  Input
} from '@ui-kitten/components';

//import Sound from 'react-native-sound';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class ChatClientScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      messages: [],
      fullname: "",
    };
  }
  onSend(messages = []) {

    this.socket.emit('chat', messages);
    this.setState({ chatMessage: '' });



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
    this.id = Math.random()
    this.socket = io("http://13.55.218.192:3000")
    //this.socket = io(this.API_URL.slice(0, this.API_URL.length-1) + ":3000");
    this.socket.on("chat", msg => {
      console.log(msg)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, msg),
      }))

    });
  }

  render() {

      const user = {
        _id: this.id,
        name: this.state.fullname,
      }
      return (
  
        <Layout style={{ flex: 1 }}>
          <TopNavigation
            alignment='center'
            title='C4OMI Indonesia'
            subtitle='Berbagi Bersama'
            accessoryLeft={(props) => (
              <React.Fragment>
                <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
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
            <Input style={{padding :10}}
              placeholder='Nama Lengkap'
              value={this.state.fullname}
              onChangeText={fullname => this.setState({ fullname: fullname })}
            />
              <GiftedChat
                style={{ height: height - 100}}
                renderSend={this.renderSend}
                renderInputToolbar={this.renderInputToolbar}
                alwaysShowSend={true}
                showUserAvatar={true}
                showAvatarForEveryMessage={true}
                renderUsernameOnMessage={true}
                messages={this.state.messages}
                listViewProps={{ styles: { backgroundColor: "white" } }}
                onSend={messages => this.onSend(messages)}
                user={user}/>
        </Layout>

    );
  }
  renderInputToolbar(props) {
    //Add the extra styles via containerStyle
    return <InputToolbar {...props} />
  }
  renderSend(props) {
    return (
      <Send
        {...props}
      >
        <View style={{ marginRight: 10, marginBottom: 5 }}>
                          <Avatar
                  size="small"
                  source={require('../assets/send.png')}
                />
        </View>
      </Send>
    );
  }
  submitChatMessage(messages) {


  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {

  }
})