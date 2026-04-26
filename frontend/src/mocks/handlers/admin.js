// mocks/handlers/admin.js
import { http, HttpResponse } from "msw";
import orders from "../json/orders.json";
import order_items from "../json/order_items.json";
import payments from "../json/payments.json";
import products from "../json/products.json";
import product_inventory from "../json/product_inventory.json";
import product_images from "../json/product_images.json";
import pills from "../json/pills.json";
import users from "../json/users.json";
import cart from "../json/cart.json";
import cart_items from "../json/cart_items.json";
import user_images from "../json/user_images.json";

export const adminHandlers = [

  // GET /api/admin/stats
  http.get("/api/admin/stats", () => {
    const totalRevenue   = payments.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0)
    const totalOrders    = orders.length
    const totalCustomers = users.filter(u => u.role === "user").length
    const pendingOrders  = orders.filter(o => o.status === "pending").length

    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map(o => ({
        ...o,
        items:   order_items.filter(i => i.order_id === o.id),
        payment: payments.find(p => p.order_id === o.id) ?? null,
      }))

    const topProducts = products
      .map(p => ({ ...p, inventory: product_inventory.find(i => i.product_id === p.id) }))
      .sort((a, b) => (b.inventory?.sold ?? 0) - (a.inventory?.sold ?? 0))
      .slice(0, 5)

    const paymentBreakdown = ["completed", "pending", "failed", "refunded"].map(status => ({
      status,
      count: payments.filter(p => p.status === status).length,
      total: payments.filter(p => p.status === status).reduce((s, p) => s + p.amount, 0),
    }))

    return HttpResponse.json({ totalRevenue, totalOrders, totalCustomers, pendingOrders, recentOrders, topProducts, paymentBreakdown })
  }),

  // GET /api/admin/orders
  http.get("/api/admin/orders", ({ request }) => {
    const url    = new URL(request.url)
    const status = url.searchParams.get("status")
    const search = url.searchParams.get("search")
    const page   = parseInt(url.searchParams.get("page") ?? "1")
    const limit  = parseInt(url.searchParams.get("limit") ?? "10")

    let result = orders.map(o => ({
      ...o,
      items:   order_items.filter(i => i.order_id === o.id),
      payment: payments.find(p => p.order_id === o.id) ?? null,
    }))

    if (status) result = result.filter(o => o.status === status)
    if (search) result = result.filter(o =>
      o.shipping_name.toLowerCase().includes(search.toLowerCase()) ||
      String(o.id).includes(search)
    )

    result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    const totalPages = Math.ceil(result.length / limit)
    const paginated  = result.slice((page - 1) * limit, page * limit)

    return HttpResponse.json({ orders: paginated, totalPages, total: result.length })
  }),

  // PATCH /api/admin/orders/:id
  http.patch("/api/admin/orders/:id", async ({ params, request }) => {
    const body  = await request.json()
    const order = orders.find(o => o.id === parseInt(params.id))
    if (!order) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    Object.assign(order, body)
    return HttpResponse.json(order)
  }),

  // GET /api/admin/payments
  http.get("/api/admin/payments", ({ request }) => {
    const url    = new URL(request.url)
    const status = url.searchParams.get("status")
    const method = url.searchParams.get("method")
    const page   = parseInt(url.searchParams.get("page") ?? "1")
    const limit  = parseInt(url.searchParams.get("limit") ?? "10")

    let result = payments.map(p => {
        const order    = orders.find(o => o.id === p.order_id) ?? null
        const customer = order ? (users.find(u => u.id === order.user_id) ?? null) : null
        return {
            ...p,
            order,
            customerName:  customer?.name  ?? null,
            customerEmail: customer?.email ?? null,
        }
    })

    if (status) result = result.filter(p => p.status === status)
    if (method) result = result.filter(p => p.method === method)

    result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    const totalPages = Math.ceil(result.length / limit)
    const paginated  = result.slice((page - 1) * limit, page * limit)

    return HttpResponse.json({ payments: paginated, totalPages, total: result.length })
  }),

  // GET /api/admin/inventory
  http.get("/api/admin/inventory", ({ request }) => {
    const url    = new URL(request.url)
    const search = url.searchParams.get("search")
    const low    = url.searchParams.get("low") // low stock filter

    let result = products.map(p => ({
      ...p,
      pill:      pills.find(pl => pl.id === p.pill_id) ?? null,
      images:    product_images.filter(img => img.product_id === p.id),
      inventory: product_inventory.find(inv => inv.product_id === p.id),
    }))

    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.includes(search))
    if (low === "true") result = result.filter(p => (p.inventory?.stock ?? 0) < 10)

    result = [...result].sort((a, b) => (a.inventory?.stock ?? 0) - (b.inventory?.stock ?? 0))

    return HttpResponse.json(result)
  }),

  // PATCH /api/admin/inventory/:productId
  http.patch("/api/admin/inventory/:productId", async ({ params, request }) => {
    const body = await request.json()
    const inv  = product_inventory.find(i => i.product_id === parseInt(params.productId))
    if (!inv) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    Object.assign(inv, body)
    return HttpResponse.json(inv)
  }),

  // GET /api/admin/customers
  http.get("/api/admin/customers", ({ request }) => {
    const url    = new URL(request.url)
    const search = url.searchParams.get("search")
    const page   = parseInt(url.searchParams.get("page") ?? "1")
    const limit  = parseInt(url.searchParams.get("limit") ?? "10")
    
    let result = users
        .filter(u => u.role === "user")
        .map(u => {
        const userImage = user_images.find(ui => ui.user_id === u.id)
        return {
            ...u,
            avatar_id:  userImage?.avatar_id ?? null,
            orderCount: orders.filter(o => o.user_id === u.id).length,
            totalSpent: payments
            .filter(p => {
                const order = orders.find(o => o.id === p.order_id)
                return order?.user_id === u.id && p.status === "completed"
            })
            .reduce((s, p) => s + p.amount, 0),
        }
        })
    
    if (search) result = result.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    
    const totalPages = Math.ceil(result.length / limit)
    const paginated  = result.slice((page - 1) * limit, page * limit)
    
    return HttpResponse.json({ customers: paginated, totalPages, total: result.length })
    }),


  // GET /api/admin/order-history
  http.get("/api/admin/order-history", ({ request }) => {
    const url     = new URL(request.url)
    const user_id = url.searchParams.get("user_id")
    const page    = parseInt(url.searchParams.get("page") ?? "1")
    const limit   = parseInt(url.searchParams.get("limit") ?? "10")

    let result = orders.map(o => ({
      ...o,
      items:    order_items.filter(i => i.order_id === o.id),
      payment:  payments.find(p => p.order_id === o.id) ?? null,
      customer: users.find(u => u.id === o.user_id) ?? null,
    }))

    if (user_id) result = result.filter(o => o.user_id === user_id)

    result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    const totalPages = Math.ceil(result.length / limit)
    const paginated  = result.slice((page - 1) * limit, page * limit)

    return HttpResponse.json({ orders: paginated, totalPages, total: result.length })
  }),

  // GET /api/admin/reports
  http.get("/api/admin/reports", () => {
    const completedPayments = payments.filter(p => p.status === "completed")

    const revenueByMonth = completedPayments.reduce((acc, p) => {
      const month = new Date(p.paid_at ?? p.created_at).toLocaleString("en-PH", { month: "short", year: "numeric" })
      acc[month] = (acc[month] ?? 0) + p.amount
      return acc
    }, {})

    const revenueByMethod = ["cod", "gcash", "card", "paypal"].map(method => ({
      method,
      count:  completedPayments.filter(p => p.method === method).length,
      total:  completedPayments.filter(p => p.method === method).reduce((s, p) => s + p.amount, 0),
    }))

    const topProducts = products
      .map(p => ({ ...p, inventory: product_inventory.find(i => i.product_id === p.id) }))
      .sort((a, b) => (b.inventory?.sold ?? 0) - (a.inventory?.sold ?? 0))
      .slice(0, 5)

    const ordersByStatus = ["pending", "paid", "shipped", "completed", "cancelled"].map(status => ({
      status,
      count: orders.filter(o => o.status === status).length,
    }))

    return HttpResponse.json({
      totalRevenue:    completedPayments.reduce((s, p) => s + p.amount, 0),
      totalOrders:     orders.length,
      totalCustomers:  users.filter(u => u.role === "user").length,
      revenueByMonth,
      revenueByMethod,
      topProducts,
      ordersByStatus,
    })
  }),

  // GET /api/admin/products
  http.get("/api/admin/products", ({ request }) => {
    const url      = new URL(request.url)
    const search   = url.searchParams.get("search")
    const category = url.searchParams.get("category")
    const page     = parseInt(url.searchParams.get("page") ?? "1")
    const limit    = parseInt(url.searchParams.get("limit") ?? "10")

    let result = products.map(p => ({
      ...p,
      pill:      pills.find(pl => pl.id === p.pill_id) ?? null,
      images:    product_images.filter(img => img.product_id === p.id),
      inventory: product_inventory.find(inv => inv.product_id === p.id),
    }))

    if (search)   result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.includes(search))
    if (category) result = result.filter(p => p.category_id === parseInt(category))

    const totalPages = Math.ceil(result.length / limit)
    const paginated  = result.slice((page - 1) * limit, page * limit)

    return HttpResponse.json({ products: paginated, totalPages, total: result.length })
  }),

  // PATCH /api/admin/products/:id
  http.patch("/api/admin/products/:id", async ({ params, request }) => {
    const body    = await request.json()
    const product = products.find(p => p.id === parseInt(params.id))
    if (!product) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    Object.assign(product, body)
    return HttpResponse.json(product)
  }),

  // DELETE /api/admin/products/:id
  http.delete("/api/admin/products/:id", ({ params }) => {
    const idx = products.findIndex(p => p.id === parseInt(params.id))
    if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    products.splice(idx, 1)
    return HttpResponse.json({ message: "Deleted" })
  }),
  // POST /api/admin/products/:id/images
