import React, {Component} from 'react';
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AlertIOS,
    TextInput
} = require( 'react-native');

var Dimensions = require('Dimensions');

var screenWidth = Dimensions.get('window').width;

var config = require('../common/config');

var request = require('../common/request');

var LoginByEmail = React.createClass({

        getInitialState(){
            return {
                loginBtnBg: {backgroundColor: '#959595'},
                loginBtnTitleColor: {color: '#757575'},
                email:"",
                password:"",
            }
        },

        render(){
            return (
                <View style={styles.container}>

                    <View style={styles.textInputContainer}>

                        <TextInput placeholder='Email/phone number'
                                   style={styles.textInputStylePhoneNum}
                                   keyboardType='phone-pad'
                                   multiline={false}
                                   clearButtonMode='while-editing'
                                   placeholderTextColor={'#939393'}
                                   onChangeText={(text) => this._phoneNumTextWatch(text)}
                        >

                        </TextInput>

                        <View style={styles.dividingLine}>

                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                            <TextInput placeholder='password'
                                       style={styles.textInputStylePWD}
                                       secureTextEntry={true}
                                       multiline={false}
                                       clearButtonMode='while-editing'
                                       placeholderTextColor={'#939393'}
                                       ref='pwd'
                                       onChangeText = {(val) => this.setState({password:val})}
                            >

                            </TextInput>

                            <View style={styles.verticalLine}>

                            </View>

                            <Text style={styles.findPswBtn}>forget password</Text>
                        </View>

                        <TouchableOpacity onPress={()=>this._loginBtnOnClick()}>
                            <View ref='loginBtn'
                                  style={[styles.loginBtnStyle,this.state.loginBtnBg]}
                            >
                                <Text style={[styles.loginBtnTitle,this.state.loginBtnTitleColor]}>log in</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.registerAccountBtn}>register account</Text>

                    </View>
                </View>
            );
        },

        _loginBtnOnClick(){
            const { navigate } = this.props.navigation;
            var email = this.state.email;
            var password = this.state.password;
            var body = {
                email:email,
                password:password,
                key:'signup'
            }
            var signupURL = config.api.base + config.api.login
            request.post(signupURL,body)
                .then((data) => {
                    console.log(data)
                    if(data && data.success) {
                        {navigate('homepage')}
                    }
                    else {
                        AlertIOS.alert('please check you email or password')
                    }
                })

        },
    _phoneNumTextWatch(text){

        if (text.length > 0) {
            this.setState({
                loginBtnBg: {backgroundColor: '#F85959'},
                loginBtnTitleColor: {color: '#ffffff'},
                email:text
            });
        } else {
            this.setState({
                loginBtnBg: {backgroundColor: '#959595'},
                loginBtnTitleColor: {color: '#757575'},
                email:text
            });
        }
    },

    }
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        flex: 1,
        alignItems: 'center'
    },

    textInputContainer: {
        width: screenWidth * 0.9,
        height: 90,
        borderRadius: 20,
        borderColor: '#E8E8E8',
        marginTop: 90,
        borderWidth: 0.5
    },

    textInputStylePhoneNum: {
        width: screenWidth * 0.9,
        height: 45,
        paddingLeft: 10,
        paddingRight: 10
    },

    textInputStylePWD: {
        width: screenWidth * 0.9 - 80,
        height: 45,
        paddingLeft: 10,
        paddingRight: 10
    },

    dividingLine: {
        backgroundColor: '#E8E8E8',
        height: 0.5,
        width: screenWidth * 0.9
    },

    verticalLine: {
        backgroundColor: '#E8E8E8',
        height: 15,
        width: 0.5
    },

    findPswBtn: {
        color: '#999999',
        fontSize: 15,
        width: 70,
        backgroundColor: '#00000000',
        marginLeft: 10,
    },

    loginBtnStyle: {
        height: 40,
        borderRadius: 20,
        width: screenWidth * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    loginBtnTitle: {
        fontSize: 18,
    },

    registerAccountBtn: {
        color: '#2A90D7',
        fontSize: 17,
        marginTop: 25,
        alignSelf: 'center'
    }
});
module.exports = LoginByEmail;