import Image from "next/image";
import React, { useContext } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import NavComp from "../../components/NavComp";
import axios from "axios";
import { ProductI } from "../../interfaces/ProductI";
import { request } from "../../api/request";
import { CartContextI } from "../../interfaces/CartContext";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { AuthContextI } from "../../interfaces/AuthContext";


interface PropsI {
  data: ProductI;
}

export const getStaticPaths = async () => {
  const { data } = await request.get("/data");

  const paths = data.map((item: ProductI) => {
    return {
      params: { productId: item._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.productId;
  const { data } = await request.get(`/data/${id}`);

  return {
    props: {
      data,
    },
  };
};

const Product = ({ data }: PropsI) => {

  const {cartItems,  setFetch} = useContext<CartContextI>(CartContext);
  const { user} = useContext<AuthContextI>(AuthContext);


const handleAddToCart=async(item:ProductI)=>{
  setFetch(true);
const existedItem=cartItems.find(cartItem=>cartItem.title===item.title)

if(typeof existedItem !=='undefined') return alert('already added to cart')


  const { title, image, description, price, quantity, category}=item
const {data}=await request.post('/data/add-to-cart',{
  title, image, description, price, quantity, category
})


}

  
  return (
    <>
      <NavComp />
      <main className="my-4">
        <Container>
          <div className="productContainer">
            <div className="product" style={{width:427,height:427}}>
              <Image
                src={data?.image}
                layout="responsive"
                width={0}
                height={0}
                objectFit="contain"
                alt='product'
              />
            </div>
            <div className="content">
              <p style={{ fontWeight: "bold", fontSize: "2rem" }}>
                {data?.title}{" "}
                {data?.inStock ? (
                  <Badge style={{ fontSize: "1rem" }} bg="success">
                    in stock
                  </Badge>
                ) : (
                  <Badge style={{ fontSize: "1rem" }} bg="danger">
                    out of stock
                  </Badge>
                )}
              </p>
              <p style={{ fontWeight: 500, fontSize: "1.2rem" }}>
                Price: ${data?.price}
              </p>
              <p style={{ fontSize: "1.3rem" }}>{data?.description}</p>
              <Button disabled={!data?.inStock} onClick={()=>{handleAddToCart(data)
              !user && alert('login required')
              }} variant="outline-dark">add to cart</Button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Product;
