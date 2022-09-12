import "./index.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";
import { Button, message } from "antd";

function ProductPage() {
  // destructuring useParams로 가져온 값 바로 id에 넣기
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  // product 정보 네트워크 통신
  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product); // product 키 값까지 접근해줘야 해서 .product로 수정
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(function () {
    // 렌더링 한번만 되도록
    getProduct();
  }, []);

  // 서버에서 정보를 불러오는게 비동기, if문 처리해주지 않으면 product가 null
  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다");
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} alt="" />
      </div>
      <div id="profile-box">
        <img src="/images/images/icons/avatar.png" alt="" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}원</div>
        <div id="createdAt">
          {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
        </div>
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldout === 1} // soldout일때 버튼 비활성화
        >
          상품 구매하기
        </Button>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}

export default ProductPage;
