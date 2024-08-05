import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Alert, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Layout, Text, Input, Button, Icon, TopNavigation, Divider, Select, SelectItem } from '@ui-kitten/components';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
worldcountries = {
    "AF": "Afghanistan",
    "AX": "Aland Islands",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua And Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia And Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CV": "Cape Verde",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo",
    "CD": "Congo, Democratic Republic",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Cote D\"Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FK": "Falkland Islands (Malvinas)",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island & Mcdonald Islands",
    "VA": "Holy See (Vatican City State)",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran, Islamic Republic Of",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle Of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KR": "Korea",
    "KP": "North Korea",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao People\"s Democratic Republic",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libyan Arab Jamahiriya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MK": "Macedonia",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia, Federated States Of",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "AN": "Netherlands Antilles",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestinian Territory, Occupied",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Reunion",
    "RO": "Romania",
    "RU": "Russian Federation",
    "RW": "Rwanda",
    "BL": "Saint Barthelemy",
    "SH": "Saint Helena",
    "KN": "Saint Kitts And Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin",
    "PM": "Saint Pierre And Miquelon",
    "VC": "Saint Vincent And Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome And Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia And Sandwich Isl.",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard And Jan Mayen",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad And Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks And Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UM": "United States Outlying Islands",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "VG": "Virgin Islands, British",
    "VI": "Virgin Islands, U.S.",
    "WF": "Wallis And Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
  }

class RegisterScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            seconds: 3,
            username: "",
            password: "",
            confirmpassword: "",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            city: "",
            country: '',
            countryselect: [],
            secureTextEntry: true,

        })
        this.country = []
    }
    componentDidMount() {

        this.countryselect= []
        for (let x in worldcountries) {
            this.country.push({ "CountryCode": x, "CountryName":worldcountries[x] })
         }
         
   
        this.country.sort(function (a, b) {
            return a.CountryName.localeCompare(b.CountryName)
        });
        for (let i = 0; i < this.country.length; i++) {
            this.countryselect.push(<SelectItem key={i} title={this.country[i].CountryName} />)
        }
        this.setState({ countryselect: this.countryselect })



    }


    render() {
        return (
            <Layout style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    title='C4OMI Indonesia'
                    subtitle='Registrasi'
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
                                this.Share();
                            }}>
                                <Icon
                                    style={styles.icon}
                                    fill='#8F9BB3'
                                    name='share-outline'
                                />
                            </TouchableOpacity>
                        </React.Fragment>
                    )}
                />
                <Divider />
                <Layout style={{ flex: 1, margin: 20 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <Text category='h3' style={{ textAlign: "center" }}>
                            Registrasi
                        </Text>
                        <View style={{ height: 10 }}></View>
                        <Text category='p1'>Nama Depan:</Text>
                        <Input
                            placeholder='Firstname'
                            value={this.state.firstname}
                            onChangeText={firstname => this.setState({ firstname: firstname })}
                        />

                        <View style={{ height: 10 }}></View>
                        <Text category='p1'>Nama Belakang:</Text>
                        <Input
                            placeholder='Lastname'
                            value={this.state.lastname}
                            onChangeText={lastname => this.setState({ lastname: lastname })}
                        />

                        <View style={{ height: 10 }}></View>
                        <Text category='p1'>Email:</Text>
                        <Input
                            placeholder='Email'
                            value={this.state.email}
                            onChangeText={email => this.setState({ email: email })}
                        />


                        <View style={{ height: 10 }}></View>
                        <Text category='p1'>WA / Telpon:</Text>
                        <Input
                            placeholder='Phone'
                            value={this.state.phone}
                            onChangeText={phone => this.setState({ phone: phone })}
                        />

                        <View style={{ height: 10 }}></View>
                        <Text category='p1'>Kota</Text>
                        <Input
                            placeholder='Kota'
                            value={this.state.city}
                            onChangeText={city => this.setState({ city: city })}
                        />
                        <View style={{ height: 10 }}></View>
                        <Text category='p1'>Negara:</Text>
                        <Select

                            placeholder=''
                            value={this.state.country == '' ? 'Indonesia' : this.country[this.state.country - 1].CountryName}
                            selectedIndex={this.state.country}
                            onSelect={index => { this.setState({ country: index }); }}>
                            {this.countryselect}
                        </Select>
                        <View style={{ height: 10 }}></View>
                        <Text category='p1'>Username :</Text>
                        <Input
                            placeholder='Username'
                            value={this.state.username}
                            onChangeText={username => this.setState({ username: username })}
                        />
                        <View style={{ height: 10 }}></View>
                        <Text category='p1'>Password :</Text>
                        <Input
                            placeholder='Password'
                            value={this.state.password}
                            onChangeText={password => this.setState({ password: password })}
                            secureTextEntry={this.state.secureTextEntry}
                            accessoryRight={(props) => (<TouchableWithoutFeedback onPress={(props) => {
                                this.setState({ secureTextEntry: !this.state.secureTextEntry })
                            }}>
                                <Icon
                                    {...props}
                                    name={this.state.secureTextEntry ? 'eye-off' : 'eye'}
                                />
                            </TouchableWithoutFeedback>)}
                        />
                        <View style={{ height: 10 }}></View>
                        <Text category='p1'>Confirm Password :</Text>
                        <Input
                            placeholder='Confirm Password'
                            value={this.state.confirmpassword}
                            onChangeText={confirmpassword => this.setState({ confirmpassword: confirmpassword })}
                            secureTextEntry={this.state.secureTextEntry}
                            accessoryRight={(props) => (<TouchableWithoutFeedback onPress={(props) => {
                                this.setState({ secureTextEntry: !this.state.secureTextEntry })
                            }}>
                                <Icon
                                    {...props}
                                    name={this.state.secureTextEntry ? 'eye-off' : 'eye'}
                                />
                            </TouchableWithoutFeedback>)}
                        />
                        <View style={{ height: 10 }}></View>
                        <Layout style={{ flexDirection: "row", height: 50 }}>
                            <Button style={{ margin: 2 }} size='medium'>
                                Register
                            </Button>
                            <View style={{ width: 10 }}></View>
                            <Button status='warning' style={{ margin: 2 }} size='medium' onPress={() => {
                                this.props.navigation.pop()
                            }} >
                                Batal
                            </Button>
                        </Layout>
                    </ScrollView>
                </Layout>
            </Layout>
        )
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

export default RegisterScreen