import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { request } from "../../api/request";

import NavComp from "../../components/NavComp";
import Product from "../../components/Product";
import ProductFilter from "../../components/ProductFilter";
import { ProductI } from "../../interfaces/ProductI";

interface PropsI {
  data: ProductI[];
}

export default function Home({ data }: PropsI) {
  const [category, setCategory] = useState<string>("");
  const [inStock, setInStock] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");

  let filtered = data.filter((item) => {
    // if (query === "") {
    //   return item;
    // }
    // if (item.title.toLowerCase().includes(query.toLowerCase())) {
    //   return item;
    // }
    if (inStock) {
      return item.inStock === inStock;
    }
    if (category.toLowerCase() === "all" || category === "") {
      return item;
    } else {
      return item.category.toLowerCase() === category.toLowerCase();
    }
  });

  return (
    <>
      <NavComp />
      <Container className="mt-5 ">
        <div className="productGrid">
          <div className="productGrid1">
            <ProductFilter
              setCategory={setCategory}
              setQuery={setQuery}
              query={query}
              inStock={inStock}
              setInStock={setInStock}
            />
          </div>
          <div
            className="productGrid2 my-3 d-flex flex-wrap
     
         gap-4"
          >
            {filtered.map((item) => (
              <Product
                key={item._id}
                title={item.title}
                image={item.image}
                price={item.price}
                id={item._id as number}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await request.get("/data");

  return {
    props: {
      data,
    },
  };
}
