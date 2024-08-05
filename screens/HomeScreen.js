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
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuvisible: false,
            selectedIndex: 0
        }
    }
    async componentDidMount() {
        let api_url = "http://limpingen.org/api_url.php"
        await fetch(api_url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.api_url = responseJson[0].apikey
                console.log(this.api_url)
            });
        try {
            this.API_URL = await AsyncStorage.getItem('API_URL');
            if (this.API_URL !== null) {
                if (this.API_URL != this.api_url) {
                    await AsyncStorage.setItem('API_URL', this.api_url);
                    this.API_URL = this.api_url;
                }
            }
            else {
                await AsyncStorage.setItem('API_URL', this.api_url);
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
                this.props.navigation.navigate("Video", {
                    youtube_id: this.uri.trim(),
                })
            }
            else if (url.includes("c4omi://article_title=")) {
                this.uri = url.replace("c4omi://article_title=", "");
                url = this.API_URL+ "c4omi/api-v2/article.php?article_title=" + this.uri
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

        this.message = 'Aplikasi Mobile C4OMI\n\nSilahkan Download di https://play.google.com/store/apps/details?id=com.it4god.c4omi'

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
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={{
                                    borderRadius: 5,
                                    width: 120,
                                    height: 120,
                                    alignItems: "center",
                                }}
                                source={require("../assets/c4omi.jpg")}
                            />
                        </View>
                        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                            Apa itu C4OMI ?
                        </Text>
                        <Text style={{ textAlign: "justify" }}>
                            {"\n"}
                            • C40MI adalah Komunitas Akar Rumput dari Keluarga-keluarga dan Individu-individu yang terdampak oleh GKM (Gangguan Kesehatan Mental), sehingga mereka tidak sendirian, tetapi belajar saling menerima, mendukung, mengobarkan harapan, memberdayakan, bahkan berkarya, berdampak bagi sesama.
                            {"\n"}
                            • C4OMI memberikan penyuluhan, pendampingan, pembelaan (advocacy) agar mereka belajar membangun kehidupan yang sehat, seimbang, berkualitas, dan dihormati, tanpa diskriminasi dan stigma.
                            {"\n"}
                            • C4OMI membangun jejaring narasumber dan informasi bantuan konsultasi, perawatan, pengobatan yang bisa diakses dan digunakan bagi mereka yang membutuhkan.
                            {"\n"}
                        </Text>
                        <Image style={{ marginTop: 20, width: width - 40, height: (width - 40) / 5 }}
                            source={require('../assets/logo.png')}
                        />
                    </Layout>
                </ScrollView >
                <Divider />
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
                            this.props.navigation.navigate("ChatClient")
                        }
                        if (index == 6) {
                            this.props.navigation.navigate("AIKonselor")
                        }
                    }}>
                    <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'video-outline'} />} />
                    <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'book-open-outline'} />} />
                    <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'book-outline'} />} />
                    <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'calendar-outline'} />} />
                    <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'link-outline'} />} />
                    <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'message-circle-outline'} />} />
                    <BottomNavigationTab title={""} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'message-square-outline'} />} />

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