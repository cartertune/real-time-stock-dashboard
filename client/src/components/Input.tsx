import React from "react";

interface IProps {
  value: string;
  onChange: (val: string) => void;
  label: string;
  type: 'email' | 'password' | 'text'
  placeholder?: string;
}

function Input({ value, onChange, label, type, placeholder }: IProps) {
  return <div className="input">
    <span className="label">{label}</span>
    <input value={value} onChange={e => onChange(e.target.value)} type={type} placeholder={placeholder} />
  </div>

}

export default Input;