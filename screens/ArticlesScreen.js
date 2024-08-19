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
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class ArticlesScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            article: [],
            article2: [],
            page: 1,
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
            url = this.API_URL + "c4omi/api-v3/articles.php"
        else
            url = this.API_URL + "c4omi/api-v3/articles.php?keyword=" + searchvalue
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.data = responseJson
                console.log(this.data)
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
                console.log(this.data[j].bundle_id)
                if (this.data[j].category_id == category[i]) {
                    n = n + 1
                    this.myarticledetail.push(
                        <TouchableOpacity style={{ flexWrap: "nowrap" }} key={Math.random()} onPress={() => {
                            this.props.navigation.navigate("Article", {
                                title: this.data[j].title,
                                id: this.data[j].id,
                                category_id: this.data[j].category_id,
                                url: this.data[j].url,
                                bundle_id : this.data[j].bundle_id
                            })

                        }} >
                            <View style={{ flex: 1, width: 260, height: 10 / 16 * 280 }}>
                                {this.data[j].bundle_id == null && (
                                    <Image style={styles.box1}
                                        source={require('../assets/C4OMI-Logo.png')}
                                    />
                                )}
                                {this.data[j].bundle_id == 1 && (
                                    <Image style={styles.box1}
                                        source={require('../assets/1.jpg')}
                                    />
                                )}
                                {this.data[j].bundle_id == 2 && (
                                    <Image style={styles.box1}
                                        source={require('../assets/2.jpg')}
                                    />
                                )}
                                {this.data[j].bundle_id == 3 && (
                                    <Image style={styles.box1}
                                        source={require('../assets/3.jpg')}
                                    />
                                )}
                                {this.data[j].bundle_id == 4 && (
                                    <Image style={styles.box1}
                                        source={require('../assets/4.jpg')}
                                    />
                                )}
                                {this.data[j].bundle_id == 5 && (
                                    <Image style={styles.box1}
                                        source={require('../assets/5.jpg')}
                                    />
                                )}
                                {this.data[j].bundle_id == 6 && (
                                    <Image style={styles.box1}
                                        source={require('../assets/6.jpg')}
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
                if (n > 10) break;

            }


            this.shuffle(this.myarticledetail)
            this.myarticledetail.push(
                <TouchableOpacity key={"More-article" + Math.random()} onPress={() => {
                    this.myarticle2 = []
                    for (let j = 0; j < this.data.length; j++) {
                        if (this.data[j].category_id == category[i])
                            this.myarticle2.push(
                                <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={Math.random()} onPress={() => {
                                    this.props.navigation.navigate("Article", {
                                        title: this.data[j].title,
                                        id: this.data[j].id,
                                        category_id: this.data[j].category_id,
                                        url: this.data[j].url,
                                        bundle_id : this.data[j].bundle_id

                                    })
                                }} >
                                    {this.data[j].bundle_id == null && (
                                        <Image style={styles.box2}
                                            source={require('../assets/C4OMI-Logo.png')}
                                        />
                                    )}
                                    {this.data[j].bundle_id == 1 && (
                                        <Image style={styles.box2}
                                            source={require('../assets/1.jpg')}
                                        />
                                    )}
                                    {this.data[j].bundle_id == 2 && (
                                        <Image style={styles.box2}
                                            source={require('../assets/2.jpg')}
                                        />
                                    )}
                                    {this.data[j].bundle_id == 3 && (
                                        <Image style={styles.box2}
                                            source={require('../assets/3.jpg')}
                                        />
                                    )}
                                    {this.data[j].bundle_id == 4 && (
                                        <Image style={styles.box2}
                                            source={require('../assets/4.jpg')}
                                        />
                                    )}
                                    {this.data[j].bundle_id == 5 && (
                                        <Image style={styles.box2}
                                            source={require('../assets/5.jpg')}
                                        />
                                    )}
                                    {this.data[j].bundle_id == 6 && (
                                        <Image style={styles.box2}
                                            source={require('../assets/6.jpg')}
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
                                        <Text style={{ fontSize: 12, paddingHorizontal: 8, fontStyle: "italic" }}>
                                            {this.data[j].category_name}
                                        </Text>
                                    </View>

                                </TouchableOpacity>)
                    }

                    this.setState({ article2: this.myarticle2, page: 2, category: category[i], category_name: category_name[i] })
                }} >
                    <View style={styles.boxmore}>

                    </View>
                </TouchableOpacity>
            )
            this.myarticle.push(
                <View key={Math.random() + "cat"}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text category="h6" style={{ flex: 8.5, marginTop: 10, marginBottom: 3, paddingLeft: 5 }}>{category_name[i]}</Text>
                        <TouchableOpacity onPress={() => {
                            this.myarticle2 = []
                            for (let j = 0; j < this.data.length; j++) {
                                if (this.data[j].category_id == category[i])
                                    this.myarticle2.push(
                                        <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={Math.random()} onPress={() => {
                                            this.props.navigation.navigate("Article", {
                                                title: this.data[j].title,
                                                id: this.data[j].id,
                                                category_id: this.data[j].category_id,
                                                url: this.data[j].url,
                                                bundle_id : this.data[j].bundle_id

                                            })
                                        }} >
                                            {this.data[j].bundle_id == null && (
                                                <Image style={styles.box2}
                                                    source={require('../assets/C4OMI-Logo.png')}
                                                />
                                            )}
                                            {this.data[j].bundle_id == 1 && (
                                                <Image style={styles.box2}
                                                    source={require('../assets/1.jpg')}
                                                />
                                            )}
                                            {this.data[j].bundle_id == 2 && (
                                                <Image style={styles.box2}
                                                    source={require('../assets/2.jpg')}
                                                />
                                            )}
                                            {this.data[j].bundle_id == 3 && (
                                                <Image style={styles.box2}
                                                    source={require('../assets/3.jpg')}
                                                />
                                            )}
                                            {this.data[j].bundle_id == 4 && (
                                                <Image style={styles.box2}
                                                    source={require('../assets/4.jpg')}
                                                />
                                            )}
                                            {this.data[j].bundle_id == 5 && (
                                                <Image style={styles.box2}
                                                    source={require('../assets/5.jpg')}
                                                />
                                            )}
                                            {this.data[j].bundle_id == 6 && (
                                                <Image style={styles.box2}
                                                    source={require('../assets/6.jpg')}
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
                                                <Text style={{ fontSize: 12, paddingHorizontal: 8, fontStyle: "italic" }}>
                                                    {this.data[j].category_name}
                                                </Text>
                                            </View>

                                        </TouchableOpacity>)
                            }

                            this.setState({ article2: this.myarticle2, page: 2, category: category[i], category_name: category_name[i] })
                        }}>
                           <Text style={{ flex: 2, color: "#007b7f", fontWeight:"400", marginTop: 14, marginRight:3 }}>More</Text>
                        </TouchableOpacity>
                    </View>
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
                        title='Artikel-artikel'
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
        marginTop: 15,
        marginRight: 5, width: 50, height: 50, borderRadius: 5, opacity: 0.7
    },
    icon: {
        width: 24,
        height: 24,
    },
})