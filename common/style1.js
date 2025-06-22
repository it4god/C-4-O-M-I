import { StyleSheet, Platform } from 'react-native';
import * as eva from '@eva-design/eva';
export default StyleSheet.create({
    content_container: {
        flexDirection: "column",
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 18
    },
    content_container_transition_screen: {
        flexDirection: "column",
        marginHorizontal: 30,
        marginVertical: 30
    },
    content_container_segment: {
        flexDirection: "column",
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 0,
    },
    content_container_catatan: {
        flexDirection: "column",
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingTop: 24,
    },
    content_title_text: {
        textAlign: "center"
    },
    content_title_text_jam: {
        textAlign: "center",
        paddingBottom: 12,
        color: eva['dark']['color-alter-transparent-200']
    },
    content_title_text_sambutan: {
        paddingBottom: 12,
        color: eva['dark']['color-alter-transparent-200']
    },
    content_attribute_grouper: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12
    },
    content_attribute_container: {
        flexDirection: "row",
        marginRight: 8
    },
    content_attribute_container_days: {
        flexDirection: "row",
        marginRight: 0
    },
    content_attribute_icon: {
        height: 14,
        width: 14,
        marginRight: 4
    },
    content_attribute_text: {
    },
    content_subscribe_button: {
        marginTop: 18,
        alignSelf: 'stretch',
        alignItems: "center"
    },
    content_subscribe_button_2: {
        marginTop: 10,
        paddingTop: 10,
        alignSelf: 'stretch',

    },
    content_subscribe_text: {
        paddingVertical: 8,

    },
    content_subscribe_text_2: {
        paddingVertical: 8
    },
    content_subcribe_text_feq: {
        paddingVertical: 8,
        flex: 8
    },
    content_mainaction_grouper: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 14
    },
    content_mainaction_container: {
        flexDirection: "column",
        marginRight: 12,
        alignItems: "center",
        width: 80
    },
    content_mainaction_icon: {
        width: 24,
        height: 24,
        marginBottom: 6
    },
    content_mainaction_text: {
        textAlign: 'center'
    },
    content_meta_base_container: {
        paddingHorizontal: 12,
        paddingVertical: 16
    },
    content_vocareori_container: {
        alignSelf: 'flex-start',
        alignItems: "center",
        backgroundColor: "#2C2C2C",
        borderRadius: 4
    },
    content_vocareori_text: {
        padding: 4
    },
    content_creditdesc_container: {
        marginTop: 4
    },
    content_tabview_container: {
        paddingHorizontal: 12,
        paddingVertical: 16
    },
    content_session_grouper: {
        marginTop: 4
    },
    content_session_container: {
        marginTop: 8
    },
    content_session_meta_container: {
        flexDirection: 'row'
    },
    content_session_completed_text: {
        marginRight: 8
    },
    content_author_container: {
        marginTop: 12,
        flexDirection: 'row'
    },
    content_author_avatar: {
        marginRight: 12
    },
    content_author_desc_container: {
        flexDirection: "column",
        flexWrap: 'nowrap',
        flex: 1
    },
    content_container_feq: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    content_container_bottom: {
        marginRight: 8,
        backgroundColor: '#000'
    },
    content_container_day: {
        marginRight: 8,
        backgroundColor: '#2d2d2d'
    },
    button_topic: {
        margin: 5, borderRadius: 20, backgroundColor: "#1d1d1d", borderColor: "#1d1d1d"
    },
    button_feq: {
        margin: 5, borderRadius: 20,
    },
    button_feq_selected: {
        margin: 5, borderRadius: 20,
        

    },
    progressbar_segment: {
        paddingHorizontal: 20
    },
    content_title_progressbar_segment: {
        textAlign: "center",
        paddingBottom: 10
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    }, backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    tab1: {
        marginBottom: 10,
        flex: 1.2,
    },
    tab2: {
        marginBottom: 10,
        flex: 1.2,
    },
    icon: {
        width: 24,
        height: 24,
      },

});
