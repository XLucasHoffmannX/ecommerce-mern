import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../../utils/loading/Loading';
import { useHistory, useParams } from "react-router-dom";
import './createProduct.css'

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: '',
  content: '',
  category: '',
  _id: ''
}

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory()
  const param = useParams()

  const [products] = state.productsAPI.products
  const [onEdit, setOnEdit] = useState(false);
  useEffect(() => {
    if (param.id) {
      products.forEach(product => {
        setOnEdit(true);
        if (product._id === param.id) {
          setProduct(product)
          setImages(product.images)
        }
      })
    } else {
      setOnEdit(false);
      setProduct(initialState)
      setImages(false)
    }
  }, [param.id, products])

  const handleUpload = async e => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('Você não possui permisão para este tipo de processo!');
      const file = e.target.files[0];

      if (!file) return alert("Este arquivo não existe!");

      if (file.size > 1024 * 1024) return alert("Este arquivo é muito grande!");

      if (file.type !== 'image/jpeg' && file.type !== "image/png") return alert('Imagem de tipo incompatível, deve ser jpeg ou png!');

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post('/api/upload', formData, {
        headers: {
          Authorization: token,
          'content-type': 'multipart/form-data'
        }
      });
      setLoading(false);
      setImages(res.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert('Você não possui permisão para este tipo de processo!');
      setLoading(true)
      await axios.post('/api/destroy', { public_id: images.public_id }, {
        headers: { Authorization: token },
      });
      setLoading(false);
      setImages(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  const handleChangeInput = async e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('Você não possui permisão para este tipo de processo!');
      if (!images) return alert("Nenhuma imagem foi adicionada!");

      if (onEdit) {
        await axios.put(`/api/products/${product._id}`, { ...product, images }, {
          headers: { Authorization: token }
        })
      } else {
        await axios.post('/api/products', { ...product, images }, {
          headers: { Authorization: token }
        })
      }

      setImages(false);
      setProduct(initialState);
      history.push("/");
    } catch (error) {
      alert(error.response.message);
    }
  }

  const styleUpload = {
    display: images ? "block" : "none"
  }

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {
          loading ? <div id="file_img"><Loading /></div>

            : <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ''} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
        }

      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Id do Produto</label>
          <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
        </div>

        <div className="row">
          <label htmlFor="title">Titúlo</label>
          <input type="text" name="title" id="title" required value={product.title} onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="price">Preço</label>
          <input type="number" name="price" id="price" required value={product.price} onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="description">Descrição</label>
          <textarea type="text" name="description" id="description" required value={product.description} rows="5" onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="content">Conteúdo</label>
          <textarea type="text" name="content" id="content" required value={product.content} rows="7" onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="categories">Categorias</label>
          <select name="category" value={product.category} onChange={handleChangeInput}>
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

        <button type="submit">{onEdit ? "Editar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default CreateProduct;