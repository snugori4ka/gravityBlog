gravityBlog.Views.applicationView = Backbone.View.extend({

   el: $("#container"), 

  	events: {
      "click #new-article" : "createArticle",
      "click #add-article" : "showTools",
      "dragenter #dropbox" : "dragEnter",
       "dragexit #dropbox" : "dragExit", 
       "dragover #dropbox" : "dragOver",
           "drop #dropbox" : "drop"
   },


  initialize: function() {
      //this.collection appel la collection passée en paramètre dans le main.js
  		this.addCollectionListener(this.collection);
      this.collection.fetch();
   },

   addCollectionListener: function(collection) {
	   collection.on('add', this.addOne, this);
	   collection.on('remove', this.removeOne, this);
	   collection.on('reset', this.reset, this);
	},

  addNewOne : function(article){
    this.collection.fetch();
    this.reset();
  },

	addOne : function(article){
    console.log("article: ");
    console.log(article.get("images"));
      var view = new gravityBlog.Views.articleView({
         model : article,
         
      });
    //on ajoute la vue au DOM
		this.$el.find("#blog").prepend(view.render().el);
		//return false;
	},

	remove : function(){
    console.log("delete from collection");
	},

	reset : function(){       
        this.collection.each(this.addOne, this);
	},

   createArticle: function(){
      var articleObj = {},
    	    input_val = $("#new-title").val(),
    	    textarea_val= $("#new-content").val();
      
      var image_list = new Array();
        $('#list img').each(function() {
            image_list.push( $(this).attr('src').split(',')[1]); 
        });

      if(input_val){
         articleObj.title=input_val;
      }
      if(textarea_val){
         articleObj.content = textarea_val;
      }
      if(image_list){
        articleObj.images = image_list;
      }

      console.log(articleObj);
      this.collection.create(articleObj,
        {wait: true,
          success : function(resp){
          console.log("test ",resp)
         }

        });
      this.resetTools();
    	this.hideTools();      


   },

   resetTools :function(){
      $("#new-title").val("");
      $("#new-content").val(""); 
      $("#list").empty();    
   },

   hideTools : function(){
      $("#createTool").hide();
      $("#add-article").show();
   },

   showTools : function(){
    	$("#add-article").hide();
    	$("#createTool").fadeIn();
   },



dragEnter : function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
},

 dragExit : function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
},

 dragOver : function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
},

 drop: function (e)  {
    e.stopPropagation();
    e.preventDefault();

    dt = e.originalEvent.dataTransfer.files;

    // Only call the handler if 1 or more files was dropped.
    if (dt.length > 0)
        this.readFilesAndDisplayPreview(dt);

},

readFilesAndDisplayPreview : function(files){
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

});
