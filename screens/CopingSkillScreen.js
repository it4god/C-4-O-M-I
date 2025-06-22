import React, { Component } from "react";
import {Linking, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback, Alert } from "react-native";
import { MenuItem, Layout, TopNavigation, Divider, Text, Card, Button, Menu as UKMenu, TopNavigationAction, Icon, OverflowMenu } from '@ui-kitten/components';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class CopingSkillScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            search: false,
            searchvalue: '',
            menuvisible: false
        }

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
    }
    render() {
        return (
            <Layout style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    title='C4OMI Indonesia'
                    subtitle='Coping Strategies'
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

                        </React.Fragment>
                    )}
                />
                <Divider />
                <ScrollView showsVerticalScrollIndicato={false}>
                <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' }} level='1'>
                    <View style={{ flex: 9, paddingTop: 15 }}>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",

                            }}
                        >
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
                        <View style={styles.containertopRow}>
                            <Text
                                style={{
                                    fontSize: 18,
                                }}
                            >
                                C4OMI Indonesia
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: '#e4e9f2',
                                borderRadius: 5,
                                marginRight: 15,
                                marginLeft: 15,
                                backgroundColor: '#f7f9fc',
                            }}
                        >
                            <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                                <Icon
                                    style={styles.icon}
                                    name='message-circle-outline'
                                    fill='#8F9BB3'
                                />
                            </View>
                            <View style={styles.containerBottom}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.navigate("AIKonselor")
                                    }
                                    style={styles.containerBottomItem}
                                >
                                    <View style={styles.button}>
                                        <Text style={styles.txtBottom}>
                                            AI Konselor
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 10 }}></View>
                        <View
                            style={{
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: '#e4e9f2',
                                borderRadius: 5,
                                marginRight: 15,
                                marginLeft: 15,
                                backgroundColor: '#f7f9fc',
                            }}
                        >
                            <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                                <Icon
                                    style={styles.icon}
                                    name='file-text-outline'
                                    fill='#8F9BB3'
                                />
                            </View>
                            <View style={styles.containerBottom}>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate("Journalings") }}
                                    style={styles.containerBottomItem}
                                >
                                    <View style={styles.button}>
                                        <Text style={styles.txtBottom}>
                                            Journaling & Diary
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 10 }}></View>
                        <View
                            style={{
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: '#e4e9f2',
                                borderRadius: 5,
                                marginRight: 15,
                                marginLeft: 15,
                                backgroundColor: '#f7f9fc',
                            }}
                        >
                            <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                                <Icon
                                    style={styles.icon}
                                    name='eye-outline'
                                    fill='#8F9BB3'
                                />
                            </View>
                            <View style={styles.containerBottom}>
                                <TouchableOpacity
                                    onPress={() => {this.props.navigation.navigate("StressLevel" , {
                                        screenname  : 'Change Perspective',
                                        toscreen : 'ChangePerspective',
                                        beforeafter : 'before',
                                        status : 'Before Change Perspective',
                                        value : 5,
                                        nextbutton : 'Change Perspective'
                                    })}}
                                    style={styles.containerBottomItem}
                                >
                                    <View style={styles.button}>
                                        <Text style={styles.txtBottom}>
                                           Change Perspective
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 10 }}></View>
                        <View
                            style={{
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: '#e4e9f2',
                                borderRadius: 5,
                                marginRight: 15,
                                marginLeft: 15,
                                backgroundColor: '#f7f9fc',
                            }}
                        >
                            <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                                <Icon
                                    style={styles.icon}
                                    name='music-outline'
                                    fill='#8F9BB3'
                                />
                            </View>
                            <View style={styles.containerBottom}>
                            <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate("MusicTherapy") }}
                                    style={styles.containerBottomItem}
                                >
                                    <View style={styles.button}>
                                        <Text style={styles.txtBottom}>
                                            Music Therapy
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 10 }}></View>
                        <View
                            style={{
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: '#e4e9f2',
                                borderRadius: 5,
                                marginRight: 15,
                                marginLeft: 15,
                                backgroundColor: '#f7f9fc',
                            }}
                        >
                            <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                                <Icon
                                    style={styles.icon}
                                    name='smiling-face-outline'
                                    fill='#8F9BB3'
                                />
                            </View>
                            <View style={styles.containerBottom}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("MoodTracker")
                                    }}
                                    style={styles.containerBottomItem}
                                >
                                    <View style={styles.button}>
                                        <Text style={styles.txtBottom}>
                                            Mood Tracker
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 10 }}></View>
                        <View
                            style={{
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: '#e4e9f2',
                                borderRadius: 5,
                                marginRight: 15,
                                marginLeft: 15,
                                backgroundColor: '#f7f9fc',
                            }}
                        >
                            <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                                <Icon
                                    style={styles.icon}
                                    name='sun-outline'
                                    fill='#8F9BB3'
                                />
                            </View>
                            <View style={styles.containerBottom}>
                            <TouchableOpacity
                                    onPress={() => { Alert.alert("Under construction !", "This is long term projects. Please give support, give feedbacks, comments, and ideas !\nJeffrey Lim\n0877-227-277-17",[
                                        {
                                          text: 'Contact Me',
                                          onPress: () => Linking.openURL('https://wa.me/6287722727717'),
                                        },
                                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                                      ]) }}
                                    style={styles.containerBottomItem}
                                >
                                    <View style={styles.button}>
                                        <Text style={styles.txtBottom}>
                                            Mindfulness
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 10 }}></View>
                        <View
                            style={{
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: '#e4e9f2',
                                borderRadius: 5,
                                marginRight: 15,
                                marginLeft: 15,
                                backgroundColor: '#f7f9fc',
                            }}
                        >
                            <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                                <Icon
                                    style={styles.icon}
                                    name='thermometer-outline'
                                    fill='#8F9BB3'
                                />
                            </View>
                            <View style={styles.containerBottom}>
                            <TouchableOpacity
                                    onPress={() => { Alert.alert("Under construction !", "This is long term projects. Please give support, give feedbacks, comments, and ideas !\nJeffrey Lim\n0877-227-277-17",[
                                        {
                                          text: 'Contact Me',
                                          onPress: () => Linking.openURL('https://wa.me/6287722727717'),
                                        },
                                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                                      ]) }}
                                    style={styles.containerBottomItem}
                                >
                                    <View style={styles.button}>
                                        <Text style={styles.txtBottom}>
                                            Check Mental Health
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginRight: 15,
                            marginLeft: 15,
                            alignItems: "center",
                            justifyContent: "center",
                            
                            borderRadius: 5,

                            flex: 1,
                            marginBottom: 5,
                            marginTop: 25,
                            paddingHorizontal: 20
                        }}
                    >
                        <Image style={{ marginTop: 0, width: width - 50, height: (width - 50) / 5 }}
                            source={require('../assets/logo.png')}
                        />
                        <View
                            style={{
                                flexDirection: "row-reverse",
                                flex: 4,
                            }}
                        >

                            <TouchableOpacity
                                onPress={() => { }}
                            >

                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 6, paddingLeft: 20 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                                onPress={() => { }}
                            >
                                {this.state.app_language}
                            </Text>
                        </View>
                    </View>
                </Layout>
                </ScrollView>
            </Layout>
            
        );
    }
}
const styles = StyleSheet.create({
    header: {

    },
    container: {
        flex: 1,
        backgroundColor: "#3B64DB",
        flexDirection: "column",
    },
    containertopRow: {
        marginTop: 5,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
    },
    txtBottom: {
        fontSize: 15,
        fontWeight: "100",
    },
    imageTopRow: {
        height: 80,
        width: 80,
        ...Platform.select({
            ios: {
                borderRadius: 80 / 2,
            },
            android: {
                borderRadius: 80,
            },
        }),
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 10,
    },
    button: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    containertopRowText: {
        flexDirection: "column",
        marginLeft: 5,
    },

    containerBottom: {
        flex: 8,
        paddingRight: 20,
    },
    containerBottomItem: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "flex-start",

    }, icon: {
        width: 24,
        height: 24,
    },
})