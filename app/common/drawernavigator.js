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
var AppNavigate = require('../common/navigator')
import Icon from "react-native-vector-icons/Ionicons";
const DrawerNavigate = DrawerNavigator({
        homepage: {
            path: '/',
            screen: AppNavigate,
            navigationOption : {
                tarBarLabel:'screen 1',
                drawerIcon:({tintColor}) => {
                    return <Icons
                        name="navicon-round"
                        size={24}
                        style={{color:tintColor}}>

                    </Icons>

                }
            }

        },
        register: {
            screen: register,

        }

    },
    {
        initialRouteName:'homepage',
        drawerPosition:'left ',
        contentOptions: {
            activeTintCollor:'red'
        }

    }


);
module.exports = DrawerNavigate;