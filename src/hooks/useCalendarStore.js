import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent) => { 

        try {
                    //SI ESTA OK
        if(calendarEvent.id){
            //Actualizando
            await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
            dispatch(onUpdateEvent({...calendarEvent, user}));
            return;
        }
            //Creando
            const {data} = await calendarApi.post('/events', calendarEvent);
            console.log(data);

            dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}));
        } catch (error) {
           console.log(error + " Error guardando evento"); 
           Swal.fire('Error',error.response.data.msg, 'error');
        }
        

    }

    const startDeletingEvent = async() => {
        
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
           console.log(error + " Error eliminando evento"); 
           Swal.fire('Error', error.response.data.msg,'error');
        }


    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);

            const { uid } = user;
            const filteredEvents = events.filter(event => 
                event.user.uid === uid || event.user._id === uid
            );

            dispatch(onLoadEvents(filteredEvents));
            console.log(events);
        } catch (error) {
            console.log(error + " Error cargando eventos");
        }
    }


    return {

        //* Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}
