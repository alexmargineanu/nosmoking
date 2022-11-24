import { useEffect, useState } from 'react';

const Count = ({number, duration = 1}) => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    if (start === number) return;

    const incrementTime = (duration / number) * 1000;
    const timer = setInterval(() => {
      setCount(start++);
      if (start === number) clearInterval(timer);
    }, incrementTime);
  }, [number, duration]);

  return count;
}

export default Count;