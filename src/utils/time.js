export const convertHourToMinutes = (timeString) => {
  let [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':');

  hours = parseInt(hours);
  minutes = parseInt(minutes);

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  }

  return hours * 60 + minutes;
};

export const formatHoursAndMinutes = (timestamp) => {
  const hours = timestamp.getHours();
  let minutes = timestamp.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
};

export const convertTimestampToDate = (timestamp) => {
  if (!timestamp) {
    return 'N/A';
  }
  const formattedDate = timestamp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  return formattedDate;
};

export const generateToday = () => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();
  const currentHours = endDate.getHours();
  const currentMinutes = endDate.getMinutes();
  const currentSeconds = endDate.getSeconds();
  endDate.setHours(currentHours, currentMinutes, currentSeconds);

  return { startDate, endDate };
};

export const sortTimeAscend = (data) => {
  const convertTo24Hour = (time12h) => {
    const [time, period] = time12h.split(' ');
    const [hours, minutes] = time.split(':');
    let hours24 = parseInt(hours);

    if (period === 'PM' && hours24 !== 12) {
      hours24 += 12;
    } else if (period === 'AM' && hours24 === 12) {
      hours24 += 0;
    }

    return hours24 * 60 + parseInt(minutes, 10);
  };

  // Sort the array based on the 'time' property
  const sortedByTime = data.slice().sort((a, b) => {
    const timeA = convertTo24Hour(a.time);
    const timeB = convertTo24Hour(b.time);

    return timeA - timeB;
  });

  return sortedByTime;
};

export const generateTimeSlots = () => {
  const timeSlots = [];

  for (let i = 0; i <= 23; i++) {
    let timeSlot = i;

    timeSlots.push(`${timeSlot}:00`);
    timeSlots.push(`${timeSlot}:15`);
    timeSlots.push(`${timeSlot}:30`);
    timeSlots.push(`${timeSlot}:45`);
  }

  return timeSlots;
};
