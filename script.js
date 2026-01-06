/* ================= THEME ================= */
const PRIMARY = "#00bcd4";   // AQUA
const DARK = "#0f172a";

/* ================= BODY ================= */
Object.assign(document.body.style, {
  margin: "0",
  fontFamily: "Segoe UI, Tahoma",
  background: "#e0f7fa",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh"
});

/* ================= STYLE ================= */
const style = document.createElement("style");
style.textContent = `
.nav-link{color:white;padding:15px 20px;cursor:pointer;text-decoration:none}
.nav-link:hover{background:rgba(255,255,255,.2)}

#sidebar{position:fixed;left:-260px;top:0;width:250px;height:100%;
background:${DARK};color:white;transition:.3s;z-index:1001;padding-top:60px}
#sidebar a{display:block;color:#ccc;padding:15px 25px;text-decoration:none}

#overlay{position:fixed;top:0;left:0;width:100%;height:100%;
background:rgba(0,0,0,.5);display:none;z-index:1000}

.chapter-btn{
  display:flex;align-items:center;justify-content:space-between;
  background:white;border-radius:50px;padding:25px;margin-bottom:20px;
  cursor:pointer;border:3px solid ${PRIMARY}; transition: .2s;
}
.chapter-btn:hover{transform:scale(1.03)}

.circle{
  width:90px;height:90px;border-radius:50%;
  background:${PRIMARY};color:white;
  display:flex;align-items:center;justify-content:center;
  font-weight:bold;font-size:18px
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.example{
  background:white; border-radius:20px;
  padding:25px; border:5px solid ${PRIMARY};
  text-align:center; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

pre{background:#012;padding:10px;color:#9ff;border-radius:10px;font-size:13px;overflow-x:auto;text-align:left}
button{background:${PRIMARY};color:white;border:none;
padding:8px 15px;border-radius:20px;cursor:pointer;margin-top:10px}

.profile-card {
    background: white; padding: 30px; border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;
}
#profile-img-display {
    width: 150px; height: 150px; border-radius: 50%;
    object-fit: cover; border: 4px solid ${PRIMARY}; margin-bottom: 15px;
}
.info-row {
    text-align: left; margin: 10px 0; font-size: 18px;
    border-bottom: 1px solid #eee; padding-bottom: 5px;
}
`;
document.head.appendChild(style);

/* ================= SIDEBAR ================= */
const sidebar = document.createElement("div");
sidebar.id = "sidebar";
sidebar.innerHTML = `<h3 style='text-align:center;color:${PRIMARY}'>MENU</h3>`;
document.body.appendChild(sidebar);

const overlay = document.createElement("div");
overlay.id = "overlay";
document.body.appendChild(overlay);

const menuBtn = document.createElement("button");
menuBtn.textContent = "☰";
Object.assign(menuBtn.style, {
  position: "fixed", top: "12px", left: "12px",
  background: PRIMARY, color: "white",
  border: "none", padding: "8px 12px", zIndex: 1002, borderRadius: "5px"
});
document.body.appendChild(menuBtn);

function toggleMenu() {
  const isOpen = sidebar.style.left === "0px";
  sidebar.style.left = isOpen ? "-260px" : "0px";
  overlay.style.display = isOpen ? "none" : "block";
}
menuBtn.onclick = toggleMenu;
overlay.onclick = toggleMenu;

/* ================= HEADER & NAV ================= */
const header = document.createElement("header");
header.textContent = "Shaafici cabdulahi kulane";
Object.assign(header.style, {
  background: PRIMARY, color: "white",
  padding: "18px", textAlign: "center",
  fontWeight: "bold", fontSize: "24px"
});
document.body.appendChild(header);

const nav = document.createElement("nav");
Object.assign(nav.style, {
  background: "#020617", display: "flex", justifyContent: "center"
});
document.body.appendChild(nav);

const main = document.createElement("main");
Object.assign(main.style, {
  flex: "1", padding: "30px", maxWidth: "1000px", margin: "auto", width: "100%"
});
document.body.appendChild(main);

["home", "about", "contact"].forEach(p => {
  const a = document.createElement("a");
  a.className = "nav-link";
  a.textContent = p.toUpperCase();
  a.onclick = () => loadPage(p);
  nav.appendChild(a);

  const s = document.createElement("a");
  s.textContent = p.toUpperCase();
  s.href = "#";
  s.onclick = e => { e.preventDefault(); loadPage(p); toggleMenu(); }
  sidebar.appendChild(s);
});

