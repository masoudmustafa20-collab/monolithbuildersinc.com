const lightbox = document.getElementById('projectLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCount = document.getElementById('lightboxCount');
const closeButton = document.getElementById('lightboxClose');
const prevButton = document.getElementById('lightboxPrev');
const nextButton = document.getElementById('lightboxNext');
let gallery = [];
let current = 0;

function showPhoto(index) {
  if (!gallery.length) return;
  current = (index + gallery.length) % gallery.length;
  lightboxImage.src = gallery[current];
  lightboxCount.textContent = gallery.length > 1 ? `${current + 1} / ${gallery.length}` : '1 / 1';
  const multiple = gallery.length > 1;
  prevButton.style.display = multiple ? 'block' : 'none';
  nextButton.style.display = multiple ? 'block' : 'none';
  lightbox.scrollTop = 0;
}
function openGallery(trigger) {
  gallery = trigger.dataset.gallery.split(',').map(s => s.trim()).filter(Boolean);
  current = Math.max(0, gallery.indexOf(trigger.getAttribute('src')));
  showPhoto(current);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  closeButton.focus();
}
function closeGallery() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function nextPhoto() { showPhoto(current + 1); }
function prevPhoto() { showPhoto(current - 1); }

document.querySelectorAll('.gallery-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => openGallery(trigger));
  trigger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGallery(trigger); }
  });
});
closeButton.addEventListener('click', closeGallery);
nextButton.addEventListener('click', nextPhoto);
prevButton.addEventListener('click', prevPhoto);
lightboxImage.addEventListener('click', nextPhoto);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeGallery(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'ArrowLeft') prevPhoto();
});

// v6: prepare a quote request without requiring a server/backend.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quote-form");
  if (!form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(form);
    const subject = "Website Quote Request - " + (data.get("project") || "Project");
    const body = [
      "Name: " + (data.get("name") || ""),
      "Phone: " + (data.get("phone") || ""),
      "Email: " + (data.get("email") || ""),
      "Project Type: " + (data.get("project") || ""),
      "",
      "Project Details:",
      (data.get("message") || "")
    ].join("\n");
    window.location.href = "mailto:info@monolithbuildersinc.com?subject=" +
      encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });
});

// v9: small usability safeguards.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="http"]').forEach(function (link) {
    if (link.hostname && link.hostname !== window.location.hostname) {
      link.rel = "noopener noreferrer";
    }
  });
  document.querySelectorAll(".project-card").forEach(function(card){
    if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex","0");
    card.addEventListener("keydown", function(e){
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
});

// v13: open service-specific gallery, Back to previous view, and preselect planner service.
document.addEventListener("DOMContentLoaded", function(){
  const gallery = document.getElementById("small-projects-gallery");
  let previousScroll = 0;

  document.querySelectorAll('[data-open-service="small-projects"]').forEach(function(btn){
    btn.addEventListener("click", function(){
      previousScroll = window.scrollY;
      gallery.classList.add("is-open");
      gallery.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      gallery.scrollTop = 0;
    });
  });

  if (gallery) {
    gallery.querySelector(".gallery-back").addEventListener("click", function(){
      gallery.classList.remove("is-open");
      gallery.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
      window.scrollTo(0, previousScroll);
    });
  }

  document.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      const service = link.getAttribute("data-service-name") || "";
      const field = document.getElementById("planner-service");
      if (field) field.value = service;
      if (gallery && gallery.classList.contains("is-open")) {
        gallery.classList.remove("is-open");
        gallery.setAttribute("aria-hidden","true");
        document.body.style.overflow = "";
      }
    });
  });
});

// v14: step-by-step Project Planner.
document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("planner-form");
  if (!form) return;
  const steps = Array.from(form.querySelectorAll(".planner-step"));
  const fill = form.querySelector(".planner-progress-fill");
  let current = 0;

  function showStep(i){
    current = Math.max(0, Math.min(i, steps.length - 1));
    steps.forEach((s, n) => s.classList.toggle("is-active", n === current));
    if (fill) fill.style.width = (((current + 1) / steps.length) * 100) + "%";
    document.getElementById("project-planner").scrollIntoView({behavior:"smooth", block:"start"});
  }

  form.querySelectorAll(".planner-next").forEach(btn => btn.addEventListener("click", () => showStep(current + 1)));
  form.querySelectorAll(".planner-back").forEach(btn => btn.addEventListener("click", () => showStep(current - 1)));

  form.addEventListener("submit", function(e){
    e.preventDefault();
    const d = new FormData(form);
    const service = d.get("service") || "Website Project";
    const subject = "New Project Request - " + service;
    const body = [
      "MONOLITH BUILDERS INC. - PROJECT REQUEST",
      "",
      "Requested service: " + service,
      "Project type: " + (d.get("project_type") || ""),
      "Project area: " + (d.get("project_area") || ""),
      "Preferred timing: " + (d.get("timeline") || ""),
      "",
      "Project details:",
      d.get("details") || "",
      "",
      "Name: " + (d.get("name") || ""),
      "Phone: " + (d.get("phone") || ""),
      "Email: " + (d.get("email") || "")
    ].join("\n");
    window.location.href = "mailto:info@monolithbuildersinc.com?subject=" +
      encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });
});

// v15: ADU gallery uses the same More / Back pattern.
document.addEventListener("DOMContentLoaded", function(){
  const gallery = document.getElementById("adu-gallery");
  if (!gallery) return;
  let previousScroll = 0;
  document.querySelectorAll('[data-open-service="adu"]').forEach(function(btn){
    btn.addEventListener("click", function(){
      previousScroll = window.scrollY;
      gallery.classList.add("is-open");
      gallery.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      gallery.scrollTop = 0;
    });
  });
  const back = gallery.querySelector(".gallery-back");
  if (back) back.addEventListener("click", function(){
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    window.scrollTo(0, previousScroll);
  });
  gallery.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      const field = document.getElementById("planner-service");
      if (field) field.value = link.getAttribute("data-service-name") || "";
      gallery.classList.remove("is-open");
      gallery.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    });
  });
});

