import { format, add, set, parse, parseISO, differenceInMinutes, isValid} from 'date-fns';
import { fr } from 'date-fns/locale';

const EVENT_TIME_ZONE = 'Europe/Paris';

/**
 * Le rendu serveur et le navigateur peuvent être sur des fuseaux différents.
 * Les horaires publiés sont donc toujours exprimés à l'heure de Paris.
 */
const toEventTime = (date: Date): Date => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: EVENT_TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value);

  return new Date(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
};

const getCleanwalkWrittenDate = (date: Date, duration: number): string => {
  const startDate = toEventTime(date);
  const endDate = toEventTime(add(date, { minutes: duration }));

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

  const atHour = (hour: string) => {
    const [hours, minutes] = hour.split(':').map(Number);
    return set(parse(date, 'yyyy-MM-dd', new Date()), { hours, minutes });
  };
  const startDate = atHour(hourBegin);

  return {
    date_begin: startDate.toISOString(),
    duration: differenceInMinutes(atHour(hourEnd), startDate),
  };
};

const getDayAndHourBegginEndByDate = (date: string, duration: number) => {
  const startDate = parseISO(date);
  if (!isValid(startDate)) {
    throw new Error('Invalid date format');
  }
  const endDate = add(startDate, { minutes: duration });

  return {
    dateDay: format(startDate, 'yyyy-MM-dd'),
    hourBegin: format(startDate, 'HH:mm'),
    hourEnd: format(endDate, 'HH:mm'),
  };
};

export default {
  getCleanwalkWrittenDate,
  getDayAndHourBegginEndByDate,
  getDateBegginAndDuration,
};
