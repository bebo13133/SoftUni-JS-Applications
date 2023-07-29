import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSubmitHandler } from "../util.js"
import { updateOffer } from "../data/offers.js"
import { getById } from "../data/offers.js"

const editTemplate = (card, onEdit) => html`
    <section id="editPage">
            <form class="editForm" @submit=${onEdit}>
                <img src="./images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" .value="${card.name}">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" .value="${card.breed}">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" .value="${card.age} years">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" .value="${card.weight}kg">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" .value="${card.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>`
export async function editPage(ctx) {
  const id = ctx.params.id
  const card = await getById(id)

  ctx.render(editTemplate(card, createSubmitHandler(onEdit)))


  async function onEdit({ name,
    breed,
    age,
    weight,
    image
  }) {
    if ([name,
      breed,
      age,
      weight,
      image
    ].some(x => x == "")) {
      return alert("Please fill all fields!")
    }
    await updateOffer(id, {
      name,
      breed,
      age,
      weight,
      image
    })
    ctx.page.redirect(`/catalog/${id}`)
  }
}