// Your code goes here:
let changeMainImage = function(event) {

  jQuery("#main-image").attr("src",event.target.currentSrc)

}

jQuery("#thumbnails").on("click", changeMainImage)
