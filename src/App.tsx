import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { BarcodePage } from "./pages/BarcodePage";
import { PasswordGenPage } from "./pages/PasswordGenPage";
import { UrlShortenerPage } from "./pages/UrlShortenerPage";
import { AgeCalcPage } from "./pages/AgeCalcPage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { ArticleView } from "./pages/ArticleView";
import { LegalView } from "./pages/LegalView";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/barcode-generator" element={<BarcodePage />} />
            <Route path="/password-generator" element={<PasswordGenPage />} />
            <Route path="/url-shortener" element={<UrlShortenerPage />} />
            <Route path="/age-calculator" element={<AgeCalcPage />} />
            
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:slug" element={<ArticleView />} />
            
            <Route path="/about-us" element={<LegalView page="about" />} />
            <Route path="/contact-us" element={<LegalView page="contact" />} />
            <Route path="/privacy-policy" element={<LegalView page="privacy" />} />
            <Route path="/terms-conditions" element={<LegalView page="terms" />} />
            <Route path="/faq" element={<LegalView page="faq" />} />
            <Route path="/disclaimer" element={<LegalView page="disclaimer" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
