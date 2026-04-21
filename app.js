// KeeperPAM CMMC Compliance Mapping — App Logic

(function () {
  "use strict";

  let activeLevel = "all";
  let activeCoverage = "all";

  // ── Coverage badge HTML ──────────────────────────────────────
  function coverageBadge(coverage) {
    const map = {
      full: '<span class="badge badge-full">Full Coverage</span>',
      partial: '<span class="badge badge-partial">Partial Coverage</span>',
      complementary: '<span class="badge badge-comp">Complementary</span>',
    };
    return map[coverage] || "";
  }

  // ── Level badge HTML ─────────────────────────────────────────
  function levelBadge(level) {
    return `<span class="badge badge-level badge-level-${level}">Level ${level}</span>`;
  }

  // ── Module chip HTML ─────────────────────────────────────────
  function moduleChips(modules) {
    return modules
      .map((m) => `<span class="module-chip">${KEEPER_MODULES[m] || m}</span>`)
      .join("");
  }

  // ── Build the matrix table ───────────────────────────────────
  function buildMatrix() {
    const tbody = document.getElementById("matrixBody");
    if (!tbody) return;

    const rows = CMMC_DATA.filter((row) => {
      const levelMatch =
        activeLevel === "all" || row.level === parseInt(activeLevel);
      const coverageMatch =
        activeCoverage === "all" || row.coverage === activeCoverage;
      return levelMatch && coverageMatch;
    });

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="empty-state">No practices match the selected filters.</td></tr>`;
      return;
    }

    tbody.innerHTML = rows
      .map(
        (row) => `
      <tr data-level="${row.level}" data-coverage="${row.coverage}">
        <td>
          <span class="domain-tag" style="--domain-color: ${getDomainColor(row.domainCode)}">
            ${row.domainCode}
          </span>
          <span class="domain-name">${row.domain}</span>
        </td>
        <td><code class="practice-id">${row.practiceId}</code></td>
        <td class="practice-desc">${row.description}</td>
        <td>${levelBadge(row.level)}</td>
        <td>${moduleChips(row.modules)}</td>
        <td>${coverageBadge(row.coverage)}</td>
      </tr>`
      )
      .join("");
  }

  // ── Build accordion controls ─────────────────────────────────
  function buildAccordion() {
    const container = document.getElementById("accordionContainer");
    if (!container) return;

    container.innerHTML = DOMAINS.map((domain) => {
      const practices = CMMC_DATA.filter((d) => d.domainCode === domain.code);
      if (practices.length === 0) return "";

      const fullCount = practices.filter((p) => p.coverage === "full").length;
      const partialCount = practices.filter(
        (p) => p.coverage === "partial"
      ).length;

      const practiceRows = practices
        .map(
          (p) => `
        <div class="practice-row">
          <div class="practice-row-header">
            <div class="practice-row-left">
              <code class="practice-id">${p.practiceId}</code>
              ${levelBadge(p.level)}
              ${coverageBadge(p.coverage)}
            </div>
            <button class="practice-expand-btn" onclick="togglePractice(this)">
              <span>Details</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
          </div>
          <p class="practice-description">${p.description}</p>
          <div class="practice-details" style="display:none">
            <div class="practice-modules">
              <strong>KeeperPAM Modules:</strong>
              ${moduleChips(p.modules)}
            </div>
            <div class="practice-guidance">
              <strong>Implementation Guidance:</strong>
              <p>${p.guidance}</p>
            </div>
          </div>
        </div>`
        )
        .join("");

      return `
      <div class="accordion-item">
        <button class="accordion-header" onclick="toggleAccordion(this)">
          <div class="accordion-title">
            <span class="accordion-icon" style="background:${domain.color}20; color:${domain.color}">${domain.icon}</span>
            <div>
              <span class="accordion-domain-code">${domain.code}</span>
              <span class="accordion-domain-name">${domain.name}</span>
            </div>
          </div>
          <div class="accordion-meta">
            <span class="meta-pill">${practices.length} practices</span>
            <span class="meta-pill meta-full">${fullCount} full</span>
            ${partialCount ? `<span class="meta-pill meta-partial">${partialCount} partial</span>` : ""}
            <svg class="accordion-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </button>
        <div class="accordion-body" style="display:none">
          <p class="domain-description">${domain.description}</p>
          <div class="practices-list">
            ${practiceRows}
          </div>
        </div>
      </div>`;
    }).join("");
  }

  // ── Helper: get domain color ─────────────────────────────────
  function getDomainColor(code) {
    const domain = DOMAINS.find((d) => d.code === code);
    return domain ? domain.color : "#64748B";
  }

  // ── Filter button wiring ─────────────────────────────────────
  function wireFilters() {
    document.querySelectorAll("[data-filter-level]").forEach((btn) => {
      btn.addEventListener("click", function () {
        document
          .querySelectorAll("[data-filter-level]")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        activeLevel = this.dataset.filterLevel;
        buildMatrix();
      });
    });

    document.querySelectorAll("[data-filter-coverage]").forEach((btn) => {
      btn.addEventListener("click", function () {
        document
          .querySelectorAll("[data-filter-coverage]")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        activeCoverage = this.dataset.filterCoverage;
        buildMatrix();
      });
    });
  }

  // ── Smooth scroll nav ────────────────────────────────────────
  function wireNav() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // ── Init ────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    buildMatrix();
    buildAccordion();
    wireFilters();
    wireNav();
  });
})();

// ── Global accordion toggles (called from inline onclick) ──────
function toggleAccordion(btn) {
  const body = btn.nextElementSibling;
  const chevron = btn.querySelector(".accordion-chevron");
  const isOpen = body.style.display !== "none";
  body.style.display = isOpen ? "none" : "block";
  chevron.style.transform = isOpen ? "" : "rotate(180deg)";
}

function togglePractice(btn) {
  const row = btn.closest(".practice-row");
  const details = row.querySelector(".practice-details");
  const chevron = btn.querySelector("svg");
  const isOpen = details.style.display !== "none";
  details.style.display = isOpen ? "none" : "block";
  chevron.style.transform = isOpen ? "" : "rotate(180deg)";
  btn.querySelector("span").textContent = isOpen ? "Details" : "Hide";
}
