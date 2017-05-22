const cheerio = require("cheerio")
const httpUtil = require("../utils/httpUtil")


function getFocusNews(html){
	var focusNews = []
	if(html){ 
		var $ = cheerio.load(html)
		$('.focus_area .focus li').each(function(i, e){
			var imgUrl = $(e).find('a').find('img').attr('src')
			var newsLink = $(e).find('a').attr('href')
			var title = $(e).find('h2').text().trim()
			var content = $(e).find('p').text().trim()
			var item = {
				imgUrl:imgUrl,
				newsLink:newsLink,
				title:title,
				content:content
			}
			console.log(item)
			focusNews.push(item)
		})
	}
	return focusNews
}

function getTodayNews(html){
	var todayNews = []
	if(html){
		var $ = cheerio.load(html)
		$('.new-list li.new').each(function(i,e){
			if(i<10){
				var newsTitle = $(this).find('span').eq(1).text()
				var newsHref= $(this).find('a').attr('href')
				console.log(newsTitle +"     "+ newsHref)
				var newsItem = {
					newsTitle:newsTitle,
					newsHref:newsHref
				}
				todayNews.push(newsItem)
			}else{
				return false;
			}
		})
	}
	return todayNews
}

exports.getLatestNews = function(req, res){
	var url = 'http://www.ithome.com/'
  httpUtil.download(url,function(data){
		var focusNews = getFocusNews(data)
		var todayNews = getTodayNews(data)
		console.log(focusNews)
		res.render('index',{
					title:"test",
					focusNews:focusNews,
					todayNews:todayNews
		})
  })
}