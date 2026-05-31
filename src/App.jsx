import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'epc-chantiers';

const demoData = [
  {
    id: '1',
    nom: 'Test Firebase Sync',
    client: 'Client Test EPC',
    adresse: '123 Avenue Test, Lyon',
    statut: 'Planifie',
  },
  {
    id: '2',
    nom: 'ETs Jeudy',
    client: 'CM MONT',
    adresse: 'La gare la ferte hauterive',
    statut: 'En cours',
  },
];

const styles = {
  app: {
    minHeight: '100vh',
    background: '#0f172a',
    color: '#f1f5f9',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    background: '#1e293b',
    padding: '16px 20px',
    borderBottom: '1px solid #334155',
    position: 'sticky',
    top: 0,
  },
  body: {
    maxWidth: 760,
    margin: '0 auto',
    padding: 16,
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
  },
  sub: {
    marginTop: 6,
    color: '#94a3b8',
    fontSize: 14,
  },
  input: {
    width: '100%',
    background: '#1e293b',
    color: '#f1f5f9',
    border: '1px solid #334155',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
    boxSizing: 'border-box',
    marginBottom: 16,
  },
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 700,
  },
  meta: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 6,
  },
  badge: {
    display: 'inline-block',
    padding: '6px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },
  empty: {
    color: '#64748b',
    textAlign: 'center',
    padding: 40,
  },
};

function getBadgeStyle(statut) {
  if (statut === 'En cours') {
    return { ...styles.badge, background: '#f59e0b22', color: '#fbbf24', border: '1px solid #f59e0b66' };
  }
  if (statut === 'Termine') {
    return { ...styles.badge, background: '#22c55e22', color: '#4ade80', border: '1px solid #22c55e66' };
  }
  return { ...styles.badge, background: '#3b82f622', color: '#60a5fa', border: '1px solid #3b82f666' };
}

export default function App() {
  const [chantiers, setChantiers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setChantiers(JSON.parse(raw));
      } else {
        setChantiers(demoData);
      }
    } catch (e) {
      setChantiers(demoData);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chantiers));
    } catch (e) {}
  }, [chantiers]);

  const filtered = chantiers.filter((c) => {
    const t = search.toLowerCase();
    return (
      c.nom.toLowerCase().includes(t) ||
      c.client.toLowerCase().includes(t) ||
      c.adresse.toLowerCase().includes(t)
    );
  });

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏗️ Planificateur Chantier</h1>
        <div style={styles.sub}>Version minimale propre pour remettre l’application en état.</div>
      </div>

      <div style={styles.body}>
        <input
          style={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un chantier, un client ou une adresse..."
        />

        {filtered.length === 0 ? (
          <div style={styles.empty}>Aucun chantier trouve.</div>
        ) : (
          filtered.map((c) => (
            <div key={c.id} style={styles.card}>
              <div style={styles.row}>
                <div style={styles.name}>{c.nom}</div>
                <span style={getBadgeStyle(c.statut)}>{c.statut}</span>
              </div>
              <div style={styles.meta}>👤 {c.client}</div>
              <div style={styles.meta}>📍 {c.adresse}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
