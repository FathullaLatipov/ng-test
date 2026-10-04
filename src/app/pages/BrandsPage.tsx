import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { BrandsPortfolio } from "../components/BrandsPortfolio";
import { QuoteBand, SectionDivider } from "../components/BrandDecor";

export function BrandsPage() {
  return (
    <PageLayout title="Бренды и продукция — Nobel Group" description="Собственные торговые марки Nobel Group и товарные категории. Партнёрские бренды публикуются после подтверждения.">
      <PageHero
        eyebrow="БРЕНДЫ И ПРОДУКЦИЯ"
        title="Бренды и продукция"
        titleAccent="Nobel Group."
        subtitle="Портфель группы объединяет собственные торговые марки и продукты для розничного, оптового, HoReCa и промышленного рынков. Партнёрские бренды добавляются только после подтверждения."
        crumbs={[{ label: "Бренды" }]}
        visual="business"
      />
      <BrandsPortfolio showCta={false} showCompanies={false} />
      <QuoteBand
        quote="Сильный портфель — это не набор логотипов, а система категорий, которая работает в рознице и HoReCa."
        author="Nobel Group"
        role="Бренды и продукция"
      />
      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
