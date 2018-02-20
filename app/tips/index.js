//import some code we need
var React = require('react');
var {
    Component,
    Text,
    View,
    StyleSheet,
} = require('react-native');


// create a react component
var tips =  React.createClass({
    render:function() {
        return  <View style = {styles.container}>
            <Text>
                Tips
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
module.exports = tips;
//Show the react component on the screen
