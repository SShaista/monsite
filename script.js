// =====================
// iCal -> Affichage par SEMAINE (existante) + jour
// Robuste grâce à ical.js
// - Auto load ./edt.ics (GitHub/Netlify)
// - PAS d'import utilisateur
// - Résumé (événements/heures/jours) corrigé
// + Onglet "Cours" (UE/ECUE) avec filtres semestre + compteurs
// =====================

let allEvents = [];          // {title, room, start:Date, end:Date, weekKey, color}
let availableWeeks = [];     // ["2026-W05", ...] seulement celles qui existent
let selectedWeekIndex = 0;
let selectedDay = null;      // Date (local) à 00:00

const PALETTE = ["#007bff", "#17a2b8", "#28a745", "#ffc107", "#dc3545", "#6f42c1", "#fd7e14", "#e83e8c", "#20c997", "#6610f2", "#0dcaf0", "#adb5bd"];

// ===== Courses State =====
let selectedSemester = "all";

// DOM
const loadingScreen = document.getElementById("loading-screen");
const app = document.getElementById("app");
const currentDateEl = document.getElementById("current-date");

const icsStatus = document.getElementById("icsStatus");

const prevWeekBtn = document.getElementById("prevWeek");
const nextWeekBtn = document.getElementById("nextWeek");
const weekLabelEl = document.getElementById("weekLabel");
const weekDatesEl = document.getElementById("weekDates");
const daySelectorEl = document.getElementById("daySelector");

// Résumé (EDT)
const sumCoursesEl = document.getElementById("sumCourses");
const sumHoursEl = document.getElementById("sumHours");
const sumDaysEl = document.getElementById("sumDays");

// =====================
// Données "Cours" (UE/ECUE)
// =====================
const ueData = [
  {
    id: "ue-s1-maths",
    semester: 1,
    title: "UE Mathématiques & Modélisation",
    code: "UE1",
    ecues: [
      { id: "ecue1", name: "Analyse Numérique", code: "MAT-101", teacher: "Dr. Martin", credits: 3, description: "Méthodes numériques pour la résolution d'équations différentielles et l'optimisation.", color: "#007bff" },
      { id: "ecue8", name: "Probabilités et Statistiques", code: "MAT-103", teacher: "Dr. Michel", credits: 3, description: "Théorie des probabilités et méthodes statistiques pour l'ingénieur.", color: "#e83e8c" },
    ],
  },
  {
    id: "ue-s1-meca",
    semester: 1,
    title: "UE Mécanique",
    code: "UE2",
    ecues: [
      { id: "ecue4", name: "Résistance des Matériaux", code: "MEC-102", teacher: "Dr. Robert", credits: 4, description: "Analyse des contraintes et déformations dans les structures mécaniques.", color: "#ffc107" },
    ],
  },
  {
    id: "ue-s2-phys",
    semester: 2,
    title: "UE Physique & Thermodynamique",
    code: "UE3",
    ecues: [
      { id: "ecue2", name: "Mécanique des Fluides", code: "PHY-201", teacher: "Dr. Bernard", credits: 4, description: "Étude des fluides en mouvement, équations de Navier-Stokes et applications.", color: "#17a2b8" },
      { id: "ecue5", name: "Thermodynamique Appliquée", code: "PHY-202", teacher: "Dr. Richard", credits: 3, description: "Principes thermodynamiques et applications en ingénierie.", color: "#dc3545" },
    ],
  },
  {
    id: "ue-s2-elec",
    semester: 2,
    title: "UE Électronique",
    code: "UE4",
    ecues: [
      { id: "ecue7", name: "Circuits Électroniques", code: "ELE-201", teacher: "Dr. Laurent", credits: 4, description: "Conception et analyse de circuits électroniques analogiques et numériques.", color: "#fd7e14" },
    ],
  },
  {
    id: "ue-s3-info",
    semester: 3,
    title: "UE Informatique & Dev",
    code: "UE5",
    ecues: [
      { id: "ecue3", name: "Programmation Orientée Objet", code: "INFO-301", teacher: "Dr. Petit", credits: 5, description: "Concepts avancés de POO, design patterns, développement d'applications.", color: "#28a745" },
      { id: "ecue6", name: "Développement Web Full Stack", code: "INFO-302", teacher: "Dr. Simon", credits: 6, description: "Apps web modernes (front/back) et bases de données.", color: "#6f42c1" },
    ],
  },
];

