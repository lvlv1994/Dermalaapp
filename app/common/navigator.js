var React = require('react') ;
var{ TouchableOpacity } = require('react-native');
import { StackNavigator,DrawerNavigator } from 'react-navigation';
var album = require('../album/index');
var camera = require('../camera/index');
var products = require('../products/index');
var tips = require('../tips/index');
var detail = require('../album/detail');
var homepage = require('../Homepage');
var login = require('../account/login');
var loginByEmail = require('../account/loginByEmail');
var register = require('../account/register');
import Icon from "react-native-vector-icons/Ionicons";


const AppNavigate = StackNavigator({
    homepage: {
        screen: homepage,
        navigationOptions:({navigation}) => ({
            title: "Main",
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                    <Icon name="ios-menu" size={30} />
                </TouchableOpacity>
            ),
            headerStyle: { paddingRight: 10, paddingLeft: 10 }
        })
    },
    camera:{screen:camera,
        navigationOptions: {
            title:'camera'
        }},
    album:{screen:album,
        navigationOptions: {
            title:'album'
        }},
    tips:{
        screen:tips,
        navigationOptions: {
            title:'tips'
        }},
    detail: {
        screen: detail,
            navigationOptions:
                ({navigation}) => ({
            title: navigation.state.params.data.date

        }),
    },
    login: {
        screen: login,
        navigationOptions: ({navigation}) => ({
            title: 'login'
        }),
    },
    loginByEmail: {
        screen: loginByEmail,
        navigationOptions: ({navigation}) => ({
            title: 'log in'
        }),
    },
    register: {
        screen: register,
        navigationOptions: ({navigation}) => ({
            title: 'register'
        }),
    }
});

module.exports = AppNavigate;