import React from "react";
import { Link } from "react-router-dom";
import "./MultilevelMenu.css";
const MultilevelMenu = ({ data, currentUser }) => {
  const renderMenuItems = (data, isParentVisible) => {
    return data.map((item, index) =>
      (currentUser && item.needLogin) ||
      (!currentUser && !item.needLogin) ||
      isParentVisible ? (
        item?.children && item?.children.length ? (
          <li key={index}>
            <Link to={"#"}>{item.name}</Link>
            <ul>{renderMenuItems(item.children, true)}</ul>
          </li>
        ) : (
          <li key={index}>
            <Link to={item.url}>{item.name}</Link>
          </li>
        )
      ) : (
        <></>
      )
    );
  };
  return (
    data && (
      <div className="multilevelMenu">
        <ul className="main-navigation">{renderMenuItems(data, false)}</ul>
      </div>
    )
  );
};
export default MultilevelMenu;
