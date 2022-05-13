<?php 
// post meta 

if(!function_exists('webmultiply_the_post_meta')){
  function webmultiply_the_post_meta(){
        printf(
          esc_html__('Posted on %s', 'webmultiply'),
          '<a href="'.esc_url(get_permalink()).'"><time datetime=" '.esc_attr(get_the_date('c')).'">' .esc_html(get_the_date()). '</time></a>'
        );  
        
        printf(  
          esc_html__(' By %s', 'webmultiply'),
          '<a href=" '.esc_url(get_author_posts_url(get_the_author_meta('ID'))).'"> . '.esc_attr(get_the_author()).'</a>'
        );       
}
}
// Read more function
function webmultiply_read_more(){

    echo  '<a href=" '.esc_url(get_the_permalink()).'" title="'.the_title_attribute(['echo' =>false]).'">';

    printf(
      wp_kses(

        __('Read More <span class="screen-reader-text">About %s','webmultiply'),
        [
                'span'=>['class'=>[] ]
        ]

      ),

      the_title()

    );
    
    echo '</a>';
}


