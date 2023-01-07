import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  getProductById,
  resetStatus,
  updateProductDetails,
  uploadImage,
} from "../store/productSlice";
import validateProductUpdate from "../validation/productUpdateValidation";
import FormItem from "../components/FormItem";

const ProductEditScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [beforeSalePrice, setBeforeSalePrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [addSalePrice, setAddSalePrice] = useState(false);
  const [imageError, setImageError] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({
    name: null,
    price: null,
    beforeSalePrice: null,
    brand: null,
    category: null,
    countInStock: null,
    description: null,
    longDescription: null,
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    error,
    loadingEditProduct,
    product,
    successUpdateProduct,
    productImage,
    loadingUpload,
    errorUpload,
  } = useSelector(state => state.product);

  const from =
    location.state?.from?.pathname && location.state?.from?.search
      ? `${location.state.from.pathname}${location.state.from.search}`
      : location.state?.from?.pathname
      ? location.state?.from?.pathname
      : "/admin/productlist";

  useEffect(() => {
    dispatch(getProductById(id));

    return () => dispatch(resetStatus());
  }, []);

  useEffect(() => {
    if (successUpdateProduct) {
      navigate("/admin/productlist");
    }
  }, [successUpdateProduct]);

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

      if (product.beforeSalePrice) {
        setBeforeSalePrice(product.beforeSalePrice);
        setAddSalePrice(true);
      } else {
        setAddSalePrice(false);
      }
    }
  }, [product]);

  useEffect(() => {
    if (productImage) {
      setImage(productImage);
    }
  }, [productImage]);

  const uploadFileHandler = e => {
    const filetypes = /jpg|jpeg|png/;
    const file = e.target.files[0];
    const splitFile = file.name.split(".");
    const filetype = splitFile[splitFile.length - 1].toLowerCase();
    const extname = filetypes.test(filetype);

    if (!extname) {
      setImageError("You can only upload images");
      return;
    }

    setImageError("");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadImage(formData));
  };

  const submitHandler = e => {
    e.preventDefault();

    const updatedProduct = {
      name,
      price,
      beforeSalePrice: addSalePrice ? beforeSalePrice : undefined,
      brand,
      category,
      countInStock,
      description,
      longDescription,
    };

    const errors = validateProductUpdate(updatedProduct);

    if (Object.keys(errors).length !== 0) {
      setErrorsMessage(errors);
      return;
    }
    if (imageError) return;

    setErrorsMessage({
      name: null,
      price: null,
      beforeSalePrice: null,
      brand: null,
      category: null,
      countInStock: null,
      description: null,
      longDescription: null,
    });
    dispatch(updateProductDetails({ id, ...updatedProduct, image }));
  };

  return (
    <Container>
      <Link to={from} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {errorUpload && <Message variant="danger">{errorUpload}</Message>}
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

            <FormItem
              controlId="price"
              label="Price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              message={errorsMessage && errorsMessage.price}
            />

            <Form.Check
              type="switch"
              id="custom-switch"
              label="Add Sale Price"
              className="mb-3"
              checked={addSalePrice}
              onChange={e => setAddSalePrice(e.target.checked)}
            />
            {addSalePrice && (
              <FormItem
                controlId="beforeSalePrice"
                label="Price Before Sale"
                type="number"
                placeholder="Enter price before sale"
                value={beforeSalePrice}
                onChange={e => setBeforeSalePrice(e.target.value)}
                message={errorsMessage && errorsMessage.beforeSalePrice}
              />
            )}

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
                isInvalid={imageError}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {imageError}
              </Form.Control.Feedback>
              {loadingUpload && <Loader />}
            </Form.Group>

            <FormItem
              controlId="brand"
              label="Brand"
              type="text"
              placeholder="Enter brand"
              value={brand}
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
            <FormItem
              controlId="longDescription"
              label="Long Description"
              type="textarea"
              placeholder="Enter description"
              value={longDescription}
              onChange={e => setLongDescription(e.target.value)}
              message={errorsMessage && errorsMessage.longDescription}
            />
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
