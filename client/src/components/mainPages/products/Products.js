import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../../utils/productItem/ProductItem";
import Loading from '../../utils/loading/Loading'

const Products = () => {
  const state = useContext(GlobalState);

  const [products] = state.productsAPI.products
  const [isAdmin] = state.userAPI.isAdmin;

  console.log(products)

  return (
    <>
      <div className="products">
        {
          products.map(product => {
            return <ProductItem
            product={product} 
            isAdmin={isAdmin}
            />
          })
        }
      </div>
      {products.length === 0 && <Loading />}
    </>
  )
}

export default Products;