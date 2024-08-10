import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView } from "react-native";
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import {
  Icon,
  Layout,
  TopNavigation,
  Avatar,
  Divider,
  Spinner,
  TopNavigationAction,
  MenuItem,
  OverflowMenu,
  renderMenuAction
} from '@ui-kitten/components';
import SQLite from 'react-native-sqlite-2'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Tts from "react-native-tts";
import Voice from '@react-native-voice/voice';
const user = {
  _id: 1,
  name: 'User',
  avatar: 'https://limpingen.org/jeff.png',
};
import AsyncStorage from '@react-native-async-storage/async-storage';
class AIKonselorScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      userMessages: [],
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
      isTyping: false,
      menuVisible: false,
      sound: false,
    }
  }
  async componentDidMount() {
    let url = "http://limpingen.org/apikey.php"
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson[0].apikey)
        this.apikey = responseJson[0].apikey
      });
    Tts.setDefaultLanguage('id-ID');
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    let message = "Halo. Perkenalkan saya adalah AI Konselor dari C4OMI Indonesia. Seorang yang memiliki pengetahuan kesehatan Mental dan dunia Psikiatri. Saya siap membantu pertanyaan Anda dengan wawasan kesehatan mental. Silahkan bertanya di dalam bahasa Indonesia...  "
    const chatMessage = [
      {
        _id: Math.random().toString(36).substring(7),
        text: message,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AI Konselor',
          avatar: require('../assets/chat-bot.png'),
        },
      },
    ];
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, chatMessage),
    }))

    if (this.state.sound) {
      Tts.speak(chatMessage[0].text);
    }


  }

  errorCB = (err) => {
    console.error('error:', err)
    this.addLog('Error: ' + (err.message || err))
  }

  errorStatementCB = (_tx, err) => {
    this.errorCB(err)
    return false
  }
  successCB = () => {
    console.log('SQL executed ...')
  }

  openCB = () => {
    this.addLog('Database OPEN')
    this.setState(this.state)
  }

  closeCB = () => {
    this.addLog('Database CLOSED')
  }

  deleteCB = () => {
    this.addLog('Database DELETED')
  }
  onSpeechStart = (e) => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = (e) => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = (e) => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = (e) => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e) => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
    const chatMessage = [
      {
        _id: Math.random().toString(36).substring(7),
        text: e.value[0],
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'User',
          avatar: 'https://limpingen.org/jeff.png',
        },
      },
    ];
    this.onSend(chatMessage)
  };

  onSpeechPartialResults = (e) => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e) => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });


  };

  _StartRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
    try {
      Voice.start('id-ID');
    } catch (e) {
      console.error(e);
    }
  }

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',

    });
  };

  sendMessage = async (message) => {
    this.setState({ isTyping: true })
    try {
      const openaiEndpoint = 'https://api.openai.com/v1/chat/completions'
      const userMessage = { role: 'user', content: message };
      const systemMessage = { role: 'system', content: 'Kamu adalah AI Konselor. Segala respon dan pengetahuanmu harus didasarkan pada pengetahuan kesehatan mental dan dunia psikiatri. Gunakan bahasa yang ramah dan ilmiah' };
      const data = {
        max_tokens: 1500,
        temperature: 0.7,
        model: 'gpt-4o-mini',
        messages: [systemMessage, ...this.state.userMessages, userMessage],
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.apikey,
      };
      const response = await fetch(openaiEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });
      const json = await response.json();
      this.setState({ isTyping: false })
      console.log(json.choices[0].message.content)
      return json.choices[0].message.content;

    } catch (err) {
      console.log(err, 'api call error');
    }
  }

  onSend = async (newMessages = []) => {
    Tts.stop();

    const chatMessageUser = [
      {
        _id: Math.random().toString(36).substring(7),
        text: newMessages[0].text,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'User',
          avatar: 'https://limpingen.org/jeff.png',
        },
      },
    ];
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, chatMessageUser),
    }))
    const response = await this.sendMessage(newMessages[0].text);

    const chatMessage = [
      {
        _id: Math.random().toString(36).substring(7),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AI Konselor',
          avatar: require('../assets/chat-bot.png'),
        },
      },
    ];
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, chatMessage),
    }))
    let responsefilter = response.replaceAll(/Allah/g, "Al lah").replaceAll(/(\d+):(\d+)-(\d+)/g, "pasal $1 ayat ke $2 sampai ayat ke $3").replaceAll(/(\d+):(\d+)/g, "pasal $1 ayat $2")
    if (this.state.sound) {
      Tts.speak(responsefilter);
      console.log("Speak !")
    }

    let sql = "INSERT INTO question_answer (question, answer) VALUES (?, ?)"
    const db = SQLite.openDatabase('aikonselor.db', '1.0', '', 1)

    try {
      db.transaction(
        tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS question_answer(' +
            'id INTEGER PRIMARY KEY NOT NULL, ' +
            'question TEXT, ' +
            'answer TEXT);',
            [],
            this.successCB,
            this.errorStatementCB
          )
          tx.executeSql(sql, [newMessages[0].text, response]);
          (tx, error) => {
            console.log(error);
          };
        },
        error => {
          console.log(error);
        },
        () => {

        }
      );

    }
    catch (e) {
      console.log(e);
    }

  };

  render() {

    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          alignment='center'
          title='AI Konselor'
          subtitle='Mental Health AI ChatBot'
          accessoryLeft={(props) => (
            <React.Fragment>
              <TouchableOpacity style={{marginTop:10}} onPress={() => {
                this.props.navigation.pop()
              }}>
                <Icon
                  style={styles.icon}
                  fill='#8F9BB3'
                  name='arrow-back-outline'
                />
              </TouchableOpacity>
              <Avatar
                source={require('../assets/chat-bot.png')}
              />
            </React.Fragment>

          )}
          accessoryRight={() => (
            <>
              <TopNavigationAction icon={<Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={this.state.sound == false ? 'volume-off-outline' : 'volume-up-outline'}
              />} onPress={() => { this.setState({ sound: !this.state.sound }) }} />
              <TopNavigationAction icon={<Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'archive-outline'}
              />} onPress={() => { this.props.navigation.navigate("History") }} />
            </>
          )}
        />
        <Divider />
        <GiftedChat
          style={{}}
          messages={this.state.messages}
          onSend={messages => { this.onSend(messages) }}
          renderSend={(props) => (<View style={{ flexDirection: "row" }}>
            <Send
              {...props}
            >
              <View style={{ marginRight: 8, paddingTop: 20 }}>
                <Avatar
                  size="small"
                  source={require('../assets/send.png')}
                />
              </View>
            </Send>
            <TouchableOpacity onPress={async () => {
              Tts.stop();
              await this._StartRecognizing()
            }}>
              <View style={{ marginLeft: 8, marginRight: 8, paddingTop: 12 }}>
                <Avatar
                  size="small"
                  source={require('../assets/voice.png')}
                />
              </View>
            </TouchableOpacity>
          </View>)}
          user={user}
          bottomOffset={-10}
          renderLoading={() => {
            return (
              <Spinner size="tiny" />
            );
          }}
          renderFooter={() => {
            if (this.state.isTyping) {
              return (<View style={{ justifyContent: "center", alignItems: "center" }}>
                <Spinner size="tiny" /></View>
              );
            }
          }}
          wrapInSafeArea={false}
          alwaysShowSend={true}
          placeholder={'Silahkan tanya AI Konselor : '}
          showUserAvatar={true}
          renderUsernameOnMessage={true}
          showAvatarForEveryMessage={true}
          renderInputToolbar={(props) => (<InputToolbar placeholderTextColor="gray" {...props} containerStyle={styles.input} />)}
          messagesContainerStyle={styles.messageContainer}
          shouldUpdateMessage={() => {
            return true;
          }}
        />

      </Layout>
    )
  }

} const styles = StyleSheet.create({
  messageContainer: {
    paddingBottom: 16,
  },
  input: {
    borderWidth: 0,
    borderRadius: 4,
    marginBottom: 8,
    color: "gray"
  },
  container: {
    flex: 1,

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
}); export default AIKonselorScreen;