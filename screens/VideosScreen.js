import React, { Component } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback } from "react-native";
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
    Input,
    Modal, Card, Button

} from '@ui-kitten/components';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImageView from "./ImageView";
import ImageView2 from "./ImageView2";
export default class VideosScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            video: [],
            video2: [],
            page: 1,
            search: false,
            searchvalue: '',
            menuvisible: false
        }
        this.myvideo = []
        this.myvideodetail = []
        this.myvideo2 = []
    }

    async componentDidMount() {
        try {
            this.API_URL = await AsyncStorage.getItem('API_URL');
            if (this.API_URL !== null) {
                this.DoGenerateVideo("")
            }
            else {
                await AsyncStorage.setItem('API_URL', this.api_url);
            }
        } catch (e) {
            // error reading value
        }

    }

    async DoGenerateVideo(searchvalue) {


        this.myvideo = []
        this.myvideodetail = []
        this.myvideo2 = []
        let url = "";
        /*

*/

        const videos = await AsyncStorage.getItem('videos')
        if (videos && searchvalue == "") {
            try {
                this.data = JSON.parse(videos)
                console.log("Here")
            } catch (e) {
                console.warn("fetch Error: ", error)
            }

        }
        else
        {
            if (searchvalue == "")
                url = this.API_URL + "c4omi/api-v3/videos.php"
            else
                url = this.API_URL + "c4omi/api-v3/videos.php?keyword=" + searchvalue
    
            await fetch(url, {
                method: 'GET',
            })
                .then(response => response.json())
                .then((responseJson) => {
                    this.data = responseJson
    
                });
        }
        let n = 0
        let category = []
        let category_name = []
        for (let i = 0; i < this.data.length; i++) {
            if (!category.includes(this.data[i].category_id)) {
                category.push(this.data[i].category_id)
                category_name.push(this.data[i].category_name)
            }

        }
        for (let i = 0; i < category.length; i++) {
            this.myvideodetail = []
            n = 0
            for (let j = 0; j < this.data.length; j++) {

                if (this.data[j].category_id == category[i]) {
                    n = n + 1

                    this.myvideodetail.push(
                        <TouchableOpacity style={{ flexWrap: "nowrap" }} key={j.toString() + category[i]} onPress={() => {
                            this.props.navigation.navigate("Video", {
                                title: this.data[j].title,
                                id: this.data[j].id,
                                youtube_id: this.data[j].youtube_id,
                                category_id: this.data[j].category_id,
                                thumbnail: this.data[j].thumbnail
                            })

                        }} >
                            <View style={{ flex: 1, width: 260, height: 10 / 16 * 280 }}>
                                {this.data[j].thumbnail == "app" && (
                                    <ImageView
                                        index={this.data[j].youtube_id}
                                    />
                                )}
                                {this.data[j].thumbnail != "app" && (
                                    <Image style={styles.box1}
                                        source={require('../assets/C4OMI-Logo.png')}
                                    />
                                )}
                                {this.data[j].title.length > 25 && (
                                    <View style={{ width: 260, flexDirection: "row", flexShrink: 1 }}>
                                        <Text category="p2" style={{ flex: 1, flexWrap: "wrap", paddingHorizontal: 8 }}>
                                            {this.data[j].title}
                                        </Text>
                                    </View>
                                )}
                                {this.data[j].title.length <= 25 && (
                                    <Text category="p2" style={{ paddingHorizontal: 8 }}>
                                        {this.data[j].title.substring(0, 25)}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    )

                }
                if (n > 20) break;

            }


            this.shuffle(this.myvideodetail)
            this.myvideodetail.push(
                <TouchableOpacity key={"More-Video" + i.toString()} onPress={() => {
                    this.myvideo2 = []
                    for (let j = 0; j < this.data.length; j++) {
                        if (this.data[j].category_id == category[i])
                            this.myvideo2.push(
                                <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={this.data[j].id} onPress={() => {
                                    this.props.navigation.navigate("Video", {
                                        title: this.data[j].title,
                                        id: this.data[j].id,
                                        youtube_id: this.data[j].youtube_id,
                                        category_id: this.data[j].category_id,
                                        thumbnail: this.data[j].thumbnail
                                    })
                                }} >

                                    {this.data[j].thumbnail == "app" && (
                                        <ImageView2
                                            index={this.data[j].youtube_id}
                                        />
                                    )}
                                    {this.data[j].thumbnail != "app" && (
                                        <Image style={styles.box1}
                                            source={require('../assets/C4OMI-Logo.png')}
                                        />
                                    )}
                                    <View style={{ width: 300, flexShrink: 1 }}>
                                        {this.data[j].title.length > 25 && (
                                            <Text category="p2" style={{ flexWrap: "wrap", paddingHorizontal: 8 }}>
                                                {this.data[j].title}
                                            </Text>
                                        )}
                                        {this.data[j].title.length <= 25 && (
                                            <Text category="p2" style={{ paddingHorizontal: 8 }}>
                                                {this.data[j].title.substring(0, 25)}
                                            </Text>
                                        )}
                                        <Text appearance='hint' style={{ paddingHorizontal: 8, fontSize: 12, }}>C4OMI Indonesia</Text>
                                        <Text style={{ paddingHorizontal: 8, fontSize: 12, fontStyle: "italic" }}>
                                            {this.data[j].category_name}
                                        </Text>
                                    </View>

                                </TouchableOpacity>)
                    }

                    this.setState({ video2: this.myvideo2, page: 2, category: category[i], category_name: category_name[i] })
                }} >
                    <View style={styles.boxmore}>

                    </View>
                </TouchableOpacity>
            )
            this.myvideo.push(
                <View key={i.toString() + "cat"}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text category="h6" style={{ flex: 8, marginTop: 10, marginBottom: 3, paddingLeft: 5 }}>{category_name[i]}</Text>
                        <TouchableOpacity style={{}} onPress={() => {
                            this.myvideo2 = []
                            for (let j = 0; j < this.data.length; j++) {
                                if (this.data[j].category_id == category[i])
                                    this.myvideo2.push(
                                        <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={this.data[j].id} onPress={() => {
                                            this.props.navigation.navigate("Video", {
                                                title: this.data[j].title,
                                                id: this.data[j].id,
                                                youtube_id: this.data[j].youtube_id,
                                                category_id: this.data[j].category_id,
                                                thumbnail: this.data[j].thumbnail
                                            })
                                        }} >

                                            {this.data[j].thumbnail == "app" && (
                                                <ImageView2
                                                    index={this.data[j].youtube_id}
                                                />
                                            )}
                                            {this.data[j].thumbnail != "app" && (
                                                <Image style={styles.box1}
                                                    source={require('../assets/C4OMI-Logo.png')}
                                                />
                                            )}
                                            <View style={{ width: 300, flexShrink: 1 }}>
                                                {this.data[j].title.length > 25 && (
                                                    <Text category="p2" style={{ flexWrap: "wrap", paddingHorizontal: 8 }}>
                                                        {this.data[j].title}
                                                    </Text>
                                                )}
                                                {this.data[j].title.length <= 25 && (
                                                    <Text category="p2" style={{ paddingHorizontal: 8 }}>
                                                        {this.data[j].title.substring(0, 25)}
                                                    </Text>
                                                )}
                                                <Text appearance='hint' style={{ paddingHorizontal: 8, fontSize: 12, }}>C4OMI Indonesia</Text>
                                                <Text style={{ paddingHorizontal: 8, fontSize: 12, fontStyle: "italic" }}>
                                                    {this.data[j].category_name}
                                                </Text>
                                            </View>

                                        </TouchableOpacity>)
                            }

                            this.setState({ video2: this.myvideo2, page: 2, category: category[i], category_name: category_name[i] })
                        }}>
                            <Text style={{ flex: 2, color: "#007b7f", fontWeight:"400", marginTop: 14, marginRight:3 }}>More</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingLeft: 5, paddingRight: 5, marginVertical: 8 }}>
                        {this.myvideodetail}
                    </ScrollView>
                </View>
            )
            this.shuffle(this.myvideo)

        }
        this.setState({ video: this.myvideo })

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

    DoSearch() {
        this.DoGenerateVideo(this.state.searchvalue)
    }

    render() {
        const toggleSearch = () => {
            this.DoSearch()
        };

        return (
            <Layout style={{ flex: 1 }}>
                {this.state.page == 1 && (
                    <TopNavigation
                        alignment='center'
                        title='C4OMI Indonesia'
                        subtitle='Video-video'
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
                                <TouchableOpacity onPress={() => {
                                    this.setState({ search: true })
                                }}>
                                    <Icon
                                        style={styles.icon}
                                        fill='#8F9BB3'
                                        name='search-outline'
                                    />
                                </TouchableOpacity>
                            </React.Fragment>
                        )}
                    />)}
                {this.state.page == 2 && (
                    <TopNavigation
                        alignment='center'
                        title='Videos'
                        subtitle={this.state.category_name}
                        accessoryLeft={(props) => (
                            <React.Fragment>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ page: 1 })
                                }}>
                                    <Icon
                                        style={styles.icon}
                                        fill='#8F9BB3'
                                        name='arrow-back-outline'
                                    />
                                </TouchableOpacity>
                            </React.Fragment>

                        )}

                    />)}

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
                {this.state.page == 1 && (
                    <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 5, flex: 1 }}>
                        {this.state.video}
                    </ScrollView>
                )}
                {this.state.page == 2 && (

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ width: 2, height: 20 }}></View>
                        {this.state.video2}
                        <View style={{ width: 2, height: 100 }}>

                        </View>
                    </ScrollView>

                )}
                <Divider />
                <BottomNavigation
                    appearance='noIndicator'
                    accessibilityIgnoresInvertColors={true}
                    selectedIndex={this.state.selectedIndex}
                    onSelect={async (index) => {
                        this.setState({ selectedIndex: index })
                        if (index == 0) {
                            this.props.navigation.popToTop()
                            this.props.navigation.navigate("Videos")
                        }
                        if (index == 1) {
                            this.props.navigation.popToTop()
                            this.props.navigation.navigate("Articles")
                        }
                        if (index == 2) {
                            this.props.navigation.popToTop()
                            this.props.navigation.navigate("PDFs")
                        }
                        if (index == 3) {
                            this.props.navigation.popToTop()
                            this.props.navigation.navigate("Event")
                        }
                        if (index == 4) {
                            this.props.navigation.replace("Home", { menuvisible: true })
                            this.setState({ menuvisible: true })
                        }
                        if (index == 5) {
                            this.props.navigation.popToTop()
                            this.props.navigation.navigate("ChatClient")
                        }
                        if (index == 6) {
                            this.props.navigation.popToTop()
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
            </Layout>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: "column",
        paddingTop: 30
    },
    box1: {
        marginRight: 5, width: 250, height: 9 / 16 * 250, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
    },
    box2: {
        marginRight: 5, width: 200, height: 9 / 16 * 200, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
    },
    boxmore: {
        marginTop: 20,
        marginRight: 5, width: 50, height: 50, borderRadius: 5, opacity: 0.7
    },
    icon: {
        width: 24,
        height: 24,
    },
})