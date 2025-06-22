import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Linking } from "react-native";
import {
    Icon,
    Layout,
    TopNavigation,
    Divider,
    Text,
    Button

} from '@ui-kitten/components';
import VerticalSlider from 'rn-vertical-slider';
//import Sound from 'react-native-sound';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class StressLevelScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            value: 5
        }
    }
    async componentDidMount() {
        this.screenname = this.props.route.params.screenname;
        this.toscreen = this.props.route.params.toscreen
        this.status = this.props.route.params.status
        this.beforeafter = this.props.route.params.beforeafter
        this.value = this.props.route.params.value
        this.nextbutton = this.props.route.params.nextbutton
        this.subs = this.props.navigation.addListener("focus", () => {
            this.setState({ value: 5 }, ()=>{
                this.setState({ loading : true})
            })
        })
        this.setState({ loading: true, value: 5 })

    }


    render() {
        return (
            <Layout style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    title={this.screenname}
                    subtitle='Check Stress Level'
                    accessoryLeft={(props) => (
                        <React.Fragment>
                            <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
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
                <Layout style={{ flex: 1 }}>
                    <Layout style={{ padding: 15, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginBottom: 60, textAlign: "center", justifyContent: "center", alignItems: "center" }} category="h6">Check Your Stress Level</Text>
                        <VerticalSlider
                            value={this.state.value}
                            onChange={(value) => this.setState({ value: value })}
                            height={350}
                            width={50}
                            step={1}
                            min={0}
                            max={10}
                            borderRadius={29}
                            minimumTrackTintColor="#635884"
                            maximumTrackTintColor="#000"
                            showIndicator
                            renderIndicatorHeight={0}
                            renderIndicator={() => (
                                <View
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 50,
                                        marginLeft: -70,
                                        marginTop: 25,
                                        backgroundColor: '#7F7D7F',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: '#fff' }}>{this.state.value}</Text>
                                </View>
                            )}
                            containerStyle={{ backgroundColor: '#e0e0e0', borderRadius: 10 }}
                            sliderStyle={{ backgroundColor: '#180F29', borderRadius: 5 }}
                        />
                        <Text style={{ marginTop: 20, textAlign: "center", justifyContent: "center", alignItems: "center" }} category="h6">{this.status}</Text>

                    </Layout>

                </Layout>
                <View style={{ flexDirection: 'column-reverse' }}>
                    <Button style={{ marginHorizontal: 30, borderRadius: 5, marginVertical: 30 }} onPress={() => {
                        if (this.beforeafter == "before")
                            this.props.navigation.replace(this.toscreen, { "screenname": this.screenname })
                        else
                            this.props.navigation.replace("CopingSkill")
                    }} size="small" accessoryRight={(props) => (
                        <Icon width="24" height="24" fill={'#fff'} {...props} name='arrow-forward-outline' />
                    )}><Text style={{}}>{this.nextbutton}</Text></Button>
                </View>
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
/*
 renderIndicator={() => (
                                <View
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius:50,
                                        marginLeft:50,
                                        backgroundColor: '#007B7F',
                                        justifyContent: 'center',
                                        alignItems: 'center',
  screens/StressLevelScreen.js                                  }}
                                >
                                    <Text style={{ color: '#fff' }}>{this.state.value}</Text>
                                </View>
                            )}

*/