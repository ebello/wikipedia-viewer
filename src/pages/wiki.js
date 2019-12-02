/* eslint-disable react/prop-types */
/** @jsx jsx */
import {
  jsx, Styled, Main, Container, Header,
} from 'theme-ui';
import { Router } from '@reach/router';
import { Global } from '@emotion/core';
import WikipediaViewer from '../contexts/wikipedia-viewer';
import SearchPages from '../components/search-pages';
import PageViewer from '../components/page-viewer';

const WikiPage = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const page = props['*'];
  return (
    <WikipediaViewer>
      <Styled.root>
        <Global
          styles={{
            html: {
              boxSizing: 'border-box',
            },
            '*, *:before, *:after': {
              boxSizing: 'inherit',
            },
            body: {
              margin: 0,
            },
          }}
        />
        <Container sx={{ pt: [0, 0] }}>
          <Header
            sx={{
              position: 'sticky',
              top: 0,
              bg: 'background',
              py: [3, 4],
            }}
          >
            <SearchPages />
          </Header>
          <Main>
            {page && <PageViewer page={page} />}
          </Main>
        </Container>
      </Styled.root>
    </WikipediaViewer>
  );
};

const Wiki = () => (
  <Router>
    <WikiPage path="/wiki/*" />
  </Router>
);

export default Wiki;
