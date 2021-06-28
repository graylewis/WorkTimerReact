import Timer from '../organisms/timer'

import { useState } from 'react'

function TimerPage() {

  const [entries, setEntries] = useState([]);

  const entryCards = entries.map((entry, i) => <li key={i} className="time-entry"> {entry.prettyLength} </li>)

  const eventHandler = (data) => {
    setEntries(data)
  }

  return (
    <div className="container">
      <Timer onEntriesChange={eventHandler}></Timer>
      <ul className="time-listings">
        { entryCards }
      </ul>
    </div>
  )
}

export default TimerPage