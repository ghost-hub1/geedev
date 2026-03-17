/*
  GEE.DEV - Mobile Menu v5
  ONLY handles: hamburger menu, green badge, performance
  Does NOT touch the nav bar at all
*/
(function(){

  // === PERFORMANCE: Remove GPU-heavy animations ===
  var orbs = document.querySelectorAll('.ambient, .ambient-orb, .orb, .orb-1, .orb-2, .orb-3');
  for(var i = 0; i < orbs.length; i++) orbs[i].parentNode.removeChild(orbs[i]);

  // === GREEN BADGE + KILL GRAIN ===
  var fixes = document.createElement('style');
  fixes.textContent = 'body::after{display:none!important}.hero-badge{background:rgba(46,125,50,.06)!important;border:1px solid rgba(46,125,50,.2)!important}.hero-badge-dot,.badge-dot{background:#2e7d32!important}.hero-badge-dot::after,.badge-dot::after{border-color:#2e7d32!important}.hero-badge-text,.badge-text{color:#2e7d32!important}.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}.hamburger.active span:nth-child(2){opacity:0;transform:scaleX(0)}.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}';
  document.head.appendChild(fixes);

  // === KILL OLD MOBILE MENUS (index/contact have old overlay divs) ===
  var old = document.querySelectorAll('.mobile-overlay, .mobile-nav, #mobileOverlay, #mobileMenu, #mobileNav');
  for(var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);

  // === CREATE MENU CONTAINER ===
  var existing = document.getElementById('mob');
  if(existing) existing.parentNode.removeChild(existing);
  var menuEl = document.createElement('div');
  menuEl.id = 'mob';
  document.body.appendChild(menuEl);

  // === CLONE BURGER (strips old event listeners from index/contact) ===
  var oldBurger = document.getElementById('burger');
  if(!oldBurger) return;
  var burger = oldBurger.cloneNode(true);
  oldBurger.parentNode.replaceChild(burger, oldBurger);

  // === DETECT PAGE ===
  var path = window.location.pathname;
  var page = 'index';
  if(path.indexOf('services') > -1) page = 'services';
  else if(path.indexOf('work') > -1) page = 'work';
  else if(path.indexOf('about') > -1) page = 'about';
  else if(path.indexOf('contact') > -1) page = 'contact';

  var open = false;

  function theme(){ return localStorage.getItem('geedev-theme') || 'light'; }

  function close(){
    open = false;
    burger.classList.remove('active');
    document.body.style.overflow = '';
    render();
  }

  function render(){
    var dk = theme() === 'dark';
    var bg = dk ? '#0e0d10' : '#faf8f5';
    var cd = dk ? '#1e1d26' : '#ffffff';
    var tx = dk ? '#e8e4e0' : '#1a1714';
    var bd = dk ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';
    var ac = dk ? '#ef5350' : '#c62828';

    menuEl.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;display:' + (open ? 'flex' : 'none') + ';flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;background:' + bg;

    var nav = [
      ['Home','index.html',page==='index'],
      ['Services','services.html',page==='services'],
      ['Work','work.html',page==='work'],
      ['About','about.html',page==='about']
    ];

    var h = '<div id="mobX" style="position:absolute;top:24px;right:24px;width:48px;height:48px;border-radius:50%;border:2px solid '+bd+';background:'+cd+';cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:24px;color:'+tx+';font-family:Outfit,sans-serif">&times;</div>';

    for(var i=0; i<nav.length; i++){
      var n=nav[i], act=n[2];
      h += '<a href="'+n[1]+'" style="display:block;font-size:22px;font-weight:800;padding:18px 40px;color:'+(act?ac:tx)+';border-radius:16px;width:280px;text-align:center;background:'+(act?(dk?'rgba(239,83,80,.06)':'rgba(198,40,40,.04)'):cd)+';border:2px solid '+(act?ac:bd)+';text-decoration:none;font-family:Outfit,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.05)">'+n[0]+'</a>';
    }

    h += '<a href="contact.html" style="display:block;margin-top:12px;padding:18px 40px;background:'+ac+';color:#fff;border-radius:100px;font-weight:800;font-size:18px;width:280px;text-align:center;text-decoration:none;font-family:Outfit,sans-serif;border:none;box-shadow:0 6px 24px rgba(0,0,0,.1)">Hire Me</a>';

    h += '<div id="mobT" style="margin-top:16px;padding:12px 28px;border-radius:100px;border:2px solid '+bd+';background:'+cd+';cursor:pointer;font-size:14px;font-weight:700;color:'+tx+';display:flex;align-items:center;justify-content:center;font-family:Outfit,sans-serif">'+(dk?'Switch to Light':'Switch to Dark')+'</div>';

    menuEl.innerHTML = h;

    document.getElementById('mobX').addEventListener('click', close);
    document.getElementById('mobT').addEventListener('click', function(){
      var t = theme()==='dark' ? 'light' : 'dark';
      if(typeof window.applyTheme === 'function') window.applyTheme(t);
      else { document.documentElement.setAttribute('data-theme',t); localStorage.setItem('geedev-theme',t); }
      render();
    });
  }

  burger.addEventListener('click', function(e){
    e.stopPropagation();
    open = !open;
    burger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
    render();
  });

  new MutationObserver(function(m){ m.forEach(function(x){ if(x.attributeName==='data-theme') render(); }); }).observe(document.documentElement, {attributes:true});

  render();
})();
