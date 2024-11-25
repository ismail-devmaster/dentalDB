// src/components/MainFile.tsx
"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import BookNew from "./bookNew";
import Waiting from "./waiting";
import Upcoming from "./upcoming";
import History from "./history";
import Reminders from "./reminders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Appointment {
  id: number;
  date: string;
  time: string | null;
  doctor: string | null;
  reason: string | null;
  outcome?: string;
  notes?: string;
}

export default function MainFile() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      date: "June 15, 2023",
      time: "2:00 PM",
      doctor: "Dr. Smith",
      reason: "Cardiology Checkup",
    },
    {
      id: 2,
      date: "June 16, 2023",
      time: "3:00 PM",
      doctor: "Dr. Johnson",
      reason: "Follow-up Appointment",
    },
    {
      id: 3,
      date: "June 17, 2023",
      time: "10:00 AM",
      doctor: "Dr. Davis",
      reason: "Annual Physical",
    },
  ]);
  const [waitingAppointments, setWaitingAppointments] = useState<Appointment[]>([]);
  const [appointmentToReschedule, setAppointmentToReschedule] = useState<Appointment | null>(null);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [appointmentHistory, setAppointmentHistory] = useState([
    {
      id: 1,
      date: "May 20, 2023",
      time: "2:00 PM",
      doctor: "Dr. Smith",
      reason: "Cardiology Checkup",
      outcome: "Completed",
      notes: "Patient reported improved symptoms. Follow-up in 3 months.",
    },
    {
      id: 2,
      date: "May 15, 2023",
      time: "11:00 AM",
      doctor: "Dr. Johnson",
      reason: "Annual Physical",
      outcome: "Completed",
      notes: "All vitals normal. Recommended increased physical activity.",
    },
    {
      id: 3,
      date: "May 10, 2023",
      time: "3:30 PM",
      doctor: "Dr. Davis",
      reason: "Vaccination",
      outcome: "Completed",
      notes: "Administered flu vaccine. No adverse reactions observed.",
    },
    {
      id: 4,
      date: "May 5, 2023",
      time: "10:00 AM",
      doctor: "Dr. Wilson",
      reason: "Dermatology Consult",
      outcome: "Completed",
      notes: "Prescribed topical treatment for eczema. Follow-up in 2 weeks.",
    },
    {
      id: 5,
      date: "May 1, 2023",
      time: "1:00 PM",
      doctor: "Dr. Brown",
      reason: "Orthopedic Evaluation",
      outcome: "Completed",
      notes: "X-rays taken of left knee. Recommended physical therapy.",
    },
  ]);
  const [selectedAppointmentDetails, setSelectedAppointmentDetails] = 
    useState<Appointment | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("book-new");

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const reasons = [
    "General Checkup",
    "Follow-up Appointment",
    "Vaccination",
    "Lab Results Review",
    "Prescription Refill",
    "Other (please specify)",
  ];

  const handleConfirmAppointment = () => {
    const newAppointment = {
      id: Date.now(),
      date: date ? format(date, "MMMM d, yyyy") : format(new Date(), "MMMM d, yyyy"),
      time: selectedTime,
      doctor: selectedDoctor,
      reason: selectedReason,
    };

    setWaitingAppointments((prevAppointments) => [
      ...prevAppointments,
      newAppointment,
    ]);

    toast({
      title: "Appointment Confirmed",
      description: `Your appointment is scheduled for ${
        date ? format(date, "MMMM d, yyyy") : format(new Date(), "MMMM d, yyyy")
      } at ${selectedTime}`,
    });

    // Reset form
    setDate(new Date());
    setSelectedTime(null);
    setSelectedDoctor(null);
    setSelectedReason(null);
    setAdditionalNotes("");

    // Switch to the Waiting tab
    setActiveTab("waiting");
  };

  const handleCancelBooking = () => {
    // Reset form
    setDate(new Date());
    setSelectedTime(null);
    setSelectedDoctor(null);
    setSelectedReason(null);
    setAdditionalNotes("");

    toast({
      title: "Booking Cancelled",
      description: "Your appointment booking has been cancelled.",
    });
  };

  const handleReschedule = (appointment: Appointment) => {
    setAppointmentToReschedule(appointment);
    setIsRescheduleDialogOpen(true);
  };

  const handleConfirmReschedule = () => {
    if (!date || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select a new date and time.",
        variant: "destructive",
      });
      return;
    }

    const updatedAppointment = {
      ...appointmentToReschedule,
      date: format(date, "MMMM d, yyyy"),
      time: selectedTime,
    } as Appointment;

    // Remove the appointment from upcomingAppointments
    setUpcomingAppointments((appointments) =>
      appointments.filter((apt) => apt.id !== appointmentToReschedule?.id)
    );

    // Add the updated appointment to waitingAppointments
    setWaitingAppointments((appointments) => [
      ...appointments,
      updatedAppointment,
    ]);

    toast({
      title: "Appointment Rescheduled",
      description: `Your appointment has been rescheduled to ${format(
        date,
        "MMMM d, yyyy"
      )} at ${selectedTime}`,
    });

    setIsRescheduleDialogOpen(false);
    setAppointmentToReschedule(null);
    setDate(new Date());
    setSelectedTime(null);
    setActiveTab("waiting");
  };

  const handleCancel = (appointmentId: number) => {
    setUpcomingAppointments((appointments) =>
      appointments.filter((apt) => apt.id !== appointmentId)
    );
    setWaitingAppointments((appointments) =>
      appointments.filter((apt) => apt.id !== appointmentId)
    );

    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointmentDetails(appointment);
    setIsDetailsDialogOpen(true);
  };

  const today = new Date();

  const disabledDates = ["2024-11-25", "2024-12-31"];

  // Function to handle date selection, with disabled dates check
  const handleSelectDate = (selectedDate: Date) => {
    const isDisabled = disabledDates.some(
      (disabledDate) =>
        new Date(disabledDate).toDateString() === selectedDate.toDateString()
    );
    if (!isDisabled) {
      setDate(selectedDate);
    }
  };

  const updateAppointmentHistory = (appointment: Appointment) => {
    if (appointment.time) {
      const historyEntry = {
        id: appointment.id,
        date: appointment.date,
        time: appointment.time as string,
        doctor: appointment.doctor || '',
        reason: appointment.reason || '',
        outcome: 'Completed',
        notes: appointment.notes || ''
      };
      setAppointmentHistory(prev => [...prev, historyEntry]);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <main>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
          Appointments
        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <TabsTrigger
              value="book-new"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Book New
            </TabsTrigger>
            <TabsTrigger
              value="waiting"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Waiting
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="reminders"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Reminders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="book-new">
            <BookNew
              date={date}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedDoctor={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
              selectedReason={selectedReason}
              setSelectedReason={setSelectedReason}
              additionalNotes={additionalNotes}
              setAdditionalNotes={setAdditionalNotes}
              handleConfirmAppointment={handleConfirmAppointment}
              handleCancelBooking={handleCancelBooking}
              timeSlots={timeSlots}
              reasons={reasons}
              handleSelectDate={handleSelectDate}
            />
          </TabsContent>

          <TabsContent value="waiting">
            <Waiting
              waitingAppointments={waitingAppointments}
              handleReschedule={handleReschedule}
              handleCancel={handleCancel}
            />
          </TabsContent>

          <TabsContent value="upcoming">
            <Upcoming
              upcomingAppointments={upcomingAppointments}
              handleReschedule={handleReschedule}
              handleCancel={handleCancel}
            />
          </TabsContent>

          <TabsContent value="history">
            <History
              appointmentHistory={appointmentHistory}
              handleViewDetails={handleViewDetails}
            />
          </TabsContent>

          <TabsContent value="reminders">
            <Reminders />
          </TabsContent>
        </Tabs>
      </main>

      <Dialog
        open={isRescheduleDialogOpen}
        onOpenChange={setIsRescheduleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Please select a new date and time for your appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate: Date | undefined) => newDate && setDate(newDate)}
                  fromDate={today}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Time
              </Label>
              <Select
                value={selectedTime || ""}
                onValueChange={setSelectedTime}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRescheduleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmReschedule}>
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointmentDetails && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Date:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.date}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Time:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.time}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Doctor:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.doctor}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Reason:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.reason}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Outcome:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.outcome}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-bold">Notes:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.notes}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
