import ProductLineSubnav from '@/components/product-line/ProductLineSubnav';

export default function ProductLineSegmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductLineSubnav />
      {children}
    </>
  );
}
