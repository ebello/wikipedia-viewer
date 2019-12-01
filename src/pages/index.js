import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import WikipediaViewer from '../contexts/wikipedia-viewer';
import SearchPages from '../components/search-pages';
import PageViewer from '../components/page-viewer';

const Description = styled.div`
  margin-left: 18px;
  padding: 12px;
`;

export default () => {
  return (
    <WikipediaViewer>
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
      <SearchPages />
      <PageViewer />
      <Description>this is a description</Description>
    </WikipediaViewer>
  );
};
