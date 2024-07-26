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
export default class ArticlesScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            article: [],
            article2: [],
            page: 1,
        }
        this.myarticle = []
        this.myarticledetail = []
        this.myarticle2 = []
    }

    async componentDidMount() {

        let url = "https://admin.c4omi.org/api/articles.php"
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
            this.myarticledetail = []
            n = 0
            for (let j = 0; j < this.data.length; j++) {

                if (this.data[j].category_id == category[i]) {
                    n = n + 1
                    this.myarticledetail.push(
                        <TouchableOpacity style={{ flexWrap: "nowrap" }} key={j.toString() + category[i]} onPress={() => {
                            this.props.navigation.navigate("Article", {
                                title: this.data[j].title,
                                id: this.data[j].id,
                                url: this.data[j].url,

                            })

                        }} >
                            <View style={{ flex: 1, width: 210, height: 11 / 16 * 300 }}>
                                    <Image style={styles.box1}
                                        source={require('../assets/C4OMI-Logo.png')}
                                    />
                                
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


            this.shuffle(this.myarticledetail)
            this.myarticledetail.push(
                <TouchableOpacity key={"More-article" + i.toString()} onPress={() => {
                    this.myarticle2 = []
                    for (let j = 0; j < this.data.length; j++) {
                        if (this.data[j].category_id == category[i])
                            this.myarticle2.push(
                                <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={this.data[j].id} onPress={() => {
                                    this.props.navigation.navigate("Article", {
                                        title: this.data[j].title,
                                        id: this.data[j].id,
                                        url: this.data[j].url,

                                    })
                                }} >
                                        <Image style={styles.box1}
                                            source={require('../assets/C4OMI-Logo.png')}
                                        />
                                    
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

                    this.setState({ article2: this.myarticle2, page: 2, category: category[i], category_name: category_name[i] })
                }} >
                    <View style={styles.boxmore}>
                        <Image style={styles.boxmore}
                            source={require('../assets/more.png')}
                        />
                    </View>
                </TouchableOpacity>
            )
            this.myarticle.push(
                <View key={i.toString() + "cat"}>
                    <Text category="h6" style={{ marginTop: 10, marginBottom: 3, paddingLeft: 5 }}>{category_name[i]}</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingLeft: 5, paddingRight: 5, marginVertical: 8 }}>
                        {this.myarticledetail}
                    </ScrollView>
                </View>
            )
            this.shuffle(this.myarticle)

        }
        this.setState({ article: this.myarticle })



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
                        subtitle='Articles'
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
                        title='Articles'
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
                        {this.state.article}
                    </ScrollView>
                )}
                {this.state.page == 2 && (

                    <ScrollView style={{ flex: 1 }}>
                        {this.state.article2}
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