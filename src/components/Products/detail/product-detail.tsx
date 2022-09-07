import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { getProductDatailAsync } from "../../../redux/reducer/product.reducer";

const ProductDetailScreen = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getProductDatailAsync(productId)).unwrap();
      // setProduct(res);
      console.log("result:", res);
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <div>
        <div className='single-image'>
          <img src='link' alt='anh' />
        </div>
        <div className='product-detail'>
          <div>
            <div>title</div>
            <div>price</div>
            <div>description</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
