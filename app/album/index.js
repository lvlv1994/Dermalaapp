//import some code we need
var React = require('react');

var {
    Component,
    Text,
    View,
    StyleSheet,
    ListView,
    TouchableHighlight,
    Image,
    Dimensions,
    ActivityIndicator,
    RefreshControl,

} = require('react-native');
//var Mock = require('mockjs');
import Icon from 'react-native-vector-icons/Ionicons';
import Rating  from 'react-native-easy-rating';
var width = Dimensions.get('window').width;
var AWS = require('aws-sdk/dist/aws-sdk-react-native');

var request = require('../common/request');
var config = require('../common/config');
var detail  = require('./detail')

var cacheResults = {
    nextPage : 1,
    items:[],
    total: 0,
}
var Item = React.createClass({
    getInitialState() {
        var row = this.props.row
        return {
            row:row
        }
    },

    render(){
        var row =  this.state.row
        return (
            <TouchableHighlight onPress = {this.props.onSelect}>
                <View style={styles.item}>
                    <Text style={styles.title}
                          onPress = {this.props.onSelect}>
                        {row.date}
                    </Text>
                    <Image
                        source = {{uri: 'https://storage.googleapis.com/dermala/myImage-2017-10-13-085152.png' }}
                        style = {styles.thumb}>
                        <Rating
                            rating = {row.rating}
                            iconWidth = {15}
                            iconHeight ={15}
                            iconSelected={require('../../assets/icon/blackStar.png')}
                            iconUnselected={require('../../assets/icon/emptyStar.png')}
                            editable = {false}
                            style = {styles.rating}/>
                    </Image>
                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon
                                name="ios-chatboxes-outline"
                                size ={28}
                                style={styles.commentIcon}/>
                            <Text style = {styles.handleText}>
                                View comments
                            </Text>

                        </View>

                    </View>
                </View>
            </TouchableHighlight>
        )
    }
})
// create a react component

var album =  React.createClass({

    getInitialState(){
        var ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        })
        return {
            isLoadingTail:false,
            refreshing:false,
            dataSource: ds.cloneWithRows([ ]),
        }
    },
    _renderRow(row) {
        //const { navigate } = this.props.navigation;
        return <Item
            key = {row._id}
            onSelect = {() =>this._loadPage(row) }
            row = {row}/>
    },
    componentDidMount() {
        this._fetchData()
    },
     _fetchData(page) {
        if (page !== 0) {
            this.setState({
                isLoadingTail: true
            })
        }
         else  {
             this.setState({
                 refreshing: true
             })
         }
         var body = {
             accessToken:'Daphne',
             page:page
         }
         request.post(config.api.base + config.api.creations,body)
             .then((data) => {
            console.log(data)

             if (data.success) {
                 var items = cacheResults.items.slice()
                 if (page !== 0) {
                     items = items.concat(data.data)
                 }
                 else {
                     items = data.data.concat(items)
                 }
                 cacheResults.nextPage += 1
                 cacheResults.items = items
                 cacheResults.total = data.total

                 if (page !== 0) {
                     this.setState({
                         isLoadingTail: false,
                         dataSource: this.state.dataSource.cloneWithRows(cacheResults.items)
                     })
                 }
                 else {
                     this.setState({
                         refreshing: false,
                         dataSource: this.state.dataSource.cloneWithRows(cacheResults.items)
                     })
                 }
             }
         })
             .catch((error) => {
                if (page !== 0 ) {
                    this.setState({
                        isLoadingTail : false
                    })
                }
                 else{
                     this.setState({
                         refreshing : false
                     })
                 }
                console.warn(error)
         })
     },
    _hasMore() {

        return cacheResults.items.length !== cacheResults.total
    },
    _fetchMoreData() {

        if (!this._hasMore()||this.state.isLoadingTail) {
            return
        }
        var page =  cacheResults.nextPage
        this._fetchData(page)
    },
    _renderFooter() {
        if (!this._hasMore() && cacheResults.total!= 0) {
            return (
                <View style = {styles.loadingMore} >
                    <Text style = {styles.loadingText}> No more data </Text>
                </View>
            );
        }
        return <ActivityIndicator style = {styles.loadingMore}/>
    },


    _onRefresh() {

        if (!this._hasMore()||this.state.refreshing) {
            return
        }

        this._fetchData(0);
    },
    _loadPage(row){
        const { navigate } = this.props.navigation;

        navigate('detail',{data:row});

    },
    render() {
        /*<StackNavigator
            initialRoute={{
                component: album,
                name:'home',
            }}
            configureScene = {(route) => {
                return Navigator.SceneConfigs.FloatFromRight
            }}
            renderScene = {(route,navigator) => {
                var Component = route.component
                return <Component {...route.params} navigator = {navigator}/>
            }}
        />*/

        return <View style = {styles.container}>
                    <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {this._renderRow}
                        onEndReached = {this._fetchMoreData}
                        onEndReachedThreshold ={20}
                        renderFooter = {this._renderFooter}
                        enableEmptySections = {true}
                        automaticallyAdjustContentInserts ={false}
                        showsVerticalScrollIndicator = {false}
                         refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                title = 'loading'
                            />
                        }
                    />
                </View>
    }
});

//Style the React component
var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#F5FCFF'
    },

    item: {
        width: width,
        marginBottom:10,
        backgroundColor:'#fff',
    },
    thumb: {
        width:width,
        height:width * 0.5,
        resizeMode:'stretch'

    },
    title: {
        padding:10,
        fontSize:18,
        color:'#333'
    },
    itemFooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#eee'
    },
    handleBox:{
       padding:10,
       flexDirection:'row',
       width:width - 0.5,
       justifyContent:'center',
       backgroundColor:'#fff'

    },
    handleText: {
        paddingLeft:12,
        fontSize:18,
        color:'#333'
    },
    commentIcon: {
        fontSize:22,
        color:'#333',
    },
    loadingMore : {
        marginVertical: 20
    },
    loadingText : {
        color: '#777',
        textAlign:'center'
    },
    rating: {
       position : 'absolute',
       bottom:14,
       right:50,
        width:46,
        height:46,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:'transparent',

    }

});

module.exports = album;
//Show the react component on the screen
