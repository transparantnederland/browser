import React, { PropTypes } from 'react';
import moment from 'moment';

const dateFormat = 'MMM YYYY';
const calendarFormat = {
  sameDay: '[Present]',
  sameElse: dateFormat,
};

const RelationPeriod = ({ since, until }) => {
  const from = moment(since, 'YYYY-MM-DD');
  const to = until ? moment(until, 'YYYY-MM-DD') : moment();
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
  since: PropTypes.string.isRequired,
  until: PropTypes.string,
};

export default RelationPeriod;
