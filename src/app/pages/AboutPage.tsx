import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { AboutGroup } from "../components/AboutGroup";
import { CompanyJourney } from "../components/CompanyJourney";
import { MegaStats, QuoteBand, SectionDivider } from "../components/BrandDecor";

export function AboutPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="О ГРУППЕ"
        title="Nobel Group —"
        titleAccent="FMCG-платформа Узбекистана."
        subtitle="Группа компаний в сфере производства, импорта и дистрибуции продуктов питания. Мы объединяем импорт, собственное производство, оптовую дистрибуцию, HoReCa и развитие потребительских брендов."
        crumbs={[{ label: "О группе" }]}
        visual="history"
      />
      <AboutGroup />
      <MegaStats
        items={[
          { n: "17+", l: "Лет на рынке" },
          { n: "5", l: "Направлений бизнеса" },
          { n: "14", l: "Регионов покрытия" },
          { n: "2", l: "Завода за рубежом" },
        ]}
      />
      <CompanyJourney />
      <QuoteBand
        quote="Мы строим надёжную FMCG-платформу в Центральной Азии — от производства и импорта до полки и HoReCa."
        author="Nobel Group"
        role="Позиционирование группы"
      />
      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
