document
  .getElementById("generateButton")
  .addEventListener("click", generateEncounter);
document.getElementById("clearButton").addEventListener("click", clearOutput);
document
  .getElementById("affiliationCategory")
  .addEventListener("change", updateAffiliationDetails);

document.getElementById("prRangeMin").addEventListener("input", function () {
  document.getElementById("prRangeMinValue").textContent = this.value;
});
document.getElementById("prRangeMax").addEventListener("input", function () {
  document.getElementById("prRangeMaxValue").textContent = this.value;
});

let mobData = [];
let critterData = [];
let affiliationsData = {};

fetch("jsons/mobs.json")
  .then((response) => response.json())
  .then((data) => {
    mobData = data.mobs;
    populateCategories("mobCategories", Object.keys(mobData));
  });

fetch("jsons/critters.json")
  .then((response) => response.json())
  .then((data) => {
    critterData = data.critters;
    populateCategories("critterCategories", Object.keys(critterData));
  });

fetch("jsons/affiliations.json")
  .then((response) => response.json())
  .then((data) => {
    affiliationsData = data.affiliations;
    populateAffiliationCategories(affiliationsData);
  });

function populateAffiliationCategories(affiliations) {
  const categorySelect = document.getElementById("affiliationCategory");

  for (const category in affiliations) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
  }
}

function populateCategories(containerId, categories) {
  const container = document.getElementById(containerId);
  categories.forEach((category) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = category;
    checkbox.name = containerId;
    checkbox.value = category;
    const label = document.createElement("label");
    label.htmlFor = category;
    label.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
}

function updateAffiliationDetails() {
  const category = document.getElementById("affiliationCategory").value;
  const detailSelect = document.getElementById("affiliationDetail");
  detailSelect.innerHTML = '<option value="all">All</option>';

  if (category !== "all" && category !== "none") {
    const affiliations = affiliationsData[category];
    affiliations.forEach((affiliation) => {
      const option = document.createElement("option");
      option.value = affiliation.id;
      option.textContent = affiliation.name;
      detailSelect.appendChild(option);
    });
  }
}

function generateEncounter() {
  const enemyCount = parseInt(document.getElementById("enemyCount").value);
  const prRangeMin = parseInt(document.getElementById("prRangeMin").value);
  const prRangeMax = parseInt(document.getElementById("prRangeMax").value);
  const affiliationCategory = document.getElementById(
    "affiliationCategory"
  ).value;
  const affiliationDetail = document.getElementById("affiliationDetail").value;

  let selectedCategories = getSelectedCategories("mobCategories");
  let selectedCritterCategories = getSelectedCategories("critterCategories");

  let mobs = [];
  if (selectedCategories.length > 0) {
    mobs = filterByCategoryAndPR(
      mobData,
      selectedCategories,
      prRangeMin,
      prRangeMax
    );
  }

  let critters = [];
  if (selectedCritterCategories.length > 0) {
    critters = filterByCategoryAndPR(
      critterData,
      selectedCritterCategories,
      prRangeMin,
      prRangeMax
    );
  }

  if (affiliationCategory !== "all") {
    mobs = filterByAffiliations(mobs, affiliationCategory, affiliationDetail);
  }

  const combinedData = [...mobs, ...critters];
  const selectedMobs = getRandomMobs(combinedData, enemyCount);
  displayMobs(selectedMobs);
}

function getSelectedCategories(containerId) {
  const checkboxes = document.querySelectorAll(
    `input[name=${containerId}]:checked`
  );
  return Array.from(checkboxes).map((checkbox) => checkbox.value);
}

function filterByCategoryAndPR(
  data,
  selectedCategories,
  prRangeMin,
  prRangeMax
) {
  let filteredData = [];
  selectedCategories.forEach((category) => {
    const categoryData = data[category].filter(
      (mob) => mob.PR >= prRangeMin && mob.PR <= prRangeMax
    );
    filteredData = filteredData.concat(categoryData);
  });
  return filteredData;
}

function filterByAffiliations(mobs, affiliationCategory, affiliationDetail) {
  let filteredMobs = mobs;
  if (affiliationCategory === "none") {
    filteredMobs = mobs.filter(
      (mob) => !mob.affiliations || mob.affiliations.length === 0
    );
  } else {
    filteredMobs = mobs.filter(
      (mob) =>
        mob.affiliations &&
        mob.affiliations.some((aff) => aff.startsWith(affiliationCategory))
    );
    if (affiliationDetail !== "all") {
      filteredMobs = filteredMobs.filter((mob) =>
        mob.affiliations.includes(`${affiliationCategory}.${affiliationDetail}`)
      );
    }
  }
  return filteredMobs;
}

function getRandomMobs(data, count) {
  let selectedMobs = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    selectedMobs.push(data[randomIndex]);
  }
  return selectedMobs;
}

function displayMobs(mobs) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  mobs.forEach((mob, index) => {
    const mobElement = document.createElement("div");
    mobElement.className = "mob";
    mobElement.innerHTML = `
            <h3>${mob.name} ${index + 1}</h3>
            <p><strong>Type:</strong> ${mob.type || "Unknown"}</p>
            <p><strong>PR:</strong> ${mob.PR}</p>
            <p><strong>Affiliations:</strong> ${
              mob.affiliations ? mob.affiliations.join(", ") : "None"
            }</p>
            <p><strong>Attributes:</strong> ${
              mob.attributes ? JSON.stringify(mob.attributes) : "None"
            }</p>
            <p><strong>Race:</strong> ${
              mob.race ? mob.race.metatype : "Unknown"
            }</p>
            <p><strong>Skills:</strong> ${
              mob.skills ? JSON.stringify(mob.skills) : "None"
            }</p>
            <p><strong>Gear:</strong> ${
              mob.gear ? JSON.stringify(mob.gear) : "None"
            }</p>
            <p><strong>Weapons:</strong> ${
              mob.weapons ? mob.weapons.join(", ") : "None"
            }</p>
            <p><strong>Abilities:</strong> ${
              mob.abilities ? mob.abilities.join(", ") : "None"
            }</p>
            <p><strong>Description:</strong> ${
              mob.description || "No description available"
            }</p>
        `;
    output.appendChild(mobElement);
  });
}

function clearOutput() {
  document.getElementById("output").innerHTML = "";
}
