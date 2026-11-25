import { useEffect, useRef, useState } from "react";
import BookingService from "../../components/booking/BookingService";
import { getServices } from "../../services/serviceService";
import { toast } from "react-toastify";
import NavBar from "../../components/layout/Navbar";
import Footer from "../../components/footer/Footer";
import { getBarber } from "../../services/barberService";
import BookingBarber from "../../components/booking/BookingBarber";
import BookingCalendar from "../../components/booking/BookingCalendar";
import BookingSummary from "../../components/booking/BookingSummary";
import { createAppointmets } from "../../services/appointments";
import "./Booking.css";

function Booking() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [availabilityRevision, setAvailabilityRevision] = useState(0);
  const submissionPending = useRef(false);
  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data.filter((service) => service.active !== false));
      } catch {
        toast.error("No se pudieron cargar los servicios", { toastId: "servicios" });
      }
    }
    async function loadBarber() {
      try {
        const data = await getBarber();
        setBarbers(data.filter((barber) => barber.active !== false));
      } catch {
        toast.error("No se pudieron cargar los barberos", { toastId: "barberos" });
      }
    }
    loadServices();
    loadBarber();
  }, []);
  function handleSelectDate(date) {
    setSelectedDate(date);
    setSelectedTime("");
  }

  function handleSelectBarber(barber) {
    setSelectedBarber(barber);
    setSelectedTime("");
  }

  async function handleConfirm(notes) {
    if (submissionPending.current) return false;

    submissionPending.current = true;
    setSubmitting(true);
    try {
      await createAppointmets({
        service: selectedService._id,
        barber: selectedBarber._id,
        date: selectedDate,
        time: selectedTime,
        notes,
      });
      setSelectedTime("");
      setAvailabilityRevision((revision) => revision + 1);
      toast.success("Turno reservado correctamente");
      return true;
    } catch (error) {
      if (error.response?.status === 409) {
        setSelectedTime("");
        setAvailabilityRevision((revision) => revision + 1);
      }
      toast.error(error.response?.data?.message || "No se pudo confirmar el turno");
      return false;
    } finally {
      submissionPending.current = false;
      setSubmitting(false);
    }
  }

  return (
    <>
      <NavBar />

      <main className="booking-page">
        <div className="booking-container">
          <header className="booking-header">
            <span className="booking-subtitle">RESERVA EXCLUSIVA</span>

            <h1>
              Reservá tu turno en <span>SectorB.</span>
            </h1>

            <p>
              Seleccioná tu servicio, tu barbero de preferencia y el horario
              ideal.
            </p>
          </header>

          <div className="booking-layout">
            <div className="booking-steps" inert={submitting}>
              <BookingService
                services={services}
                selectedService={selectedService}
                onSelectService={setSelectedService}
              />

              <BookingBarber
                barbers={barbers}
                selectedBarber={selectedBarber}
                onSelectedBarber={handleSelectBarber}
              />
              <BookingCalendar
                selectedBarber={selectedBarber}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectDate={handleSelectDate}
                onSelectTime={setSelectedTime}
                availabilityRevision={availabilityRevision}
              />
            </div>
            <BookingSummary
              service={selectedService}
              barber={selectedBarber}
              date={selectedDate}
              time={selectedTime}
              submitting={submitting}
              onConfirm={handleConfirm}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Booking;
