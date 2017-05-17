const express = require('express')
const swig = require('swig')
const fs = require('fs')
const httpUtil = require('./server/httpUtil')
const path = require('path')
const ITHomeCrawler = require('./server/ITHomeCrawler')

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

app.get('/', function(req, res){
	var url = 'http://www.ithome.com/'
  httpUtil.download(url,function(data){
		var focusNews = ITHomeCrawler.getFocusNews(data)
		console.log(focusNews)
		res.render('index',{
					title:"test",
					focusNews:focusNews
		})
  })

})

app.listen(port) 

console.log('server is started at http://localhost:'+port)