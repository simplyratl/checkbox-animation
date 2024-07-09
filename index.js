import { Pane } from "https://cdn.skypack.dev/tweakpane";

const cuisines = [
  "Italian",
  "Chinese",
  "Japanese",
  "Mexican",
  "Indian",
  "French",
  "Thai",
  "Greek",
  "Spanish",
  "Lebanese",
  "Turkish",
  "Vietnamese",
  "Korean",
  "American",
  "Brazilian",
  "Moroccan",
  "Ethiopian",
  "Russian",
  "German",
  "British",
  "Caribbean",
  "Peruvian",
  "Argentine",
  "Malaysian",
  "Indonesian",
];

let selectedNumber = 20;

const config = {
  theme: "system",
  itemNumber: selectedNumber,
};

const ctrl = new Pane({
  title: "Config",
  expanded: true,
});

ctrl.addBinding(config, "theme", {
  label: "Theme",
  options: {
    System: "system",
    Light: "light",
    Dark: "dark",
  },
});

ctrl.addBinding(config, "itemNumber", {
  label: "Item Number",
  min: 1,
  max: cuisines.length,
  step: 1,
});

const update = () => {
  document.documentElement.dataset.theme = config.theme;
  selectedNumber = config.itemNumber;

  displayCuisines();
};

const sync = (event) => {
  if (
    !document.startViewTransition ||
    !event ||
    (event && event.target.controller.view.labelElement.innerText !== "Theme")
  )
    return update();
  document.startViewTransition(update);
};

sync();
ctrl.on("change", sync);

function displayCuisines() {
  const list = document.querySelector(".checkbox-list");
  console.log(list);

  for (let i = list.children.length - 1; i >= 0; i--) {
    list.removeChild(list.children[i]);
  }

  for (let i = 0; i < selectedNumber; i++) {
    const item = document.createElement("li");
    item.innerHTML = generateListItem(cuisines[i]);
    list.appendChild(item);
  }
}

function generateListItem(name) {
  return `
        <li>
          <label for="${name}">
            ${name}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 20 20"
            >
              <path
                fill="#fc813d"
                fill-rule="evenodd"
                d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16m3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79l-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089z"
                clip-rule="evenodd"
              />
            </svg>

            <input
              type="checkbox"
              id="${name}"
              name="${name}"
              value="${name}"
            />
          </label>
        </li>
  `;
}

document.querySelector(".reset-btn").addEventListener("click", () => {
  selectedNumber = 20;

  const list = document.querySelector(".checkbox-list");

  list.childNodes.forEach((item, index) => {
    const checkbox = item.querySelector("input[type='checkbox']");
    checkbox.checked = false;
  });
});
