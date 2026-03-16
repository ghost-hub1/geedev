/*
  GEE.DEV - Logo Injector v2
  Add to each page: <script src="logo.js"></script>
  
  Required files in same folder:
  - favicon-32.png
  - nav-logo.png
  - nav-logo-2x.png
  - apple-touch-icon.png
  - og-image.jpg
*/
(function(){

  // 1. FAVICON
  // Remove any existing favicon first
  var oldFavs = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
  for(var i = 0; i < oldFavs.length; i++) oldFavs[i].parentNode.removeChild(oldFavs[i]);
  var fav = document.createElement('link');
  fav.rel = 'icon';
  fav.type = 'image/png';
  fav.sizes = '32x32';
  fav.href = 'favicon-32.png';
  document.head.appendChild(fav);

  // 2. APPLE TOUCH ICON
  var apple = document.createElement('link');
  apple.rel = 'apple-touch-icon';
  apple.href = 'apple-touch-icon.png';
  document.head.appendChild(apple);

  // 3. OG IMAGE
  if(!document.querySelector('meta[property="og:image"]')){
    var og = document.createElement('meta');
    og.setAttribute('property', 'og:image');
    og.content = 'og-image.jpg';
    document.head.appendChild(og);
  }

  // 4. REPLACE NAV LOGO ICON WITH ACTUAL IMAGE
  var logoIcon = document.querySelector('.nav-logo-icon');
  if(logoIcon){
    var img = document.createElement('img');
    img.src = 'nav-logo.png';
    img.srcset = 'nav-logo.png 1x, nav-logo-2x.png 2x';
    img.alt = 'GEE.DEV';
    img.width = 40;
    img.height = 40;
    img.style.cssText = 'width:40px;height:40px;border-radius:50%;display:block;object-fit:cover;';
    logoIcon.replaceWith(img);
  }

})();
