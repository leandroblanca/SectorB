import { FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { APPOINTMENT_DURATION } from "../../constants/appointments.js";
import { getAvailability } from "../../services/appointments";
import "./BookingCalendar.css";

function getToday() {
  return new Date().toLocaleDateString("sv-SE", {
    timeZone: "America/Argentina/Buenos_Aires",
  });
}

function BookingCalendar({
  selectedBarber,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  availabilityRevision,
}) {
  const today = getToday();

  const [currentMonth, setCurrentMonth] = useState(() => {
    const [year, month] = today.split("-").map(Number);

    return new Date(year, month - 1, 1);
  });

  const [availability, setAvailability] = useState(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });

  const weekdays = [
    "Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do",
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = (
    new Date(year, month, 1).getDay() + 6
  ) % 7;

  const days = [
    ...Array(firstDay).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    ),
  ];

  const barberId = selectedBarber?._id;

  const requestKey =
    barberId && selectedDate
      ? `${barberId}-${selectedDate}-${availabilityRevision}`
      : null;

  useEffect(() => {
    if (!barberId || !selectedDate) return;

    let ignore = false;

    setAvailability(null);

    async function loadAvailability() {
      try {
        const times = await getAvailability(
          barberId,
          selectedDate
        );

        if (!ignore) {
          setAvailability({
            key: requestKey,
            times,
            error: false,
          });
        }

      } catch (error) {
        if (!ignore) {
          toast.error(error.response?.data?.message || "No se pudieron consultar los horarios", {
            toastId: "disponibilidad",
          });
          setAvailability({
            key: requestKey,
            times: [],
            error: true,
          });
        }
      }
    }

    loadAvailability();

    return () => {
      ignore = true;
    };

  }, [barberId, selectedDate, requestKey]);

  const currentAvailability =
    availability?.key === requestKey
      ? availability
      : null;

  function changeMonth(direction) {
    setCurrentMonth(
      new Date(year, month + direction, 1)
    );
  }

  function formatDate(day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  const currentMonthKey = formatDate(1).slice(0, 7);
  const todayMonthKey = today.slice(0, 7);

  return (
    <section className="booking-calendar">

      <div className="booking-section-header">
        <h2>
          <span>3</span>
          FECHA Y HORA
        </h2>

        <p>{monthName.toUpperCase()}</p>
      </div>

      <div className="booking-calendar-panel">

        <div className="booking-calendar-dates">

          <div className="booking-calendar-header">
            <h3>{monthName}</h3>

            <div className="booking-calendar-controls">
              <button
                type="button"
                aria-label="Mes anterior"
                disabled={currentMonthKey <= todayMonthKey}
                onClick={() => changeMonth(-1)}
              >
                <FiChevronLeft className="ui-icon" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label="Mes siguiente"
                onClick={() => changeMonth(1)}
              >
                <FiChevronRight className="ui-icon" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="booking-calendar-weekdays">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="booking-calendar-grid">

            {days.map((day, index) =>
              day === null ? (
                <span key={`empty-${index}`} />
              ) : (
                <button
                  type="button"
                  key={formatDate(day)}
                  disabled={formatDate(day) < today}
                  aria-pressed={selectedDate === formatDate(day)}
                  className={`booking-calendar-day ${
                    selectedDate === formatDate(day)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => onSelectDate(formatDate(day))}
                >
                  {day}
                </button>
              )
            )}

          </div>
        </div>

        <div className="booking-calendar-times">

          <h3>HORARIOS DISPONIBLES</h3>

          {!selectedBarber || !selectedDate ? (
            <p className="booking-calendar-message">
              Seleccioná un barbero y una fecha.
            </p>
          ) : !currentAvailability ? (
            <p className="booking-calendar-message">
              Consultando horarios...
            </p>
          ) : currentAvailability.error ? null : currentAvailability.times.length === 0 ? (
            <p className="booking-calendar-message">
              No hay horarios disponibles para este día.
            </p>
          ) : (
            <div className="booking-times-grid">

              {currentAvailability.times.map((time) => (
                <button
                  type="button"
                  key={time}
                  aria-pressed={selectedTime === time}
                  className={`booking-time ${
                    selectedTime === time ? "selected" : ""
                  }`}
                  onClick={() => onSelectTime(time)}
                >
                  {time}
                </button>
              ))}

            </div>
          )}

          <p className="booking-calendar-zone">
            <FiClock className="ui-icon" aria-hidden="true" /> Hora argentina (GMT-3)
          </p>

          <p className="booking-calendar-duration">
            Duración del turno: {APPOINTMENT_DURATION} min
          </p>

        </div>
      </div>
    </section>
  );
}

export default BookingCalendar;
