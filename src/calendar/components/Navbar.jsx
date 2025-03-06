import { useAuthStore } from "../../hooks"
import './Navbar.css';

export const Navbar = () => {

  const {startLogout, user} = useAuthStore();

  return (
    <div className="navbar-calendar">
        
        <div className="navbar-brand-calendar">
            <i className="fas fa-calendar-alt"></i>
            Calendario de {user.name}
        </div>

        <button
            className="logout-button"
            onClick={startLogout}
        >
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
        </button>

    </div>
  )
}
