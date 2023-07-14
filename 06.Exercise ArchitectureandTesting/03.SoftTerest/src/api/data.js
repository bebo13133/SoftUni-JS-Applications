import * as api from './api.js'
const endpoints = {
    'ideas': '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'dataIdea': '/data/ideas',
    'getId':'/data/ideas/',
  "deleteById" : '/data/ideas/'
}

export async function getIdeas() {

    return api.get(endpoints.ideas)
}
export async function getId(id){
    return  api.get(endpoints.getId +id) 
}

export async function deleteById(id){

    return api.del(endpoints.deleteById+id)
}

export async function createIdea(data) {

    return api.post(endpoints.dataIdea, data)
}