export const date = (data) => {
  const dataObj = new Date(data.date);

  const year = dataObj.getFullYear();
  const month = String(dataObj.getMonth() + 1).padStart(2, '0');
  const day = String(dataObj.getDate()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};
