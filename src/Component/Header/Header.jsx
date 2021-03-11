import React, { useEffect, useState } from "react";
import "./Header.scss";

const editIdElement = (jsonMas, suffix) => {
    let jsonNewMass = jsonMas.map(item => {
        return {
            ...item, 
            id: item.id + suffix
        }
    })

    return jsonNewMass
}

const createNewMass = (jsonMas, newElem) => {
    const iconsRightFull = jsonMas.map(item =>{
        return {
            ...item
        }
      })
      iconsRightFull.unshift(newElem)
    
    return iconsRightFull
}


const Header = (props) => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const { logo, iconsLeft, coins, iconsRight, menuIcons } = data;

  

  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="header_inner">
          <Logo id={logo.id} img={logo.img} title={logo.title} />
          <nav id="nav" className="nav">
            <ul id="active_elem_menu" className="nav_item"></ul>
            <NavItem
              id="nav_left"
              elements={iconsLeft}
              classList={{
                  main: 'nav_item nav_item--left',
                  child: {
                      wrapper: 'nav_link',
                      img: 'nav_link_img',
                      title: 'nav_link_title'
                  }
              }}
              isTitle={true}
            />
            <NavItem
              id="nav_right"
              elements={iconsRight}
              addElem={{
                elem: coins,
                classList: {
                    wrapper: 'nav_link',
                    img: 'nav_link_coins',
                    title: 'nav_link_counter_coins'
                }
              }}
              classList={{
                main: 'nav_item nav_item--right',
                child: {
                    wrapper: 'nav_link',
                    img: 'nav_link_img',
                    title: 'nav_link_title'
                }
              }}
              isTitle={false}
            />
            <NavItem
              id="menu_icon"
              elements={menuIcons}
              classList={{
                main: 'nav_item',
                child: {
                    wrapper: 'nav_menu_icon',
                    img: 'nav_menu_icon_img',
                    title: 'nav_link_title'
                }
              }}
              isTitle={true}
            />
          </nav>
        </div>
        <NavItem id="nav_menu_left"
                 elements={editIdElement(iconsLeft, '_menu')}
                 classList={{
                     main: 'nav_menu_item nav_menu_item--left',
                     child: {
                         wrapper: 'nav_menu_link',
                         img: 'nav_menu_img',
                         title: 'nav_menu_title'
                     }
                 }}
                 isTitle={true}
        />
        <NavItem id="nav_menu_right"
                 elements={editIdElement(createNewMass(iconsRight, coins), '_menu')}
                 classList={{
                     main: 'nav_menu_item nav_menu_item--right',
                     child: {
                         wrapper: 'nav_menu_link',
                         img: 'nav_menu_img',
                         title: 'nav_menu_title'
                     }
                 }}
                 isTitle={true}
        />
      </div>
    </header>
  );
};

const Logo = ({ img, title, id }) => {
  return (
    <div id={id} className="header_logo">
      <img className="header_logo_img" src={img} />
      <span className="header_logo_title">{title}</span>
    </div>
  );
};

const ElementLi = ({ imgSrc, text, id, className, isTitle }) => {
  const {wrapper, img, title} = className
  return (
    <li id={id} className={`${wrapper} ${wrapper}--${id}`}>
      <img className={img} src={imgSrc} />
      {isTitle ? <span className={title}>{text}</span> : null}
    </li>
  );
};

const NavItem = ({ elements, id, addElem, classList, isTitle }) => {
  const {main, child} = classList
  const listElements = elements.map((item) => (
    <ElementLi
      key={item.id}
      id={item.id}
      imgSrc={item.img}
      text={item.title}
      className={child}
      isTitle={isTitle}
    />
  ));
  return (
    <ul id={id} className={main}>
      {addElem ? 
        <ElementLi
          id={addElem.elem.id}
          imgSrc={addElem.elem.img}
          text={addElem.elem.title}
          isTitle={!isTitle}
          className={addElem.classList}
        />
       : null}
      {listElements}
    </ul>
  );
};

export default Header;
