import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Layout } from "@/components/layout/Layout";
import { DonateCallbackPage } from "@/pages/DonateCallbackPage";
import { DonatePage } from "@/pages/DonatePage";
import { FoodDonationPage } from "@/pages/FoodDonationPage";
import { HomePage } from "@/pages/HomePage";
import { InitiativeDetailPage } from "@/pages/InitiativeDetailPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PartnerPage } from "@/pages/PartnerPage";
import { VolunteerPage } from "@/pages/VolunteerPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/initiatives/:slug" element={<InitiativeDetailPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/donate/callback" element={<DonateCallbackPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/food-donation" element={<FoodDonationPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
