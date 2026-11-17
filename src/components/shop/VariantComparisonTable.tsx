import React from 'react';
import { formatPrice, PRODUCTS } from '../../data/products';
import { Check, Minus } from 'lucide-react';

export const VariantComparisonTable: React.FC = () => {
  const comparisonRows = [
    { label: 'Form Factor', key: 'formFactor' },
    { label: 'Earbud Type & Contents', key: 'contents' },
    { label: 'Launch Price', key: 'price' },
    { label: 'Total Battery Life', key: 'batteryLife' },
    { label: 'Controls', key: 'controls' },
    { label: 'Charging Case', key: 'chargingCase' },
    { label: 'Safety Alert Latency', key: 'alertLatency' },
    { label: 'Active Noise Cancellation', key: 'ancSupport' },
    { label: 'Smart Ambient Mode', key: 'ambientMode' },
  ];

  const compareProducts = PRODUCTS;

  return (
    <div className="w-full space-y-6">
      <div className="overflow-x-auto rounded-3xl border border-white/10 glass-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-surface/60">
              <th className="p-5 text-sm font-semibold text-slate-400">Specifications</th>
              {compareProducts.map((p) => (
                <th key={p.id} className="p-5 text-center min-w-[200px]">
                  <span className="text-base font-bold text-white block">{p.name}</span>
                  <span className="text-xs text-teal font-mono mt-0.5 block">{p.badge}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 sm:p-5 font-medium text-slate-300">
                  {row.label}
                </td>
                {compareProducts.map((p) => {
                  const val = row.key === 'price' ? formatPrice(p.price) : (p.comparison as any)[row.key];
                  return (
                    <td key={p.id} className="p-4 sm:p-5 text-center text-slate-200">
                      {val === 'N/A' || val.includes('N/A') ? (
                        <span className="text-slate-500 font-mono">N/A</span>
                      ) : (
                        <span>{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
