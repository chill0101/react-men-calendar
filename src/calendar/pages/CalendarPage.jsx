import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { getMessagesEs, localizer } from '../../helpers'
import { useEffect, useState, useMemo } from 'react'
import { useAuthStore, useCalendarStore, useUiStore2 } from '../../hooks'


export const CalendarPage = () => {

  const { user } = useAuthStore();
  
  const {openDateModal} = useUiStore2();

  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    
    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '6px',
      opacity: isSelected ? 1 : 0.8,
      color: 'white',
      border: 'none',
      fontSize: '0.85em',
      fontWeight: '500',
      boxShadow: isSelected ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
    }
    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelectEvent = (event) => {
    setActiveEvent(event);  
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }
  
  useEffect(() => {
    startLoadingEvents();
  }, [])

  // Opciones de vistas personalizadas
  const calendarViews = useMemo(() => ({
    month: true,
    week: true,
    day: true,
    agenda: true
  }), []);
  

  return (
    <>
      <Navbar />
      <div className="calendar-container">
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          defaultView={lastView}
          views={calendarViews}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 100px)' }}
          messages={getMessagesEs()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChanged}
          popup
        />
      </div>
      
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
