<?php

/**
 * Load google fonts.
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class Image_Gallery_Helper
{

    private static $instance;

    /**
     * Registers the plugin.
     */
    public static function register()
    {
        if (null === self::$instance) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    /**
     * The Constructor.
     */
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueues'));
    }

    /**
     * Load fonts.
     *
     * @access public
     */
    public function enqueues()
    {
        global $pagenow;

        /**
         * Only for admin add/edit pages/posts
         */
        $query_string = isset($_SERVER['QUERY_STRING']) ? (string) $_SERVER['QUERY_STRING'] : '';

        if ($pagenow == 'post-new.php' || $pagenow == 'post.php' || $pagenow == 'site-editor.php' || ($pagenow == 'themes.php' && '' !== $query_string && strpos($query_string, 'gutenberg-edit-site') !== false)) {

            $controls_asset_path = IMAGEGALLERY_BLOCK_ADMIN_PATH . '/dist/modules.asset.php';
            if (!file_exists($controls_asset_path)) {
                return;
            }

            // `include` (not `include_once`) — `include_once` returns bool on a repeat
            // include, which would break the array access below.
            $controls_dependencies = include $controls_asset_path;
            if (!is_array($controls_dependencies)) {
                return;
            }
            $controls_dependencies = wp_parse_args(
                $controls_dependencies,
                array('dependencies' => array(), 'version' => IMAGEGALLERY_BLOCK_VERSION)
            );

            wp_register_script(
                "imagegallery-block-controls-util",
                IMAGEGALLERY_BLOCK_ADMIN_URL . '/dist/modules.js',
                array_merge($controls_dependencies['dependencies']),
                $controls_dependencies['version'],
                true
            );

            wp_localize_script('imagegallery-block-controls-util', 'EssentialBlocksLocalize', array(
                'eb_wp_version' => (float) get_bloginfo('version'),
                'rest_rootURL' => get_rest_url(),
            ));

            if ($pagenow == 'post-new.php' || $pagenow == 'post.php') {
                wp_localize_script('imagegallery-block-controls-util', 'eb_conditional_localize', array(
                    'editor_type' => 'edit-post'
                ));
            } else if ($pagenow == 'site-editor.php' || $pagenow == 'themes.php') {
                wp_localize_script('imagegallery-block-controls-util', 'eb_conditional_localize', array(
                    'editor_type' => 'edit-site'
                ));
            }

            wp_enqueue_style(
                'essential-blocks-editor-css',
                IMAGEGALLERY_BLOCK_ADMIN_URL . '/dist/modules.css',
                array(),
                $controls_dependencies['version'],
                'all'
            );
        }
    }
    /**
     * Kept for backward compatibility.
     *
     * Uses version_compare() instead of a float cast — `(float) '6.10'` is 6.1,
     * which compares wrongly against 6.2+.
     */
    public static function get_block_register_path($blockname, $blockPath)
    {
        if (version_compare(get_bloginfo('version'), '5.8', '<')) {
            return $blockname;
        }

        return $blockPath;
    }

    /**
     * Register a block from its block.json directory in a way that works on
     * every supported WordPress version.
     *
     * register_block_type() only accepts a block.json path since WP 5.8;
     * register_block_type_from_metadata() covers WP 5.5 - 5.7.
     *
     * @param string $block_path Absolute path to the directory holding block.json.
     * @param array  $args       Block type registration args.
     * @return WP_Block_Type|false
     */
    public static function register_block($block_path, $args = array())
    {
        if (version_compare(get_bloginfo('version'), '5.8', '>=')) {
            return register_block_type($block_path, $args);
        }

        if (function_exists('register_block_type_from_metadata')) {
            return register_block_type_from_metadata($block_path, $args);
        }

        return false;
    }
}
Image_Gallery_Helper::register();
