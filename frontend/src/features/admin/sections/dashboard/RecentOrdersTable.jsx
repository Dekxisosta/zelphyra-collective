import { TableWrap, Th, Td } from "../../components/ui/AdminTable"
import AdminSectionHeader    from "../../components/ui/AdminSectionHeader"
import AdminStatusPill       from "../../components/ui/AdminStatusPill"

const currency = (n) => `₱${Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`

export default function RecentOrdersTable({ orders }) {
  return (
    <div>
      <AdminSectionHeader title="Recent Orders" />
      <TableWrap>
        <thead>
          <tr>
            <Th>Order ID</Th>
            <Th>Customer</Th>
            <Th>Items</Th>
            <Th>Payment</Th>
            <Th>Status</Th>
            <Th right>Total</Th>
            <Th>Date</Th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr
              key={order.id}
              style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)" }}
            >
              <Td muted>#{order.id}</Td>
              <Td>{order.shipping_name}</Td>
              <Td muted>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</Td>
              <Td><AdminStatusPill status={order.payment?.status ?? "pending"} /></Td>
              <Td><AdminStatusPill status={order.status} /></Td>
              <Td right>{currency(order.total_amount)}</Td>
              <Td muted>
                {new Date(order.created_at).toLocaleDateString("en-PH", {
                  month: "short", day: "numeric", year: "numeric"
                })}
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </div>
  )
}