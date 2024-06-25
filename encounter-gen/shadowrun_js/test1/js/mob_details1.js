document
  .getElementById("generateButton")
  .addEventListener("click", generateEncounter);
document.getElementById("clearButton").addEventListener("click", clearOutput);
document
  .getElementById("affiliationCategory")
  .addEventListener("change", updateAffiliationDetails);

fetch("jsons/affiliations.json")
  .then((response) => response.json())
  .then((data) => {
    populateAffiliationCategories(data.affiliations);
  });

fetch("jsons/mobs.json")
  .then((response) => response.json())
  .then((data) => {
    populateCheckboxOptions("mobCheckboxes", data.mobs);
  });

fetch("jsons/critters.json")
  .then((response) => response.json())
  .then((data) => {
    populateCheckboxOptions("critterCheckboxes", data.critters);
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

function updateAffiliationDetails() {
  const category = document.getElementById("affiliationCategory").value;
  const detailSelect = document.getElementById("affiliationDetail");
  detailSelect.innerHTML = '<option value="all">All</option>';

  if (category !== "all" && category !== "none") {
    fetch("jsons/affiliations.json")
      .then((response) => response.json())
      .then((data) => {
        const affiliations = data.affiliations[category];
        affiliations.forEach((affiliation) => {
          const option = document.createElement("option");
          option.value = affiliation.id;
          option.textContent = affiliation.name;
          detailSelect.appendChild(option);
        });
      });
  }
}

function generateEncounter() {
  const enemyCount = parseInt(document.getElementById("enemyCount").value);
  const prMinRange = parseInt(document.getElementById("prMinRange").value);
  const prMaxRange = parseInt(document.getElementById("prMaxRange").value);
  const prRange = prMaxRange - prMinRange;
  const affiliationCategory = document.getElementById(
    "affiliationCategory"
  ).value;
  const affiliationDetail = document.getElementById("affiliationDetail").value;
  const selectedMobCategories = getSelectedCheckboxValues("mobCheckboxes");
  const selectedCritterCategories =
    getSelectedCheckboxValues("critterCheckboxes");

  fetch("jsons/mobs.json")
    .then((response) => response.json())
    .then((mobData) => {
      fetch("jsons/critters.json")
        .then((response) => response.json())
        .then((critterData) => {
          const filteredMobs = filterMobs(
            mobData.mobs,
            prRange,
            affiliationCategory,
            affiliationDetail,
            selectedMobCategories
          );
          const filteredCritters = filterCritters(
            critterData.critters,
            prRange,
            selectedCritterCategories
          );
          const selectedMobs = getRandomObjects(filteredMobs, enemyCount);
          const selectedCritters = getRandomObjects(
            filteredCritters,
            enemyCount
          );
          const combinedEncounter = [...selectedMobs, ...selectedCritters];
          displayEncounter(combinedEncounter);
        });
    });
}

function filterMobs(
  mobs,
  prRange,
  affiliationCategory,
  affiliationDetail,
  selectedCategories
) {
  let allMobs = Object.values(mobs).flat();
  let filteredMobs = allMobs.filter((mob) => mob.PR <= prRange);

  if (affiliationCategory !== "all") {
    if (affiliationCategory === "none") {
      filteredMobs = filteredMobs.filter(
        (mob) => !mob.affiliations || mob.affiliations.length === 0
      );
    } else {
      filteredMobs = filteredMobs.filter(
        (mob) =>
          mob.affiliations &&
          mob.affiliations.some((aff) => aff.startsWith(affiliationCategory))
      );
      if (affiliationDetail !== "all") {
        filteredMobs = filteredMobs.filter((mob) =>
          mob.affiliations.includes(
            `${affiliationCategory}.${affiliationDetail}`
          )
        );
      }
    }
  }

  if (selectedCategories.length > 0) {
    filteredMobs = filteredMobs.filter((mob) =>
      selectedCategories.includes(mob.category)
    );
  }

  return filteredMobs;
}

function filterCritters(critters, prRange, selectedCategories) {
  let allCritters = Object.values(critters).flat();
  let filteredCritters = allCritters.filter((critter) => critter.PR <= prRange);

  if (selectedCategories.length > 0) {
    filteredCritters = filteredCritters.filter((critter) =>
      selectedCategories.includes(critter.category)
    );
  }

  return filteredCritters;
}

function getRandomObjects(objects, count) {
  let selectedObjects = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * objects.length);
    selectedObjects.push(objects[randomIndex]);
  }
  return selectedObjects;
}

function displayEncounter(encounter) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  if (!encounter || encounter.length === 0) {
    const noResultsElement = document.createElement("div");
    noResultsElement.textContent = "No entities found.";
    output.appendChild(noResultsElement);
    return;
  }

  encounter.forEach((entity, index) => {
    if (!entity) {
      console.error(`Encounter entity at index ${index} is undefined or null.`);
      return;
    }

    const entityElement = document.createElement("div");
    entityElement.className = "entity";
    entityElement.innerHTML = `
            <h3>${entity.name || "Unknown"} ${index + 1}</h3>
            <p><strong>Type:</strong> ${entity.type || "Unknown"}</p>
            <p><strong>PR:</strong> ${entity.PR || "Unknown"}</p>
            <p><strong>Affiliations:</strong> ${
              entity.affiliations ? entity.affiliations.join(", ") : "None"
            }</p>
            <p><strong>Attributes:</strong> ${JSON.stringify(
              entity.attributes || {}
            )}</p>
            <p><strong>Race:</strong> ${
              entity.race ? entity.race.metatype : "Unknown"
            }</p>
            <p><strong>Skills:</strong> ${JSON.stringify(
              entity.skills || {}
            )}</p>
            <p><strong>Gear:</strong> ${JSON.stringify(entity.gear || {})}</p>
            <p><strong>Weapons:</strong> ${
              entity.weapons ? entity.weapons.join(", ") : "None"
            }</p>
            <p><strong>Abilities:</strong> ${
              entity.abilities ? entity.abilities.join(", ") : "None"
            }</p>
            <p><strong>Description:</strong> ${
              entity.description || "No description available"
            }</p>
        `;
    output.appendChild(entityElement);
  });
}


function clearOutput() {
  document.getElementById("output").innerHTML = "";
}

function getSelectedCheckboxValues(checkboxGroupName) {
  const checkboxes = document.querySelectorAll(
    `#${checkboxGroupName} input[type="checkbox"]:checked`
  );
  let selectedValues = Array.from(checkboxes).map((checkbox) => checkbox.value);
  return selectedValues;
}

function populateCheckboxOptions(checkboxGroupName, items) {
  const checkboxesContainer = document.getElementById(checkboxGroupName);

  for (const category in items) {
    const checkboxDiv = document.createElement("div");
    checkboxDiv.innerHTML = `
            <input type="checkbox" id="${category}" name="${category}" value="${category}">
            <label for="${category}">${
      category.charAt(0).toUpperCase() + category.slice(1)
    }</label>
        `;
    checkboxesContainer.appendChild(checkboxDiv);
  }
}
