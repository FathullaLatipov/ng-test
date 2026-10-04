import { useEffect, type ReactNode } from "react";
import { Header } from "./Header";
import { ContactFooterNew } from "./ContactFooterNew";
import { PageEnter } from "./PageTransition";

const DEFAULT_TITLE = "Nobel Group — производство, дистрибуция и логистика продуктов питания";
const DEFAULT_DESC =
  "Nobel Group объединяет компании в сфере производства, импорта, дистрибуции, международной торговли и логистики продуктов питания в Узбекистане и Центральной Азии.";

export function PageLayout({
  children,
  showContact = true,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
}: {
  children: ReactNode;
  showContact?: boolean;
  title?: string;
  description?: string;
}) {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = "ru";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
    const og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute("content", title);
    const ogd = document.querySelector('meta[property="og:description"]');
    if (ogd) ogd.setAttribute("content", description);
  }, [title, description]);

  return (
    <div
      style={{
        backgroundColor: "var(--ng-void)",
        color: "#FFFFFF",
        fontFamily: "'Manrope', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Header />
      <PageEnter>
        <main>{children}</main>
        {showContact && <ContactFooterNew />}
      </PageEnter>
    </div>
  );
}
