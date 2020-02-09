import React from 'react';
import {Link} from 'react-router-dom';

export const styled = (classes, El = 'div', defaultProps) => props => {
  let classValues = typeof classes === 'function' ? classes(props) : classes;
  if (typeof classValues === 'object' && classValues.length) classValues = classValues.filter(v => !!v).join(' ');

  return <El {...defaultProps} {...props} className={`${classValues || ''} ${props.className || ''}`} />;
};

const getInputStyles = props => [
  'Input rounded border px-2 py-1 active:border-green',
  props.mandatory && !props.value && !props.children ? 'border-red' : 'border-gray-200'
];

const getButtonStyles = ({sm, disabled, primary, inverted}) => [
  'Button inline-block rounded border text-white',
  sm ? 'px-1 py-1 text-sm' : 'px-2 py-1',
  disabled && 'opacity-50 cursor-not-allowed',
  // Primary styles
  primary && !inverted && 'border-green bg-gray-700',
  primary && !inverted && !disabled && 'hover:text-gray-700 hover:bg-green',
  primary && inverted && 'border-green bg-green',
  primary && inverted && !disabled && 'hover:text-green hover:bg-gray-700',
  // Non-primary styles
  !primary && !inverted && 'border-gray-300 bg-gray-700',
  !primary && !inverted && !disabled && 'hover:text-gray-700 hover:bg-gray-300',
  !primary && inverted && 'border-gray-300 bg-gray-300',
  !primary && inverted && !disabled && 'hover:text-gray-300 hover:bg-gray-700'
];

export const Button = styled(getButtonStyles, 'button');
export const LinkButton = styled(getButtonStyles, Link);
export const TextInput = styled(getInputStyles, 'input', {type: 'text'});
export const TextArea = styled(getInputStyles, 'textarea');
export const Card = styled('Card bg-cream text-black p-2 rounded');
export const Message = styled('Message bg-cream text-black p-2 rounded');
export const FormCell = styled('FormCell px-2 py-1 flex flex-col items-stretch', 'label');
export const Label = styled('Label text-black text-sm mr-1 mb-1 cursor-pointer');
export const Mandatory = styled('Mandatory text-red ml-1', 'span', {children: '*'});
