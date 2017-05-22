const express = require('express')
const fs = require('fs')
const path = require('path')
const swig = require("swig")
const app = express()
const port = process.env.PORT || 4000

//设置swig页面不缓存
swig.setDefaults({
  cache: false
})
app.set('view cache', false);
app.set('views','./src/views/pages/')
app.set('view engine','html')
app.engine('html', swig.renderFile)
app.use(express.static(path.join(__dirname,'public')))

require("./config/router")(app)
app.listen(port) 

console.log('server is started at http://localhost:'+port)