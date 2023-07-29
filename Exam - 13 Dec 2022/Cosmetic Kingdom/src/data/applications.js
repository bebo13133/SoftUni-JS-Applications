import { post,get } from "./api.js";

const endpoint = {
    application: '/data/bought',
    byId: productId => `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    byIdAndUserId: (productId,userId) => `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}


export async function getBook(productId) {
    return post(endpoint.application, { productId })
}
export async function getApplication(productId){
    return get(endpoint.byId(productId))
}
export async function getUserApplication(productId, userId){
    return get(endpoint.byIdAndUserId(productId,userId))
}