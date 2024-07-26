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
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;;
import Tts from "react-native-tts";
import Voice from '@react-native-voice/voice';
const user = {
    _id: 1,
    name: 'User',
    avatar: 'https://limpingen.org/jeff.png',
};
import SQLite from 'react-native-sqlite-2'
class HistoryScreen extends React.Component {

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
        Tts.setDefaultLanguage('id-ID');
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechRecognized = this.onSpeechRecognized;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
        const db = SQLite.openDatabase('aikonselor.db', '1.0', '', 1)
        db.transaction(tx => {
            tx.executeSql('SELECT * from question_answer ORDER BY id ASC', [], (tx, results) => {
                const rows = results.rows;
                if (rows.length > 0) {
                    console.log(rows)
                    console.log(rows.item(0).question)
                    console.log(rows.item(0).answer)
                    for (let i = 0; i < rows.length; i++) {
                        const chatMessageUser = [
                            {
                                _id: Math.random().toString(36).substring(7),
                                text: rows.item(i).question,
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
                        const response = rows.item(i).answer
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

                    }
                }
            }
            )
        })

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

    onSend = async (newMessages = []) => {

    };

    render() {

        return (
            <Layout style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    title='AI Konselor'
                    subtitle='History of Conversations'
                    accessoryLeft={(props) => (
                        <TopNavigationAction icon={<Icon
                            style={styles.icon}
                            fill='#8F9BB3'
                            name={'arrow-back-outline'}
                        />} onPress={() => { this.props.navigation.pop() }} />

                    )}
                    accessoryRight={() => (
                        <>
                            <TopNavigationAction icon={<Icon
                                style={styles.icon}
                                fill='#8F9BB3'
                                name={'trash-2-outline'}
                            />} onPress={() => {
                                Alert.alert(
                                    'Hapus History',
                                    'Apakah Anda mau menghapus History percakapan ?', // <- this part is optional, you can pass an empty string
                                    [
                                        { text: 'Batal', onPress: () => console.log('OK Pressed') },
                                        {
                                            text: 'OK', onPress: () => {
                                                const db = SQLite.openDatabase('aikonselor.db', '1.0', '', 1)
                                                db.transaction(tx => {
                                                    tx.executeSql('DELETE from question_answer', [], (tx, results) => {

                                                        this.setState({ messages: [] })
                                                    }
                                                    )
                                                })
                                            }
                                        },
                                    ],
                                    { cancelable: false },
                                );

                            }} />
                        </>
                    )}
                />
                <Divider />
                    <GiftedChat
                        style={{}}
                        messages={this.state.messages}
                        user={user}
                        bottomOffset={-10}
                        wrapInSafeArea={true}
                        placeholder={''}
                        isKeyboardInternallyHandled={true}
                        keyboardShouldPersistTaps={"never"}
                        messagesContainerStyle={styles.messageContainer}
                        renderInputToolbar={(props) => (<InputToolbar placeholderTextColor="#000" {...props} containerStyle={styles.input} />)}
                        shouldUpdateMessage={() => {
                            return true;
                        }}
                    />


            </Layout>
        )
    }

} const styles = StyleSheet.create({
    messageContainer: {
        
    },
    input: {
        height:0
    },
    container: {
        flex: 1,

    },
    icon: {
        width: 32,
        height: 32,
    },
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
}); export default HistoryScreen;