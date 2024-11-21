import { useState, useEffect } from "react";
import termApi from "../Tasks/services/term.api";
import { Input, message, Card, Badge } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Home() {
  const [terms, setTerms] = useState([]); // Liste complète des termes
  const [filteredTerms, setFilteredTerms] = useState([]); // Liste des termes filtrés
  const [searchQuery, setSearchQuery] = useState(""); // Texte de recherche

  const fetchTerms = async () => {
    try {
      const response = await termApi.getAllTerms();
      setTerms(response); // Met à jour l'état avec les termes récupérés
      setFilteredTerms(response); // Initialise les termes filtrés avec tous les termes
    } catch (err) {
      message.error("Erreur lors de la récupération des termes.");
      console.error("Erreur lors de la récupération des termes :", err);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  // Gestion de la recherche
  const handleSearch = (query) => {
    setSearchQuery(query); // Met à jour l'état de la requête de recherche
    if (!query) {
      setFilteredTerms(terms); // Si le champ est vide, affiche tous les termes
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = terms.filter(
        (term) =>
          term.word.toLowerCase().includes(lowerCaseQuery) || // Recherche dans le mot
          term.definition.toLowerCase().includes(lowerCaseQuery) || // Recherche dans la définition
          (term.category?.name &&
            term.category.name.toLowerCase().includes(lowerCaseQuery)) // Recherche dans la catégorie
      );
      setFilteredTerms(filtered); // Met à jour l'état avec les termes filtrés
    }
  };

  // Fonction pour générer une couleur dynamique basée sur le nom de la catégorie
  const generateColorFromCategory = (categoryName) => {
    if (!categoryName) return "gray"; // Couleur par défaut si aucune catégorie
    let hash = 0;
    for (let i = 0; i < categoryName.length; i++) {
      hash = categoryName.charCodeAt(i) + ((hash << 5) - hash); // Calcul du hash
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`; // Conversion en couleur HSL
    return color;
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Dictionnaire des Termes
      </h1>

      {/* Barre de recherche */}
      <div className="max-w-md mx-auto mb-6">
        <Input
          className="border-gray-300 shadow-md"
          placeholder="Rechercher un terme par mot ou définition"
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Affichage des termes */}
      <div className="max-w-4xl mx-auto">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <Badge.Ribbon
              key={term._id}
              text={term.category?.name || "Sans catégorie"}
              color={
                term.category
                  ? generateColorFromCategory(term.category.name)
                  : "gray"
              } // Couleur conditionnelle dynamique
            >
              <Card className="mb-6 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700">
                  {term.word}
                </h2>
                <p className="mt-2 text-gray-600">{term.definition}</p>
              </Card>
            </Badge.Ribbon>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Aucun terme trouvé pour cette recherche.
          </p>
        )}
      </div>
    </div>
  );
}
