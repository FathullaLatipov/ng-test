import type { ReactNode } from "react";
import { Header } from "./Header";
import { ContactFooterNew } from "./ContactFooterNew";
import { PageEnter } from "./PageTransition";

export function PageLayout({
  children,
  showContact = true,
}: {
  children: ReactNode;
  showContact?: boolean;
}) {
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
