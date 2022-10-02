import React, { useState } from "react";
import { Card, Dropdown, DropdownButton, Form } from "react-bootstrap";

interface PropsI {
  setCategory: (category: string) => void;
  setQuery: (query: string) => void;
  query: string;
  inStock: boolean;
  setInStock: (inStock: boolean) => void;
}

const ProductFilter = ({
  setCategory,
  setQuery,
  query,
  inStock,
  setInStock,
}: PropsI) => {
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setInStock(true);
    } else {
      setInStock(false);
    }
  };

  return (
    <Card style={{ minHeight: "80vh", position: "sticky", top: 120 }}>
      <Card.Header>Filters</Card.Header>
      <Card.Body>
        <Form className="mb-3">
          <Form.Control
            placeholder="search products"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.currentTarget.value)
            }
            value={query}
          />
        </Form>

        <DropdownButton
          variant="outline-dark"
          id="dropdown-basic-button"
          title={!currentCategory ? "Categories" : currentCategory}
        >
          {["All", "Electronics", "Footwear", "Furniture", "Clothing"].map(
            (category) => (
              <Dropdown.Item
                onClick={() => {
                  setCategory(category);
                  setCurrentCategory(category);
                }}
                key={category}
                href="#/action-1"
              >
                {category}
              </Dropdown.Item>
            )
          )}
        </DropdownButton>

        <Form className="my-3">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="In stock"
            onChange={handleChange}
          />
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProductFilter;
