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

export default class DisclamerGKMScreen extends React.Component {
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
                    subtitle='Disclaimer'
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
                <ScrollView showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                >
                    <Layout style={{ padding: 15, paddingHorizontal: 20 }}>
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
                        <Text style={{ textAlign: "center", fontWeight: "bold", marginBottom: 20 }}>
                            Love and Support 
                        </Text>
                        <Text style={{ textAlign: "justify" }}>
                            Pribadi-pribadi yang bergumul dengan gangguan kesehatan mental adalah ciptaan Tuhan yang berharga, mempunyai dignitas, dan makna hidup. Mereka mempunyai kelemahan namun mereka masih dapat tetap berkarya, menghasilkan dan menjadi berkat.{"\n\n"}Halaman ini adalah mengenai karya-karya dan jasa dari orang-orang dengan GKM yang ditawarkan kepada siapa saja yang mempunyai hati untuk mendukung. Setiap dukungan Anda dapat memberikan semangat hidup dan dorongan motivasi bagi orang-orang dengan GKM untuk terus produktif berkarya. Ini adalah satu aksi kasih kemanusiaan yang meninggikan kasih dan nilai-nilai kemanusiaan. 
                        </Text>
                        <View style={{height:30}}>

                        </View>
                        <Text style={{ textAlign: "center", fontWeight: "bold", marginBottom: 20 }}>
                            Disclaimer
                        </Text>
                        <Text style={{ textAlign: "justify" }}>
                            Informasi yang ditampilkan dalam Aplikasi C4OMI disini bertujuan mempromosikan karya, produk dan/atau jasa dari individu dengan Gangguan Kesehatan Mental (GKM) sebagai bagian dari upaya pemberdayaan dan inklusi sosial. Semua hasil karya, produk dan jasa yang ditampilkan sepenuhnya merupakan hasil dari kemampuan dan kreativitas mereka. Kami berkomitmen untuk mendukung hak dan kesejahteraan mereka tanpa diskriminasi.
                            {"\n\n"}
                            Penayangan ini disediakan oleh C4OMI merupakan layanan non-profit, berperan sebagai penyedia sarana dan koneksi bagi pembeli atau pengguna yang ingin berinteraksi langsung dengan penyedia karya, produk, atau jasa. Segala bentuk transaksi, komunikasi, atau kesepakatan yang terjadi merupakan tanggung jawab penuh antara penyedia dan pembeli/pengguna. C4OMI melakukan seleksi berdasarkan kesepakatan koridor nilai dan integritas yang berlaku umum, C4OMI tidak bertanggung jawab atas kualitas, keberlanjutan, maupun hasil dari transaksi yang dilakukan.
                        </Text>
                        <Image style={{ marginTop: 0, width: width - 40, height: (width - 40) / 5 }}
                            source={require('../assets/logo.png')}
                        />
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