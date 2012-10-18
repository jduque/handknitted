<?php
/**
 * Template Name: Home
 * @package WordPress
 * @subpackage themename
 */
 ?>
<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->

<!-- *************** HEADER ********************************************************* -->
<?php get_header(); ?>

<!-- *************** MAIN *********************************************************** -->
<div id="main" role="main" class="clearfix">
  <div class="maincontent">
  </div>
  <div class="curtain">
    <div id="loader">
      
		</div>
	</div>
</div>

<!-- *************** HOME *********************************************************** -->
<script type="text/html" id="home-template">
  <div id="slides">
    <div class="slides_container">
        <%
          cont = 0;
          length = pags.at(0).attributes.slides.length;
          thisSlides = pags.at(0).attributes.slides;
          _.each(thisSlides, function(slide){ 
            cont++;
            if(cont == length){this_class = "content last";}
            else{this_class = "content"}
            %>
            <div class="<%= this_class %>">
              <img src="<%=  slide.background[0] %>" style="width: <%=  slide.background[1] %>px;height: <%=  slide.background[2] %>px;" alt="" class=""/>
              <a href="<%= slide.link %>" class="" >
                <%= slide.text_link %>
              </a>
              <%= slide.video %>
            </div>
          <% }); %> <!-- END _.each -->
    </div>
    <div id="primary">
			<div id="content">

				

			</div><!-- #content -->
		</div><!-- #primary -->
  </div>
</script>

<!-- *************** INDEX ******************************************************** -->
<script type="text/html" id="index-template">
  <div class="index-container row">
    <?php wp_nav_menu( array ("container" => false) ); ?>
    <div class="gallery_header menu_header_index">
      
      <h4 class="title">Fotografía de la naturaleza<br /> y documental</h4>
    </div>
    <!--<center>-->
      <ul class="main-nav span3">
        <li class="gallery_title">Galería</li>
        <?php
            wp_list_categories('hide_empty=0&child_of=7');
        ?>
      </ul>
    <!--</center>-->
    <div class="first_image">
      <%
        cont=0;
        _.each(imgs.at(0).attributes, function(thisGallery){ %>
          <img src="<%= thisGallery.images[0].image %>" class="<%= thisGallery.idAttribute %>" />
          <div class="<%= thisGallery.idAttribute %>">
            <%= thisGallery.description %>
          </div>
        <%  
        })
      %>
    </div>
  </div>
  <div id="log"></div> 
  <div id="loading"></div>
</script>

<!-- *************** CONTACT ******************************************************** -->
<script type="text/html" id="contact-template">
</script>

<!-- *************** ABOUT ********************************************************** -->
<script type="text/html" id="about-template">
  <nav class="page_nav">You are here - <%= get("nombre") %></nav>
  <div class="about_container row">
    <div class="content span12">
      <div class ="title span9">
        <h1><%= get("title") %></h1>
      </div>
      <ul class="outer_content">
        <li class="parent span5"><p><%= get("leftParagraph") %></p></li>
        <li class="parent span2">
          <h3>awards</h3>
          <ul>
            <li><%= get("awards") %></li>
          </ul>
        </li>
        <li class="parent span2">
          <h3>recognize</h3>
            <ul>
              <li><%= get("recognize") %></li>
            </ul>
        </li>
      </ul>
    </div>
  </div>
</script>

<!-- *************** DEFAULT ******************************************************* -->
<script type="text/html" id="default-template">
  <div class="default_container span12">
    <%      
      thisPages = pags.at(6).attributes.pages;
      if(thisPages[0].slug == ""){ %>      
        <nav class="page_nav">You are here - <span><%= pags.at(6).attributes.title %></span></nav>
        <div class="content span8">
          <div class="inner_content <%= pags.at(6).attributes.slug %> row">
            <div class="title span7"><%= pags.at(6).attributes.title %></div>
            <div class="bigtext span7"><h1><%= pags.at(6).attributes.bigText %></h1></div>
            <div class="leftp span3"><p><%= pags.at(6).attributes.leftParagraph %></p></div>
            <% if(pags.at(6).attributes.awards!=""){ %>
              <div class="awards span2">
                <h3>awards</h3><ul><li><%= pags.at(6).attributes.awards %></li></ul>
              </div>
            <% } 
            if(pags.at(6).attributes.socialnet!=""){ %>
              <div class="socialnet span2">
                <h3>socialnet</h3><ul><li><%= pags.at(6).attributes.socialnet %></li></ul>
              </div>
            <% } %>
          </div>
        </div>
      <%  
      }
      else{
    %>
      <nav class="page_nav">You are here - <%= pags.at(6).attributes.title %> - <span><%= pags.at(6).attributes.pages[0].title %></span></nav>
      <div class="vertical_nav span3">
        <h1 class="span4"><%= get("title") %></h1>
        <div class="menu">
        <nav class="top_arrow span2" ><a href="" class="">top</a></nav>
          <ul class="nav_services span4">
          <% _.each(thisPages, function(page){ %>
              <li><a href="#" class="<%= page.slug %>"><%= page.title %></a></li>
          <% });  %>  <!-- END _.each -->
          </ul>
          <nav class="bottom_arrow span2"><a href="" class="">bottom</a></nav>
        </div>
      </div>  
      <% _.each(thisPages, function(thisPage){ %>
        <div class=" span8">
          <div class="inner_content <%= thisPage.slug %> row">
            <div class="title span7"><%= thisPage.title %></div>
            <div class="bigtext span7"><h1><%= thisPage.bigText %></h1></div>
            <div class="leftp span3"><p><%= thisPage.leftParagraph %></p></div>
            <% if(thisPage.awards!=""){ %>
              <div class="awards span2">
                <h3>awards</h3><ul><li><%= thisPage.awards %></li></ul>
              </div>
            <% } 
            if(thisPage.socialnet!=""){ %>
              <div class="socialnet span2">
                <h3>socialnet</h3><ul><li><%= thisPage.socialnet %></li></ul>
              </div>
            <% } %>
          </div>
        </div>
      <% });  %> <!-- END _.each -->
    <% } %> <!-- END else -->
  </div>
</script>

<!-- *************** FOOTER ********************************************************* -->
<?php get_footer(); ?>
