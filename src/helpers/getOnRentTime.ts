export interface RentData {
  hours: number;
  min: number;
  currCost: number;
}

export const getOnRentTime = (startDate: string) => {
  const startTime = new Date(startDate).getTime();
  const currTime = new Date().getTime();
  const difDate = new Date(currTime - startTime).toLocaleTimeString().split(':');

  return {
    hours: Number(difDate[0]),
    min: Number(difDate[1]),
    currCost: Number(difDate[0]) * 60 + Number(difDate[1]),
  };
};
