import React, { useEffect, useState, useContext } from 'react';
import { WikipediaViewerContext } from '../contexts/wikipedia-viewer';
import { parsePage } from '../wikipedia-api';

const usePageParse = (pageid) => {
  const [pageText, setPageText] = useState();

  useEffect(() => {
    let isFresh = true;
    if (pageid) {
      parsePage(pageid).then((res) => {
        if (isFresh && res.parse) setPageText(res.parse.text['*']);
      });
    }
    // cancel setting state if the component is unmounted
    return () => (isFresh = false);
  }, [pageid]);

  return pageText;
};

const PageViewer = () => {
  const { viewingPageId } = useContext(WikipediaViewerContext);
  const pageText = usePageParse(viewingPageId);

  return (
    <>
      <div>{viewingPageId}</div>
      {pageText && (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: pageText }} />
      )}
    </>
  );
};

export default PageViewer;
