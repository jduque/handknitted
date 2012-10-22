$(function(){
  /* MODELS */
  var imagesCollection = Backbone.Collection.extend({ // colección de modelos
    url: '/ImagesCollection/'
  });
  
  /* HELPRES */
  _.extend(Backbone.View.prototype, {
    //helpersExample: function(){},
    //helpersExample2: function(){}
    mainMenu: function(){
      /* *** BEGIN active lang *** */
        var $mainNav = $('div.menu');
        var $aElement = $mainNav.find('li a');
        /* *** BEGIN root right direction menu *** */
          var oldHref = "";
            $aElement.each(function(){
              oldHref = $(this).attr('href');
              $(this).attr('id', oldHref.replace(/[^0-9]/g,''));
              $(this).attr('href', '#page/'+$(this).attr('id'))
                .parent().addClass('page');   
            });
        /* *** END root right direction menu *** */
      /* *** END active lang *** */
    },
    singleUrl: function(){      
      var $aElementSingle = $('a[rel="bookmark"]');
      var newHref = "";
        $aElementSingle.each(function(){
          newHref = $(this).attr('href').replace(/[^0-9]/g,'');
          $(this).attr('href', '#single/'+newHref);
        });
    }
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
        //$("body").removeClass();
        $("body").addClass('home');
        var that = this;
        /* *** BEGIN model replaces wordpress's information  *** */
        var home;
        if($('#primary').length==0){
          $.ajax({
            url: '?ajax=true', // *+++++++++* Call the right page to return the JSon *+++++++++*
            beforeSend : function(){ // *+++++++++* Create loading function *+++++++++*
              //$('#some').css({'background': 'url(wp-content/themes/handknitted/img/ajax-loader.gif) no-repeat 5px center'});
            }, 
            success: function(data){ // *+++++++++* New model with the return data *+++++++++*
              home = $.parseJSON(data);
              homeJSon = new pagesCollection([home]);
              //console.log(homeJSon);
              that.$el.append(that.template(homeJSon));
              that.animateSection();
              that.mainMenu();
              that.singleUrl();
              //app_router.navigate('index.php?ajax=false', {trigger: true, replace: false});
            }
          });
        }
        else{
          $('#primary').show();
          $('#main div.maincontent').hide();
        }
        /* *** END model replaces wordpress's information  *** */
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
    
    var PageView = Backbone.View.extend({
      el: $('#main .maincontent'),
      template: _.template($('#page-template').html()),
      initialize: function(pageId){
        this.pageId = pageId;
        this.render();
      },
      animateSection: function(pageId){
        /* * start definitions * */
          var $navUlPages = $('ul.nav_ul a');
          var $contentPages = $('div.inner_content');
          var $topArrow = $('nav.top_arrow a');
          var $bottomArrow = $('nav.bottom_arrow a');
          var $pagNavSpan = $('nav.page_nav span');
        /* * end definitions * */
        /* ** start initial positions ** */
          $contentPages.hide();
          $topArrow.addClass($navUlPages.first().attr('class'));
          $bottomArrow.addClass($navUlPages.first().attr('class'));
          $navUlPages.first().css({'font-weight':'bold'});
          $contentPages.first().show();
        /* ** end initial positions ** */
        /* *** start Animation *** */
          $navUlPages.click(function(e){
            e.preventDefault();
            $that = $(this);
            $contentPages.removeClass('active');
            $.each($contentPages, function(){
              if($(this).hasClass($that.attr('class'))){
                $(this).addClass('active').show();
              }
              else{
                if($(this).hasClass('active')){}
                else{
                  $(this).hide();
                }
              }
            });
            $bottomArrow.removeClass();
            $topArrow.removeClass();
            $topArrow.addClass($that.attr('class'));
            $bottomArrow.addClass($that.attr('class'));
            $pagNavSpan.empty();
            $pagNavSpan.html($that.html());
            $navUlPages.css({'font-weight':'normal'});
            $that.css({'font-weight':'bold'});
          });
          /* *** BEGIN top and bottom arrow *** */
          var $classLastElement = $navUlPages.last().attr('class');
          $bottomArrow.click(function(e){
            e.preventDefault();
            if($(this).hasClass($classLastElement)){
              $topArrow.addClass($navUlPages.last().attr('class'));
              $bottomArrow.addClass($navUlPages.last().attr('class'));
              $navUlPages.last().css({'font-weight':'bold'});
            }
            else{
              var $current = $('ul.nav_ul').find('.'+$(this).attr('class'));
              $bottomArrow.removeClass();
              $topArrow.removeClass();
              //console.log($current.parent().next('li').find('a'));
              var $newCurrent = $current.parent().next('li').find('a');
              $current.css({'font-weight':'normal'});
              $newCurrent.css({'font-weight':'bold'});
              $bottomArrow.addClass($newCurrent.attr('class'));
              $topArrow.addClass($newCurrent.attr('class'));
              $contentPages.hide();
              $contentPages.removeClass('active');
              $contentPages.parent()
                .find('.'+$newCurrent.attr('class'))
                .show()
                .addClass('active');
              $pagNavSpan.empty();
              $pagNavSpan.html($newCurrent.html());
            }
          });
          var $classFirstElement = $navUlPages.first().attr('class');
          $topArrow.click(function(e){
            e.preventDefault();
            if($(this).hasClass($classFirstElement)){
              $topArrow.addClass($navUlPages.first().attr('class'));
              $bottomArrow.addClass($navUlPages.first().attr('class'));
              $navUlPages.first().css({'font-weight':'bold'});
            }
            else{
              var $current = $('ul.nav_ul').find('.'+$(this).attr('class'));
              $bottomArrow.removeClass();
              $topArrow.removeClass();
              //console.log($current.parent().prev('li').find('a'));
              var $newCurrent = $current.parent().prev('li').find('a');
              $current.css({'font-weight':'normal'});
              $newCurrent.css({'font-weight':'bold'});
              $bottomArrow.addClass($newCurrent.attr('class'));
              $topArrow.addClass($newCurrent.attr('class'));
              $contentPages.hide();
              $contentPages.removeClass('active');
              $contentPages.parent()
                .find('.'+$newCurrent.attr('class'))
                .show()
                .addClass('active');
              $pagNavSpan.empty();
              $pagNavSpan.html($newCurrent.html());
            }
          });
          /* *** END top and bottom arrow *** */
        /* *** end Animation *** */
        
      },
      render: function(pageId){
        that = this;
        $("body").removeClass();
        $("body").addClass('page');
        $primary = $('#primary');
        if($('#primary').length!=0){
          $primary.hide();
        }
        var thisPage;
        /* *** BEGIN model replaces wordpress's information  *** */
          $.ajax({
            url: '?ajax=true&page_id='+that.pageId, // *+++++++++* Call the right page to return the JSon *+++++++++*
            beforeSend : function(){ // *+++++++++* Create loading function *+++++++++*
              //$('#some').css({'background': 'url(wp-content/themes/handknitted/img/ajax-loader.gif) no-repeat 5px center'});
            }, 
            success: function(data){ // *+++++++++* New model with the return data *+++++++++*
              thisPage = $.parseJSON(data);
              pageModel = new pagesCollection([thisPage]);
              that.$el.html(that.template(pageModel), that.pageId);
              $('#main div.maincontent').show();
              that.animateSection(pageId);
              that.mainMenu();
              that.singleUrl();
              /* ** BEGIN add wordpress's classes, of course ** */                
                pageModel.at(0).attributes.bodyClass.forEach(function(thisClass){
                  $('body').addClass(thisClass);
                });
              /* ** END add wordpress's classes, of course ** */
            }
          });
        /* *** END model replaces wordpress's information  *** */
        return this;
      }
    }); 
    
    var SingleView = Backbone.View.extend({
      el: $('#main .maincontent'),
      template: _.template($('#single-template').html()),
      initialize: function(singleId){
        this.singleId = singleId;
        this.render();
      },
      animateSection: function(singleId){
        /* * start definitions * */
        /* * end definitions * */
        /* ** start initial positions ** */
        /* ** end initial positions ** */
        /* *** start Animation *** */
        /* *** end Animation *** */        
      },
      render: function(singleId){
        that = this;
        $("body").removeClass();
        $("body").addClass('single');
        $primary = $('#primary');
        if($('#primary').length!=0){
          $primary.hide();
        }
        var thisSingle;
        /* *** BEGIN model replaces wordpress's information  *** */
          $.ajax({
            url: '?ajax=true&p='+that.singleId, // *+++++++++* Call the right page to return the JSon *+++++++++*
            beforeSend : function(){ // *+++++++++* Create loading function *+++++++++*
              //$('#some').css({'background': 'url(wp-content/themes/handknitted/img/ajax-loader.gif) no-repeat 5px center'});
            }, 
            success: function(data){ // *+++++++++* New model with the return data *+++++++++*
              thisSingle = $.parseJSON(data);
              pageModel = new pagesCollection([thisSingle]);
              that.$el.html(that.template(pageModel), that.singleId);
              $('#main div.maincontent').show();
              that.animateSection(singleId);
              that.mainMenu();
              that.singleUrl();
              /* ** BEGIN add wordpress's classes, of course ** */                
                pageModel.at(0).attributes.bodyClass.forEach(function(thisClass){
                  $('body').addClass(thisClass);
                });
              /* ** END add wordpress's classes, of course ** */
            }
          });
        /* *** END model replaces wordpress's information  *** */
        return this;
      }			
    }); 
    
  /* ROUTERS */
    var AppRouter = Backbone.Router.extend({
      routes: {
        "home": "home",
        "index": "index",
        "about": "about",
        "page/:pageId": "page",
        "single/:singleId": "single",
        //"content/:idAttribute/articles/:idArticle": "article", // example
        "*actions": "home"
      }, 
      home: function(){
        new HomeView();
      }, 
      index: function(){
        new IndexView();
      }, 
      about: function(){
        new AboutView();
      },
      page: function(pageId){
        new PageView(pageId);
      },
      single: function(singleId){
        new SingleView(singleId);
      }/* // example
      article: function(idAttribute, idArticle){
        new ContentView(idAttribute, idArticle);
      }*/
    });
    /* *** BEGIN replace some urls before router start *** */
      $('h1#site-title span a').attr('href', '#home');
    /* *** END replace some urls before router start *** */
    var app_router = new AppRouter;
    Backbone.history.start();
});