import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import useAuth from "../Common/hooks/useAuth";
import { ROUTES } from "../Common/router";

export default function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", values); // Log pour debug
    const { firstName, lastName, email, password } = values;

    try {
      console.log("Tentative d'inscription...");
      await register({ firstName, lastName, email, password });
      navigate(ROUTES.AUTH.LOGIN);
    } catch (err) {
      console.error("Erreur d'inscription :", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg px-8 py-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit} // Connecté correctement
        >
          {error && <Alert message={error} type="error" showIcon className="mb-4" />}
          <Form.Item
            name="firstName"
            label="Prénom"
            rules={[{ required: true, message: "Le prénom est requis !" }]}
          >
            <Input placeholder="Entrez votre prénom" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Nom de famille"
            rules={[{ required: true, message: "Le nom de famille est requis !" }]}
          >
            <Input placeholder="Entrez votre nom" />
          </Form.Item>
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
            label="Mot de passe"
            rules={[
              { required: true, message: "Le mot de passe est requis !" },
              { min: 6, message: "Le mot de passe doit contenir au moins 6 caractères !" },
            ]}
          >
            <Input.Password placeholder="Entrez votre mot de passe" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirmez le mot de passe"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Veuillez confirmer votre mot de passe !" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Les mots de passe ne correspondent pas !")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirmez votre mot de passe" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? "Inscription..." : "S'inscrire"}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Déjà inscrit ?{" "}
            <Link
              to={ROUTES.AUTH.LOGIN}
              className="text-blue-500 hover:underline"
            >
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
