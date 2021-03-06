<?php
header('Access-Control-Allow-Origin: *');  
/**
 * @package WordPress
 * @subpackage themename
 */
  $cont = 0;
  if($_GET['ajax']==true){
    global $more;    // Declare global $more (before the loop).
    $more = 0;       // Set (inside the loop) to display content above the more tag.
    if ( have_posts() ) : 
      while ( have_posts() ) : 
        the_post();
        $home[$cont]['content'] = apply_filters('the_content',get_the_content());
        $home[$cont]['title']=get_the_title();
        $ID = get_the_ID();
      endwhile;
    endif;
        $myPost=get_post($ID);
        $home[$cont]['idAttribute']=$ID;
        $home[$cont]['slug']=$myPost->post_name;
        $home[$cont]['custom']=get_post_custom($ID);
        $home[$cont]['bodyClass']=get_body_class();
        $cont++;
    echo json_encode($home);
  }
  else{ 
    get_header(); ?>

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
      <div id="primary">
        <header id="branding" role="banner">
            <hgroup>
              <h1 id="site-title"><span><a href="<?php echo home_url( '/' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></span></h1>
              <h2 id="site-description"><?php bloginfo( 'description' ); ?></h2>
            </hgroup>				
            <!--<nav id="utility" role="article">
              <?php //wp_nav_menu( array( 'theme_location' => 'utility' ) ); ?>
            </nav><!-- #utility -->
            <!--<div class="search"><?php //get_search_form(); ?></div>	-->
            <nav id="access" role="article">
              <h1 class="section-heading"><?php _e( 'Main menu', 'themename' ); ?></h1>
              <div class="skip-link visuallyhidden"><a href="#content" title="<?php esc_attr_e( 'Skip to content', 'themename' ); ?>"><?php _e( 'Skip to content', 'themename' ); ?></a></div>
              <?php wp_nav_menu( array('menu' => 'Top')); ?>
            </nav><!-- #access -->
        </header><!-- #branding -->
        <div id="content">
          <?php get_template_part( 'loop', 'index' ); ?>
        </div> <!-- #content -->
        <div class="next_slide"><p>next</p></div>
      </div> <!-- #primary -->
    </script>

    <!-- *************** INDEX ******************************************************** -->
    <script type="text/html" id="index-template">
      <div class="index-container">
        <?php wp_nav_menu( array ("container" => false) ); ?>
        <div class="gallery_header menu_header_index">
          
          <h4 class="title"></h4>
        </div>
        /*<center>*/
          <ul class="main-nav span3">
            <li class="gallery_title">Galer�a</li>
            <?php
                wp_list_categories('hide_empty=0&child_of=7');
            ?>
          </ul>
        /*</center>*/
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
      <div class="about_container">
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
        <!-- ******************* -->
        <!-- *** please note *** --> 
        <!-- ******************* -->        
        <!--<% pageModel.at(0).attributes; %> // Call all current JSon data -->
        <!--<% pageModel.at(0).attributes.customName; %> //example custom, where customName is the name of the custom field -->
    <div class="page_container">
      <div class="prev_slide"><p>prev</p></div>
        <%
          thisPages = pageModel.at(0).attributes;
          if(thisPages.pages[0].slug == ""){ %>      
            <nav class="page_nav">You are here - <span><%= pageModel.at(0).attributes.title %></span></nav>
            <div class="content">
              <div class="inner_content <%= pageModel.at(0).attributes.slug %>">
                <h2 class="title"><%= pageModel.at(0).attributes.title %></h2>
                <div class="page_content">
                  <%= pageModel.at(0).attributes.content %>
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
          else{ %>
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
                <div class="inner_content <%= thisPage.slug %>">
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
        <div class="next_slide"><p>next</p></div>
      </div>
    </script>

    <!-- *************** SINGLE ******************************************************* -->
    <script type="text/html" id="single-template">        
        <!-- ******************* -->
        <!-- *** please note *** --> 
        <!-- ******************* -->        
        <!--<% pageModel.at(0).attributes; %> // Call all current JSon data -->
        <!--<% pageModel.at(0).attributes.customName; %> //example custom, where customName is the name of the custom field -->
        <% $("body").attr("class",pageModel.at(0).attributes.bodyClass.toString().replace(/,/g," ")); %>
      <div class="single_container">
        <%
          thisPages = pageModel.at(0).attributes; %>      
            <nav class="page_nav">You are here - <span><%= pageModel.at(0).attributes.title %></span></nav>
            <div class="content">
              <div class="inner_content <%= pageModel.at(0).attributes.slug %>">
                <h2 class="title"><%= pageModel.at(0).attributes.title %></h2>
                <div class="page_content">
                  <%= pageModel.at(0).attributes.content %>
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
      </div>
    </script>

    <!-- *************** SEARCH ******************************************************* -->
    <script type="text/html" id="search-template">        
        <!-- ******************* -->
        <!-- *** please note *** --> 
        <!-- ******************* -->        
        <!--<% searchModel.at(0).attributes[0]; %> // Call all current JSon data -->
      <div class="single_container">
        <%
          thisSearch = searchModel.at(0).attributes[0];
          %>      
            <nav class="page_nav">You are here - <span><%= thisSearch.title %></span></nav>
            <div class="content">
              <div class="inner_content">
                <h2 class="title"><%= thisSearch.title %></h2>
                <div class="page_content">
                  <%= thisSearch.resultsFor %>
                  <%= thisSearch.results %>
                </div>
              </div>
            </div>
      </div>
    </script>


    <!-- ***************  ARCHIVE ******************************************************* -->
    <script type="text/html" id="archive-template">        
        <!-- ******************* -->
        <!-- *** please note *** --> 
        <!-- ******************* -->        
        <!--<% archiveModel.at(0).attributes[0]; %> // Call all current JSon data -->
      <div class="single_container">
        <%
          thisArchive = archiveModel.at(0).attributes[0];
          %>      
            <nav class="page_nav">You are here - <span><%= thisArchive.title %></span></nav>
            <div class="content">
              <div class="inner_content">
                <h2 class="title"><%= thisArchive.title %></h2>
                <div class="page_content">
                  <%= thisArchive.resultsFor %>
                  <%= thisArchive.results %>
                </div>
              </div>
            </div>
      </div>
    </script>

    <!-- *************** FOOTER ********************************************************* -->
    <?php get_footer();
 
  } //end else
?>