// v16: Home Additions gallery follows the same one-image -> More -> Back pattern.
document.addEventListener("DOMContentLoaded", function(){
  const gallery = document.getElementById("home-additions-gallery");
  if (!gallery) return;
  let previousScroll = 0;

  document.querySelectorAll('[data-open-service="home-additions"]').forEach(function(btn){
    btn.addEventListener("click", function(){
      previousScroll = window.scrollY;
      gallery.classList.add("is-open");
      gallery.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      gallery.scrollTop = 0;
    });
  });

  const back = gallery.querySelector(".gallery-back");
  if (back) back.addEventListener("click", function(){
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    window.scrollTo(0, previousScroll);
  });

  gallery.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      const field = document.getElementById("planner-service");
      if (field) field.value = link.getAttribute("data-service-name") || "";
      gallery.classList.remove("is-open");
      gallery.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    });
  });
});

// v17: Whole-Home Construction uses the same More / Back / Project Planner flow.
document.addEventListener("DOMContentLoaded", function(){
  const gallery = document.getElementById("whole-home-gallery");
  if (!gallery) return;
  let previousScroll = 0;

  document.querySelectorAll('[data-open-service="whole-home"]').forEach(function(btn){
    btn.addEventListener("click", function(){
      previousScroll = window.scrollY;
      gallery.classList.add("is-open");
      gallery.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      gallery.scrollTop = 0;
    });
  });

  const back = gallery.querySelector(".gallery-back");
  if (back) back.addEventListener("click", function(){
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    window.scrollTo(0, previousScroll);
  });

  gallery.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      const field = document.getElementById("planner-service");
      if (field) field.value = link.getAttribute("data-service-name") || "";
      gallery.classList.remove("is-open");
      gallery.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    });
  });
});

// v18: Kitchen Remodeling gallery.
document.addEventListener("DOMContentLoaded", function(){
  const gallery = document.getElementById("kitchen-remodeling-gallery");
  if (!gallery) return;
  let previousScroll = 0;

  document.querySelectorAll('[data-open-service="kitchen-remodeling"]').forEach(function(btn){
    btn.addEventListener("click", function(){
      previousScroll = window.scrollY;
      gallery.classList.add("is-open");
      gallery.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      gallery.scrollTop = 0;
    });
  });

  const back = gallery.querySelector(".gallery-back");
  if (back) back.addEventListener("click", function(){
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    window.scrollTo(0, previousScroll);
  });

  gallery.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      const field = document.getElementById("planner-service");
      if (field) field.value = "Kitchen Remodeling";
      gallery.classList.remove("is-open");
      gallery.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    });
  });
});

// v19: Bathroom Remodeling gallery.
document.addEventListener("DOMContentLoaded", function(){
  const gallery = document.getElementById("bathroom-remodeling-gallery");
  if (!gallery) return;
  let previousScroll = 0;
  document.querySelectorAll('[data-open-service="bathroom-remodeling"]').forEach(function(btn){
    btn.addEventListener("click", function(){
      previousScroll = window.scrollY;
      gallery.classList.add("is-open");
      gallery.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      gallery.scrollTop = 0;
    });
  });
  const back = gallery.querySelector(".gallery-back");
  if (back) back.addEventListener("click", function(){
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    window.scrollTo(0, previousScroll);
  });
  gallery.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      const field = document.getElementById("planner-service");
      if (field) field.value = "Bathroom Remodeling";
      gallery.classList.remove("is-open");
      gallery.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    });
  });
});

// v20: Living Room Remodeling gallery.
document.addEventListener("DOMContentLoaded", function(){
  const gallery = document.getElementById("living-room-remodeling-gallery");
  if (!gallery) return;
  let previousScroll = 0;

  document.querySelectorAll('[data-open-service="living-room-remodeling"]').forEach(function(btn){
    btn.addEventListener("click", function(){
      previousScroll = window.scrollY;
      gallery.classList.add("is-open");
      gallery.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      gallery.scrollTop = 0;
    });
  });

  const back = gallery.querySelector(".gallery-back");
  if (back) back.addEventListener("click", function(){
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    window.scrollTo(0, previousScroll);
  });

  gallery.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      const field = document.getElementById("planner-service");
      if (field) field.value = "Living Room Remodeling";
      gallery.classList.remove("is-open");
      gallery.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    });
  });
});

// v21: Bedroom Remodeling gallery.
document.addEventListener("DOMContentLoaded", function(){
  const gallery = document.getElementById("bedroom-remodeling-gallery");
  if (!gallery) return;
  let previousScroll = 0;

  document.querySelectorAll('[data-open-service="bedroom-remodeling"]').forEach(function(btn){
    btn.addEventListener("click", function(){
      previousScroll = window.scrollY;
      gallery.classList.add("is-open");
      gallery.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      gallery.scrollTop = 0;
    });
  });

  const back = gallery.querySelector(".gallery-back");
  if (back) back.addEventListener("click", function(){
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    window.scrollTo(0, previousScroll);
  });

  gallery.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      const field = document.getElementById("planner-service");
      if (field) field.value = "Bedroom Remodeling";
      gallery.classList.remove("is-open");
      gallery.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    });
  });
});

// v22: Outdoor Living gallery.
document.addEventListener("DOMContentLoaded", function(){
  const gallery = document.getElementById("outdoor-living-gallery");
  if (!gallery) return;
  let previousScroll = 0;

  document.querySelectorAll('[data-open-service="outdoor-living"]').forEach(function(btn){
    btn.addEventListener("click", function(){
      previousScroll = window.scrollY;
      gallery.classList.add("is-open");
      gallery.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      gallery.scrollTop = 0;
    });
  });

  const back = gallery.querySelector(".gallery-back");
  if (back) back.addEventListener("click", function(){
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    window.scrollTo(0, previousScroll);
  });

  gallery.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      const field = document.getElementById("planner-service");
      if (field) field.value = "Outdoor Living";
      gallery.classList.remove("is-open");
      gallery.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    });
  });
});

