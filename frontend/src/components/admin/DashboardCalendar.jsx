import { useEffect, useState } from "react";
import "./DashboardCalendar.css";
import { getAppointmets } from "../../services/appointments";
import { toast } from "react-toastify";

function DashboardCalendar(params) {
  const [appointments, setAppointments] = useState([]);
  const [currentDate, SetCurrentDate] = useState(new Date());
  const [selectedDate, SetSelectedDate] = useState(new Date());

  const today = new Date();

  useEffect(() => {
    async function loadAppointment() {
      try {
        const data = await getAppointmets();
        setAppointments(data);
      } catch (error) {
        toast.error("Error al obtener los turnos del calendario");
      }
    }
    loadAppointment();
  }, []);

  function getDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getAppointmetsCount(date) {
    const dateKey = getDateKey(date);

    return appointments.filter((appointment) => {
      return String(appointment.date).slice(0, 10) === dateKey;
    }).length;
  }

  function previusMonth() {
    SetCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  }
  function nexMonth() {
    SetCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  }
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const totalDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const startingDay = (firstDay.getDay() + 6) % 7;

  const days = [
    ...Array(startingDay).fill(null),
    ...Array.from({ length: totalDays }, (_, index) => index + 1),
  ];
  const monthName = new Intl.DateTimeFormat("es-AR", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  const selectedCount = getAppointmetsCount(selectedDate);
  const selectDateName = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  return (
    <section className="dashboard-calendar">
      <div className="calendar-header">
        <h2>Calendario</h2>
        <div className="calendar-controls">
          <button onClick={previusMonth} aria-label="Mes anterior">
            ‹
          </button>
          <span>{monthName}</span>
          <button onClick={nexMonth} aria-label="Mes siguiente">
            ›
          </button>
        </div>
      </div>
      <div className="calendar-weekdays">
        <span>LUN</span>
        <span>MAR</span>
        <span>MIE</span>
        <span>JUE</span>
        <span>VIE</span>
        <span>SAB</span>
        <span>DOM</span>
      </div>
      <div className="calendar-grid">
        {days.map((day, index) => {
          if (!day) {
            return <div className="calendar-day empty" key={index} />;
          }
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day,
          );
          const count = getAppointmetsCount(date);
          const isToday = getDateKey(date) === getDateKey(today);

          const isSelected = getDateKey(date) === getDateKey(selectedDate);
          return (
            <button
              key={day}
              className={`calendar-day
                ${isToday ? "today" : ""}
                ${isSelected ? "selected" : ""}
                ${count >= 20 ? "calendar-day-full" : ""}
                `}
              onClick={() => SetSelectedDate(date)}
            >
              <span>{day}</span>
              {count > 0 && (
                <div className="calendar-day-info">
                  <span>{count}/20</span>

                  {count >= 20 && <small>COMPLETO</small>}

                  {count < 20 && <span className="calendar-dot" />}
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="calendar-selected-info">
        <h3>{selectDateName}</h3>
        <p>{selectedCount} de 20 Turnos Ocupados</p>
        <div className="calendar-capacity">
          <div
            className="calendar-capacity-fill"
            style={{
              width: `${Math.min((selectedCount / 20) * 100, 100)}%`,
            }}
          />
        </div>
        {selectedCount >= 20 ? (
          <span className="calendar-full-message">Día completo</span>
        ) : (
          <span className="calendar-available-message">
            {20 - selectedCount} turnos disponibles
          </span>
        )}
      </div>
    </section>
  );
}

export default DashboardCalendar;
