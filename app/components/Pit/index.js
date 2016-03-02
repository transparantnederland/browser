import './index.css';
import React, { PropTypes } from 'react';

import Name from './../Name';
import Type from './../Type';
import Dataset from './../Dataset';

const PitCard = ({ pit }) =>
  <div className="PitCard">
    <div className="PitCard-heading">
      <Name name={pit.name}/>
    </div>
    <div className="PitCard-body">
      <Type type={pit.type}/>
      <Dataset dataset={pit.dataset}/>
      {pit.data ?
        <table className="PitCard-data">
          <tbody>
            {Object.keys(pit.data).map((key) =>
              <tr key={key}>
                <td>{key}</td>
                <td>{pit.data[key]}</td>
              </tr>
            )}
          </tbody>
        </table> : null
      }
    </div>
  </div>;

PitCard.propTypes = {
  pit: PropTypes.object.isRequired,
};

export default PitCard;