// v23: Heating & Cooling gallery.
document.addEventListener("DOMContentLoaded", function(){
  const gallery = document.getElementById("heating-cooling-gallery");
  if (!gallery) return;
  let previousScroll = 0;

  document.querySelectorAll('[data-open-service="heating-cooling"]').forEach(function(btn){
    btn.addEventListener("click", function(){
      previousScroll = window.scrollY;
      gallery.classList.add("is-open");
      gallery.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      gallery.scrollTop = 0;
    });
  });

  const back = gallery.querySelector(".gallery-back");
  if (back) back.addEventListener("click", function(){
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    window.scrollTo(0, previousScroll);
  });

  gallery.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      const field = document.getElementById("planner-service");
      if (field) field.value = "Heating & Cooling";
      gallery.classList.remove("is-open");
      gallery.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    });
  });
});

// v24: all service galleries are now touch/click viewers.
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll(".service-gallery-view").forEach(function(view){
    const holder = view.querySelector(".service-gallery-images");
    if (!holder) return;
    const imgs = Array.from(holder.querySelectorAll("img"));
    if (!imgs.length) return;

    let current = 0;
    const nav = document.createElement("div");
    nav.className = "gallery-nav";
    nav.innerHTML =
      '<button type="button" class="gallery-prev">← PREVIOUS</button>' +
      '<span class="gallery-counter"></span>' +
      '<button type="button" class="gallery-next">NEXT →</button>';
    holder.insertAdjacentElement("afterend", nav);

    const hint = document.createElement("p");
    hint.className = "gallery-touch-hint";
    hint.textContent = "Touch or click the image to see the next project.";
    nav.insertAdjacentElement("afterend", hint);

    const counter = nav.querySelector(".gallery-counter");
    function show(i){
      current = (i + imgs.length) % imgs.length;
      imgs.forEach((img, n) => img.classList.toggle("is-gallery-active", n === current));
      counter.textContent = (current + 1) + " / " + imgs.length;
      requestAnimationFrame(() => { view.scrollTop = 0; });
    }

    imgs.forEach(img => img.addEventListener("click", () => show(current + 1)));
    nav.querySelector(".gallery-next").addEventListener("click", () => show(current + 1));
    nav.querySelector(".gallery-prev").addEventListener("click", () => show(current - 1));

    view.addEventListener("keydown", function(e){
      if (!view.classList.contains("is-open")) return;
      if (e.key === "ArrowRight") show(current + 1);
      if (e.key === "ArrowLeft") show(current - 1);
    });

    view.setAttribute("tabindex", "-1");
    const observer = new MutationObserver(function(){
      if (view.classList.contains("is-open")) {
        show(0);
        view.scrollTop = 0;
      
      }
    });
    observer.observe(view, {attributes:true, attributeFilter:["class"]});
    show(0);
  });
});

// v25: keyboard accessibility for representative images that open service galleries.
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll('img[data-open-service]').forEach(function(img){
    img.addEventListener("keydown", function(e){
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        img.click();
      }
    });
  });
});

// v26: Escape closes the open gallery; mobile swipe changes images.
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll(".service-gallery-view").forEach(function(view){
    const back = view.querySelector(".gallery-back");
    const close = view.querySelector(".gallery-close");

    function closeView(){
      if (back) back.click();
    }
    if (close) close.addEventListener("click", closeView);

    view.addEventListener("keydown", function(e){
      if (e.key === "Escape" && view.classList.contains("is-open")) closeView();
    });

    const holder = view.querySelector(".service-gallery-images");
    if (!holder) return;
    let startX = null;
    holder.addEventListener("touchstart", function(e){
      if (e.touches && e.touches.length === 1) startX = e.touches[0].clientX;
    }, {passive:true});
    holder.addEventListener("touchend", function(e){
      if (startX === null || !e.changedTouches || !e.changedTouches.length) return;
      const dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) < 45) return;
      const btn = view.querySelector(dx < 0 ? ".gallery-next" : ".gallery-prev");
      if (btn) btn.click();
    }, {passive:true});
  });
});

// v27: show exactly which service the customer requested in Project Planner.
document.addEventListener("DOMContentLoaded", function(){
  const serviceField = document.getElementById("planner-service");
  const banner = document.getElementById("planner-selected-service");
  const bannerName = document.getElementById("planner-selected-service-name");

  function showSelectedService(name){
    if (!name) return;
    if (serviceField) serviceField.value = name;
    if (bannerName) bannerName.textContent = name;
    if (banner) banner.hidden = false;
  }

  document.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      showSelectedService(link.getAttribute("data-service-name") || "");
    });
  });

  if (serviceField && serviceField.value) showSelectedService(serviceField.value);
});

// v28: return from Project Planner to the exact service/topic position.
document.addEventListener("DOMContentLoaded", function(){
  let plannerReturnY = 0;
  const planner = document.getElementById("project-planner");
  const plannerBack = document.querySelector(".planner-page-back");

  document.querySelectorAll('[data-service-name]').forEach(function(link){
    link.addEventListener("click", function(){
      plannerReturnY = window.scrollY;
    }, true);
  });

  if (plannerBack) {
    plannerBack.addEventListener("click", function(){
      window.scrollTo({top: plannerReturnY, behavior:"smooth"});
    });
  }
});

