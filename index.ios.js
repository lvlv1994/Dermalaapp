
import DrawerNavigate from './app/common/drawernavigator';
var React = require('react');
var {
    Component,
    Text,
    View,
    StyleSheet,
    AppRegistry,
} = require('react-native');


// create a react component
var App =  React.createClass({
    render:function() {
        return  <DrawerNavigate/>
    }
});

//Style the React component

AppRegistry.registerComponent('Dermala', () =>App);