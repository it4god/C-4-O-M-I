import React, { Component } from "react";
import {
    ScrollView,
    Platform,
    View,
    SafeAreaView,
    Image,
    Linking, TouchableOpacity,
    Dimensions, Alert,
} from "react-native";
import { Layout, TopNavigation, Datepicker, Divider, Text, Card, Button, Menu as UKMenu, Modal, Input, TopNavigationAction, BottomNavigation, BottomNavigationTab, Icon, OverflowMenu } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import styles from '../common/style1'
const WindowWidth = Dimensions.get('window').width;
var moment = require('moment')
class JournalingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumb_detail: false,
            date_filter: '',
            keywordsearch: '',
            menuresetplay: false,
            menudeletejournal: false,
            remove_menu_diikuti: false,
        };
        this.simplified = true;
        var that = this;
        this.homepage_id = 1;
        this.jurnal_level = 0;
        this.doa = [];
        this.komitmen = []
    }

    componentDidMount() {

        this._isMounted = true;
        this.subs = this.props.navigation.addListener("focus", () => {
            this.BottomNavigationEvent(2, 1)
        }

        );
        this.doa = [];
        this.komitmen = [];
        setTimeout(() => {
            this.setState({ thumb_detail: true })
        }, 3000);
        this.BottomNavigationEvent(2, 0)

    };
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (

            <Layout style={{ flex: 1 }}>
                {this.jurnal_level == 0 && (
                    <TopNavigation
                        alignment='center'
                        title='C4OMI Indonesia'
                        subtitle='Journaling & Dairy'
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
                )}
                {this.jurnal_level == 1 && ( this.entry_id_1 !=-100 &&this.entry_id_1 !=-200 ) && (
                    <TopNavigation alignment='center'
                        title='C4OMI Indonesia'
                        subtitle='Journaling & Dairy'
                        accessoryLeft={(props) => (
                            <TopNavigationAction
                                alignment='center'
                                title='C4OMI Indonesia'
                                subtitle='Journaling & Dairy'
                                {...props}
                                icon={(props) => <Icon {...props} name={'arrow-ios-back-outline'} />}
                                onPress={() => {
                                    this.jurnal_level = 0;
                                    this.entry_id_1 = 0;
                                    this.BottomNavigationEvent(2, 0)
                                    console.log("0")
                                }} />
                        )}
                        accessoryRight={(props) => (
                            <React.Fragment>

                            </React.Fragment>
                        )}
                    />
                )}
                {this.jurnal_level == 1 && this.entry_id_1 == -100 && (
                    <TopNavigation
                        alignment='center'
                        title='Journaling & Dairy'
                        subtitle='Diary Pribadi'
                        style={{}}
                        accessoryLeft={(props) => (
                            <TopNavigationAction
                                {...props}
                                icon={(props) => <Icon {...props} name={'arrow-ios-back-outline'} />}
                                onPress={() => {
                                    this.jurnal_level = 0;
                                    this.entry_id_1 = 0;
                                    this.BottomNavigationEvent(2, 0)
                                    console.log("0")
                                }} />
                        )}
                        accessoryRight={(props) => (
                            <React.Fragment>

                            </React.Fragment>
                        )}
                    />
                )}
                {this.jurnal_level == 1 && this.entry_id_1 == -200 && (
                    <TopNavigation
                        alignment='center'
                        title='Journaling & Dairy'
                        subtitle='Thanksgiving Journal'
                        style={{}}
                        accessoryLeft={(props) => (
                            <TopNavigationAction
                                {...props}
                                icon={(props) => <Icon {...props} name={'arrow-ios-back-outline'} />}
                                onPress={() => {
                                    this.jurnal_level = 0;
                                    this.entry_id_1 = 0;
                                    this.BottomNavigationEvent(2, 0)
                                    console.log("0")
                                }} />
                        )}
                        accessoryRight={(props) => (
                            <React.Fragment>

                            </React.Fragment>
                        )}
                    />
                )}
                <Modal
                    visible={this.state.menudeletejournal}
                    backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    onBackdropPress={() => { this.setState({ menudeletejournal: true }); this.setState({ menudeletejournal: false, }) }}>

                    <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', margin: 15, padding: 15 }} level='1'>

                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text
                                style={{
                                    textAlign: "center", fontWeight: 'bold', paddingLeft: 5, fontSize: 20
                                }}
                            >Apakah Anda mau menghapus Jurnal {this.namajurnal} ? </Text>
                        </View>
                        <View style={{ flexDirection: "row", paddingTop: 15, justifyContent: "center", alignItems: "center" }}>
                            <Text>{" "}</Text>
                            <Button onPress={() => {
                                this.setState({ menudeletejournal: false });

                                let sql2 = "Delete from Journal WHERE entry_id = " + this.entry_id_delete;

                                try {
                                    global.db.transaction(
                                        tx => {
                                            tx.executeSql(sql2);
                                            (tx, error) => {
                                                console.log(error);
                                            };
                                            this.BottomNavigationEvent(2, 0)
                                        },
                                        error => {
                                            console.log(error);
                                        },
                                        () => {


                                        }
                                    );
                                }
                                catch (e) {

                                }


                            }}>
                                <Text style={{}}>Delete Journal</Text>
                            </Button><Text>{" "}</Text>
                            <Button onPress={() => { this.setState({ menudeletejournal: false }); }}>
                                <Text style={{}}>Batal</Text>
                            </Button>
                        </View>
                    </Layout>
                </Modal>
                <Divider />
                <ScrollView style={{ flex: 1 }}>

                    {(this.entry_id_1 == -100 || this.entry_id_1 == -200) && (
                        <View style={{ padding: 15, flexDirection: "row", flex: 1 }}>
                            <Datepicker

                                date={this.state.date_filter}
                                onSelect={nextDate => {
                                    this.setState({ date_filter: nextDate }); this.PersonalDiary(moment(nextDate).format("YYYY-MM-DD").toString())
                                }}
                                style={{ flex: 3, paddingRight: 10 }}
                            />
                            <Button style={{ marginRight: 5, borderRadius: 5, flex: 1 }} onPress={() => {
                                this.setState({ date_filter: '' }); this.PersonalDiary("")
                            }} size="small" accessoryLeft={(props) => (
                                <Icon width="24" height="24" fill={'#fff'} {...props} name='calendar-outline' />
                            )}><Text style={{}}>Semua</Text></Button>
                        </View>
                    )}
                    <View style={{ padding: 15 }}>
                        {this.state.jurnal}
                    </View>
                    {(this.entry_id_1 == -100 || this.entry_id_1 == -200) && (
                        <View style={{ paddingBottom: 20, paddingTop: 5, paddingHorizontal: 15 }}>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                {this.simplified == true && (
                                    <Button onPress={() => {

                                        this.simplified = false;
                                        this.setState({ isLoading: true })
                                    }} size="small" style={{ marginTop: 10, borderRadius: 10, width: 77 }} accessoryLeft={(props) => (
                                        <Icon width="30" height="30" fill={'#fff'}  {...props} name='plus-outline' />
                                    )} />
                                )}
                                {this.simplified == false && (
                                    <Button style={{ marginTop: 10, marginRight: 5, borderRadius: 20 }} onPress={() => {
                                        const { navigate } = this.props.navigation;
                                        navigate("Journaling", {
                                            title: this.title,
                                            parent_id: this.entry_id_1,
                                            entry_id: this.entry_id_1,
                                            journal_type: 6,
                                            content_type: 1,
                                            origin: 1,



                                        });
                                    }} size="small" accessoryLeft={(props) => (
                                        <Icon width="24" height="24" fill={'#fff'} {...props} name='edit-2-outline' />
                                    )}><Text style={{}}>Tulis</Text></Button>)}
                                {this.simplified === false && (
                                    <Button style={{ marginTop: 10, marginRight: 5, borderRadius: 20 }} onPress={() => {
                                        const { navigate } = this.props.navigation;
                                        navigate("Journaling", {
                                            title: this.title,
                                            parent_id: this.entry_id_1,
                                            journal_type: 6,
                                            content_type: 2,
                                            origin: 1,


                                        });
                                    }} size="small" accessoryLeft={(props) => (
                                        <Icon width="24" height="24" fill={'#fff'}  {...props} name='mic-outline' />
                                    )}><Text style={{}}>Rekam</Text></Button>
                                )}
                                {this.simplified == false && (
                                    <Button style={{ marginTop: 10, marginRight: 5, borderRadius: 20 }} onPress={() => {
                                        const { navigate } = this.props.navigation;

                                        navigate("Journaling", {
                                            title: this.title,
                                            parent_id: this.entry_id_1,
                                            journal_type: 6,
                                            content_type: 3,
                                            origin: 1,


                                        });

                                    }} size="small" accessoryLeft={(props) => (
                                        <Icon width="24" height="24" fill={'#fff'}  {...props} name='video-outline' />
                                    )} ><Text style={{}}>Video</Text></Button>
                                )}</ScrollView>
                        </View>

                    )}
                    <View style={{ height: 50 }}></View>
                </ScrollView>
                <Divider />
            </Layout>

        );


    }



    BottomNavigationEvent(index, jurnal_level) {

        this.homepage_id = index + 1;

        if (index != 2) {
            this.jurnal_level = 0;
            this.entry_id_1 = 0;
        }

        if (index == 2) {

            if (jurnal_level == 0) {
                this.entry_id_1 = 0;
                this.jurnal_level = 0
                console.log(this.jurnal_level)

                this.jurnal = [];
                this.jurnal.push(
                    <View key={"journal  personaldiary"}>
                        <TouchableOpacity
                            onPress={() => {
                                this.jurnal_level = 1;
                                this.entry_id_1 = -100;
                                this.title = "Diary Pribadi"
                                this.prev_title = this.title
                                this.BottomNavigationEvent(2, 1)
                            }}>
                            <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap" }}>
                                <Icon width="48" height="48" fill='#8f9bb3' name='folder-outline' />
                                <Text style={{ paddingTop: 15 }}>{" "}{"Diary Pribadi"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                this.jurnal.push(
                    <View key={"journal  thanksgiving"}>
                        <TouchableOpacity
                            onPress={() => {
                                this.jurnal_level = 1;
                                this.entry_id_1 = -200;
                                this.title = "Thanksgiving Journal"
                                this.prev_title = this.title
                                this.BottomNavigationEvent(2, 1)
                            }}>
                            <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap" }}>
                                <Icon width="48" height="48" fill='#8f9bb3' name='folder-outline' />
                                <Text style={{ paddingTop: 15 }}>{" "}{"Thanksgiving Journal"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                this.setState(
                    {
                        jurnal: this.jurnal
                    }
                );



            }
            else if (jurnal_level == 1) {
                this.jurnal_level = 1

                global.db.transaction(tx => {
                    let sql = "SELECT entry_id as entry_id_1, title from journal where level = 1 and parent_id = " + this.entry_id_1 + " and entry_id IN (  select parent_id FROM journal WHERE level = 2 and parent_id = entry_id_1 GROUP by entry_id HAVING COUNT(entry_id)>0)  "
                    tx.executeSql(sql, [], (tx, results) => {
                        const rows = results.rows;
                        if (rows.length > 0) {
                            this.jurnal = [];
                            for (let i = 0; i < rows.length; i++) {
                                this.jurnal.push(
                                    <View key={"journal " + rows.item(i).entry_id_1}>
                                        <TouchableOpacity onPress={() => {
                                            this.jurnal_level = 2;
                                            this.entry_id_2 = rows.item(i).entry_id_1
                                            this.title = rows.item(i).title
                                            this.BottomNavigationEvent(2, 2)
                                        }}>
                                            <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap" }}>
                                                <Icon width="48" height="48" fill='#8f9bb3' name='folder-outline' />
                                                <Text style={{ paddingTop: 5, paddingRight: 40 }}>{" "}{rows.item(i).title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )

                            }
                            this.setState(
                                {
                                    jurnal: this.jurnal
                                }
                            );
                        }
                    })
                })
                if (this.entry_id_1 == -100) {
                    this.PersonalDiary("")
                }
                if (this.entry_id_1 == -200) {
                    this.PersonalDiary("")
                }
            }
            else if (jurnal_level == 2) {
                this.jurnal_level = 2
                global.db.transaction(tx => {
                    tx.executeSql('SELECT * from journal WHERE level = 2 AND parent_id = ' + this.entry_id_2 + ' ORDER BY journal_type, subsegment_seq', [], (tx, results) => {
                        const rows = results.rows;
                        this.jurnal = [];
                        console.log(rows.length)
                        if (rows.length == 0) {
                            this.setState({ isLoading: true })

                        }
                        else {
                            console.log("Jumlah ROws : " + rows.length)
                            this.write_answers = [];
                            this.voice_answers = [];
                            this.video_answers = [];
                            this.catatan_text = [];
                            this.catatan_voice = [];
                            this.catatan_video = [];
                            this.catatan_alkitab_text = [];
                            this.catatan_alkitab_voice = [];
                            this.catatan_alkitab_video = [];
                            this.renungan_text = [];
                            this.renungan_voice = [];
                            this.renungan_video = [];
                            this.komitmen_text = [];
                            this.komitmen_voice = [];
                            this.komitmen_video = [];
                            for (let i = 0; i < rows.length; i++) {


                                let title = rows.item(i).title;

                                if (rows.item(i).journal_type == 1) {
                                    if (rows.item(i).content_type == 1)
                                        this.catatan_text.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"write_catatan" + i}>
                                                {rows.item(i).title != "" && (
                                                    <Text category="p1" >
                                                        {rows.item(i).title}
                                                    </Text>
                                                )}
                                                <TouchableOpacity style={{ marginRight: 5 }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}
                                                    onPress={() => {
                                                        const { navigate } = this.props.navigation;
                                                        navigate("Journaling", {
                                                            entry_id: rows.item(i).entry_id,
                                                            entry_text: rows.item(i).entry_text,
                                                            pertanyaan: rows.item(i).title,
                                                            content_type: 2,
                                                        });
                                                    }}>
                                                    <Text style={{ paddingHorizontal: 5 }} category="p1" >
                                                        {rows.item(i).entry_text}
                                                    </Text>
                                                </TouchableOpacity>
                                            </Layout>
                                        )

                                    if (rows.item(i).content_type == 2)
                                        this.catatan_voice.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"voice_catatan" + i}>

                                                <TouchableOpacity onPress={() => {
                                                    const { navigate } = this.props.navigation;
                                                    navigate("Journaling", {
                                                        entry_id: rows.item(i).entry_id,
                                                        voice_path: rows.item(i).entry_voice_path,
                                                        content_id: this.content_id,
                                                        session_id: this.session_id,
                                                        segment_seq: this.segment_seq,
                                                        content_type: 2,
                                                        title: this.title,
                                                        pertanyaan: rows.item(i).title,
                                                        seq: i + 1
                                                    });
                                                }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}>
                                                    <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                        <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='mic-outline' />
                                                        <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Layout>
                                        )
                                    if (rows.item(i).content_type == 3)
                                        this.catatan_video.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"video_catatan" + i}>

                                                <TouchableOpacity onPress={() => {
                                                    const { navigate } = this.props.navigation;
                                                    navigate("Journaling", {
                                                        entry_id: rows.item(i).entry_id,
                                                        video_path: rows.item(i).entry_video_path,
                                                        content_id: this.content_id,
                                                        session_id: this.session_id,
                                                        segment_seq: this.segment_seq,
                                                        content_type: 3,
                                                        title: this.title,
                                                        pertanyaan: rows.item(i).title,
                                                        seq: i + 1

                                                    });
                                                }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}>
                                                    <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                        <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='video-outline' />
                                                        <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Layout>
                                        )


                                }

                                if (rows.item(i).journal_type == 2) {
                                    if (rows.item(i).content_type == 1)
                                        this.catatan_alkitab_text.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"write_catatan_alkitab" + i}>
                                                <TouchableOpacity style={{ marginRight: 5 }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}
                                                    onPress={() => {
                                                        const { navigate } = this.props.navigation;
                                                        navigate("Journaling", {
                                                            entry_id: rows.item(i).entry_id,
                                                            entry_text: rows.item(i).entry_text,
                                                            pertanyaan: rows.item(i).title,
                                                            journal_type: 6,
                                                        });
                                                    }}>
                                                    {rows.item(i).title != "" && (
                                                        <Text category="p1" >
                                                            {rows.item(i).title}
                                                        </Text>
                                                    )}

                                                    <Text style={{ paddingHorizontal: 5 }} category="p1" >
                                                        {rows.item(i).entry_text}
                                                    </Text>
                                                </TouchableOpacity>
                                            </Layout>
                                        )

                                    if (rows.item(i).content_type == 2)
                                        this.catatan_alkitab_voice.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"voice_catatan_alkitab" + i}>

                                                <TouchableOpacity onPress={() => {
                                                    const { navigate } = this.props.navigation;
                                                    navigate("Journaling", {
                                                        entry_id: rows.item(i).entry_id,
                                                        voice_path: rows.item(i).entry_voice_path,
                                                        content_id: this.content_id,
                                                        session_id: this.session_id,
                                                        segment_seq: this.segment_seq,
                                                        content_type: 2,
                                                        title: this.title,
                                                        pertanyaan: rows.item(i).title,
                                                        seq: i + 1
                                                    });
                                                }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}>
                                                    <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                        <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='mic-outline' />
                                                        <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Layout>
                                        )
                                    if (rows.item(i).content_type == 3)
                                        this.catatan_alkitab_video.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"video_catatan_alkitab" + i}>

                                                <TouchableOpacity onPress={() => {
                                                    const { navigate } = this.props.navigation;
                                                    navigate("Journaling", {
                                                        entry_id: rows.item(i).entry_id,
                                                        video_path: rows.item(i).entry_video_path,
                                                        content_id: this.content_id,
                                                        session_id: this.session_id,
                                                        segment_seq: this.segment_seq,
                                                        content_type: 3,
                                                        title: this.title,
                                                        pertanyaan: rows.item(i).title,
                                                        seq: i + 1

                                                    });
                                                }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}>
                                                    <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                        <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='video-outline' />
                                                        <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Layout>
                                        )


                                }
                                if (rows.item(i).journal_type == 3) {
                                    if (rows.item(i).content_type == 1) {
                                        this.write_answers.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"write_answer" + i}>
                                                <TouchableOpacity style={{ marginRight: 5 }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}
                                                    onPress={() => {
                                                        const { navigate } = this.props.navigation;
                                                        navigate("Journaling", {
                                                            entry_id: rows.item(i).entry_id,
                                                            entry_text: rows.item(i).entry_text,
                                                            pertanyaan: rows.item(i).title,

                                                        });
                                                    }}>
                                                    {rows.item(i).title != "" && (
                                                        <Text category="p1" >
                                                            {rows.item(i).title}
                                                        </Text>
                                                    )}

                                                    <Text style={{ paddingHorizontal: 5 }} category="p1" >
                                                        {rows.item(i).entry_text}
                                                    </Text>
                                                </TouchableOpacity>
                                            </Layout>
                                        )

                                    }
                                    else if (rows.item(i).content_type == 2) {
                                        this.voice_answers.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"voice_answer" + i}>

                                                <TouchableOpacity onPress={() => {
                                                    const { navigate } = this.props.navigation;
                                                    navigate("Journaling", {
                                                        entry_id: rows.item(i).entry_id,
                                                        voice_path: rows.item(i).entry_voice_path,
                                                        content_id: this.content_id,
                                                        session_id: this.session_id,
                                                        segment_seq: this.segment_seq,
                                                        content_type: 2,
                                                        title: this.title,
                                                        pertanyaan: rows.item(i).title,
                                                        seq: i + 1
                                                    });
                                                }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}>
                                                    <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                        <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='mic-outline' />
                                                        <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Layout>
                                        )


                                    }
                                    else if (rows.item(i).content_type == 3) {
                                        this.video_answers.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"video_answer" + i}>

                                                <TouchableOpacity onPress={() => {
                                                    const { navigate } = this.props.navigation;
                                                    navigate("Journaling", {
                                                        entry_id: rows.item(i).entry_id,
                                                        video_path: rows.item(i).entry_video_path,
                                                        content_id: this.content_id,
                                                        session_id: this.session_id,
                                                        segment_seq: this.segment_seq,
                                                        content_type: 3,
                                                        title: this.title,
                                                        pertanyaan: rows.item(i).title,
                                                        seq: i + 1

                                                    });
                                                }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}>
                                                    <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                        <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='video-outline' />
                                                        <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Layout>
                                        )


                                    }

                                }

                                if (rows.item(i).journal_type == 4) {
                                    if (rows.item(i).content_type == 1)
                                        this.renungan_text.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"write renungan" + i}>
                                                <TouchableOpacity style={{ marginRight: 5 }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}
                                                    onPress={() => {
                                                        const { navigate } = this.props.navigation;
                                                        navigate("Journaling", {
                                                            entry_id: rows.item(i).entry_id,
                                                            entry_text: rows.item(i).entry_text,
                                                            pertanyaan: rows.item(i).title,

                                                        });
                                                    }}>
                                                    {rows.item(i).title != "" && (
                                                        <Text category="p1" >
                                                            {rows.item(i).title}
                                                        </Text>
                                                    )}

                                                    <Text style={{ paddingHorizontal: 5 }} category="p1" >
                                                        {rows.item(i).entry_text}
                                                    </Text>
                                                </TouchableOpacity>
                                            </Layout>
                                        )

                                    if (rows.item(i).content_type == 2)
                                        this.renungan_voice.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"voice_renungan" + i}>

                                                <TouchableOpacity onPress={() => {
                                                    const { navigate } = this.props.navigation;
                                                    navigate("Journaling", {
                                                        entry_id: rows.item(i).entry_id,
                                                        voice_path: rows.item(i).entry_voice_path,
                                                        content_id: this.content_id,
                                                        session_id: this.session_id,
                                                        segment_seq: this.segment_seq,
                                                        content_type: 2,
                                                        title: this.title,
                                                        pertanyaan: rows.item(i).title,
                                                        seq: i + 1
                                                    });
                                                }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}>
                                                    <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                        <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='mic-outline' />
                                                        <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Layout>
                                        )
                                    if (rows.item(i).content_type == 3)
                                        this.renungan_video.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"video_renungan" + i}>

                                                <TouchableOpacity onPress={() => {
                                                    const { navigate } = this.props.navigation;
                                                    navigate("Journaling", {
                                                        entry_id: rows.item(i).entry_id,
                                                        video_path: rows.item(i).entry_video_path,
                                                        content_id: this.content_id,
                                                        session_id: this.session_id,
                                                        segment_seq: this.segment_seq,
                                                        content_type: 3,
                                                        title: this.title,
                                                        pertanyaan: rows.item(i).title,
                                                        seq: i + 1

                                                    });
                                                }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}>
                                                    <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                        <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='video-outline' />
                                                        <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Layout>
                                        )


                                }
                                if (rows.item(i).journal_type == 5) {
                                    if (rows.item(i).content_type == 1)
                                        this.komitmen_text.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"write komitmen" + i}>
                                                <TouchableOpacity style={{ marginRight: 5 }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}
                                                    onPress={() => {
                                                        const { navigate } = this.props.navigation;
                                                        navigate("Journaling", {
                                                            entry_id: rows.item(i).entry_id,
                                                            entry_text: rows.item(i).entry_text,
                                                            pertanyaan: rows.item(i).title,

                                                        });
                                                    }}>
                                                    {rows.item(i).title != "" && (
                                                        <Text category="p1" >
                                                            {rows.item(i).title}
                                                        </Text>
                                                    )}

                                                    <Text style={{ paddingHorizontal: 5 }} category="p1" >
                                                        {rows.item(i).entry_text}
                                                    </Text>
                                                </TouchableOpacity>
                                            </Layout>
                                        )

                                    if (rows.item(i).content_type == 2)
                                        this.komitmen_voice.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"voice_komitmen" + i}>

                                                <TouchableOpacity onPress={() => {
                                                    const { navigate } = this.props.navigation;
                                                    navigate("Journaling", {
                                                        entry_id: rows.item(i).entry_id,
                                                        voice_path: rows.item(i).entry_voice_path,
                                                        content_id: this.content_id,
                                                        session_id: this.session_id,
                                                        segment_seq: this.segment_seq,
                                                        content_type: 2,
                                                        title: this.title,
                                                        pertanyaan: rows.item(i).title,
                                                        seq: i + 1
                                                    });
                                                }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}>
                                                    <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                        <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='mic-outline' />
                                                        <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Layout>
                                        )
                                    if (rows.item(i).content_type == 3)
                                        this.komitmen_video.push(
                                            <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"video_komitmen" + i}>

                                                <TouchableOpacity onPress={() => {
                                                    const { navigate } = this.props.navigation;
                                                    navigate("Journaling", {
                                                        entry_id: rows.item(i).entry_id,
                                                        video_path: rows.item(i).entry_video_path,
                                                        content_id: this.content_id,
                                                        session_id: this.session_id,
                                                        segment_seq: this.segment_seq,
                                                        content_type: 3,
                                                        title: this.title,
                                                        pertanyaan: rows.item(i).title,
                                                        seq: i + 1

                                                    });
                                                }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            entry_id: rows.item(i).entry_id,
                                                            delete_catatan: true
                                                        })
                                                    }}>
                                                    <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                        <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='video-outline' />
                                                        <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Layout>
                                        )


                                }





                            }
                            if (this.catatan_text.length > 0 || this.catatan_voice.length > 0 || this.catatan_video.length > 0)
                                this.jurnal.push(
                                    <View key={"Catatan"}>
                                        <Text category='h5'>
                                            Catatan
                                        </Text></View>
                                )
                            if (this.catatan_text.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"catatan text"}>
                                        {this.catatan_text}
                                    </View>
                                )
                            if (this.catatan_voice.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"catatan voice"}>
                                        {this.catatan_voice}
                                    </View>
                                )
                            if (this.catatan_video.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"catatan video"}>
                                        {this.catatan_video}
                                    </View>
                                )
                            if (this.catatan_alkitab_text.length > 0 || this.catatan_alkitab_voice.length > 0 || this.catatan_alkitab_video.length > 0)
                                this.jurnal.push(
                                    <View key={"Catatan Alkitab"}>
                                        <Text category='h5'>
                                            Catatan Alkitab
                                        </Text></View>
                                )
                            if (this.catatan_alkitab_text.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"catatan alkitab text"}>
                                        {this.catatan_alkitab_text}
                                    </View>
                                )
                            if (this.catatan_alkitab_voice.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"catatan alkitab voice"}>
                                        {this.catatan_alkitab_voice}
                                    </View>
                                )
                            if (this.catatan_alkitab_video.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"catatan alkitab video"}>
                                        {this.catatan_alkitab_video}
                                    </View>
                                )
                            if (this.write_answers.length > 0 || this.voice_answers.length > 0 || this.video_answers.length > 0)
                                this.jurnal.push(
                                    <View key={"Pertanyaan dan Jawaban"}>
                                        <Text category='h5'>
                                            Pertanyaan dan Jawaban
                                        </Text></View>
                                )

                            if (this.write_answers.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"write_answer_header"}>
                                        {this.write_answers}
                                    </View>
                                )

                            if (this.voice_answers.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"voice_answer_header"}>
                                        {this.voice_answers}
                                    </View>

                                )
                            if (this.video_answers.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"video_answer_header"}>
                                        {this.video_answers}
                                    </View>
                                )

                            if (this.renungan_text.length > 0 || this.renungan_voice.length > 0 || this.renungan_video.length > 0)
                                this.jurnal.push(
                                    <View key={"Renungan"}>
                                        <Text category='h5'>
                                            Renungan
                                        </Text></View>
                                )
                            if (this.renungan_text.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"write_renungan"}>
                                        {this.renungan_text}
                                    </View>
                                )

                            if (this.renungan_voice.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"voice_renungan"}>
                                        {this.renungan_voice}
                                    </View>

                                )
                            if (this.renungan_video.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"video_renungan"}>
                                        {this.renungan_video}
                                    </View>
                                )

                            if (this.komitmen_text.length > 0 || this.komitmen_voice.length > 0 || this.komitmen_video.length > 0)
                                this.jurnal.push(
                                    <View key={"Komitmen"}>
                                        <Text category='h5'>
                                            Komitmen
                                        </Text></View>
                                )
                            if (this.komitmen_text.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"write_komitmen"}>
                                        {this.komitmen_text}
                                    </View>
                                )

                            if (this.komitmen_voice.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"voice_komitmen"}>
                                        {this.komitmen_voice}
                                    </View>

                                )
                            if (this.komitmen_video.length > 0)
                                this.jurnal.push(
                                    <View style={{ paddingVertical: 5 }} key={"video_komitmen"}>
                                        {this.komitmen_video}
                                    </View>
                                )


                            this.setState(
                                {
                                    isLoading: true, jurnal: this.jurnal
                                }
                            );
                        }
                    }
                    )
                }
                )
            }
        }
        this.setState(
            {
                isLoading: true
            },
            () => {

            }
        );
    }
    PersonalDiary(date) {
        let sql = "";
        if (date == "")
            sql = 'SELECT * from journal WHERE level = 2 AND parent_id = ' + this.entry_id_1 + ' ORDER BY entry_id';
        else
            sql = "SELECT * from journal WHERE upd_date = '" + date + "' AND level = 2 AND parent_id = " + this.entry_id_1 + " ORDER BY entry_id"
        global.db.transaction(tx => {
            tx.executeSql(sql, [], (tx, results) => {
                const rows = results.rows;
                this.jurnal = [];
                console.log(rows.length)
                console.log("Haha")
                if (rows.length == 0) {
                    this.setState(
                        {
                            isLoading: true, jurnal: this.jurnal
                        }
                    );

                }
                else {
                    console.log("Jumlah ROws : " + rows.length)

                    this.diary_text = [];
                    this.diary_voice = [];
                    this.diary_video = [];
                    for (let i = 0; i < rows.length; i++) {


                        let title = rows.item(i).title;

                        if (rows.item(i).journal_type == 6) {
                            if (rows.item(i).content_type == 1)
                                this.diary_text.push(
                                    <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"write komitmen" + i}>
                                        <TouchableOpacity style={{ marginRight: 5 }}
                                            onLongPress={() => {
                                                this.setState({
                                                    entry_id: rows.item(i).entry_id,
                                                    delete_catatan: true
                                                })
                                            }}
                                            onPress={() => {
                                                const { navigate } = this.props.navigation;
                                                navigate("Journaling", {
                                                    entry_id: rows.item(i).entry_id,
                                                    entry_text: rows.item(i).entry_text,
                                                    pertanyaan: rows.item(i).title,
                                                    journal_type: 6,
                                                    content_type: 1,
                                                });
                                            }}>
                                            {rows.item(i).title != "" && (
                                                <Text category="p1" >
                                                    {rows.item(i).title}
                                                </Text>
                                            )}

                                            <Text style={{ paddingHorizontal: 5 }} category="p1" >
                                                {rows.item(i).entry_text}
                                            </Text>
                                        </TouchableOpacity>
                                    </Layout>
                                )

                            if (rows.item(i).content_type == 2)
                                this.diary_voice.push(
                                    <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"voice_komitmen" + i}>

                                        <TouchableOpacity onPress={() => {
                                            const { navigate } = this.props.navigation;
                                            navigate("Journaling", {
                                                entry_id: rows.item(i).entry_id,
                                                voice_path: rows.item(i).entry_voice_path,
                                                content_id: this.content_id,
                                                session_id: this.session_id,
                                                segment_seq: this.segment_seq,
                                                content_type: 2,
                                                title: this.title,
                                                pertanyaan: rows.item(i).title,
                                                journal_type: 6,
                                            });
                                        }}
                                            onLongPress={() => {
                                                this.setState({
                                                    entry_id: rows.item(i).entry_id,
                                                    delete_catatan: true
                                                })
                                            }}>
                                            <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='mic-outline' />
                                                <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Layout>
                                )
                            if (rows.item(i).content_type == 3)
                                this.diary_video.push(
                                    <Layout level="4" style={{ padding: 5, margin: 5, borderRadius: 15, marginRight: 5, marginBottom: 5 }} key={"video_komitmen" + i}>

                                        <TouchableOpacity onPress={() => {
                                            const { navigate } = this.props.navigation;
                                            navigate("Journaling", {
                                                entry_id: rows.item(i).entry_id,
                                                video_path: rows.item(i).entry_video_path,
                                                content_id: this.content_id,
                                                session_id: this.session_id,
                                                segment_seq: this.segment_seq,
                                                content_type: 3,
                                                title: this.title,
                                                pertanyaan: rows.item(i).title,
                                                journal_type: 6,

                                            });
                                        }}
                                            onLongPress={() => {
                                                this.setState({
                                                    entry_id: rows.item(i).entry_id,
                                                    delete_catatan: true
                                                })
                                            }}>
                                            <View style={{ flexDirection: "row", margin: 5, flexWrap: "nowrap", flex: 1 }}>
                                                <Icon style={{ flex: 1, paddingTop: 15 }} width="24" height="24" fill='gray' name='video-outline' />
                                                <Text style={{ flex: 9, }}>{" "}{title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Layout>
                                )


                        }





                    }
                    if (this.diary_text.length > 0 || this.diary_voice.length > 0 || this.diary_video.length > 0)
                        this.jurnal.push(
                            <View key={"Catatan"}>{
                                this.state.date_filter != "" && (
                                    <Text category='h5'>
                                        {"Diary Pribadi - "}{moment(this.state.date_filter).format("DD MMM YYYY").toString()}
                                    </Text>
                                )}
                                {this.state.date_filter == "" && (
                                    <Text category='h5'>
                                        {"Diary Pribadi "}
                                    </Text>
                                )}
                            </View>
                        )
                    this.jurnal.push(
                        <View style={{ paddingVertical: 5 }} key={"catatan text"}>
                            {this.diary_text}
                        </View>
                    )
                    this.jurnal.push(
                        <View style={{ paddingVertical: 5 }} key={"catatan voice"}>
                            {this.diary_voice}
                        </View>
                    )
                    this.jurnal.push(
                        <View style={{ paddingVertical: 5 }} key={"catatan video"}>
                            {this.diary_video}
                        </View>
                    )
                    if (this.diary_text.length == 0 && this.diary_voice.length == 0 && this.diary_video.length == 0 && this.catatan_alkitab_text.length == 0 && this.catatan_alkitab_voice.length == 0 && this.catatan_alkitab_video.length == 0)
                        this.simplified = false;
                    else
                        this.simplified = true;

                    this.setState(
                        {
                            isLoading: true, jurnal: this.jurnal
                        }
                    );
                }
            }
            )
        }
        )
    }
}



export default JournalingsScreen;
