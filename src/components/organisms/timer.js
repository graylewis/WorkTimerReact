import React from 'react'

import { uploadEntries, fetchEntries } from '../../services/user.service'

class Timer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ticker: null,
      timeElapsed: 0,
      startTime: null,
      running: false,
      entries: [],
      oldEntries: []
    }

    this.startClickHandler = this.startClickHandler.bind(this);
    this.stopClickHandler = this.stopClickHandler.bind(this);
  }

  componentDidMount() {
    fetchEntries()
      .then(remoteEntries => {
        console.log(remoteEntries)
        this.setState({ oldEntries: remoteEntries}, () => this.props.onEntriesChange(this.state.oldEntries))
      })
  }

  formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [
      h,
      m > 9 ? m : (h ? '0' + m : m || '0'),
      s > 9 ? s : '0' + s
    ].filter(Boolean).join(':');
  }

  syncEntries() {
    uploadEntries(this.state.entries)
      .then((res) => this.setState({oldEntries: this.state.oldEntries.concat(this.state.entries), entries: []}))
      .catch((err) => console.log(err))
  }

  updateTime = () => {
    let currentDate = new Date();
    if (this.state.startTime) {
      this.setState({
        timeElapsed: Math.round((currentDate - this.state.startTime) / 1000),
      })
    }
  }

  startTimer() {
    this.setState({ 
      ticker: setInterval(this.updateTime, 1000),
      running: true,
    })
  }

  startClickHandler() {
    this.setState({
      startTime: new Date()
    })

    this.startTimer()
  }

  stopClickHandler() {
    if (this.state.startTime) {
      const newEntry = {
        startTime: this.state.startTime,
        endTime: new Date(),
        length: this.state.timeElapsed,
        prettyLength: this.formatTime(this.state.timeElapsed)
      }

      const updatedEntries = this.state.entries.concat(newEntry)

      this.setState({ 
        entries: updatedEntries
      }, () => this.props.onEntriesChange(this.state.oldEntries.concat(this.state.entries)))

      this.setState({
        running: false,
        timeElapsed: 0,
        startTime: null,
      }, () => this.syncEntries())

      clearInterval(this.state.ticker)
      console.log(`FINAL TIME: ${this.state.timeElapsed}`)
    }
  }

  render() {
    return (
      <div className="clock-card">
        <div className="time-display">
          <span className="display-label">TIME ELAPSED</span>
          <div className="display-number"> { this.formatTime(this.state.timeElapsed) } </div>
        </div>
        {(this.state.running) ? 
          <button onClick={this.stopClickHandler}>Stop Timer</button>
          :
          <button onClick={this.startClickHandler}>Start Timer</button>
        }
      </div>
    )
  }
}

export default Timer