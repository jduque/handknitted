<?php
header('Access-Control-Allow-Origin: *');  
/**
 * @package WordPress
 * @subpackage themename
 */

$ID = $_GET['page_id'];
if($_GET['ajax']){
  if ( have_posts() ) : 
    while ( have_posts() ) : 
      the_post();
      $the_content = apply_filters('the_content',get_the_content());
      $the_title = get_the_title();
    endwhile;
  endif;
  $myPost=get_post($ID);
  $pages['idAttribute']=$ID;
  $pages['title']=$the_title;
  $pages['content']=$the_content;
  $pages['slug']=$myPost->post_name;
  $pages['custom']=get_post_custom($ID);
  $pages['bodyClass']=get_body_class();
  $subpages=get_pages(array('child_of'=>$ID,'post_type'=>'page','post_status' =>'publish'));
  $count=0;
  if($subpages!=null){
    foreach($subpages as $page){
      $page_id = $page->ID;
      $subpage[$count]['subpageId']=$page_id;
      $subpage[$count]['title']=$page->post_title;
      $subpage[$count]['content']=$page->post_content;
      $subpage[$count]['slug']=$page->post_name;
      $subpage[$count]['custom']=get_post_custom($page_id);
      $count++;
    }
  }
  else{
    $subpage[$count]['title']="";
    $subpage[$count]['content']="";
    $subpage[$count]['slug']="";
    $subpage[$count]['custom']="";
  }
  $pages['pages']=$subpage;
  echo json_encode($pages);
}
else{
  get_header(); ?>

      <div id="primary">
        <div id="content">

          <?php the_post(); ?>

          <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> role="article">
            <header class="entry-header">
              <h1 class="entry-title"><?php the_title(); ?></h1>
            </header><!-- .entry-header -->

            <div class="entry-content">
              <?php the_content(); ?>
              <?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'themename' ), 'after' => '</div>' ) ); ?>
              <?php edit_post_link( __( 'Edit', 'themename' ), '<span class="edit-link">', '</span>' ); ?>
            </div><!-- .entry-content -->
          </article><!-- #post-<?php the_ID(); ?> -->

          <?php comments_template( '', true ); ?>

        </div><!-- #content -->
      </div><!-- #primary -->

  <?php get_sidebar(); ?>
  <?php get_footer(); 
}
?>