import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaInbox } from "react-icons/fa";

import history from "../../router/history";
import { setSubmiting } from "../../store/actions/transaction";
import { bankNameFormatter, idrFormatter, dateFormatter } from "../../utils";

const TransactionDetail = () => {
  const dispatch = useDispatch();
  const { transactionId } = useParams();
  const { data: transactions } = useSelector((state) => state.transactions);
  const transaction = transactions.find((t) => t.id === transactionId);
  const trxStatus = transaction?.status?.toLowerCase();

  const goBack = () => {
    dispatch(setSubmiting(true));
    history.push("/");
  };

  return (
    <div className='transaction-detail'>
      <p className='title'>Daftar Transaksi</p>

      <div className='header'>
        <div className='transaction-id'>{`ID TRANSAKSI: #${transactionId}`}</div>
        <div className='transaction-status'>
          <span className={`status ${trxStatus}`}>
            {trxStatus === "success" ? "Berhasil" : "Pengecekan"}
          </span>
        </div>
      </div>

      <div className='detail'>
        <div className='icon'>
          <FaInbox />
        </div>

        <div>
          <div className='sub-detail'>
            <div className='label'>PENGIRIM</div>
            <div>{bankNameFormatter(transaction.sender_bank)}</div>
          </div>
          <div className='sub-detail'>
            <div className='label'>PENERIMA</div>
            <div>{bankNameFormatter(transaction.beneficiary_bank)}</div>
            <div>{transaction.account_number}</div>
            <div>{transaction.beneficiary_name}</div>
          </div>
          <div className='sub-detail'>
            <div className='label'>NOMINAL</div>
            <div>{idrFormatter(transaction.amount)}</div>
            <div>
              <strong>Kode unik: </strong>
              {transaction.unique_code}
            </div>
          </div>
          <div className='sub-detail'>
            <div className='label'>CATATAN</div>
            <div>{transaction.remark}</div>
          </div>
          <div className='sub-detail'>
            <div className='label'>WAKTU DIBUAT</div>
            <div>{dateFormatter(transaction.completed_at)}</div>
          </div>
        </div>
      </div>

      <button className='back-button' onClick={goBack}>
        Kembali
      </button>
    </div>
  );
};

export default TransactionDetail;
