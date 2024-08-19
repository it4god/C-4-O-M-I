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

export default class DisclamerScreen extends React.Component {
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
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("DrawerMenu") }}>
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
                        
                        <Text style={{ textAlign: "center", fontWeight: "bold", marginBottom:20 }}>
                            Disclaimer
                        </Text>
                        <Text style={{ textAlign: "justify" }}>
                            Aplikasi ini dikembangkan sebagai inisiatif non-profit dengan tujuan promotif dan preventif dalam kesehatan mental. Semua konten yang terdapat dalam aplikasi ini, termasuk tetapi tidak terbatas pada teks, grafik, logo, ikon, gambar, perangkat lunak, serta tulisan dan artikel yang dilisensikan oleh pihak ketiga atau berasal dari situs web NAMI (National Alliance on Mental Illness), adalah milik pengembang aplikasi atau pihak ketiga yang memberikan lisensi. Informasi dan materi ini disediakan semata-mata untuk keperluan edukasi dan peningkatan kesadaran masyarakat.
                            {"\n\n"}
                            Informasi yang diberikan, termasuk artikel yang diambil dari situs web NAMI, tidak dimaksudkan untuk menggantikan nasihat, diagnosis, atau perawatan medis profesional. Pengguna disarankan untuk berkonsultasi dengan profesional kesehatan mental atau medis yang berkualifikasi untuk evaluasi dan penanganan kondisi mereka.
                            {"\n\n"}
                            Pengembang aplikasi berhak memperbarui atau mengubah konten yang disediakan dalam aplikasi ini kapan saja tanpa pemberitahuan sebelumnya. Pengguna disarankan untuk memeriksa informasi terbaru atau pembaruan aplikasi secara berkala untuk memastikan mereka mengakses informasi yang paling terkini.
                            {"\n\n"}
                            Pengguna tidak diperkenankan menyalin, menyebarluaskan, memodifikasi, atau menggunakan konten untuk tujuan komersial tanpa izin tertulis. Penggunaan aplikasi ini hanya diperbolehkan untuk kepentingan pribadi dan non-komersial.
                            {"\n\n"}
                            Pengembang aplikasi tidak bertanggung jawab atas konten, layanan, atau materi yang disediakan oleh pihak ketiga yang mungkin diakses melalui aplikasi ini. Semua tindakan yang diambil berdasarkan informasi dari aplikasi ini sepenuhnya menjadi tanggung jawab pengguna.
                            {"\n\n"}
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