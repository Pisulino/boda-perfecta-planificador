
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Invitados from "./pages/Invitados";
import Lugar from "./pages/Lugar";
import Flores from "./pages/Flores";
import Comida from "./pages/Comida";
import Fotografia from "./pages/Fotografia";
import Musica from "./pages/Musica";
import Estilistas from "./pages/Estilistas";
import Cronograma from "./pages/Cronograma";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invitados" element={<Invitados />} />
            <Route path="/lugar" element={<Lugar />} />
            <Route path="/flores" element={<Flores />} />
            <Route path="/comida" element={<Comida />} />
            <Route path="/fotografia" element={<Fotografia />} />
            <Route path="/musica" element={<Musica />} />
            <Route path="/estilistas" element={<Estilistas />} />
            <Route path="/cronograma" element={<Cronograma />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
