import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import TwoColumnLayout from '../layouts/TwoColumnLayout';
import ResultPanel from './ResultPanel';
import DetailPanel from './DetailPanel';

const MainView = React.createClass({

  shouldComponentUpdate() {
    return false;
  },

  render() {
    return (
      <TwoColumnLayout>
        <ResultPanel />
        <DetailPanel />
      </TwoColumnLayout>
    );
  },
});

export default DragDropContext(HTML5Backend)(MainView);
