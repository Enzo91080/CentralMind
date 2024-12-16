import { Button, Form, message, Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import categoryApi from "../Categories/services/category.api";
import PageCanvas from "../Common/components/Panels/PageCanvas";
import TermForm from "./TermForm"; // Import du composant TermForm
import Terms from "./Terms";
import termApi from "./services/term.api";
import AuthContext from "../Common/contexts/AuthContext";

const TermsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Chargement des requêtes
  const [loadingCategories, setLoadingCategories] = useState(false); // Chargement des catégories
  const [terms, setTerms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  const {user} = useContext(AuthContext); // Utilisation du contexte pour vérifier l'état de connexion

  const fetchData = async () => {
    try {
      setLoadingCategories(true);
      const [termsResponse, categoriesResponse] = await Promise.all([
        termApi.getAllTerms(),
        categoryApi.getAllCategories(),
      ]);
      setTerms(termsResponse);
      setCategories(categoriesResponse);
    } catch (err) {
      message.error("Erreur lors de la récupération des données.");
      console.error("Error fetching data:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleAddTerm = async (values) => {
    setLoading(true);
    try {
      await termApi.createTerm(values);
      message.success("Terme ajouté avec succès !");
      fetchData(); // Rafraîchit les termes et catégories après ajout
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
      <PageCanvas title="Liste des termes">
        <PageCanvas.Actions>
          {/* que si je suis connecté en tant qu'admin */}
          {
            user && user.role === "admin" && (
              <Button type="primary" onClick={showModal}>
                Créer un terme
              </Button>
            )
          }
        </PageCanvas.Actions>

        <PageCanvas.Content>
          <Terms terms={terms} fetchTerms={fetchData} />
        </PageCanvas.Content>
      </PageCanvas>

      <Modal
        title="Ajouter un terme"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <TermForm
          form={form}
          onFinish={handleAddTerm}
          loading={loading}
          categories={categories}
          terms={terms}
          loadingCategories={loadingCategories}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default TermsPage;
