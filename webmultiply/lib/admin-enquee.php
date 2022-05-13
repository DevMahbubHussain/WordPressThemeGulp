<?php

function webmultiply_admin_enquee_assets(){

    wp_enqueue_style('webmultiply', get_template_directory_uri().'/dist/assets/css/admin.css', array(), '1.00','all' );
    wp_enqueue_script('webmultiply-admin-js', get_template_directory_uri().'/dist/assets/js/admin.js', array(), '1.00','all' );


}
add_action('admin_enqueue_scripts','webmultiply_admin_enquee_assets');