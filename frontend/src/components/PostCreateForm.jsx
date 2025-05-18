import { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import {
  useCreateMutation,
  useGetCategoriesQuery,
} from "../slices/postsApiSlice";

const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
  });

  // Fetch categories
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

  // Post creation mutation
  const [createPost, { isLoading, isError, error }] = useCreateMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(formData).unwrap();
      // Reset form on success
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        category: "",
      });
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="mb-4">Create New Post</h2>

      {/* Error Handling */}
      {isCategoriesError && (
        <Alert variant="danger">
          Failed to load categories:{" "}
          {categoriesError?.data?.message || "Server error"}
        </Alert>
      )}

      {isError && (
        <Alert variant="danger">
          {error?.data?.message || "Failed to create post"}
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={100}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          maxLength={500}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          placeholder="https://example.com/image.jpg"
        />
        <Form.Text>Must be a valid image URL (jpg, png, etc.)</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        {isCategoriesLoading ? (
          <Row>
            <Col xs="auto">
              <Spinner size="sm" animation="border" />
            </Col>
            <Col>Loading categories...</Col>
          </Row>
        ) : (
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={isCategoriesError}
          >
            <option value="">Select a category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        )}
        {isCategoriesError && (
          <Form.Text className="text-danger">
            Couldn't load categories. Please refresh the page.
          </Form.Text>
        )}
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading || isCategoriesError}
      >
        {isLoading ? (
          <>
            <Spinner as="span" size="sm" animation="border" /> Creating...
          </>
        ) : (
          "Create Post"
        )}
      </Button>
    </Form>
  );
};

export default CreatePostForm;
