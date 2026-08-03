import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { BusinessPage } from "./pages/BusinessPage";
import { BrandsPage } from "./pages/BrandsPage";
import { HistoryPage } from "./pages/HistoryPage";
import { GeographyPage } from "./pages/GeographyPage";
import { PartnershipPage } from "./pages/PartnershipPage";
import { NewsPage } from "./pages/NewsPage";
import { CareersPage } from "./pages/CareersPage";
import { ContactsPage } from "./pages/ContactsPage";
import { CompaniesPage } from "./pages/CompaniesPage";
import { AdminPage } from "./pages/AdminPage";
import { RouteWipe } from "./components/PageTransition";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteWipe />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/geography" element={<GeographyPage />} />
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
