import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Modal, Popconfirm, Radio } from "antd";
import React, { useEffect, useState } from "react";
import categoryApi from "./services/category.api";

const Categories = () => {
  const [categories, setCategories] = useState([]); // Liste des catégories
  const [filteredCategories, setFilteredCategories] = useState([]); // Catégories filtrées
  const [searchQuery, setSearchQuery] = useState(""); // Recherche
  const [editingCategory, setEditingCategory] = useState(null); // Catégorie en cours d'édition
  const [viewMode, setViewMode] = useState("grid"); // Mode d'affichage (grille ou liste)
  const [form] = Form.useForm(); // Formulaire pour la modale

  // Récupérer les catégories depuis l'API
  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response);
      setFilteredCategories(response); // Initialise les catégories filtrées
    } catch (err) {
      message.error("Erreur lors de la récupération des catégories.");
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories(); // Récupère les catégories lors du montage du composant
  }, []);

  // Gestion de la recherche
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredCategories(categories); // Réinitialise les catégories filtrées
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = categories.filter(
        (category) =>
          category.name.toLowerCase().includes(lowerCaseQuery) || // Filtre par nom
          category.description.toLowerCase().includes(lowerCaseQuery) // Filtre par description
      );
      setFilteredCategories(filtered);
    }
  };

  // Gestion de l'édition
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
    });
  };

  const handleUpdateCategory = async (values) => {
    try {
      const updatedCategory = { ...editingCategory, ...values };
      await categoryApi.updateCategory(editingCategory._id, updatedCategory);
      fetchCategories(); // Rafraîchit les catégories
      setEditingCategory(null);
      message.success("Catégorie mise à jour avec succès !");
    } catch (err) {
      message.error("Erreur lors de la mise à jour de la catégorie.");
      console.error("Error updating category:", err);
    }
  };

  // Gestion de la suppression
  const handleDeleteCategory = async (categoryId) => {
    try {
      await categoryApi.deleteCategory(categoryId);
      fetchCategories(); // Rafraîchit les catégories
      message.success("Catégorie supprimée avec succès !");
    } catch (err) {
      message.error("Erreur lors de la suppression de la catégorie.");
      console.error("Error deleting category:", err);
    }
  };

  // Changement de vue (grille ou liste)
  const handleViewChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-semibold mb-6">
        Tableau de bord des catégories
      </h1>

      {/* Barre de recherche */}
      <div className="mb-4">
        <Input
          placeholder="Rechercher une catégorie par nom ou description"
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

      {/* Affichage des catégories */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            : ""
        }
      >
        {filteredCategories.map((category) => (
          <Card
            key={category._id}
            hoverable
            title={category.name}
            className={
              viewMode === "list"
                ? "mb-4 shadow-none border p-4 rounded"
                : "shadow-md"
            }
            actions={[
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleEditCategory(category)}
              >
                Modifier
              </Button>,
              <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer cette catégorie ?"
                onConfirm={() => handleDeleteCategory(category._id)}
                okText="Oui"
                cancelText="Non"
              >
                <Button type="link" danger icon={<DeleteOutlined />}>
                  Supprimer
                </Button>
              </Popconfirm>,
            ]}
          >
            <p>{category.description}</p>
          </Card>
        ))}
      </div>

      {/* Modale pour modifier une catégorie */}
      <Modal
        title="Modifier la catégorie"
        visible={!!editingCategory}
        onCancel={() => setEditingCategory(null)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateCategory}
          initialValues={{
            name: editingCategory?.name,
            description: editingCategory?.description,
          }}
        >
          <Form.Item
            name="name"
            label="Nom de la catégorie"
            rules={[{ required: true, message: "Le nom est requis !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "La description est requise !" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Mettre à jour
            </Button>
            <Button
              type="default"
              onClick={() => setEditingCategory(null)}
              style={{ marginLeft: 10 }}
            >
              Annuler
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
