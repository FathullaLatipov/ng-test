import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";

export function PrivacyPage() {
  return (
    <PageLayout
      title="Политика конфиденциальности — Nobel Group"
      description="Как Nobel Group обрабатывает данные, которые вы отправляете через формы сайта."
    >
      <PageHero
        eyebrow="ДОКУМЕНТЫ"
        title="Политика"
        titleAccent="конфиденциальности."
        subtitle="Документ описывает обработку данных, которые вы сами отправляете через формы сайта."
        crumbs={[{ label: "Политика конфиденциальности" }]}
        visual="contacts"
      />
      <section className="ng-sec-pad" style={{ background: "var(--ng-charcoal)", padding: "80px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 16, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 16 }}>
          <p>Формы сайта запрашивают имя, компанию, телефон, email и текст обращения. Резюме принимается файлом PDF или DOCX.</p>
          <p>Данные используются только чтобы ответственное подразделение Nobel Group могло связаться по вашему обращению: продажи, закупки, партнёрство, HoReCa, логистика, карьера или СМИ.</p>
          <p>Отправка возможна только с отдельным согласием. Без согласия форма не уходит.</p>
          <p>Пока не подключён официальный канал доставки, сайт не сообщает, что заявка принята в работу. Срок хранения и круг сотрудников с доступом к резюме Nobel Group утверждает отдельно и публикует здесь после подтверждения.</p>
          <p>Официальный адрес и контакты для запросов по персональным данным будут добавлены вместе с утверждённым списком контактов группы.</p>
        </div>
      </section>
    </PageLayout>
  );
}

export function TermsPage() {
  return (
    <PageLayout
      title="Условия использования — Nobel Group"
      description="Условия использования корпоративного сайта Nobel Group."
    >
      <PageHero
        eyebrow="ДОКУМЕНТЫ"
        title="Условия"
        titleAccent="использования."
        subtitle="Сайт представляет группу Nobel Group. Материалы не являются офертой."
        crumbs={[{ label: "Условия использования" }]}
        visual="contacts"
      />
      <section className="ng-sec-pad" style={{ background: "var(--ng-charcoal)", padding: "80px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 16, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 16 }}>
          <p>Информация на сайте носит справочный характер. Коммерческие условия, цены и статусы проектов согласуются отдельно.</p>
          <p>Проекты помечены статусом. Проектная мощность не означает, что предприятие уже работает.</p>
          <p>Партнёрские логотипы и новости публикуются только после подтверждения. Если блока нет на сайте, это значит, что материалы ещё не утверждены.</p>
        </div>
      </section>
    </PageLayout>
  );
}
