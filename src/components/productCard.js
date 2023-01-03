import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants";

dayjs.extend(relativeTime); // relativeTime 확장기능 사용하겠다
dayjs.locale("ko");

function PorductCard(props) {
  const product = props.product;
  return (
    <div className="product-card">
      {product.soldout === 1 && <div className="product-blur" />}

      <Link className="product-link" to={`/products/${product.id}`}>
        <div>
          <img
            className="product-img"
            src={`${API_URL}/${product.imageUrl}`}
            alt="{}"
          />
          <div className="product-contents">
            <span className="product-name">{product.name}</span>
            <span className="product-price">{product.price}원</span>
            <div className="product-footer">
              <span className="product-seller">
                <img
                  className="product-avatar"
                  src="/images/images/icons/avatar.png"
                  alt="{}"
                />
                <span>{product.seller}</span>
              </span>
              <span className="product-date">
                {dayjs(product.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PorductCard;
