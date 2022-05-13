<?php 
// overwride custom parrent theme functions 

// function webmultiply_the_post_meta(){
//     echo "I am Changed from Child Theme";
// }



//all filters function 
function webmultiply_no_post_filter_hook($text){

  return esc_html__( "No Post Found",'webmultiply');

}

add_filter('_webmultiply_no_post_found', 'webmultiply_no_post_filter_hook');

// title filter 

function blog_post_title($title){
   return $title."Webmultiply";
}

add_filter('the_title','blog_post_title');



//enquee styles 
function webmultiply_child_css(){
    wp_enqueue_style('webmultiply_child_theme_css', get_stylesheet_directory_uri().'/assets/css/bundle.css', array('webmultiply-css'),'1.00','all' );
}

add_action('wp_enqueue_scripts','webmultiply_child_css');