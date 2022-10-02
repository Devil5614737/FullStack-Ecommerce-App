import { ProductI } from "./ProductI";

export interface CartContextI{
    cartItems:ProductI[],
    fetch:boolean,
    setFetch:(fetch:boolean)=>void
}