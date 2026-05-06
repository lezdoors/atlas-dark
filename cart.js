// Cart logic for Perle de l'Atlas
// localStorage key: "perle-cart"
const CART_KEY = "perle-cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {}
  window.dispatchEvent(new Event("cart-updated"));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.product_id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      product_id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || "",
    });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter(i => i.product_id !== productId);
  saveCart(cart);
}

function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.product_id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  saveCart(cart);
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, i) => sum + (i.price * i.quantity), 0);
}

function clearCart() {
  saveCart([]);
}

window.Cart = {
  get: getCart,
  add: addToCart,
  remove: removeFromCart,
  updateQty: updateQuantity,
  count: getCartCount,
  total: getCartTotal,
  clear: clearCart,
  CART_KEY,
};
