<?php

function webmultiply_enquee_assets(){

    wp_enqueue_style('webmultiply-css', get_template_directory_uri().'/dist/assets/css/bundle.css', array(), '1.00','all' );
    wp_enqueue_script('webmultiply-js', get_template_directory_uri().'/dist/assets/js/bundle.js', array(), true );


}
add_action('wp_enqueue_scripts','webmultiply_enquee_assets');