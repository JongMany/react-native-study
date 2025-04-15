function getDateDetails(dateString: Date | string) {
  const date = new Date(dateString);
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return {year, month, day};
}
export const getDateWithSeparator = (
  dateString: Date | string,
  separator: string = '',
) => {
  const {year, month, day} = getDateDetails(dateString);

  return [year, month, day].join(separator);
};

export const getDateLocaleFormat = (dateString: Date | string) => {
  const {year, month, day} = getDateDetails(dateString);

  return `${year}년 ${month}월 ${day}일`;
};
