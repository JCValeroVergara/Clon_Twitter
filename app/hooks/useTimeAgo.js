import { useEffect, useState } from 'react';

const DATE_UNITS = [
  ['mes', 2592000],
  ['semana', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

const getDateDiffs = (timestamp) => {
  // console.log(getDateDiffs);
  const now = Date.now();
  const elapsed = (timestamp-now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp));
  
  useEffect(() => {
    const interval = setInterval(() => { 
      const newTimeAgo = getDateDiffs(timestamp);
      setTimeago(newTimeAgo);
    }, 10000)
    
    return () => clearInterval(interval);
  }, [timestamp]);


        
        const rtf = new Intl.RelativeTimeFormat('es', {
          style: 'short'
        });
        const {value, unit } = timeago;
        return rtf.format(value, unit);

}