(function () {
  "use strict";

  let activeCategory = "all";

  const CATEGORY_COLORS = {
    federal: "#0057FF",
    financial: "#059669",
    healthcare: "#DC2626",
    international: "#7C3AED",
    infrastructure: "#D97706",
  };

  function buildFrameworkCard(fw) {
    const color = fw.color || CATEGORY_COLORS[fw.category] || "#64748B";
    const sectors = (fw.sectors || []).map(s => `<span class="fw-sector">${s}</span>`).join("");
    return `
      <a class="fw-card" href="compliance.html?f=${fw.id}" data-category="${fw.category}" style="--fw-color:${color}">
        <div class="fw-card-accent"></div>
        <div class="fw-card-body">
          <div class="fw-icon">${fw.icon}</div>
          <div class="fw-name-block">
            <span class="fw-name">${fw.name}</span>
            <span class="fw-full-name">${fw.fullName}</span>
          </div>
          <p class="fw-desc">${fw.shortDesc}</p>
          <div class="fw-meta">
            <span class="fw-controls"><strong>${fw.mappedControls}</strong> controls mapped</span>
            <div class="fw-sectors">${sectors}</div>
          </div>
          <div class="fw-cta">
            View Mapping
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
        </div>
      </a>`;
  }

  function renderGrid(category) {
    const grid = document.getElementById("frameworksGrid");
    if (!grid) return;
    const filtered = category === "all"
      ? FRAMEWORK_INDEX
      : FRAMEWORK_INDEX.filter(f => f.category === category);
    grid.innerHTML = filtered.map(buildFrameworkCard).join("");
  }

  function wireFilters() {
    document.querySelectorAll(".cat-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        activeCategory = this.dataset.cat;
        renderGrid(activeCategory);
      });
    });
  }

  function wireSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderGrid("all");
    wireFilters();
    wireSmoothScroll();
  });
})();
