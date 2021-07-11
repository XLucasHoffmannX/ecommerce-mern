import { useState, useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../../utils/loading/Loading';
import './createProduct.css'

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: '',
  content: '',
  category: ''
}

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const styleUpload = {
    display: images ? "block" : "none"
  }

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" />
        <div id="file_img" style={styleUpload}>
          <img src="https://images.lojanike.com.br/1024x1024/produto/camiseta-nike-sportswear-masculina-DD1256-010-1.jpg" alt="" />
          <span>X</span>
        </div>
      </div>

      <form>
        <div className="row">
          <label htmlFor="product_id">Id do Produto</label>
          <input type="text" name="product_id" id="product_id" required value={product.product_id} />
        </div>

        <div className="row">
          <label htmlFor="title">Titúlo</label>
          <input type="text" name="title" id="title" required value={product.title} />
        </div>

        <div className="row">
          <label htmlFor="price">Preço</label>
          <input type="number" name="price" id="price" required value={product.price} />
        </div>

        <div className="row">
          <label htmlFor="description">Descrição</label>
          <textarea type="text" name="description" id="description" required value={product.description} rows="5"/>
        </div>

        <div className="row">
          <label htmlFor="content">Conteúdo</label>
          <textarea type="text" name="content" id="content" required value={product.content} rows="7" />
        </div>

        <div className="row">
          <label htmlFor="categories">Categorias</label>
          <select name="category" value={product.category}>
            {
              categories.length !== 0 ?
                <option value="">Por favor, selecione uma categoria</option>
                :
                <option value="--/--">Não há categorias!</option>
            }
            {
              categories.map(category => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))
            }
          </select>
        </div>

        <button type="submit">Criar</button>
      </form>
    </div>
  )
}

export default CreateProduct;