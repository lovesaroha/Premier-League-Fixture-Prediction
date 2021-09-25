"use-strict";
/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/

// Themes.
const themes = [{ normal: "#5468e7", light: "#6577e9", veryLight: "#eef0fd" }, { normal: "#e94c2b", light: "#eb5e40", veryLight: "#fdedea" }];

// Choose random color theme.
let colorTheme = themes[Math.floor(Math.random() * themes.length)];

// This function set random color theme.
function setTheme() {
  // Change css values.
  document.documentElement.style.setProperty("--primary", colorTheme.normal);
}

// Set random theme.
setTheme();

let home = "";
let away = "";

let model;

// Load trained model.
tf.loadLayersModel("https://models.lovesaroha.com/premier-league-fixture-prediction-model/model.json").then(savedModel => {
  model = savedModel;
  document.getElementById("view_id").innerHTML = document.getElementById("homePage_id").innerHTML;
  showHomeTeams();
  showAwayTeams();
}).catch(e => { console.log(e); })

// Predict function.
function predict() {
  let inputs = [];
  for (let i = 0; i < teams[home].length; i++) {
    inputs.push(teams[home][i]);
  }
  for (let i = 0; i < teams[away].length; i++) {
    inputs.push(teams[away][i]);
  }
  let input = tf.tensor([inputs]);
  let p = model.predict(input).dataSync();
  let sum = p[0] + p[1];
  return [(p[0] / sum) * 100, (p[1] / sum) * 100];
}

// Show home teams.
function showHomeTeams() {
  let template = ``;
  Object.keys(teams).forEach(t => {
    if (t == home) {
      template += `<div class="card border-3 border-primary mb-2 p-2"><h4 class="mb-0">${t}</h4></div>`;
    } else if (t != away) {
      template += `<div data-id="${t}" onclick="javascript: selectHomeTeam(this);" class="card cursor-pointer hover:border-primary border-3 border-transparent mb-2 p-2"><h4 class="mb-0">${t}</h4></div>`;
    }
  });
  document.getElementById("homeTeams_id").innerHTML = template;
}

// Show away teams.
function showAwayTeams() {
  let template = ``;
  Object.keys(teams).forEach(t => {
    if (t == away) {
      template += `<div class="card border-3 border-primary mb-2 p-2"><h4 class="mb-0">${t}</h4></div>`;
    } else if (t != home) {
      template += `<div data-id="${t}" onclick="javascript: selectAwayTeam(this);" class="card cursor-pointer hover:border-primary border-3 border-transparent mb-2 p-2"><h4 class="mb-0">${t}</h4></div>`;
    }
  });
  document.getElementById("awayTeams_id").innerHTML = template;
}


// Select home team.
function selectHomeTeam(el) {
  let team = el.getAttribute("data-id");
  home = team;
  showHomeTeams();
  showAwayTeams();
  if (away != "") { document.getElementById("predictButton_id").className = ""; }
}

// Select away team.
function selectAwayTeam(el) {
  let team = el.getAttribute("data-id");
  away = team;
  showHomeTeams();
  showAwayTeams();
  if (home != "") { document.getElementById("predictButton_id").className = ""; }
}

// Show prediction.
function showPrediction() {
  let p = predict();
  showModal(`<div class="bg-modal fade-in modal-content mx-auto mt-20 overflow-hidden p-4 shadow-xl sm:max-w-xl sm:w-full text-center">
  <div class="overflow-hidden mb-2 h-2 flex bg-light">
  <div style="width: ${p[0]}%;" id="progress_id" class="flex flex-col whitespace-nowrap justify-center bg-primary"></div>
  </div>
  <div class="p-4 bg-primary text-white">${home} have ${p[0].toFixed(2)}% chance and ${away} have ${p[1].toFixed(2)}% chance of winning this fixture.</div>
  </div>`);
}

