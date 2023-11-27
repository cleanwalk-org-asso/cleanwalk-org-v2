const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const dayNames = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

const getCleanwalkWrittenDate = (startDate: Date, duration: number): string => {

    let endDate = dateAdd(startDate, 'minute', duration);

    let writtenDate = dayNames[startDate.getDay()] + ' ' + startDate.getDate() + ' ' + monthNames[startDate.getMonth()];
    writtenDate += startDate.getFullYear() == new Date().getFullYear() ? '' : ' ' + startDate.getFullYear();
    writtenDate += ' de ' +  startDate.getHours() + ':' + startDate.getMinutes();
    writtenDate += ' à ' +  endDate?.getHours() + ':' + endDate?.getMinutes();
    
    return writtenDate;
};

function dateAdd(date: Date, interval: String, units: number):Date|undefined {
    if(!(date instanceof Date))
      return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
    switch(String(interval).toLowerCase()) {
      case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
      case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
      case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
      case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
      case 'day'    :  ret.setDate(ret.getDate() + units);  break;
      case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
      case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
      case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
      default       :  return undefined;
    }
    return ret;
  }

  export default{
    getCleanwalkWrittenDate, dateAdd,
  }


