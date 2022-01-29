import { deleteCarById, getCarById } from '../api/data.js';
import {html} from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (car, isOwner, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${car.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        <div class="listings-buttons">
        ${ isOwner ? html`<a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${onDelete} class="button-list">Delete</a>` : null
        }
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const game = await getCarById(ctx.params.id);

    const userData = getUserData();
    const isOwner = userData && game._ownerId == userData.id;
    ctx.render(detailsTemplate(game, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this game forever?');

        if (choice) {
            await deleteCarById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}



