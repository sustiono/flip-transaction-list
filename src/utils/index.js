const bankNameFormatter = (bankName) => {
  if (bankName.length > 4) {
    const firstLetter = bankName.substr(0, 1);
    return `${firstLetter.toUpperCase()}${bankName.substr(1)}`;
  } else {
    return bankName.toUpperCase();
  }
};

const idrFormatter = (amount = 0) => {
  const numberString = amount
    .toString()
    .replace(/[^,\d]/g, "")
    .toString();
  const split = numberString.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? `${rupiah},${split[1]}` : rupiah;
  return `Rp.${rupiah || "0"}`;
};

const dateFormatter = (trxDate) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const dateTime = new Date(trxDate);
  const date = dateTime.getDate();
  const month = months[dateTime.getMonth()];
  const year = dateTime.getFullYear();

  return `${date} ${month} ${year}`;
};

export { bankNameFormatter, idrFormatter, dateFormatter };
