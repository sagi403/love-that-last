import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const OrderScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return <div>OrderScreen</div>;
};

export default OrderScreen;
