gravityBlog.Models.ArticleModel = Backbone.Model.extend({

	defaults: {
		title: "titre par défaut",
		content: "content par défaut",
        images: new Array()
	},
	
	initialize: function() {
		//console.log("un nouvel article : ",this) 
    },

    parse: function(model){
    	model.title = model.titre;
    	console.log(model);
    	return model;
    },

    toJSON : function(){
    	var obj = Backbone.Model.prototype.toJSON.call(this);
    	obj.titre = this.get("title");
    	//console.log(obj);
    	return obj;
    } 
});
