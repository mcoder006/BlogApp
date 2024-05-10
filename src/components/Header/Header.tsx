
import { Link, useNavigate } from "react-router-dom";
import { Container, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
// import { RootState } from "@reduxjs/toolkit/query";

interface RootState {
  auth: {
    status: boolean;
    userData: null | string;
  };
}

const Header = () => {

  const authStatus = useSelector((state: RootState) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      active: authStatus,
    },

  ];

  return (
    <header className="w-full text-white bg-slate-500">
      <Container>
        <nav className="flex justify-between p-3">
          <div>
            <Link to={"/"}>Logo</Link>
          </div>

          <ul className="flex ml-auto space-x-8">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                  onClick={() => navigate(item.slug)}
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {
              authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header