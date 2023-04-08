import { useEffect, useState } from 'react';

export const MessageBox = ({ message, id }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return visible ? <li key={id}>{message}</li> : null;
};
