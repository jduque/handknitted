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
  
</script>

<!-- *************** INDEX ******************************************************** -->
<script type="text/html" id="index-template">
  <div class="index-container row">
    <?php wp_nav_menu( array ("container" => false) ); ?>
    <div class="gallery_header menu_header_index">
      
      <h4 class="title"></h4>
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

<!-- *************** PAGE ******************************************************* -->
<script type="text/html" id="page-template">
    <!--
    /* *** please note *** */
    /*
      <% pageModel.at(0).attributes; %> // Call all current JSon data
      <% pageModel.at(0).attributes.customName; %> //example custom, where customName is the name of the custom field 
    */
    -->
<div class="page_container">
    <%
      thisPages = pageModel.at(0).attributes;
      if(thisPages.pages[0].slug == ""){ %>      
        <nav class="page_nav">You are here - <span><%= pageModel.at(0).attributes.title %></span></nav>
        <div class="content">
          <div class="inner_content <%= pageModel.at(0).attributes.slug %> row">
            <h2 class="title"><%= pageModel.at(0).attributes.title %></h2>
            <div class="page_content">
              <%= pageModel.at(0).attributes.content %>
              <%= pageModel.at(0).attributes.search %>
            </div>
            <!-- BEGIN show all custom fields -->
            <% 
              customField = pageModel.at(0).attributes.custom;
              cont=0;
              for(customName in customField){
                if(cont>2){ %>
                  <div class="custom <%= customName %>"><%= customField[customName] %></div>
                <% }
                cont++;
              } %> <!-- END for -->
            <!-- END show all custom fields -->
          </div>
        </div>
      <%  
      }
      else{
    %>
      <nav class="page_nav">You are here - <%= pageModel.at(0).attributes.title %> - <span><%= pageModel.at(0).attributes.pages[0].title %></span></nav>
      <div class="vertical_nav">
        <h1 class="subpage_parent_title"><%= pageModel.at(0).attributes.title %></h1>
        <div class="menu">
        <nav class="top_arrow" ><a href="" class="">top</a></nav>
          <ul class="nav_ul">
          <% _.each(thisPages.pages, function(page){ %>
              <li><a href="#<%= page.subpageId %>" class="<%= page.slug %>"><%= page.title %></a></li>
          <% });  %>  <!-- END _.each -->
          </ul>
          <nav class="bottom_arrow"><a href="" class="">bottom</a></nav>
        </div>
      </div>  
      <% _.each(thisPages.pages, function(thisPage){ %>
        <div class="">
          <div class="inner_content <%= thisPage.slug %> row">
            <h2 class="subpage_title"><%= thisPage.title %></h2>
            <div class="content_subpage"><%= thisPage.content %></div>
            <!-- BEGIN show all custom fields -->
            <% 
              customField = thisPage.custom;
              cont=0;
              for(customName in customField){
                if(cont>2){ %>
                  <div class="custom <%= customName %>"><%= customField[customName] %></div>                 
                <% }
                cont++;
              } %> <!-- END for -->
            <!-- END show all custom fields -->
          </div>
        </div>
      <% });  %> <!-- END _.each -->
    <% } %> <!-- END else -->
  </div>
</script>

<!-- *************** FOOTER ********************************************************* -->
<?php get_footer(); ?>
