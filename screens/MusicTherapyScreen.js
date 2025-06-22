import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
    Share,
    ScrollView
} from "react-native";
import * as eva from '@eva-design/eva';
import { MenuItem, Layout, TopNavigation, Divider, Text, Card, Button, Menu as UKMenu, TopNavigationAction, Icon, OverflowMenu, Select, SelectItem } from '@ui-kitten/components';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {
    Capability, AppKilledPlaybackBehavior,
    RepeatMode, Event
} from 'react-native-track-player';

music_type = [
    {
        "id": 1, "type": "All Type of Music"
    },
    {
        "id": 2, "type": "Nature Relaxation Music"
    },
    {
        "id": 3, "type": "Deep Sleep Music"
    },
    {
        "id": 4, "type": "Enjoyment & Relaxing Music"
    },
    {
        "id": 5, "type": "Meditative & Peaceful Music"
    },
]

nature = [
    {
        "id": 1, "title": "Nature Background Sound", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Nature Background Sound.mp3"
    },
    {
        "id": 2, "title": "Nature White Noise", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Nature White Noise.mp3"
    },
    {
        "id": 3, "title": "Waterfall", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Waterfall.mp3"
    }
]

sleep = [
    {
        "id": 4, "title": "Rain Music Therapy", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Rain Music Therapy.mp3"
    },
    {
        "id": 5, "title": "Rain & Thunder", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Rain and Thunder.mp3"
    },
    {
        "id": 6, "title": "Zelda Lullaby", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Zelda Lullaby.mp3"
    },
    {
        "id": 7, "title": "Baby Bach Air", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Bach Baby Air.mp3"
    }
]

enjoyment = [
    {
        "id": 8, "title": "Chopin - Nocturne op.9 No.2", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Nocturne Chopin.mp3"
    },
    {
        "id": 9, "title": "Vivaldi - Winter, Ii Largo", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Winter Vivaldi.mp3"
    },
    {
        "id": 10, "title": "Pachelbel - Canon", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Canon Pachebel.mp3"
    }
]

meditative = [
    {
        "id": 11, "title": "Taize Instrumental", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Bless the Lord.mp3"
    },
    {
        "id": 12, "title": "When peace like a river", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/When Peace Like A River Piano.mp3"
    }
]

all = [
    {
        "id": 1, "title": "Nature Background Sound", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Nature Background Sound.mp3"
    },
    {
        "id": 2, "title": "Nature White Noise", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Nature White Noise.mp3"
    },
    {
        "id": 3, "title": "Waterfall", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Waterfall.mp3"
    },
    {
        "id": 4, "title": "Rain Music Therapy", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Rain Music Therapy.mp3"
    },
    {
        "id": 5, "title": "Rain & Thunder", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Rain and Thunder.mp3"
    },
    {
        "id": 6, "title": "Zelda Lullaby", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Zelda Lullaby.mp3"
    },
    {
        "id": 7, "title": "Baby Bach Air", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Bach Baby Air.mp3"
    },
    {
        "id": 8, "title": "Chopin - Nocturne op.9 No.2", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Nocturne Chopin.mp3"
    },
    {
        "id": 9, "title": "Vivaldi - Winter, Ii Largo", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Winter Vivaldi.mp3"
    },
    {
        "id": 10, "title": "Pachelbel - Canon", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Canon Pachebel.mp3"
    },
    {
        "id": 11, "title": "Taize Instrumental", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/Bless the Lord.mp3"
    },
    {
        "id": 12, "title": "When peace like a river", "mp3": "https://nepho.id/c4omi/mp3/music_therapy/When Peace Like A River Piano.mp3"
    }
]

