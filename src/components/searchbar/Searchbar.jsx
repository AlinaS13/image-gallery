import PropTypes from 'prop-types';
import { useState } from 'react';

import SearchSVG from '../../assets/searchSVG';
import {
  Button,
  ButtonLabel,
  Input,
  SearchbarElem,
  SearchForm,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [localValue, setLocalValue] = useState('');

  return (
    <SearchbarElem
      onSubmit={e => {
        e.preventDefault();
        onSubmit(localValue);
      }}
    >
      <SearchForm>
        <Input
          onChange={e => {
            setLocalValue(e.target.value);
          }}
          name={'searchfield'}
          value={localValue}
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
        />
        <Button type="submit">
          <SearchSVG></SearchSVG>
          <ButtonLabel>Search</ButtonLabel>
        </Button>
      </SearchForm>
    </SearchbarElem>
  );
};

Searchbar.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
