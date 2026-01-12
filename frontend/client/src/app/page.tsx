import Hero from "@/components/home/Hero";
import PromoStrip from "@/components/home/PromoStrip";
import CategoryTiles from "@/components/home/CategoryTiles";
import DesignerStrip from "@/components/home/DesignerStrip";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PromoStrip />
      <DesignerStrip />
      <CategoryTiles />
    </main>
  );
}
