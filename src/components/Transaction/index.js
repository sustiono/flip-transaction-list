import { HiArrowNarrowRight } from "react-icons/hi";
import { GoPrimitiveDot } from "react-icons/go";

import history from "../../router/history";
import { bankNameFormatter, idrFormatter, dateFormatter } from "../../utils";

const Transaction = ({ transaction }) => {
  const trxStatus = transaction.status.toLowerCase();

  return (
    <div
      className={`transaction-card ${trxStatus}`}
      onClick={() => history.push(`/transaksi/${transaction.id}`)}
    >
      <div>
        <div className='bank'>
          {`${bankNameFormatter(transaction.sender_bank)}`}
          <HiArrowNarrowRight />
          {`${bankNameFormatter(transaction.beneficiary_bank)}`}
        </div>
        <div className='receiver'>
          {transaction.beneficiary_name.toUpperCase()}
        </div>
        <div className='nominal'>
          {`${idrFormatter(transaction.amount)}`}
          <GoPrimitiveDot />
          {`${dateFormatter(transaction.completed_at)}`}
        </div>
      </div>
      <div>
        <span className={`status ${trxStatus}`}>
          {trxStatus === "success" ? "Berhasil" : "Pengecekan"}
        </span>
      </div>
    </div>
  );
};

export default Transaction;
