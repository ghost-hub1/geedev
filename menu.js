/*
  GEE.DEV - Universal Mobile Menu v3
  Fixes: blank page on close, old overlay conflicts
  Add to each page: <script src="menu.js"></script>
*/
(function(){

  // === STEP 1: KILL OLD MOBILE MENUS ===
  // Index and Contact pages have old overlay divs that conflict
  var oldOverlays = document.querySelectorAll('.mobile-overlay, .mobile-nav, #mobileOverlay, #mobileMenu, #mobileNav');
  for(var i = 0; i < oldOverlays.length; i++){
    oldOverlays[i].parentNode.removeChild(oldOverlays[i]);
  }

  // === STEP 2: CREATE FRESH MOB DIV ===
  var existingMob = document.getElementById('mob');
  if(existingMob) existingMob.parentNode.removeChild(existingMob);
  var menuEl = document.createElement('div');
  menuEl.id = 'mob';
  document.body.appendChild(menuEl);

  // === STEP 3: CLONE BURGER TO STRIP OLD EVENT LISTENERS ===
  var oldBurger = document.getElementById('burger');
  if(!oldBurger) return;
  var burger = oldBurger.cloneNode(true);
  oldBurger.parentNode.replaceChild(burger, oldBurger);

  // === DETECT CURRENT PAGE ===
  var path = window.location.pathname;
  var currentPage = 'index';
  if(path.indexOf('services') !== -1) currentPage = 'services';
  else if(path.indexOf('work') !== -1) currentPage = 'work';
  else if(path.indexOf('about') !== -1) currentPage = 'about';
  else if(path.indexOf('contact') !== -1) currentPage = 'contact';

  var menuOpen = false;

  function getTheme(){
    return localStorage.getItem('geedev-theme') || 'light';
  }

  function closeMenu(){
    menuOpen = false;
    burger.classList.remove('active');
    document.body.style.overflow = '';
    buildMenu();
  }

  function buildMenu(){
    var dk = getTheme() === 'dark';
    var bg = dk ? '#0e0d10' : '#faf8f5';
    var cd = dk ? '#1e1d26' : '#ffffff';
    var tx = dk ? '#e8e4e0' : '#1a1714';
    var bd = dk ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';
    var ac = dk ? '#ef5350' : '#c62828';

    menuEl.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;display:' + (menuOpen ? 'flex' : 'none') + ';flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;background:' + bg;

    var pages = [
      ['Home', 'index.html', currentPage === 'index'],
      ['Services', 'services.html', currentPage === 'services'],
      ['Work', 'work.html', currentPage === 'work'],
      ['About', 'about.html', currentPage === 'about']
    ];

    var h = '';

    // Close button
    h += '<div id="mobClose" style="position:absolute;top:24px;right:24px;width:48px;height:48px;border-radius:50%;border:2px solid ' + bd + ';background:' + cd + ';cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:22px;color:' + tx + ';font-weight:300;font-family:Outfit,sans-serif">&times;</div>';

    // Page links
    for(var i = 0; i < pages.length; i++){
      var p = pages[i];
      var isActive = p[2];
      var color = isActive ? ac : tx;
      var border = isActive ? ac : bd;
      var bgColor = isActive ? (dk ? 'rgba(239,83,80,.06)' : 'rgba(198,40,40,.04)') : cd;
      h += '<a href="' + p[1] + '" style="display:block;font-size:22px;font-weight:800;padding:18px 40px;color:' + color + ';border-radius:16px;width:280px;text-align:center;background:' + bgColor + ';border:2px solid ' + border + ';text-decoration:none;font-family:Outfit,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.05)">' + p[0] + '</a>';
    }

    // Hire Me
    h += '<a href="contact.html" style="display:block;margin-top:12px;padding:18px 40px;background:' + ac + ';color:#fff;border-radius:100px;font-weight:800;font-size:18px;width:280px;text-align:center;text-decoration:none;font-family:Outfit,sans-serif;border:none;box-shadow:0 6px 24px rgba(0,0,0,.1)">Hire Me</a>';

    // Theme toggle
    h += '<div id="mobTheme" style="margin-top:16px;width:auto;padding:12px 28px;border-radius:100px;border:2px solid ' + bd + ';background:' + cd + ';cursor:pointer;font-size:14px;font-weight:700;color:' + tx + ';display:flex;align-items:center;justify-content:center;font-family:Outfit,sans-serif">' + (dk ? 'Switch to Light' : 'Switch to Dark') + '</div>';

    menuEl.innerHTML = h;

    // Attach close button
    var closeBtn = document.getElementById('mobClose');
    if(closeBtn){
      closeBtn.addEventListener('click', closeMenu);
    }

    // Attach theme toggle
    var themeBtn = document.getElementById('mobTheme');
    if(themeBtn){
      themeBtn.addEventListener('click', function(){
        var newTheme = getTheme() === 'dark' ? 'light' : 'dark';
        if(typeof window.applyTheme === 'function'){
          window.applyTheme(newTheme);
        } else {
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('geedev-theme', newTheme);
        }
        buildMenu();
      });
    }
  }

  // === BURGER CLICK (only handler now, old ones are gone) ===
  burger.addEventListener('click', function(e){
    e.stopPropagation();
    menuOpen = !menuOpen;
    burger.classList.toggle('active', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    buildMenu();
  });

  // Rebuild when theme changes externally
  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      if(m.attributeName === 'data-theme') buildMenu();
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  // Initial build (hidden)
  buildMenu();

  // === INJECT CSS FIXES ===
  var style = document.createElement('style');
  style.textContent = [
    // Hamburger X animation
    '.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}',
    '.hamburger.active span:nth-child(2){opacity:0;transform:scaleX(0)}',
    '.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}',
    // Nav always visible
    '.nav{background:var(--nav-bg)!important;backdrop-filter:blur(24px)!important;-webkit-backdrop-filter:blur(24px)!important;border-bottom:1px solid var(--border)!important}',
    // Grain behind everything
    'body::after{z-index:0!important}',
    // Fix available badge to be GREEN not red
    '.hero-badge-dot,.badge-dot{background:#2e7d32!important}',
    '.hero-badge-dot::after,.badge-dot::after{border-color:#2e7d32!important}'
  ].join('');
  document.head.appendChild(style);

})();