/* ================= DATA GENERATION (20 Examples each) ================= */
const chapters = {
  chapter7: {
    title: "Objects",
    examples: Array.from({ length: 20 }, (_, i) => ({
      title: `Object Task ${i + 1}`,
      code: `const user${i+1} = { id: ${i+1}, name: "User${i+1}", role: "Student" };\nconsole.log(user${i+1});\nalert("User ID: " + user${i+1}.id);`
    }))
  },
  chapter8: {
    title: "DOM Manipulation",
    examples: Array.from({ length: 20 }, (_, i) => ({
      title: `DOM Task ${i + 1}`,
      html: `<div id="box${i}" style="padding:10px; border:1px solid #ccc">Original Text ${i+1}</div>`,
      code: `document.getElementById("box${i}").style.background = "${PRIMARY}";\ndocument.getElementById("box${i}").style.color = "white";\ndocument.getElementById("box${i}").innerText = "Updated by DOM!";`
    }))
  },
  chapter9: {
    title: "Events",
    examples: Array.from({ length: 20 }, (_, i) => ({
      title: `Event Task ${i + 1}`,
      html: `<button id="btn${i}">Click Me ${i+1}</button>`,
      init: () => {
        const btn = document.getElementById(`btn${i}`);
        if(btn) btn.onclick = () => alert(`Waad guuleysatay! Waxaad riixday badanka ${i+1}`);
      }
    }))
  }
};

/* ================= ROUTING ================= */
function loadPage(p) {
  main.innerHTML = "";
  if (p === "home") {
    Object.keys(chapters).forEach(id => {
      const b = document.createElement("div");
      b.className = "chapter-btn";
      b.innerHTML = `<div class="circle">${id.replace('chapter','CH ')}</div><h2>${chapters[id].title}</h2>`;
      b.onclick = () => openChapter(id);
      main.appendChild(b);
    });
  }

  if (p === "about") {
    main.innerHTML = `
      <div class="profile-card">
        <img id="profile-img-display" src="2.jpeg" alt="Profile" onerror="this.src='https://via.placeholder.com/150?text=Sawirka'">
        <br>
        <input type="file" id="image-input" accept="image/*">
        <div class="info-row"><strong>Magaca:</strong> Shaafici Abdulhai Kulane</div>
        <div class="info-row"><strong>ID-ga:</strong> C5240083</div>
        <div class="info-row"><strong>Maaddada:</strong> JavaScript</div>
        <div class="info-row"><strong>Macallinka:</strong> Jamiila</div>
      </div>
    `;
    const input = document.getElementById('image-input');
    const display = document.getElementById('profile-img-display');
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => { display.src = ev.target.result; };
        reader.readAsDataURL(file);
      }
    };
  }

  if (p === "contact") {
    main.innerHTML = `
      <div class="profile-card">
        <h2>La Xiriir</h2>
        <div class="info-row"><strong>Tel:</strong> 615215934</div>
        <div class="info-row"><strong>Email:</strong> shaafici@example.com</div>
      </div>
    `;
  }
}

function openChapter(id) {
  main.innerHTML = `<button onclick="loadPage('home')" style="margin-bottom:20px">⬅ Back to Chapters</button><h1>${chapters[id].title}</h1>`;
  const grid = document.createElement("div");
  grid.className = "example-grid";
  
  chapters[id].examples.forEach((ex, idx) => {
    const d = document.createElement("div");
    d.className = "example";
    d.innerHTML = `<h3>${ex.title}</h3>`;
    
    if (ex.html) {
      const container = document.createElement("div");
      container.innerHTML = ex.html;
      d.appendChild(container);
      if (ex.init) setTimeout(ex.init, 0);
    }
    
    if (ex.code) {
      const pre = document.createElement("pre");
      pre.textContent = ex.code;
      d.appendChild(pre);
      const btn = document.createElement("button");
      btn.textContent = "RUN CODE";
      btn.onclick = () => {
          try {
              const run = new Function(ex.code);
              run();
          } catch(err) { alert("Error: " + err); }
      };
      d.appendChild(btn);
    }
    grid.appendChild(d);
  });
  main.appendChild(grid);
}

/* ================= FOOTER ================= */
const footer = document.createElement("footer");
footer.innerHTML = "&copy; 2024 Shaafici Abdullahi - All Rights Reserved";
Object.assign(footer.style, {
  background: PRIMARY, color: "white",
  textAlign: "center", padding: "15px", marginTop: "auto"
});
document.body.appendChild(footer);

loadPage("home");