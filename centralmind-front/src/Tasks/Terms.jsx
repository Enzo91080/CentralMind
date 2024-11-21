import { useState, useEffect } from "react";
import termApi from "./services/term.api";
import {
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Card,
  Radio,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default function Terms({ fetchTerms, terms }) {
  const [filteredTerms, setFilteredTerms] = useState([]); // Liste des termes filtrés
  const [searchQuery, setSearchQuery] = useState(""); // Recherche
  const [editingTerm, setEditingTerm] = useState(null); // Terme en cours d'édition
  const [viewMode, setViewMode] = useState(
    sessionStorage.getItem("viewMode") || "grid"
  ); // Mode d'affichage (grille ou liste)
  const [expandedTerms, setExpandedTerms] = useState(new Set()); // Gestion des descriptions longues
  const [form] = Form.useForm();

  useEffect(() => {
    if (Array.isArray(terms)) {
      setFilteredTerms(terms); // Initialise les termes filtrés avec les termes
    } else {
      setFilteredTerms([]); // Initialise avec une liste vide si terms n'est pas un tableau
    }
  }, [terms]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredTerms(terms); // Affiche tous les termes si aucune recherche
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = terms.filter(
        (term) =>
          term.word.toLowerCase().includes(lowerCaseQuery) ||
          term.definition.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredTerms(filtered); // Met à jour la liste des termes filtrés
    }
  };

  const handleEditTerm = (term) => {
    setEditingTerm(term);
    form.setFieldsValue({
      word: term.word,
      definition: term.definition,
      category: term.category,
      examples: term.examples?.join(", "),
      relatedTerms: term.relatedTerms,
    });
  };

  const handleUpdateTerm = async (values) => {
    try {
      // Transformation des champs si nécessaire
      const updatedTerm = {
        ...editingTerm,
        ...values,
        examples: values.examples.split(",").map((example) => example.trim()), // Convertir les exemples en tableau
      };
      await termApi.updateTerm(editingTerm._id, updatedTerm);
      fetchTerms(); // Rafraîchit les termes
      setEditingTerm(null);
      message.success("Terme mis à jour avec succès !");
    } catch (err) {
      message.error("Erreur lors de la mise à jour du terme.");
      console.error("Error updating term:", err);
    }
  };

  const handleDeleteTerm = async (termId) => {
    try {
      await termApi.deleteTerm(termId);
      fetchTerms(); // Rafraîchit les termes
      message.success("Terme supprimé avec succès !");
    } catch (err) {
      message.error("Erreur lors de la suppression du terme.");
      console.error("Error deleting term:", err);
    }
  };

  const handleViewChange = (e) => {
    const newViewMode = e.target.value;
    setViewMode(newViewMode);
    sessionStorage.setItem("viewMode", newViewMode);
  };

  const toggleExpandTerm = (termId) => {
    setExpandedTerms((prev) => {
      const newExpandedTerms = new Set(prev);
      if (newExpandedTerms.has(termId)) {
        newExpandedTerms.delete(termId);
      } else {
        newExpandedTerms.add(termId);
      }
      return newExpandedTerms;
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-semibold mb-6">
        Dictionnaire des Termes
      </h1>

      {/* Barre de recherche */}
      <div className="mb-4">
        <Input
          placeholder="Rechercher un terme par mot ou définition"
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Sélecteur de mode d'affichage */}
      <div className="mb-4 text-center">
        <Radio.Group value={viewMode} onChange={handleViewChange}>
          <Radio.Button value="grid">Grille</Radio.Button>
          <Radio.Button value="list">Liste</Radio.Button>
        </Radio.Group>
      </div>

      {/* Affichage des termes */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            : ""
        }
      >
        {filteredTerms.map((term) => (
          <div
            key={term._id}
            className={viewMode === "list" ? "mb-4 border p-4 rounded" : ""}
          >
            <Card
              hoverable
              style={{ width: "100%", position: "relative" }}
              className={viewMode === "list" ? "shadow-none" : ""}
            >
              <Card.Meta
                title={term.word}
                description={
                  <div>
                    <div
                      className={`text-gray-600 ${
                        expandedTerms.has(term._id) ||
                        term.definition.length <= 100
                          ? ""
                          : "truncate"
                      }`}
                      style={{
                        maxHeight:
                          expandedTerms.has(term._id) ||
                          term.definition.length <= 100
                            ? "none"
                            : "4.5rem",
                        overflow: expandedTerms.has(term._id)
                          ? "visible"
                          : "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {term.definition}
                    </div>
                    {term.definition.length > 100 && (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => toggleExpandTerm(term._id)}
                        className="p-0 mt-2"
                      >
                        {expandedTerms.has(term._id)
                          ? "Voir moins"
                          : "Voir plus"}
                      </Button>
                    )}
                  </div>
                }
              />
              <div className="mt-4 flex justify-between">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleEditTerm(term)}
                  style={{ marginRight: 8 }}
                >
                  Modifier
                </Button>
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer ce terme ?"
                  onConfirm={() => handleDeleteTerm(term._id)}
                  okText="Oui"
                  cancelText="Non"
                >
                  <Button type="danger" icon={<DeleteOutlined />} />
                </Popconfirm>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Modale pour modifier un terme */}
      <Modal
        title="Modifier le terme"
        visible={!!editingTerm}
        onCancel={() => setEditingTerm(null)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateTerm}
          initialValues={{
            word: editingTerm?.word,
            definition: editingTerm?.definition,
            category: editingTerm?.category,
            examples: editingTerm?.examples?.join(", "),
            relatedTerms: editingTerm?.relatedTerms,
          }}
        >
          {/* Mot */}
          <Form.Item
            name="word"
            label="Mot"
            rules={[{ required: true, message: "Le mot est requis !" }]}
          >
            <Input />
          </Form.Item>

          {/* Définition */}
          <Form.Item
            name="definition"
            label="Définition"
            rules={[{ required: true, message: "La définition est requise !" }]}
          >
            <Input.TextArea />
          </Form.Item>

          {/* Catégorie */}
          <Form.Item
            name="category"
            label="Catégorie"
            rules={[{ required: true, message: "La catégorie est requise !" }]}
          >
            <Select placeholder="Sélectionnez une catégorie">
              {Array.isArray(terms) && terms.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Exemples */}
          <Form.Item
            name="examples"
            label="Exemples"
            rules={[
              { required: true, message: "Ajoutez au moins un exemple !" },
            ]}
          >
            <Input.TextArea
              placeholder="Exemples séparés par des virgules"
              rows={4}
            />
          </Form.Item>

          {/* Termes liés */}
          <Form.Item
            name="relatedTerms"
            label="Termes liés"
            tooltip="Sélectionnez les termes liés (facultatif)"
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Sélectionnez les termes liés"
            >
              {Array.isArray(filteredTerms) && filteredTerms.map((term) => (
                <Select.Option key={term._id} value={term._id}>
                  {term.word}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Boutons */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Mettre à jour
            </Button>
            <Button
              type="default"
              onClick={() => setEditingTerm(null)}
              style={{ marginLeft: 10 }}
            >
              Annuler
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
