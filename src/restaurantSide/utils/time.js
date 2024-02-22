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

export const generateTimeSlots = () => {
  const timeSlots = [];

  for (let i = 1; i <= 24; i++) {
    let timeSlot = i;
    let session = '';

    if (i < 12) {
      session = 'AM';
    } else {
      session = 'PM';
      timeSlot = timeSlot % 12 === 0 ? 12 : timeSlot % 12;
    }

    timeSlots.push(`${timeSlot}:00 ${session}`);
    timeSlots.push(`${timeSlot}:15 ${session}`);
    timeSlots.push(`${timeSlot}:30 ${session}`);
    timeSlots.push(`${timeSlot}:45 ${session}`);
  }

  return timeSlots;
};

export const generateInitialTimeSlots = () => {
  const timeSlots = [];
  for (let i = 9; i <= 22; i++) {
    let timeSlot = i;
    let session = '';

    if (i < 12) {
      session = 'AM';
    } else {
      session = 'PM';
      timeSlot = timeSlot % 12 === 0 ? 12 : timeSlot % 12;
    }

    timeSlots.push(`${timeSlot}:00 ${session}`);
    timeSlots.push(`${timeSlot}:30 ${session}`);
  }

  return timeSlots;
};
