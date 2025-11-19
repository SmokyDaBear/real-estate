import { useEffect, useState } from "react";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { ContactPage } from "./pages/ContactPage";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { AgentsPage } from "./pages/AgentsPage";
import { NotFound } from "./pages/NotFound";
import type { TPage } from "./types";

const parseHash = (): { page: TPage } => {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [first] = raw.split("/");
  const page = (first || "home") as TPage;
  if (!["home", "listings", "contact", "agents"].includes(page)) {
    return { page: "404" };
  }
  return { page };
};

function App() {
  const [currentPage, setCurrentPage] = useState<TPage>(parseHash().page);

  useEffect(() => {
    const onHashChange = () => {
      const { page } = parseHash();
      setCurrentPage(page);
    };
    window.addEventListener("hashchange", onHashChange);
    // Ensure a default hash for direct visits
    if (!window.location.hash) {
      window.location.hash = "/home";
    } else {
      onHashChange();
    }
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <>
      <Header currentPage={currentPage === "404" ? undefined : currentPage} />
      {currentPage === "home" && <HomePage />}
      {currentPage === "listings" && <ListingsPage />}
      {currentPage === "contact" && <ContactPage />}
      {currentPage === "agents" && <AgentsPage />}
      {currentPage === "404" && <NotFound />}
      <Footer />
    </>
  );
}

export default App;
