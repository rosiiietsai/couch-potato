import { useEffect, useRef, useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export default function Dropdown({ options, value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSelect = option => {
    setIsOpen(false);
    onChange(option);
  };

  // click outside of dropdown will close the dropdown
  useEffect(() => {
    const handler = e => {
      if (!dropdownRef.current || dropdownRef.current.contains(e.target))
        return;
      setIsOpen(false);
    };

    // listen to capture phase instead of bubble phases -> rerender runs faster than handler
    document.addEventListener('click', handler, true);

    // cleanup function
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div
      className={`dropdown ${className}`}
      onClick={() => setIsOpen(!isOpen)}
      ref={dropdownRef}>
      <div className="dropdown__label">
        <span> {value.label}</span>
        {isOpen ? (
          <FaCaretUp className="icon dropdown__icon" />
        ) : (
          <FaCaretDown className="icon dropdown__icon" />
        )}
      </div>

      <div
        className={`dropdown__menu ${isOpen ? 'dropdown__menu--active' : ''}`}>
        {options.map(option => (
          <div
            className={`dropdown__option ${
              value.label === option.label ? 'dropdown__option--active' : ''
            }`}
            key={option.value}
            onClick={() => handleSelect(option)}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
