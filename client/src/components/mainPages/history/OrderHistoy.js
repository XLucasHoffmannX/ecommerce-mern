import { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './history.css';

const OrderHistory = () => {
  const state = useContext(GlobalState)
  const [history, setHistory] = state.userAPI.history
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token


  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get('/api/payment', {
            headers: { Authorization: token }
          })
          setHistory(res.data)
        } else {
          const res = await axios.get('/user/history', {
            headers: { Authorization: token }
          })
          setHistory(res.data)
        }
      }
      getHistory()
    }
  }, [token, isAdmin, setHistory])

  return (
    <div>
      <h2>Histórico de compras</h2>
      <h4>Você tem {history.length} compras realizadas</h4>

      <div className="history-page">
        <table>
          <thead>
            <tr>
              <th>Id de pagamento</th>
              <th>Data de realização</th>
            </tr>
          </thead>
          <tbody>
            {
              history.reverse().map(items => (
                <tr key={items._id}>
                  <td>{items.paymentID}</td>
                  <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/history/${items._id}`}>
                      Visualizar
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderHistory;