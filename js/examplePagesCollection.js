var page = Backbone.Model.extend({}); //modelo
var pagesCollection = Backbone.Collection.extend({ // colecci�n de modelos
  model: page
});
var pags = new pagesCollection(
[
  {
    "page": {
          "ID": "",
          "theTitle": "",
          "theContent": "",
          "image": {
              "src": "",
              "width": 0,
              "height": 0
          }
    }
  }
]
);