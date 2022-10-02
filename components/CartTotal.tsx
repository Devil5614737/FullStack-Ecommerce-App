import React, { useContext } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { CartContext } from '../context/CartContext'
import { CartContextI } from '../interfaces/CartContext'

interface PropsI{
    payment:()=>void
}

const CartTotal = ({payment}:PropsI) => {
    const {cartItems}=useContext<CartContextI>(CartContext)

const quantity=cartItems?.map(item=>item.quantity).reduce((a,b)=>a+b,0)

const discount=Math.floor(Math.random()*900)

const total=cartItems?.map(item=>item.price*item.quantity).reduce((a,b)=>a+b,0)




  return (
 <Card>
    <Card.Header>Price Details</Card.Header>
    <Card.Body>
    <ListGroup className="list-group-flush">
        <ListGroup.Item className='d-flex justify-content-between align-items-center' >
            <Card.Subtitle>Price({quantity} items)</Card.Subtitle>
            <Card.Subtitle>${total}</Card.Subtitle>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex justify-content-between align-items-center' >
            <Card.Subtitle>Discount</Card.Subtitle>
            <Card.Subtitle>${discount}</Card.Subtitle>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex justify-content-between align-items-center' >
            <Card.Title>SubTotal</Card.Title>
            <Card.Text>${total-discount}</Card.Text>
        </ListGroup.Item>
    
      </ListGroup>
     <Button onClick={payment} className='w-100 btn-sm my-2 ' variant='outline-dark'>Place Order</Button>
    </Card.Body>
 </Card>
  )
}

export default CartTotal