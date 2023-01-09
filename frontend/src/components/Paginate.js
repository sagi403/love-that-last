import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Paginate = ({ pages, page, keyword, sortOrder }) => {
  const location = useLocation();

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map(x => (
          <LinkContainer
            key={x + 1}
            to={{
              pathname: location.pathname,
              search:
                keyword && sortOrder
                  ? `?pageNumber=${
                      x + 1
                    }&keyword=${keyword}&sortOrder=${sortOrder}`
                  : keyword
                  ? `?pageNumber=${x + 1}&keyword=${keyword}`
                  : sortOrder
                  ? `?pageNumber=${x + 1}&sortOrder=${sortOrder}`
                  : `?pageNumber=${x + 1}`,
            }}
          >
            <Pagination.Item disabled={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

Paginate.defaultProps = {
  keyword: "",
  sortOrder: "",
};

Paginate.prototype = {
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  keyword: PropTypes.string,
  sortOrder: PropTypes.string,
};

export default Paginate;
