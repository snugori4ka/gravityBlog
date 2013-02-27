window.gravityBlog = {
   Models: {},
   Collections: {},
   Views: {},
   Routers: {},
   init: function() {
      console.log('Hello from Backbone!');

//      Backbone.emulateJSON = true;

     var articleList= new gravityBlog.Collections.ArticleCollection();
     
     	gravityBlog.view = new gravityBlog.Views.applicationView({
     			collection : articleList,
     	})
      

  }
};

$(document).ready(function(){
   gravityBlog.init();
});
