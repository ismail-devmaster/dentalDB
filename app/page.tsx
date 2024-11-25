import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, Stethoscope, HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            DentalDB
            <span className="text-blue-500">.</span>
          </h1>
          <p className="text-gray-400 text-xl">
            Advanced Dental Practice Management System
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Patient Portal */}
          <Link href="/patient">
            <Card className="group hover:scale-105 transition-all duration-300 bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 cursor-pointer backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserRound className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-white">
                  Patient Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400">
                  Access your medical records, appointments, and treatment plans
                </p>
                <div className="mt-4 text-blue-400 text-sm group-hover:text-blue-300">
                  Enter Portal →
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Doctor Portal */}
          <Link href="/doctor">
            <Card className="group hover:scale-105 transition-all duration-300 bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 cursor-pointer backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-white">
                  Doctor Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400">
                  Manage patient care, view schedules, and access clinical tools
                </p>
                <div className="mt-4 text-green-400 text-sm group-hover:text-green-300">
                  Enter Portal →
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Receptionist Portal */}
          <Link href="/receptionist">
            <Card className="group hover:scale-105 transition-all duration-300 bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 cursor-pointer backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartPulse className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-white">
                  Receptionist Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400">
                  Handle appointments, patient registration, and front desk operations
                </p>
                <div className="mt-4 text-purple-400 text-sm group-hover:text-purple-300">
                  Enter Portal →
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <footer className="text-center mt-16 text-gray-500">
          <p className="text-sm">
            © 2024 DentalDB. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
