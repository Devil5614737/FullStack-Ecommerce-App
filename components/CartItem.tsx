import Image from "next/image";
import React from "react";
import { Badge, Card } from "react-bootstrap";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ProductI } from "../interfaces/ProductI";

interface PropsI{
  title:string,
  image:string,
  quantity:number,
  onDelete:(id:string)=>void,
  id:string,
  addQuantity:(id:string,quantity:number)=>void
  decreaseQuantity:(id:string,quantity:number)=>void

}


const CartItem = ({title,image,quantity,onDelete,id,addQuantity,decreaseQuantity}:PropsI) => {
  return (
    <Card className="mb-2">
      <Card.Body className="d-flex align-items-center  justify-content-between">
        <div style={{ width: 50, height: 50 }}>
          <Image
            style={{ borderRadius: 4 }}
            src={image}
            layout="responsive"
            objectFit="cover"
            loading="lazy"
            width={0}
            height={0}
            alt='product'
          />
        </div>
        <Card.Subtitle
        style={{maxWidth:'90%'}}
        >{title}</Card.Subtitle>
        <div className="d-flex align-items-center  mx-3 gap-2">
          <PlusIcon onClick={()=>addQuantity(id,quantity)} style={{ height: 20, width: 20, cursor: "pointer" }} />
          <Badge bg='dark'>{quantity}</Badge>
          <MinusIcon onClick={()=>decreaseQuantity(id,quantity)} style={{ height: 20, width: 20, cursor: "pointer" }} />
        </div>
        <TrashIcon onClick={()=>onDelete(id)} style={{ height: 20, width: 20, cursor: "pointer" }} />
      </Card.Body>
    </Card>
  );
};

export default CartItem;
