import React, { useEffect, useState, useContext } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';
import { searchPages } from '../wikipedia-api';

const usePageSearch = (searchTerm) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let isFresh = true;
    if (searchTerm.trim() !== '') {
      searchPages(searchTerm).then((res) => {
        if (isFresh && res.query) setPages(res.query.search);
      });
    }
    // cancel setting state if the component is unmounted
    return () => (isFresh = false);
  }, [searchTerm]);

  return pages;
};

const SearchPages = () => {
  const { setViewingPageId } = useContext(WikipediaViewerContext);
  const [searchTerm, setSearchTerm] = useState('');
  const pages = usePageSearch(searchTerm);

  return (
    <Combobox
      openOnFocus
      onSelect={(item) => setViewingPageId(pages.find((p) => p.title === item).pageid)}
    >
      <ComboboxInput
        onChange={(ev) => setSearchTerm(ev.target.value)}
        aria-label="Pages"
        selectOnClick
      />
      {pages.length > 0 && (
        <ComboboxPopover>
          <ComboboxList>
            {pages.map(({ title }) => <ComboboxOption key={title} value={title} />)}
          </ComboboxList>
        </ComboboxPopover>
      )}
    </Combobox>
  );
};

export default SearchPages;