// Teams.
const teams = {
  "Arsenal": [
    0.11,
    -0.37,
    0.01,
    0.01,
    0.04,
    0.08,
    -0.27,
    0.02,
    0,
    0.06,
    -0.24,
    0,
    0,
    0.12,
    -0.44,
    0,
    0.01,
    0.11,
    -0.26,
    0.01,
    0.02,
    0.1,
    0.03,
    0.05,
    0.05,
    0.02,
    0.05,
    0.1,
    0.03,
    0.13,
    0.03,
    0.61,
    0.16
  ],
  "Chelsea": [
    0.16,
    -0.25,
    0.01,
    0.02,
    0.01,
    0.05,
    -0.13,
    0.01,
    0,
    0.11,
    -0.1,
    0.01,
    0.02,
    0.13,
    -0.2,
    0.02,
    0,
    0.1,
    -0.25,
    0.04,
    0.06,
    0.06,
    0.07,
    0.07,
    0.02,
    0.06,
    0.12,
    0,
    0.02,
    0.04,
    0.03,
    0.67,
    0.22
  ],
  "Liverpool": [
    0.1,
    -0.32,
    0.01,
    0.02,
    0.08,
    0.1,
    -0.4,
    0.01,
    0.08,
    0.12,
    -0.42,
    0.01,
    0.02,
    0.03,
    -0.05,
    0.01,
    0.01,
    0.07,
    -0.11,
    0.22,
    0.06,
    0.11,
    0.11,
    0.09,
    0,
    0.09,
    0.08,
    0.01,
    0.02,
    0.01,
    0.02,
    0.69,
    0.26
  ],
  "Man City": [
    0.19,
    -0.28,
    0.01,
    0.01,
    0.01,
    0.17,
    -0.21,
    0.01,
    0.01,
    0.09,
    -0.2,
    0.01,
    0,
    0.03,
    -0.13,
    0.04,
    0,
    0.14,
    -0.12,
    0.06,
    0.12,
    0.13,
    0.04,
    0.09,
    0.08,
    0.09,
    0.05,
    0.1,
    0.09,
    0.02,
    0.07,
    0.86,
    0.51
  ],
  "Man United": [
    0.09,
    -0.32,
    0,
    0.01,
    0.05,
    0.1,
    -0.33,
    0.02,
    0.05,
    0.13,
    -0.36,
    0.02,
    0.02,
    0.13,
    -0.36,
    0.01,
    0.01,
    0.1,
    -0.3,
    0.03,
    0.06,
    0.18,
    0.14,
    0.07,
    0.02,
    0.04,
    0.07,
    0.1,
    0.04,
    0.11,
    0.11,
    0.74,
    0.29
  ],
  "Spurs": [
    0.12,
    -0.45,
    0,
    0,
    0.06,
    0.08,
    -0.31,
    0,
    0,
    0.08,
    -0.34,
    0,
    0,
    0.04,
    -0.22,
    0,
    0.02,
    0.04,
    -0.16,
    0.17,
    0.11,
    0.02,
    0.04,
    0.03,
    0.05,
    0.01,
    0.01,
    0.03,
    0.03,
    0.23,
    0.14,
    0.62,
    0.23
  ]
};

// All functions related to modal.
// This is a showModal function which shows modal based on given options as an argument.  
function showModal(content) {
  let modal = document.getElementById("modal_id");
  if (modal == null) { return; }
  modal.style = "display: block;";
  modal.innerHTML = content;
}

// This is closeModal function which closes modal and remove backdrop from body.
function closeModal() {
  let modal = document.getElementById("modal_id");
  if (modal == null) { return; }
  modal.style = "display: none;";
  modal.innerHTML = ``;
}

// This is closeModal background function which closes modal.
function closeModalBackground(e) {
  if (e.target.id != "modal_id") { return; }
  let modal = document.getElementById("modal_id");
  if (modal == null) { return; }
  modal.style = "display: none;";
  modal.innerHTML = ``;
}