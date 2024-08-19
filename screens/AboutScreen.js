import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Linking } from "react-native";
import {
    Icon,
    Layout,
    TopNavigation,
    Divider,
    Text

} from '@ui-kitten/components';
//import Sound from 'react-native-sound';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class AboutScreen extends React.Component {
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
                    subtitle='Tentang Kami'
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
                    <Layout style={{ padding: 15,  paddingHorizontal :20  }}>
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
                            Apa itu C4OMI ?
                        </Text>
                        <Text style={{ textAlign: "justify" }}>
                            {"\n"}
                            • C40MI adalah Komunitas Akar Rumput dari Keluarga-keluarga dan Individu-individu yang terdampak oleh GKM (Gangguan Kesehatan Mental), sehingga mereka tidak sendirian, tetapi belajar saling menerima, mendukung, mengobarkan harapan, memberdayakan, bahkan berkarya, berdampak bagi sesama.
                            {"\n"}
                            • C4OMI memberikan penyuluhan, pendampingan, pembelaan (advocacy) agar mereka belajar membangun kehidupan yang sehat, seimbang, berkualitas, dan dihormati, tanpa diskriminasi dan stigma.
                            {"\n"}
                            • C4OMI membangun jejaring narasumber dan informasi bantuan konsultasi, perawatan, pengobatan yang bisa diakses dan digunakan bagi mereka yang membutuhkan.
                            {"\n"}
                        </Text>
                        <Image style={{ marginTop: 0, width: width - 40, height: (width - 40) / 5 }}
                            source={require('../assets/logo.png')}
                        />
                        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                            Visi
                        </Text>
                        <Text style={{ textAlign: "center" }}>
                            VISI kami
                        </Text>
                        <Text style={{ textAlign: "justify" }}>
                            C4OMI membayangkan sebuah dunia di mana orang-orang yang terkena Gangguan Kesehatan Mental, dapat hidup sehat dan menikmati kehidupan yang didukung oleh komunitas yang peduli.
                        </Text>
                        <Text style={{ textAlign: "center", fontWeight: "bold", paddingTop: 30 }}>
                            Misi
                        </Text>
                        <Text style={{ textAlign: "center" }}>
                            MISI kami
                        </Text>
                        <Text style={{ textAlign: "justify" }}>
                            C4OMI memberikan edukasi, dukungan, advokasi, dan inisiatif untuk mencerahkan masyarakat agar anggota keluarga yang terkena Gangguan Kesehatan Mental dan pihak keluarganya dapat membangun kehidupan yang lebih baik.
                        </Text>
                        <Text style={{ textAlign: "center", fontWeight: "bold", paddingTop: 30 }}>
                            Nilai
                        </Text>
                        <Text style={{ textAlign: "center" }}>
                            NILAI kami (H.A.T.I)
                        </Text>
                        <Text style={{ textAlign: "justify" }}>
                            • HARAPAN: Kami percaya pada kemungkinan pemulihan, kesehatan, dan potensi dalam diri kita semua.
                            {"\n"}
                            • ASIH – ASAH – ASUH: Kami mempraktikkan rasa hormat, kebaikan, dan empati sambil memberi penyuluhan, pendampingan, pencerahan dan advokasi.
                            {"\n"}
                            • TUMBUH KEMBANGKAN: Kami melakukan pemberdayaan yang menumbuh-kembangkan kepercayaan diri, kemandirian, dan semangat saling membantu dalam misi kami.
                            {"\n"}
                            • INKLUSI: Kami merangkul beragam latar belakang budaya, etnis, dan perspektif kepercayaan.
                            {"\n"}
                            {"\n"}

                            UPAYA kami
                            {"\n"}
                            • Kami mendidik. Ditawarkan kepada aneka komunitas di seluruh Indonesia atau komunitas berbahasa Indonesia dimana saja, perihal program pendidikan C4OMI secara ‘online‘ (dimana memungkinkan, secara ‘onsite‘) yang memastikan sebanyak mungkin keluarga, individu, dan pendidik mendapatkan dukungan dan informasi yang mereka butuhkan.
                            {"\n"}
                            • Kami mendukung. Di mana saja komunitas berbahasa Indonesia berada, agar upaya kolaborasi demi menolong terselenggaranya kelompok pendukung (Support group, peer – connection, women connection), untuk mereka yang menderita Gangguan Kesehatan mental, maupun pihak keluarganya (care giver), sehingga tidak ada yang merasa sendirian dalam mengalami pergumulan kesehatan mental mereka. (Sedang mulai dirintis)
                            {"\n"}
                            • Kami mendengar. C4OMI HelpLine mengupayakan layanan bagi yang membutuhkan informasi dan koneksi kolaboratif terkait konseling, perawatan atas anggota keluarga yang mengalami Gangguan Kesehatan Mental dan/atau pihak kerabatnya. (Masih dalam persiapan)
                            {"\n"}
                            • Kami menyuarakan. Acara dan kegiatan yang membangkitkan kesadaran publik, membangun atmosfir yang melawan stigma dan mendorong pemahaman. Bekerja sama dengan wartawan untuk memastikan masyarakat kita memahami betapa pentingnya kesehatan mental. (Akan diupayakan sejauh memungkinkan)
                            {"\n"}
                            C4OMI bergandengan tangan dengan pihak-pihak yang memiliki visi dan misi yang sejalan dalam mendukung pekerjaan penting ini dan untuk menularkan dampak dari perjuangan bersama ini.

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