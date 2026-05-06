import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

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
