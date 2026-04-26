import { authHandlers }     from "./auth"
import { categoryHandlers } from "./categories"
import { productHandlers }  from "./products"
import { orderHandlers }    from "./orders"
import { cartHandlers }     from "./cart"
import { paymentHandlers }  from "./payments"
import { userHandlers } from "./users"
import { adminHandlers } from "./admin"

export const handlers = [
  ...adminHandlers,
  ...authHandlers,
  ...categoryHandlers,
  ...productHandlers,
  ...orderHandlers,
  ...cartHandlers,
  ...paymentHandlers,
  ...userHandlers,
]