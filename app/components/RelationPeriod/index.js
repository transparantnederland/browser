import React, { PropTypes } from 'react';
import moment from 'moment';

const dateFormat = 'MMM YYYY';
const calendarFormat = {
  sameDay: '[Present]',
  sameElse: dateFormat,
};

const RelationPeriod = ({ since, until }) => {
  const from = moment(since[0], 'YYYY-MM-DD');
  const to = until ? moment(until[0], 'YYYY-MM-DD') : moment();
  const fromDate = from.format(dateFormat);
  const toDate = to.calendar(null, calendarFormat);
  const duration = to.from(from, true);

  return (
    <span>
      {fromDate} - {toDate} ({duration})
    </span>
  );
};

RelationPeriod.propTypes = {
  since: PropTypes.array.isRequired,
  until: PropTypes.array,
};

export default RelationPeriod;
