<?php

/**
 * Plugin Name:     Image Gallery Block
 * Plugin URI:      https://essential-blocks.com
 * Description:     Impress your audience with beautiful image gallery with lightbox.
 * Version:         1.2.0
 * Author:          WPDeveloper
 * Author URI:      https://wpdeveloper.net
 * License:         GPL-3.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-3.0.html
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

require_once __DIR__ . '/includes/font-loader.php';
require_once __DIR__ . '/includes/post-meta.php';
require_once __DIR__ . '/includes/helpers.php';
require_once __DIR__ . '/lib/style-handler/style-handler.php';

function create_block_image_gallery_block_init()
{
	define('IMAGEGALLERY_BLOCK_VERSION', "1.2.0");
	define('IMAGEGALLERY_BLOCK_ADMIN_URL', plugin_dir_url(__FILE__));
	define('IMAGEGALLERY_BLOCK_ADMIN_PATH', dirname(__FILE__));

	$script_asset_path = IMAGEGALLERY_BLOCK_ADMIN_PATH . "/dist/index.asset.php";
	if (!file_exists($script_asset_path)) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "block/testimonial" block first.'
		);
	}
	$index_js     = IMAGEGALLERY_BLOCK_ADMIN_URL . 'dist/index.js';
	$script_asset = require($script_asset_path);
	$all_dependencies = array_merge($script_asset['dependencies'], array(
		'wp-blocks',
		'wp-i18n',
		'wp-element',
		'wp-block-editor',
		'imagegallery-block-controls-util',
	));

	wp_register_script(
		'create-block-imagegallery-block-editor-script',
		$index_js,
		$all_dependencies,
		$script_asset['version'],
		true
	);

	$lightbox_css = IMAGEGALLERY_BLOCK_ADMIN_URL . 'lib/css/fslightbox.min.css';
	wp_register_style(
		'fslightbox-style',
		$lightbox_css,
		array(),
		IMAGEGALLERY_BLOCK_VERSION
	);

	$lightbox_js = IMAGEGALLERY_BLOCK_ADMIN_URL . 'lib/js/fslightbox.min.js';
	wp_register_script(
		'fslightbox-js',
		$lightbox_js,
		array("jquery"),
		IMAGEGALLERY_BLOCK_VERSION,
		true
	);

	$style_css = IMAGEGALLERY_BLOCK_ADMIN_URL . 'dist/style.css';
	//Frontend Style
	wp_register_style(
		'create-block-imagegallery-block-frontend-style',
		$style_css,
		array(),
		IMAGEGALLERY_BLOCK_VERSION
	);

	if (!WP_Block_Type_Registry::get_instance()->is_registered('essential-blocks/advanced-heading')) {
		register_block_type(
			Image_Gallery_Helper::get_block_register_path("advanced-heading/advanced-heading", IMAGEGALLERY_BLOCK_ADMIN_PATH),
			array(
				'editor_script'	=> 'create-block-imagegallery-block-editor-script',
				'editor_style' 	=> 'create-block-imagegallery-block-frontend-style',
				'render_callback' => function ($attributes, $content) {
					if (!is_admin()) {
						wp_enqueue_style('create-block-imagegallery-block-frontend-style');
						wp_enqueue_style('fslightbox-style');
						wp_enqueue_script('fslightbox-js');
					}
					return $content;
				}
			)
		);
	}
}
add_action('init', 'create_block_image_gallery_block_init');