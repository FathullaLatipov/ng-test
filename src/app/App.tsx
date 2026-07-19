import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { BusinessPage } from "./pages/BusinessPage";
import { HistoryPage } from "./pages/HistoryPage";
import { GeographyPage } from "./pages/GeographyPage";
import { PartnershipPage } from "./pages/PartnershipPage";
import { CareersPage } from "./pages/CareersPage";
import { ContactsPage } from "./pages/ContactsPage";
import { RouteWipe } from "./components/PageTransition";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteWipe />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/geography" element={<GeographyPage />} />
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
