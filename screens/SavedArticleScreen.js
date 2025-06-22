import React, { Component } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, Alert, TouchableWithoutFeedback } from "react-native";
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
import SQLite from 'react-native-sqlite-2'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class SavedArticlesScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            article: [],
            article2: [],
            page: 2,
            search: false,
            searchvalue: '',
            menuvisible: false
        }
        this.myarticle = []
        this.myarticledetail = []
        this.myarticle2 = []
    }

    async componentDidMount() {
        try {
            this.API_URL = await AsyncStorage.getItem('API_URL');
            if (this.API_URL !== null) {

            }
            else {
                await AsyncStorage.setItem('API_URL', this.api_url);
            }
        } catch (e) {
            // error reading value
        }
        this.DoGenerateArticle("")
    }

    async DoGenerateArticle(searchvalue) {
        this.myarticle = []
        this.myarticledetail = []
        this.myarticle2 = []
        if (searchvalue == "")
            url = this.API_URL + "c4omi/c4omi-api/articles.php"
        else
            url = this.API_URL + "c4omi/c4omi-api/articles.php?keyword=" + searchvalue
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.data = responseJson
                console.log(this.data)
            });


        const db = SQLite.openDatabase('tag.db', '1.0', '', 1)
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS article_tag(' +
                'id INTEGER PRIMARY KEY NOT NULL, ' +
                'article_id TEXT, ' + 'title TEXT, ' + 'bundle_id TEXT, ' + 'url TEXT, ' +
                'tag_value TEXT);',
                [],
                this.successCB,
                this.errorStatementCB
            )

        

        tx.executeSql('SELECT * from article_tag ORDER BY id ASC', [], async (tx, results) => {

            const rows = results.rows;
            if (rows.length > 0) {
                console.log(rows)
                for (let i = 0; i < rows.length; i++) {

                    this.myarticle2.push(
                        <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={Math.random()} onPress={() => {
                            this.props.navigation.replace("Article", {
                                title: rows.item(i).title,
                                id: rows.item(i).article_id,
                                category_id: rows.item(i).category_id,
                                url: rows.item(i).url,
                                bundle_id: rows.item(i).bundle_id,

                            })
                        }} >
                            {rows.item(i).bundle_id == null && (
                                <Image style={styles.box2}
                                    source={require('../assets/C4OMI-Logo.png')}
                                />
                            )}
                            {rows.item(i).bundle_id == 1 && (
                                <Image style={styles.box2}
                                    source={require('../assets/1.jpg')}
                                />
                            )}
                            {rows.item(i).bundle_id == 2 && (
                                <Image style={styles.box2}
                                    source={require('../assets/2.jpg')}
                                />
                            )}
                            {rows.item(i).bundle_id == 3 && (
                                <Image style={styles.box2}
                                    source={require('../assets/3.jpg')}
                                />
                            )}
                            {rows.item(i).bundle_id == 4 && (
                                <Image style={styles.box2}
                                    source={require('../assets/4.jpg')}
                                />
                            )}
                            {rows.item(i).bundle_id == 5 && (
                                <Image style={styles.box2}
                                    source={require('../assets/5.jpg')}
                                />
                            )}
                            {rows.item(i).bundle_id == 6 && (
                                <Image style={styles.box2}
                                    source={require('../assets/6.jpg')}
                                />
                            )}
                            <View style={{ width: 300, flexShrink: 1 }}>

                                <Text category="p2" style={{ flexWrap: "wrap", paddingHorizontal: 8 }}>
                                    {rows.item(i).title}
                                </Text>

                                <Text appearance='hint' style={{ paddingHorizontal: 8, fontSize: 12, }}>C4OMI Indonesia</Text>
                                <Text style={{ fontSize: 12, paddingHorizontal: 8, fontStyle: "italic" }}>
                                    {"Saved Articled"}
                                </Text>
                            </View>

                        </TouchableOpacity>)
                }

                this.setState({ article2: this.myarticle2, page: 2 })


            }
        })
        
    })
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
        this.DoGenerateArticle(this.state.searchvalue)
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
                        subtitle='Artikel-artikel'
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
                                <TouchableOpacity onPress={() => { this.setState({ search: true }) }}>
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
                        title='C4OMI Indonesia'
                        subtitle='Saved Articles'
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
                        {this.state.article}
                    </ScrollView>
                )}
                {this.state.page == 2 && (

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ width: 2, height: 20 }}></View>
                        {this.state.article2}
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
                            this.props.navigation.navigate("CopingSkill")
                        }
                        if (index == 6) {
                            this.props.navigation.popToTop()
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
        marginTop: 15,
        marginRight: 5, width: 50, height: 50, borderRadius: 5, opacity: 0.7
    },
    icon: {
        width: 24,
        height: 24,
    },
})