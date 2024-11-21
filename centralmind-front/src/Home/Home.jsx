import { useState } from "react";
import termApi from "../Tasks/services/term.api";
import { useEffect } from "react";
import { message } from "antd";

export default function LandingPage() {
  const [terms, setTerms] = useState([]);
  
  const fetchTerms = async () => {
    try {
      const response = await termApi.getAllTerms();
      setTerms(response); // Met à jour l'état avec les tâches récupérées
    } catch (err) {
      message.error("Erreur lors de la récupération des tâches.");
      console.error("Error fetching tasks:", err);
    }
  };
  
  useEffect(() => {
    fetchTerms();
  }, []);

  return (

    <div>
      {/* mapper les valeurs */}
      {terms.map((term) => (
        <div key={term.id}>
          <h2>{term.word}</h2>
          <p>{term.definition}</p>
        </div>
      ))}
    </div>
    
    
  );
}
