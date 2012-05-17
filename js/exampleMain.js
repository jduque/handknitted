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
          var $imgLogo = $('img.logo');
          var $h1EntrarA = $('h1.entrar a');
        /* * end definitions * */
        /* ** start initial positions ** */
          $h1EntrarA.hide();
          $h1EntrarA.stop(true,true).delay(1000).show('fade', 250);
        /* ** end initial positions ** */
        /* *** start Animation *** */
          /*$imgLogo.hover(
            function(){
              $h1EntrarA.stop(true,true).show('fade', 250);
                $h1EntrarA.stop(true,true).animate({'border-width': '24px'}, 350, function(){
                  $h1EntrarA.css({'padding': '10px 0px', 'font-size': '16px'});
                  $h1EntrarA.parent().css({'top': '27%'});
                });*/
                $h1EntrarA.hover(
                  function(){
                    $h1EntrarA.stop(true,true).animate({'border-width': '24px'}, 350, function(){
                      $h1EntrarA.css({'padding': '10px 0px', 'font-size': '16px', 'color': '#c8e14f'});
                      $h1EntrarA.parent().css({'top': '27%'});
                    });
                  },
                  function(){
                    $h1EntrarA.css({'padding': '11px 0px', 'color': 'black'});
                    $h1EntrarA.parent().css({'top': '27%'});
                    $h1EntrarA.stop(true,true).animate({'border-width': '0'}, 250, function(){
                      //$h1EntrarA.stop(true,true).hide('fade', 200);
                    });
                  }
                );
            /*},
            function(){
              $h1EntrarA.css({'padding': '20px 0px', 'font-size': '0'});
              $h1EntrarA.parent().css({'top': '25%'});
              $h1EntrarA.stop(true,true).animate({'border-width': '0'}, 250, function(){
                //$h1EntrarA.stop(true,true).hide('fade', 200);
              });
            }
          );*/
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
    
    var indexView = Backbone.View.extend({
      el: $('#main'),
      template: _.template($('#index-template').html()),
      initialize: function(){
        this.render();
      },
      animateSection: function(){
        /* * start definitions * */
          var $homeContainer = $('div.home-container');
          var $indexContainer = $('div.index-container');
          var $galleryContainer = $('div.gallery-container');
          var $menuPrincipal = $('ul#menu-principal');
          var $menuPrincipalElementA = $menuPrincipal.find('a');
        /* * end definitions * */
        /* ** start initial positions ** */
          $indexContainer.css({'position': 'absolute'});
          $menuPrincipal.hide();
        /* ** end initial positions ** */
        /* *** start Animation *** */
          $galleryContainer.hide();
          $homeContainer.animate({'left': '25%'}, 700);
          if($galleryContainer.length==0){
            $indexContainer.css({'top': '-1px', 'right': -$indexContainer.find('ul.main-nav').width()});
            $indexContainer.animate({'right': '50%'}, 700, function(){
              $indexContainer.css({'position': 'static'});
              $menuPrincipal.show('fade', 250);
            });
          }
          else{
            $indexContainer
              .css({'top': '-1px','left':'0'})
              .animate({'left': '41%', 'right': 'auto'}, 700, function(){
                $indexContainer.css({'position': 'static'})
                  .find('ul.main-nav').css({'position': 'absolute', 'left': 'auto'});                
                $('div.gallery-container').remove();
                $menuPrincipal.show('fade', 250);
              });
          }
          $('h1.entrar').hide();
          $indexContainer.find('img').show();
          $menuPrincipalElementA.hover(
            function(){
              // para que esto (.animate({backgroundColor: 'rgba(255, 255, 255, 0.2)'}, 300))
              // funcione fué necesario incluir: 
              // <script src="<?php bloginfo('template_url');?>/js/libs/$-1.8.1.min.js"></script> 
              // <script src="<?php bloginfo('template_url');?>/js/libs/$.animate-colors.js"></script> 
              $(this).stop(true, true).animate({backgroundColor: 'rgba(255, 255, 255, 0.2)'}, 300);
            },
            function(){
              $(this).stop(true, true).animate({backgroundColor: 'rgba(0, 0, 0, 0.6)'}, 350);
            }
          );
        /* *** end initial Animation *** */
      },
      animateFirstImage: function($mainNav){
        /* ** BEGIN show and hide first img ** */
          var $firstImageDiv = $('div.first_image');
          var imageTop = $(window).height();
          var $ulMainNav = $('ul.main-nav');
          $ulMainNav.find('a').removeAttr('title');
          $(window).resize(function(){
            imageTop = $(window).height();
            $firstImageDiv.find('img').css({'top': imageTop});
            $ulMainNav.css({'height': imageTop});
          });
          $firstImageDiv.find('img').css({'position': 'absolute', 'left': '50%', 'top': imageTop});
          $firstImageDiv.find('div').hide();
          $ulMainNav.css({'height': imageTop});
          $mainNav.find('ul li a').each(function(){
            var that = this;
            $(this).hover(
              function(){
                $firstImageDiv.find('img.'+$(this).attr('id')).stop(false,false).animate({'top': '0'}, 450,function(){
                  $firstImageDiv.stop(true,true).find('div.'+$(that).attr('id')).slideDown(250);
                });
                $mainNav.find('ul li').first().removeClass('first_time');
              },
              function(){
                $firstImageDiv.find('img.'+$(this).attr('id')).stop(true,true).animate({'top': -($firstImageDiv.find('img.'+$(this).attr('id')).height())}, 450, function(){
                  $(this).css({'top': imageTop});
                });
                $firstImageDiv.stop(true,true).find('div.'+$(that).attr('id')).hide('fade', 150);
              }
            );
          });
          if($mainNav.find('ul li').first().hasClass('first_time')){
            $firstImageDiv
              .find('img.'+$mainNav.find('ul li').first().find('a').attr('id'))
              .stop(false,false)
              .delay(1000)
              .animate({'top': '0'}, 450,function(){
                $firstImageDiv.stop(true,true).find('div.'+$mainNav.find('ul li').first().find('a').attr('id')).slideDown(250);
              });
          }
        /* ** BEGIN show and hide first img ** */
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
        /* *** BEGIN prevenir que se acumulen imagenes *** */
          var $supersized = $('ul#supersized');
          $supersized.remove();
          $('body').append('<ul id="supersized"></ul>');
        /* *** END prevenir que se acumulen imagenes *** */
        this.animateSection();
        /* *** BEGIN main-nav *** */
          var $mainNav = $('ul.main-nav');
          var $aElement = $mainNav.find('li a');
          $aElement.each(function(){
            var oldHref = $(this).attr('href');
            $(this).attr('id', oldHref.replace(/[^0-9]/g,''));
            $(this).attr('href', '#gallery/'+$(this).attr('id'));
          });
          var lastLi = $mainNav.find('ul li').length;
          $mainNav.find('ul li').each(function(i){
            if(i==0){
              $(this).addClass('first first_time');
            }
            if(i==lastLi-1){
              $(this).addClass('last');
            }
          });
          this.animateFirstImage($mainNav);
        /* *** END main-nav *** */                   
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
                    .css({'background': 'url(wp-content/themes/handcrafted-wp-theme/img/ajax-loader.gif) no-repeat 5px center'});
              }); 
              $('#log').ajaxSuccess(function() {
              }); 
              $('#log').ajaxError(function() {
              });
              $('#log').ajaxComplete(function(){
                var thisPage = $.parseJSON($('#loading').html()).page;
                var iframeCnnVideo = "";
                if(thisPage.cnnVideo!=""){
                  iframeCnnVideo = '<div><iframe class="cnn_video" src="'+thisPage.cnnVideo+'"></iframe></div>';
                  $('iframe.youtube_video').remove();
                }
                var iframeYoutubeVideo = "";
                if(thisPage.youtubeVideo!=""){
                  iframeYoutubeVideo = '<div class="div_iframe_youtube_'+thisPage.ID+'"></div>';
                }
                if($('div.page_'+thisPage.ID).length == 0){
                  that.$el.append('<div class="page_container page_'+thisPage.ID+'">'+
                  '<div class="content_page">'+
                    '<h1>'+thisPage.theTitle+'<span class="close">X</span></h1>'+
                    '<img src="'+thisPage.image.src+'" alt="" />'+
                    iframeCnnVideo+
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
              $('#loading').hide().load("/wordpress/?page_id="+$thatA.attr('href').replace(/[^0-9]/g,''));
            /* *** END reemplaza modelo con la info de wordpress *** */
          }
        });
        return this;
      }
    });
    
    var GalleryView = Backbone.View.extend({
      el: $('#main'),
      template: _.template($('#gallery-template').html()),
      initialize: function(galleryId){
        this.galleryId = galleryId;
        this.render();
      },
      animateSection: function(galleryId){
        /* * start definitions * */
          var $controlsWrapper = $('div#controls-wrapper');
          var $thumbTray = $('div#thumb-tray');
          var $mainNav = $('nav.main-nav');
          var $about = $mainNav.find('a.about');
          var $contentAbout = $about.find(' + p');
          var $indexContainer = $('div.index-container');
          var $homeContainer = $('div.home-container');
          var $galleryContainer = $('div.gallery-container');
          var $imgBtnTop = $('img.btn_top');
          var goTop = $thumbTray.height();
          var $footer = $('footer');
        /* * end definitions * */
        /* ** start initial positions ** */
          $contentAbout.hide();
          $indexContainer.css({'position': 'absolute', 'right': 'auto'});
        /* ** end initial positions ** */
        /* *** start Animation *** */
          $imgBtnTop.hover(
            function(){
              if($controlsWrapper.hasClass('showing')==false){
                $thumbTray.stop(false,false).animate({'bottom':'0'}, 350);
                  /* *** BEGIN fix (botones izquierda y derecha (en #thumb-list) no sirven al cargar la web pero si cuando se redimensiona la ventana) *** */
                    $('body').resize();          
                  /* *** BEGIN fix (botones izquierda y derecha (en #thumb-list) no sirven al cargar la web pero si cuando se redimensiona la ventana) *** */
                $footer.addClass('no-hide');
              }
            },
            function(){
              /*if($controlsWrapper.hasClass('showing')){
                $thumbTray.stop(true,true).animate({'bottom':'-158px'}, 350);
                $controlsWrapper.removeClass('showing');
              }*/
            }
          );
          $thumbTray.hover(
            function(){
              $controlsWrapper.addClass('showing');
            },
            function(){
              $thumbTray.stop(true,true).animate({'bottom':'-158px'}, 350);
            }
          );
          $('ul#supersized li').hover(
            function(){
              $controlsWrapper.removeClass('showing');
              $footer.removeClass('no-hide');
            },
            function(){}
          );
          $footer.hover(
            function(){
              if($footer.hasClass('no-hide')){
                $thumbTray.stop(false,false).animate({'bottom':'0'}, 0);
              }
            },
            function(){}
          );
          $('ul#thumb-list li').click(function(){
              $imgBtnTop.addClass('clicked');
            }
          );
          /*$('ul#thumb-list li').click(function(){
            $controlsWrapper.removeClass('showing');
          });*/
          $about.hover(
            function(){
              // para que esto (.animate({backgroundColor: 'rgba(255, 255, 255, 0.2)'}, 300))
              // funcione fué necesario incluir: 
              // <script src="<?php bloginfo('template_url');?>/js/libs/$-1.8.1.min.js"></script> 
              // <script src="<?php bloginfo('template_url');?>/js/libs/$.animate-colors.js"></script> 
              $about.stop(true, true).animate({backgroundColor: 'rgba(255, 255, 255, 0.2)'}, 300);
            },
            function(){
              $about.stop(false, false).animate({backgroundColor: 'rgba(0, 0, 0, 0.6)'}, 350);
            }
          );
          $about.click(function(e){
            e.preventDefault();
            /*$.ajax({
                    type: "GET",
                    url: $(this).attr('href'),
                    data: { ajax: "true"},
                    success: function(data) {
                      $('#LightBox').html(data)
                      $('#LightBox').lightbox_me();
                    }
                  });*/
            $contentAbout.show();
            $('p.lightbox').remove();
            $contentAbout.lightbox_me().addClass('lightbox');
            if($('.lightbox').find('span.close').length==0){
              $('.lightbox').append('<span class="close">X</span>');
            }
          });
          $indexContainer
            .css({'position': 'static'})
            .find('ul.main-nav')
              .animate({'left': '-50%'}, 700);
          $indexContainer.find('img').hide('fade', 500, function(){
          });
          $indexContainer.find('ul.main-nav').css({'position': 'absolute'});
          $homeContainer.animate({'left': '-25%'}, 700);
          $galleryContainer.show();
        /* *** end initial Animation *** */
        
      },
      render: function(galleryId){
        $("body").removeClass();
        $("body").addClass('gallery');
        //this.$el.html(this.template());
        if($('div.gallery-container').length==0){
          this.$el.append(this.template());
          var clicBtn = false;
        }
        else{          
          clicBtn = true;
        }
        $('div.menu_header_index').hide();
        var $thumbTrayUls = $('div#thumb-tray ul');
        if($thumbTrayUls.length==1){
          $thumbTrayUls.first().remove();
        }
        //para automatizar tengo que cambiar el subindice "thisID" en:
        //imgs.at(0).attributes[thisID].images -- basandome en el parámetro
        //que recibo (galleryId) para buscar el id al que pertenece galleryId
        thisId = 0;
        galleryId = this.galleryId;
        cont=0;
        _.each(imgs.at(0).attributes, function(thisGallery){
          if(thisGallery.idAttribute==galleryId){
            thisId = cont;
          }
          cont++;
        })
        /* *** BEGIN Supersized slider *** */
        var images = imgs.at(0).attributes[thisId].images
        //console.log(images);				
				$.supersized({
					// Functionality
					slideshow               :   1,			// Slideshow on/off
					autoplay				:	0,			// Slideshow starts playing automatically
					start_slide             :   1,			// Start slide (0 is random)
					stop_loop				:	0,			// Pauses slideshow on last slide
					random					: 	0,			// Randomize slide order (Ignores start slide)
					slide_interval          :   0,		// Length between transitions
					transition              :   6, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
					transition_speed		:	1000,		// Speed of transition
					new_window				:	1,			// Image links open in new window/tab
					pause_hover             :   0,			// Pause slideshow on hover
					keyboard_nav            :   1,			// Keyboard navigation on/off
					performance				:	3,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
					image_protect			:	1,			// Disables image dragging and right click with Javascript
															   
					// Size & Position						   
					min_width		        :   0,			// Min width allowed (in pixels)
					min_height		        :   0,			// Min height allowed (in pixels)
					vertical_center         :   1,			// Vertically center background
					horizontal_center       :   1,			// Horizontally center background
					fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
					fit_portrait         	:   1,			// Portrait images will not exceed browser height
					fit_landscape			:   1,			// Landscape images will not exceed browser width
															   
					// Components							
					slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
					thumb_links				:	1,			// Individual thumb links for each slide
					thumbnail_navigation    :   0,			// Thumbnail navigation
					slides 					:  	images,
												
					// Theme Options			   
					progress_bar			:	1,			// Timer for each slide							
					mouse_scrub				:	0					
				});
        /* *** END Supersized slider *** */        
        var $ulSupersized = $('ul#supersized');
        this.animateSection(this.galleryId);       
        $ulSupersized.find('li a').css({'cursor': 'default'}).removeAttr('href');
        $ulSupersized.click(function(e){
          e.preventDefault();
        });
        /* *** BEGIN mousemove in gallery *** */          
          var thumbListLeft = 0;
          var outerCont = 0;
          var thumbsListParts = 0;
          var $thumbList = $('ul#thumb-list');
          var rightLimit = $(window).width();
          var auxBtn = false;
          var $actualThumbListLeft = $('ul#thumb-list').css('left');
          $(window).resize(function(){
            thumbsListParts = parseInt($('#thumb-list').width()/$(window).width());
            rightLimit = $(window).width();
          });
          $ulSupersized.find('li').each(function(i){
            $(this).attr('id', i);
          });
          $ulSupersized.find('li').first().addClass('current');
          $ulSupersized.find('li.current').next().addClass('next');
          $ulSupersized.find('li').last().addClass('prev');
          var lastLi = $ulSupersized.find('li').last().attr('id');
          var $btnPrevSlide = $('a#prevslide');
          var $btnNextSlide = $('a#nextslide');
          $btnPrevSlide.css({'height': $(window).height()});
          $btnNextSlide.css({'height': $(window).height()});
          $thumbList.find('li').click(function(){
            $('li.activeslide').removeClass('activeslide');
            if($('li.prevslide').attr('id') == $ulSupersized.find('li').length-1){              
              $('li.prevslide').removeClass('prevslide');
            }
            $ulSupersized.find('li.next').removeClass('next');
            $ulSupersized.find('li.prev').removeClass('prev');
            $ulSupersized.find('li.current').removeClass('current');            
            var numberId = $(this).attr('class');
            $ulSupersized.find('li#'+numberId.replace(/[^0-9]/g,'')).addClass('current');
            $ulSupersized.find('li.current').next().addClass('next');
            $ulSupersized.find('li.current').prev().addClass('prev');
            $('body').css({'background-image': 'url('+$('li.current a img').attr('src')+')'});
            if(numberId.replace(/[^0-9]/g,'') == '0'){
              $ulSupersized.find('li.prev').removeClass('prev');
              $ulSupersized.find('li').last().addClass('prev');
            }
            if(numberId.replace(/[^0-9]/g,'') == $ulSupersized.find('li').length-1){
              $ulSupersized.find('li.next').removeClass('next');
              $ulSupersized.find('li').first().addClass('next');
            }
            $('li.next').addClass('activeslide').css({'position':'absolute', 'left': $(window).width()});
            $('li.prev').addClass('activeslide').css({'position':'absolute', 'left': -$(window).width()});
            /*if($('li.current').attr('id') == $ulSupersized.find('li').length-1){
              $('li.current').css({'left':'0', 'visibility': 'visible'});
              console.log($('li.current').attr('class'));
            }*/
          });
          $btnPrevSlide.click(function(){
            $('li.next').removeClass('activeslide');
            $('li.prev').removeClass('activeslide');
            $ulSupersized.find('li.next').removeClass('next');
            $ulSupersized.find('li.current').addClass('next').removeClass('current');
            if($ulSupersized.find('li.prev').attr('id') == '0'){
              $ulSupersized.find('li.prev').addClass('current marked').removeClass('prev').css({'left': '0'});
              $ulSupersized.find('li').last().addClass('prev').css({'left': -rightLimit});
            }
            else{
              $ulSupersized.find('li.prev').prev().addClass('prev newprev');
              $ulSupersized.find('li.prev:not(.newprev)').addClass('current marked').removeClass('prev').css({'left': '0'});
              $ulSupersized.find('li.prev').removeClass('newprev').css({'left': -rightLimit});
            }
            $('body').css({'background-image': 'url('+$('li.current a img').attr('src')+')'});
            if(clicBtn){
              $('li.current').addClass('activeslide')
            }
          });
          $btnNextSlide.click(function(){
            $('li.next').removeClass('activeslide');
            $('li.prev').removeClass('activeslide');
            $ulSupersized.find('li.prev').removeClass('prev');
            $ulSupersized.find('li.current').addClass('prev').removeClass('current');
            if($ulSupersized.find('li.next').attr('id') == lastLi){
              $ulSupersized.find('li.next').addClass('current').removeClass('next').css({'left': '0'});
              $ulSupersized.find('li').first().addClass('next');
            }
            else{
              $ulSupersized.find('li.next').next().addClass('next newnext');
              $ulSupersized.find('li.next:not(.newnext)').addClass('current').removeClass('next').css({'left': '0'});
              $ulSupersized.find('li.next').removeClass('newnext');
            }
            $('body').css({'background-image': 'url('+$('li.current a img').attr('src')+')'});
            if(clicBtn){
              $('li.current').addClass('activeslide');
            }
            //clicBtn=true;
          });
          /* ** BEGIN new background ** */
            //console.log($('li.current a img').attr('src'));
            $('body').css({'background-image': 'url('+$('li.current a img').attr('src')+')'});
          /* ** END new background ** */
          var $activeSlide = $('li.current');
          var $prevSlide = $('li.prev');
          var $nextSlide = $('li.next');
          var bottomLimit = $(window).height();
            $('body').mousemove(function(e){
              if($('body').hasClass('gallery')){
                rightLimit = $(window).width();
                var thumbListWidth = $thumbList.width();
                var cont=0;
                /*if($thumbList.position().left==0){
                  outerCont=0;
                  thumbListLeft=0;
                }
                thumbsListParts = parseInt($('#thumb-list').width()/$(window).width());
                $(window).resize(function(){
                  rightLimit = $(window).width();
                  bottomLimit = $(window).height();
                });
                $thumbList.find('li').each(function(i){
                  if( (($(this).position().left)+($(this).width()) >= rightLimit) && (cont == 0) ){
                    $(this).addClass('current_thumb_limit');
                    cont++;
                  }
                });
                var $currentThumbLimit = $('li.current_thumb_limit');
                if((e.pageX >= (rightLimit-50)) && (e.pageY >= (bottomLimit-200))){
                  if( ($thumbList.position().left >= ((rightLimit-40)-thumbListWidth)) && (outerCont < thumbsListParts) ){
                    //---------- BEGIN código repetido (1)
                    thumbListLeft = thumbListLeft+$currentThumbLimit.position().left;
                    if(outerCont == 0 && $thumbList.hasClass('delay_animation')==false){
                      $thumbList.animate({'left': -thumbListLeft}, 350);
                      $thumbList.addClass('delay_animation');
                    }
                    else{
                      $thumbList.delay(1500).stop(true,true).animate({'left': -thumbListLeft}, 350);
                    }
                    //---------- END código repetido (1)
                    outerCont++;
                  }
                }
                if(e.pageX > 50 && e.pageX < (rightLimit-50)){
                  $thumbList.removeClass('delay_animation');
                  if($thumbList.hasClass('reset_left')){
                    $thumbList
                      .css({'left': $actualThumbListLeft})
                      .removeClass('reset_left');
                  }
                }
                if((e.pageX <= 50) && (e.pageY >= (bottomLimit-200))){
                  if( ($thumbList.position().left < 0) && (outerCont > 0) ){
                    //---------- BEGIN código repetido (1)
                    thumbListLeft = thumbListLeft-$currentThumbLimit.position().left;
                    if(outerCont == 0 && $thumbList.hasClass('delay_animation')==false){
                      $thumbList.animate({'left': -thumbListLeft}, 350);
                      $thumbList.addClass('delay_animation');
                    }
                    else{
                      $thumbList.delay(1500).stop(true,true).animate({'left': -thumbListLeft}, 350);
                    }
                    //---------- END código repetido (1)
                    outerCont--;
                  }
                } */
                /* ** BEGIN previous and next image ** */
                    $activeSlide = $('li.current');
                    $prevSlide = $('li.prev');
                    $nextSlide = $('li.next');
                  //}
                  $('#thumb-tray').hover(
                    function(){
                      bottomLimit = bottomLimit-$('#thumb-tray').height()-$('footer').height();
                    },
                    function(){
                      bottomLimit = $(window).height();
                    }
                  );
                  if(e.pageX >= rightLimit-250 && (e.pageY <= (bottomLimit)) && $nextSlide.hasClass('activeslide')==false){
                    $activeSlide.stop(true,true).animate({'left':'-10%'}, 350).addClass('activeslide');;
                    $nextSlide
                      .addClass('activeslide')
                      .css({'left':'100%', 'visibility': 'visible'})
                      .stop(true,false)
                      .animate({'left':'90%'}, 350);
                    $('body').css({'background-image': 'url('+$('li.current a img').attr('src')+')'});
                  }
                  if( (e.pageX > 250 && e.pageX < rightLimit-250) && (e.pageY <= (bottomLimit))  && ( $prevSlide.hasClass('activeslide')==true || $nextSlide.hasClass('activeslide')==true )){
                    $activeSlide.animate({'left':'0'}, 250).addClass('activeslide');
                    $nextSlide
                      //.removeClass('activeslide')
                      //.css({'visibility': 'hidden'})
                      //.stop(false,false)
                      .animate({'left': '100%'}, 250, 
                        function(){
                          $nextSlide
                            .removeClass('activeslide')
                            .css({'visibility': 'hidden'});                        
                        }
                      );
                    $prevSlide
                      //.removeClass('activeslide')
                      //.css({'visibility': 'hidden'})
                      //.stop(false,false)
                      .animate({'left': -rightLimit}, 250, 
                        function(){
                          $prevSlide
                            .removeClass('activeslide')
                            .css({'visibility': 'hidden'});
                        }
                      );
                  }
                  if(e.pageX < 250 && (e.pageY <= (bottomLimit))  && $prevSlide.hasClass('activeslide')==false){
                    $activeSlide.stop(true,true).animate({'left':'10%'}, 350).addClass('activeslide');;
                    $prevSlide
                      .addClass('activeslide')
                      .css({'left': -rightLimit, 'visibility': 'visible'})
                      .stop(true,false)
                      .animate({'left': '-90%'}, 350);
                    $('body').css({'background-image': 'url('+$('li.current a img').attr('src')+')'});
                  }
                /* ** END previous and next image ** */
                if($('#thumb-tray').hasClass('checked')==false){
                  $('#thumb-tray').css({'bottom': '-158px', 'display': 'block'}).addClass('checked');
                }
              }
            });
          /* *** END mousemove in gallery *** */
          /* ** BEGIN hide description's gallery ** */
            $('div.first_image div').css({'display':'none'});
          /* ** END hide description's gallery ** */
        return this;
      }
    });


  /* ROUTERS */
    var AppRouter = Backbone.Router.extend({
      routes: {
        "home": "home",
        "index": "index",
        "gallery/:galleryId": "gallery",
        //"content/:idAttribute/articles/:idArticle": "article",
        "*actions": "home" //antes --> "*actions": "intro"
      },
      gallery: function(galleryId){
        new GalleryView(galleryId);
      }, 
      home: function(){
        new HomeView();
      }, 
      index: function(){
        new indexView();
      }/*,
      timeline: function(idAttribute){
        new TimeLineView(idAttribute);
      }, 
      article: function(idAttribute, idArticle){
        new ContentView(idAttribute, idArticle);
      }*/
    });
    var app_router = new AppRouter;
    Backbone.history.start();
});