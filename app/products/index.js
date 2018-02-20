//import some code we need
var React = require('react');
var {
    Component,
    Text,
    View,
    StyleSheet,
} = require('react-native');


// create a react component
var products =  React.createClass({
    render:function() {
        return  <View style = {styles.container}>
            <Text>
                product list
            </Text>
        </View>
    }
});

//Style the React component
var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center', //move stuff height wise
        alignItems:'center'      // move stuff width wise
    }
});
module.exports = products;
//Show the react component on the screen
