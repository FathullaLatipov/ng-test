import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { CompanyJourney } from "../components/CompanyJourney";
import { QuoteBand, SectionDivider, SectionTeaser } from "../components/BrandDecor";

export function AboutPage() {
  return (
    <PageLayout title="О группе — Nobel Group" description="Nobel Group объединяет производство, импорт, международную торговлю, дистрибуцию и логистику продуктов питания. Основной рынок — Узбекистан.">
      <PageHero
        eyebrow="О ГРУППЕ"
        title="Nobel Group —"
        titleAccent="производство, торговля и дистрибуция."
        subtitle="Группа компаний в сфере производства, импорта, международной торговли, дистрибуции и логистики продуктов питания. Основной рынок — Узбекистан; производственные и торговые проекты развиваются и в других странах региона."
        crumbs={[{ label: "О группе" }]}
        visual="history"
      />

      <SectionTeaser
        index="02"
        eyebrow="КОМПАНИИ И НАПРАВЛЕНИЯ"
        title="Компании и направления"
        titleAccent="Nobel Group."
        desc="У каждой сущности указан тип. Юридическая карта, которая ещё не подтверждена, на сайте не публикуется."
        points={[
          "Nobel Trade — торговля и дистрибуция",
          "EcoBorn — действующее производство",
          "Nobel Distribution — дистрибуция",
          "Aris и Semey — проекты в реализации",
          "Акча — логистический проект",
          "Торговый дом в Афганистане — в процессе",
        ]}
        background="var(--ng-void)"
      />

      <CompanyJourney />
      <QuoteBand
        quote="Наша задача — создавать эффективную цепочку от производства и международной закупки продуктов питания до их своевременной доставки и реализации потребителю."
        author="Nobel Group"
        role="Стратегическое направление"
      />
      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
