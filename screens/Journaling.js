import React, { Component } from "react";
import {
    Platform,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity, Alert, PermissionsAndroid, Dimensions
} from "react-native";
import { Layout, TopNavigation, Divider, Button, Modal, Menu as UKMenu, TopNavigationAction, Icon, Text, OverflowMenu, Tab, Input, TabView, } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import styles from '../common/style1'
//import SoundRecorder from 'react-native-sound-recorder';

import { RNCamera } from 'react-native-camera';
import SoundRecorder from 'react-native-sound-recorder';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import VideoRecorder from 'react-native-beautiful-video-recorder';
const WindowWidth = Dimensions.get('window').width;
var moment = require('moment')
import SQLite from 'react-native-sqlite-storage';
class Journaling extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerShown: false,

        };

    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            recordTime: '',
            recordvideo: false,
            delete_catatan: false,
            save_voice: false,
            save_video: false,
            voice_name: '',
            video_name: '',
            delete_rekaman: false,
            delete_video: false,
        };
        this.play = false;
        this.record = false;
        this.update = false;
        this.record_video_already = false;
    }
    async AskPermission() {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the storage');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
    }

    async componentDidMount() {

        this._isMounted = true;
        this.entry_id = this.props.route.params.entry_id
        console.log("Entry ID  " + this.entry_id);
        this.entry_text = this.props.route.params?.entry_text
        console.log("Entry Text  " + this.entry_text);
        this.content_id = this.props.route.params.content_id
        this.session_id = this.props.route.params.session_id
        this.segment_seq = this.props.route.params.segment_seq
        this.subsegment_seq = this.props.route.params.subsegment_seq
        this.journal_type = this.props.route.params.journal_type
        this.content_type = this.props.route.params.content_type
        console.log("COntent type  " + this.content_type);
        this.voice_path = this.props.route.params?.voice_path
        this.video_path = this.props.route.params.video_path
        this.origin = this.props.route.params.origin
        this.title = this.props.route.params.pertanyaan
        this.header = this.props.route.params.title
        this.parent_id = this.props.route.params.parent_id
        this.type_subsegment = this.props.route.params.type_subsegment
        if (this.type_subsegment == "Q") this.journal_type = 3
        if (this.type_subsegment == "R") this.journal_type = 4
        if (this.type_subsegment == "C") this.journal_type = 5
        this.seq = this.props.route.params.seq
        this.update = false;
        console.log(this.title)
        this.simpan_edit = "Simpan";
        if (this.type_subsegment == "100") {
            if (this.content_type == 2) {
                this.setState({ voice_name: this.header + "         " })
            }
            else if (this.content_type == 3) {
                this.setState({ video_name: this.header + "         " })
            }
        }
        if (this.journal_type == 6) this.title = moment(moment()).format("DD MMM YYYY").toString() + " " + new Date().toLocaleTimeString()
        if (this.journal_type == 6) {
            this.setState({ voice_name: this.header + " - " + new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() })
            this.setState({ video_name: this.header + " - " + new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() })
        }
        else if (this.content_type == 2) {
            this.setState({ voice_name: this.header + " - " + this.type_subsegment + this.seq })
            if (this.voice_path != undefined) {
                this.setState({ voice_name: this.title })
                this.simpan_edit = "Edit";
            }
            else if (this.journal_type == 6)
                this.setState({ voice_name: this.header + " - " + new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() })
        }
        else if (this.content_type == 3) {
            this.setState({ video_name: this.header + " - " + this.type_subsegment + this.seq })
            if (this.video_path != "") {
                this.simpan_edit = "Edit";
                this.setState({ video_name: this.title })
            }
            if (this.journal_type == 6)
                this.setState({ video_name: this.header + " - " + new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() })
        }
        console.log("voice path " + this.voice_path)
        this.idrecordvoice = Math.random().toString().substring(2)

        if (Platform.OS == "ios")
            this.mypath = this.idrecordvoice + ".m4a"
        else
            this.mypath = this.idrecordvoice + ".mp3"
        if (this.voice_path == undefined)
            this.voice_path = RNFS.DocumentDirectoryPath + "/" + this.mypath
        if (this.voice_path != undefined) {
            this.sound = new Sound(this.voice_path, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    this.setState({ playState: 'paused' });
                } else {
                    this.durationString = this.getAudioTimeString(this.sound.getDuration())
                }
            });



        }

        if (this.video_path != undefined)
            this.record_video_already = true;
        else
            this.video_path = RNFS.DocumentDirectoryPath + "/" + Math.random().toString().substring(2) + ".mp4"
         

        console.log("content_id", this.content_id)


        if (Platform.OS == "android")
            console.log(this.update)

        if (this.session_id != "")
            this.title = this.title;

        if (this.entry_text != "") {
            this.setState({ text: this.entry_text, content_type: this.content_type })
        }
        else {
            this.setState({ isLoading: true, content_type: this.content_type })
        }


        console.log("audio path " + this.voice_path)
        if (this.content_type == 2 || this.content_type == 3) {
            await this.AskPermission();
            console.log("Permission granted !")
        }
    };
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const { navigate } = this.props.navigation;
        if (this.state.content_type == 3) {
            return (
                <Layout style={{ flex: 1 }}>
                    <TopNavigation style={{}} title={this.header} alignment='start'
                        accessoryLeft={(props) => (
                            <TopNavigationAction
                                {...props}
                                icon={(props) => <Icon {...props} name={'arrow-ios-back-outline'} />}
                                onPress={() => {
                                    this.props.navigation.pop();
                                }} />
                        )}
                        accessoryRight={(props) => (
                            <React.Fragment>
                                <TopNavigationAction icon={(props) => (
                                    <Icon {...props} name='more-horizontal-outline' />
                                )} onPress={() => {

                                }} />
                            </React.Fragment>
                        )}
                    />
                    <Layout style={{ flex: 1 }} level='1'>
                        <Modal
                            visible={this.state.save_video}
                            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            onBackdropPress={() => { this.setState({ save_video: true }); this.setState({ save_video: false, }) }}>

                            <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', margin: 15, padding: 15 }} level='1'>

                                <View style={{}}>
                                    <Text
                                        style={{
                                            textAlign: "left", fontWeight: 'bold', paddingLeft: 5, fontSize: 15
                                        }}
                                    >{this.simpan_edit.toUpperCase()}{"\n"}</Text>
                                </View>
                                <View>
                                    {this.simpan_edit == "Simpan" && (
                                        <Input
                                            placeholder=''
                                            value={this.state.video_name}
                                            onChangeText={(nextValue) => this.setState({ video_name: nextValue })}
                                        />
                                    )}
                                    {this.simpan_edit == "Edit" && (
                                        <Input
                                            placeholder=''
                                            disabled={true}
                                            value={this.state.video_name}
                                            onChangeText={(nextValue) => this.setState({ video_name: nextValue })}
                                        />
                                    )}
                                </View>

                                <View style={{ flexDirection: "row", paddingTop: 15 }}>
                                    <Button style={{ flex: 3 }} onPress={() => { this.setState({ save_video: false }); }}>
                                        <Text style={{}}>Batal</Text>
                                    </Button>
                                    <Text style={{ flex: 4 }}>{" "}</Text>
                                    <Button style={{ flex: 3 }} onPress={() => { this.setState({ save_video: false }); this.SaveVideo(); }}>
                                        OK
                                    </Button><Text>{" "}</Text></View>
                            </Layout>
                        </Modal>
                        <Modal
                            visible={this.state.delete_video}
                            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            onBackdropPress={() => { this.setState({ delete_video: true }); this.setState({ delete_video: false, }) }}>

                            <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', margin: 15, padding: 15 }} level='1'>

                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text
                                        style={{
                                            textAlign: "center", fontWeight: 'bold', paddingLeft: 5, fontSize: 20
                                        }}
                                    >Hapus Video</Text>
                                </View>
                                <View>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text>Apakah Anda ingin menghapus Video ini ?</Text>
                                    </View>

                                </View>

                                <View style={{ flexDirection: "row", paddingTop: 15, justifyContent: "center", alignItems: "center" }}>
                                    <Button onPress={() => { this.setState({ delete_video: false }); }}>
                                        <Text style={{}}>Batal</Text>
                                    </Button>
                                    <Text>{" "}</Text>
                                    <Button onPress={() => { this.setState({ delete_video: false }); this.DeleteRekaman(this.entry_id) }}>
                                        OK
                                    </Button><Text>{" "}</Text></View>
                            </Layout>
                        </Modal>
                        <View>
                            <VideoRecorder ref={(ref) => { this.videoRecorder = ref; }}
                                recordOptions={{ type: RNCamera.Constants.Type.front }}
                                cameraOptions={{ type: RNCamera.Constants.Type.front }}
                            />
                            <VideoRecorder ref={(ref) => { this.videoRecorder2 = ref; }}
                                recordOptions={{ type: RNCamera.Constants.Type.back }}
                                cameraOptions={{ type: RNCamera.Constants.Type.back }}
                            />
                            {this.state.recordvideo == true && (
                                <Button status="primary" size='large' onPress={() => { this.setState({ recordvideo: false }) }} style={styles.button_feq_selected}><Text style={{ color: eva['dark']['color-basic-1100'] }}>Stop Rekam</Text></Button>
                            )}
                            {this.state.recordvideo != true && (
                                <Button size='large' onPress={() => { this.rekam_front = true; this.setState({ recordvideo: true }); this.recordvideo() }} style={styles.button_feq}><Text style={{}}>Rekam Front</Text></Button>
                            )}
                            {this.state.recordvideo != true && (
                                <Button size='large' onPress={() => { this.rekam_front = false; this.setState({ recordvideo: true }); this.recordvideo2() }} style={styles.button_feq}><Text style={{}}>Rekam Back</Text></Button>
                            )}
                            {this.record_video_already == true && (
                                <Button size='large' onPress={() => { this.PlayVideo() }} style={styles.button_feq}><Text style={{}}>Jalankan Video</Text></Button>
                            )}
                            {this.record_video_already == true && (
                                <Button size='large' onPress={() => { this.setState({ delete_video: true }) }} style={styles.button_feq}><Text style={{}}>Delete Video</Text></Button>
                            )}
                            {this.record_video_already == true && (
                                <Button size='large' onPress={() => { this.setState({ save_video: true }) }} style={styles.button_feq}><Text style={{}}>Save Video</Text></Button>
                            )}

                        </View>
                    </Layout>
                </Layout>

            );

        }
        else if (this.state.content_type == 2) {
            return (
                <Layout style={{ flex: 1 }}>
                    <TopNavigation style={{}} title={this.header} alignment='start'
                        accessoryLeft={(props) => (
                            <TopNavigationAction
                                {...props}
                                icon={(props) => <Icon {...props} name={'arrow-ios-back-outline'} />}
                                onPress={() => {
                                    this.props.navigation.pop();
                                }} />
                        )}
                        accessoryRight={(props) => (
                            <React.Fragment>
                                <TopNavigationAction icon={(props) => (
                                    <Icon {...props} name='more-horizontal-outline' />
                                )} onPress={() => {

                                }} />
                            </React.Fragment>
                        )}
                    />
                    <Layout style={{ flex: 1 }} level='1'>
                        <Modal
                            visible={this.state.save_voice}
                            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            onBackdropPress={() => { this.setState({ save_voice: true }); this.setState({ save_voice: false, }) }}>

                            <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', margin: 15, padding: 15 }} level='1'>

                                <View style={{}}>
                                    <Text
                                        style={{
                                            textAlign: "left", fontWeight: 'bold', paddingLeft: 5, fontSize: 15
                                        }}
                                    >{this.simpan_edit.toUpperCase()}{"\n"}</Text>
                                </View>
                                <View>
                                    {this.simpan_edit == "Simpan" && (
                                        <Input
                                            placeholder=''
                                            value={this.state.voice_name}
                                            onChangeText={(nextValue) => this.setState({ voice_name: nextValue })}
                                        />
                                    )}
                                    {this.simpan_edit == "Edit" && (
                                        <Input
                                            placeholder=''
                                            disabled={true}
                                            value={this.state.voice_name}
                                            onChangeText={(nextValue) => this.setState({ voice_name: nextValue })}
                                        />
                                    )}
                                </View>

                                <View style={{ flexDirection: "row", paddingTop: 15 }}>
                                    <Button style={{ flex: 3 }} onPress={() => { this.setState({ save_voice: false }); }}>
                                        <Text style={{}}>Batal</Text>
                                    </Button>
                                    <Text style={{ flex: 4 }}>{" "}</Text>
                                    <Button style={{ flex: 3 }} onPress={() => { this.setState({ save_voice: false }); this.RecordVoiceFile(); }}>
                                        OK
                                    </Button><Text>{" "}</Text></View>
                            </Layout>
                        </Modal>
                        <Modal
                            visible={this.state.delete_rekaman}
                            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            onBackdropPress={() => { this.setState({ delete_rekaman: true }); this.setState({ delete_rekaman: false, }) }}>

                            <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', margin: 15, padding: 15 }} level='1'>

                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text
                                        style={{
                                            textAlign: "center", fontWeight: 'bold', paddingLeft: 5, fontSize: 20
                                        }}
                                    >Hapus Rekaman</Text>
                                </View>
                                <View>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text>Apakah Anda ingin menghapus Rekaman ini ?</Text>
                                    </View>

                                </View>

                                <View style={{ flexDirection: "row", paddingTop: 15, justifyContent: "center", alignItems: "center" }}>
                                    <Button onPress={() => { this.setState({ delete_rekaman: false }); }}>
                                        <Text style={{}}>Batal</Text>
                                    </Button>
                                    <Text>{" "}</Text>
                                    <Button onPress={() => { this.setState({ delete_rekaman: false }); this.DeleteRekaman(this.entry_id) }}>
                                        OK
                                    </Button><Text>{" "}</Text></View>
                            </Layout>
                        </Modal>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text category="p1" >
                                {this.title}
                            </Text>
                            <Divider style={{ marginVertical: 5 }} />

                            <View style={{ justifyContent: "center", paddingTop: 40, paddingBottom: 20, alignItems: "center" }}>

                                <Text style={{ fontSize: 20 }}>{""}{this.state.recordTime}{""}</Text>
                                <View style={{ paddingTop: 6, flexDirection: "row" }}>
                                    {this.play == false && (
                                        <TouchableOpacity style={{ flex: 1, }} onPress={() => {
                                            this.Play(); this.play = true; this.setState({ isLoading: true })
                                        }}>
                                            <View
                                                style={{ width: 70, height: 70, paddingLeft: 30, justifyContent: "center", alignItems: "center", }}
                                            >
                                                <Icon fill="#000" width="30" height="30" name='play-circle-outline' />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    {this.play == true && (
                                        <TouchableOpacity style={{ flex: 1, }} onPress={() => {
                                            this.Pause(); this.play = false; this.setState({ isLoading: true })
                                        }}>
                                            <View
                                                style={{ width: 70, height: 70, paddingLeft: 30, justifyContent: "center", alignItems: "center", }}
                                            >
                                                <Icon fill="#000" width="30" height="30" name='pause-circle-outline' />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    {this.record == false && (
                                        <TouchableOpacity onPress={() => {
                                            this.RecordVoice(); this.record = true; this.setState({ isLoading: true })
                                        }}>

                                            <View
                                                style={{ width: 70, height: 70, justifyContent: "center", alignItems: "center", borderRadius: 50, }}
                                            >
                                                <Icon fill="#000" width="30" height="30" name='mic-outline' />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    {this.record == true && (
                                        <TouchableOpacity onPress={() => {
                                            this.StopRecordVoice(); this.record = false; this.setState({ isLoading: true })
                                        }}>

                                            <View
                                                style={{ width: 70, height: 70, justifyContent: "center", alignItems: "center", borderRadius: 50, }}
                                            >
                                                <Icon fill="#000" width="30" height="30" name='mic-off-outline' />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity style={{ flex: 1, flexDirection: "row-reverse" }} onPress={() => {
                                        this.setState({ delete_rekaman: true })
                                    }}>
                                        <View
                                            style={{ width: 70, height: 70, justifyContent: "center", alignItems: "flex-end", }}
                                        >
                                            <Icon fill="#000" width="30" height="30" name='trash-2-outline' />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Divider style={{ marginVertical: 5, }} />
                        <View style={{ paddingTop: 6, flexDirection: "row" }}>
                            <View style={{ flex: 6 }}></View>
                            <View style={{ flex: 4, paddingHorizontal: 10, flexDirection: "row-reverse" }}>
                                <Button onPress={() => {
                                    this.setState({ save_voice: true })

                                }} size="small">
                                    <Text style={{}}>{this.simpan_edit}</Text>
                                </Button>
                            </View>
                        </View>



                    </Layout>
                </Layout>

            );
        }
        else if (this.state.content_type == 1) {
            return (
                <Layout style={{ flex: 1 }}>
                    <TopNavigation style={{}} title={this.header} alignment='start'
                        accessoryLeft={(props) => (
                            <TopNavigationAction
                                {...props}
                                icon={(props) => <Icon {...props} name={'arrow-ios-back-outline'} />}
                                onPress={() => {
                                    this.props.navigation.pop();
                                }} />
                        )}
                        accessoryRight={(props) => (
                            <React.Fragment>
                                <TopNavigationAction icon={(props) => (
                                    <Icon {...props} name='more-horizontal-outline' />
                                )} onPress={() => {

                                }} />
                            </React.Fragment>
                        )}
                    />
                    <Layout style={{ flex: 1 }} level='1'>
                        <Modal
                            visible={this.state.delete_catatan}
                            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            onBackdropPress={() => { this.setState({ delete_catatan: true }); this.setState({ delete_catatan: false, }) }}>

                            <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', margin: 15, padding: 15 }} level='1'>

                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text
                                        style={{
                                            textAlign: "center", fontWeight: 'bold', paddingLeft: 5, fontSize: 20
                                        }}
                                    >Hapus Catatan</Text>
                                </View>
                                <View>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text>Apakah Anda ingin menghapus Catatan ini ?</Text>
                                    </View>

                                </View>

                                <View style={{ flexDirection: "row", paddingTop: 15, justifyContent: "center", alignItems: "center" }}>
                                    <Button onPress={() => { this.setState({ delete_catatan: false }); }}>
                                        <Text style={{}}>Batal</Text>
                                    </Button>
                                    <Text>{" "}</Text>
                                    <Button onPress={() => { this.setState({ delete_catatan: false }); this.DeleteRecordJournal(this.entry_id) }}>
                                        OK
                                    </Button><Text>{" "}</Text></View>
                            </Layout>
                        </Modal>
                        <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
                            <Text category="p1" >
                                {this.title}
                            </Text>
                            <Divider style={{ marginVertical: 5 }} />
                            <Input
                                multiline={true}
                                textStyle={{ minHeight: 300 }}
                                placeholder=''
                                value={this.state.text}
                                onChangeText={(nextValue) => {

                                    this.setState({ text: nextValue }
                                        ,
                                        () => { });
                                }}
                            />
                            <Divider />
                            <View style={{ paddingTop: 6, flexDirection: "row" }}>
                                <View style={{ flex: 6 }}></View>
                                <View style={{ flex: 4, paddingLeft: 20, flexDirection: "row-reverse" }}>
                                    <Button onPress={() => {
                                        this.RecordJournal()
                                    }} size="small">
                                        <Text style={{}}>{this.simpan_edit}</Text>
                                    </Button>
                                    <Text>{" "}</Text>{
                                        this.entry_id != "" && (
                                            <Button onPress={() => {
                                                this.setState({ delete_catatan: true });
                                            }} size="small">
                                                <Text style={{}}>Delete</Text>
                                            </Button>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                    </Layout>
                </Layout>

            );

        } else {
            return (
                <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' }} level='2'>
                    <View style={{ flex: 1, flexDirection: "column", height: 120, flexDirection: "column", paddingHorizontal: 15, }}>
                        <View style={{ flex: 2 }}></View>
                        <View style={{ flex: 8 }}>
                            <View style={{ height: 10 }}></View>
                            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>

                            </View>
                        </View>
                    </View>
                </Layout>)
        }
    }
    DeleteRekaman() {




        RNFS.exists(this.voice_path)
            .then((exists) => {
                if (exists) {
                    RNFS.unlink(this.voice_path)
                        .then(() => {
                            console.log("deleted !")
                        })
                        // `unlink` will throw an error, if the item to unlink does not exist
                        .catch((err) => {
                            console.log(err.message);
                        });

                }
                else {

                }
            }
            )
        let sql = "DELETE FROM journal WHERE entry_id = " + this.entry_id;
        try {
            global.db.transaction(
                tx => {
                    tx.executeSql(sql, []);
                    (tx, error) => {
                        console.log(error);
                    };
                },
                error => {
                    console.log(error);
                },
                () => {
                    this.props.navigation.pop();
                }
            );
        }
        catch (e) {
            console.log(e);
        }
    }
    async RecordVoice() {




        try {
            SoundRecorder.start(SoundRecorder.PATH_CACHE + "/" + this.mypath)
                .then(() => {
                    console.log('started recording');
                    this.setState({ recordTime: 'Started Recording' })
                });

        }
        catch (e) {
            console.log(e)
        }





    }


    async StopRecordVoice() {
        if (this.journal_type == 6) {

            this.voice_path = RNFS.DocumentDirectoryPath + this.mypath
            /*
            if (Platform.OS == "ios")
                this.voice_path = RNFS.DocumentDirectoryPath + this.segment_seq + "_" + this.subsegment_seq + "_" + Math.random().toString().substring(0, 6) + ".m4a"
            else
                this.voice_path = RNFS.DocumentDirectoryPath + this.segment_seq + "_" + this.subsegment_seq + "_" + Math.random().toString().substring(0, 6) + ".mp3"
       */
        }
        else if (this.voice_path == "") {
            if (Platform.OS == "ios")
                this.voice_path = RNFS.DocumentDirectoryPath + "/con" + this.content_id + "/ses" + this.session_id + "/audio_" + this.segment_seq + "_" + this.subsegment_seq + "_" + Math.random().toString().substring(0, 6) + ".m4a"
            else
                this.voice_path = RNFS.DocumentDirectoryPath + "/con" + this.content_id + "/ses" + this.session_id + "/audio_" + this.segment_seq + "_" + this.subsegment_seq + "_" + Math.random().toString().substring(0, 6) + ".mp3"
        }
        if (false) {
            const result = await this.audioRecorderPlayer.stopRecorder();
            this.audioRecorderPlayer.removeRecordBackListener();
            this.setState({
                recordSecs: 0,
            });
            console.log("this voice path", this.voice_path)

            RNFS.exists(this.voice_path)
                .then((exists) => {
                    if (exists) {
                        RNFS.unlink(this.voice_path)
                            .then(() => {
                                RNFS.copyFile(result, this.voice_path)
                                    .then(() => {
                                        this.sound = new Sound(this.voice_path, '', (error) => {
                                            if (error) {
                                                console.log('failed to load the sound', error);
                                                this.setState({ playState: 'paused' });
                                            } else {
                                                this.durationString = this.getAudioTimeString(this.sound.getDuration())
                                            }
                                        });
                                        RNFS.unlink(result)
                                    })
                                console.log("Copied")


                            })

                            .catch((err) => {
                                console.log(err.message);
                            });

                    }
                    else {
                        RNFS.copyFile(result, this.voice_path)
                            .then(() => {
                                this.sound = new Sound(this.voice_path, '', (error) => {
                                    if (error) {
                                        console.log('failed to load the sound', error);
                                        this.setState({ playState: 'paused' });
                                    } else {
                                        this.durationString = this.getAudioTimeString(this.sound.getDuration())
                                    }
                                });
                                RNFS.unlink(result)
                            })
                        console.log("Copied")

                    }
                }
                )
        }
        else {

            SoundRecorder.stop()
                .then((result) => {

                    console.log(this.voice_path)
                    RNFS.exists(this.voice_path)
                        .then((exists) => {
                            if (exists) {
                                RNFS.unlink(this.voice_path)
                                    .then(() => {
                                        RNFS.copyFile(result.path, this.voice_path)
                                            .then(() => {
                                                this.sound = new Sound(this.voice_path, '', (error) => {
                                                    if (error) {
                                                        console.log('failed to load the sound', error);
                                                        this.setState({ playState: 'paused' });
                                                    } else {
                                                        this.durationString = this.getAudioTimeString(this.sound.getDuration())
                                                    }
                                                });
                                                RNFS.unlink(result.path)
                                            })
                                        console.log("Copied")


                                    })

                                    .catch((err) => {
                                        console.log(err.message);
                                    });

                            }
                            else {
                                RNFS.copyFile(result.path, this.voice_path)
                                    .then(() => {
                                        this.sound = new Sound(this.voice_path, '', (error) => {
                                            if (error) {
                                                console.log('failed to load the sound', error);
                                                this.setState({ playState: 'paused' });
                                            } else {
                                                this.durationString = this.getAudioTimeString(this.sound.getDuration())
                                            }
                                        });
                                        RNFS.unlink(result.path)
                                    })
                                console.log("Copied")

                            }
                        }
                        )
                    this.setState({ recordTime: 'Stopped Recording' })
                    console.log('stopped recording, audio file saved at: ' + result.path);
                });

        }


    }
    DeleteRecordJournal() {
        let sql = "DELETE FROM journal WHERE entry_id = " + this.entry_id;
        try {
            global.db.transaction(
                tx => {
                    tx.executeSql(sql, []);
                    (tx, error) => {
                        console.log(error);
                    };
                },
                error => {
                    console.log(error);
                },
                () => {

                    this.props.navigation.pop();
                }
            );
        }
        catch (e) {
            console.log(e);
        }
    }

    RecordJournal() {
        if (this.entry_id != "" && this.entry_text != undefined && this.state.text != "") {
            this.today = moment(new Date()).format('YYYY-MM-DD');
            let sql = "UPDATE journal SET entry_text = ?, upd_date = ? WHERE entry_id = ?"
            console.log(sql)
            console.log(this.entry_id)
            console.log(this.entry_text)
            console.log(this.state.text)
            try {
                global.db.transaction(
                    tx => {
                        tx.executeSql(sql, [this.state.text, this.today, this.entry_id]);
                        (tx, error) => {
                            console.log(error);
                        };
                    },
                    error => {
                        console.log(error);
                    },
                    () => {

                        this.props.navigation.pop();
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        } else if (this.state.text == "") {
            this.setState({ delete_catatan: true });
        }
        else {
            console.log("horee")
            this.today = moment(new Date()).format('YYYY-MM-DD');
            let sql = "INSERT INTO journal (content_id, session_id, segment_seq, subsegment_seq, entry_type, level, parent_id, journal_type, content_type, origin,  shared_by_id, vid, title, entry_text, entry_voice_path, entry_video_path, option_selected, upd_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)"
            console.log(sql)
            try {
                global.db.transaction(
                    tx => {
                        tx.executeSql(sql, [this.content_id, this.session_id, this.segment_seq, this.subsegment_seq, 2, 2, this.parent_id, this.journal_type, this.content_type, this.origin, '', null, this.title, this.state.text, null, null, null, this.today]);
                        (tx, error) => {
                            console.log(error);
                        };
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        this.props.navigation.pop();
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        }

    }
    RecordVoiceFile() {
        console.log(this.entry_id)
        console.log("Hei hei hei")
        if (this.entry_id != undefined) {
            console.log("this voice_path" + this.voice_path)
            this.today = moment(new Date()).format('YYYY-MM-DD');
            let sql = "UPDATE journal SET entry_voice_path = ?, upd_date = ? WHERE entry_id = ?"
            console.log(sql)
            try {
                global.db.transaction(
                    tx => {
                        tx.executeSql(sql, [this.voice_path, this.today, this.entry_id]);
                        (tx, error) => {
                            console.log(error);
                        };
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        this.props.navigation.pop();
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            console.log("horee")
            this.today = moment(new Date()).format('YYYY-MM-DD');
            let sql = "INSERT INTO journal (content_id, session_id, segment_seq, subsegment_seq, entry_type, level, parent_id, journal_type, content_type, origin,  shared_by_id, vid, title, entry_text, entry_voice_path, entry_video_path, option_selected, upd_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)"
            console.log(sql)
            try {
                global.db.transaction(
                    tx => {
                        tx.executeSql(sql, [this.content_id, this.session_id, this.segment_seq, this.subsegment_seq, 2, 2, this.parent_id, this.journal_type, this.content_type, this.origin, '', null, this.state.voice_name, this.state.text, this.voice_path, null, null, this.today]);
                        (tx, error) => {
                            console.log(error);
                        };
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        this.props.navigation.pop();
                    }
                );
            }
            catch (e) {
                console.log(e);
            }


        }
    }
    Pause = () => {
        if (this.sound) {
            this.sound.pause();
        }

        this.setState({ playState: 'paused' });
    }
    async Play() {

        this.exist = false;

        console.log(this.voice_path)
        RNFS.exists(this.voice_path)
            .then((exists) => {
                if (exists) {
                    console.log(this.voice_path)
                    this.Playing();
                }
                else {

                }
            }
            )

    }



    Stop() {
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();

    }
    Playing = async () => {

        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({ playState: 'playing' });
        } else {
            const filepath = this.voice_path;
            console.log('[Play]', filepath);

            this.sound = new Sound(filepath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);

                    this.setState({ playState: 'paused' });
                } else {
                    this.setState({ playState: 'playing', duration: this.sound.getDuration() });
                    this.sound.play(this.playComplete);
                    this.durationString = this.getAudioTimeString(this.sound.getDuration())
                }
            });
        }
    }
    getAudioTimeString(seconds) {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
    }
    playComplete = (success) => {
        if (this.sound) {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');

            }
            this.setState({ playState: 'paused', playSeconds: 0 });
            this.sound.setCurrentTime(0);
        }
    }

    recordvideo = () => {
        // 30 seconds
        this.videoRecorder.open({ maxLength: 60 }, (data) => {
            console.log('captured data', data);


            console.log(data.uri)
            this.videouri = data.uri;


            RNFS.exists(this.video_path)
                .then((exists) => {
                    if (exists) {
                        RNFS.unlink(this.video_path)
                            .then(() => {
                                RNFS.copyFile(this.videouri, this.video_path)
                                    .then(() => {
                                        RNFS.unlink(this.videouri)
                                    })
                                console.log("Copied")
                            })
                            .catch((err) => {
                                console.log(err.message);
                            });

                    }
                    else {
                        RNFS.copyFile(this.videouri, this.video_path)
                            .then(() => {
                                RNFS.unlink(this.videouri)
                            })
                        console.log("Copied")

                    }
                }
                )
            this.record_video_already = true;
            this.setState({ isLoading: true })

        });
        this.setState({ recordvideo: false })
    }
    recordvideo2 = () => {
        // 30 seconds
        this.videoRecorder2.open({ maxLength: 60 }, (data) => {
          console.log('captured data', data);
    
    
          console.log(data.uri)
          this.videouri = data.uri;
          RNFS.exists(this.video_path)
            .then((exists) => {
              if (exists) {
                RNFS.unlink(this.video_path)
                  .then(() => {
                    RNFS.copyFile(this.videouri, this.video_path)
                      .then(() => {
                        RNFS.unlink(this.videouri)
                      })
                    console.log("Copied")
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
    
              }
              else {
                RNFS.copyFile(this.videouri, this.video_path)
                  .then(() => {
                    RNFS.unlink(this.videouri)
                  })
                console.log("Copied")
    
              }
            }
            )
          this.record_video_already = true;
          this.setState({ isLoading: true })
    
        });
        this.setState({ recordvideo: false })
      }
    PlayVideo() {
        const { navigate } = this.props.navigation;
        navigate("PlayRecordedVideo", {
            video_uri: this.video_path
        });
    }

    SaveVideo() {
        if (this.entry_id != undefined) {
            this.today = moment(new Date()).format('YYYY-MM-DD');
            let sql = "UPDATE journal SET entry_video_path = ?, upd_date = ? WHERE entry_id = ?"
            console.log(sql)
            try {
                global.db.transaction(
                    tx => {
                        tx.executeSql(sql, [this.video_path, this.today, this.entry_id]);
                        (tx, error) => {
                            console.log(error);
                        };
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        this.props.ACT_changeCatatanAdd(true)
                        this.props.navigation.pop();
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            console.log("horee")
            this.today = moment(new Date()).format('DD MMM YY');
            let sql = "INSERT INTO journal (content_id, session_id, segment_seq, subsegment_seq, entry_type, level, parent_id, journal_type, content_type, origin,  shared_by_id, vid, title, entry_text, entry_voice_path, entry_video_path, option_selected, upd_date) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)"
            console.log(sql)
            try {
                global.db.transaction(
                    tx => {
                        tx.executeSql(sql, [this.content_id, this.session_id, this.segment_seq, this.subsegment_seq, 2, 2, this.parent_id, this.journal_type, this.content_type, this.origin, '', null, this.state.video_name, this.state.text, this.voice_path, this.video_path, null, this.today]);
                        (tx, error) => {
                            console.log(error);
                        };
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
        
                        this.props.navigation.pop();
                    }
                );
            }
            catch (e) {
                console.log(e);
            }
        }

    }
}



export default Journaling;
