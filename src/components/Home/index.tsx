import axios from "axios";
import React, { useEffect, useState } from "react";

import "./styles.scss";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/books");

      console.log("result:", data);
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='wrapper'>
        {/* <div className='search'>Search</div>
        <div className='items'>Items</div> */}
        {products.map((item: any, index) => (
          <div key={index}>{item?.title}</div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
