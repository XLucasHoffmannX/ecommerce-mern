import { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

const Filters = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;
  const [page, setPage] = state.productsAPI.page;
  const [result, setResult] = state.productsAPI.result;

  const handleCategory = e => {
    setCategory(e.target.value);
    setSearch('');
  }

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filtros:</span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">Todos os produtos</option>
          {
            categories.map(category => (
              <option value={"category=" + category._id} key={category._id}>{category.name}</option>
            ))
          }
        </select>
      </div>

      <input type="text" name="" value={search} placeholder="Pesquisar..." onChange={e => setSearch(e.target.value.toLowerCase())} />

      <div className="row">
        <span>Procurar por:</span>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Selecione</option>
          <option value="sort=-sold">Mais vendidos</option>
          <option value="sort=-price">Preço: maior</option>
          <option value="sort=price">Preço: menor</option>
        </select>
      </div>
    </div>
  )
}

export default Filters;