import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { AuthContextI } from "../interfaces/AuthContext";
import { useRouter } from "next/router";
import { CartContextI } from "../interfaces/CartContext";
import { CartContext } from "../context/CartContext";

const NavComp = () => {
  const router = useRouter();
  const { user, setUser } = useContext<AuthContextI>(AuthContext);
  const { cartItems,setFetch} = useContext<CartContextI>(CartContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser();
    setFetch(true)
  };

  return (
    <Navbar
      style={{
        borderBottom: "1px solid #EAEAEA",
        position: "sticky",
        height: "fit-content",
        top: 0,
        background: "white",
        zIndex: 12,
      }}
    >
      <Container>
        <Link href="/products">
          <Navbar.Brand style={{ fontWeight: "bold" }} href="#home">
            Shopify
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
          {user ? (
            <>
             <Link href='/cart'>
             <div
                style={{
                  position: "relative",
                  width: "fit-content",
                  cursor: "pointer",
                }}
              >
                <ShoppingBagIcon style={{ width: 24, height: 24 }} />
                {cartItems.length>0&&<p
                  style={{
                    position: "absolute",
                    top: 0,
                    color: "white",
                    background: "#FC427B",
                    borderRadius: "100%",
                    width: 20,
                    height: 20,
                    display: "grid",
                    placeItems: "center",
                    alignItems: "center",
                    fontSize: ".7rem",
                    right: -10,
                  }}
                >
                  {cartItems?.length}
                </p>}
              </div>
             </Link>
              <Navbar.Text className="mx-4 d-inline-block">
                Signed in as:
                <a href="#login">{user?.username}</a>
              </Navbar.Text>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={() => router.push("/")}>Login</Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavComp;
