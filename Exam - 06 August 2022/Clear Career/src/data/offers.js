import {post,get,del,put} from './api.js'

const endpoint={
    catalog: '/data/offers?sortBy=_createdOn%20desc',
    byId: '/data/offers/'
}


export async function getOffers(){
    return await get(endpoint.catalog)
}
export async function getById(id){
    return await get(endpoint.byId+id)
}

export async function createOffer(offer){
    return await post(endpoint.catalog,offer)
}
export async function deleteOffer(id){
    return await del(endpoint.byId+id)
}
export async function updateOffer(id,offer){
    return await put(endpoint.byId+id,offer)
}