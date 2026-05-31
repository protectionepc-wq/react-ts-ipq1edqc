# Guide d'intégration de la Vue Carte Interactive

## Étape 1 : Ajouter le bouton de basculement

Dans le fichier `App.jsx`, recherchez la section avec les boutons "Exporter" et "Importer" (vers la ligne où vous voyez `<button style={{...}}onMouseDown={()=>setVue('formRappel')}>...).

Après le bouton "Importer", ajoutez ce code :

```jsx
<button 
  style={{
    flex: 1, 
    padding: '10px', 
    borderRadius: 8, 
    border: '1px solid #334155',
    background: showMap ? '#3b82f6' : '#1e293b',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
    textAlign: 'center'
  }}
  onMouseDown={(e) => {
    e.preventDefault();
    setShowMap(!showMap);
  }}
>
  {showMap ? '📋 Vue Liste' : '🗺️ Vue Carte'}
</button>
```

## Étape 2 : Ajouter le rendu conditionnel

Recherchez la section qui affiche la grille des chantiers. C'est là où vous verrez :
```jsx
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginTop:20}}>
```

Remplacez cette section entière par :

```jsx
{showMap ? (
  <MapView chantiers={filtered.filter(c=>c.status!=='Terminé')} />
) : (
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginTop:20}}>
    {/* ... tout le contenu existant de la grille ... */}
  </div>
)}
```

## Étape 3 : Tester

1. Sauvegardez le fichier
2. Attendez le redéploiement Netlify
3. Testez le bouton de basculement
4. Vérifiez que la carte s'affiche correctement

## Note importante

- Le state `showMap` existe déjà dans votre composant App (ligne : `const [showMap,setShowMap]=useState(false)`)
- Le composant MapView est déjà importé (ligne 4)
- Les dépendances Leaflet sont déjà installées dans package.json

## Améliorations futures possibles

1. **Géocodage réel** : Intégrer un service de géocodage (Nominatim, Google Maps) pour convertir les adresses en coordonnées GPS réelles
2. **Clustering** : Grouper les marqueurs proches pour une meilleure lisibilité
3. **Filtres sur la carte** : Permettre de filtrer les chantiers directement sur la carte
4. **Itinéraires** : Ajouter la possibilité de calculer des itinéraires entre chantiers