// v29: REQUEST THIS SERVICE opens Project Planner as a focused view.
// BACK restores the exact page position the customer came from.
document.addEventListener("DOMContentLoaded", function(){
  const planner = document.getElementById("project-planner");
  const plannerBack = document.querySelector(".planner-page-back");
  let returnY = 0;

  document.querySelectorAll('a[data-service-name][href="#project-planner"]').forEach(function(link){
    link.addEventListener("click", function(e){
      e.preventDefault();
      returnY = window.scrollY;

      document.querySelectorAll(".service-gallery-view.is-open").forEach(function(g){
        g.classList.remove("is-open");
        g.setAttribute("aria-hidden","true");
      });
      document.body.style.overflow = "";
      document.body.classList.add("planner-mode");
      window.scrollTo(0,0);
    });
  });

  if (plannerBack) {
    plannerBack.addEventListener("click", function(e){
      e.preventDefault();
      document.body.classList.remove("planner-mode");
      setTimeout(function(){ window.scrollTo(0, returnY); }, 0);
    });
  }
});

// v31: validate each Project Planner step before advancing.
document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("planner-form");
  if (!form) return;

  function clearError(step){
    step.classList.remove("has-error");
    const old = step.querySelector(".planner-error");
    if (old) old.remove();
  }

  function showError(step, message){
    clearError(step);
    step.classList.add("has-error");
    const p = document.createElement("p");
    p.className = "planner-error";
    p.textContent = message;
    const controls = step.querySelector(".planner-controls") || step.querySelector(".planner-next");
    if (controls && controls.parentNode) controls.parentNode.insertBefore(p, controls);
    else step.appendChild(p);
  }

  form.querySelectorAll(".planner-next").forEach(function(btn){
    btn.addEventListener("click", function(e){
      const step = btn.closest(".planner-step");
      if (!step) return;

      const n = step.getAttribute("data-step");
      clearError(step);

      if (n === "1" && !step.querySelector('input[name="project_type"]:checked')) {
        e.stopImmediatePropagation();
        showError(step, "Please choose the type of work before continuing.");
        return;
      }

      if (n === "2") {
        const area = step.querySelector('input[name="project_area"]');
        if (!area || !area.value.trim()) {
          e.stopImmediatePropagation();
          showError(step, "Please tell us where the project is located in the home or property.");
          if (area) area.focus();
          return;
        }
      }

      if (n === "3") {
        const details = step.querySelector('textarea[name="details"]');
        if (!details || details.value.trim().length < 10) {
          e.stopImmediatePropagation();
          showError(step, "Please give us a short description of the work.");
          if (details) details.focus();
          return;
        }
      }
    }, true);
  });

  form.addEventListener("submit", function(e){
    const finalStep = form.querySelector('.planner-step[data-step="4"]');
    if (!finalStep) return;
    const name = finalStep.querySelector('input[name="name"]');
    const phone = finalStep.querySelector('input[name="phone"]');
    const email = finalStep.querySelector('input[name="email"]');

    clearError(finalStep);

    if (!name || !name.value.trim()) {
      e.preventDefault(); e.stopImmediatePropagation();
      showError(finalStep, "Please enter your name.");
      if (name) name.focus();
      return;
    }
    if ((!phone || !phone.value.trim()) && (!email || !email.value.trim())) {
      e.preventDefault(); e.stopImmediatePropagation();
      showError(finalStep, "Please enter a phone number or email so we can contact you.");
      if (phone) phone.focus();
    }
  }, true);
});

// v32: every new service request starts the Project Planner cleanly at Step 1.
document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("planner-form");
  if (!form) return;

  document.querySelectorAll('a[data-service-name][href="#project-planner"]').forEach(function(link){
    link.addEventListener("click", function(){
      const selectedService = link.getAttribute("data-service-name") || "";
      form.reset();

      const serviceField = document.getElementById("planner-service");
      if (serviceField) serviceField.value = selectedService;

      const banner = document.getElementById("planner-selected-service");
      const bannerName = document.getElementById("planner-selected-service-name");
      if (bannerName) bannerName.textContent = selectedService;
      if (banner) banner.hidden = !selectedService;

      const steps = Array.from(form.querySelectorAll(".planner-step"));
      steps.forEach(function(step, i){
        step.classList.toggle("is-active", i === 0);
        step.classList.remove("has-error");
        const error = step.querySelector(".planner-error");
        if (error) error.remove();
      });

      const fill = form.querySelector(".planner-progress-fill");
      if (fill) fill.style.width = "20%";
    }, true);
  });
});

// v33: accessibility/state polish for MORE controls.
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll("[data-open-service]").forEach(function(control){
    control.setAttribute("aria-expanded","false");
  });

  const observer = new MutationObserver(function(){
    document.querySelectorAll(".service-gallery-view").forEach(function(view){
      const isOpen = view.classList.contains("is-open");
      let key = view.id.replace(/-gallery$/, "");
      if (key === "adu") key = "adu";
      document.querySelectorAll('[data-open-service="' + key + '"]').forEach(function(control){
        control.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });
  });

  document.querySelectorAll(".service-gallery-view").forEach(function(view){
    observer.observe(view, {attributes:true, attributeFilter:["class"]});
  });
});

// v34: require a preferred project timing before contact details.
document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("planner-form");
  if (!form) return;
  const timingNext = form.querySelector('.planner-step[data-step="4"] .planner-next');
  if (timingNext) {
    timingNext.addEventListener("click", function(e){
      const step = timingNext.closest(".planner-step");
      if (!step.querySelector('input[name="timeline"]:checked')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let err = step.querySelector(".planner-error");
        if (!err) {
          err = document.createElement("p");
          err.className = "planner-error";
          err.textContent = "Please choose a preferred project timing.";
          step.querySelector(".planner-controls").before(err);
        }
      }
    }, true);
  }
});

