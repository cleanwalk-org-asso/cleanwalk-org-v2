import { format, add, set, parse, parseISO, differenceInMinutes, isValid} from 'date-fns';
import { fr } from 'date-fns/locale';

const getCleanwalkWrittenDate = (startDate: Date, duration: number): string => {
  const endDate = add(startDate, { minutes: duration });

  const writtenDate = format(startDate, 'EEEE dd MMM yyyy', { locale: fr });
  const isSameYear = startDate.getFullYear() === new Date().getFullYear();

  const startDateString = format(startDate, isSameYear ? 'HH:mm' : 'dd MMM yyyy HH:mm');
  const endDateString = format(endDate, 'HH:mm');

  return `${writtenDate}${isSameYear ? '' : ` ${startDate.getFullYear()}`} de ${startDateString} à ${endDateString}`;
};


const getDateBegginAndDuration = (date: string, hourBegin: string, hourEnd: string) => {
  if (!date || !hourBegin || !hourEnd) {
    return;
  }

  let startDate = set(parse(date, 'yyyy-MM-dd', new Date()), {
    hours: parseInt(hourBegin.split(':')[0]),
    minutes: parseInt(hourBegin.split(':')[1]),
  });

  let endDate = set(parse(date, 'yyyy-MM-dd', new Date()), {
    hours: parseInt(hourEnd.split(':')[0]),
    minutes: parseInt(hourEnd.split(':')[1]),
  });

  let duration = differenceInMinutes(endDate, startDate);

  return {
    date_begin: startDate.toISOString(),
    duration: duration,
  };
};

const getDayAndHourBegginEndByDate = (date: string, duration: number) => {
  try {
    // Parse ISO date string robustly (with or without timezone)
    const startDate = parseISO(date);

    // Check if the parsed date is valid
    if (!isValid(startDate)) {
      throw new Error('Invalid date format');
    }

    // Add duration to the start date
    const endDate = add(startDate, { minutes: duration });

    // Format the day, start time, and end time
    const dateDay = format(startDate, 'yyyy-MM-dd');
    const hourBegin = format(startDate, 'HH:mm');
    const hourEnd = format(endDate, 'HH:mm');

    // Return the formatted day and times
    return { dateDay, hourBegin, hourEnd };
  } catch (error) {
    throw error;
  }
};

export default {
  getCleanwalkWrittenDate,
  getDayAndHourBegginEndByDate,
  getDateBegginAndDuration,
};
