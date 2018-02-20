//import some code we need
var React = require('react');
var {
    Component,
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    AlertIOS
} = require('react-native');

var screenWidth = Dimensions.get('window').width;
var request = require('../common/request');
var config = require('../common/config');

// create a react component
var register =  React.createClass({

    getInitialState() {
        return {
            name: "",
            email:"",
            password:"",
            password_confirmation:"",
            errors:[]
        }
    },
    _onRegisterPressed() {
        const { navigate } = this.props.navigation;
        var email = this.state.email;
        var name = this.state.name;
        var password = this.state.password;
        var password_confirmation = this.state.password_confirmation;
        if (password !== password_confirmation) {
            return AlertIOS.alert('password does not match')
        }
        var body = {
            email:email,
            name:name,
            password:password,
            key:'signup'
        }
        var loginURL = config.api.base + config.api.signup

        request.post(loginURL,body)
            .then((data) => {
                if(data && data.success) {
                    {navigate('homepage')}
                }
            })
            .catch((err) => {
            console.log(err)
            AlertIOS.alert('please check Internet connection')
        })
    },
    render() {

        return  <View style = {styles.container}>
            <TextInput
                onChangeText = {(val) => this.setState({email:val})}
                style={styles.input} placeholder="Email"
            />
            <TextInput
                onChangeText = {(val) => this.setState({name:val})}
                style={styles.input} placeholder="Name"
            />
            <TextInput
                onChangeText = {(val) => this.setState({password:val})}
                style={styles.input} placeholder="Password"
                secureTextEntry={true}
            />
            <TextInput
                onChangeText = {(val) => this.setState({password_confirmation:val})}
                style={styles.input} placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <TouchableOpacity onPress = {this._onRegisterPressed}>
                <View style={styles.registerByEmailBtnContainer}>
                    <Text style={styles.registerByEmailBtnTitle}>register</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
});

;
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f8f2f2',
        padding: 10,
        paddingTop: 40
    },
    input: {
        marginTop: 10,
        width:screenWidth * 0.9,
        height:35,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#89c43b',
    },
    registerByEmailBtnContainer:{
        backgroundColor:'#89c43b',
        width:screenWidth * 0.9,
        height:35,
        marginTop:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },

    registerByEmailBtnTitle:{
        color:'white',
        fontSize:18
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    heading: {
        fontSize: 30,
    },
    error: {
        color: 'red',
        paddingTop: 10
    },
    loader: {
        marginTop: 20
    }
});
module.exports = register;
//Show the react component on the screen
