"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Package, MapPin, Phone } from "lucide-react";

export default function PublicPriceList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (!data.error) setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.code || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main style={{ minHeight: '100vh', background: '#0c0c0d', color: '#f2f2f7', padding: '2rem 1rem' }}>
      <header style={{ maxWidth: '800px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
        <img src="/logo.jpg" alt="Logo" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '1.5rem', border: '3px solid rgba(197, 160, 89, 0.2)' }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Distribuciones Miky</h1>
        <p style={{ color: '#c5a059', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Lista de Precios Online</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', opacity: 0.7, fontSize: '0.85rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={14} /> Jeronimo Luis de Cabrera esq. Patagonia</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={14} /> 3522649181 - 3522402188</span>
        </div>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <Search style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#a1a1aa' }} size={20} />
          <input 
            type="text" 
            placeholder="Buscar productos o categorías..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1.5rem', color: 'white', fontSize: '1.1rem', outline: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }} 
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <Loader2 className="animate-spin" style={{ margin: '0 auto', color: '#c5a059' }} size={40} />
            <p style={{ marginTop: '1rem', opacity: 0.6 }}>Cargando lista actualizada...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p, idx) => (
                <div key={idx} style={{ 
                  background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '1.2rem',
                  border: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', backdropFilter: 'blur(10px)'
                }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{p.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#c5a059', opacity: 0.8, textTransform: 'uppercase' }}>{p.category?.name || 'Varios'}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f2f2f7' }}>${p.sellPrice.toFixed(2)}</span>
                    <small style={{ display: 'block', opacity: 0.5, fontSize: '0.75rem' }}>por {p.unitType}</small>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', opacity: 0.5, padding: '3rem' }}>No se encontraron productos coincidentes.</p>
            )}
          </div>
        )}

        <footer style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.4, fontSize: '0.8rem' }}>
          <p>© {new Date().getFullYear()} Distribuciones Miky - Todos los precios están sujetos a cambios sin previo aviso.</p>
        </footer>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');
        body { font-family: 'Outfit', sans-serif; margin: 0; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