// v36: footer/contact CTA opens the focused Project Planner cleanly.
document.addEventListener("DOMContentLoaded", function(){
  const link = document.querySelector('.contact-primary[href="#project-planner"]');
  const form = document.getElementById("planner-form");
  if (!link || !form) return;

  link.addEventListener("click", function(e){
    e.preventDefault();
    form.reset();
    form.querySelectorAll(".planner-step").forEach(function(step, i){
      step.classList.toggle("is-active", i === 0);
      step.classList.remove("has-error");
      const err = step.querySelector(".planner-error");
      if (err) err.remove();
    });
    document.body.classList.add("planner-mode");
    window.scrollTo(0,0);
  });
});

// v37: keyboard support for clickable service/project images.
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll("[data-open-service]").forEach(function(el){
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex","0");
    if (!el.hasAttribute("role") && !/^(A|BUTTON)$/i.test(el.tagName)) el.setAttribute("role","button");
    el.addEventListener("keydown", function(e){
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  });
});

// v40: reliable same-page navigation for header/section links.
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    const href = link.getAttribute("href");
    if (!href || href === "#" || href === "#project-planner") return;

    link.addEventListener("click", function(e){
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
      try { history.replaceState(null, "", href); } catch (_) {}
    });
  });
});

// v41: prevent accidental duplicate Project Planner submissions.
document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("planner-form");
  if (!form) return;
  form.addEventListener("submit", function(){
    const btn = form.querySelector('button[type="submit"]');
    if (!btn || btn.dataset.sending === "1") return;
    btn.dataset.sending = "1";
    const oldText = btn.textContent;
    btn.textContent = "PREPARING REQUEST…";
    setTimeout(function(){
      btn.dataset.sending = "0";
      btn.textContent = oldText;
    }, 1800);
  });
});

// v43: robust CONTACT navigation and focus handling.
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll('a[href="#contact"]').forEach(function(link){
    link.addEventListener("click", function(e){
      const target = document.getElementById("contact");
      if (!target) return;
      e.preventDefault();

      document.body.classList.remove("planner-mode");
      document.querySelectorAll(".service-gallery-view.is-open").forEach(function(g){
        g.classList.remove("is-open");
        g.setAttribute("aria-hidden","true");
      });
      document.body.style.overflow = "";

      target.scrollIntoView({behavior:"smooth", block:"start"});
      try { history.replaceState(null, "", "#contact"); } catch (_) {}
    }, true);
  });

  // Move keyboard focus into an opened gallery for easier navigation.
  document.querySelectorAll("[data-open-service]").forEach(function(control){
    control.addEventListener("click", function(){
      setTimeout(function(){
        const openGallery = document.querySelector(".service-gallery-view.is-open");
        if (!openGallery) return;
        const back = openGallery.querySelector(".gallery-back, .gallery-close, button");
        if (back) back.focus({preventScroll:true});
      }, 0);
    });
  });
});

// v44: stronger contact validation before preparing the project request.
document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("planner-form");
  if (!form) return;

  form.addEventListener("submit", function(e){
    const step = form.querySelector('.planner-step[data-step="5"]');
    if (!step) return;

    const email = step.querySelector('input[name="email"]');
    const phone = step.querySelector('input[name="phone"]');

    function fail(message, field){
      e.preventDefault();
      e.stopImmediatePropagation();
      let err = step.querySelector(".planner-error");
      if (!err) {
        err = document.createElement("p");
        err.className = "planner-error";
        const controls = step.querySelector(".planner-controls");
        if (controls) controls.before(err);
        else step.appendChild(err);
      }
      err.textContent = message;
      if (field) field.focus();
    }

    if (email && email.value.trim()) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      if (!ok) return fail("Please enter a valid email address.", email);
    }

    if (phone && phone.value.trim()) {
      const digits = phone.value.replace(/\D/g, "");
      if (digits.length < 10) return fail("Please enter a valid phone number.", phone);
    }
  }, true);
});

// v45: graceful fallback if a project image ever fails to load.
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll("img").forEach(function(img){
    img.addEventListener("error", function(){
      img.classList.add("image-load-error");
      img.setAttribute("aria-hidden","true");
    });
  });
});


// v46 — BACK always returns to the immediately previous website step.
document.querySelectorAll('.inline-back').forEach(function(btn){
  btn.addEventListener('click', function(){
    if (window.history.length > 1) window.history.back();
    else document.getElementById('construction-projects')?.scrollIntoView({behavior:'smooth'});
  });
});

// Make every remodeling topic image open its exact service gallery.
const remodelingImageMap = {
  'kitchen':'kitchen-remodeling',
  'bathroom':'bathroom-remodeling',
  'living':'living-room-remodeling',
  'bedroom':'bedroom-remodeling',
  'outdoor':'outdoor-living',
  'hvac':'heating-cooling'
};
document.querySelectorAll('#remodeling-projects .project-card').forEach(function(card){
  const key = card.dataset.gallery;
  const service = remodelingImageMap[key];
  const img = card.querySelector('img');
  if (!service || !img) return;
  img.dataset.openService = service;
  img.setAttribute('role','button');
  img.setAttribute('tabindex','0');
  img.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      img.click();
    }
  });
});


// v50 — preserve the exact service selected when entering Project Planner.
document.querySelectorAll('.request-service[data-service-name]').forEach(function(link){
  link.addEventListener('click', function(){
    const service = link.dataset.serviceName || '';
    if (service) {
      sessionStorage.setItem('monolithSelectedService', service);
      const selected = document.querySelector('#project-planner [data-selected-service], #project-planner .selected-service-name');
      if (selected) selected.textContent = service;
    }
  });
});


// v52 — deterministic BACK: return to the immediately previous website step.
document.querySelectorAll('.service-gallery-view[data-back-target] .gallery-back').forEach(function(btn){
  btn.addEventListener('click', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    const gallery = btn.closest('.service-gallery-view');
    const target = gallery && gallery.dataset.backTarget;
    if (gallery) {
      gallery.classList.remove('open','active','is-open');
      gallery.setAttribute('aria-hidden','true');
    }
    if (target) {
      const parent = document.querySelector(target);
      if (parent) parent.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null, '', target);
    }
  }, true);
});


