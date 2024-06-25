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
  const prRange = parseInt(document.getElementById("prRange").value);
  const affiliationCategory = document.getElementById(
    "affiliationCategory"
  ).value;
  const affiliationDetail = document.getElementById("affiliationDetail").value;

  fetch("jsons/mobs.json")
    .then((response) => response.json())
    .then((data) => {
        let allMobs = Object.values(data.mobs).flat();
        let mobs = allMobs.filter((mob) => mob.PR <= prRange);

      if (affiliationCategory !== "all") {
        if (affiliationCategory === "none") {
          mobs = mobs.filter(
            (mob) => !mob.affiliations || mob.affiliations.length === 0
          );
        } else {
          mobs = mobs.filter(
            (mob) =>
              mob.affiliations &&
              mob.affiliations.some((aff) =>
                aff.startsWith(affiliationCategory)
              )
          );
          if (affiliationDetail !== "all") {
            mobs = mobs.filter((mob) =>
              mob.affiliations.includes(
                `${affiliationCategory}.${affiliationDetail}`
              )
            );
          }
        }
      }

      const selectedMobs = getRandomMobs(mobs, enemyCount);
      displayMobs(selectedMobs);
    });
}

function getRandomMobs(mobs, count) {
  let selectedMobs = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * mobs.length);
    selectedMobs.push(mobs[randomIndex]);
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
            <p><strong>Type:</strong> ${mob.type}</p>
            <p><strong>PR:</strong> ${mob.PR}</p>
            <p><strong>Affiliations:</strong> ${
              mob.affiliations ? mob.affiliations.join(", ") : "None"
            }</p>
            <p><strong>Attributes:</strong> ${JSON.stringify(
              mob.attributes
            )}</p>
            <p><strong>Race:</strong> ${mob.race.metatype}</p>
            <p><strong>Skills:</strong> ${JSON.stringify(mob.skills)}</p>
            <p><strong>Gear:</strong> ${JSON.stringify(mob.gear)}</p>
            <p><strong>Weapons:</strong> ${mob.weapons.join(", ")}</p>
            <p><strong>Abilities:</strong> ${mob.abilities.join(", ")}</p>
            <p><strong>Description:</strong> ${mob.description}</p>
        `;
    output.appendChild(mobElement);
  });
}

function clearOutput() {
  document.getElementById("output").innerHTML = "";
}
