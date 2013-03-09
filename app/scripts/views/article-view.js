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
        this.model.bind('remove', this.remove, this);
    },

    remove: function () {
        console.log("Called remove event on model");
        $(this.el).remove();
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
    console.log(this_art.model.collection);
    console.log(this.model);
    this.model.destroy({success: function(model, response) {
        console.log("destroyed");
        }});
    //this_art.model.collection.remove(this.model);    
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
