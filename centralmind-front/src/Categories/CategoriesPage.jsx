import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import PageCanvas from "../Common/components/Panels/PageCanvas";
import categoryApi from "./services/category.api";
import Categories from "./Categories";

const CategoriesPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // Categories en cours
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response);
    } catch (err) {
      message.error("Erreur lors de la récupération des catégories.");
      console.error("Error fetching terms:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleAddCategory = async (values) => {
    setLoading(true);
    try {
      const newCategory = await categoryApi.createCategory(values);
      message.success("La catégorie" + newCategory.name + " a été ajouté avec succès.");
      fetchCategories();
      setIsModalVisible(false);
    } catch (err) {
      message.error("Erreur lors de l'ajout du terme.");
      console.error("Error adding term:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageCanvas title="Liste des catégories">
        <PageCanvas.Actions>
          <Button type="primary" onClick={showModal}>
            Créer une catégorie
          </Button>
        </PageCanvas.Actions>

        <PageCanvas.Content>
          <Categories categories={categories} fetchCategories={fetchCategories} />
        </PageCanvas.Content>
      </PageCanvas>

      <Modal
        title="Ajouter une catégorie"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddCategory} layout="vertical">
          <Form.Item
            name="name"
            label="Titre de la catégorie"
            rules={[{ required: true, message: "Le titre est requis!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description de la catégorie"
            rules={[{ required: true, message: "La description est requise!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Ajouter la catégorie
            </Button>
            <Button type="default" onClick={handleCancel} style={{ marginTop: 10 }} block>
              Annuler
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoriesPage;


