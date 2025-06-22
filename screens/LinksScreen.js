import React, { Component } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, Linking, TouchableWithoutFeedback } from "react-native";
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
    List, ListItem, Button, Card
} from '@ui-kitten/components';
const width = Dimensions.get('window').width;
const halfheight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class LinksScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            link: [],
            link2: [],
            page: 1,
            search: false,
            searchvalue: '',
            links: []
        }
        this.mylink = []
        this.mylinkdetail = []
        this.mylink2 = []
    }

    async componentDidMount() {



        this.category_id = this.props.route.params.category_id
        this.luar_negeri = this.props.route.params.luar_negeri

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
        this.DoGeneratelink(this.category_id, this.luar_negeri)

    }

    async DoGeneratelink(category_id, luar_negeri) {
        this.mylink = []
        this.mylinkdetail = []
        this.mylink2 = []
        let url = "";
        if (luar_negeri == true)
            url = this.API_URL + "c4omi/c4omi-api/links.php?luar_negeri=true&category_id=0"
        else
            url = this.API_URL + "c4omi/c4omi-api/links.php?category_id=" + category_id
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.data = responseJson


            });

        let n = 0
        this.source = []
        for (let i = 0; i < this.data.length; i++) {
            this.source.push({
                title: this.data[i].title,
                description: this.data[i].description,
                url: this.data[i].url
            })

        }
        if (category_id == 1) {
            this.subtitle = "Info, Edukasi dan Layanan"
        }
        else if (category_id == 2) {
            this.subtitle = "Platform Komunitas"
        }
        else if (category_id == 3) {
            this.subtitle = "Platform Konseling Basis Apps"
        }
        if (luar_negeri == true) {
            this.subtitle = "Situs Luar Negeri"
        }
        this.links = []
        for (let i = 0; i < this.data.length; i++) {
            this.links.push(
                <Layout key={Math.random()} style={{

                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Card
                        style={{ flex: 1, margin: 3 }}
                        header={(props) => (
                            <View {...props}>
                                <Text category='h6' >
                                    {this.data[i].title}
                                </Text>
                                <Text category='s1'>
                                    {this.data[i].category_name}
                                </Text>
                            </View>
                        )
                        }
                        footer={(props) => (
                            <View
                                {...props}
                                style={[props.style, styles.footerContainer]}
                            >
                                <Button size="small" onPress={() => {
                                    Linking.openURL(this.data[i].url)
                                }}
                                    style={styles.footerControl}
                                >
                                    Buka
                                </Button>
                            </View>

                        )}
                    >
                        <Text>
                            {this.data[i].description}
                        </Text>
                    </Card>
                </Layout>
            )
        }

        this.setState({ source: this.source, links: this.links })

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
        this.DoGeneratelink(this.state.searchvalue)
    }

    render() {
        const toggleSearch = () => {
            this.DoSearch()
        };
        const renderItem = ({ item, index }) => (
            <ListItem
                style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
                title={`${item.title}`}
                description={`${item.description}`}
                accessoryRight={() => (
                    <Button size='small' style={{ marginTop: 7 }} onPress={() => { Linking.openURL(`${item.url}`); }}>
                        Buka
                    </Button>
                )}
            />
        );
        return (
            <Layout style={{ flex: 1 }}>
                {this.state.page == 1 && (
                    <TopNavigation
                        alignment='center'
                        title='C4OMI Indonesia'
                        subtitle={this.subtitle}
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
                        title={this.subtitle}
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

                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} >
                    {this.state.links}
                </ScrollView>
            </Layout>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        maxHeight: halfheight
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
    footerControl: {
        marginHorizontal: 2,
    },
    footerContainer: {
        flexDirection: 'row-reverse',
    },
})