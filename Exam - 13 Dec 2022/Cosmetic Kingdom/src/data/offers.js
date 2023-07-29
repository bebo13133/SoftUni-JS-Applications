import {post,get,del,put} from './api.js'

const endpoint={
    product: '/data/products?sortBy=_createdOn%20desc',
    byId: '/data/products/',
    //  byOwner: ownerId =>`/data/books?where=_ownerId%3D%22${ownerId}%22&sortBy=_createdOn%20desc`
}
export async function getOwnerBook(ownerId){
    return await get(endpoint.byOwner(ownerId))
}

export async function getOffers(){
    return await get(endpoint.product)
}
export async function getById(id){
    return await get(endpoint.byId+id)
}

export async function createOffer(product){
    return await post('/data/products',product) // Преправих адреса само зарди задачата - ориганалният вариант е return await post(endpoint.book,book)
}
export async function deleteOffer(id){
    return await del(endpoint.byId+id)
}
export async function updateOffer(id,product){
    return await put(endpoint.byId+id,product)
}