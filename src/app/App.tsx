import { Header } from "./components/Header";
import { HeroNew } from "./components/HeroNew";
import { AboutGroup } from "./components/AboutGroup";
import { BusinessDirections } from "./components/BusinessDirections";
import { CompanyJourney } from "./components/CompanyJourney";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { GeographyNew } from "./components/GeographyNew";
import { PartnershipSection } from "./components/PartnershipSection";
import { BrandsPortfolio } from "./components/BrandsPortfolio";
import { CareersSection } from "./components/CareersSection";
import { ContactFooterNew } from "./components/ContactFooterNew";

export default function App() {
  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        color: "#FFFFFF",
        fontFamily: "'Manrope', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Fixed header */}
      <Header />

      <main>
        {/* 1 — Hero: cinematic montage, parallax, kinetic headline */}
        <HeroNew />

        {/* 2 — About Group: ecosystem diagram + capabilities */}
        <AboutGroup />

        {/* 3 — Business Directions: 4 enterprise cards */}
        <BusinessDirections />

        {/* 4 — Company Journey: realistic growth timeline */}
        <CompanyJourney />

        {/* 5 — Why Choose Us: 6 trust cards */}
        <WhyChooseUs />

        {/* 6 — Geography: Uzbekistan map with logistics routes */}
        <GeographyNew />

        {/* 7 — Partnership: 3 audience cards */}
        <PartnershipSection />

        {/* 8 — Brands & Portfolio: product categories + marquee */}
        <BrandsPortfolio />

        {/* 9 — Careers: recruitment section */}
        <CareersSection />

        {/* 10 — Contact + Footer */}
        <ContactFooterNew />
      </main>
    </div>
  );
}
