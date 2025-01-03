const tabs_data = [
  {
    title: "Accordion 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe consequuntur labore omnis quasi, nam quas non eligendi eum adipisci beatae quos magni molestiae cum delectus! Mollitia repellat reprehenderit temporibus est, itaque, obcaecati voluptatem quisquam recusandae ipsam aliquam iste inventore dolorum incidunt veritatis dolore. Magnam cupiditate dolor aut voluptas eaque, omnis totam dolores laboriosam deserunt cumque necessitatibus, harum suscipit in quam quae, eum consequatur cum repellendus quisquam placeat qui. Sequi quibusdam inventore quis voluptatibus corrupti dolores sunt a quam, saepe ipsam magnam. Deserunt repellat praesentium rem voluptates libero dolorem! Et veniam libero id porro officiis pariatur deleniti minima qui non impedit.",
  },
  {
    title: "Accordion 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe consequuntur labore omnis quasi, nam quas non eligendi eum adipisci beatae quos magni molestiae cum delectus! Mollitia repellat reprehenderit temporibus est, itaque, obcaecati voluptatem quisquam recusandae ipsam aliquam iste inventore dolorum incidunt veritatis dolore. Magnam cupiditate dolor aut voluptas eaque, omnis totam dolores laboriosam deserunt cumque necessitatibus, harum suscipit in quam quae, eum consequatur cum repellendus quisquam placeat qui. Sequi quibusdam inventore quis voluptatibus corrupti dolores sunt a quam, saepe ipsam magnam. Deserunt repellat praesentium rem voluptates libero dolorem! Et veniam libero id porro officiis pariatur deleniti minima qui non impedit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe consequuntur labore omnis quasi, nam quas non eligendi eum adipisci beatae quos magni molestiae cum delectus! Mollitia repellat reprehenderit temporibus est, itaque, obcaecati voluptatem quisquam recusandae ipsam aliquam iste inventore dolorum incidunt veritatis dolore. Magnam cupiditate dolor aut voluptas eaque, omnis totam dolores laboriosam deserunt cumque necessitatibus, harum suscipit in quam quae, eum consequatur cum repellendus quisquam placeat qui. Sequi quibusdam inventore quis voluptatibus corrupti dolores sunt a quam, saepe ipsam magnam. Deserunt repellat praesentium rem voluptates libero dolorem! Et veniam libero id porro officiis pariatur deleniti minima qui non impedit.",
  },

  {
    title: "Accordion 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe consequuntur labore omnis quasi, nam quas non eligendi eum adipisci beatae quos magni molestiae cum delectus! Mollitia repellat reprehenderit temporibus est, itaque, obcaecati voluptatem quisquam recusandae ipsam aliquam iste inventore dolorum incidunt veritatis dolore. Magnam cupiditate dolor aut voluptas eaque, omnis totam dolores laboriosam deserunt cumque necessitatibus, harum suscipit in quam quae, eum consequatur cum repellendus quisquam placeat qui. Sequi quibusdam inventore quis voluptatibus corrupti dolores sunt a quam, saepe ipsam magnam. Deserunt repellat praesentium rem voluptates libero dolorem! Et veniam libero id porro officiis pariatur deleniti minima qui non impedit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe consequuntur labore omnis quasi, nam quas non eligendi eum adipisci beatae quos magni molestiae cum delectus! Mollitia repellat reprehenderit temporibus est, itaque, obcaecati voluptatem quisquam recusandae ipsam aliquam iste inventore dolorum incidunt veritatis dolore. Magnam cupiditate dolor aut voluptas eaque, omnis totam dolores laboriosam deserunt cumque necessitatibus, harum suscipit in quam quae, eum consequatur cum repellendus quisquam placeat qui. Sequi quibusdam inventore quis voluptatibus corrupti dolores sunt a quam, saepe ipsam magnam. Deserunt repellat praesentium rem voluptates libero dolorem! Et veniam libero id porro officiis pariatur deleniti minima qui non impedit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe consequuntur labore omnis quasi, nam quas non eligendi eum adipisci beatae quos magni molestiae cum delectus! Mollitia repellat reprehenderit temporibus est, itaque, obcaecati voluptatem quisquam recusandae ipsam aliquam iste inventore dolorum incidunt veritatis dolore. Magnam cupiditate dolor aut voluptas eaque, omnis totam dolores laboriosam deserunt cumque necessitatibus, harum suscipit in quam quae, eum consequatur cum repellendus quisquam placeat qui. Sequi quibusdam inventore quis voluptatibus corrupti dolores sunt a quam, saepe ipsam magnam. Deserunt repellat praesentium rem voluptates libero dolorem! Et veniam libero id porro officiis pariatur deleniti minima qui non impedit.",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const accordion_container = document.querySelector(".accordion-container");

  function renderAccordion() {
    tabs_data.forEach((element, index) => {
      const accordion_item = document.createElement("div");
      accordion_item.classList.add("accordion-item");

      const accordion_header = document.createElement("h2");
      accordion_header.classList.add("accordion-header");
      accordion_header.textContent = element.title;

      const accordion_content = document.createElement("div");
      accordion_content.classList.add("accordion-content");
      accordion_content.innerHTML = `<p>${element.content}</p>`;

      accordion_item.appendChild(accordion_header);
      accordion_item.appendChild(accordion_content);
      accordion_container.appendChild(accordion_item);

      if (index === 0) {
        accordion_item.classList.add("active");
      }
    });

    accordion_container.addEventListener("click", function (event) {
      const header_element =
        event.target.classList.contains("accordion-header");
      if (!header_element) return;

      const clicked_accordion_item = event.target.parentNode;
      const is_active = clicked_accordion_item.classList.contains("active");

      const accordion_items = document.querySelectorAll(".accordion-item");
      accordion_items.forEach((element) => {
        element.classList.remove("active");
      });

      if (!is_active) clicked_accordion_item.classList.add("active");
    });
  }

  renderAccordion();
});
