import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center bg-neutral-950 px-4 py-12 text-white"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
