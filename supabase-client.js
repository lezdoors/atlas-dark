// Supabase client for Perle de l'Atlas
const SUPABASE_URL = "https://unsenfjlqqqjibbnbpur.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc2VuZmpscXFxamliYm5icHVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzIxNTcsImV4cCI6MjA5MjQ0ODE1N30.6wjQiZvYS_SrqOqw0fuDWQ5I_uVZEeNDGxJr-PknrXc";

async function sbFetch(path, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    ...options.headers,
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
  return res.json();
}

async function fetchProducts(category) {
  let path = "products?select=*&order=title.asc";
  if (category && category !== "all") {
    path += `&category=eq.${category}`;
  }
  return sbFetch(path);
}

async function fetchProduct(slug) {
  const data = await sbFetch(`products?slug=eq.${slug}&select=*`);
  return data[0] || null;
}

async function fetchFeaturedProducts() {
  return sbFetch("products?featured=eq.true&select=*&order=title.asc");
}

async function fetchCraftsmen() {
  return sbFetch("craftsmen?select=*&order=name.asc");
}

async function fetchOrderBySession(sessionId) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/get-order?session_id=${encodeURIComponent(sessionId)}`, {
    headers: {
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.order || null;
}

async function createCheckout(items, successUrl, cancelUrl) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: items.map(i => ({
        product_id: i.product_id,
        quantity: i.quantity,
      })),
      success_url: successUrl,
      cancel_url: cancelUrl,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Checkout error: ${res.status}`);
  }
  return res.json();
}

// Format price from cents to display string
function formatPrice(cents) {
  return "$" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Get product image URL — images stored as relative paths in DB (e.g. /products/slug-01.webp)
function productImageUrl(imagePath) {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath;
  return `/${imagePath}`;
}

window.SB = {
  fetchProducts,
  fetchProduct,
  fetchFeaturedProducts,
  fetchCraftsmen,
  fetchOrderBySession,
  createCheckout,
  formatPrice,
  productImageUrl,
  SUPABASE_URL,
};
