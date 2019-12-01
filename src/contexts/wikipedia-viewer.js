import React, { useState } from 'react';
import PropTypes from 'prop-types';

const WikipediaViewerContext = React.createContext();

const WikipediaViewer = ({ children }) => {
  const [viewingHistory, setViewingHistory] = useState([]);

  const addToViewingHistory = (title) => {
    setViewingHistory([...viewingHistory, {
      timestamp: Date.now(),
      title,
    }]);
  };

  return (
    <WikipediaViewerContext.Provider
      value={{
        viewingHistory,
        addToViewingHistory,
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
