import { getShoppingCart } from "../utilities/fakedb"

const cartProductLoader =async () => {
  const loadProducts = await fetch('http://localhost:4000/products')
  const products = await loadProducts.json()
  const storeCart = getShoppingCart()
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