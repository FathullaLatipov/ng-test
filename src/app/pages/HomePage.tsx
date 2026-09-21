import { HeroNew } from "../components/HeroNew";
import { AboutGroup } from "../components/AboutGroup";
import { BusinessDirections } from "../components/BusinessDirections";
import { BrandsPortfolio } from "../components/BrandsPortfolio";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { GeographyNew } from "../components/GeographyNew";
import { PartnershipSection } from "../components/PartnershipSection";
import { KeyStats } from "../components/KeyStats";
import { SectionDivider, RouteTransition } from "../components/BrandDecor";
import { PageLayout } from "../components/PageLayout";

export function HomePage() {
  return (
    <PageLayout showContact>
      <HeroNew />
      <KeyStats />
      <SectionDivider mark="diamond" />
      <AboutGroup />
      <RouteTransition label="НАПРАВЛЕНИЯ БИЗНЕСА" />
      <BusinessDirections limit={4} showAllLink />
      <BrandsPortfolio />
      <GeographyNew />
      <WhyChooseUs />
      <PartnershipSection showForm={false} />
      <SectionDivider mark="hex" />
    </PageLayout>
  );
}
