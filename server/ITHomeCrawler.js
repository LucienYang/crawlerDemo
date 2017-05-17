const cheerio = require("cheerio")

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

exports.getFocusNews = getFocusNews