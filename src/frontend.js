jQuery(document).ready(function($) {
  $(".wp-block-essential-blocks-block-image-gallery").each(function() {
    $(".eb-gallery-grid").masonry({
      itemSelector: ".eb-gallery-grid-item"
    });
  });
});
