'use strict'

var queryString = require('query-string')
var _ = require('lodash')
var config = require('./config')
var request = {}
request.get = function(url,params) {
    if(params) {
        url += '?' + queryString.stringify(params)
        //url += '?'
    }
    return fetch(url)
        .then((response) => response.json())


}

request.post = function(url,body) {
    var options = _.extend(config.header, {
        body: JSON.stringify(body)

        //body:body
    })

    return fetch(url,options)
        .then((response) => response.json())

}

request.postImage = function(url,body) {
    var options = _.extend(config.headerImage, {
        body: JSON.stringify(body)

        //body:body
    })

    return fetch(url,options)
        .then((response) => response.json())

}
module.exports = request;