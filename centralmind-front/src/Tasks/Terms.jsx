import { useState, useEffect, useContext } from "react";
import termApi from "./services/term.api";
import {
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Table,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import AuthContext from "../Common/contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import categoryApi from "../Categories/services/category.api";

export default function Terms({ fetchTerms, terms }) {
  const [filteredTerms, setFilteredTerms] = useState([]); // Liste des termes filtrés
  const [categories, setCategories] = useState([]); // Liste complète des catégories
  const [searchQuery, setSearchQuery] = useState(""); // Recherche
  const [editingTerm, setEditingTerm] = useState(null); // Terme en cours d'édition
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);

  // Vérifie si on est sur un appareil mobile
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (Array.isArray(terms)) {
      setFilteredTerms(terms); // Initialise les termes filtrés avec les termes
    } else {
      setFilteredTerms([]); // Initialise avec une liste vide si terms n'est pas un tableau
    }

    // Récupère les catégories lors du montage
    fetchCategories();
  }, [terms]);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response);
    } catch (err) {
      message.error("Erreur lors de la récupération des catégories.");
      console.error("Erreur lors de la récupération des catégories :", err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredTerms(terms); // Affiche tous les termes si aucune recherche
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = terms.filter(
        (term) =>
          term.word.toLowerCase().includes(lowerCaseQuery) ||
          term.definition.toLowerCase().includes(lowerCaseQuery) ||
          (term.category?.name &&
            term.category.name.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredTerms(filtered); // Met à jour la liste des termes filtrés
    }
  };

  const handleEditTerm = (term) => {
    setEditingTerm(term);
    form.setFieldsValue({
      word: term.word,
      definition: term.definition,
      category: term.category?._id, // Utilise l'ID de la catégorie pour le Select
      examples: term.examples?.join(", "),
      relatedTerms: term.relatedTerms,
    });
  };

  const handleUpdateTerm = async (values) => {
    try {
      const updatedTerm = {
        ...editingTerm,
        ...values,
        examples: values.examples.split(",").map((example) => example.trim()),
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

  // Colonnes de la table
  const columns = [
    {
      title: "Mot",
      dataIndex: "word",
      key: "word",
    },
    {
      title: "Définition",
      dataIndex: "definition",
      key: "definition",
      render: (text) => (
        <div className="truncate" style={{ maxWidth: 300 }}>
          {text}
        </div>
      ),
    },
    {
      title: "Catégorie",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.name || "Aucune",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, term) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditTerm(term)}
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
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-semibold mb-6">
        Dictionnaire des Termes
      </h1>

      {/* Barre de recherche */}
      <div className="mb-4 max-w-md mx-auto">
        <Input
          placeholder="Rechercher un terme par mot ou définition"
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Affichage en fonction de l'appareil */}
      {isMobile ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTerms.map((term) => (
            <div key={term._id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-bold">{term.word}</h2>
              <p>{term.definition}</p>
              {user && user.role === "admin" && (
                <div className="flex justify-between mt-4">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleEditTerm(term)}
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
              )}
            </div>
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredTerms}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      )}

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
            category: editingTerm?.category?._id, // Pré-remplir avec l'ID de la catégorie
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
              {categories.map((category) => (
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
