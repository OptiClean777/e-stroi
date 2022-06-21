import React, { useEffect, useState, Children, cloneElement } from "react";
import "./Carousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PAGE_WIDTH = 1200;
export const Carousel = ({ children }) => {
  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleLeftArrowClick = () => {
    console.log("handleLeftArrowClick");

    setOffset((currentOffset) => {
      let newOffset = currentOffset + PAGE_WIDTH;
      if (newOffset > 0) {
        newOffset = -4800;
      }

      return newOffset;
    });
  };
  const handleRightArrowClick = () => {
    console.log("handleRightArrowClick");

    setOffset((currentOffset) => {
      let newOffset = currentOffset - PAGE_WIDTH;
      if (newOffset < -4800) {
        newOffset = 0;
      }

      return newOffset;
    });
  };

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            height: "100%",
            maxWidth: `${PAGE_WIDTH}`,
            minWidth: `${PAGE_WIDTH}`,
          },
        });
      })
    );
  }, []);

  return (
    <div className="mainContainer">
      <FaChevronLeft className="arrow" onClick={handleLeftArrowClick} />

      <div className="window">
        <div
          className="all-pages-container"
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {pages}
        </div>
      </div>
      <FaChevronRight className="arrow" onClick={handleRightArrowClick} />
    </div>
  );
};
