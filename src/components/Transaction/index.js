import { bankNameFormatter, idrFormatter, dateFormatter } from "../../utils";

const Transaction = ({ transaction }) => {
  const trxStatus = transaction.status.toLowerCase();

  return (
    <div className={`transaction-card ${trxStatus}`}>
      <div>
        <div className='bank'>
          {`${bankNameFormatter(
            transaction.sender_bank
          )} -> ${bankNameFormatter(transaction.beneficiary_bank)}`}
        </div>
        <div className='receiver'>
          {transaction.beneficiary_name.toUpperCase()}
        </div>
        <div className='nominal'>
          {`${idrFormatter(transaction.amount)} ${dateFormatter(
            transaction.completed_at
          )}`}
        </div>
      </div>
      <div>
        <button className={trxStatus}>
          {trxStatus === "success" ? "Berhasil" : "Pengecekan"}
        </button>
      </div>
    </div>
  );
};

export default Transaction;
