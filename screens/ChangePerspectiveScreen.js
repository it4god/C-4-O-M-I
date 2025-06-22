import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Linking } from "react-native";
import {
    Icon,
    Layout,
    TopNavigation,
    Divider,
    Text,
    Button, Card, Modal

} from '@ui-kitten/components';
import VerticalSlider from 'rn-vertical-slider';
//import Sound from 'react-native-sound';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import changeperspectivedata from '../common/changeperspectivedata'
import {
    Capability, AppKilledPlaybackBehavior,
    RepeatMode,
} from 'react-native-track-player';

export default class ChangePerspectiveScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            value: 5,
            data: [],
            modalvisible: true
        }
    }
    async componentDidMount() {
        this.screenname = this.props.route.params.screenname;
        this.toscreen = this.props.route.params.toscreen

        this.status = this.props.route.params.status
        this.position = 1
        this.Play()

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
        for (let i = 0; i < 5; i++) {
            this.playurl = "https://nepho.id/c4omi/mp3/peace.mp3"
            this.playurl = "https://limpingen.org/peace.mp3"
            console.log("This playurl : " + this.playurl)
            if (i == Number(this.position))
                this.AudioUrl = this.playurl
            this.episode.push({
                "id": i.toString(),
                "title": "When Peace like a river",
                "url": this.playurl,
                "artwork": 'https://nepho.id/c4omi.jpg'
            })

            await global.MyTrackPlayer.add(this.episode)
            await global.MyTrackPlayer.skip(Number(this.position))
        }
        this.setState({ playingTitle: "Run", data: this.shuffle(changeperspectivedata) })
        await global.MyTrackPlayer.play()
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
    get pagination () {

        return (
            <Pagination
              dotsLength={31}
              activeDotIndex={this.state.index}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 4,
                  height: 4,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }
    render() {
        return (
            <Layout style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    title={this.screenname}
                    subtitle='Coping Strategy'
                    accessoryLeft={(props) => (
                        <React.Fragment>
                            <TouchableOpacity onPress={async () => { await global.MyTrackPlayer.stop(); this.props.navigation.pop() }}>
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
                            <TouchableOpacity onPress={() => { this.setState({ modalvisible: true }) }}>
                                <Icon
                                    style={styles.icon}
                                    fill='#8F9BB3'
                                    name='info-outline'
                                />
                            </TouchableOpacity>
                        </React.Fragment>
                    )}
                />
                <Divider />
                <Modal visible={this.state.modalvisible}>
                    <Card style={{ margin: 12 }}>
                        <Text style={{ marginBottom: 10 }} category="s1">Mengubah cara berpikir dapat mengubah bagaimana Anda merasakan. Konsentrasi dan renungkan 31 pesan berikut yang akan menolong merubah pola pikir Anda.</Text>
                        <Button onPress={() => this.setState({ modalvisible: false })}>
                            Close
                        </Button>
                    </Card>
                </Modal>
                <Layout style={{ flex: 1, paddingTop: 10 }}>
                    <Carousel
                        loop={true}
                        style={styles.container}
                        layout="default"
                        layoutCardOffset={9}
                        data={this.state.data}
                        renderItem={CarouselCardItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        onSnapToItem={(index) => this.setState({ index: index })}
                        useScrollView={true}
                    />
                </Layout>
                <View style={{ flexDirection: 'column-reverse' }}>
                    <Button style={{ marginHorizontal: 30, borderRadius: 5, marginBottom: 10 }} onPress={async () => {
                        await global.MyTrackPlayer.stop()
                        this.props.navigation.replace("StressLevel", {
                            screenname: 'After Change Perspective',
                            toscreen: 'CopingSkillScreen',
                            status: 'After Change Perspective',
                            nextbutton: 'End',
                        })
                    }} size="small" accessoryRight={(props) => (
                        <Icon width="24" height="24" fill={'#fff'} {...props} name='arrow-forward-outline' />
                    )}><Text style={{}}>{"Next"}</Text></Button>
                    {this.state.index == 100 && (
                        <Button disabled={true} style={{ marginHorizontal: 30, borderRadius: 5, marginBottom: 10 }} onPress={async () => {
                            await global.MyTrackPlayer.stop()
                            this.props.navigation.replace("StressLevel", {
                                screenname: 'After Change Perspective',
                                toscreen: 'CopingSkillScreen',
                                status: 'After Change Perspective',
                                nextbutton: 'End',
                            })

                        }} size="small" accessoryRight={(props) => (
                            <Icon width="24" height="24" fill={'#fff'} {...props} name='arrow-forward-outline' />
                        )}><Text style={{}}>{"Next"}</Text></Button>
                    )}

                </View>
            </Layout >

        );
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
/*
 renderIndicator={() => (
                                <View
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius:50,
                                        marginLeft:50,
                                        backgroundColor: '#007B7F',
                                        justifyContent: 'center',
                                        alignItems: 'center',
  screens/StressLevelScreen.js                                  }}
                                >
                                    <Text style={{ color: '#fff' }}>{this.state.value}</Text>
                                </View>
                            )}

*/