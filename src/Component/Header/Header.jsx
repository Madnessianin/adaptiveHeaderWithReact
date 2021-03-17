import React, { useEffect, useReducer, useState } from "react";
import "./Header.scss";
import headerReducer, { setMenuActive, setMobileTitle } from "./HeaderReducer";

const editIdElement = (jsonMas, suffix) => {
  let jsonNewMass = jsonMas.map((item) => {
    return {
      ...item,
      id: item.id + suffix,
    };
  });

  return jsonNewMass;
};

const createNewMass = (jsonMas, newElem) => {
  let iconsRightFull = jsonMas.map((item) => {
    return {
      ...item,
    };
  });
  iconsRightFull.unshift(newElem);

  return iconsRightFull;
};

const Header = (props) => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const { logo, iconsLeft, coins, iconsRight, menuIcons } = data;

  const [stateHeader, dispatchStateHeader] = useReducer(headerReducer, {
    menuLeftActive: false,
    menuRightActive: false,
    mobileTitle: undefined,
  });

  const setIdActiveElement = (elem) => {
    dispatchStateHeader(setMenuActive(elem.id));
  };

  const setTitle = (elem) => {
    dispatchStateHeader(setMobileTitle(elem));
  };

  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="header_inner">
          <Logo id={logo.id} img={logo.img} title={logo.title} />
          <nav id="nav" className="nav">
            <NavItem
              id="active_elem_menu"
              elements={
                stateHeader.mobileTitle
                  ? editIdElement([stateHeader.mobileTitle], "_title")
                  : [null]
              }
              classList={{
                main: "nav_item",
                child: {
                  wrapper: "menu_title",
                  imgClass: "menu_title_img",
                  titleClass: "menu_title_text",
                },
              }}
              flags={{
                isTitle: true,
                action: {
                  isAction: false,
                  callBack: null,
                },
              }}
            />
            <NavItem
              id="nav_left"
              elements={iconsLeft}
              classList={{
                main: "nav_item nav_item--left",
                child: {
                  wrapper: "nav_link",
                  imgClass: "nav_link_img",
                  titleClass: "nav_link_title",
                },
              }}
              flags={{
                isTitle: true,
                action: {
                  isAction: false,
                  callBack: null,
                },
              }}
            />
            <NavItem
              id="nav_right"
              elements={iconsRight}
              addElem={{
                elem: coins,
                classList: {
                  wrapper: "nav_link",
                  imgClass: "nav_link_coins",
                  titleClass: "nav_link_counter_coins",
                },
              }}
              classList={{
                main: "nav_item nav_item--right",
                child: {
                  wrapper: "nav_link",
                  img: "nav_link_img",
                  title: "nav_link_title",
                },
              }}
              flags={{
                isTitle: false,
                action: {
                  isAction: false,
                  callBack: null,
                },
              }}
            />
            <NavItem
              id="menu_icon"
              elements={menuIcons}
              classList={{
                main: "nav_item",
                child: {
                  wrapper: "nav_menu_icon",
                  imgClass: "nav_menu_icon_img",
                  titleClass: "nav_link_title",
                },
              }}
              flags={{
                isTitle: true,
                action: {
                  isAction: true,
                  callBack: setIdActiveElement,
                },
              }}
            />
          </nav>
        </div>
        <NavItem
          id="nav_menu_left"
          elements={editIdElement(iconsLeft, "_menu")}
          classList={{
            main: `nav_menu_item nav_menu_item--left ${
              stateHeader.menuLeftActive ? "menu_active" : ""
            }`,
            child: {
              wrapper: "nav_menu_link",
              imgClass: "nav_menu_img",
              titleClass: "nav_menu_title",
            },
          }}
          flags={{
            isTitle: true,
            action: {
              isAction: true,
              callBack: setTitle,
            },
          }}
        />
        <NavItem
          id="nav_menu_right"
          elements={editIdElement(createNewMass(iconsRight, coins), "_menu")}
          classList={{
            main: `nav_menu_item nav_menu_item--right ${
              stateHeader.menuRightActive ? "menu_active" : ""
            }`,
            child: {
              wrapper: "nav_menu_link",
              imgClass: "nav_menu_img",
              titleClass: "nav_menu_title",
            },
          }}
          flags={{
            isTitle: true,
            action: {
              isAction: false,
              callBack: null,
            },
          }}
        />
      </div>
    </header>
  );
};

const Logo = ({ img, title, id }) => {
  return (
    <div id={id} className="header_logo">
      <img className="header_logo_img" src={img} alt="" />
      <span className="header_logo_title">{title}</span>
    </div>
  );
};

const ElementLi = ({ elem, className, flags }) => {
  const { id, img, title, size } = elem;
  const { wrapper, imgClass, titleClass } = className;
  const { isTitle, action } = flags;
  const { isAction, callBack } = action;

  const setAction = (elem) => {
    callBack(elem);
  };

  return (
    <li
      id={id}
      onClick={isAction ? () => setAction(elem) : null}
      className={`${wrapper} ${wrapper}--${id}`}
    >
      <img className={imgClass} src={img} style={{width: size, height: size}} alt="" />
      {isTitle ? <span className={titleClass}>{title}</span> : null}
    </li>
  );
};

const NavItem = ({ elements, id, addElem, classList, flags }) => {
  const { main, child } = classList;
  const listElements = elements.map((item) => {
    if (item !== null) {
      return (
        <ElementLi key={item.id} elem={item} className={child} flags={flags} />
      );
    }
    return null;
  });

  return (
    <ul id={id} className={main}>
      {addElem ? (
        <ElementLi
          elem={addElem.elem}
          flags={{
            isTitle: !flags.isTitle,
            action: flags.action,
          }}
          className={addElem.classList}
        />
      ) : null}
      {listElements}
    </ul>
  );
};

export default Header;
