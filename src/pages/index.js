import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { searchPages } from '../wikipedia-api';

const Description = styled.div`
  margin-left: 18px;
  padding: 12px;
`;

function usePageSearch(searchTerm) {
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
}

export default () => {
  const [searchTerm, setSearchTerm] = useState('');
  const pages = usePageSearch(searchTerm);

  return (
    <>
      <div
        css={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
        `}
      >
        Hello world!
      </div>
      <Combobox openOnFocus>
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
      <Description>this is a description</Description>
    </>
  );
};
