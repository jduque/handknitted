<?php
/**
 * @package WordPress
 * @subpackage themename
 */
?>

	</div><!-- #main  -->

	<footer id="colophon" role="contentinfo">
			<div id="site-generator">
				<small>&copy Copyright <?php echo date('Y') . " " . esc_attr( get_bloginfo( 'name', 'display' ) ); ?> <a href="http://wordpress.org/" title="<?php esc_attr_e( 'A Semantic Personal Publishing Platform', 'themename' ); ?>" rel="generator"><?php printf( __( 'Proudly powered by %s.', 'themename' ), 'WordPress' ); ?></a></small>
				<?php wp_nav_menu( array( 'theme_location' => 'footer' ) ); ?>
			</div>
	</footer><!-- #colophon -->
</div><!-- #page -->

  <!-- JS -->
  <script src="<?php bloginfo('template_url');?>/js/libs/underscore-min.js"></script>  
  <script src="<?php bloginfo('template_url');?>/js/libs/backbone-min.js"></script> 
  <script src="<?php bloginfo('template_url');?>/js/libs/jquery-1.8.1.min.js"></script> 
  <script src="<?php bloginfo('template_url');?>/js/libs/jquery-ui-1.8.18.custom.min.js"></script> 
  <script src="<?php bloginfo('template_url');?>/js/libs/jquery.animate-colors.js"></script> 
  <script src="<?php bloginfo('template_url');?>/js/libs/bootstrap.js" type="text/javascript"></script>
  <script src="<?php bloginfo('template_url');?>/js/plugins.js" type="text/javascript"></script>
  <script src="<?php bloginfo('template_url');?>/js/script.js" type="text/javascript"></script> 
  <script src="<?php bloginfo('template_url');?>/js/exampleCollection.js" type="text/javascript"></script>  
  <script src="<?php bloginfo('template_url');?>/js/examplePagesCollection.js" type="text/javascript"></script>  
  <!--<script src="<?php //echo get_permalink(74)."&idCategory=7"; ?>" type="text/javascript"></script>-->
  <script src="<?php bloginfo('template_url');?>/js/exampleMain.js" type="text/javascript"></script>  
  
  <script>
    /*var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ ';
    s.parentNode.insertBefore(g,s)}(document,'script'));*/
  </script>
  
<?php wp_footer(); ?>

</body>
</html>