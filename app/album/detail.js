var React = require('react');
var {
    Component,
    Text,
    View,
    StyleSheet,
    Dimensions,

    Image,
} = require('react-native');
import Rating  from 'react-native-easy-rating';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

// create a react component
var detail =  React.createClass({
    getInitialState() {
        var data = this.props.navigation.state.params
        console.log(data)

        return {
            data:data
        }
    },
    render:function() {
        var data = this.state.data
        console.log(data.data.thumb)
        return  <View style = {styles.container}>
                    <View style={styles.imageBox}>
                        <Image source={{uri: data.data.thumb}}
                               style={styles.image} />
                     </View>
                    <View style={styles.infoBox}>

                        <Rating
                            rating = {data.data.rating}
                            iconWidth = {15}
                            iconHeight ={15}
                            iconSelected={require('../../assets/icon/blackStar.png')}
                            iconUnselected={require('../../assets/icon/emptyStar.png')}
                            editable = {false}
                            style = {styles.rating}/>

                        <Text style={styles.descBox}>
                            {data.data.description}
                         </Text>
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
        alignItems:'flex-start'
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
       //margin:3,
        //justifyContent:'center',
         paddingLeft:20,
        paddingTop:12,
        //flexWrap: 'wrap'
    }


});
module.exports = detail;
//Show the react component on the screen
