import ProductLineSubnav from '@/components/product-line/ProductLineSubnav';

export default function TradingSolutionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductLineSubnav />
      {children}
    </>
  );
}
