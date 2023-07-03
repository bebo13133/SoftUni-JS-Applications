const url = "http://localhost:3030/jsonstore/collections/books";

const table = document.querySelector("tbody");
const form = document.querySelector("form");

const loadBtn = document.getElementById("loadBooks");
form.addEventListener("submit", createOrEditBook);

loadBtn.addEventListener("click", loadBooks);

async function createOrEditBook(e) {
  e.preventDefault();

  if (e.target.children[5].textContent === "Submit") {
    const data = new FormData(e.currentTarget);
    const author = data.get("author");
    const title = data.get("title");

    if (author == "" || title == "") {
      return;
    }

    const body = JSON.stringify({
      author,
      title,
    });

    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body,
    });
  } else if (e.target.children[5].textContent === "Save") {
    const body = JSON.stringify({
      author: form.children[4].value,
      title: form.children[2].value,
    });

    let el = [...document.querySelectorAll("tr")].find(
      (k) =>
        k.children[0].textContent == form.children[2].value ||
        k.children[1].textContent == form.children[4].value
    );

    await fetch(`${url}/${el.getAttribute("key")}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body,
    });

    form.children[0].textContent = "FORM";
    form.children[5].textContent = "Submit";
  }

  [...form.querySelectorAll("input")].forEach((i) => (i.value = ""));
}

async function loadBooks(e) {
  table.innerHTML = "";

  const response = await fetch(url);
  const data = await response.json();

  Object.entries(data).forEach(([key, info]) => {
    createTable([info.title, info.author], key);
  });
}

async function editBook(e) {
  form.children[0].textContent = "Edit FORM";
  form.children[2].value =
    e.currentTarget.parentNode.parentNode.children[0].textContent;
  form.children[4].value =
    e.currentTarget.parentNode.parentNode.children[1].textContent;
  form.children[5].textContent = "Save";
}

async function deleteBook(e) {
  const parent = e.target.parentNode.parentNode;

  await fetch(`${url}/${parent.getAttribute("key")}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  parent.remove();
}

function createTable(data, key) {
  const tr = createElements("tr");
  const btnEdit = createElements("button", "Edit");
  const btnDelete = createElements("button", "Delete");
  const tdBtns = createElements("td");

  btnEdit.addEventListener("click", editBook);
  btnDelete.addEventListener("click", deleteBook);

  data.forEach((e) => {
    const td = createElements("td", e);
    tr.append(td);
  });

  tdBtns.append(btnEdit, btnDelete);
  tr.append(tdBtns);
  tr.setAttribute("key", key);

  table.append(tr);
}

function createElements(el, text) {
  let element = document.createElement(el);

  if (text) {
    element.textContent = text;
  }

  return element;
}