// =====================
// Init
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // Date du jour (affichage)
  const now = new Date();
  if (currentDateEl) {
    currentDateEl.textContent = now.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  // Navigation + Cours
  setupNavigation();
  setupFilterSelector();
  renderCourses();

  // Loading -> app
  setTimeout(() => {
    loadingScreen?.classList.add("hidden");
    app?.classList.remove("hidden");
  }, 400);

  // Prev/Next week
  prevWeekBtn?.addEventListener("click", () => changeWeek(-1));
  nextWeekBtn?.addEventListener("click", () => changeWeek(+1));

  // Auto load ./edt.ics
  loadIcsFromServer();
});

// =====================
// Navigation
// =====================
function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const views = document.querySelectorAll(".view");
  const pageTitle = document.getElementById("page-title");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const viewName = item.dataset.view;

      navItems.forEach((n) => n.classList.remove("active"));
      item.classList.add("active");

      views.forEach((v) => v.classList.remove("active"));
      const target = document.getElementById(`view-${viewName}`);
      if (target) target.classList.add("active");

      const titles = {
        schedule: "Emploi du temps",
        courses: "Mes cours",
        exams: "Examens & Tâches",
        settings: "Paramètres",
      };
      if (pageTitle) pageTitle.textContent = titles[viewName] || "Student Portal";
    });
  });
}

// =====================
// Cours (UE/ECUE)
// =====================
function setupFilterSelector() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!filterButtons.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSemester = btn.dataset.semester || "all";
      renderCourses();
    });
  });
}

