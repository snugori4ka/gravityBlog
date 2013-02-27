gravityBlog.Collections.ArticleCollection = Backbone.Collection.extend({

  model: gravityBlog.Models.ArticleModel,

  url: "http://localhost:8080/BlogWS/resources/article/",


  parse : function(resp){
  	if(resp){
  		console.log(resp);
  		if(resp.article){
        console.log("hhh ",resp.article)
  			return resp.article;
  		}else{
  			// j'écris de la merde, et il me recopie à côté
  			return resp;
  		}
  	}
  }

});
