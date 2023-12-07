import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { fetchTrainings } from './trainingapi'

const mLocalizer = momentLocalizer(moment)

function EventCalendar() {
  const [trainings, setTrainings] = useState([])  
  const [calendarEvents, setCalendarEvents] = useState([])

  const mapToCalendar = (trainings) => {
    return trainings.map((training) => ({
      title: training.activity,
      start: new Date(training.date),
      end: moment(training.date)
        .add(training.duration, 'minutes')
        .toDate(),
    }))
  }

  useEffect(() => {
    fetchTrainings()
      .then(data => {
        setTrainings(data)
        setCalendarEvents(mapToCalendar(data))
      })
      .catch(error => console.error('Failed fetching trainings:', error))
  }, [])

  return (
    <div style={{ width: '100%', height: 600}}>
      <Calendar
        localizer={mLocalizer}
        events={calendarEvents}
        startAccessor='start'
        endAccessor='end'
        views={['month', 'week', 'day']}
      />
    </div>
  )
}

export default EventCalendar;