<?php
header('Access-Control-Allow-Origin: *');  
/**
 * @package WordPress
 * @subpackage themename
 */
  $cont = 0;
  if($_GET['ajax']==true){
    global $more;    
    $more = 0;       
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
            </nav>
        </header>
        <div id="content">
          <?php get_template_part( 'loop', 'index' ); ?>
        </div>
        <div class="next_slide"><p>next</p></div>
      </div>
    </script>

    <!-- *************** PAGE ******************************************************* -->
    <script type="text/html" id="page-template">
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
                <% 
                  customField = pageModel.at(0).attributes.custom;
                  cont=0;
                  for(customName in customField){
                    if(cont>2){ %>
                      <div class="custom <%= customName %>"><%= customField[customName] %></div>
                    <% }
                    cont++;
                  } %>
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
                <% });  %>
                </ul>
                <nav class="bottom_arrow"><a href="" class="">bottom</a></nav>
              </div>
            </div>  
            <% _.each(thisPages.pages, function(thisPage){ %>
              <div class="">
                <div class="inner_content <%= thisPage.slug %>">
                  <h2 class="subpage_title"><%= thisPage.title %></h2>
                  <div class="content_subpage"><%= thisPage.content %></div>
                  <% 
                    customField = thisPage.custom;
                    cont=0;
                    for(customName in customField){
                      if(cont>2){ %>
                        <div class="custom <%= customName %>"><%= customField[customName] %></div>                 
                      <% }
                      cont++;
                    } %> 
                </div>
              </div>
            <% });  %> 
        <% } %>
        <div class="next_slide"><p>next</p></div>
      </div>
    </script>

    <!-- *************** SINGLE ******************************************************* -->
    <script type="text/html" id="single-template">  
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
                <% 
                  customField = pageModel.at(0).attributes.custom;
                  cont=0;
                  for(customName in customField){
                    if(cont>2){ %>
                      <div class="custom <%= customName %>"><%= customField[customName] %></div>
                    <% }
                    cont++;
                  } %>
              </div>
            </div>
      </div>
    </script>

    <!-- *************** SEARCH ******************************************************* -->
    <script type="text/html" id="search-template">  
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