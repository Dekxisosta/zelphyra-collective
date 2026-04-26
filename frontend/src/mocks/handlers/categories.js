import { http, HttpResponse } from "msw"
import categories from "../json/categories.json"
import category_images from "../json/category_images.json"

export const categoryHandlers = [

  // GET /api/products/categories
  http.get("/api/products/categories", () => {

    const result = categories.map(c => ({
        ...c,
        image: category_images.find(img => img.category_id === c.id) ?? null,
    }))

    return HttpResponse.json(result)
    }),
]