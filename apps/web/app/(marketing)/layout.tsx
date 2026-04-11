import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[calc(100vh-7rem)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
