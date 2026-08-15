import "./DashboardCalendar.css";

function DashboardCalendar(params) {
  const days = [
    null,null,null,null,null,1,2,
    3,4,5,6,7, 8, 9,
    10,11,12,13,14,
    15,16,17,18,19,
    20,21,22,23,24,
    25,26,27,28,29,
    30,31,
  ];
  return (
    <section className="dashboard-calendar">
      <div className="calendar-header">
        <h2>Calendario</h2>
        <div className="calendar-controls">
            <button></button>
            <span>
                Agosto 20265
            </span>
            <button></button>
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
            {days.map((day,index) => (
                <div
                key={index}
                className={`calendar-day ${day === 12 ? "today" : ""}`}>
                    {day && <span>{day}</span>}
                </div>
            ))}
      </div>
    </section>
  );
}

export default DashboardCalendar;


