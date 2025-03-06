import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { getMessagesEs, localizer } from '../../helpers'
import { useEffect, useState } from 'react'
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
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    // console.log({onDoubleClick: event});
    openDateModal();
  }

  const onSelectEvent = (event) => {
    // console.log({click: event});
    setActiveEvent(event);  
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }
  
  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
    
        <Navbar />

          <div>
            <Calendar
              culture='es'
              localizer={localizer}
              events={events}
              defaultView={lastView}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 'calc(100vh - 80px)' }}
              messages={getMessagesEs()}
              eventPropGetter={eventStyleGetter}
              components={{
                event: CalendarEvent
              }}
              onDoubleClickEvent={onDoubleClick}
              onSelectEvent={onSelectEvent}
              onView={onViewChanged}
            />
          </div>

          
          <CalendarModal />
          <FabAddNew />
          <FabDelete />

    </>
  )
}
