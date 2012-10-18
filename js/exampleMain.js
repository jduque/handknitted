$(function(){
  /* MODELS */
  var imagesCollection = Backbone.Collection.extend({ // colección de modelos
    url: '/ImagesCollection/'
  });
  
  /* HELPRES */
  _.extend(Backbone.View.prototype, {
    helpersExample: function(){} //,
    //helpersExample2: function(){}
  });
  /* VIEWS */
    var HomeView = Backbone.View.extend({
      el: $('#main'),
      template: _.template($('#home-template').html()),
      initialize: function(){
        this.render();
      },
      animateSection: function(){
        /* * start definitions * */
          
        /* * end definitions * */
        /* ** start initial positions ** */
          
        /* ** end initial positions ** */
        /* *** start Animation *** */
          
        /* *** end initial Animation *** */
      },
      render: function(){
        $("body").removeClass();
        $("body").addClass('home');
        this.$el.html(this.template());
        this.animateSection();
        return this;
      }
    });
    
    var IndexView = Backbone.View.extend({
      el: $('#main'),
      template: _.template($('#index-template').html()),
      initialize: function(){
        this.render();
      },
      animateSection: function(){
        /* * start definitions * */
          
        /* * end definitions * */
        /* ** start initial positions ** */
          
        /* ** end initial positions ** */
        /* *** start Animation *** */
          
        /* *** end initial Animation *** */
      },
      render: function(){
        $("body").removeClass();
        $("body").addClass('index');
        var that = this;
        //this.$el.html(this.template());
        if($('div.index-container').length==0){
          this.$el.append(this.template());
        }
        else{
          $('div.menu_header_index').show();
        }
        /* *** BEGIN prevenir que se acumulen elementos *** */
          /*var $supersized = $('ul#supersized');
          $supersized.remove();
          $('body').append('<ul id="supersized"></ul>');*/
        /* *** END prevenir que se acumulen elementos *** */
        this.animateSection();
        /* *** BEGIN replace wordpress urls for backbone urls *** */
        var $ulMenuPrincipal = $('ul#menu-principal');
          $ulMenuPrincipal.find('li').each(function(i){
            if(i!=0){
              $(this)
                .find('a')
                  .attr('href', '#page/'+$(this).find('a').attr('href').replace(/[^0-9]/g,''))
                  .addClass('number_'+i);
            }
            else{
              $(this)
                .find('a')
                  .attr('href', '#home','')
                  .addClass('number_'+i);
            }
          });
        /* *** END replace wordpress urls for backbone urls *** */        
        $ulMenuPrincipal.find('li a').click(function(e){
          var $thatA = $(this);
          $ulMenuPrincipal.find('li a').removeClass('clicked');
          $thatA.addClass('clicked');
          if($(this).hasClass('number_0') == false){
            e.preventDefault();
            /* *** BEGIN reemplaza modelo con la info de wordpress *** */
              $('#log').ajaxStart(function() {
              }); 
              $('#log').ajaxSend(function() {
                $ulMenuPrincipal.find('li a.clicked')
                  .parent()
                    .css({'background': 'url(wp-content/themes/handknited/img/ajax-loader.gif) no-repeat 5px center'});
              }); 
              $('#log').ajaxSuccess(function() {
              }); 
              $('#log').ajaxError(function() {
              });
              $('#log').ajaxComplete(function(){
                var thisPage = $.parseJSON($('#loading').html()).page;
                var iframeYoutubeVideo = "";
                if(thisPage.youtubeVideo!=""){
                  iframeYoutubeVideo = '<div class="div_iframe_youtube_'+thisPage.ID+'"></div>';
                }
                if($('div.page_'+thisPage.ID).length == 0){
                  that.$el.append('<div class="page_container page_'+thisPage.ID+'">'+
                  '<div class="content_page">'+
                    '<h1>'+thisPage.theTitle+'<span class="close">X</span></h1>'+
                    '<img src="'+thisPage.image.src+'" alt="" />'+
                    iframeYoutubeVideo+
                    '<div class="inner_content_page">'
                      +thisPage.theContent+
                    '</div>'+
                  '</div>'+
                  '</div>');
                }
                if(iframeYoutubeVideo!=""){
                  $('iframe.youtube_video').remove();
                  $('div.div_iframe_youtube_'+thisPage.ID).append('<iframe class="youtube_video" src="'+thisPage.youtubeVideo+'"></iframe>');
                }
                $('div.page_'+thisPage.ID).hide();
                $('div.js_lb_overlay').remove();
                $('div.page_'+thisPage.ID).lightbox_me({
                  'onLoad': function(){
                    $('div.page_'+thisPage.ID).css({
                      'position': 'absolute'
                    });
                  }
                });
              }); 
              $('#log').ajaxStop(function() {
                $thatA.parent().css({'background': 'none'});
                $thatA.stop(true, true).animate({backgroundColor: 'rgba(0, 0, 0, 0.6)'}, 350);
              }); 
              $('#loading').hide().load("/wordpress/?ajax='true'&page_id='"+$thatA.attr('href').replace(/[^0-9]/g+"'",''));
            /* *** END reemplaza modelo con la info de wordpress *** */
          }
        });
        return this;
      }
    });

    var AboutView = Backbone.View.extend({
      el: $('#main'),
      template: _.template($('#about-template').html()),
      initialize: function(){
        this.render();
      },
      animateSection: function(){
        /* * start definitions * */
          
        /* * end definitions * */
        /* ** start initial positions ** */
          
        /* ** end initial positions ** */
        /* *** start Animation *** */
          
        /* *** end initial Animation *** */
      },
      render: function(){
        $("body").removeClass();
        $("body").addClass('about');
        this.$el.html(this.template());
        this.animateSection();
        return this;
      }
    });
    
  /* ROUTERS */
    var AppRouter = Backbone.Router.extend({
      routes: {
        "home": "home",
        "index": "index",
        "about": "about",
        //"gallery/:galleryId": "gallery",
        //"content/:idAttribute/articles/:idArticle": "article",
        "*actions": "home" //antes --> "*actions": "intro"
      }, 
      home: function(){
        new HomeView();
      }, 
      index: function(){
        new IndexView();
      }, 
      about: function(){
        new AboutView();
      }/*
      article: function(idAttribute, idArticle){
        new ContentView(idAttribute, idArticle);
      }*/
    });
    var app_router = new AppRouter;
    Backbone.history.start();
});