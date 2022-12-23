import { Link, useLocation } from "react-router-dom";
import { Badge, Card } from "react-bootstrap";

const Product = ({ product }) => {
  const location = useLocation();

  return (
    <Link
      to={`/product/${product.id}`}
      state={{ from: location }}
      className="text-decoration-none"
    >
      <Card className="my-3 border-0">
        <div className="position-relative">
          <Card.Img src={product.image} />
          {product.beforeSalePrice && (
            <Badge className="sale-badge text-bg-dark p-2">Sale</Badge>
          )}
        </div>
        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name.toUpperCase()}</strong>
          </Card.Title>

          <Card.Text as="div">
            <span className="text-line-through">
              {product.beforeSalePrice && `$${product.beforeSalePrice}`}
            </span>{" "}
            ${product.price}{" "}
            <span className="text-danger">
              {product.beforeSalePrice &&
                `Save ${Math.round(
                  (1 - product.price / product.beforeSalePrice) * 100
                )}%`}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Product;
