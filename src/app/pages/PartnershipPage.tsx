import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { PartnershipSection } from "../components/PartnershipSection";
import { SectionDivider, QuoteBand, MegaStats } from "../components/BrandDecor";

export function PartnershipPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="ПАРТНЁРАМ"
        title="Растите вместе"
        titleAccent="с Nobel Group."
        subtitle="Отдельные сценарии для производителей, торговых сетей, дистрибьюторов, HoReCa и инвесторов. Обсудите сотрудничество через короткую форму."
        crumbs={[{ label: "Партнерам" }]}
        visual="partnership"
      />

      <PartnershipSection showForm />

      <MegaStats
        items={[
          { n: "120+", l: "Внешних партнёров" },
          { n: "5", l: "Сценариев сотрудничества" },
          { n: "14", l: "Регионов работы" },
          { n: "17+", l: "Лет на рынке" },
        ]}
      />

      <QuoteBand
        quote="Цены и коммерческие условия обсуждаем индивидуально. На сайте важны доверие, охват и модель партнёрства."
        author="Nobel Group"
        role="Принцип партнёрства"
      />

      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
