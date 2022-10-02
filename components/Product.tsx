import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";

interface PropsI{
  title:string,
  image:string,
  price:number,
  id:number
}


const Product = ({title,image,price,id}:PropsI) => {
  return (
    <Card
    className="productCard"
      style={{
        width: "15rem",
        height: "fit-content",
        // padding: 8,
        cursor: "pointer",
      }}
    >
  <Card.Body>
  <Link href={'/products/'+id}>
     <Image
     loading="lazy"
        style={{ borderRadius: 6 }}
        src={image}
        alt="product"
        objectFit="cover"
        layout="responsive"
        width={0}
        height={0}
      />
     </Link>
      <Card.Title className="text-center my-2">{title}</Card.Title>
      <Card.Text className="text-center" style={{ fontWeight: 500 }}>
        ${price}
      </Card.Text>
  </Card.Body>
    
    </Card>
  );
};

export default Product;
