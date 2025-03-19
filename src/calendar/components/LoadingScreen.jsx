import './LoadingScreen.css';

export const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-logo">
          <i className="fas fa-calendar-alt"></i>
        </div>
        <div className="spinner"></div>
        <p className="loading-text">Cargando su calendario</p>
      </div>
    </div>
  );
};