// v53 — Project Planner remembers the exact step that launched it.
document.querySelectorAll('.request-service[data-service-name]').forEach(function(link){
  link.addEventListener('click', function(){
    const gallery = link.closest('.service-gallery-view');
    const construction = link.closest('.construction-screen');
    const remodeling = link.closest('#remodeling-projects');
    let backTarget = '#home';

    if (gallery && gallery.id) backTarget = '#' + gallery.id;
    else if (construction && construction.id) backTarget = '#' + construction.id;
    else if (remodeling) backTarget = '#remodeling-projects';

    sessionStorage.setItem('monolithPlannerBackTarget', backTarget);
  }, true);
});

document.querySelectorAll('#project-planner .planner-back, .planner-approved-flow .planner-back').forEach(function(btn){
  btn.addEventListener('click', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();

    const target = sessionStorage.getItem('monolithPlannerBackTarget') || '#home';
    const planner = document.getElementById('project-planner');
    if (planner) planner.classList.remove('active','open','is-open');

    const destination = document.querySelector(target);
    if (destination) {
      if (destination.classList.contains('service-gallery-view')) {
        destination.classList.add('open','active','is-open');
        destination.setAttribute('aria-hidden','false');
      }
      destination.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null, '', target);
    }
  }, true);
});


// v54 — the full Remodeling topic card is touchable.
document.querySelectorAll('#remodeling-projects .project-card[data-gallery]').forEach(function(card){
  card.setAttribute('tabindex','0');
  card.setAttribute('role','button');
  const title = card.querySelector('h3');
  if (title) card.setAttribute('aria-label', 'Open ' + title.textContent.trim());

  function openCardGallery(){
    const more = card.querySelector('.subservice-more, .topic-more');
    const img = card.querySelector('img[data-open-service]');
    if (more) more.click();
    else if (img) img.click();
  }

  card.addEventListener('click', function(e){
    if (e.target.closest('a,button')) return;
    openCardGallery();
  });

  card.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCardGallery();
    }
  });
});


// v55 — construction topic cards are full touch targets and detail images are keyboard accessible.
document.querySelectorAll('.construction-topic-card').forEach(function(card){
  card.setAttribute('role','link');
  card.setAttribute('tabindex','0');
  card.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

document.querySelectorAll('.construction-screen img').forEach(function(img){
  const screen = img.closest('.construction-screen');
  if (!screen) return;
  const more = screen.querySelector('.topic-more, .subservice-more, [data-open-gallery]');
  if (!more) return;

  img.setAttribute('role','button');
  img.setAttribute('tabindex','0');
  img.style.cursor = 'pointer';

  img.addEventListener('click', function(e){
    if (e.target.closest('a,button')) return;
    more.click();
  });
  img.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      more.click();
    }
  });
});


// v56 — Whole-Home subtopics use the same touch behavior as all other topics.
document.querySelectorAll('#whole-home-construction .whole-home-topic, #whole-home-construction [data-gallery]').forEach(function(topic){
  const more = topic.querySelector('.topic-more, .subservice-more, [data-open-gallery]');
  if (!more) return;

  topic.setAttribute('role','button');
  topic.setAttribute('tabindex','0');
  topic.style.cursor = 'pointer';

  topic.addEventListener('click', function(e){
    if (e.target.closest('a,button')) return;
    more.click();
  });

  topic.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      more.click();
    }
  });
});


// v57 — prevent accidental duplicate gallery activation on fast mobile taps.
document.querySelectorAll('.subservice-more, .topic-more, [data-open-gallery]').forEach(function(control){
  let locked = false;
  control.addEventListener('click', function(){
    if (locked) return;
    locked = true;
    window.setTimeout(function(){ locked = false; }, 350);
  }, true);
});


// v58 — only the selected service/gallery is visible at a time.
function monolithCloseOtherGalleries(activeGallery){
  document.querySelectorAll('.service-gallery-view').forEach(function(gallery){
    if (gallery !== activeGallery) {
      gallery.classList.remove('open','active','is-open');
      gallery.setAttribute('aria-hidden','true');
    }
  });
}

document.querySelectorAll('.service-gallery-view').forEach(function(gallery){
  const observer = new MutationObserver(function(){
    const isOpen = gallery.classList.contains('open') ||
                   gallery.classList.contains('active') ||
                   gallery.classList.contains('is-open');
    if (isOpen) {
      monolithCloseOtherGalleries(gallery);
      gallery.setAttribute('aria-hidden','false');
    }
  });
  observer.observe(gallery, {attributes:true, attributeFilter:['class']});
});


// v59 — browser Back/Forward follows the same website step structure.
window.addEventListener('popstate', function(){
  const target = window.location.hash || '#home';

  document.querySelectorAll('.service-gallery-view').forEach(function(gallery){
    gallery.classList.remove('open','active','is-open');
    gallery.setAttribute('aria-hidden','true');
  });

  const destination = document.querySelector(target);
  if (!destination) return;

  if (destination.classList.contains('service-gallery-view')) {
    destination.classList.add('open','active','is-open');
    destination.setAttribute('aria-hidden','false');
  }

  destination.scrollIntoView({behavior:'smooth', block:'start'});
});

// Keep URL aligned with the selected gallery.
document.querySelectorAll('.service-gallery-view').forEach(function(gallery){
  const observer = new MutationObserver(function(){
    const isOpen = gallery.classList.contains('open') ||
                   gallery.classList.contains('active') ||
                   gallery.classList.contains('is-open');
    if (isOpen && gallery.id && window.location.hash !== '#' + gallery.id) {
      history.pushState({monolithStep: gallery.id}, '', '#' + gallery.id);
    }
  });
  observer.observe(gallery, {attributes:true, attributeFilter:['class']});
});


