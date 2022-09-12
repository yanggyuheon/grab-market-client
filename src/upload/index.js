import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { API_URL } from "../config/constants";
import "./index.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price), // 문자열을 숫자로 변경
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
        history.replace("/"); // push 뒤로가기눌렀을 때 해당페이지로, replace 이전페이지 대체
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };
  const onChangeImage = (info) => {
    // 업로드 상태에 따라 분기 처리
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };
  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload // antd에서 제공, upload 쉽게 사용 가능
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={"false"} // 업로드한 이미지 확인할 때, 추가 이미지 안나오도록
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload-image" src={`${API_URL}/${imageUrl}`} alt="" />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/images/icons/camera.png" alt="" />
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Divider : 선 넣어준다 */}
        <Divider />
        <Form.Item
          label={<div className="upload-label">판매자 명</div>}
          name="seller"
          rules={[{ required: true, message: "판매자이름을 입력해주세요." }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력해주세요."
          />
        </Form.Item>

        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">상품 이름</div>}
          rules={[{ required: true, message: "상품 이름을 입력하세요." }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품 이름을 입력해주세요"
          />
        </Form.Item>

        <Divider />
        <FormItem
          name="price"
          label={<div className="upload-label">상품 가격</div>}
          rules={[{ required: true, message: "상품 가격을 입력하세요" }]}
        >
          <InputNumber defaultValue={0} className="upload-price" size="large" />
        </FormItem>

        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload-label">상품 소개</div>}
          rules={[{ required: true, message: "상품 소개를 적어주세요." }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount
            maxLength={300}
            placeholder="상품 소개를 적어주세요"
          />
        </Form.Item>

        <Divider />
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            문제 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
