var page = Backbone.Model.extend({}); //modelo
var pagesCollection = Backbone.Collection.extend({ // colecci�n de modelos
  model: page
});
var pags = new pagesCollection(
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