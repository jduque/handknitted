<?php
/**
 * @package WordPress
 * @subpackage themename
 */
if($_GET['ajax']){ 
    if ( is_day() ) : 
      $archive = printf( __( 'Daily Archives: <span>%s</span>', 'themename' ), get_the_date() ); 
    elseif ( is_month() ) : 
      $archive = printf( __( 'Monthly Archives: <span>%s</span>', 'themename' ), get_the_date( 'F Y' ) ); 
    elseif ( is_year() ) : 
      $archive = printf( __( 'Yearly Archives: <span>%s</span>', 'themename' ), get_the_date( 'Y' ) ); 
    else : 
      $archive = _e( 'Blog Archives', 'themename' ); 
    endif;
    printf( "<div class='results_for no_this_time'> Search Results for: %s </div>", "<span>" . $archive . "</span>" );
    printf( "%s", "<div class='title'> archives </div>" );
  if ( have_posts() ) :
    printf( "%s", "<div class='results'>" . get_template_part( 'loop', 'search' ) . "</div>");
  endif;
  $classes = get_body_class();  
  foreach ($classes as $i => $value) {
    printf( "%s", "<div class='body_classes'>" . $classes[$i] . "</div>" );  
  }
}
else{
get_header(); ?>

		<section id="primary" role="region">
			<div id="content">

				<?php the_post(); ?>

				<header class="page-header">
					<h1 class="page-title">
						<?php if ( is_day() ) : ?>
							<?php printf( __( 'Daily Archives: <span>%s</span>', 'themename' ), get_the_date() ); ?>
						<?php elseif ( is_month() ) : ?>
							<?php printf( __( 'Monthly Archives: <span>%s</span>', 'themename' ), get_the_date( 'F Y' ) ); ?>
						<?php elseif ( is_year() ) : ?>
							<?php printf( __( 'Yearly Archives: <span>%s</span>', 'themename' ), get_the_date( 'Y' ) ); ?>
						<?php else : ?>
							<?php _e( 'Blog Archives', 'themename' ); ?>
						<?php endif; ?>
					</h1>
				</header>

				<?php rewind_posts(); ?>

				<?php get_template_part( 'loop', 'archive' ); ?>

			</div><!-- #content -->
		</section><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); 
}
?>