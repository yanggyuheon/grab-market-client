import "./index.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductPage() {
  // destructuring useParams로 가져온 값 바로 id에 넣기
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(function () {
    // 렌더링 한번만 되도록
    axios
      .get(
        `https://5175e9ff-d747-4577-92f4-c31d4d530703.mock.pstmn.io/products/${id}`
      )
      .then(function (result) {
        setProduct(result.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  // 서버에서 정보를 불러오는게 비동기, if문 처리해주지 않으면 product가 null
  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

  return (
    <div>
      <div id="image-box">
        <img src={"/" + product.imageUrl} />
      </div>
      <div id="profile-box">
        <img src="/images/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}원</div>
        <div id="createdAt">2022년 9월 9일</div>
        <div id="description">{product.description}</div>
      </div>
    </div>
  );
}

export default ProductPage;
