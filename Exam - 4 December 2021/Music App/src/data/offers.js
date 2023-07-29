import {post,get,del,put} from './api.js'

const endpoint={
    albums: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    byId: '/data/albums/',
    search: '/data/albums?where=name'
}


export async function getOffers(){
    return await get(endpoint.albums)
}
export async function getById(id){
    return await get(endpoint.byId+id)
}

export async function createOffer(offer){
    return await post("/data/albums",offer)
}
export async function deleteOffer(id){
    return await del(endpoint.byId+id)
}
export async function updateOffer(id,offer){
    return await put(endpoint.byId+id,offer)
}
///data/albums?where=name%20LIKE%20%22${query}%22
export async function searchAlbum(query){
    return get(`/data/albums?where=name%20LIKE%20%22${query}%22`)
}
