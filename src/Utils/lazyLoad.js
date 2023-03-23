(function (ready) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      ready();
    } else {
      document.addEventListener("DOMContentLoaded", ready);
    }
  })(function lazyLoader() { /* the document is now ready. */
  
    var lazyEls = [].slice.call(document.querySelectorAll("[data-src]"));
  
    function load(el) {
      var src = el.getAttribute("data-src");
      var srcset = el.getAttribute("data-srcset");
      // [NOTE] Todd We shouldn't hit this if data-src was null, but monitoring
      //    says it happens sometimes, so ¯\_(ツ)_/¯
      if (src) { el.setAttribute("src", src); }
      if (srcset) { el.setAttribute("srcset", srcset); }
      el.removeAttribute("data-src");
      el.removeAttribute("data-srcset");
    }
  
    if ("IntersectionObserver" in window) {
      var lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            load(el);
            lazyObserver.unobserve(el);
          }
        });
      });
  
      lazyEls.forEach(function(el) {
        if (el.tagName === "SCRIPT") {
          load(el);
        }
        else {
          lazyObserver.observe(el);
        }
      });
    }
    else {
      lazyEls.forEach(load);
    }
  
  });