import { HeroNew } from "../components/HeroNew";
import { AboutGroup } from "../components/AboutGroup";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { GeographyNew } from "../components/GeographyNew";
import {
  SectionDivider,
  QuoteBand,
  RouteTransition,
  MegaStats,
  SectionTeaser,
} from "../components/BrandDecor";
import { PageLayout } from "../components/PageLayout";

export function HomePage() {
  return (
    <PageLayout showContact>
      <HeroNew />

      <SectionDivider mark="diamond" />

      <AboutGroup />

      <RouteTransition label="ЭКОСИСТЕМА NOBEL GROUP" />

      <SectionTeaser
        index="01"
        eyebrow="НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ"
        title="Экосистема из четырёх"
        titleAccent="взаимосвязанных направлений."
        desc="Импорт, оптовая торговля, региональная дистрибуция, HoReCa и развитие брендов — единая система поставок продуктов питания в Узбекистане."
        points={[
          "Импорт и оптовая торговля",
          "Региональная дистрибуция",
          "Снабжение HoReCa-сегмента",
          "Развитие собственных брендов",
        ]}
        ctaLabel="Все направления бизнеса"
        ctaTo="/business"
        background="var(--ng-charcoal)"
      />

      <QuoteBand
        quote="Мы не просто поставляем продукцию. Мы строим долгосрочные партнёрства, которые растут вместе с рынком."
        author="Руководство Nobel Group"
        role="Ташкент, Узбекистан"
      />

      <SectionTeaser
        index="02"
        reverse
        eyebrow="ИСТОРИЯ КОМПАНИИ"
        title="С 2012 года —"
        titleAccent="путь к продовольственной экосистеме."
        desc="От первых оптовых операций до мультиформатной группы с региональным покрытием и сильной партнёрской моделью."
        points={[
          "2012 — старт оптовых поставок",
          "2015 — запуск дистрибуции",
          "2018 — развитие HoReCa",
          "Сегодня — 200+ партнёров",
        ]}
        ctaLabel="Полная история группы"
        ctaTo="/history"
        background="var(--ng-void)"
      />

      <MegaStats
        items={[
          { n: "200+", l: "Активных партнёров" },
          { n: "14+", l: "Лет на рынке" },
          { n: "7", l: "Регионов охвата" },
          { n: "4", l: "Бизнес-направления" },
        ]}
      />

      <WhyChooseUs />

      <SectionDivider mark="node" />

      <GeographyNew />

      <SectionTeaser
        index="03"
        eyebrow="ПАРТНЁРСТВО"
        title="Растите вместе"
        titleAccent="с Nobel Group."
        desc="Для поставщиков, дилеров, дистрибьюторов и HoReCa — надёжная партнёрская модель с региональным покрытием и прозрачными условиями."
        points={[
          "Выход на рынок Узбекистана",
          "Готовая сеть дистрибуции",
          "Опыт работы с крупными объёмами",
          "Гибкие модели сотрудничества",
        ]}
        ctaLabel="Стать партнёром"
        ctaTo="/partnership"
        background="var(--ng-charcoal)"
      />

      <SectionTeaser
        index="04"
        reverse
        eyebrow="КАРЬЕРА"
        title="Растите"
        titleAccent="профессионально вместе с группой."
        desc="Возможности для специалистов в продажах, логистике, закупках, дистрибуции и управлении — с реальной ответственностью и долгосрочной перспективой."
        points={[
          "Продажи и торговля",
          "Дистрибуция и логистика",
          "Импорт и закупки",
          "Маркетинг брендов",
        ]}
        ctaLabel="Открытые направления"
        ctaTo="/careers"
        background="var(--ng-void)"
      />

      <SectionDivider mark="hex" />
    </PageLayout>
  );
}
