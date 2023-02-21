import React from 'react';
import './MyButton.scss';

interface Props {
  buttonText: string;
}

const MyButton: React.FC<Props> = ({ buttonText }) => {
  return (
    <button type="button" className="myButton">
      {buttonText}
    </button>
  );
};

export default MyButton;
