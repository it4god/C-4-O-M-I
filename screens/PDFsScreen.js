import React, { Component } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, Linking, Alert, TouchableWithoutFeedback } from "react-native";
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
export default class PDFsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pdf: [],
            pdf2: [],
            page: 1,
            search: false,
            searchvalue: '',
            menuvisible: false
        }
        this.mypdf = []
        this.mypdfdetail = []
        this.mypdf2 = []
    }

    async componentDidMount() {
        let api_url = "http://limpingen.org/api_url.php"

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
        this.DoGeneratePDF("")

    }

    async DoGeneratePDF(searchvalue) {
        this.mypdf = []
        this.mypdfdetail = []
        this.mypdf2 = []
        let url = "";
        if (searchvalue == "")
            url = this.API_URL+ "c4omi/api-v2/pdfs.php"
        else
            url = this.API_URL+ "c4omi/api-v2/pdfs.php?keyword=" + searchvalue
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
            this.mypdfdetail = []
            n = 0
            for (let j = 0; j < this.data.length; j++) {

                if (this.data[j].category_id == category[i]) {
                    n = n + 1
                    this.mypdfdetail.push(
                        <TouchableOpacity style={{ flexWrap: "nowrap" }} key={j.toString() + category[i]} onPress={() => {
                            this.props.navigation.navigate("PDF", {

                                url: this.data[j].url,

                            })

                        }} >
                            <View style={{ flex: 1, width: 210, height: 11 / 7 * 210 }}>
                                {this.data[i].thumbnail != "" && (
                                    <Image style={styles.box1}
                                        source={{ uri: this.API_URL+ "c4omi-web-admin-v2/assets/uploads/files/thumbnail/" + this.data[i].thumbnail }}
                                    />
                                )}
                                {this.data[i].thumbnail == "" && (
                                    <Image style={styles.box1}
                                        source={require('../assets/C4OMI-Logo.png')}
                                    />
                                )}
                                {this.data[j].title.length > 25 && (
                                    <View style={{ width: 210, flexDirection: "row", flexShrink: 1 }}>
                                        <Text style={{ flex: 1, flexWrap: "wrap", paddingHorizontal: 8 }}>
                                            {this.data[j].title}
                                        </Text>
                                    </View>
                                )}
                                {this.data[j].title.length <= 25 && (
                                    <Text style={{ paddingHorizontal: 8 }}>
                                        {this.data[j].title.substring(0, 25)}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    )

                }
                if (n > 10) break;

            }


            this.shuffle(this.mypdfdetail)
            this.mypdfdetail.push(
                <TouchableOpacity key={"More-pdf" + i.toString()} onPress={() => {
                    this.mypdf2 = []
                    for (let j = 0; j < this.data.length; j++) {
                        if (this.data[j].category_id == category[i])
                            this.mypdf2.push(
                                <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={this.data[j].id} onPress={() => {
                                    this.props.navigation.navigate("PDF", {

                                        url: this.data[j].url,

                                    })
                                }} >
                                    {this.data[j].thumbnail != "" && (
                                        <Image style={styles.box1}
                                            source={{ uri: this.API_URL+ "c4omi/api-v2//c4omi-web-admin/assets/uploads/files/thumbnail/" + this.data[i].thumbnail }}
                                        />
                                    )}
                                    {this.data[j].thumbnail == "" && (
                                        <Image style={styles.box1}
                                            source={require('../assets/C4OMI-Logo.png')}
                                        />
                                    )}
                                    <View style={{ width: 300, flexShrink: 1 }}>
                                        {this.data[j].title.length > 25 && (
                                            <Text category="s1" style={{ flexWrap: "wrap", paddingHorizontal: 8 }}>
                                                {this.data[j].title}
                                            </Text>
                                        )}
                                        {this.data[j].title.length <= 25 && (
                                            <Text category="h6" style={{ paddingHorizontal: 8 }}>
                                                {this.data[j].title.substring(0, 25)}
                                            </Text>
                                        )}
                                        <Text appearance='hint' style={{ paddingHorizontal: 8, fontSize: 12 }}>C4OMI Indonesia</Text>
                                        <Text category="s2" style={{ paddingHorizontal: 8, fontSize: 13, color: "gray" }}>{this.data[j].author}</Text>
                                    </View>

                                </TouchableOpacity>)
                    }

                    this.setState({ pdf2: this.mypdf2, page: 2, category: category[i], category_name: category_name[i] })
                }} >
                    <View style={styles.boxmore}>
                        <Image style={styles.boxmore}
                            source={require('../assets/more.png')}
                        />
                    </View>
                </TouchableOpacity>
            )
            this.mypdf.push(
                <View key={i.toString() + "cat"}>
                    <Text category="h6" style={{ marginTop: 10, marginBottom: 3, paddingLeft: 5 }}>{category_name[i]}</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingLeft: 5, paddingRight: 5, marginVertical: 8 }}>
                        {this.mypdfdetail}
                    </ScrollView>
                </View>
            )
            this.shuffle(this.mypdf)

        }
        this.setState({ pdf: this.mypdf })

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
        this.DoGeneratePDF(this.state.searchvalue)
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
                        subtitle='E-Books'
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
                        title='PDFs'
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
                        accessoryRight={(props) => (
                            <React.Fragment>
                                <TouchableOpacity onPress={() => { Alert.alert("Under Construction") }}>
                                    <Icon
                                        style={styles.icon}
                                        fill='#8F9BB3'
                                        name='search-outline'
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
                        {this.state.pdf}
                    </ScrollView>
                )}
                {this.state.page == 2 && (

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ width: 2, height: 20 }}></View>
                        {this.state.pdf2}
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
                <Modal visible={this.state.menuvisible}>
                    <Card disabled={true}>
                        <Text style={{ textAlign: "center" }}>
                            Link-link
                        </Text>
                        <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.popToTop(); this.props.navigation.navigate("Links", { category_id: 1, luar_negeri: false }) }}>
                            Info, Edukasi dan Layanan Konseling - Rehabilitasi
                        </Button>
                        <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.popToTop(); this.props.navigation.navigate("Links", { category_id: 2, luar_negeri: false }) }}>
                            Platform Komunitas
                        </Button>
                        <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.popToTop(); this.props.navigation.navigate("Links", { category_id: 3, luar_negeri: false }) }}>
                            Platform Konseling Basis Apps
                        </Button>
                        <Button style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.popToTop(); this.props.navigation.navigate("Links", { category_id: 1, luar_negeri: true }) }}>
                            Situs Luar Negeri
                        </Button>
                        <View style={{ paddingHorizontal: 50 }}>
                            <Button size="small" appearance='outline' style={{ margin: 5 }} onPress={() => { this.setState({ menuvisible: false }); this.props.navigation.popToTop(); }}>
                                Tutup
                            </Button>
                        </View>
                    </Card>
                </Modal>
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
        marginRight: 5, width: 200, height: 10 / 7 * 200, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
    },
    boxmore: {
        marginRight: 5, width: 100, height: 100, borderRadius: 5
    },
    icon: {
        width: 24,
        height: 24,
    },
})