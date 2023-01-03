import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getProductById, resetStatus } from "../store/productSlice";
import validateProductUpdate from "../validation/productUpdateValidation";
import FormItem from "../components/FormItem";

const ProductEditScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  // const [beforeSalePrice, setBeforeSalePrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errorsMessage, setErrorsMessage] = useState({
    name: null,
    price: null,
    // beforeSalePrice: null,
    image: null,
    brand: null,
    category: null,
    countInStock: null,
    description: null,
    longDescription: null,
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loadingEditProduct, product } = useSelector(
    state => state.product
  );

  useEffect(() => {
    dispatch(getProductById(id));

    return () => dispatch(resetStatus());
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setLongDescription(product.longDescription);
      // product.beforeSalePrice && setBeforeSalePrice(product.beforeSalePrice);
    }
  }, [product]);

  const uploadFileHandler = e => {};

  const submitHandler = e => {
    e.preventDefault();

    const errors = validateProductUpdate({
      name,
      price,
      // beforeSalePrice,
      image,
      brand,
      category,
      countInStock,
      description,
      longDescription,
    });

    if (Object.keys(errors).length !== 0) {
      setErrorsMessage(errors);
      return;
    }

    setErrorsMessage({
      name: null,
      price: null,
      // beforeSalePrice: null,
      image: null,
      brand: null,
      category: null,
      countInStock: null,
      description: null,
      longDescription: null,
    });
  };

  return (
    <Container>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingEditProduct ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormItem
              controlId="name"
              label="Name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
              message={errorsMessage && errorsMessage.name}
            />

            {/* <Form.Group controlId="beforeSalePrice" className="mb-3">
              <Form.Label>Price Before Sale</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price before sale"
                value={beforeSalePrice}
                onChange={e => setBeforeSalePrice(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <FormItem
              controlId="price"
              label="Price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              message={errorsMessage && errorsMessage.price}
            />

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <FormItem
              controlId="brand"
              label="Brand"
              type="text"
              placeholder="Enter brand"
              value={price}
              onChange={e => setBrand(e.target.value)}
              message={errorsMessage && errorsMessage.brand}
            />
            <FormItem
              controlId="countInStock"
              label="Count In Stock"
              type="number"
              placeholder="Enter stock"
              value={countInStock}
              onChange={e => setCountInStock(e.target.value)}
              message={errorsMessage && errorsMessage.countInStock}
            />
            <FormItem
              controlId="category"
              label="Category"
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              message={errorsMessage && errorsMessage.category}
            />
            <FormItem
              controlId="description"
              label="Description"
              type="textarea"
              placeholder="Enter description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              message={errorsMessage && errorsMessage.description}
            />

            {/* <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                row="3"
                placeholder="Enter description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <FormItem
              controlId="longDescription"
              label="Long Description"
              type="textarea"
              placeholder="Enter description"
              value={longDescription}
              onChange={e => setLongDescription(e.target.value)}
              message={errorsMessage && errorsMessage.longDescription}
            />

            {/* <Form.Group controlId="longDescription" className="mb-3">
              <Form.Label>Long Description</Form.Label>
              <Form.Control
                as="textarea"
                row="5"
                placeholder="Enter description"
                value={longDescription}
                onChange={e => setLongDescription(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default ProductEditScreen;
