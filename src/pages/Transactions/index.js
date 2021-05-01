import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { getTransactions } from "../../store/actions/transaction";

import Transaction from "../../components/Transaction";

const Transactions = () => {
  const dispatch = useDispatch();
  const { data: transactions } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getTransactions());
    return () => {
      return;
    };
  }, []);

  return (
    <div className='transaction-container'>
      <div className='header'>
        <p className='title'>Daftar Transaksi</p>
        <div className='greating'>Halo Kak!</div>
        <div className='info'>
          Kamu telah melakukan transaksi sebesar{" "}
          <span className='price'>Rp5.000.000</span> sejak menggunakan Flip.
        </div>
      </div>

      <div className='filter'>
        <div className='search'>
          <div className='icon-search'>
            <FaSearch />
          </div>
          <div className='input-search'>
            <input type='text' placeholder='Cari nama atau bank' />
          </div>
        </div>
        <div className='sort'>
          <select>
            <option value='name-asc'>Nama A-Z</option>
            <option value='name-desc'>Nama Z-A</option>
            <option value='date-asc'>Tanggal terbaru</option>
            <option value='date-desc'>Tanggal Terlama</option>
          </select>
        </div>
      </div>

      {transactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default Transactions;
