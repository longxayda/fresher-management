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
import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import { createDashboardRoutes } from "routes";


import sidebarImage from "assets/img/sidebar-3.jpg";
// import {setupServer} from "fakeApis";

// setupServer();
function Admin() {
  const routes = createDashboardRoutes()
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const pathName =
    location.pathname.indexOf("/", 2) === -1
      ? location.pathname
      : location.pathname.substring(0, location.pathname.indexOf("/", 2));
  const handleRoutes = pathName === "/admin" ? routes : routes;
  const getRoutes = (handleRoutes) => {
    let routeComponents = [];
    let i = 0;
    for (let route of handleRoutes) {
      if (route.layout === "/admin" && !route.children) {
        routeComponents.push(
          <Route
            path={route.layout + route.path}
            render={(props) => <route.component {...props} />}
            key={i++}
          />
        );
      } else if (route.layout === "/admin" && route.children) {
        for (let child of route.children) {
          routeComponents.push(
            <Route
              path={route.layout + route.path + child.path}
              render={(props) => <child.component {...props} />}
              key={i++}
            />
          );
        }
      } 
    }
    return routeComponents;
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="wrapper">
        <Sidebar
          color={color}
          image={hasImage ? image : ""}
          routes={handleRoutes}
        />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar
            routes={pathName === "/admin" ? routes : routes}
          />
          <div className="content">
            <Switch>{getRoutes(handleRoutes)}</Switch>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
