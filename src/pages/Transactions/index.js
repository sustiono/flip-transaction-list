import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { FaSearch } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

import Transaction from "../../components/Transaction";

import {
  getTransactions,
  setTerm,
  setSortType,
} from "../../store/actions/transaction";
import { idrFormatter } from "../../utils";

const sortLists = [
  { label: "Nama A-Z", value: "name-asc" },
  { label: "Nama Z-A", value: "name-desc" },
  { label: "Tanggal terbaru", value: "date-asc" },
  { label: "Tanggal Terlama", value: "date-desc" },
];

const Transactions = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    data,
    term,
    sortType,
    submiting,
    filteredData: transactions,
  } = useSelector((state) => state.transactions);
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
                  value={term}
                  placeholder='Cari nama atau bank'
                  onChange={(e) => dispatch(setTerm(e.target.value))}
                />
              </div>
            </div>
            <div className='sort-container'>
              <div
                className='sort'
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className='selection'>
                  {sortLists.find((l) => l.value === sortType)?.label ||
                    "Urutkan"}
                </div>
                <div className='expand-icon'>
                  <MdExpandMore />
                </div>
              </div>
              <ul className={`selection-list ${showDropdown ? "" : "hidden"}`}>
                {sortLists.map((list) => (
                  <li
                    key={list.value}
                    onClick={() => {
                      setShowDropdown(false);
                      dispatch(setSortType(list.value));
                    }}
                  >
                    {list.label}
                  </li>
                ))}
              </ul>
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
