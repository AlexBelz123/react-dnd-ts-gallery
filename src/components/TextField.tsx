import React, { FC } from 'react';

interface TextFieldProps {
  placeholder: string;
  handleSubmit: (value: string) => void;
}

const TextField: FC<TextFieldProps> = ({ handleSubmit, placeholder }) => {
  const onSubmit = (e: any) => {
    const form = e.target;
    e.preventDefault();
    handleSubmit(form.input.value);
    form.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="TextForm__input"
        name="input"
        placeholder={placeholder}
      />
    </form>
  );
};

export default TextField;
