import React, { useState, useEffect } from "react";
import { BookingState, DesignConfig } from "../types";
import { Calendar, Clock, MapPin, User, Phone, Mail, Landmark, Check, Trash2, ShieldCheck, FileText, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ConsultationBookingProps {
  config: DesignConfig;
}

interface SavedBooking extends BookingState {
  bookingId: string;
  location: string;
  dimensions: string;
  layout: string;
}

export default function ConsultationBooking({ config }: ConsultationBookingProps) {
  const [form, setForm] = useState<BookingState>({
    fullName: "",
    phone: "",
    email: "",
    date: "",
    time: "10:00",
    notes: ""
  });

  const [localBookings, setLocalBookings] = useState<SavedBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [successBooking, setSuccessBooking] = useState<SavedBooking | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mhk_setif_bookings");
    if (saved) {
      try {
        setLocalBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveToLocal = (newBooking: SavedBooking) => {
    const list = [newBooking, ...localBookings];
    setLocalBookings(list);
    localStorage.setItem("mhk_setif_bookings", JSON.stringify(list));
  };

  const deleteBooking = (id: string) => {
    const list = localBookings.filter(b => b.bookingId !== id);
    setLocalBookings(list);
    localStorage.setItem("mhk_setif_bookings", JSON.stringify(list));
  };

  // Check if dates are on Friday (weekend in Algeria)
  const handleDateChange = (val: string) => {
    if (!val) {
      setForm({ ...form, date: "" });
      setWarningMsg(null);
      return;
    }
    const selectedDate = new Date(val);
    const day = selectedDate.getDay(); // 0-6 (0 is Sunday, 5 is Friday)
    
    if (day === 5) {
      setWarningMsg("Note: MHK Sétif showroom is closed on Fridays because of the traditional weekend. On-site measurements can be scheduled for Saturdays through Thursdays.");
    } else {
      setWarningMsg(null);
    }
    
    setForm({ ...form, date: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.date || !form.time) {
      alert("Please enter all required scheduling fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          date: form.date,
          time: form.time,
          notes: form.notes || `Layout selection: ${config.layoutId}, Cabinet MDF Selected color: ${config.selectedColor}`,
          selectedLayout: config.layoutId,
          dimensions: `${config.dimensions.width}m x ${config.dimensions.length}m`
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const fullSaved: SavedBooking = {
          ...form,
          bookingId: data.bookingId,
          location: data.details.location,
          dimensions: data.details.dimensions,
          layout: data.details.layout
        };
        saveToLocal(fullSaved);
        setSuccessBooking(fullSaved);
        
        // Reset core fields
        setForm({
          fullName: "",
          phone: "",
          email: "",
          date: "",
          time: "10:00",
          notes: ""
        });
      } else {
        alert(data.error || "Booking submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error scheduling appointment with Sétif customizer. Check connections.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="booking-manager" className="mt-12 bg-stone-900 border border-stone-800 rounded-3xl p-6 lg:p-10 shadow-xl text-stone-100">
      
      <div className="max-w-4xl mx-auto text-left">
        
        <div className="mb-8">
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-1">SECURE SCHEDULER</span>
          <h3 className="text-2xl sm:text-3xl font-sans font-medium text-stone-100">
            Showroom &amp; Structural Measurement Booking
          </h3>
          <p className="text-sm text-stone-400 mt-1 max-w-xl">
            Book a physical design session at our Cité Yahiaoui showroom, or have our expert CAD structural team run site measurements in Sétif.
          </p>
        </div>

        {/* Success Modal Block */}
        <AnimatePresence>
          {successBooking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8 p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-500 text-stone-950 rounded-xl">
                  <ShieldCheck className="h-6 w-6 stroke-[2.5]" />
                </div>
                <div className="space-y-2 flex-grow">
                  <h4 className="text-base font-bold text-emerald-400">Appointment Secured!</h4>
                  <p className="text-xs text-stone-300 leading-normal">
                    Assigned ID <strong>{successBooking.bookingId}</strong>. A designer from MHK CUISINE Sétif will call you on <strong>{successBooking.phone}</strong> to confirm local address coordinates.
                  </p>
                  
                  {/* Voucher print ticket format */}
                  <div className="mt-4 p-4 rounded-xl bg-stone-950/70 border border-emerald-950/50 text-xs font-mono space-y-1">
                    <p className="text-stone-500 text-[10px]">MHK OFFICIAL RESERVATION TICKING</p>
                    <p><span className="text-stone-400">FullName:</span> {successBooking.fullName}</p>
                    <p><span className="text-stone-400">Sétif Showroom:</span> Cité Yahiaoui (Les Crêtes), Sétif</p>
                    <p><span className="text-stone-400">Time-Slot:</span> {successBooking.date} / {successBooking.time}</p>
                    <p><span className="text-stone-400">Layout Spec:</span> {successBooking.layout} ({successBooking.dimensions})</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setSuccessBooking(null)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-stone-100 font-bold rounded-lg text-xs transition"
                    >
                      Dismiss View
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-1.5 bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-lg hover:border-stone-700 transition"
                    >
                      Print Booking Voucher
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Grid: Form + Saved Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Scheduling inputs */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5 bg-stone-950/50 p-6 rounded-2xl border border-stone-850/60">
            <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest border-b border-stone-800/80 pb-2 mb-4">
              Enter Appointment Details
            </h4>

            {/* Warning if Date is on Friday */}
            {warningMsg && (
              <div className="p-3 bg-amber-500/5 border border-amber-500/15 rounded-lg flex items-start gap-2.5 text-amber-200 text-xs">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p>{warningMsg}</p>
              </div>
            )}

            <div className="space-y-4 text-xs font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-stone-400 font-medium flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-amber-500" /> Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="E.g., Rami Benouaret"
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-500 placeholder-stone-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-stone-400 font-medium flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-amber-500" /> Algerian Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="E.g., +213 655 44 33 22"
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-500 placeholder-stone-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-stone-400 font-medium flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-amber-500" /> Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ramibn@example.com"
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-500 placeholder-stone-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-stone-400 font-medium flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-amber-500" /> Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-stone-400 font-medium flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-amber-500" /> Preferred Hour <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="09:00">09:00 AM (Showroom Opening)</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:30">2:30 PM (Highly Recommended)</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:30">5:30 PM (Evening Session)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-stone-400 font-medium">Sourcing request or address coords:</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="E.g., I live in El-Eulma but want MHK to scan my duplex kitchen. Also let's check high gloss grey MDF options..."
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-500 placeholder-stone-600 min-h-[70px]"
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <span>Submitting Reservation Ticket...</span>
              ) : (
                <>
                  <Landmark className="h-4.5 w-4.5" />
                  <span>Secure Local Showroom Consultation</span>
                </>
              )}
            </button>
          </form>

          {/* Persistent Save Blocks - Displays previously booked consultations in Sétif */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest border-b border-stone-800/80 pb-2 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-400" />
              <span>Your Bookings in Sétif ({localBookings.length})</span>
            </h4>

            {localBookings.length === 0 ? (
              <div className="p-6 rounded-2xl bg-stone-950/20 border border-stone-800/30 text-center text-xs text-stone-500">
                <p>No offline reservations tracked in this browser session.</p>
                <p className="mt-1">Fill out the planner specifications to secure an installation reservation.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {localBookings.map((b) => (
                  <div key={b.bookingId} className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs space-y-2 text-left relative group">
                    <button
                      onClick={() => deleteBooking(b.bookingId)}
                      className="absolute top-3 right-3 p-1 bg-stone-900 hover:bg-stone-800 text-stone-500 hover:text-red-400 rounded transition"
                      title="Cancel Booking"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    
                    <div className="flex items-center gap-2 text-amber-500 font-mono text-[10px]">
                      <span className="font-bold">{b.bookingId}</span>
                      <span>•</span>
                      <span>ACTIVE</span>
                    </div>

                    <div className="space-y-1 font-sans">
                      <p className="font-bold text-stone-200 text-sm">{b.fullName}</p>
                      <p className="text-stone-400 flex items-center gap-1 leading-none"><MapPin className="h-3 w-3 inline text-amber-500" /> {b.location}</p>
                      <p className="text-stone-400 text-[11px] font-mono mt-1">Date slots: {b.date} at {b.time}</p>
                    </div>

                    <div className="pt-2 border-t border-stone-800/40 text-[11px] text-stone-500 font-mono">
                      <span>Dimensions: {b.dimensions || 'Customized'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-stone-950/40 border border-stone-800/50 p-4 rounded-xl text-[11px] leading-relaxed text-stone-500">
              <p className="font-semibold text-stone-400 flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500 inline" /> MHK Guarantee</p>
              <p className="mt-1">
                We strictly respect architectural parameters. Cancellations are free. Sétif CAD technicians call within 24 hours of form submission to authorize on-site structural visits.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
