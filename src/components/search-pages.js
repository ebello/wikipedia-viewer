import React, { useEffect, useState, useContext } from 'react';
import { navigate } from 'gatsby';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import matchSorter from 'match-sorter';
import { useThrottle } from 'use-throttle';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';
import { searchPages } from '../wikipedia-api';

const usePageSearch = (searchTerm) => {
  // throttle the search term to enforce max number of times API can be called
  const throttledTerm = useThrottle(searchTerm, 100);
  const { viewingHistory } = useContext(WikipediaViewerContext);
  const [pages, setPages] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let isFresh = true;
    // show most recently visited first
    const sortedHistory = [...viewingHistory].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
    const uniqueHistoryTitles = [...new Set(sortedHistory.map((h) => h.title))];

    if (searchTerm.trim() !== '') {
      const filteredHistory = matchSorter(uniqueHistoryTitles, searchTerm);
      setHistory(filteredHistory);
      searchPages(searchTerm).then((res) => {
        if (isFresh && res.query) {
          setPages(res.query.search);
        }
      });
    } else {
      setHistory(uniqueHistoryTitles);
    }
    // cancel setting state if the component is unmounted
    return () => (isFresh = false);
  }, [throttledTerm, viewingHistory]);

  return { pages, history };
};

const SearchPages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { pages, history } = usePageSearch(searchTerm);

  return (
    <Combobox
      openOnFocus
      onSelect={(item) => navigate(`/wiki/${item}`)}
    >
      <ComboboxInput
        onChange={(ev) => setSearchTerm(ev.target.value)}
        aria-label="Pages"
        selectOnClick
      />
      {(pages.length > 0 || history.length > 0) && (
        <ComboboxPopover>
          <ComboboxList>
            {history.map((title) => <ComboboxOption key={title} value={title} />)}
            {pages.map(({ title }) => <ComboboxOption key={title} value={title} />)}
          </ComboboxList>
        </ComboboxPopover>
      )}
    </Combobox>
  );
};

export default SearchPages;
