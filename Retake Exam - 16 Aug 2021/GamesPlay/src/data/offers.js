import {post,get,del,put} from './api.js'

const endpoint={
    fruits: '/data/games?sortBy=_createdOn%20desc',
    byId: '/data/games/',
    fruit: '/data/games',
    games: `/data/games?sortBy=_createdOn%20desc&distinct=category`
}


export async function getOffers(){
    return await get(endpoint.fruits)
}
export async function getHomeGames(){
    return await get(endpoint.games)
}
export async function getById(id){
    return await get(endpoint.byId+id)
}

export async function createOffer(fruit){
    return await post(endpoint.fruit,fruit)
}
export async function deleteOffer(id){
    return await del(endpoint.byId+id)
}
export async function updateOffer(id,fruit){
    return await put(endpoint.byId+id,fruit)
}
export async function searchAlbum(query){
    return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`)
}