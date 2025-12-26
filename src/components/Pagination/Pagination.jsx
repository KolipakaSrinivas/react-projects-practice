import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import PaginationBar from "./PaganationBar";
import "./styles.css";

export default function Pagination() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products?limit=200");
      const data = await res.json();
      setProducts(data.products);
      console.log(products);
    } catch (error) {
      console.log("error =>", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const numberOfProductsPerPage = 10;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / numberOfProductsPerPage);
  const start = numberOfProductsPerPage * currentPage;
  const end = start + numberOfProductsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <div className="loading">{loading && <h1>Loading...</h1>}</div>
      <div className="error">
        <h1>{error?.message}</h1>
      </div>
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />

      <div>
        {products && products.length > 0 ? (
          <div className="products-container">
            {products.slice(start, end).map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  images={product.images}
                  title={product.title}
                />
              );
            })}
          </div>
        ) : (
          <div>
            <h1>{loading ? "" : "No products found"}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