// v60 — after step navigation, place keyboard focus on the destination without changing appearance.
document.addEventListener('click', function(e){
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const hash = link.getAttribute('href');
  if (!hash || hash === '#') return;
  window.setTimeout(function(){
    const target = document.querySelector(hash);
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex','-1');
    target.focus({preventScroll:true});
  }, 450);
});


// v61 — restore selected service confirmation whenever Project Planner is revisited.
(function(){
  function restoreSelectedService(){
    const service = sessionStorage.getItem('monolithSelectedService');
    if (!service) return;
    document.querySelectorAll('#project-planner [data-selected-service], #project-planner .selected-service-name')
      .forEach(function(el){ el.textContent = service; });
  }
  restoreSelectedService();
  window.addEventListener('hashchange', function(){
    if (window.location.hash === '#project-planner') restoreSelectedService();
  });
})();


// v62 — final planner submission guard and clear customer confirmation.
(function(){
  const planner = document.getElementById('project-planner');
  if (!planner) return;

  const form = planner.querySelector('form');
  if (!form) return;

  let sending = false;

  form.addEventListener('submit', function(e){
    if (sending) {
      e.preventDefault();
      return;
    }

    // Respect all existing validation before allowing the final action.
    if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }

    const service = sessionStorage.getItem('monolithSelectedService') || '';
    const serviceFields = form.querySelectorAll('input[name="service"], input[name="selected_service"]');
    serviceFields.forEach(function(field){
      if (service) field.value = service;
    });

    sending = true;
    const submit = form.querySelector('[type="submit"]');
    if (submit) {
      submit.dataset.originalText = submit.textContent;
      submit.textContent = 'PREPARING REQUEST…';
      submit.setAttribute('aria-disabled','true');
    }

    window.setTimeout(function(){
      sending = false;
      if (submit) {
        submit.textContent = submit.dataset.originalText || 'SEND PROJECT REQUEST →';
        submit.removeAttribute('aria-disabled');
      }
    }, 1800);
  }, true);
})();


// v63 — when a gallery opens, move focus to BACK so navigation is immediately clear.
document.querySelectorAll('.service-gallery-view').forEach(function(gallery){
  const observer = new MutationObserver(function(){
    const isOpen = gallery.classList.contains('open') ||
                   gallery.classList.contains('active') ||
                   gallery.classList.contains('is-open');
    if (!isOpen) return;
    const back = gallery.querySelector('.gallery-back');
    if (back) window.setTimeout(function(){ back.focus({preventScroll:true}); }, 80);
  });
  observer.observe(gallery, {attributes:true, attributeFilter:['class']});
});


// v64 — top-level Explore reset: always start the selected branch cleanly.
(function(){
  function closeAllServiceGalleries(){
    document.querySelectorAll('.service-gallery-view').forEach(function(gallery){
      gallery.classList.remove('open','active','is-open');
      gallery.setAttribute('aria-hidden','true');
    });
  }

  document.querySelectorAll('a[href="#remodeling-projects"], a[href="#construction-projects"]').forEach(function(link){
    link.addEventListener('click', function(){
      closeAllServiceGalleries();
      sessionStorage.removeItem('monolithPlannerBackTarget');
    }, true);
  });
})();


// v65 — graceful image fallback without changing the approved layout.
document.querySelectorAll('img').forEach(function(img){
  img.addEventListener('error', function(){
    img.classList.add('image-load-failed');
    img.setAttribute('aria-hidden','true');
  }, {once:true});
});


// v68 — Escape closes the active gallery and returns to its immediate parent step.
document.addEventListener('keydown', function(e){
  if (e.key !== 'Escape') return;
  const gallery = Array.from(document.querySelectorAll('.service-gallery-view')).find(function(g){
    return g.getAttribute('aria-hidden') === 'false' ||
           g.classList.contains('open') ||
           g.classList.contains('active') ||
           g.classList.contains('is-open');
  });
  if (!gallery) return;

  const back = gallery.querySelector('.gallery-back');
  if (back) {
    e.preventDefault();
    back.click();
  }
});


// v69 — safe same-page navigation behavior for users who prefer reduced motion.
(function(){
  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(){
      if (!reduceMotion) return;
      document.documentElement.style.scrollBehavior = 'auto';
      window.setTimeout(function(){
        document.documentElement.style.scrollBehavior = '';
      }, 150);
    }, true);
  });
})();


// v78 — preserve the exact service/gallery launch point for planner BACK.
(function(){
  document.querySelectorAll('.request-service').forEach(function(link){
    link.addEventListener('click', function(){
      const currentHash = window.location.hash || '#home';
      if (currentHash !== '#project-planner') {
        sessionStorage.setItem('monolithPlannerBackTarget', currentHash);
      }
    }, true);
  });
})();


// v79 — authoritative selected-service capture for Project Planner.
(function(){
  document.querySelectorAll('.request-service').forEach(function(link){
    link.addEventListener('click', function(){
      const service =
        link.getAttribute('data-service-name') ||
        link.getAttribute('data-service') ||
        link.closest('[data-service-name]')?.getAttribute('data-service-name') ||
        '';

      if (service) {
        sessionStorage.setItem('monolithSelectedService', service);
        const planner = document.getElementById('project-planner');
        if (planner) {
          planner.setAttribute('data-selected-service', service);
          const display = planner.querySelector(
            '[data-selected-service-display], .selected-service-name, #selected-service-name'
          );
          if (display) display.textContent = service;
        }
      }
    }, true);
  });
})();


