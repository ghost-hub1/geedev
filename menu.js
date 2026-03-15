/*
  GEE.DEV - Universal Mobile Menu
  Add this to each page: <script src="menu.js"></script>
  Place it right before </body>
  That's it - everything else is automatic.
*/
(function(){
  // Create the mob div if it doesn't exist
  if(!document.getElementById('mob')){
    var mob = document.createElement('div');
    mob.id = 'mob';
    document.body.appendChild(mob);
  }

  var menuOpen = false;
  var menuEl = document.getElementById('mob');
  var burger = document.getElementById('burger');

  if(!burger || !menuEl) return;

  // Detect current page
  var path = window.location.pathname;
  var currentPage = 'index';
  if(path.indexOf('services') !== -1) currentPage = 'services';
  else if(path.indexOf('work') !== -1) currentPage = 'work';
  else if(path.indexOf('about') !== -1) currentPage = 'about';
  else if(path.indexOf('contact') !== -1) currentPage = 'contact';

  // Get theme from existing system
  function getTheme(){
    return localStorage.getItem('geedev-theme') || 'light';
  }

  // Hook into existing applyTheme if available
  var origApplyTheme = window.applyTheme || null;
  
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
    for(var i = 0; i < pages.length; i++){
      var p = pages[i];
      var isActive = p[2];
      var color = isActive ? ac : tx;
      var border = isActive ? ac : bd;
      var bgColor = isActive ? (dk ? 'rgba(239,83,80,.06)' : 'rgba(198,40,40,.04)') : cd;
      h += '<a href="' + p[1] + '" style="display:block;font-size:22px;font-weight:800;padding:18px 40px;color:' + color + ';border-radius:16px;width:280px;text-align:center;background:' + bgColor + ';border:2px solid ' + border + ';text-decoration:none;font-family:Outfit,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.05)">' + p[0] + '</a>';
    }

    // Contact / Hire Me button
    var contactActive = currentPage === 'contact';
    h += '<a href="contact.html" style="display:block;margin-top:12px;padding:18px 40px;background:' + ac + ';color:#fff;border-radius:100px;font-weight:800;font-size:18px;width:280px;text-align:center;text-decoration:none;font-family:Outfit,sans-serif;border:none;box-shadow:0 6px 24px rgba(0,0,0,.1)">Hire Me</a>';

    // Theme toggle button (text only, no emoji)
    h += '<div id="mobTheme" style="margin-top:16px;width:auto;padding:12px 28px;border-radius:100px;border:2px solid ' + bd + ';background:' + cd + ';cursor:pointer;font-size:14px;font-weight:700;color:' + tx + ';display:flex;align-items:center;justify-content:center;font-family:Outfit,sans-serif">' + (dk ? 'Switch to Light' : 'Switch to Dark') + '</div>';

    menuEl.innerHTML = h;

    // Attach theme toggle click
    var themeBtn = document.getElementById('mobTheme');
    if(themeBtn){
      themeBtn.addEventListener('click', function(){
        var newTheme = getTheme() === 'dark' ? 'light' : 'dark';
        // Use the page's own applyTheme if it exists
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

  // Burger click handler
  burger.addEventListener('click', function(){
    menuOpen = !menuOpen;
    burger.classList.toggle('active', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    buildMenu();
  });

  // Also rebuild menu when theme changes (in case page's own toggle is used)
  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      if(m.attributeName === 'data-theme'){
        buildMenu();
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  // Initial build (hidden)
  buildMenu();

  // Fix: hamburger animation + nav always visible + grain z-index
  var style = document.createElement('style');
  style.textContent = '.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}.hamburger.active span:nth-child(2){opacity:0;transform:scaleX(0)}.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}.nav{background:var(--nav-bg)!important;backdrop-filter:blur(24px)!important;-webkit-backdrop-filter:blur(24px)!important;border-bottom:1px solid var(--border)!important}body::after{z-index:0!important}';
  document.head.appendChild(style);

})();
