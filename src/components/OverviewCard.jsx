import React from 'react'
import PropTypes from 'prop-types'

const OverviewCard = ({ data,text,icon }) => {
  return (
    <div>{data}</div>
  )
}

OverviewCard.propTypes = {
    data:PropTypes,
    text:PropTypes,
    icon:PropTypes
}

export default OverviewCard