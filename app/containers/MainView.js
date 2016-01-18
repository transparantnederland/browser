import React from 'react';

import TwoColumnLayout from '../layouts/TwoColumnLayout';
import ResultContainer from './ResultContainer';
import DetailContainer from './DetailContainer';

const MainView = React.createClass({

  shouldComponentUpdate() {
    return false;
  },

  render() {
    return (
      <TwoColumnLayout>
        <ResultContainer />
        <DetailContainer />
      </TwoColumnLayout>
    );
  },
});

export default MainView;
