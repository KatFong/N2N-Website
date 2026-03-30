import ProductLineSubnav from '@/components/product-line/ProductLineSubnav';

export default function ProductLineGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductLineSubnav />
      {children}
    </>
  );
}
