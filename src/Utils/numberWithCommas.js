function numberWithCommas(x) {
  x = parseFloat(x);
  x =
    "LKR. " +
    x
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return x;
}

export default numberWithCommas;
