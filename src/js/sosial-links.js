import * as template from "../js/template/sosial-links.hbs";
import sosialLinksList from "../js/template/links-data.json";

function createLinks(data) {
  const container = document.querySelector("#sosial-links");
  const markup = template(data);
  container.innerHTML = markup;
}

createLinks(sosialLinksList);
