<?php
header('Access-Control-Allow-Origin: *');  
/**
 * @package WordPress
 * @subpackage themename
 */
  $cont = 0;
  if($_GET['ajax']==true){
    if ( have_posts() ) : 
      while ( have_posts() ) : 
        the_post();
        $home[$cont]['content'] = get_the_content();
        $ID = get_the_ID();
        $myPost=get_post($ID);
        $home[$cont]['idAttribute']=$ID;
        $home[$cont]['title']=get_the_title();
        $home[$cont]['name']=$myPost->post_name;
        $home[$cont]['slug']=$myPost->post_name;
        $home[$cont]['custom']=get_post_custom($ID);
        $cont++;
      endwhile;
    endif;
    echo json_encode($home);
  }
  else{
    get_header(); ?>
      <div id="primary">
        <div id="content">
          <?php get_template_part( 'loop', 'index' ); ?>
        </div><!-- #content -->
      </div><!-- #primary -->
    <?php get_sidebar(); ?>
    <?php get_footer(); 
  }
?>