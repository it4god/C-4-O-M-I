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
        this.DoGenerateBook("")
    }

    async DoGeneratePDF(searchvalue) {
        this.mypdf = []
        this.mypdfdetail = []
        this.mypdf2 = []
        let url = "";
        if (searchvalue == "")
            url = this.API_URL + "c4omi/c4omi-api/pdfs.php"
        else
            url = this.API_URL + "c4omi/c4omi-api/pdfs.php?keyword=" + searchvalue
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
        this.mypdfdetail = []
        for (let j = 0; j < this.data.length; j++) {


            n = n + 1
            this.mypdfdetail.push(
                <TouchableOpacity style={{ flexWrap: "nowrap" }} key={j.toString()} onPress={() => {
                    this.props.navigation.navigate("PDF", {

                        url: this.data[j].url,

                    })

                }} >
                    <View style={{ flex: 1, width: 210, height: 12 / 7 * 210 }}>
                        {this.data[j].thumbnail != "" && (
                            <Image style={styles.box1}
                                source={{ uri: this.API_URL + "admin/public/assets/uploads/files/thumbnail/" + this.data[j].thumbnail }}
                            />
                        )}
                        {this.data[j].thumbnail == "" && (
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


        this.shuffle(this.mypdfdetail)

        this.mypdf.push(
            <View key={Math.random() + "cat"}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text category="h6" style={{ flex: 8, marginTop: 10, marginBottom: 3, paddingLeft: 5 }}>Free PDF</Text>
                    <TouchableOpacity style={{}} onPress={() => {
                        this.mypdf2 = []
                        for (let j = 0; j < this.data.length; j++) {
                            this.mypdf2.push(
                                <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={this.data[j].id} onPress={() => {
                                    this.props.navigation.navigate("PDF", {

                                        url: this.data[j].url,

                                    })
                                }} >
                                    {this.data[j].thumbnail != "" && (
                                        <Image style={styles.box1}
                                            source={{ uri: this.API_URL + "admin/public/assets/uploads/files/thumbnail/" + this.data[j].thumbnail }}
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
                                            <Text category="s1" style={{ paddingHorizontal: 8 }}>
                                                {this.data[j].title.substring(0, 25)}
                                            </Text>
                                        )}

                                        <Text category="s2" style={{ paddingHorizontal: 8, fontSize: 13, color: "gray" }}>{this.data[j].author}</Text>
                                    </View>

                                </TouchableOpacity>)
                        }
                        ////////
                        this.setState({ pdf2: this.mypdf2, page: 2 })

                    }}>
                        <Text style={{ flex: 2, color: "#007b7f", fontWeight: "400", marginTop: 14, marginRight: 3 }}>More</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingLeft: 5, paddingRight: 5, marginVertical: 8 }}>
                    {this.mypdfdetail}
                </ScrollView>
            </View>
        )
        this.shuffle(this.mypdf)
        this.setState({ pdf: this.mypdf })




    }

    async DoGenerateBook(searchvalue) {
        this.mybook = []
        this.mybookdetail = []
        this.mybook2 = []
        let url = "";
        if (searchvalue == "")
            url = this.API_URL + "c4omi/c4omi-api/ebooks.php"
        else
            url = this.API_URL + "c4omi/c4omi-api/ebooks.php?keyword=" + searchvalue
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.data2 = responseJson
                console.log(this.data2)
            });

        let n = 0
        let category = []
        let category_name = []
        for (let i = 0; i < this.data2.length; i++) {
            if (!category.includes(this.data2[i].category_id)) {
                category.push(this.data2[i].category_id)
                category_name.push(this.data2[i].category_name)
            }

        }
        for (let i = 0; i < category.length; i++) {
            this.mybookdetail = []
            n = 0
            for (let j = 0; j < this.data2.length; j++) {
                if (this.data2[j].category_id == category[i]) {
                n = n + 1
                this.mybookdetail.push(
                    <TouchableOpacity style={{ flexWrap: "nowrap" }} key={j.toString() + category[i]} onPress={() => {
                        this.props.navigation.navigate("Book", {
                            id : this.data2[j].id,
                            url : this.data2[j].url,
                            thumbnail : this.data2[j].thumbnail,
                            author : this.data2[j].author,
                            category_name : this.data2[j].category_name,
                            title : this.data2[j].title
                        })

                    }} >
                        <View style={{ flex: 1, width: 210, height: 13 / 7 * 210 }}>
                            {this.data2[j].thumbnail != "" && (
                                <Image style={styles.box1}
                                    source={{ uri: this.API_URL + "admin/public/assets/uploads/files/thumbnail/" + this.data2[j].thumbnail }}
                                />
                            )}
                            {this.data2[j].thumbnail == "" && (
                                <Image style={styles.box1}
                                    source={require('../assets/C4OMI-Logo.png')}
                                />
                            )}
                            {this.data2[j].title.length > 25 && (
                                <View style={{ width: 210, flexDirection: "row", flexShrink: 1 }}>
                                    <Text style={{ flex: 1, flexWrap: "wrap", paddingHorizontal: 8 }}>
                                        {this.data2[j].title}
                                    </Text>
                                </View>
                            )}
                            {this.data2[j].title.length <= 25 && (
                                <Text style={{ paddingHorizontal: 8 }}>
                                    {this.data2[j].title.substring(0, 25)}
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                )
            }
            if (n > 20) break;

        }


        this.shuffle(this.mybookdetail)

        this.mybook.push(
            <View key={Math.random() + "cat"}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text category="h6" style={{ flex: 8, marginTop: 10, marginBottom: 3, paddingLeft: 5 }}>{category_name[i]}</Text>
                    <TouchableOpacity style={{}} onPress={() => {
                        this.mybook2 = []
                        for (let j = 0; j < this.data2.length; j++) {
                            if (this.data2[j].category_id == category[i])
                                this.mybook2.push(
                                    <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} key={this.data2[j].id} onPress={() => {
                                        this.props.navigation.navigate("Book", {
                                            id : this.data2[j].id,
                                            url : this.data2[j].url,
                                            thumbnail : this.data2[j].thumbnail,
                                            author : this.data2[j].author,
                                            category_name : this.data2[j].category_name,
                                            title : this.data2[j].title

                                        })
                                    }} >
                                        {this.data2[j].thumbnail != "" && (
                                            <Image style={styles.box1}
                                                source={{ uri: this.API_URL + "admin/public/assets/uploads/files/thumbnail/" + this.data2[j].thumbnail }}
                                            />
                                        )}
                                        {this.data2[j].thumbnail == "" && (
                                            <Image style={styles.box1}
                                                source={require('../assets/C4OMI-Logo.png')}
                                            />
                                        )}
                                        <View style={{ width: 300, flexShrink: 1 }}>
                                            {this.data2[j].title.length > 25 && (
                                                <Text category="s1" style={{ flexWrap: "wrap", paddingHorizontal: 8 }}>
                                                    {this.data2[j].title}
                                                </Text>
                                            )}
                                            {this.data2[j].title.length <= 25 && (
                                                <Text category="s1" style={{ paddingHorizontal: 8 }}>
                                                    {this.data2[j].title.substring(0, 25)}
                                                </Text>
                                            )}

                                            <Text category="s2" style={{ paddingHorizontal: 8, fontSize: 13, color: "gray" }}>{this.data2[j].author}</Text>
                                        </View>

                                    </TouchableOpacity>)
                        }
                        ////////
                        this.setState({ book2: this.mybook2, category: category[i], category_name: category_name[i], page: 3 })

                    }}>
                        <Text style={{ flex: 2, color: "#007b7f", fontWeight: "400", marginTop: 14, marginRight: 3 }}>More</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingLeft: 5, paddingRight: 5, marginVertical: 8 }}>
                    {this.mybookdetail}
                </ScrollView>
            </View>
        )
        this.shuffle(this.mybook)
    }
        this.setState({ book: this.mybook })




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
        this.DoGenerateBook(this.state.searchvalue)
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
                        subtitle='Books / PDF / Ebooks'
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
{this.state.page == 3 && (
                    <TopNavigation
                        alignment='center'
                        title='Books'
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
                        <View style={{ width: 2, height: 10 }}>

                        </View>
                        <Text category="h5" style={{ flex: 8, marginTop: 10, marginBottom: 3, paddingLeft: 5 }}>Book / Film Recommendation</Text>
                        {this.state.book}
                        <View style={{ width: 2, height: 30 }}>

                        </View>
                    </ScrollView>
                )}
                {this.state.page == 2 && (

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ width: 2, height: 20 }}></View>
                        {this.state.pdf2}
                        <View style={{ width: 2, height: 30 }}>

                        </View>
                    </ScrollView>

                )}
                {this.state.page == 3 && (

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ width: 2, height: 20 }}></View>
                        {this.state.book2}
                        <View style={{ width: 2, height: 30 }}>

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
        marginRight: 5, width: 200, height: 11 / 7 * 200, borderRadius: 5, borderWidth: 1, borderColor: '#e4e9f2'
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