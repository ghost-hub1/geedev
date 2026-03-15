/*
  GEE.DEV - Logo Injector
  Add to each page: <script src="logo.js"></script>
  Place it right before </body> (after menu.js)
  
  Required files in same folder:
  - favicon-32-transparent.png
  - nav-logo-transparent.png
  - nav-logo-2x-transparent.png
  - apple-touch-icon-transparent.png
  - og-image.jpg
*/
(function(){

  // 1. FAVICON
  var fav = document.createElement('link');
  fav.rel = 'icon';
  fav.type = 'image/png';
  fav.sizes = '32x32';
  fav.href = 'favicon-32-transparent.png';
  document.head.appendChild(fav);

  // 2. APPLE TOUCH ICON
  var apple = document.createElement('link');
  apple.rel = 'apple-touch-icon';
  apple.href = 'apple-touch-icon-transparent.png';
  document.head.appendChild(apple);

  // 3. OG IMAGE (for social sharing)
  var og = document.createElement('meta');
  og.setAttribute('property', 'og:image');
  og.content = 'og-image.jpg';
  document.head.appendChild(og);

  // 4. REPLACE NAV LOGO ICON
  var logoIcon = document.querySelector('.nav-logo-icon');
  if(logoIcon){
    var img = document.createElement('img');
    img.src = 'nav-logo-transparent.png';
    img.srcset = 'nav-logo-transparent.png 1x, nav-logo-2x-transparent.png 2x';
    img.alt = 'GEE.DEV';
    img.width = 40;
    img.height = 40;
    img.style.cssText = 'width:40px;height:40px;border-radius:10px;display:block;object-fit:cover;';
    logoIcon.replaceWith(img);
  }

})();
