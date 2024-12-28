const tabs_data = [
  {
    id: 1,
    title: "Tab 01",
    content: "Default Tab content for tab 01",
  },
  {
    id: 2,
    title: "Tab 02",
    content: "Default Tab content for tab 02",
  },
  {
    id: 3,
    title: "Tab 03",
    content: "Default Tab content for tab 03",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const tabs_btn_container = document.querySelector(".tabs-btn-container");
  const tabs_content_container = document.querySelector(
    ".tabs-content-container"
  );
  let active_tab_id = tabs_data[0].id;

  function renderTabs() {
    tabs_data.forEach((element) => {
      const tab_btn = document.createElement("button");
      tab_btn.textContent = element.title;
      tab_btn.classList.add("tab-btn");
      tab_btn.setAttribute("data-tab-btn", element.id);
      tabs_btn_container.appendChild(tab_btn);

      const tab_content = document.createElement("div");
      tab_content.innerHTML = `<h3>${element.title}</h3><p>${element.content}</p>`;
      tab_content.classList.add(`tab-content`);
      tab_content.setAttribute("data-tab-content", element.id);
      tabs_content_container.appendChild(tab_content);
    });

    tabs_btn_container.addEventListener("click", function (event) {
      const target = event.target;
      if (target.tagName === "BUTTON") {
        // if (target.matches(".tab-btn")) {
        //   console.log("matches fn");
        // }
        if (target.className.includes("tab-btn")) {
          const tab_id = target.getAttribute("data-tab-btn");
          if (tab_id != active_tab_id) {
            console.log(tab_id);
            active_tab_id = tab_id;
            showTab(tab_id);
          }
        }
      }
    });

    function showTab(tab_id) {
      const tab_contents = document.querySelectorAll(".tab-content");
      const tab_btns = document.querySelectorAll(".tab-btn");

      tab_contents.forEach((element) => element.classList.remove("active"));
      tab_btns.forEach((element) => element.classList.remove("active"));

      document
        .querySelector(`button[data-tab-btn="${tab_id}"]`)
        .classList.add("active");
      document
        .querySelector(`div[data-tab-content="${tab_id}"]`)
        .classList.add("active");
    }
  }

  renderTabs();
  document
    .querySelector(`button[data-tab-btn="${active_tab_id}"]`)
    .classList.add("active");
  document
    .querySelector(`div[data-tab-content="${active_tab_id}"]`)
    .classList.add("active");
});
