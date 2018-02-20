 'ues strict'

 module.exports = {
     header: {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
         },
     },
     headerImage: {
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'multipart/form-data',
         },
     },
     api: {
         base:'http://127.0.0.1:8080/',
         creations:'album',
         signup:'user/signup',
         login:'user/login',
         photo:'addphoto',
         comment:'comments'
     }
 }