http.post("/api/admin/products/:id/images", async ({ params, request }) => {
  const body = await request.json() // { url, is_primary, is_hover, sort_order }
  const productId = parseInt(params.id)

  // if new image is primary, unset existing primary
  if (body.is_primary) {
    product_images
      .filter(img => img.product_id === productId)
      .forEach(img => { img.is_primary = false })
  }

  const newImage = {
    id: product_images.length + 1,
    product_id: productId,
    is_primary: false,
    is_hover: false,
    sort_order: product_images.filter(img => img.product_id === productId).length,
    created_at: new Date().toISOString(),
    ...body,
  }
    product_images.push(newImage)
    return HttpResponse.json(newImage, { status: 201 })
    }),

    // DELETE /api/admin/products/:id/images/:imageId
    http.delete("/api/admin/products/:id/images/:imageId", ({ params }) => {
    const idx = product_images.findIndex(img => img.id === parseInt(params.imageId))
    if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    product_images.splice(idx, 1)
    return HttpResponse.json({ message: "Deleted" })
    }),

    // PATCH /api/admin/products/:id/images/:imageId
    http.patch("/api/admin/products/:id/images/:imageId", async ({ params, request }) => {
    const body     = await request.json()
    const image    = product_images.find(img => img.id === parseInt(params.imageId))
    const productId = parseInt(params.id)

    if (!image) return HttpResponse.json({ message: "Not found" }, { status: 404 })

    // if setting as primary, unset others
    if (body.is_primary) {
        product_images
        .filter(img => img.product_id === productId)
        .forEach(img => { img.is_primary = false })
    }

    Object.assign(image, body)
    return HttpResponse.json(image)
    }),
    http.post("/api/admin/products", async ({ request }) => {
    const body = await request.json()
    const newProduct = {
        id: products.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        discount_percent: null,
        pill_id: null,
        size: null,
        shipping_fee: null,
        shipping_days_min: null,
        shipping_days_max: null,
        shipping_from: null,
        ...body,
    }
    products.push(newProduct)
    return HttpResponse.json(newProduct, { status: 201 })
    }),

    // PATCH /api/admin/products/:id  ← already exists, extend it
    http.patch("/api/admin/products/:id", async ({ params, request }) => {
    const body    = await request.json()
    const product = products.find(p => p.id === parseInt(params.id))
    if (!product) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    Object.assign(product, { ...body, updated_at: new Date().toISOString() })
    return HttpResponse.json({
        ...product,
        pill:      pills.find(pl => pl.id === product.pill_id) ?? null,
        images:    product_images.filter(img => img.product_id === product.id),
        inventory: product_inventory.find(inv => inv.product_id === product.id),
    })
    }),
    http.get("/api/admin/carts", ({ request }) => {
        const url     = new URL(request.url)
        const user_id = url.searchParams.get("user_id")
        
        const userCart = cart.find(c => c.user_id === user_id) ?? null
        
        if (!userCart) {
            return HttpResponse.json({ cart: null })
        }
        
        const items = cart_items
            .filter(ci => Number(ci.cart_id) === Number(userCart.id))
            .map(ci => {
                const product = products.find(p => Number(p.id) === Number(ci.product_id)) ?? null
                const images  = product_images.filter(img => img.product_id === ci.product_id)
                return {
                ...ci,
                product: product ? { ...product, images } : null,
                }
            })
        
        return HttpResponse.json({
            cart: {
            ...userCart,
            items,
            },
        })
    }),
]