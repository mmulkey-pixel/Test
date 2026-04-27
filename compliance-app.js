(function () {
  "use strict";

  let currentFramework = null;
  let currentPractices = [];
  let activeTier = "all";

  // ── Helpers ─────────────────────────────────────────────────
  function tierBadge(tier, fw) {
    const tierObj = fw.tiers && fw.tiers[tier - 1];
    const label = tierObj ? tierObj.label : `Tier ${tier}`;
    const cls = tier === 1 ? "badge-level-1" : tier === 2 ? "badge-level-2" : "badge-level-3";
    return `<span class="badge badge-level ${cls}">${label}</span>`;
  }

  function moduleChips(modules) {
    return modules.map(m => {
      const mod = KEEPER_MODULES[m];
      return `<span class="module-chip">${mod ? mod.icon + " " + mod.name : m}</span>`;
    }).join("");
  }

  function getDomainColor(domainCode, domains) {
    const d = domains.find(x => x.code === domainCode);
    return d ? d.color : "#64748B";
  }

  // ── Hero ─────────────────────────────────────────────────────
  function renderHero(fw) {
    document.title = `${fw.name} Compliance Mapping – KeeperPAM`;
    document.getElementById("headerFrameworkName").textContent = fw.name;
    document.getElementById("heroBadge").textContent = fw.fullName;
    document.getElementById("heroTitle").innerHTML = `${fw.name}<br/><span class="hero-accent">Compliance Mapping</span>`;
    document.getElementById("heroDesc").textContent = fw.shortDesc;
    document.getElementById("heroSection").style.background =
      "linear-gradient(135deg, #111111 0%, #1A1A1A 50%, #111111 100%)";
    const stats = [
      { num: fw.mappedControls, label: "Controls Mapped" },
      { num: fw.tiers ? fw.tiers.length : "—", label: "Tiers / Levels" },
      { num: "6", label: "PAM Modules" },
      { num: (fw.sectors || []).length || "—", label: "Sectors" },
    ];
    document.getElementById("heroStats").innerHTML = stats.map(s =>
      `<div class="stat"><span class="stat-num">${s.num}</span><span class="stat-label">${s.label}</span></div>`
    ).join("");
  }

  // ── Overview cards ───────────────────────────────────────────
  function renderOverview(fw) {
    document.getElementById("overviewTitle").textContent = `About ${fw.name}`;
    document.getElementById("overviewDesc").textContent = fw.shortDesc;
    const cards = [
      { icon: "🏛️", title: "Authority",       text: fw.authority },
      { icon: "🎯", title: "Applicability",    text: fw.applicability },
      { icon: "📋", title: "Assessment Type",  text: fw.assessmentType },
      { icon: "🗂️", title: "Controls Mapped",  text: `${fw.mappedControls} practices mapped to KeeperPAM modules` },
    ];
    document.getElementById("overviewCards").innerHTML = cards.map(c =>
      `<div class="card card-outline"><div class="card-icon">${c.icon}</div><h3>${c.title}</h3><p>${c.text}</p></div>`
    ).join("");
  }

  // ── Tiers ────────────────────────────────────────────────────
  function renderTiers(fw) {
    const tiers = fw.tiers || [];
    document.getElementById("tiersTitle").textContent = "Framework Structure";
    document.getElementById("tiersDesc").textContent = `${fw.name} is organized into the following tiers or requirement groups.`;
    const colors = [fw.color, adjustColor(fw.color, -20), adjustColor(fw.color, -40)];
    document.getElementById("tiersGrid").innerHTML = tiers.map((t, i) => `
      <div class="level-card" style="border-top:4px solid ${colors[i] || fw.color}20; border-top-color:${colors[i] || fw.color}">
        <div class="level-header">
          <span class="level-badge" style="background:${colors[i] || fw.color}22;color:${colors[i] || fw.color}">${t.label}</span>
          <h3>${t.name}</h3>
        </div>
        <div class="level-body"><p>${t.desc}</p></div>
      </div>`
    ).join("");
  }

  function adjustColor(hex, amount) {
    try {
      const num = parseInt(hex.replace("#",""), 16);
      const r = Math.min(255, Math.max(0, (num >> 16) + amount));
      const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
      const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
      return `#${((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}`;
    } catch { return hex; }
  }

  // ── Matrix ───────────────────────────────────────────────────
  function buildTierFilters(fw) {
    const tiers = fw.tiers || [];
    const container = document.getElementById("tierFilters");
    let html = `<button class="filter-btn active" data-filter-tier="all">All</button>`;
    tiers.forEach((t, i) => {
      html += `<button class="filter-btn" data-filter-tier="${i+1}">${t.label}</button>`;
    });
    container.innerHTML = html;
    container.querySelectorAll("[data-filter-tier]").forEach(btn => {
      btn.addEventListener("click", function () {
        container.querySelectorAll("[data-filter-tier]").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        activeTier = this.dataset.filterTier;
        renderMatrix();
      });
    });
  }

  function renderMatrix() {
    if (!currentFramework || !currentPractices.length) return;
    const fw = currentFramework;
    const tbody = document.getElementById("matrixBody");
    const rows = currentPractices.filter(p =>
      activeTier === "all" || p.tier === parseInt(activeTier)
    );
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="6" class="empty-state">No controls match the selected filters.</td></tr>`;
      return;
    }
    tbody.innerHTML = rows.map(p => `
      <tr>
        <td>
          <span class="domain-tag" style="--domain-color:${getDomainColor(p.domainCode, fw.domains || [])}">${p.domainCode}</span>
          <span class="domain-name">${p.domain}</span>
        </td>
        <td><code class="practice-id">${p.id}</code></td>
        <td class="practice-desc">${p.description}</td>
        <td>${tierBadge(p.tier, fw)}</td>
        <td>${moduleChips(p.modules)}</td>
        <td class="guidance-cell">${p.guidance}</td>
      </tr>`
    ).join("");
  }

  // ── Accordion ────────────────────────────────────────────────
  function renderAccordion() {
    if (!currentFramework || !currentPractices.length) return;
    const fw = currentFramework;
    const domains = fw.domains || [];
    const container = document.getElementById("accordionContainer");

    container.innerHTML = domains.map(domain => {
      const practices = currentPractices.filter(p => p.domainCode === domain.code);
      if (!practices.length) return "";

      const practiceRows = practices.map(p => `
        <div class="practice-row">
          <div class="practice-row-header">
            <div class="practice-row-left">
              <code class="practice-id">${p.id}</code>
              ${tierBadge(p.tier, fw)}
            </div>
            <button class="practice-expand-btn" onclick="togglePractice(this)">
              <span>Details</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
          </div>
          <p class="practice-description">${p.description}</p>
          <div class="practice-details" style="display:none">
            <div class="practice-modules"><strong>KeeperPAM Modules:</strong>${moduleChips(p.modules)}</div>
            <div class="practice-guidance"><strong>Implementation Guidance:</strong><p>${p.guidance}</p></div>
          </div>
        </div>`
      ).join("");

      return `
        <div class="accordion-item">
          <button class="accordion-header" onclick="toggleAccordion(this)">
            <div class="accordion-title">
              <span class="accordion-icon" style="background:${domain.color}20;color:${domain.color}">${domain.icon}</span>
              <div>
                <span class="accordion-domain-code">${domain.code}</span>
                <span class="accordion-domain-name">${domain.name}</span>
              </div>
            </div>
            <div class="accordion-meta">
              <span class="meta-pill">${practices.length} controls</span>
              <svg class="accordion-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
          </button>
          <div class="accordion-body" style="display:none">
            <div class="practices-list">${practiceRows}</div>
          </div>
        </div>`;
    }).join("");
  }

  // ── Sources ───────────────────────────────────────────────────
  function renderSourceCard(s) {
    const typeColors = {
      official:   { bg: "rgba(0,87,255,.12)",   text: "#60A5FA", border: "rgba(0,87,255,.25)" },
      standard:   { bg: "rgba(5,150,105,.12)",  text: "#34D399", border: "rgba(5,150,105,.25)" },
      analyst:    { bg: "rgba(124,58,237,.12)", text: "#C4B5FD", border: "rgba(124,58,237,.25)" },
      government: { bg: "rgba(217,119,6,.12)",  text: "#FCD34D", border: "rgba(217,119,6,.25)" },
    };
    const c = typeColors[s.type] || typeColors.standard;
    return `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="source-card">
        <div class="source-type-badge" style="background:${c.bg};color:${c.text};border-color:${c.border}">${s.type || "reference"}</div>
        <div class="source-title">${s.title}</div>
        <div class="source-org">${s.org}</div>
        ${s.desc ? `<p class="source-desc">${s.desc}</p>` : ""}
        <div class="source-arrow">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </div>
      </a>`;
  }

  function renderSources(fw) {
    const container = document.getElementById("sourcesContainer");
    if (!container) return;
    const fwSources  = (window.FRAMEWORK_SOURCES  || {})[fw.id] || [];
    const pamSources = window.PAM_INDUSTRY_SOURCES || [];
    let html = "";
    if (fwSources.length) {
      html += `
        <div class="sources-category">
          <h3 class="sources-cat-title">Official ${fw.name} Documentation</h3>
          <div class="sources-grid">${fwSources.map(renderSourceCard).join("")}</div>
        </div>`;
    }
    if (pamSources.length) {
      html += `
        <div class="sources-category">
          <h3 class="sources-cat-title">PAM Industry Research &amp; Government Guidance</h3>
          <div class="sources-grid">${pamSources.map(renderSourceCard).join("")}</div>
        </div>`;
    }
    container.innerHTML = html;
  }

  // ── Smooth scroll ─────────────────────────────────────────────
  function wireSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
      });
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const fwId = params.get("f") || "cmmc";
    const fwMeta = FRAMEWORK_INDEX.find(f => f.id === fwId);
    const fwData = (window.FRAMEWORK_DATA || {})[fwId];

    if (!fwMeta || !fwData) {
      document.getElementById("heroTitle").textContent = "Framework not found";
      document.getElementById("heroDesc").textContent = `No data found for framework "${fwId}". Return to the hub to select a valid framework.`;
      return;
    }

    currentFramework = Object.assign({}, fwMeta, fwData);
    currentPractices = fwData.practices || [];

    renderHero(currentFramework);
    renderOverview(currentFramework);
    renderTiers(currentFramework);
    buildTierFilters(currentFramework);
    renderMatrix();
    renderAccordion();
    renderSources(currentFramework);
    wireSmoothScroll();
  });
})();

// ── Global accordion toggles ──────────────────────────────────
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
