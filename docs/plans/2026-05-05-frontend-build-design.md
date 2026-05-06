# Perle de l'Atlas — Frontend Build Design

**Date**: 2026-05-05
**Status**: Approved (user gave full autonomy)

## Architecture

Keep the existing React CDN + separate HTML files approach. No build step.

- React 18.3.1 via CDN (UMD)
- Babel standalone for JSX
- Supabase JS client via CDN
- Vercel deployment (vercel.json already exists)
- Separate HTML files, shared.js for common components

## Backend

- Supabase project: `unsenfjlqqqjibbnbpur`
- 8 products, 3 craftsmen
- Edge functions: create-checkout, stripe-webhook, admin-auth, create-order
- CORS: wide open (*)
- Prices in USD cents (divide by 100 for display)

## Files to Create/Modify

### New Files
- `supabase-client.js` — Supabase init + query helpers
- `cart.js` — localStorage cart logic (key: `perle-cart`)
- `success.html` — Checkout confirmation page
- `about.html` — Brand story + craftsmen profiles

### Files to Rebuild
- `index.html` — Homepage with hero animation, featured products, brand story
- `collection.html` — Category filters + product grid from Supabase
- `product.html` — PDP with gallery, specs, add-to-cart, related products
- `cart.html` — Cart page with quantity controls + Stripe checkout

### Files to Modify
- `shared.js` — Update Nav cart count (dynamic from localStorage), add cart helpers
- `styles.css` — Add cart/success page styles
- `vercel.json` — Update routes for new pages

### Files to Keep As-Is
- `hero-prototype.html` — Reference only (hero code moves into index.html)
- `media/` — All existing assets

### Files to Remove/Deprecate
- `products.js` — Replaced by Supabase queries
- `poufs.html`, `lights.html`, `editions.html`, `matter.html` — Merged into collection.html with category filters
- `search.html`, `account.html`, `commissions.html`, `journal.html` — Not needed for MVP launch

## Product Image Strategy

Product images referenced in Supabase as `/products/{slug}-01.webp`. These need to exist at that path on the frontend. Copy/organize from existing `media/products/` directory to root-level `products/` directory, or set up a Vercel rewrite.

## Page Specifications

### 1. Homepage (index.html)
- Hero: breeze animation from hero-prototype.html
- Featured products grid (4-5 items, `featured=true` from Supabase)
- Brand story section with lifestyle images
- Craftsmen teaser (link to about page)

### 2. Collection (collection.html)
- Category filter bar: All, Poufs, Tables, Lighting, Furniture
- Product grid (responsive: 4→3→2→1 columns)
- Each card: image, hover alt image, title, price
- Live queries from Supabase

### 3. Product Detail (product.html)
- Image gallery (4 thumbnails, main image swap)
- Title, description, price ($USD)
- Materials, dimensions, craftsman
- Add to cart button
- Related products (same category)

### 4. Cart (cart.html)
- Items from localStorage `perle-cart`
- Quantity +/- controls
- Remove item
- Subtotal, total
- "Proceed to Checkout" → POST to create-checkout → redirect to Stripe

### 5. Success (success.html)
- "Thank you for your order"
- Order number if available (query by session_id)
- Link back to collection

### 6. About (about.html)
- Brand story
- Craftsmen profiles from Supabase
- Workshop/showroom images

## Cart Data Shape

```js
// localStorage key: "perle-cart"
[
  {
    product_id: "uuid",
    title: "Cognac Leather Pouf",
    slug: "cognac-leather-pouf",
    price: 34900,        // cents
    quantity: 1,
    image: "/products/cognac-leather-pouf-01.webp"
  }
]
```

## Build Sequence

1. supabase-client.js + cart.js (foundation)
2. shared.js updates (Nav cart count, cart helpers)
3. collection.html (product grid from Supabase)
4. product.html (PDP with add-to-cart)
5. cart.html (cart page with checkout)
6. success.html (confirmation)
7. index.html (homepage with hero animation)
8. about.html (brand + craftsmen)
9. Product images → /products/ directory
10. styles.css updates
11. vercel.json routing
12. Test full flow
