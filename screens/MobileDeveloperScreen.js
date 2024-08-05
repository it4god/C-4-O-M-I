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
export default class MobileDeveloperScreen extends React.Component {
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
                    subtitle='Pengembang Aplikasi'
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
                    <Layout style={{ padding: 15, paddingHorizontal :20  }}>
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
                            Pengembang Aplikasi C4OMI
                        </Text>
                        <Text style={{ textAlign: "justify" }}>
                            {"\n"}
                            Saya, Jeffrey Lim, pengembang Aplikasi Android C4OMI kelahiran Bandung 7 Juni 1980 ini mempunyai hobi membaca, menulis, merenung, mengajar, membuat website dan aplikasi dan hal-hal seputar programming.
                            Di tahun 2000, saat menempuh kuliah Bachelor of Computing di Sydney, Jeffrey didiagnosa menderita gangguan Skizoafektif. Sesudah kuliah S1-nya di University of Technology Sydney (UTS), Jeffrey kembali ke Indonesia dan mengambil kuliah S2 Teologi. 
                            Liku-liku perkuliahan selama 17 tahun, bolak-balik masuk sanatorium kurang lebih 10x, Jeffrey tetap menghadapi hidup dengan berharap pada anugerah Tuhan.
                            {"\n\n"}
                            Di tahun 2008, ditegakkan kembali diagnosanya sebagai Penderita Bipolar dengan gejala psikotik. Jeffrey sudah menikah dengan Laura Lee, seorang dokter dan dikaruniakan seorang anak perempuan, Fidelia Charis.
                            Jeffrey juga mempunyai usaha IT <Text style={{ color: "#0000FF" }} onPress={() => { Linking.openURL('https://limpingen.com') }}>Limpingen Soft Comp </Text> dan mengajar IT di <Text style={{ color: "#0000FF" }} onPress={() => { Linking.openURL('https://letscode.id') }}>Let's Code</Text> serta melayani di <Text style={{ color: "#0000FF" }} onPress={() => { Linking.openURL('https://nepho.id') }}>Nepho Ministry</Text> dan juga mendirikan IT Club di gereja yaitu <Text style={{ color: "#0000FF" }} onPress={() => { Linking.openURL('https://it4god.org') }}>IT4God Club</Text>.
                            {"\n\n"}
                            Sekalipun orang-orang yang bergumul dengan kesehatan mental harus menjalani pergumulan yang lebih berat dalam keseharian dibandingkan orang-orang pada umumnya, namun Jeffrey percaya bahwa kita adalah manusia yang sama berharga di mata Tuhan, turut dapat bersumbangsih dalam masyarakat, menghasilkan karya dan menjadi berkat.
                            {"\n\n"}
                            Oiya, saya juga mau sharing bahwa pengerjaan Aplikasi Mobile ini yang dimulai dipublikasikan resmi tanggal 31 Juli 2024 banyak terdorong oleh kondisi Bipolar saya yang sedang Hipomania dan penuh ide. Bersyukur untuk Tuhan yang kasih kekuatan, inspirasi dan kreatifitas. Kiranya semua boleh menjadi berkat bagi kemuliaan nama-Nya. 
                            {"\n\n"}
                            Soli Deo Gloria
                            {"\n"}
                            Jeffrey Lim {"\n"}( 5 Agustus 2024 )
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