// v80 — selected service fallback immediately before planner submission.
(function(){
  const planner = document.getElementById('project-planner');
  if (!planner) return;

  const form = planner.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function(){
    const savedService = sessionStorage.getItem('monolithSelectedService') || '';
    if (!savedService) return;

    planner.setAttribute('data-selected-service', savedService);

    const serviceField = form.querySelector(
      'input[name="service"], input[name="selectedService"], input[name="selected_service"]'
    );
    if (serviceField && !serviceField.value.trim()) {
      serviceField.value = savedService;
    }

    const display = planner.querySelector(
      '[data-selected-service-display], .selected-service-name, #selected-service-name'
    );
    if (display && !display.textContent.trim()) {
      display.textContent = savedService;
    }
  }, true);
})();


// v81 — keep selected service available to legacy mailto builders.
(function(){
  const planner = document.getElementById('project-planner');
  if (!planner) return;

  planner.addEventListener('click', function(e){
    const submitter = e.target.closest('button[type="submit"], input[type="submit"], .send-project-request');
    if (!submitter) return;

    const savedService = sessionStorage.getItem('monolithSelectedService') || '';
    if (!savedService) return;

    planner.setAttribute('data-selected-service', savedService);

    const fields = planner.querySelectorAll(
      'input[name="service"], input[name="selectedService"], input[name="selected_service"]'
    );
    fields.forEach(function(field){
      field.value = savedService;
    });
  }, true);
})();

// v90 — consolidated interaction hardening (replaces v82-v89 appended patches).
(function(){
  const planner = document.getElementById('project-planner');
  const plannerStatus = document.getElementById('planner-status');
  const plannerForm = planner ? planner.querySelector('form') : null;
  let submissionInProgress = false;
  let lastGalleryAdvance = 0;

  function closeGalleries(){
    document.querySelectorAll('.service-gallery-view').forEach(function(gallery){
      gallery.classList.remove('active', 'open', 'is-open');
      gallery.setAttribute('aria-hidden', 'true');
    });
  }

  function resetPlannerToStepOne(){
    if (!planner) return;
    planner.setAttribute('data-current-step', '1');
    const steps = planner.querySelectorAll('[data-planner-step], .planner-step, .project-planner-step');
    steps.forEach(function(step, index){
      const n = Number(step.getAttribute('data-planner-step')) || index + 1;
      const active = n === 1;
      step.hidden = !active;
      step.classList.toggle('active', active);
      step.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    planner.classList.remove('submitted', 'submitting');
  }

  function restoreHashState(){
    const hash = window.location.hash;
    if (!hash || hash === '#home') return;
    const target = document.querySelector(hash);
    if (!target) return;

    document.querySelectorAll('.service-gallery-view').forEach(function(gallery){
      const active = ('#' + gallery.id) === hash;
      gallery.classList.toggle('active', active);
      gallery.classList.toggle('open', active);
      gallery.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    window.setTimeout(function(){
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    }, 40);
  }

  document.addEventListener('click', function(e){
    const request = e.target.closest('.request-service');
    if (request) resetPlannerToStepOne();

    const topLink = e.target.closest('a[href^="#"]');
    if (topLink) {
      const target = topLink.getAttribute('href');
      const topTargets = new Set([
        '#home','#services','#gallery','#about','#contact',
        '#remodeling-projects','#construction-projects'
      ]);
      if (topTargets.has(target)) {
        closeGalleries();
        if (planner) planner.classList.remove('active','open','is-open');
      }
    }

    const galleryImg = e.target.closest('.service-gallery-view img');
    if (galleryImg) {
      const now = Date.now();
      if (now - lastGalleryAdvance < 350) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      lastGalleryAdvance = now;
    }
  }, true);

  document.addEventListener('touchend', function(e){
    if (e.target.closest('.service-gallery-view img')) lastGalleryAdvance = Date.now();
  }, {passive:true, capture:true});

  document.addEventListener('keydown', function(e){
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest(
      '.service-card[role="button"], .construction-card[role="button"], .remodeling-card[role="button"]'
    );
    if (!card) return;
    const actionable = card.querySelector('a[href], button, [data-gallery-target]');
    if (!actionable) return;
    e.preventDefault();
    actionable.click();
  });

  if (plannerForm) {
    function clean(value){
      return String(value || '').replace(/[\r\n]+/g,' ').replace(/\s{2,}/g,' ').trim();
    }

    plannerForm.addEventListener('change', function(e){
      const field = e.target;
      if (!field.matches('input, textarea, select')) return;
      if (field.type === 'email' || field.type === 'tel' || field.tagName === 'TEXTAREA') {
        field.value = clean(field.value);
      }
    });

    plannerForm.addEventListener('submit', function(e){
      if (submissionInProgress) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
      if (typeof plannerForm.checkValidity === 'function' && !plannerForm.checkValidity()) {
        if (plannerStatus) plannerStatus.textContent = 'Please complete the required project information.';
        return;
      }

      submissionInProgress = true;
      if (plannerStatus) plannerStatus.textContent = 'Preparing your project request.';

      const submit = plannerForm.querySelector(
        'button[type="submit"], input[type="submit"], .send-project-request'
      );
      if (submit) {
        submit.dataset.originalText = submit.dataset.originalText ||
          (submit.tagName === 'INPUT' ? submit.value : submit.textContent);
        submit.disabled = true;
        if (submit.tagName === 'INPUT') submit.value = 'PREPARING REQUEST…';
        else submit.textContent = 'PREPARING REQUEST…';
      }

      window.setTimeout(function(){
        if (plannerStatus) {
          plannerStatus.textContent = 'Your email application should now be ready with the project request.';
        }
      }, 1200);

      window.setTimeout(function(){
        submissionInProgress = false;
        if (submit) {
          submit.disabled = false;
          if (submit.tagName === 'INPUT') submit.value = submit.dataset.originalText;
          else submit.textContent = submit.dataset.originalText;
        }
      }, 2500);
    }, true);
  }

  window.addEventListener('pageshow', restoreHashState);
  window.addEventListener('popstate', restoreHashState);
})();


// v91 — allow the site's hash/state navigation to restore positions consistently.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
