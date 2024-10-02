var currentIndex = 0;
var newIndex = 0;

var slidesContWrapperElement = document.getElementsByClassName('sliderWrapper')[0];
var slideElements = document.getElementsByClassName('sliderSlide');
var slidesLength = slideElements.length;
var paginationElement = document.getElementsByClassName('slider-pagination')[0];
var navElements = document.getElementsByClassName("sliderNav");
var paginationHTML = [];


for (var i = 0; i < slidesLength; i++) {
   paginationHTML.push('<button class="slider_pagination_btn" data-index="' + i + '"></button>');
}
paginationElement.innerHTML = paginationHTML.join("");

paginationElement.addEventListener('click', function(e) {
   var target = e.target;
   if (target.classList.contains("slider_pagination_btn")) {
      newIndex = Number(target.getAttribute("data-index"));
      navigateSlider();
   }
  Autoplay.reset();
});

function navigateSlider() {
   if (newIndex === -1) {
      newIndex = slidesLength - 1;
   }
   else if (newIndex === slidesLength) {
      newIndex = 0;
   }

   slideElements[newIndex].style.display = "block";
   slideElements[currentIndex].style.display = "none";
  
  paginationElement.childNodes[currentIndex].classList.remove('slider_pagination_btn--sel');
   paginationElement.childNodes[newIndex].classList.add('slider_pagination_btn--sel');
  
   for (var i = 0; i < slidesLength; i++) {
   slideElements[i].style.left = (100 * i) + 'vw';
  }
  
   
  
   slidesContWrapperElement.style.transform = 'translateX(' + (-100 * newIndex) + 'vw)';

   currentIndex = newIndex;
   Autoplay.reset();

};

navElements[0].addEventListener('click', function() {
   newIndex--;
   navigateSlider();
});

navElements[1].addEventListener('click', function() {
   newIndex++;
   navigateSlider();
});

var Autoplay = {
   timerId: null,
   interval: 500000,

   start: function() {
      this.timerId = setInterval(function() {
         newIndex++;
         navigateSlider();
      }, this.interval);
   },

   reset: function() {
      clearInterval(this.timerId);
      this.start();
   }
}

var enableAutoplay = true;

if (enableAutoplay) {
   Autoplay.start();
}






