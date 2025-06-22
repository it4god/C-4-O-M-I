import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Linking, Share } from "react-native";
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
    Modal,
    Card,
    Button
} from '@ui-kitten/components';
//import Sound from 'react-native-sound';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuvisible: false,
            selectedIndex: 0
        }

        this.videourl = ""
    }
    async componentDidMount() {
        let api_url = "http://limpingen.org/api_url.php"
        await fetch(api_url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.api_url = responseJson[0].apikey
                this.videourl = this.api_url + "c4omi/c4omi-api/videos.php"
            });
        try {
            this.API_URL = await AsyncStorage.getItem('API_URL');
            if (this.API_URL !== null) {
                if (this.API_URL != this.api_url) {
                    await AsyncStorage.setItem('API_URL', this.api_url);
                    this.API_URL = this.api_url;
                    this.videourl = this.API_URL + "c4omi/c4omi-api/videos.php"
                }
            }
            else {
                await AsyncStorage.setItem('API_URL', this.api_url);
            }
            const cacheIntervalInHours = 24
            const cacheExpiryTime = new Date()
            cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours)
            const lastRequest = await AsyncStorage.getItem("lastRequest")
            console.log(this.videourl)
            if (lastRequest == null || Date(lastRequest) > cacheExpiryTime) {
                await fetch(this.videourl, {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then((responseJson) => {
                        this.data = responseJson
                        AsyncStorage.setItem("lastRequest", new Date());
                        AsyncStorage.setItem('videos', JSON.stringify(responseJson))
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        } catch (e) {
            // error reading value
        }
        Linking.getInitialURL().then((url) => {
            this.url = url;
            if (this.state.urlchange == false)
                this.setState({ urlchange: true })
            else
                this.setState({ urlchange: false })
            setTimeout(() => {
                this.url = "";
            }, 4000);
            this.DeepLinkingNavigate(this.url)
        })
        Linking.addEventListener('url', event => {
            this.DeepLinkingNavigate(event.url)
        })

        this.menuvisible = this.props.route.params?.menuvisible;
        this.setState({ menuvisible: this.menuvisible })
        this.bundle = []
        this.bundle.push(
            <Layout level="4" style={{ marginTop: 10, width: width - 30, borderRadius: 15, marginRight: 10, paddingBottom: 10 }} key={"Life Story - 6"}>
                <Layout level="4" style={{ width: width - 30 }}>
                    <TouchableOpacity style={{ flex: 5 }} onPress={() => { this.props.navigation.navigate("Bundles", { "article_bundle_id": 6 }) }}>
                        <Image onPress={() => { }} style={{ width: width - 30, height: (width - 30) * 9 / 16, borderTopLeftRadius: 7, borderTopRightRadius: 7 }} source={require('../assets/6.jpg')} />
                    </TouchableOpacity>
                </Layout>
                <Text style={{ flex: 5, paddingLeft: 10, paddingTop: 8 }} category="h6" >Life Story</Text>
                <Text style={{ flex: 5, paddingLeft: 10, }} category="p2">C4OMI Indonesia</Text>
            </Layout>
        )
        this.bundle.push(
            <Layout level="4" style={{ marginTop: 10, width: width - 30, borderRadius: 15, marginRight: 10, paddingBottom: 10 }} key={"Journey with Mental Illness - 5"}>
                <Layout level="4" style={{ width: width - 30 }}>
                    <TouchableOpacity style={{ flex: 5 }} onPress={() => { this.props.navigation.navigate("Bundles", { "article_bundle_id": 5 }) }}>
                        <Image onPress={() => { }} style={{ width: width - 30, height: (width - 30) * 9 / 16, borderTopLeftRadius: 7, borderTopRightRadius: 7 }} source={require('../assets/1.jpg')} />
                    </TouchableOpacity>
                </Layout>
                <Text style={{ flex: 5, paddingLeft: 10, paddingTop: 8 }} category="h6" >Journey with Mental Illness</Text>
                <Text style={{ flex: 5, paddingLeft: 10, }} category="p2">C4OMI Indonesia</Text>
            </Layout>
        )
        this.bundle.push(
            <Layout level="4" style={{ marginTop: 10, width: width - 30, borderRadius: 15, marginRight: 10, paddingBottom: 10 }} key={"Family Members as Caregivers - 4"}>
                <Layout level="4" style={{ width: width - 30 }}>
                    <TouchableOpacity style={{ flex: 5 }} onPress={() => { this.props.navigation.navigate("Bundles", { "article_bundle_id": 4 }) }}>
                        <Image onPress={() => { }} style={{ width: width - 30, height: (width - 30) * 9 / 16, borderTopLeftRadius: 7, borderTopRightRadius: 7 }} source={require('../assets/2.jpg')} />
                    </TouchableOpacity>
                </Layout>
                <Text style={{ flex: 5, paddingLeft: 10, paddingTop: 8 }} category="h6" >Family Members as Caregivers</Text>
                <Text style={{ flex: 5, paddingLeft: 10, }} category="p2">C4OMI Indonesia</Text>
            </Layout>
        )
        this.bundle.push(
            <Layout level="4" style={{ marginTop: 10, width: width - 30, borderRadius: 15, marginRight: 10, paddingBottom: 10 }} key={"Young Adult and Mental Illness - 3 "}>
                <Layout level="4" style={{ width: width - 30 }}>
                    <TouchableOpacity style={{ flex: 5 }} onPress={() => { this.props.navigation.navigate("Bundles", { "article_bundle_id": 3 }) }}>
                        <Image onPress={() => { }} style={{ width: width - 30, height: (width - 30) * 9 / 16, borderTopLeftRadius: 7, borderTopRightRadius: 7 }} source={require('../assets/3.jpg')} />
                    </TouchableOpacity>
                </Layout>
                <Text style={{ flex: 5, paddingLeft: 10, paddingTop: 8 }} category="h6" >Young Adult and Mental Illness</Text>
                <Text style={{ flex: 5, paddingLeft: 10, }} category="p2">C4OMI Indonesia</Text>
            </Layout>
        )
        this.bundle.push(
            <Layout level="4" style={{ marginTop: 10, width: width - 30, borderRadius: 15, marginRight: 10, paddingBottom: 10 }} key={"Kids and Mental Illness - 2"}>
                <Layout level="4" style={{ width: width - 30 }}>
                    <TouchableOpacity style={{ flex: 5 }} onPress={() => { this.props.navigation.navigate("Bundles", { "article_bundle_id": 2 }) }}>
                        <Image onPress={() => { }} style={{ width: width - 30, height: (width - 30) * 9 / 16, borderTopLeftRadius: 7, borderTopRightRadius: 7 }} source={require('../assets/4.jpg')} />
                    </TouchableOpacity>
                </Layout>
                <Text style={{ flex: 5, paddingLeft: 10, paddingTop: 8 }} category="h6" >Kids and Mental Illness</Text>
                <Text style={{ flex: 5, paddingLeft: 10, }} category="p2">C4OMI Indonesia</Text>
            </Layout>
        )

        this.bundle.push(
            <Layout level="4" style={{ marginTop: 10, width: width - 30, borderRadius: 15, marginRight: 10, paddingBottom: 10 }} key={"About Mental Illness - 1"}>
                <Layout level="4" style={{ width: width - 30 }}>
                    <TouchableOpacity style={{ flex: 5 }} onPress={() => { this.props.navigation.navigate("Bundles", { "article_bundle_id": 1 }) }}>
                        <Image onPress={() => { }} style={{ width: width - 30, height: (width - 30) * 9 / 16, borderTopLeftRadius: 7, borderTopRightRadius: 7 }} source={require('../assets/5.jpg')} />
                    </TouchableOpacity>
                </Layout>
                <Text style={{ flex: 5, paddingLeft: 10, paddingTop: 8 }} category="h6" >About Mental Illness</Text>
                <Text style={{ flex: 5, paddingLeft: 10, }} category="p2">C4OMI Indonesia</Text>
            </Layout>
        )

        this.shuffle(this.bundle)
        this.setState({ isloading: true })
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


    reverseString(str) {
        return str.split("").reverse().join("");
    }
    async DeepLinkingNavigate(url) {
        if (url != null)
            if (url.includes("c4omi://video_uri=")) {

                this.uri = url.replace("c4omi://video_uri=", "");
                this.uri = this.uri.replace("C4OMI-", "")
                this.uri = this.uri.replace("#Video", "")
                this.uri = this.reverseString(this.uri)


                url = this.API_URL + "c4omi/c4omi-api/video.php?video_uri=" + this.uri

                await fetch(url, {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then((responseJson) => {
                        this.data = responseJson
                        this.props.navigation.navigate("Video", {
                            title: this.data[0].title,
                            id: this.data[0].id,
                            youtube_id: this.uri,
                            category_id: this.data[0].category_id
                        })
                    })

            }
            else if (url.includes("c4omi://article_title=")) {
                this.uri = url.replace("c4omi://article_title=", "");
                url = this.API_URL + "c4omi/c4omi-api/article.php?article_title=" + this.uri
                await fetch(url, {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then((responseJson) => {
                        this.data = responseJson
                        for (let i = 0; i < this.data.length; i++) {
                            if (i == 0)
                                this.props.navigation.navigate("Article", {
                                    title: this.data[i].title,
                                    id: this.data[i].id,
                                    url: this.data[i].url,
                                })
                        }
                    });




            }
    }
    async Share() {

        this.message = 'Aplikasi Mobile *C4OMI*\n_Care for Overcomers on Mental Illness - Indonesia_\n\nAplikasi Informasi dan Edukasi seputar Mental Health di Indonesia\n- Ada ratusan lebih Video dengan subtitle Indonesia\n- Ada 70an lebih artikel \n- Ebooks \n- Link-link seputar komunitas dan info pemulihan / rehabilitasi di Indonesia\n- AI Konselor ( Chatbot Konseling )\n- Dukung karya GKM\nDll\n\nSilahkan Download di https://play.google.com/store/apps/details?id=com.it4god.c4omi'

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
        const date = new Date()
        return (
            <Layout style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    title='C4OMI Indonesia'
                    subtitle='Care for Overcomers on Mental Ilness'
                    accessoryLeft={(props) => (
                        <React.Fragment>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("DrawerMenu") }}>
                                <Icon
                                    style={styles.icon}
                                    fill='#8F9BB3'
                                    name='menu-2-outline'
                                />
                            </TouchableOpacity>
                        </React.Fragment>

                    )}
                    accessoryRight={(props) => (
                        <React.Fragment>
                            <TouchableOpacity onPress={() => { this.Share() }}>
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
                <ScrollView showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                >

                    <Layout style={{ padding: 15 }}>
                        <View style={{ flex: 1, paddingTop: 10 }}>
                            <Text category="s1" style={{ textAlign: "center", fontSize: 14 }}>{moment().format('MMMM Do YYYY, h:mm:ss a')}</Text>
                        </View>
                        <View style={{ flex: 1, paddingBottom: 10 }}>
                            <Text style={{ textAlign: "center" }} category="h5">Selamat Datang</Text>
                        </View>
                        <Image style={{ marginTop: 0, width: width - 40, height: (width - 40) / 5 }}
                            source={require('../assets/logo.png')}
                        />
                        <View style={{ height: 3 }}>

                        </View>
                        {this.bundle}
                    </Layout>
                </ScrollView >
              
                <BottomNavigation
                    appearance='noIndicator'
                    accessibilityIgnoresInvertColors={true}
                    selectedIndex={this.state.selectedIndex}
                    onSelect={async (index) => {
                        this.setState({ selectedIndex: index })
                        if (index == 0) {
                            this.props.navigation.navigate("Videos")
                        }
                        if (index == 1) {
                            this.props.navigation.navigate("Articles")
                        }
                        if (index == 2) {
                            this.props.navigation.navigate("PDFs")
                        }
                        if (index == 3) {
                            this.props.navigation.navigate("Event")
                        }
                        if (index == 4) {
                            this.setState({ menuvisible: true })
                        }
                        if (index == 5) {
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
                <Modal visible={this.state.menuvisible}>
                    <Card disabled={true}>
                        <Text style={{ textAlign: "center" }}>
                            Link-link
                        </Text>
                        <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.navigate("Links", { category_id: 1, luar_negeri: false }) }}>
                            Info, Edukasi dan Layanan Konseling - Rehabilitasi
                        </Button>
                        <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.navigate("Links", { category_id: 2, luar_negeri: false }) }}>
                            Platform Komunitas
                        </Button>
                        <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.navigate("Links", { category_id: 3, luar_negeri: false }) }}>
                            Platform Konseling Basis Apps
                        </Button>
                        <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.navigate("Links", { category_id: 1, luar_negeri: true }) }}>
                            Situs Luar Negeri
                        </Button>
                        <View style={{ paddingHorizontal: 50 }}>
                            <Button size="small" appearance='outline' style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }) }}>
                                Tutup
                            </Button>
                        </View>
                    </Card>
                </Modal>


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