import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { request } from "../api/request";
import CartItem from "../components/CartItem";
import CartTotal from "../components/CartTotal";
import NavComp from "../components/NavComp";
import { CartContext } from "../context/CartContext";
import { CartContextI } from "../interfaces/CartContext";

function Cart() {
  const router = useRouter();
  const { cartItems, setFetch } = useContext<CartContextI>(CartContext);

  const handleRemoveItem = async (id: string) => {
    setFetch(true);
    await request.post("/data/remove-item", { itemId: id });
  };

  const handleRemoveAll = async () => {
    setFetch(true);
    await request.delete("/data/remove-all");
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) return alert("cart should not be empty");
    const { data } = await request.post("/payment/create-checkout", {
      items: cartItems,
    });
    if (data) {
      return router.push(data.url);
    }
  };

  const increaseQuantity = async (id: string, quantity: number) => {
    setFetch(true);
    await request.put("/data/increase-quantity", { itemId: id, quantity });
  };
  const decreaseQuantity = async (id: string, quantity: number) => {
    setFetch(true);
    await request.put("/data/decrease-quantity", { itemId: id, quantity });
  };

  return (
    <>
      <NavComp />
      <Container className="mt-4">
        {cartItems.length > 0 && (
          <Button onClick={handleRemoveAll} variant="outline-dark">
            Remove All
          </Button>
        )}
        {cartItems?.length === 0 ? (
          <p>😔😔😔Cart is empty</p>
        ) : (
          <div className="cartGridContainer my-3">
            <div className="grid1">
              {cartItems?.map((item) => (
                <CartItem
                  key={item._id}
                  title={item.title}
                  image={item.image}
                  quantity={item.quantity}
                  onDelete={handleRemoveItem}
                  id={item._id as string}
                  addQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              ))}
            </div>
            <div className="grid2">
              <CartTotal payment={handlePayment} />
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default Cart;
