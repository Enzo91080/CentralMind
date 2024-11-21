import { useNavigate, Link } from "react-router-dom";
import useAuth from "../Common/hooks/useAuth";
import { ROUTES } from "../Common/router";
import { Form, Input, Button, Alert } from "antd";

export default function Login() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Utilisation d'Ant Design pour le formulaire

  const handleSubmit = async (values) => {
    try {
      console.log("Tentative de connexion...");
      await login(values);
      navigate(ROUTES.TERMS);
    } catch (err) {
      console.error("Erreur de connexion :", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg px-8 py-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          {error && <Alert message={error} type="error" showIcon className="mb-4" />}
          <Form.Item
            name="email"
            label="Adresse Email"
            rules={[
              { required: true, message: "L'adresse email est requise !" },
              { type: "email", message: "Adresse email invalide !" },
            ]}
          >
            <Input placeholder="Entrez votre adresse email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mot de Passe"
            rules={[{ required: true, message: "Le mot de passe est requis !" }]}
          >
            <Input.Password placeholder="Entrez votre mot de passe" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </Form.Item>
        </Form>

        {/* Lien vers la page d'inscription */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{" "}
            <Link
              to={ROUTES.AUTH.REGISTER}
              className="text-blue-500 hover:underline"
            >
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
