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
export default class BundlesScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bundle: [],
            bundle2: [],
            page: 2,
            search: false,
            searchvalue: '',
            menuvisible: false
        }
        this.mybundle = []
        this.mybundledetail = []
        this.mybundle2 = []
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
        this.article_bundle_id = this.props.route.params.article_bundle_id
        this.DoGeneratebundle()
    }

    async DoGeneratebundle() {

        this.mybundle = []
        this.mybundledetail = []
        this.mybundle2 = []
        let url = this.API_URL + "c4omi/api-v3/bundle.php?article_bundle_id=" + this.article_bundle_id
        console.log(url)
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.data = responseJson
            });

        for (let j = 0; j < this.data.length; j++) {
            this.mybundle2.push(
                <TouchableOpacity style={{ flexDirection: "row", margin: 5, marginLeft: 15 }} key={Math.random()} onPress={() => {
                    this.props.navigation.navigate("Bundle", {
                        id: this.data[j].id,
                        title: this.data[j].title,
                        url: this.data[j].url,
                        bundle_id: this.data[j].bundle_id,
                        bundle_name: this.data[j].bundle_name
                    })
                }} >
                    {this.data[j].bundle_name == "Life Story" && (
                        <Image style={styles.box1}
                            source={require('../assets/6.jpg')}
                        />
                    )}
                    {this.data[j].bundle_name == "About Mental Illness" && (
                        <Image style={styles.box1}
                            source={require('../assets/5.jpg')}
                        />
                    )}
                    {this.data[j].bundle_name == "Kids and Mental Illness" && (
                        <Image style={styles.box1}
                            source={require('../assets/4.jpg')}
                        />
                    )}
                    {this.data[j].bundle_name == "Young Adults and Mental Illness" && (
                        <Image style={styles.box1}
                            source={require('../assets/3.jpg')}
                        />
                    )}
                    {this.data[j].bundle_name == "Family Members as Caregivers" && (
                        <Image style={styles.box1}
                            source={require('../assets/2.jpg')}
                        />
                    )}
                    {this.data[j].bundle_name == "Journey with Mental Illness" && (
                        <Image style={styles.box1}
                            source={require('../assets/1.jpg')}
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
                            {this.data[j].bundle_name}
                        </Text>
                    </View>

                </TouchableOpacity>)
        }


        this.mybundle2.push(
            <View key={Math.random() + "cat"}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingLeft: 5, paddingRight: 5, marginVertical: 8 }}>
                    {this.mybundledetail}
                </ScrollView>
            </View>
        )


        this.setState({ bundle2: this.mybundle2 })



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
        this.DoGeneratebundle(this.state.searchvalue)
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
                        {this.state.bundle}
                    </ScrollView>
                )}
                {this.state.page == 2 && (

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ width: 2, height: 20 }}></View>
                        {this.state.bundle2}
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
        marginRight: 5, width: 200, height: 9 / 16 * 200, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
    },
    boxmore: {
        marginRight: 5, width: 100, height: 100, borderRadius: 5
    },
    icon: {
        width: 24,
        height: 24,
    },
})