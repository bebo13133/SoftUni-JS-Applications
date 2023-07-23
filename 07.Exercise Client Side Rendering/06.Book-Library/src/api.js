
const url = `http://localhost:3030/jsonstore/collections/books`

export async function getBooks(){
    const response = await fetch(url)
return await response.json()
}

export async function createBooks(books){
    const response = await fetch(url,{
        method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(books)
    })
    return await response.json()
}

export async function  updateBooks(book, id){
    const response = await fetch(`${url}/${id}`,{
        method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
    })
    return await response.json()
}

export async function deleteBooks(id){
    const response = await fetch(`${url}/${id}`,{
            method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
        })

}
export async function getBookId(id){
    const response = await fetch(`${url}/${id}`,{
            method: 'GET',
   
        })
return response.json()
}