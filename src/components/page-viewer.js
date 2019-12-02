/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';
import { parsePage } from '../wikipedia-api';

const usePageParse = (title) => {
  const [pageText, setPageText] = useState();
  const [pageTitle, setPageTitle] = useState();
  const { addToViewingHistory } = useContext(WikipediaViewerContext);

  useEffect(() => {
    let isFresh = true;
    if (title) {
      parsePage(title).then((res) => {
        if (isFresh && res.parse) {
          setPageText(res.parse.text['*']);
          setPageTitle(res.parse.title);
          addToViewingHistory(title);
        }
      });
    }
    // cancel setting state if the component is unmounted
    return () => (isFresh = false);
  }, [title]);

  return { pageTitle, pageText };
};

const PageViewer = ({ page }) => {
  const { pageTitle, pageText } = usePageParse(page);

  return (
    <React.Fragment>
      {pageTitle && <Styled.h1>{pageTitle}</Styled.h1>}
      {pageText && (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: pageText }} />
      )}
    </React.Fragment>
  );
};

PageViewer.propTypes = {
  page: PropTypes.string.isRequired,
};

export default PageViewer;
