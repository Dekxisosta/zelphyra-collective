import { TableWrap, Th, Td } from "../../components/ui/AdminTable"
import AdminSectionHeader    from "../../components/ui/AdminSectionHeader"

export default function TopProductsTable({ products }) {
  return (
    <div>
      <AdminSectionHeader title="Top Products by Sales" />
      <TableWrap>
        <thead>
          <tr>
            <Th>Product</Th>
            <Th right>Sold</Th>
            <Th right>Stock</Th>
            <Th right>Price</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr
              key={p.id}
              style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)" }}
            >
              <Td>
                <div>
                  <p style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.8rem" }}>
                    {p.name}
                  </p>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.7rem" }}>
                    {p.sku}
                  </p>
                </div>
              </Td>
              <Td right>{p.inventory?.sold ?? 0}</Td>
              <Td right>
                <span style={{ color: (p.inventory?.stock ?? 0) < 10 ? "#ef4444" : "var(--color-text)", fontWeight: (p.inventory?.stock ?? 0) < 10 ? 700 : 400 }}>
                  {p.inventory?.stock ?? 0}
                  {(p.inventory?.stock ?? 0) < 10 && (
                    <span style={{ marginLeft: "0.3rem", fontSize: "0.65rem" }}>⚠ Low</span>
                  )}
                </span>
              </Td>
              <Td right>₱{Number(p.price).toFixed(2)}</Td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </div>
  )
}