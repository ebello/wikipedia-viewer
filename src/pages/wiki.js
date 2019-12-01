import React from 'react';
import { Router } from '@reach/router';
import WikipediaViewer from '../contexts/wikipedia-viewer';
import SearchPages from '../components/search-pages';
import PageViewer from '../components/page-viewer';

const WikiPage = ({ page }) => (
  <WikipediaViewer>
    <SearchPages />
    <PageViewer page={page} />
  </WikipediaViewer>
);

const Wiki = () => (
  <Router>
    <WikiPage path="/wiki/:page" />
  </Router>
)

export default Wiki;
