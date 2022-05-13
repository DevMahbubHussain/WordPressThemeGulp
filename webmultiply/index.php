<?php get_header();?>
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
   <div class="test">
     <h2>
       <a href="<?php the_permalink();?>" title="<?php the_title_attribute();?>"><?php the_title();?></a>
   </h2>
   </div>
   <div>
     <?php webmultiply_the_post_meta();?>
   </div>

   <div>
       <?php the_excerpt();?>
   </div>
   <?php webmultiply_read_more();?>
<?php endwhile; ?>

<?php the_posts_pagination();?>
<!-- <div class="nav-previous alignleft"><?php previous_posts_link( 'Older posts' ); ?></div>
<div class="nav-next alignright"><?php next_posts_link( 'Newer posts' ); ?></div> -->


<?php else : ?>
	<p>
    
  <?php echo apply_filters('_webmultiply_no_post_found', esc_html__('Sorry, no posts matched your criteria.', 'webmultiply') );?>
</p>



<?php endif; ?>
<?php get_footer();?>
