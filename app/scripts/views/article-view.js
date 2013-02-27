gravityBlog.Views.articleView = Backbone.View.extend({


    tagName:  "div",

    className: "article-view",

    template:  _.template($('#article-template').html()),

    events: {
      "dblclick p,label"  : "showEditTools",
      "click .edit-article" : "save",
        "click #edit-article" : "editArticle",
        "click #delete-article" : "deleteArticle"
    },

	initialize: function() {
	 	this.render();
    },

    render: function() {
    console.log("yuyuy");
    console.log(this.model);
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    save : function(event){

    	var input_val = this.$el.find(".edit-title").val();
    	var textarea_val= this.$el.find(".edit-content").val();

        if(input_val!="" && textarea_val!=""){
    	    this.model.set("title", input_val);
    	    this.model.set("content", textarea_val);
            this.hideEditTools();
    	    this.render();
        }
    },

    editArticle: function(){
    console.log("edit");
  },

   deleteArticle: function(){
    console.log("delete");
    var this_art = this;
    this_art.model.collection.remove(this);    
   },

    showEditTools : function(){

        this.$el.find('label').hide()
        this.$el.find('p').hide();
        this.$el.find('.tools').show()
    },

    hideEditTools : function(){

        this.$el.find('label').show()
        this.$el.find('p').show();
        this.$el.find('.tools').hide()
    }

});
