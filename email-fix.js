/*
  GEE.DEV - Email Updater
  Add to each page: <script src="email-fix.js"></script>
  To change email again later, just edit the NEW variable below.
*/
(function(){
  var OLD = 'studio.geedev@gmail.com';
  var NEW = 'geedev.studio@proton.me';

  // Fix all mailto: links
  document.querySelectorAll('a[href*="' + OLD + '"]').forEach(function(a){
    a.href = a.href.replace(OLD, NEW);
  });

  // Fix all visible text
  document.querySelectorAll('a, span, p, div').forEach(function(el){
    if(el.childNodes.length === 1 && el.childNodes[0].nodeType === 3){
      if(el.textContent.indexOf(OLD) !== -1){
        el.textContent = el.textContent.replace(OLD, NEW);
      }
    }
  });
})();
