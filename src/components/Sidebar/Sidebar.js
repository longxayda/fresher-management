/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { NavLink, useLocation } from "react-router-dom";

import {
  Nav,
  Accordion,
  useAccordionButton,
  Button,
  Stack,
} from "react-bootstrap";
import {storage} from "services/storage";

function CustomToggle({ children, eventKey, icon }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => null);
  return (
    <>
      <style>
        {`
          .btn-submenu{
            background-color: transparent;
            border: none;
            width: 90%;
            text-transform: uppercase;
            margin: 5px 15px;
            padding: 10px 15px;
          }
          .btn-submenu:hover{
            background-color: grey;
          }
      `}
      </style>
      <button className="nav-link btn-submenu" onClick={decoratedOnClick}>
        <Stack direction="horizontal" gap={3}>
          <i className={icon}></i>
          <span>{children}</span>
          {/* <i className="far fa-arrow-alt-circle-down fa-lg ms-auto"></i> */}
        </Stack>
      </button>
    </>
  );
}

function Sidebar({ color, image, routes }) {
  const userIndentity = storage.getCache("user");
  const location = useLocation();
  const pathName = location.pathname.indexOf('/',2) === -1 ? location.pathname : location.pathname.substring(0,location.pathname.indexOf('/',2));
  const roleName = userIndentity.roles.toString();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <div
            style={{
              textDecoration: "none",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E3E3E3",
              borderRadius: "4px",
              color: "#565656",
              display: "flex",
              justifyContent: "center",
              lineHeight: "34px",
              height: "34px",
              boxShadow: "none",
              width: "100%",
            }}
          >
            <p 
              style={
                {
                  color: "black",
                  fontWeight: "500",
                  textDecoration: "none",
                }
              }
            >
              {roleName}
            </p>
          </div>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect && !prop.children) {
              if (prop?.hide) {
                return null;
              } else {
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
            } else if (!prop.redirect && prop.children)
              return (
                <Accordion flush key={key}>
                  <>
                    <CustomToggle eventKey={key} icon={prop.icon}>
                      {prop.name}
                    </CustomToggle>
                    <Accordion.Collapse
                      eventKey={key}
                      style={{ borderBottom: "2px solid grey" }}
                    >
                      <>
                        {prop.children?.map((child, key) => (
                          <li
                            className={
                              prop.upgrade
                                ? "active active-pro"
                                : activeRoute(
                                    prop.layout + prop.path + child.path
                                  )
                            }
                            key={key}
                          >
                            <NavLink
                              to={prop.layout + prop.path + child.path}
                              className="nav-link"
                              activeClassName="active"
                              style={{ paddingLeft: "10%" }}
                            >
                              <p>
                                <i className={child.icon}></i>
                                {child.name}
                              </p>
                            </NavLink>
                          </li>
                        ))}
                      </>
                    </Accordion.Collapse>
                  </>
                </Accordion>
              );
            else if(prop.layout === "/trainee"){
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
