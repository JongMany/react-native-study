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

export type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  firstDayOfWeek: number;
  lastDate: number;
};

export const getMonthYearDetails = (initialDate: Date): MonthYear => {
  const year = initialDate.getFullYear();
  const month = initialDate.getMonth() + 1;
  const startDate = new Date(`${year}-${month}`);
  const firstDayOfWeek = startDate.getDay(); // 매월 1일이 무슨 요일인지 파악
  const lastDateString = String(
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth() + 1,
      0,
    ).getDate(),
  ); // 해당 월의 마지막일
  const lastDate = Number(lastDateString);

  return {
    month,
    year,
    startDate,
    firstDayOfWeek,
    lastDate,
  };
};

export const getNewMonthYear = (prevData: MonthYear, increment: number) => {
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
  );
  return getMonthYearDetails(newMonthYear);
};
