import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const Announcement = () => {
  return (
    <div className='header'>
      <div className='container'>
        <div className='container_wrapper'>
          <div className='info'>
            <div>[+84]-098-765-432</div>
            <div>ecommerce@gmail.com</div>
          </div>
          <div className='social'>
            <div>
              <a
                href={"http://twitter.com"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                <TwitterOutlined />
              </a>
            </div>
            <div>
              <a
                href={"http://facebook.com"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                <FacebookOutlined />
              </a>
            </div>
            <div>
              <a
                href={"http://instagram.com"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                <InstagramOutlined />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
