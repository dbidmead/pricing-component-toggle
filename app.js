const data = await fetch("./data.json").then((res) => res.json());

const basicDisplay = {
  id: "basic",
  price: document.querySelector("#basic-price-display"),
  storage: document.querySelector("#basic-storage-display"),
  users: document.querySelector("#basic-users-display"),
  sendLimit: document.querySelector("#basic-sendLimit-display"),
};

const professionalDisplay = {
  id: "professional",
  price: document.querySelector("#professional-price-display"),
  storage: document.querySelector("#professional-storage-display"),
  users: document.querySelector("#professional-users-display"),
  sendLimit: document.querySelector("#professional-sendLimit-display"),
};

const masterDisplay = {
  id: "master",
  price: document.querySelector("#master-price-display"),
  storage: document.querySelector("#master-storage-display"),
  users: document.querySelector("#master-users-display"),
  sendLimit: document.querySelector("#master-sendLimit-display"),
};

const displays = [basicDisplay, professionalDisplay, masterDisplay];
displays.forEach((display) => populateData(display));

const toggle = document.querySelector(".toggle");
if (localStorage.getItem("state")) {
  if (localStorage.getItem("state") === "monthly") {
    toggle.classList.add("toggled");
  }
}
toggle.addEventListener("click", () => {
  toggle.classList.toggle("toggled");
  let animation = toggle.classList.contains("toggled")
    ? "slide-right"
    : "slide-left";
  toggle.firstElementChild.classList.add(animation);
  toggle.firstElementChild.addEventListener("animationend", () => {
    toggle.firstElementChild.classList.remove(animation);
  });
  localStorage.setItem(
    "state",
    toggle.classList.contains("toggled") ? "monthly" : "annually"
  );
  displays.forEach((display) => populateData(display));
});

function populateData(display) {
  let isMonthly = localStorage.getItem("state")
    ? localStorage.getItem("state") === "monthly"
      ? true
      : false
    : false;
  Object.keys(data).forEach((key) => {
    if (key === display.id) {
      display.price.textContent = isMonthly
        ? data[key].monthly
        : data[key].annually;
      display.storage.textContent = data[key].storage + " Storage";
      display.users.textContent = data[key].users + " Users Allowed";
      display.sendLimit.textContent = "Send up to " + data[key].sendLimit;
    }
  });
}
