import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WikipediaViewerContext = React.createContext();

const windowGlobal = typeof window !== 'undefined' && window;
const { localStorage } = windowGlobal;

const WikipediaViewer = ({ children }) => {
  const defaultHistory = (localStorage && JSON.parse(localStorage.getItem('viewingHistory'))) || [];
  const [viewingHistory, setViewingHistory] = useState(defaultHistory);

  const addToViewingHistory = (title) => {
    setViewingHistory([...viewingHistory, {
      timestamp: Date.now(),
      title,
    }]);
  };

  const clearViewingHistory = () => setViewingHistory([]);

  useEffect(() => {
    localStorage.setItem('viewingHistory', JSON.stringify(viewingHistory));
  }, [viewingHistory]);

  return (
    <WikipediaViewerContext.Provider
      value={{
        viewingHistory,
        addToViewingHistory,
        clearViewingHistory,
      }}
    >
      {children}
    </WikipediaViewerContext.Provider>
  );
};

WikipediaViewer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default WikipediaViewer;

export { WikipediaViewerContext };
