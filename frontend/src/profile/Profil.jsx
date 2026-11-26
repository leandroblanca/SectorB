import "./Profil.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NavBar from "../components/layout/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import LoyaltyProgram from "../components/profile/LoyaltyProgram.jsx";
import NextAppointment from "../components/profile/NextAppointment.jsx";
import AppointmentHistory from "../components/profile/AppointmentHistory.jsx";
import PersonalData from "../components/profile/PersonalData.jsx";
import ProfileQuote from "../components/profile/ProfileQuote.jsx";
import useAuthStore from "../components/store/authStore.js";
import { getMyappointments } from "../services/appointments.js";
import { getMyProfile, updateMyProfile } from "../services/profileService.js";

function appointmentTime(appointment) {
  return new Date(`${appointment.date.slice(0, 10)}T${appointment.time}:00-03:00`).getTime();
}

export default function Profil() {
  const sessionUser = useAuthStore((state) => state.user);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState(null);
  const [appointmentsFailed, setAppointmentsFailed] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const profile = await getMyProfile();
        if (active) setUser(profile);
      } catch (error) {
        if (active) toast.error(error.response?.data?.message || "No se pudo cargar tu perfil");
      }
    }

    async function loadAppointments() {
      try {
        const data = await getMyappointments();
        if (active) setAppointments(data.appointments);
      } catch {
        if (active) {
          setAppointmentsFailed(true);
          toast.error("No se pudieron cargar tus turnos");
        }
      }
    }

    loadProfile();
    loadAppointments();
    return () => { active = false; };
  }, []);

  async function handleSave(data) {
    setSaving(true);
    try {
      const updated = await updateMyProfile(data);
      setUser(updated);
      useAuthStore.setState((state) => ({ user: { ...state.user, ...updated } }));
      toast.success("Perfil actualizado");
    } catch (error) {
      toast.error(error.response?.data?.message || "No se pudo actualizar tu perfil");
    } finally {
      setSaving(false);
    }
  }

  const loading = appointments === null && !appointmentsFailed;
  const now = Date.now();
  const nextAppointment = appointments?.filter((item) => item.status === "confirmed" && appointmentTime(item) >= now)
    .sort((a, b) => appointmentTime(a) - appointmentTime(b))[0];
  const history = (appointments || []).filter((item) => item.status === "completed")
    .sort((a, b) => appointmentTime(b) - appointmentTime(a));

  function handleEdit() {
    const section = document.getElementById("datos-personales");
    section.scrollIntoView({ block: "start" });
    section.querySelector("input")?.focus({ preventScroll: true });
  }

  return (
    <>
      <NavBar />
      <main className="client-profile">
        <div className="client-profile-content">
          <ProfileHeader user={user || sessionUser} onEdit={handleEdit} />
          <div className="client-profile-overview">
            <LoyaltyProgram completedVisits={appointments ? history.length : null} />
            <NextAppointment appointment={nextAppointment} loading={loading} failed={appointmentsFailed} />
          </div>
          <AppointmentHistory appointments={history} loading={loading} failed={appointmentsFailed} />
          <PersonalData key={user?.updatedAt} user={user} onSave={handleSave} saving={saving} />
          <ProfileQuote />
        </div>
      </main>
      <Footer />
    </>
  );
}