import Slider from '@react-native-community/slider';
import { getAllExternalFilesDirs } from "react-native-fs";
import { NativeGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/nativeGesture";
class MusicTherapyScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalvisible: false,
            modalvisible2: false,
            modalnext: false,
            paused: true,
            orientation: '',
            activeIndex: 0,
            activeSlide: 0,
            selectedIndex: 0,
            entries: [],
            myplaylist: '',
            descriptiontextshown: false,
            desctextshown: false,
            index: 0,
            isloading: false,
            resolution: 'auto',
            play: false,
            selectedCategory: 0
        }
        this.currentTime = 0;
        this.playvideo = true
        this.VideoUrl = ""
        this.AudioUrl = ""
        this.LatestTime = 0;
        this.transitionvideo = false
        this.next = false
        this.htmlContent = ""
    }


    async componentDidMount() {
        this.position = 0
        this.album_id = 1
        await this.shuffle_data()
        this.data = all
        await this.Play()
    };
    async shuffle_data() {
        this.shuffle(all)
        this.shuffle(sleep)
        this.shuffle(nature)
        this.shuffle(enjoyment)
        this.shuffle(meditative)
    }
    shuffle(array) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }
    async Play() {

        this.episode = []
        await global.MyTrackPlayer.reset()
        await global.MyTrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior:
                    AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
            ],
            progressUpdateEventInterval: 2,
        });
        for (let i = 0; i < this.data.length; i++) {

            this.episode.push({
                "id": this.data[i].id,
                "title": this.data[i].title,
                "url": this.data[i].mp3,
                "artwork": 'https://nepho.id/c4omi.jpg'
            })


        }
        await global.MyTrackPlayer.add(this.episode)
        await global.MyTrackPlayer.skip(Number(this.position))
        this.song_title = this.data[0].title
        this.id = this.data[0].id
        let trackIndex = await global.MyTrackPlayer.getCurrentTrack();
        let trackObject = await global.MyTrackPlayer.getTrack(trackIndex);
        this.id = trackObject.id
        const interval = setInterval(async () => {

            this.progress = await global.MyTrackPlayer.getProgress()

            let trackIndex = await global.MyTrackPlayer.getCurrentTrack();
            let trackObject = await global.MyTrackPlayer.getTrack(trackIndex);
            if (this.id != trackObject.id) {
                this.id = trackObject.id
                this.song_title = trackObject.title
            }
            this.setState({ progress: this.progress.position, duration: this.progress.duration })
        }, 1000);

        this.setState({ playingTitle: "Run" })
    }

    TimeConvert(second) {
        second = Number(second)
        let h = Math.floor(second / 3600);
        let m = Math.floor(second % 3600 / 60);
        let s = Math.floor(second % 3600 % 60);
        if (m.toString().length == 1)
            m = "0" + m.toString()
        if (s.toString().length == 1)
            s = "0" + s.toString()

        if (h > 0) {

            return h.toString() + ":" + m.toString() + ":" + s.toString()
        }
        else {
            return m.toString() + ":" + s.toString()
        }
    }
    async Share() {

        this.message = ''

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
        this.progress = global.MyTrackPlayer.getProgress().position
        this.duration = global.MyTrackPlayer.getProgress().duration

        //console.log(global.MyTrackPlayer.getCurrentTrack().id)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' }} level='1'>
                    <TopNavigation
                        alignment='center'
                        title='C4OMI Indonesia'
                        subtitle='Music Therapy'
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

                            </React.Fragment>
                        )}
                    />
                    <Divider />
                    <View style={{ flex: 0.22 }}>
                        {true && (
                            <View style={{
                                alignSelf: "stretch",
                            }}>
                                <Select
                                    style={{ margin: 5 }}
                                    selectedIndex={this.state.selectedCategory}
                                    onSelect={async (index) => {

                                        if (index == 1) {
                                            this.position = 0
                                            this.data = all
                                        }
                                        else if (index == 2) {
                                            this.position = 0
                                            await this.shuffle_data()
                                            this.data = nature
                                        }
                                        else if (index == 3) {
                                            this.position = 0
                                            await this.shuffle_data()
                                            this.data = sleep
                                        }
                                        else if (index == 4) {
                                            this.position = 0
                                            await this.shuffle_data()
                                            this.data = enjoyment
                                        }
                                        else if (index == 5) {
                                            this.position = 0
                                            await this.shuffle_data()
                                            this.data = meditative
                                        }
                                        await this.Play()
                                        
                                        this.setState({ selectedCategory: index, play : false })
                                    }
                                    }
                                    value={this.state.selectedCategory == 0 ? 'All Type of Music' : music_type[Number(this.state.selectedCategory) - 1].type}
                                >
                                    <SelectItem title='All Type of Music' />
                                    <SelectItem title='Nature Relaxation Music' />
                                    <SelectItem title='Deep Sleep Music' />
                                    <SelectItem title='Enjoyment & Relaxing Music' />
                                    <SelectItem title='Meditative & Peaceful Music' />
                                </Select>
                                <Image style={{ width: width, height: width * 1.1 }} source={{ uri: "https://nepho.id/c4omi/mp3/music_therapy/" + this.id + ".jpeg" }} />
                                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                                    <Text>{this.song_title}</Text>
                                </View>
                                <Slider
                                    style={styles.progressBar}
                                    value={this.state.progress}
                                    minimumValue={0}
                                    maximumValue={this.state.duration}
                                    thumbTintColor="blue"
                                    minimumTrackTintColor="blue"
                                    maximumTrackTintColor="lightblue"
                                    onSlidingComplete={async value => await global.MyTrackPlayer.seekTo(value)}
                                />
                                <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15 }}>
                                    <View style={{ flex: 0.5, flexDirection: "row" }}>
                                        <Text category={"c2"} style={{ color: "#BAC3CE" }}>{this.TimeConvert(this.state.progress)}</Text>
                                    </View>
                                    <View style={{ flex: 0.5, flexDirection: "row-reverse" }}>
                                        <Text category={"c2"} style={{ color: "#BAC3CE" }}>{this.TimeConvert(this.state.duration)}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 5, justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 50 }}>
                                    <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                                        this.position--
                                        if (this.position < 0) this.position++
                                        this.song_title = this.data[Number(this.position)].title
                                        this.id = this.data[Number(this.position)].id
                                        this.setState({ playingTitle: this.song_title })
                                        await global.MyTrackPlayer.skip(Number(this.position))
                                        await global.MyTrackPlayer.play()
                                        this.setState({ play: true })

                                    }}>
                                        <Image style={{ width: 40, height: 40 }} source={require('../assets/images/previous.jpg')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                                        let position = this.state.progress - 10
                                        if (position < 0)
                                            position = 0
                                        await global.MyTrackPlayer.seekTo(position)


                                    }}>
                                        <Image style={{ width: 40, height: 40, }} source={require('../assets/images/back10.jpg')} />
                                    </TouchableOpacity>
                                    {this.state.play == true && (
                                        <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                                            this.setState({ play: false })
                                            await global.MyTrackPlayer.stop()
                                        }}>
                                            <Image style={{ width: 70, height: 70 }} source={require('../assets/images/stopplay.jpg')} />
                                        </TouchableOpacity>
                                    )}
                                    {this.state.play == false && (
                                        <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                                            this.setState({ play: true })

                                            await global.MyTrackPlayer.play()

                                        }}>
                                            <Image style={{ width: 70, height: 70 }} source={require('../assets/images/playcontinue.jpg')} />
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                                        let position = this.state.progress + 10
                                        if (position > this.state.duration)
                                            position = 0
                                        await global.MyTrackPlayer.seekTo(position)
                                    }}>
                                        <Image style={{ width: 40, height: 40, alignItems: "center" }} source={require('../assets/images/next10.jpg')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                                        this.position++
                                        if (this.position >= this.data.length) this.position--
                                        this.song_title = this.data[Number(this.position)].title
                                        this.id = this.data[Number(this.position)].id
                                        this.setState({ playingTitle: this.song_title })
                                        await global.MyTrackPlayer.skip(Number(this.position))
                                        await global.MyTrackPlayer.play()
                                        this.setState({ play: true })

                                    }}>
                                        <Image style={{ width: 40, height: 40 }} source={require('../assets/images/next.jpg')} />
                                    </TouchableOpacity>
                                </View>



                            </View>
                        )}
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
export default MusicTherapyScreen;
