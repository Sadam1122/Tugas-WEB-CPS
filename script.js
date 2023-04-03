// Dark theme localstorage
const lightIcon = document.querySelector(".swap-on");
const darkIcon = document.querySelector(".swap-off");
const toggle = document.getElementById("toggleTheme");

const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
    toggle.checked = true;
    return;
  }
  toggle.checked = false;
};

const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    return;
  }
  document.documentElement.classList.add("dark");
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
};

lightIcon.addEventListener("click", () => {
  themeSwitch();
});

darkIcon.addEventListener("click", () => {
  themeSwitch();
});

themeCheck();

// api url
const api_url = "https://api.thingspeak.com/channels/2055296/feeds.json?api_key=CER53Q68K1E10I7X&results=1";
// masukan url sesuai dengan format <ChannelID>, <ReadAPIKeys> yang ada di Thingspeak, tanpa menggunakan < >

setInterval(() => {
  fetch(api_url)
    .then((hasil) => hasil.json())
    .then((res) => {
      var field = JSON.stringify(res.feeds[0]);
      var obj = JSON.parse(field);
      document.getElementById("AX").innerHTML = obj.field1;
      document.getElementById("AY").innerHTML = obj.field2;
      document.getElementById("AZ").innerHTML = obj.field3;
      document.getElementById("RX").innerHTML = obj.field4;
      document.getElementById("RY").innerHTML = obj.field5;
      document.getElementById("RZ").innerHTML = obj.field6;
      document.getElementById("C").innerHTML = obj.field7;
    });
}, 1000);
