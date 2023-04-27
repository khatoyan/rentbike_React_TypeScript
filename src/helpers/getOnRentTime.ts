export interface RentData {
  hours: number;
  min: number;
  currCost: number;
}

export const getOnRentTime = (startDate: string, endDate = '') => {
  let currTime = new Date().getTime();

  if (endDate.length !== 0) {
    currTime = new Date(endDate).getTime();
  }

  const startTime = new Date(startDate).getTime();
  const newDate = new Date(currTime - startTime);

  const hours = Number(newDate.getHours()) - 7;
  const min = Number(newDate.getMinutes()) || 1;
  const currCost = hours * 60 + min;

  return {
    hours: hours,
    min: min,
    currCost: currCost,
  };
};
