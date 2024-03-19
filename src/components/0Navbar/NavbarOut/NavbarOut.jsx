import "../Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Layout, Button, Menu } from "antd";
const { Header } = Layout;

export default function NavbarOut() {
  let page = useLocation().pathname.split("/")[2];

  // const items = [
  //   {
  //     key: "paintservices",
  //     label: (
  //       <Link to="/paintservices" className="link">
  //         x
  //       </Link>
  //     ),
  //   }
  // ];

  return (
    <Header className="navbar" style={{ backgroundColor: "white" }}>
      
      <Link to="/">
        <div className="brand">
          <img src="/0NavBarApplogo/speakinghead.gif" alt="Logo" style={{ width: 50, height: 50 }} />
          <span className="app-name" >HearSay</span>
        </div>
      </Link>

      {/* <Menu
        className="menu"
        selectedKeys={page}
        theme="light"
        mode="horizontal"
        items={items}
      /> */}

      {/* <div className="auth-buttons">
        <Link to="/login">
          <Button style={{ backgroundColor: "#01628f" }} type="primary">Log In</Button>
        </Link>
        <Link to="/signup">
          <Button type="default" >Sign Up</Button>
        </Link>
      </div> */}
    </Header>
  );
}
