import React from "react";

export const Item = ({ children, className = "", ...rest }) => {
  return (
    <li className={"nav__item " + className} {...rest}>
      {children}
    </li>
  );
};

export const List = ({ children, className = "", ...rest }) => {
  return (
    <ul className={"nav__list " + className} {...rest}>
      {children}
    </ul>
  );
};

export const Nav = ({ children, className = "", ...rest }) => {
  return (
    <nav className={"nav " + className} {...rest}>
      {children}
    </nav>
  );
};
