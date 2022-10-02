import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";

import { request } from "../api/request";
import Signup from "../components/Signup";

const Home: NextPage = () => {
  const router = useRouter();
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (event: Event) => {
    event.preventDefault();

    const res = await request.post("/login", { email, password });
    if (res.status !== 200) return alert("invalid credentials");
    localStorage.setItem("token", res.data);
    router.push("/products");
  };

  return (
    <Container
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "grid",
        placeContent: "center",
      }}
    >
      {!showSignup ? (
        <Card style={{ width: "24rem" }} className="p-4">
          <Card.Title className="my-3">Login</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.currentTarget.value)
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            <Button
              onClick={handleLogin as any}
              className="w-100"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
            <Form.Text className="text-muted  mt-2 d-inline-block">
              {` Don't have an account?`}
              <span
                onClick={() => setShowSignup(true)}
                style={{
                  fontWeight: "bold",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                Signup
              </span>
            </Form.Text>
          </Form>
        </Card>
      ) : (
        <Signup hide={setShowSignup} />
      )}
    </Container>
  );
};

export default Home;
