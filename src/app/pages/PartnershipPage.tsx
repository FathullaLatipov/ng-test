import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { PartnershipSection } from "../components/PartnershipSection";
import { SectionDivider, QuoteBand } from "../components/BrandDecor";

export function PartnershipPage() {
  return (
    <PageLayout title="Партнерам — Nobel Group" description="Сотрудничество с производителями, сетями, оптом, HoReCa, логистикой и инвестиционными партнёрами Nobel Group.">
      <PageHero
        eyebrow="ПАРТНЁРАМ"
        title="Развиваем бизнес"
        titleAccent="вместе."
        subtitle="Nobel Group сотрудничает с производителями, поставщиками, торговыми сетями, оптовыми компаниями, HoReCa и инвестиционными партнёрами."
        crumbs={[{ label: "Партнерам" }]}
        bgVideo={{ desktop: "/video/partners-desktop.mp4", mobile: "/video/partners-mobile.mp4", poster: "/video/partners-poster.jpg" }}
      />

      <PartnershipSection showForm />

      <QuoteBand
        quote="Цены и коммерческие условия обсуждаем индивидуально."
        author="Nobel Group"
        role="Принцип партнёрства"
      />

      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
