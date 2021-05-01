import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";

import Transaction from "../../components/Transaction";

import {
  getTransactions,
  searchTransaction,
  sortTransaction,
} from "../../store/actions/transaction";
import { idrFormatter } from "../../utils";

const Transactions = () => {
  const dispatch = useDispatch();
  const { data, filteredData: transactions, submiting } = useSelector(
    (state) => state.transactions
  );
  const totalTransaction = data
    .map((trx) => trx.amount)
    .reduce((a, b) => a + b, 0);

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
        {!submiting && (
          <>
            <div className='greating'>Halo Kak!</div>
            <div className='info'>
              Kamu telah melakukan transaksi sebesar{" "}
              <span className='price'>{idrFormatter(totalTransaction)}</span>{" "}
              sejak menggunakan Flip.
            </div>
          </>
        )}
      </div>

      {submiting ? (
        <div className='loading'>
          <BeatLoader color='#fd6542' loading={submiting} />
        </div>
      ) : (
        <>
          <div className='filter'>
            <div className='search'>
              <div className='icon-search'>
                <FaSearch />
              </div>
              <div className='input-search'>
                <input
                  type='text'
                  placeholder='Cari nama atau bank'
                  onChange={(e) => dispatch(searchTransaction(e.target.value))}
                />
              </div>
            </div>
            <div className='sort'>
              <select
                defaultValue=''
                onChange={(e) => dispatch(sortTransaction(e.target.value))}
              >
                <option value='' disabled>
                  Urutkan
                </option>
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
        </>
      )}
    </div>
  );
};

export default Transactions;
