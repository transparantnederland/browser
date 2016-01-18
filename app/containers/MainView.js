import React from 'react';

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

export default MainView;
