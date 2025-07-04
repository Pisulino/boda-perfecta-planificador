
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Invitados from "./pages/Invitados";
import Lugar from "./pages/Lugar";
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
            {/* Rutas placeholder para otras secciones */}
            <Route path="/flores" element={<div className="p-6"><h1 className="text-2xl font-bold">Flores - Próximamente</h1></div>} />
            <Route path="/comida" element={<div className="p-6"><h1 className="text-2xl font-bold">Comida - Próximamente</h1></div>} />
            <Route path="/fotografia" element={<div className="p-6"><h1 className="text-2xl font-bold">Fotografía - Próximamente</h1></div>} />
            <Route path="/musica" element={<div className="p-6"><h1 className="text-2xl font-bold">Música - Próximamente</h1></div>} />
            <Route path="/estilistas" element={<div className="p-6"><h1 className="text-2xl font-bold">Estilistas - Próximamente</h1></div>} />
            <Route path="/cronograma" element={<div className="p-6"><h1 className="text-2xl font-bold">Cronograma - Próximamente</h1></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
