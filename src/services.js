export async function getAllProducts() {
    return await fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.log(err))
}