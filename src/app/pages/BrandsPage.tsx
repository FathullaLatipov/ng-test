import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { BrandsPortfolio } from "../components/BrandsPortfolio";
import { QuoteBand, SectionDivider } from "../components/BrandDecor";

export function BrandsPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="БРЕНДЫ"
        title="Собственные,"
        titleAccent="эксклюзивные и дистрибутируемые."
        subtitle="Портфель Nobel Group разделён на собственные бренды, эксклюзивно представляемые марки, дистрибутируемые бренды и товарные категории."
        crumbs={[{ label: "Бренды" }]}
        visual="business"
      />
      <BrandsPortfolio showCta={false} />
      <QuoteBand
        quote="Сильный портфель — это не набор логотипов, а система категорий, которая работает в рознице и HoReCa."
        author="Nobel Group"
        role="Бренды и продукция"
      />
      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
