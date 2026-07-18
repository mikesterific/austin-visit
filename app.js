/* The Austin Weekend — interactivity */

(function () {
  "use strict";

  /* ---------- Curtain ---------- */

  const curtain = document.getElementById("curtain");
  const raiseBtn = document.getElementById("raiseCurtain");
  document.body.classList.add("curtain-closed");

  raiseBtn.addEventListener("click", function () {
    curtain.classList.add("open");
    document.body.classList.remove("curtain-closed");
    // Remove from the tree once the panels have slid away.
    setTimeout(function () {
      curtain.remove();
    }, 2600);
  });

  /* ---------- Countdown ---------- */

  // Curtain time: guests' Friday dinner reservation, 6:15 PM Central (UTC-5 in July).
  const showtime = new Date("2026-07-17T18:15:00-05:00").getTime();
  const weekendEnd = new Date("2026-07-19T23:59:59-05:00").getTime();

  const el = {
    days: document.getElementById("cdDays"),
    hours: document.getElementById("cdHours"),
    mins: document.getElementById("cdMins"),
    secs: document.getElementById("cdSecs"),
    caption: document.getElementById("countCaption"),
    wrap: document.getElementById("countdown"),
  };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = Date.now();

    if (now >= weekendEnd) {
      el.wrap.innerHTML =
        '<p style="font-family:var(--display);font-size:1.6rem;color:var(--gold-bright)">The weekend has entered legend.</p>';
      el.caption.textContent = "Thanks for coming, Matt & Julie.";
      return;
    }

    if (now >= showtime) {
      el.wrap.innerHTML =
        '<p style="font-family:var(--display);font-size:1.6rem;color:var(--gold-bright)">The show is ON.</p>';
      el.caption.textContent = "Places, everyone.";
      return;
    }

    const diff = showtime - now;
    el.days.textContent = Math.floor(diff / 86400000);
    el.hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    el.mins.textContent = pad(Math.floor((diff % 3600000) / 60000));
    el.secs.textContent = pad(Math.floor((diff % 60000) / 1000));
    setTimeout(tick, 1000);
  }

  tick();

  /* ---------- Flip cards ---------- */

  const cards = Array.from(document.querySelectorAll(".option-card"));

  cards.forEach(function (card) {
    function flip(e) {
      // Let outbound links work without flipping the card back.
      if (e.target.closest("a")) return;
      card.classList.toggle("flipped");
    }
    card.addEventListener("click", flip);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        flip(e);
      }
    });
  });

  /* ---------- Energy dial ---------- */

  const dial = document.getElementById("energyDial");
  const verdict = document.getElementById("energyVerdict");

  const verdicts = [
    { max: 15, text: "Perfect. Los Coast is already playing and no one has to stand up." },
    { max: 30, text: "Stay for the band, order one more round, and call it a beautifully executed first night." },
    { max: 50, text: "Keep the live music going gently: a short walk to Parker Jazz Club, or a seated folk set with The Kingston Trio." },
    { max: 70, text: "Parker Jazz Club territory — live jazz, seated and sophisticated, home by a civilized hour." },
    { max: 85, text: "Feeling bold? Antone's is the escalation clause. Just remember Saturday's Sixth Street marathon." },
    { max: 100, text: "Airport adrenaline detected: Qveen Herby at ACL Live — but Saturday will collect interest." },
  ];

  function updateEnergy() {
    const val = Number(dial.value);

    for (const v of verdicts) {
      if (val <= v.max) {
        verdict.textContent = v.text;
        break;
      }
    }

    cards.forEach(function (card) {
      const min = Number(card.dataset.min);
      const max = Number(card.dataset.max);
      const inRange = val >= min && val <= max;
      card.classList.toggle("spotlit", inRange);
      card.classList.toggle("dimmed", !inRange);
    });
  }

  dial.addEventListener("input", updateEnergy);
  updateEnergy();

  /* ---------- Checklists (persisted) ---------- */

  const STORAGE_KEY = "austin-weekend-checklist";

  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (_) {
    saved = {};
  }

  document.querySelectorAll(".checklist input[type=checkbox]").forEach(function (box) {
    const key = box.dataset.key;
    box.checked = Boolean(saved[key]);
    box.addEventListener("change", function () {
      saved[key] = box.checked;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      } catch (_) {
        /* private browsing: checkboxes still work, just don't persist */
      }
    });
  });

  /* ---------- Scroll reveal ---------- */

  const revealTargets = document.querySelectorAll(
    ".scene, .option-card, .route-stop, .note-card, .checklist, .telegram-card, .critics-corner, .energy-console, .synopsis-text, .act3-text, .locked-callout, .story-card"
  );

  revealTargets.forEach(function (t) {
    t.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach(function (t) {
    observer.observe(t);
  });
})();
