import { TableWrap, Th, Td } from "../../components/ui/AdminTable"
import AdminSectionHeader    from "../../components/ui/AdminSectionHeader"
import AdminStatusPill       from "../../components/ui/AdminStatusPill"

const currency = (n) => `₱${Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`

export default function PaymentBreakdown({ breakdown }) {
  const total = breakdown.reduce((s, p) => s + p.total, 0)

  return (
    <div>
      <AdminSectionHeader title="Payment Breakdown" />
      <TableWrap>
        <thead>
          <tr>
            <Th>Status</Th>
            <Th right>Count</Th>
            <Th right>Total</Th>
            <Th right>Share</Th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((p, i) => (
            <tr
              key={p.status}
              style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)" }}
            >
              <Td><AdminStatusPill status={p.status} /></Td>
              <Td right>{p.count}</Td>
              <Td right>{currency(p.total)}</Td>
              <Td right>
                <span style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>
                  {total > 0 ? ((p.total / total) * 100).toFixed(1) : 0}%
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </div>
  )
}