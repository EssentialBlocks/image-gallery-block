<?php
/**
 * Plugin Name:     Image Gallery
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     image-gallery-block
 *
 * @package         image-gallery-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_image_gallery_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/image-gallery" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-image-gallery-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-image-gallery-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

  $frontend_js = "src/frontend.js";
  wp_enqueue_script(
      'essential-blocks-image-gallery-frontend',
      plugins_url($frontend_js, __FILE__),
      array( "jquery","wp-editor" ),
      true
  );

  $masonry_js = 'src/js/masonry.min.js';
  wp_enqueue_script(
      'essential-blocks-masonry',
      plugins_url($masonry_js, __FILE__),
      array("wp-editor"),
      true
  );

  $lightbox_css = 'src/css/fslightbox.min.css';
    wp_enqueue_style(
      'fslightbox-style',
      plugins_url($lightbox_css, __FILE__),
      array()
    );

  $lightbox_js = 'src/js/fslightbox.min.js';
  wp_enqueue_script(
      'fslightbox-js',
      plugins_url($lightbox_js, __FILE__),
      array("wp-editor"),
      true, 
      true 
  );

	register_block_type( 'block/image-gallery', array(
		'editor_script' => 'create-block-image-gallery-block-editor',
		'editor_style'  => 'create-block-image-gallery-block-editor',
		'style'         => 'create-block-image-gallery-block',
	) );
}
add_action( 'init', 'create_block_image_gallery_block_init' );
