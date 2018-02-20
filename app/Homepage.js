/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var React = require('react');

var {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Image,
    Button,
    Platform,

} = require('react-native');


var album = require('./album/index');
var camera = require('./camera/index');
var products = require('./products/index');
var tips = require('./tips/index');
var login = require('./account/login');
var Menu = require('./sidebar/menu');
var request = require('./common/request');
import  ImagePicker from 'react-native-image-picker';
var config = require('./common/config')
//import Icon from 'react-native-vector-icons/MaterialIcons';


var photoOptions = {
    title:'Select Avatar',
    cancelButtonTitle:'Cancel',
    takePhotoButtonTitle:'Take photos',
    chooseFromLibraryButtonTitle:'Choose album',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
};
CLOUDINARY = {
    cloud_name: 'dermala',
    api_key: '659141516262982',
    api_secret: 'JAMnMMTTUufO1mo5N7n-USVKVMY',
    base:'http://res.cloudinary.com/dermala',
    image:'https://api.cloudinary.com/v1_1/dermala/image/upload'
    //video:'https://api.cloudinary.com/v1_1/dermala/image/upload'
}

var homepage =React.createClass({
    getInitialState(){
        return {
           isOpen:false,
            selectedItem:'About'

        }
    },
    _openMycamera(){
        const { navigate } = this.props.navigation;
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            console.log(response);

            if (response.didCancel){
                return
            }
            else {

                var imgBody = new FormData()
                imgBody.append('file',image)
                let source;

                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true}
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true}
                }


                let file;
                if(Platform.OS === 'android'){
                    file = response.uri
                }else {
                    file = response.uri.replace('file://', '')
                }
                var image = {
                    file: file,
                    content_type: 'image/jpeg',
                    filename: 'myImage' + '.jpg'
                }

                // var timestamp = Date.now()
                // var tags = 'picture'
                // var folder = 'picure'
                // var signature = 'folder=' + folder + '&tags=' + tags + '&timestamp=' + timestamp + CLOUDINARY.api_secret
                //
                // signature = sha1(signature)
                var url = config.api.base + config.api.photo
                request.post(url,image)
                    .then((data) => {　
                        console.log(data)
                        navigate('camera',{'photo':response.uri,"user":data.data})
                    })
            }
        })

    },

    render(){
        const { navigate } = this.props.navigation;
        //const menu = <Menu onItemSelected={(item) =>this._onMenuItemSelected(item)}/>;

        return <View style = {styles.mainContainer}>
                <View style = {styles.sectionContainer}>
                    <View style = {styles.photoContainer}>
                        <TouchableHighlight
                            style = {styles.icon}
                            underlayColor = 'transparent'
                            onPress = {()=>this._openMycamera()

                            }>

                            <Image source={require('../assets/icon/camera-1.png')}/>

                        </TouchableHighlight>
                        <Text style = {styles.text}>
                            Take a photo
                        </Text>


                    </View>
                    <View style = {styles.tipsContainer}>
                        <TouchableHighlight
                            style = {styles.icon}
                            underlayColor = 'transparent'
                            onPress = {()=> {
                                navigate('login')
                            }}>

                            <Image source={require('../assets/icon/reminders.png')}/>

                        </TouchableHighlight>

                        <Text style = {styles.text}>
                            Tips
                        </Text>
                    </View>
                </View>

                <View style = {styles.tipsContainer}>
                    <TouchableHighlight
                        style = {styles.icon}
                        underlayColor = 'transparent'
                        onPress = {()=> {
                            navigate('album')
                        }}>

                        <Image source={require('../assets/icon/time-lapse.png')}/>

                    </TouchableHighlight>
                    <Text style = {styles.text}>
                        Progress
                    </Text>
                </View>

        </View>



    }

});



var styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        width:Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    sectionContainer:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        borderStyle:'solid',
        borderColor:'white',
        borderWidth: 1,

    },
    productContainer:{
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderStyle:'solid',
        borderColor:'white',
        borderWidth: 1,
        backgroundColor: 'transparent'

    },
    photoContainer: {
      flex: 1,
        //flexDirection:'row',
      alignItems: 'center',
        justifyContent:'center',
      borderStyle: 'solid',
      borderColor: 'white',
      borderWidth: 1,
      backgroundColor:'transparent'
    },
    tipsContainer: {
      flex: 1,
      alignItems: 'center',
      borderStyle:'solid',
      borderColor:'white',
      borderWidth: 1,
      backgroundColor: 'transparent',
    },
    icon: {
        flex: 1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
     slideInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 5,
        alignItems:'center'
    },
    image: {
       flex : 1,
       height:null,
       width:null,
        resizeMode: 'contain',
    },
    text:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        fontSize:22

    }

});

module.exports = homepage;
