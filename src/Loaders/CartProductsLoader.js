import { getShoppingCart } from "../utilities/fakedb"

const cartProductLoader =async () => {
  const storeCart = getShoppingCart()
  const ids = Object.keys(storeCart)
  // console.log(ids);
  const loadProducts = await fetch('https://simple-emajohn-site-server.vercel.app/productById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ids)
  })
  const products = await loadProducts.json()
  console.log('products',products);
  const saveCart = []
  for (const id in storeCart) {
    // console.log('storeCArt:',storeCart);
    const addedProduct = products.find(pd=>pd._id==id);
    if (addedProduct) {
      // console.log('addedProducts',addedProduct);
      const quantity = storeCart[id]
      addedProduct.quantity = quantity
      saveCart.push(addedProduct)
    }
  }
  return saveCart
}

export default cartProductLoader