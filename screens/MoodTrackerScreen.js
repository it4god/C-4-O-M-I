import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions, Share,
    Alert,
} from "react-native";
import * as eva from '@eva-design/eva';
import { Datepicker, MenuItem, Layout, TopNavigation, BottomNavigation, BottomNavigationTab, Divider, Text, Card, Button, Menu as UKMenu, TopNavigationAction, Icon, OverflowMenu, } from '@ui-kitten/components';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import SliderText from 'react-native-slider-text';
import SQLite from 'react-native-sqlite-2'
import { BarChart } from "react-native-gifted-charts";
import moment from 'moment';
import { Directions } from "react-native-gesture-handler";
const barData = [

    { value: 250, label: 'M' },

    { value: 500, label: 'T', frontColor: '#177AD5' },

    { value: 745, label: 'W', frontColor: '#177AD5' },

    { value: 320, label: 'T' },

    { value: 600, label: 'F', frontColor: '#177AD5' },

    { value: 256, label: 'S' },

    { value: 300, label: 'S' },

];
class MoodTrackerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 5,
            selectedIndex: 0,
            date: new Date(),
            date2: new Date(),
            showchart: false,
            barData: []
        };



    }

    async componentDidMount() {

        const db = SQLite.openDatabase('moodtracker.db', '1.0', '', 1)

        try {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS mood(' +
                        'id INTEGER PRIMARY KEY NOT NULL, ' +
                        'thedate TEXT, ' +
                        'value INTEGER);',
                        [],
                        this.successCB,
                        this.errorStatementCB
                    )
                },
                error => {
                    console.log(error);
                },
                () => {

                }
            );

        }
        catch (e) {
            console.log(e);
        }

    };
    async Share() {

        this.message = ''

        try {
            const result = await Share.share({
                message: this.message

            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }
    errorCB = (err) => {
        console.error('error:', err)
        this.addLog('Error: ' + (err.message || err))
    }

    errorStatementCB = (_tx, err) => {
        this.errorCB(err)
        return false
    }
    successCB = () => {
        console.log('SQL executed ...')
    }

    openCB = () => {
        this.addLog('Database OPEN')
        this.setState(this.state)
    }

    closeCB = () => {
        this.addLog('Database CLOSED')
    }

    deleteCB = () => {
        this.addLog('Database DELETED')
    }

    Save() {
        let sql = "INSERT INTO mood (thedate, value) VALUES (?, ?)"
        const db = SQLite.openDatabase('moodtracker.db', '1.0', '', 1)
        console.log("Hai")
        try {
            db.transaction(
                tx => {
                    tx.executeSql("SELECT * from mood WHERE thedate = '" + moment(this.state.date).format("YYYY-MM-DD") + "'", [], (tx, results) => {
                        const rows = results.rows;
                        if (rows.length > 0) {
                            tx.executeSql("UPDATE mood SET value = " + this.state.value + " WHERE thedate = '" + moment(this.state.date).format("YYYY-MM-DD") + "'", [], (tx, results) => {
                                Alert.alert("Update Mood Tracker", "Update Mood for Date " + this.state.date.toDateString() + " with value : " + this.state.value)
                            })
                        }
                        else {
                            tx.executeSql(sql, [moment(this.state.date).format("YYYY-MM-DD"), this.state.value]);
                            (tx, error) => {
                                console.log(error);
                            };
                            Alert.alert("Insert Mood Tracker", "Insert Mood for Date " + this.state.date.toDateString() + " with value : " + this.state.value)
                        }
                    })
                },
                error => {
                    console.log(error);
                },
                () => {
                }
            );
        }
        catch (e) {
            console.log(e);
        }
    }
    async Search() {
        const db = SQLite.openDatabase('moodtracker.db', '1.0', '', 1)
        const nextWeek = new Date(this.state.date2)
        nextWeek.setDate(new Date(this.state.date2).getDate() + 7)
        let sql = "SELECT * from mood WHERE thedate BETWEEN date('" + moment(this.state.date2).format("YYYY-MM-DD") + "') AND date('" + moment(nextWeek).format("YYYY-MM-DD") + "') ORDER BY thedate ASC"
        console.log(sql)
        try {
            db.transaction(
                tx => {
                    tx.executeSql(sql, [], async (tx, results) => {
                        const rows = results.rows;
                        if (rows.length > 0) {
                            this.chartdata = []
                            for (let i = 0; i < rows.length; i++) {
                                if (rows.item(i).value > 7) {
                                    this.chartdata.push(
                                        { "value": rows.item(i).value, "label": rows.item(i).thedate.substring(rows.item(i).thedate.length - 2, rows.item(i).thedate.length), frontColor: 'green' }
                                    )
                                }
                                else if (rows.item(i).value > 3) {
                                    this.chartdata.push(
                                        { "value": rows.item(i).value, "label": rows.item(i).thedate.substring(rows.item(i).thedate.length - 2, rows.item(i).thedate.length), frontColor: '#177AD5' }
                                    )
                                }
                                else if (rows.item(i).value > 1) {
                                    this.chartdata.push(
                                        { "value": rows.item(i).value, "label": rows.item(i).thedate.substring(rows.item(i).thedate.length - 2, rows.item(i).thedate.length), frontColor: 'yellow' }
                                    )
                                }
                                else {
                                    this.chartdata.push(
                                        { "value": rows.item(i).value, "label": rows.item(i).thedate.substring(rows.item(i).thedate.length - 2, rows.item(i).thedate.length), frontColor: 'red' }
                                    )
                                }

                            }
                            this.setState({ barData: this.chartdata, showchart: true });

                        }
                        else {
                            this.chartdata = []
                            this.setState({ barData: this.chartdata, showchart: true });
                            Alert.alert("Data tidak Ada")
                        }
                    })
                },
                error => {
                    console.log(error);
                },
                () => {
                }
            );
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' }} level='1'>
                    <TopNavigation
                        alignment='center'
                        title='C4OMI Indonesia'
                        subtitle='Mood Tracker'
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
                    <View style={{ flex: 1 }}>
                        {this.state.selectedIndex == 0 && (
                            <Layout>
                                <Layout style={{ marginTop: 30, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <SliderText

                                        thumbTintColor={"green"}
                                        minimumTrackTintColor={"#3592A8"}
                                        maximumValue={10}
                                        stepValue={1}
                                        minimumValue={1}
                                        minimumValueLabel="Not Feeling Well"
                                        maximumValueLabel="Feeling Great"
                                        onValueChange={(value) => this.setState({ value: value })}
                                        sliderValue={this.state.value}
                                        value={this.state.value}
                                        customLabelStyle={{ color: "#000", fontSize: 15 }}
                                        customCountStyle={{ color: "#000", fontSize: 0 }}
                                    />



                                    <View style={{  flexDirection:"row" }}>
                                        <View style={{flex:2, flexDirection:"row"}}>
                                            <Image  style={{ flex: 2.5,  height: 64, resizeMode:"stretch" }}
                                                source={require('../assets/sad-tear.png')}
                                            />
                                        </View>
                                        <Text style={{flex:5,justifyContent: 'center', alignItems: 'center',textAlign:"center" }} category="h1">{this.state.value}</Text>
                                        <View style={{flex:2, flexDirection:"row-reverse"}}>
                                            <Image  style={{ flex: 2.5,  height: 64, resizeMode:"stretch" }}
                                                source={require('../assets/happy.png')}
                                            />
                                        </View>
                                    </View>

                                    <View>
                                        {this.state.value == 1 && (
                                            <Text category="s1">Mood Level: Bad</Text>
                                        )}
                                        {(this.state.value == 2 || this.state.value == 3) && (
                                            <Text category="s1">Mood Level: Quite Bad</Text>
                                        )}
                                        {(this.state.value == 4) && (
                                            <Text category="s1">Mood Level: Bit unwell</Text>
                                        )}
                                        {this.state.value == 5 && (
                                            <Text category="s1">Mood Level: Normal</Text>
                                        )}
                                        {(this.state.value == 6 || this.state.value == 7) && (
                                            <Text category="s1">Mood Level: Alright</Text>
                                        )}
                                        {(this.state.value == 8 || this.state.value == 9) && (
                                            <Text category="s1">Mood Level: Good</Text>
                                        )}
                                        {this.state.value == 10 && (
                                            <Text category="s1">Mood Level: Excellent</Text>
                                        )}
                                    </View>
                                </Layout>
                                <View style={{ margin: 15 }}>
                                    <Text category='s2'>
                                        {`Selected date: ${this.state.date.toDateString()}`}
                                    </Text>
                                    <Datepicker
                                        date={this.state.date}
                                        onSelect={nextDate => this.setState({ date: nextDate })}
                                    />
                                    <Button style={{ marginTop: 10 }} onPress={() => { this.Save() }}>
                                        Save
                                    </Button>
                                </View>

                            </Layout>
                        )}
                        {this.state.selectedIndex == 1 && (
                            <View>
                                <View style={{ margin: 15 }}>
                                    <Text category='s2'>
                                        {`7 Days from this Date : ${this.state.date2.toDateString()}`}
                                    </Text>
                                    <Datepicker
                                        date={this.state.date2}
                                        onSelect={nextDate => {
                                            this.setState({ date2: nextDate }, () => {
                                                this.Search()
                                            })
                                        }}
                                    />
                                    <Button style={{ marginTop: 10 }} onPress={async () => { await this.Search() }}>
                                        Search
                                    </Button>
                                </View>
                                {this.state.showchart == true && (
                                    <View style={{ marginTop: 30 }}>
                                        <BarChart
                                            vertical
                                            barWidth={22}
                                            barBorderRadius={4}
                                            maxValue={10}
                                            frontColor="lightgray"
                                            data={this.state.barData}
                                            yAxisThickness={0}
                                            xAxisThickness={0}
                                            minValue={1}
                                        />
                                    </View>
                                )
                                }
                            </View>
                        )}

                    </View>
                    <BottomNavigation

                        accessibilityIgnoresInvertColors={true}
                        selectedIndex={this.state.selectedIndex}
                        onSelect={async (index) => {
                            this.setState({ selectedIndex: index })
                            if (index == 0) {

                            }
                            else if (index == 1) {

                                const previousWeek = new Date()
                                previousWeek.setDate(new Date().getDate() - 7)
                                this.setState({ date2: previousWeek }, () => {
                                    this.Search()
                                })
                            }
                        }}>
                        <BottomNavigationTab title={"Add Mood"} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'file-add-outline'} />} />
                        <BottomNavigationTab title={"Track Mood"} icon={(props) => <Icon fill='#8F9BB3' {...props} name={'smiling-face-outline'} />} />


                    </BottomNavigation>
                </Layout>

            </SafeAreaView>

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
        marginTop: 20,
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
});


export default MoodTrackerScreen;
