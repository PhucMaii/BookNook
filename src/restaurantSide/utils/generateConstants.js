export const generateCapacity = () => {
  const capacityList = [];

  for (let i = 1; i <= 20; i++) {
    capacityList.push(`${i} people`);
  }

  capacityList.push(`More than 20 people`);
  return capacityList;
};
