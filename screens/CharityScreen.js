import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Dimensions, Image, FlatList, Linking, Share } from "react-native";
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
import moment from 'moment'



export default class CharityScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuvisible: false,
            selectedIndex: 0,
            serverData: [],
            fetching_from_server: false,
        }

        this.videourl = ""
        this.skip = 0
    }
    async componentDidMount() {


        let api_url = "http://limpingen.org/api_url.php"
        await fetch(api_url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.api_url = responseJson[0].apikey

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
        }
        catch (ee) {

        }
        let url_art_work = this.API_URL + "c4omi/c4omi-api/items.php?category=karya".replace(" ", "%20")
        console.log(url_art_work);
        await fetch(url_art_work, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.art_work = responseJson
            });
        let url_business = this.API_URL + "c4omi/c4omi-api/items.php?category=usaha".replace(" ", "%20")
        await fetch(url_business, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.business = responseJson
            });
        let url_service = this.API_URL + "c4omi/c4omi-api/items.php?category=jasa".replace(" ", "%20")
        await fetch(url_service, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.service = responseJson
            });

        let url_other = this.API_URL + "c4omi/c4omi-api/items.php?category=other".replace(" ", "%20")
        await fetch(url_other, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.other = responseJson
            });

        this.art_work = this.shuffle(this.art_work);
        this.business = this.shuffle(this.business);
        this.service = this.shuffle(this.service);
        this.other = this.shuffle(this.other)

        this.art_work_use = this.art_work
        this.business_use = this.business
        this.service_use = this.service

        this.menuvisible = this.props.route.params?.menuvisible;
        this.setState({ serverData: this.art_work.slice(0, 10) })
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
        this.skip = 0
        this.art_work_use = this.filterValuePart(this.art_work, this.state.searchvalue)
        this.business_use = this.filterValuePart(this.business, this.state.searchvalue)
        this.service_use = this.filterValuePart(this.service, this.state.searchvalue)
        if (this.state.selectedIndex == 0)
            this.setState({ serverData: this.art_work_use.slice(0, 8) })
        else if (this.state.selectedIndex == 1)
            this.setState({ serverData: this.business_use.slice(0, 8) })
        else if (this.state.selectedIndex == 2)
            this.setState({ serverData: this.service_use.slice(0, 8) })
    }
    filterValuePart(arr, part) {
        part = part.toLowerCase()

        return arr.filter((obj) => {
            return Object.keys(obj)
                .some((k) => {
                    return obj[k].toLowerCase().indexOf(part) !== -1;
                });
        });
    }

    render() {
        const date = new Date()
        const toggleSearch = () => {
            this.DoSearch()
        };

        return (
            <Layout style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    title='C4OMI Indonesia'
                    subtitle='Love and Support'
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
                    accessoryRight={(props) => (
                        <React.Fragment>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("DisclaimerGKM") }}>
                                <Icon
                                    style={styles.icon}
                                    fill='#8F9BB3'
                                    name='heart-outline'
                                />
                            </TouchableOpacity>
                            <View style={{ width: 10 }}></View>
                            <TouchableOpacity onPress={() => { this.setState({ search: true }) }}>
                                <Icon
                                    style={styles.icon}
                                    fill='#8F9BB3'
                                    name='search-outline'
                                />
                            </TouchableOpacity>
                        </React.Fragment>
                    )}
                />
                <Divider />

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
                <FlatList
                    data={this.state.serverData}
                    numColumns={2}
                    keyExtractor={(item) => Math.random()}
                    renderItem={({ index, item }) => (
                        <View key={Math.random()} style={{ marginBottom: 10 }}>
                            <View style={[styles.gridItem, {}]}>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.props.navigation.navigate("Item", { item_id: item.item_id }) }}>
                                    <Image resizeMode="stretch" onPress={() => { }} style={{ width: width / 2 - 10, height: width / 2 - 10 }} source={{ uri: this.API_URL + "admin/public/assets/uploads/files/itemphoto/" + item.thumbnail }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ flex: 5, fontWeight: "bold", paddingLeft: 10, }} category="p2" >{item.item_name}</Text>
                            <Text style={{ flex: 5, paddingLeft: 10, }} category="p2">{item.fullname}</Text>
                            <Text style={{ flex: 5, paddingLeft: 10, fontWeight: "bold" }} category="p2">{item.price}</Text>
                        </View>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}
                    ListFooterComponent={this.renderFooter.bind(this)}
                />
                <BottomNavigation
                    accessibilityIgnoresInvertColors={true}
                    selectedIndex={this.state.selectedIndex}
                    onSelect={async (index) => {
                        this.setState({ selectedIndex: index, serverData: [] })
                        this.skip = 0
                        if (index == 0) {
                            this.setState({ serverData: this.art_work })
                        }
                        if (index == 1) {
                            this.setState({ serverData: this.business })
                        }
                        if (index == 2) {
                            this.setState({ serverData: this.service })
                        }
                        if (index == 3) {

                        }

                    }}>
                    <BottomNavigationTab title={"Karya / Seni"} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'color-palette-outline'} />} />
                    <BottomNavigationTab title={"Usaha"} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'car-outline'} />} />
                    <BottomNavigationTab title={"Jasa"} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'award-outline'} />} />
                </BottomNavigation>
            </Layout >

        );
    }
    loadMoreData = () => {
        this.page = 10;
        this.skip = this.skip + this.page;
        this.setState({ fetching_from_server: true }, () => {
            let list_new = []
            switch (this.state.selectedIndex) {
                case 0:
                    this.art_work_use.slice(this.skip, this.skip + 8)
                    break;
                case 1:
                    this.business_use.slice(this.skip, this.skip + 8)
                    break;
                case 2:
                    this.service_use.slice(this.skip, this.skip + 8)
                    break;
                case 3:
                    this.other_use.slice(this.skip, this.skip + 8)
                    break
                default:

            }


            this.timer = setTimeout(() => {
                this.setState({
                    serverData: [...this.state.serverData, ...list_new],
                    fetching_from_server: false,
                })
                    , 1500
            });

        });
    };
    renderFooter() {
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this.loadMoreData}
                    style={{
                        padding: 10,
                        borderRadius: 4,
                        backgroundColor: "blue",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20
                    }}
                >
                    <Text style={styles.btnText}>Load More</Text>
                    {this.state.fetching_from_server ? (
                        <ActivityIndicator color="blue" style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
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

    }, textStyling: {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'black'
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'

    },
    separator: {
        height: 1,

    },
    button: {
        flex: 1
    },
    gridItem: {
        flex: 1,
        margin: 5,
        height: width / 2 - 10,
        backgroundColor: 'white',
        borderRadius: 4,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    btnText: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
    footer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
})