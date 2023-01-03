// css처럼 export 없으면 import from 형식말고, import + 파일경로 형식 사용
import "./index.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { Carousel } from "antd";
import { API_URL } from "../config/constants.js";
import "dayjs/locale/ko";
import PorductCard from "../components/productCard";

dayjs.extend(relativeTime); // relativeTime 확장기능 사용하겠다
dayjs.locale("ko");

function MainPageComponent() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);

  // 네트워크 통신 1번만 일어나도록 useEffect 2번째 인자 빈 배열로 설정
  React.useEffect(() => {
    // axios - 네트워크 통신
    axios
      .get(`${API_URL}/products`)
      .then(function (result) {
        const products = result.data.products;

        // setProducts로 state 업데이트
        setProducts(products);
      })
      .catch(function (error) {
        console.log("실패", error);
      });

    axios // 배너 서버통신으로 가져오기, setBanners로 state변경
      .get(`${API_URL}/banners`)
      .then((result) => {
        console.log(result);
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch((error) => {
        console.error("에러 발생 :", error);
      });
  }, []);

  // return 할 때 복수의 태그 리턴안되서 div로 씌워준다
  return (
    <div>
      {/* autoplay : autoplay=true와 같다. 자동 넘겨주기 */}
      <Carousel autoplay autoplaySpeed={4000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageUrl}`} alt="{}" />
              </div>
            </Link>
          );
        })}
      </Carousel>

      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product-list">
        {products.map(function (product, index) {
          return <PorductCard product={product} key={index} />;
        })}
      </div>
    </div>
  );
}

export default MainPageComponent;
