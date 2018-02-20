//import some code we need
var React = require('react');
var {
    Component,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    AlertIOS,
} = require('react-native');
import Rating  from 'react-native-easy-rating';
var config = require('../common/config');
//var Button = require('react-native-button');
import Button from 'react-native-button';
var width = Dimensions.get('window').width;
var request = require('../common/request');

// create a react component
var camera =  React.createClass({
    getInitialState(){
        return {
            photo:this.props.navigation.state.params.photo,
            user:this.props.navigation.state.params.user,
            isSending:false,
            content:'',
            rating:0,
            imgurl:''

        }
    },
    _submit() {
        if (!this.state.content) {
            return AlertIOS.alert('comment can not be null')
        }
        if (this.state.isSending) {
            return AlertIOS.alert('sending')
        }
        this.setState({
            isSending:true
        },

            function(){
            var img = this.state.user.imgurl
                console.log(img)
            var body = {
                accessToken:'abc',
                creation:'123',
                content:this.state.content,
                rating:this.state.rating,
                imgurl:this.state.photo,
                key:'photo',
            }
            var url = config.api.base + config.api.comment
                request.post(url,body)
                    .then((data) => {
                        AlertIOS.alert('congratulations')
                    })

            })
    },
    render:function() {
        var data = this.state.photo
        console.log(this.state.photo)

        return  <View style = {styles.container}>
            <View style={styles.imageBox}>
                <Image source={{uri: data}}
                       style={styles.image} />
            </View>
            <View style={styles.infoBox}>

                <Rating
                    iconWidth = {15}
                    iconHeight ={15}
                    iconSelected={require('../../assets/icon/blackStar.png')}
                    iconUnselected={require('../../assets/icon/emptyStar.png')}
                    editable = {true}
                    onRate={(rating) => this.setState({rating:rating})}
                    style = {styles.rating}/>

                <TextInput style={styles.descBox}
                placeholder='input your skin issue...'
                multiline ={true}
                           onChangeText={(text) => this.setState({content:text})}
                >


                </TextInput>
                <Button sytle={styles.submitBtn}
                        onPress={this._submit}>
                    submit

                </Button>
            </View>

        </View>
    }
});


//Style the React component
var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#F5FCFF'
    },
    imageBox: {
        flex:1,
        width:width,
        height:36,
        alignItems:'center',
        //backgroundColor:'#000'
    },

    image: {
        flex : 1,
        width:width,
        height:1.5*width,
    },
    infoBox: {
        flex:1,
        margin:5,
       width:width
    },
    rating: {
        //position : 'absolute',
        //flex:1,
        //left:4,
        paddingLeft:20,
        paddingBottom:12,
        //justifyContent:'flex-start',
        //flexWrap: 'wrap'
    },
    descBox: {
        //flex:1,
        marginTop:10,
        marginBottom:10,
        //justifyContent:'center',
        //paddingLeft:20,
        padding:8,
        //flexWrap: 'wrap'
    },
    submitBtn: {
       width: width-20,
       padding:16,
        marginTop:20,
        marginBottom:20,
        borderWidth:1,
        borderColor:'#ee735c',
        borderRadius:4,
        fontSize:18
    },


});

module.exports = camera;
//Show the react component on the screen
