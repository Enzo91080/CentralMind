import React from "react";
import { Form, Input, Select, Button, Space, Spin } from "antd";

const TermForm = ({
  form,
  onFinish,
  loading,
  categories = [],
  terms = [],
  isEditing = false,
  initialValues = {},
  loadingCategories = false,
  onCancel,
}) => {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
      layout="vertical"
      aria-label={
        isEditing
          ? "Formulaire de modification de terme"
          : "Formulaire d'ajout de terme"
      }
    >
      {/* Mot */}
      <Form.Item
        name="word"
        label="Mot"
        rules={[{ required: true, message: "Le mot est requis!" }]}
      >
        <Input placeholder="Entrez le mot" />
      </Form.Item>

      {/* Définition */}
      <Form.Item
        name="definition"
        label="Définition"
        rules={[{ required: true, message: "La définition est requise!" }]}
      >
        <Input.TextArea placeholder="Entrez une définition" rows={4} />
      </Form.Item>

      {/* Catégorie */}
      <Form.Item
        name="category"
        label="Catégorie"
        rules={[{ required: true, message: "La catégorie est requise!" }]}
      >
        {loadingCategories ? (
          <Spin tip="Chargement des catégories..." />
        ) : (
          <Select placeholder="Sélectionnez une catégorie">
            {Array.isArray(categories) &&
              categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
          </Select>
        )}
      </Form.Item>

      {/* Exemples */}
      <Form.Item
        name="examples"
        label="Exemples"
        rules={[{ required: true, message: "Ajoutez au moins un exemple!" }]}
      >
        <Input.TextArea
          placeholder="Ajoutez des exemples (séparés par des virgules)"
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
          {terms.map((term) => (
            <Select.Option key={term._id} value={term._id}>
              {term.word}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Boutons */}
      <Form.Item>
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEditing ? "Mettre à jour" : "Ajouter"}
          </Button>
          <Button type="default" onClick={onCancel}>
            Annuler
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default TermForm;
