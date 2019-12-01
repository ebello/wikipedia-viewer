import React, { useEffect, useState, useContext } from 'react';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';
import { parsePage } from '../wikipedia-api';

const usePageParse = (title) => {
  const [pageText, setPageText] = useState();

  useEffect(() => {
    let isFresh = true;
    if (title) {
      parsePage(title).then((res) => {
        console.log(res);
        if (isFresh && res.parse) setPageText(res.parse.text['*']);
      });
    }
    // cancel setting state if the component is unmounted
    return () => (isFresh = false);
  }, [title]);

  return pageText;
};

const PageViewer = ({ page }) => {
  const { viewingPage } = useContext(WikipediaViewerContext);
  const pageText = usePageParse(page);

  return (
    <>
      {pageText && (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: pageText }} />
      )}
    </>
  );
};

export default PageViewer;
