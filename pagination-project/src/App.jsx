/** @format */

import Button from "react-bootstrap/Button";
import "./App.css";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function App() {
  const [products, setproducts] = useState([]);
  const [page, setpage] = useState(1);
  const [totalpage, settotalpage] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      const data = await res.json();
      setproducts(data.products);
      console.log(data);
      settotalpage(data.total / 10);
    };
    fetchProduct();
  }, [page]);

  const selectpageHandler = (selectPage) => {
    if (selectPage >= 1 && selectPage <= totalpage && selectPage !== page)
      setpage(selectPage);
  };

  return (
    <>
      <h1>Pagination</h1>
      <Container>
        <Row className='my-4'>
          {products.map((product) => (
            <Col md={3} key={product.id}>
              <Card className='mt-3'>
                <Card.Img
                  className='py-3 px-2 '
                  variant='top'
                  src={product.images[0]}
                />
                <Card.Body>
                  <Card.Title>{product.title.substring(0, 25)}...</Card.Title>
                  <Card.Text>
                    {product.description.substring(0, 80)}...
                  </Card.Text>
                  <Button variant='primary'>Product Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {products.length > 0 && (
          <div className='pagination py-4 d-flex gap-2 align-items-center'>
            <Button
              variant='primary'
              disabled={page > 1 ? false : true}
              onClick={() => setpage(page - 1)}>
              <FaAngleLeft />
            </Button>
            {[...Array(totalpage)].map((_, i) => {
              return (
                <Button
                  onClick={() => selectpageHandler(i + 1)}
                  variant={page === i + 1 ? "primary" : "outline-primary"}
                  key={i}>
                  {i + 1}
                </Button>
              );
            })}
            <Button
              variant='primary'
              disabled={page < totalpage ? false : true}
              onClick={() => setpage(page + 1)}>
              <FaAngleRight />
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}

export default App;
