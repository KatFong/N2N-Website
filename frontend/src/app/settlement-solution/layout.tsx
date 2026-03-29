import ProductLineSubnav from '@/components/product-line/ProductLineSubnav';

export default function SettlementSolutionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductLineSubnav />
      {children}
    </>
  );
}
