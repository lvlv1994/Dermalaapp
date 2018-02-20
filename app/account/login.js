//import some code we need
var React = require('react');
var {
    Component,
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    Dimensions,
    Image,
    TouchableOpacity,


} = require('react-native');
//var Button = require('react-native-button')

// create a react component
var AWS = require('aws-sdk');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

var login =  React.createClass({
    getInitialState() {
        return {

        }
    },
    render() {
        const { navigate } = this.props.navigation;
        return  <View style = {styles.container}>
                    <View style={styles.topViewContainer}>
                        <Image source={require('../../assets/logo/DermalaIcon.png')}
                               style={styles.topImageStyle}/>

                    </View>
                    <View style={styles.bottomViewContainer}>
                        <TouchableOpacity onPress = {()=>{navigate('loginByEmail')}}>
                            <View style={styles.loginByPhoneBtnContainer}>
                                <Text style={styles.loginByPhoneBtnTitle}>log in</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{navigate('register')}}>
                            <View style={styles.registeredBtnContainer}>
                                <Text style={styles.registeredBtnTitle}>register</Text>
                             </View>
                        </TouchableOpacity>

                    </View>

        </View>
    }
});

//Style the React component
var styles = StyleSheet.create({
    container: {
        flex:1,
        padding:10,
        backgroundColor:'#f8f2f2'
    },
    topViewContainer: {
        flex:3,
        marginTop:22,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f8f2f2'
    },
    bottomViewContainer: {
        flex:2,
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'#f8f2f2'
    },
    topImageStyle:{
        width:screenWidth * 0.5,
        height:screenWidth * 0.5,
    },
    loginByPhoneBtnContainer:{
        backgroundColor:'#89c43b',
        width:screenWidth * 0.5,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },

    loginByPhoneBtnTitle:{
        color:'white',
        fontSize:18
    },

    registeredBtnContainer:{
        width:screenWidth * 0.5,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        borderColor:'#89c43b',
        borderWidth:0.5,
        marginTop:10
    },

    registeredBtnTitle:{
        color:'#89c43b',
        fontSize:18
    },

    title: {
        marginBottom:20,
        color:'#333',
        fontSize:20,
        textAlign:'center'
    },
    inputField: {
        flex:1,
        height:60,
        padding:5,
        color:'#666',
        fontSize:16,
        backgroundColor:'#fff',
        borderRadius:4

    },

});
module.exports = login;
//Show the react component on the screen
