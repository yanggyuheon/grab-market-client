import { useParams } from "react-router-dom";

function ProductPage() {
  // destructuring useParams로 가져온 값 바로 id에 넣기
  const { id } = useParams();
  return <h1>상품 상세 페이지 {id} 상품</h1>;
}

export default ProductPage;
