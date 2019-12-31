import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '../styles'
import TimeScroll from './TimeScroll'
import utils from './utils'

class Time extends PureComponent {
  constructor(props) {
    super(props)

    this.defaultValue = utils.newDate()
    this.handleHourChange = this.handleChange.bind(this, 'hour')
    this.handleMinuteChange = this.handleChange.bind(this, 'minute')
    this.handleSecondChange = this.handleChange.bind(this, 'second')
    this.handleAMPMChange = this.handleChange.bind(this, 'ampm')
  }

  getValue() {
    return this.props.value || this.defaultValue
  }

  handleChange(type, val) {
    const { disabled, format, min, max, range, pos } = this.props
    const value = this.getValue()
    const date = new Date(value.getTime())
    let hours

    switch (type) {
      case 'hour':
        if (format.indexOf('h') >= 0 && date.getHours() >= 12) {
          date.setHours(val + 12)
        } else {
          date.setHours(val)
        }
        break
      case 'minute':
        date.setMinutes(val)
        break
      case 'second':
        date.setSeconds(val)
        break
      case 'ampm':
        hours = date.getHours()
        if (val === 1 && hours < 12) date.setHours(hours + 12)
        else if (val === 0 && hours >= 12) date.setHours(hours - 12)
        break
      default:
    }

    let isDisabled
    if (disabled) isDisabled = disabled(date)

    if (pos !== 'start') {
      if (!isDisabled && min) {
        if (date.getHours() !== min.getHours() && utils.compareAsc(date, min) < 0) return
        if (range && utils.compareAsc(date, utils.addSeconds(min, range)) > 0) return
      }
      if (!isDisabled && max) {
        if (utils.compareAsc(date, max) > 0) return
        if (range && utils.compareAsc(date, utils.addSeconds(max, -range)) < 0) return
      }
    }

    if (isDisabled) return
    this.props.onChange(date, true, false, 'time')
  }

  render() {
    const { format } = this.props
    const value = this.getValue()
    const className = datepickerClass('time-picker')

    let hours = value.getHours()
    if (format.indexOf('h') >= 0 && hours >= 12) {
      hours -= 12
    }

    return (
      <div className={className}>
        {format.indexOf('H') >= 0 && (
          <TimeScroll value={value.getHours()} total={24} onChange={this.handleHourChange} />
        )}
        {format.indexOf('h') >= 0 && <TimeScroll value={hours} total={12} onChange={this.handleHourChange} />}
        {format.indexOf('m') >= 0 && <TimeScroll value={value.getMinutes()} onChange={this.handleMinuteChange} />}
        {format.indexOf('s') >= 0 && <TimeScroll value={value.getSeconds()} onChange={this.handleSecondChange} />}
        {/a|A/.test(format) && (
          <TimeScroll value={value.getHours() >= 12 ? 1 : 0} total={2} ampm onChange={this.handleAMPMChange} />
        )}
      </div>
    )
  }
}

Time.propTypes = {
  disabled: PropTypes.func,
  format: PropTypes.string.isRequired,
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  value: PropTypes.object,
  pos: PropTypes.string,
}

export default Time
