import { Link } from "react-router";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { AboutGroup } from "../components/AboutGroup";
import { CompanyJourney } from "../components/CompanyJourney";
import { MegaStats, QuoteBand, SectionDivider, SectionTeaser } from "../components/BrandDecor";

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

      <SectionTeaser
        index="02"
        eyebrow="КОМПАНИИ ХОЛДИНГА"
        title="Четыре компании,"
        titleAccent="один холдинг."
        desc="Nobel Trade, Rimado, Elite Dairy и Gold Ingredients — самостоятельные бренды с собственными рынками. На отдельной странице — динамичные фоны по виду деятельности и ссылки на сайты компаний."
        points={["Nobel Trade", "Rimado", "Elite Dairy", "Gold Ingredients"]}
        ctaLabel="Смотреть компании группы"
        ctaTo="/companies"
        background="var(--ng-void)"
      />

      <MegaStats
        items={[
          { n: "17+", l: "Лет на рынке" },
          { n: "4", l: "Компании холдинга" },
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
      <section className="ng-sec-pad" style={{ background: "var(--ng-void)", padding: "40px 80px 80px", textAlign: "center" }}>
        <Link
          to="/companies"
          style={{
            display: "inline-flex",
            background: "#C9A24B",
            color: "#0A0A0A",
            textDecoration: "none",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "14px 28px",
          }}
        >
          КОМПАНИИ ГРУППЫ →
        </Link>
      </section>
      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
