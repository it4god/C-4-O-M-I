import React, { Component } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from "react-native";
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
    Text

} from '@ui-kitten/components';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class VideosScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            video: [],
            video2: [],
            page: 1,
        }
        this.myvideo = []
        this.myvideodetail = []
        this.myvideo2 = []
    }

    async componentDidMount() {

        let url = "https://admin.c4omi.org/api/videos.php"
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.data = responseJson

            });

        let n = 0
        category = []
        category_name = []
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

                            })

                        }} >
                            <View style={{ flex: 1, width: 210, height: 11 / 16 * 300 }}>
                                {this.data[i].thumbnail != "" && (
                                    <Image style={styles.box1}
                                        source={{ uri: "https://admin.c4omi.org/assets/uploads/files/thumbnail/" + this.data[i].thumbnail }}
                                    />
                                )}
                                {this.data[i].thumbnail == "" && (
                                    <Image style={styles.box1}
                                        source={require('../assets/C4OMI-Logo.png')}
                                    />
                                )}
                                {this.data[j].title.length > 25 && (
                                    <View style={{ width: 210, flexDirection: "row", flexShrink: 1 }}>
                                        <Text style={{ flex: 1, flexWrap: "wrap", paddingLeft: 8 }}>
                                            {this.data[j].title}
                                        </Text>
                                    </View>
                                )}
                                {this.data[j].title.length <= 25 && (
                                    <Text style={{ paddingLeft: 8 }}>
                                        {this.data[j].title.substring(0, 25)}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    )

                }
                if (n > 10) break;

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

                                    })
                                }} >
                                    {this.data[j].thumbnail != "" && (
                                        <Image style={styles.box1}
                                            source={{ uri: this.data[j].thumbnail }}
                                        />
                                    )}
                                    {this.data[j].thumbnail == "" && (
                                        <Image style={styles.box1}
                                            source={require('../assets/C4OMI-Logo.png')}
                                        />
                                    )}
                                    <View style={{ width: 300, flexShrink: 1 }}>
                                        {this.data[j].title.length > 25 && (
                                            <Text style={{ flexWrap: "wrap", paddingLeft: 8 }}>
                                                {this.data[j].title}
                                            </Text>
                                        )}
                                        {this.data[j].title.length <= 25 && (
                                            <Text style={{ paddingLeft: 8 }}>
                                                {this.data[j].title.substring(0, 25)}
                                            </Text>
                                        )}
                                        <Text style={{ paddingLeft: 8, fontSize: 12, fontWeight: "bold", }}>C4OMI Indonesia</Text>
                                    </View>

                                </TouchableOpacity>)
                    }

                    this.setState({ video2: this.myvideo2, page: 2, category: category[i], category_name: category_name[i] })
                }} >
                    <View style={styles.boxmore}>
                        <Image style={styles.boxmore}
                            source={require('../assets/more.png')}
                        />
                    </View>
                </TouchableOpacity>
            )
            this.myvideo.push(
                <View key={i.toString() + "cat"}>
                    <Text category="h6" style={{ marginTop: 10, marginBottom: 3, paddingLeft: 5 }}>{category_name[i]}</Text>
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

    render() {
        return (
            <Layout style={{ flex: 1 }}>
                {this.state.page == 1 && (
                    <TopNavigation
                        alignment='center'
                        title='C4OMI Indonesia'
                        subtitle='Videos'
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
                {this.state.page == 1 && (
                    <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 5, flex: 1 }}>
                        {this.state.video}
                    </ScrollView>
                )}
                {this.state.page == 2 && (

                    <ScrollView style={{ flex: 1 }}>
                        {this.state.video2}
                        <View style={{ width: 2, height: 100 }}>

                        </View>
                    </ScrollView>

                )}
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
        marginRight: 5, width: 200, height: 9 / 16 * 200, borderRadius: 5, borderWidth: 1, borderColor: "gray"
    },
    boxmore: {
        marginRight: 5, width: 100, height: 100, borderRadius: 5
    },
    icon: {
        width: 24,
        height: 24,
    },
})