function renderCourses() {
  const container = document.getElementById("courses-list");
  if (!container) return;

  const sem = selectedSemester;

  const filteredUEs =
    sem === "all"
      ? ueData
      : ueData.filter((ue) => ue.semester === parseInt(sem, 10));

  const totalUE = filteredUEs.length;
  const totalECUE = filteredUEs.reduce((acc, ue) => acc + ue.ecues.length, 0);
  const totalECTS = filteredUEs.reduce(
    (acc, ue) => acc + ue.ecues.reduce((a, e) => a + (e.credits || 0), 0),
    0
  );

  const cEl = document.getElementById("coursesCount");
  const uEl = document.getElementById("uesCount");
  const eEl = document.getElementById("ectsTotal");
  if (cEl) cEl.textContent = String(totalECUE);
  if (uEl) uEl.textContent = String(totalUE);
  if (eEl) eEl.textContent = String(totalECTS);

  if (!filteredUEs.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📚</div>
        <p>Aucun cours pour ce semestre.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredUEs
    .map((ue) => {
      const ects = ue.ecues.reduce((a, e) => a + (e.credits || 0), 0);
      return `
        <div class="ue-card">
          <div class="ue-header" style="display:flex;justify-content:space-between;gap:12px;">
            <div>
              <div class="ue-code" style="opacity:.7;font-size:12px;">${escapeHtml(ue.code || "")}</div>
              <h3 class="ue-title" style="margin:4px 0 0;">${escapeHtml(ue.title)}</h3>
            </div>
            <div class="ue-ects" style="opacity:.7;font-size:12px;white-space:nowrap;">${ects} ECTS</div>
          </div>

          <div class="ue-content" style="margin-top:10px;">
            ${ue.ecues
              .map(
                (ecue) => `
              <div class="ecue-item" style="padding:10px 0;border-top:1px solid rgba(0,0,0,.08);">
                <div class="ecue-name"><strong>${escapeHtml(ecue.name)}</strong> — ${ecue.credits || 0} ECTS</div>
                <div class="ecue-meta" style="opacity:.7;font-size:12px;margin-top:2px;">
                  ${escapeHtml(ecue.code || "")}${ecue.teacher ? " • " + escapeHtml(ecue.teacher) : ""}
                </div>
                ${ecue.description ? `<div class="ecue-desc" style="opacity:.9;font-size:13px;margin-top:6px;">${escapeHtml(ecue.description)}</div>` : ""}
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");
}

// =====================
// iCal auto load
// =====================
async function loadIcsFromServer() {
  try {
    setStatus("Chargement de edt.ics…");
    const res = await fetch("./edt.ics", { cache: "no-store" });

    if (!res.ok) {
      setStatus("edt.ics introuvable. Vérifie qu'il est bien dans le repo (même dossier que index.html).", true);
      allEvents = [];
      availableWeeks = [];
      selectedDay = null;
      renderAll();
      return;
    }

    const text = await res.text();
    loadFromIcsText(text, "edt.ics chargé ✅");
  } catch (e) {
    console.error(e);
    setStatus("Erreur de lecture edt.ics.", true);
    allEvents = [];
    availableWeeks = [];
    selectedDay = null;
    renderAll();
  }
}

function loadFromIcsText(icsText, okMsg) {
  try {
    allEvents = parseWithIcalJs(icsText);

    setStatus(`${okMsg} — ${allEvents.length} événement(s)`);
    buildAvailableWeeks();
    pickInitialWeekAndDay();
    renderAll();
  } catch (err) {
    console.error(err);
    setStatus("Impossible de parser le fichier .ics (format inattendu).", true);
    allEvents = [];
    availableWeeks = [];
    selectedDay = null;
    renderAll();
  }
}

// ========== Parsing (ical.js) ==========
function parseWithIcalJs(icsText) {
  if (!window.ICAL) throw new Error("ical.js n'est pas chargé (window.ICAL manquant).");

  const jcalData = ICAL.parse(icsText);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents("vevent");

  const out = [];

  for (const ve of vevents) {
    const ev = new ICAL.Event(ve);

    const title = ev.summary || "Événement";
    const room = (ev.location || "").trim();

    if (ev.isRecurring()) {
      const startRange = new Date();
      startRange.setDate(startRange.getDate() - 30);
      const endRange = new Date();
      endRange.setDate(endRange.getDate() + 180);

      const it = ev.iterator(ICAL.Time.fromJSDate(startRange, false));
      while (true) {
        const next = it.next();
        if (!next) break;

        const occStart = next.toJSDate();
        if (occStart > endRange) break;

        const occEnd = ev.getOccurrenceDetails(next).endDate.toJSDate();
        out.push(toEventObj(title, room, occStart, occEnd));
      }
    } else {
      const start = ev.startDate.toJSDate();
      const end = ev.endDate.toJSDate();
      out.push(toEventObj(title, room, start, end));
    }
  }

  out.sort((a, b) => a.start - b.start);
  return out;
}

function toEventObj(title, room, start, end) {
  const weekKey = isoWeekKeyFromLocalDate(start);
  const color = PALETTE[hashString(title) % PALETTE.length];
  return { title, room, start, end, weekKey, color };
}

// ========== Weeks ==========
function buildAvailableWeeks() {
  const set = new Set(allEvents.map((e) => e.weekKey));
  availableWeeks = Array.from(set).sort();
  selectedWeekIndex = Math.min(selectedWeekIndex, Math.max(0, availableWeeks.length - 1));
}

function pickInitialWeekAndDay() {
  if (!availableWeeks.length) {
    selectedDay = null;
    selectedWeekIndex = 0;
    return;
  }

  const now = new Date();
  const next = allEvents.find((e) => e.end >= now) || allEvents[0];
  const wk = next.weekKey;

  const idx = availableWeeks.indexOf(wk);
  selectedWeekIndex = idx >= 0 ? idx : 0;

  selectedDay = startOfLocalDay(next.start);
  if (isoWeekKeyFromLocalDate(selectedDay) !== availableWeeks[selectedWeekIndex]) {
    selectedDay = startOfLocalDay(mondayOfWeekKey(availableWeeks[selectedWeekIndex]));
  }
}

function changeWeek(delta) {
  if (!availableWeeks.length) return;

  const ni = selectedWeekIndex + delta;
  if (ni < 0 || ni >= availableWeeks.length) return;

  selectedWeekIndex = ni;
  selectedDay = startOfLocalDay(mondayOfWeekKey(availableWeeks[selectedWeekIndex]));
  renderAll();
}

// ========== Render EDT ==========
function renderAll() {
  renderWeekBar();
  renderDaySelector();
  renderSchedule();
  updateWeekButtons();
  updateSummary();
}

function renderWeekBar() {
  if (!availableWeeks.length) {
    weekLabelEl.textContent = "Semaine";
    weekDatesEl.textContent = "";
    return;
  }

  const wk = availableWeeks[selectedWeekIndex];
  const monday = mondayOfWeekKey(wk);
  const sunday = addDaysLocal(monday, 6);

  const weekNo = Number(wk.split("-W")[1]);
  weekLabelEl.textContent = `Semaine ${weekNo}`;

  const fmt = (d) => d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
  weekDatesEl.textContent = `${fmt(monday)} → ${fmt(sunday)}`;
}

function renderDaySelector() {
  daySelectorEl.innerHTML = "";
  if (!availableWeeks.length) return;

  const wk = availableWeeks[selectedWeekIndex];
  const monday = mondayOfWeekKey(wk);
  const labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  for (let i = 0; i < 7; i++) {
    const d = addDaysLocal(monday, i);
    const btn = document.createElement("button");
    btn.className = "day-btn" + (sameLocalDay(d, selectedDay) ? " active" : "");
    btn.textContent = `${labels[i]} ${d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}`;
    btn.addEventListener("click", () => {
      selectedDay = startOfLocalDay(d);
      renderDaySelector();
      renderSchedule();
      updateSummary();
    });
    daySelectorEl.appendChild(btn);
  }
}

function renderSchedule() {
  const container = document.getElementById("schedule-list");

  if (!availableWeeks.length || !selectedDay) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📅</div>
        <p>Aucun événement chargé.</p>
      </div>`;
    return;
  }

  const wk = availableWeeks[selectedWeekIndex];

  const items = allEvents
    .filter((e) => e.weekKey === wk)
    .filter((e) => sameLocalDay(e.start, selectedDay))
    .sort((a, b) => a.start - b.start);

  if (!items.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🕒</div>
        <p>Aucun cours ce jour-là.</p>
      </div>`;
    return;
  }

  const now = new Date();
  container.innerHTML = items
    .map((ev) => {
      const isCurrent = now >= ev.start && now <= ev.end;
      return `
        <div class="schedule-card ${isCurrent ? "current" : ""}">
          ${isCurrent ? `<span class="current-badge">En cours</span>` : ""}
          <span class="time-badge" style="background:${ev.color}">
            ${formatHHMM(ev.start)} - ${formatHHMM(ev.end)}
          </span>
          <h3>${escapeHtml(ev.title)}</h3>
          <div class="schedule-info">
            ${ev.room ? `<span>📍 ${escapeHtml(ev.room)}</span>` : ""}
          </div>
        </div>
      `;
    })
    .join("");
}

function updateWeekButtons() {
  if (!availableWeeks.length) {
    prevWeekBtn.disabled = true;
    nextWeekBtn.disabled = true;
    return;
  }
  prevWeekBtn.disabled = selectedWeekIndex <= 0;
  nextWeekBtn.disabled = selectedWeekIndex >= availableWeeks.length - 1;
  prevWeekBtn.style.opacity = prevWeekBtn.disabled ? "0.5" : "1";
  nextWeekBtn.style.opacity = nextWeekBtn.disabled ? "0.5" : "1";
}

// ===== Résumé EDT =====
function updateSummary() {
  if (!sumCoursesEl || !sumHoursEl || !sumDaysEl) return;

  if (!availableWeeks.length) {
    sumCoursesEl.textContent = "0";
    sumHoursEl.textContent = "0h";
    sumDaysEl.textContent = "0";
    return;
  }

  const wk = availableWeeks[selectedWeekIndex];
  const weekEvents = allEvents.filter((e) => e.weekKey === wk);

  sumCoursesEl.textContent = String(weekEvents.length);

  let minutes = 0;
  for (const e of weekEvents) {
    const diff = (e.end - e.start) / 60000;
    if (Number.isFinite(diff) && diff > 0) minutes += diff;
  }
  const hours = Math.round((minutes / 60) * 10) / 10;
  sumHoursEl.textContent = `${hours}h`;

  const daySet = new Set(
    weekEvents.map((e) => `${e.start.getFullYear()}-${e.start.getMonth()}-${e.start.getDate()}`)
  );
  sumDaysEl.textContent = String(daySet.size);
}

// =====================
// Helpers
// =====================
function startOfLocalDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}
function sameLocalDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addDaysLocal(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function isoWeekKeyFromLocalDate(date) {
  const y = date.getFullYear(),
    m = date.getMonth(),
    d = date.getDate();
  const utc = new Date(Date.UTC(y, m, d, 12, 0, 0));
  const dayNum = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - dayNum);
  const weekYear = utc.getUTCFullYear();

  const yearStart = new Date(Date.UTC(weekYear, 0, 1, 12, 0, 0));
  const yearStartDay = yearStart.getUTCDay() || 7;
  const firstThursday = new Date(yearStart);
  firstThursday.setUTCDate(firstThursday.getUTCDate() + (4 - yearStartDay));

  const weekNo = 1 + Math.floor((utc - firstThursday) / (7 * 24 * 60 * 60 * 1000));
  return `${weekYear}-W${String(weekNo).padStart(2, "0")}`;
}

function mondayOfWeekKey(weekKey) {
  const [yy, ww] = weekKey.split("-W");
  const year = Number(yy);
  const week = Number(ww);

  const jan4 = new Date(year, 0, 4);
  const jan4Day = jan4.getDay() || 7;
  const mondayWeek1 = new Date(year, 0, 4 - (jan4Day - 1));
  const monday = new Date(mondayWeek1);
  monday.setDate(monday.getDate() + (week - 1) * 7);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function formatHHMM(d) {
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}
function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function setStatus(msg, isError = false) {
  if (!icsStatus) return;
  icsStatus.textContent = msg;
  icsStatus.style.color = isError ? "#dc3545" : "";
}
