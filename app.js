// ---------------------------
// SECTION DATA
// ---------------------------
const sections = {
  or: [
    { title: "Pre‑Op", text: "Review imaging, consent, mark limb" },
    { title: "Cases", text: "Execute operative plan with precision" },
    { title: "Turnover", text: "Optimize efficiency between cases" },
    { title: "Post‑Op", text: "Dictations, orders, handoff" }
  ],

  clinic: [
    { title: "Patients", text: "New consults, follow‑ups, wound checks" },
    { title: "Imaging", text: "CTA, duplex, ABI review" },
    { title: "Procedures", text: "In‑clinic interventions" }
  ],

  admin: [
    { title: "Email", text: "Triage inbox, respond to priority items" },
    { title: "Billing", text: "Close encounters, coding review" },
    { title: "Scheduling", text: "OR block planning, clinic optimization" }
  ],

  writing: [
    { title: "Manuscript Work", text: "Draft, revise, or analyze data" },
    { title: "Reading", text: "Literature review for citations" }
  ],

  leadership: [
    { title: "Reading", text: "Leadership books + notes" },
    { title: "Reflection", text: "Daily leadership insights" },
    { title: "Courses", text: "Online modules or CME" }
  ]
};

// ---------------------------
// DAY TYPE LOGIC (corrected)
// ---------------------------
function getDayType() {
  const day = new Date().getDay();

  // Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5
  if (day === 1 || day === 4) return "OR Day";          // Monday + Thursday
  if (day === 3 || day === 5) return "Clinic Day";      // Wednesday + Friday
  if (day === 2) return "Admin Day";                    // Tuesday
  return "Admin Day";                                   // Weekend default
}

// ---------------------------
// DAILY SCHEDULE
// ---------------------------
function loadSchedule() {
  const schedule = document.getElementById("schedule");
  schedule.innerHTML = "";

  const type = getDayType();
  document.getElementById("day-type").innerHTML = type;

  const blocks = {
    "OR Day": [
      "6:00 — Pre‑Op Review",
      "7:00 — Case 1",
      "10:00 — Case 2",
      "1:00 — Case 3",
      "4:00 — Post‑Op Notes"
    ],
    "Clinic Day": [
      "6:00 — Imaging Review",
      "8:00 — Clinic AM",
      "12:00 — Lunch + Calls",
      "1:00 — Clinic PM",
      "4:30 — Wrap‑Up"
    ],
    "Admin Day": [
      "6:00 — Email + Billing",
      "9:00 — Meetings",
      "12:00 — Planning",
      "2:00 — Writing",
      "4:00 — Leadership Work"
    ]
  };

  blocks[type].forEach(item => {
    const div = document.createElement("div");
    div.className = "schedule-item";
    div.textContent = item;
    schedule.appendChild(div);
  });
}

// ---------------------------
// RENDER CARDS
// ---------------------------
function renderSection(sectionName) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  const items = sections[sectionName];

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
    div.addEventListener("click", () => {
      div.classList.toggle("expanded");
    });
    container.appendChild(div);
  });

  localStorage.setItem("lastSection", sectionName);
}

// ---------------------------
// NAVIGATION
// ---------------------------
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const section = btn.getAttribute("data-section");
    renderSection(section);
  });
});

// ---------------------------
// INIT
// ---------------------------
function init() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  document.getElementById("today").innerHTML = today;

  loadSchedule();

  const last = localStorage.getItem("lastSection") || "or";
  document.querySelector(`button[data-section="${last}"]`).classList.add("active");
  renderSection(last);
}

init();
