/* SBA site scripts - (c) SBA Webmaster. Requires JavaScript 1.2 or better! */

function safeGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* oh well */ }
}

/* ---------- Hit counter ---------- */
function renderCounter() {
  var el = document.getElementById("hitcounter");
  if (!el) return;
  var visits = parseInt(safeGet("sba_visits") || "0", 10) + 1;
  safeSet("sba_visits", visits);
  var digits = String(48213 + visits).padStart(7, "0");
  el.innerHTML = digits.split("").map(function (d) { return "<span>" + d + "</span>"; }).join("");
}

/* ---------- Clock ---------- */
function startClock() {
  var el = document.getElementById("clock");
  if (!el) return;
  function tick() {
    var now = new Date();
    el.textContent = now.toLocaleTimeString("en-US", { hour12: true });
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- Poll ---------- */
var POLL_OPTIONS = ["Strikes", "Spares", "Nachos", "Gladde ballen"];

function renderPoll() {
  var form = document.getElementById("poll");
  if (!form) return;
  var results = document.getElementById("poll-results");
  var votes = JSON.parse(safeGet("sba_poll") || "[41, 27, 63, 12]");
  var voted = safeGet("sba_poll_voted");

  function showResults() {
    var total = votes.reduce(function (a, b) { return a + b; }, 0);
    results.innerHTML = POLL_OPTIONS.map(function (opt, i) {
      var pct = Math.round((votes[i] / total) * 100);
      return opt + " (" + pct + "%)<div class='poll-bar' style='width:" + pct + "%'></div>";
    }).join("") + "<i>" + total + " votes</i>";
    form.style.display = "none";
    results.style.display = "block";
  }

  if (voted) { showResults(); return; }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var choice = form.querySelector("input[name=vote]:checked");
    if (!choice) { alert("Kies een optie voordat je stemt aub!"); return; }
    votes[parseInt(choice.value, 10)]++;
    safeSet("sba_poll", JSON.stringify(votes));
    safeSet("sba_poll_voted", "1");
    showResults();
  });
}

/* ---------- Sparkle cursor trail (very important) ---------- */
function startSparkles() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var last = 0;
  var glyphs = ["*", "+", "✦", "✧"];
  document.addEventListener("mousemove", function (e) {
    var now = Date.now();
    if (now - last < 45) return;
    last = now;
    var s = document.createElement("div");
    s.className = "sparkle";
    s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    s.style.left = (e.clientX + 6) + "px";
    s.style.top = (e.clientY + 6) + "px";
    s.style.color = ["#ffff00", "#ff66ff", "#66ffff", "#ffffff"][Math.floor(Math.random() * 4)];
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 800);
  });
}

/* ---------- Guestbook ---------- */
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function setupGuestbook() {
  var form = document.getElementById("gb-form");
  if (!form) return;
  var list = document.getElementById("gb-new");

  function render() {
    var entries = JSON.parse(safeGet("sba_guestbook") || "[]");
    list.innerHTML = entries.map(function (en) {
      return "<div class='gb-entry'><span class='who'>" + escapeHtml(en.name) + "</span>" +
        (en.from ? " from <b>" + escapeHtml(en.from) + "</b>" : "") +
        " <span class='when'>" + escapeHtml(en.when) + "</span><br>" +
        escapeHtml(en.msg).replace(/\n/g, "<br>") + "</div>";
    }).join("");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var msg = form.elements.msg.value.trim();
    if (!name || !msg) { alert("Vul je naam en een bericht in aub!"); return; }
    var entries = JSON.parse(safeGet("sba_guestbook") || "[]");
    entries.unshift({
      name: name,
      from: form.elements.from.value.trim(),
      msg: msg,
      when: new Date().toLocaleDateString("nl-NL", { month: "long", day: "numeric", year: "numeric" })
    });
    safeSet("sba_guestbook", JSON.stringify(entries));
    form.reset();
    render();
    alert("Bedankt voor het schrijven in ons gastenboek!! :-)");
  });

  render();
}

/* ---------- Membership form ---------- */
function setupJoinForm() {
  var form = document.getElementById("join-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.fullname.value.trim();
    if (!name || !form.elements.email.value.trim()) {
      alert("Naam en e-mail zijn verplichte velden!");
      return;
    }
    if (!form.elements.rules.checked) {
      alert("Je moet akkoord gaan met de huisregels.");
      return;
    }
    document.getElementById("join-thanks").style.display = "block";
    document.getElementById("join-thanks-name").textContent = name;
    form.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderCounter();
  startClock();
  renderPoll();
  startSparkles();
  setupGuestbook();
  setupJoinForm();
});
