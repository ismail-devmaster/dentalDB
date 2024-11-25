// src/components/BookNew.tsx
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Add this interface before the component
interface BookNewProps {
  date: Date | undefined;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  selectedDoctor: string | null;
  setSelectedDoctor: (doctor: string | null) => void;
  selectedReason: string | null;
  setSelectedReason: (reason: string | null) => void;
  additionalNotes: string;
  setAdditionalNotes: (notes: string) => void;
  handleConfirmAppointment: () => void;
  handleCancelBooking: () => void;
  timeSlots: string[];
  reasons: string[];
  handleSelectDate: (date: Date) => void;
}

export default function BookNew({
  date,
  selectedTime,
  setSelectedTime,
  selectedDoctor,
  setSelectedDoctor,
  selectedReason,
  setSelectedReason,
  additionalNotes,
  setAdditionalNotes,
  handleConfirmAppointment,
  handleCancelBooking,
  timeSlots,
  reasons,
  handleSelectDate,
}: BookNewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl">Select Date and Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date: Date | undefined) => date && handleSelectDate(date)}
                fromDate={new Date()}
                className="rounded-md border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="h-12 border-gray-200 dark:border-gray-700"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select
              value={selectedDoctor || ""}
              onValueChange={setSelectedDoctor}
            >
              <SelectTrigger id="doctor">
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. Smith">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage
                        src="/placeholder.svg?height=24&width=24"
                        alt="Dr. Smith"
                      />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    Dr. Smith (Cardiology)
                  </div>
                </SelectItem>
                <SelectItem value="Dr. Johnson">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage
                        src="/placeholder.svg?height=24&width=24"
                        alt="Dr. Johnson"
                      />
                      <AvatarFallback>DJ</AvatarFallback>
                    </Avatar>
                    Dr. Johnson (Neurology)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Visit</Label>
            <Select
              value={selectedReason || ""}
              onValueChange={setSelectedReason}
            >
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="additional-notes">Additional Notes</Label>
            <Textarea
              id="additional-notes"
              placeholder="Any additional information for your visit"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="min-h-[100px] resize-none border-gray-200 dark:border-gray-700"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            className="border-gray-200 dark:border-gray-700"
            onClick={handleCancelBooking}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmAppointment}>
            Confirm Appointment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
