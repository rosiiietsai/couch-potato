import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import Dropdown from './Dropdown';

const options = [
  { label: 'Movie', value: 'movie', selected: true },
  { label: 'TV Show', value: 'tv' },
];

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.selected)
  );

  const handleSubmit = e => {
    e.preventDefault();
    // redirect to search result page 1
    navigate(`/search?q=${query}&media_type=${selectedOption.value}&page=1`);
    setQuery('');
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label className="searchbar__label">
          <button className="btn">
            <FaSearch className="searchbar__icon" />
          </button>
          <input
            type="text"
            className="searchbar__input"
            placeholder="search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            required
          />
        </label>
      </form>

      <Dropdown
        className="searchbar__dropdown"
        options={options}
        onChange={option => setSelectedOption(option)}
        value={selectedOption}
      />
    </div>
  );
}
