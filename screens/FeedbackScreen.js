import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Linking } from "react-native";
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
//import Sound from 'react-native-sound';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class FeedbackScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuvisible: false,
            selectedIndex: 0
        }
    }
    async componentDidMount() {

    }

 
    render() {
        return (
            <Layout style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    title='C4OMI Indonesia'
                    subtitle='Feedback'
                    accessoryLeft={(props) => (
                        <React.Fragment>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("DrawerMenu")}}>
                                <Icon
                                    style={styles.icon}
                                    fill='#8F9BB3'
                                    name='arrow-back-outline'
                                />
                            </TouchableOpacity>
                        </React.Fragment>

                    )}
                />
                <Divider />
                <ScrollView showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                >
                    <Layout style={{ padding: 15, paddingHorizontal:20 }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={{
                                    borderRadius: 5,
                                    width: 120,
                                    height: 120,
                                    alignItems: "center",
                                }}
                                source={require("../assets/c4omi.jpg")}
                            />
                        </View>
                        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                            Feedback
                        </Text>
                        <Text style={{ textAlign: "justify" }}>
                            {"\n"}
                            Untuk Feedback bahan bisa menghubungi kontak C4OMI {"\n"}di WA : 0896-7897-8655{"\n"}Email : C4OMI.Indonesia@gmail.com
                            {"\n\n"}
                            Untuk Feedback Aplikasi Android bisa menghubungi : {"\n"}Jeffrey Lim{"\n"}di WA : 0877-227-277-17{"\n"}Email : limpingen777@gmail.com
                            {"\n"}
                        </Text>

                    </Layout>
                </ScrollView >


            </Layout >

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

    }
})