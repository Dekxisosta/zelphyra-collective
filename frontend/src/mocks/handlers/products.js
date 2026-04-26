import { http, HttpResponse } from "msw"
import products from "../json/products.json"
import product_images from "../json/product_images.json"
import product_inventory from "../json/product_inventory.json"
import pills from "../json/pills.json"
import categories from "../json/categories.json"

export const productHandlers = [
  // GET /api/products
  http.get("/api/products", ({ request }) => {
    const url      = new URL(request.url)
    const category = url.searchParams.get("category")
    const pill     = url.searchParams.get("pill")
    const search   = url.searchParams.get("search")
    const page     = parseInt(url.searchParams.get("page") ?? "1")
    const limit    = parseInt(url.searchParams.get("limit") ?? "100")
    console.log(products);
    
    let result = products.map(p => ({
      ...p,
      pill: pills.find(pl => pl.id === p.pill_id) ?? null,
      images: product_images.filter(img => img.product_id === p.id),
      inventory: product_inventory.find(inv => inv.product_id === p.id),
    }))
    

    if (category && category !== "all") {
      const matched = categories.find(c => c.slug === category)
      if (matched) result = result.filter(p => p.category_id === matched.id)
    }
    if (pill)   result = result.filter(p => p.pill?.label === pill)
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

    const totalPages = Math.ceil(result.length / limit)
    const paginated  = result.slice((page - 1) * limit, page * limit)
    
    return HttpResponse.json({ products: paginated, totalPages, total: result.length })
  }),

  // GET /api/products/featured
  http.get("/api/products/featured", () => {
    const result = products
      .filter(p => p.pill_id !== null)  // remove .slice(0, 6)
      .map(p => ({
        ...p,
        pill: pills.find(pl => pl.id === p.pill_id) ?? null,
        images: product_images.filter(img => img.product_id === p.id),
        inventory: product_inventory.find(inv => inv.product_id === p.id),
      }))

    return HttpResponse.json(result)
  }),

  // GET /api/products/:id
  http.get("/api/products/:id", ({ params }) => {
    const product = products.find(p => p.id === parseInt(params.id))
    if (!product) return HttpResponse.json({ message: "Not found" }, { status: 404 })

    return HttpResponse.json({
      ...product,
      pill: pills.find(pl => pl.id === product.pill_id) ?? null,
      images: product_images.filter(img => img.product_id === product.id),
      inventory: product_inventory.find(inv => inv.product_id === product.id),
    })
  }),
]