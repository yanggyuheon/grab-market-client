// css처럼 export 없으면 import from 형식말고, import + 파일경로 형식 사용
import "./index.css";
import axios from "axios";
import React from "react";

function MainPageComponent() {
  const [products, setProducts] = React.useState([]);

  // 네트워크 통신 1번만 일어나도록 useEffect 2번째 인자 빈 배열로 설정
  React.useEffect(function () {
    // axios - 네트워크 통신
    axios
      .get(
        "https://5175e9ff-d747-4577-92f4-c31d4d530703.mock.pstmn.io/products"
      )
      .then(function (result) {
        const products = result.data.products;

        // setProducts로 state 업데이트
        setProducts(products);
      })
      .catch(function (error) {
        console.log("실패", error);
      });
  }, []);

  // return 할 때 복수의 태그 리턴안되서 div로 씌워준다
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <img src="images/images/icons/logo.png" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/images/banners/banner1.png" />
        </div>
        <h1>판매되는 상품들</h1>
        <div id="product-list">
          {/* map으로 반복하면서 product 불러오기 */}
          {products.map(function (product, index) {
            return (
              <div className="product-card">
                <div>
                  <img className="product-img" src={product.imageUrl} />
                  <div className="product-contents">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}원</span>
                    <span className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/images/icons/avatar.png"
                      />
                      <span>{product.seller}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default MainPageComponent;
