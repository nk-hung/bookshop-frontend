import { Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { logoutAction, selectorAuth } from "../../redux/reducer/auth.reducer";
import {
  getProductDatailAsync,
  getProductsAsync,
} from "../../redux/reducer/product.reducer";

import "./styles.scss";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getProductsAsync()).unwrap();

      console.log("product:", res);
      setProducts(res);
    };

    fetchData();
  }, [dispatch]);

  const getDetail = async (id: number) => {
    const res = await dispatch(getProductDatailAsync(id));
    console.log("detail:", res);
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='wrapper_search'>
          <div className='input_container'>
            <h3>BOOKSTORE</h3>
            <Input
              name='keyword'
              placeholder='Searching ...'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              // className='search_input'
            />
          </div>
          <div>Account</div>
        </div>
        <div>
          {products.map((item: any, index) => (
            <div key={index}>
              <Link to={`products/${item.id}`}>
                <img src={item.image} alt='anh' />
              </Link>
              <div>{item?.title}</div>
              <div>{item.price}</div>
              <div>{item.description}</div>
            </div>
          ))}
        </div>
        {/* <div className='search'>Search</div>
        <div className='items'>Items</div> */}
        <button onClick={() => dispatch(logoutAction())}>Logout</button>
      </div>
    </div>
  );
};

export default HomeScreen;
