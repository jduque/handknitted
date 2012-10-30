var page = Backbone.Model.extend({}); //modelo
var pagesCollection = Backbone.Collection.extend({ // colección de modelos
  model: page
});
var homeJSon = new pagesCollection(
[
  {
    "ID": "",
    "theTitle": "",
    "theContent": "",
    "slug": "",
    "image": {
        "src": "",
        "width": 0,
        "height": 0
    },
    "slides" : [
      {
        "background" : [
          "url",
          320, //width
          240 //height
        ],
        "link" : "",
        "text_link": "",
        "video": ""
      }
    ]
  }
]
);
var pageModel = new pagesCollection([]);
var searchModel = new pagesCollection([]);