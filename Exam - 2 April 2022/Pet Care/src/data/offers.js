import {post,get,del,put} from './api.js'

const endpoint={
    pets: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    byId: '/data/pets/'
}


export async function getOffers(){
    return await get(endpoint.pets)
}
export async function getById(id){
    return await get(endpoint.byId+id)
}

export async function createOffer(offer){
    return await post(endpoint.pets,offer)
}
export async function deleteOffer(id){
    return await del(endpoint.byId+id)
}
export async function updateOffer(id,offer){
    return await put(endpoint.byId+id,offer)
}