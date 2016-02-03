import './index.css';
import React, { PropTypes } from 'react';

import ConceptList from '../ConceptList';
import Message from '../Message';

const Results = ({ concepts, dispatch, query }) => {
  const hasResults = concepts.length;

  return (
    <div className="Results">
      {hasResults ?
        <ConceptList concepts={concepts} dispatch={dispatch} /> :
        <Message>
          {query === '' ?
            <span>Try searching for a politician, political party, or organization. For example: “hermans”, “pvda”, or “shell”.</span> :
            <span>No results for “{query}”.<br /><br />Try something else or select an other “type” or “source” on the left.</span>
          }
        </Message>
      }
    </div>
  );
};

Results.propTypes = {
  concepts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default Results;
