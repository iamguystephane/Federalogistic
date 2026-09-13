import React, { useEffect } from "react"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { HomePage } from "./pages/HomePage"
import { AboutPage } from "./pages/AboutPage"
import { ContactPage } from "./pages/ContactPage"
import { TrackOrderPage } from "./pages/TrackOrderPage"
import { TrackingResultPage } from "./pages/TrackingResultPage"
import { PrintReceiptPage } from "./pages/PrintReceiptPage"
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage"
import { TermsOfServicePage } from "./pages/TermsOfServicePage"
import { ShippingPolicyPage } from "./pages/ShippingPolicyPage"
import { PaymentPage } from "./pages/PaymentPage"
import { PaymentConfirmPage } from "./pages/PaymentConfirmPage"
import { ServicesPage } from "./pages/ServicesPage"
import { SeaFreightPage } from "./pages/SeaFreightPage"
import { RoadTransportPage } from "./pages/RoadTransportPage"
import { AirFreightPage } from "./pages/AirFreightPage"
import { WarehousingPage } from "./pages/WarehousingPage"
import { PackagingPage } from "./pages/PackagingPage"
import { DiplomaticServicesPage } from "./pages/DiplomaticServicesPage"
import { AdminPage } from "./pages/AdminPage"
import { ResetPasswordPage } from "./pages/ResetPasswordPage"
import "./App.css"
import LoginPage from "./pages/Login"

const routes: Record<string, React.ReactElement> = {
  "/": <HomePage />,
  "/about": <AboutPage />,
  "/contact": <ContactPage />,
  "/services": <ServicesPage />,
  "/services/sea-freight": <SeaFreightPage />,
  "/services/road": <RoadTransportPage />,
  "/services/air-freight": <AirFreightPage />,
  "/services/warehousing": <WarehousingPage />,
  "/services/packaging": <PackagingPage />,
  "/services/diplomatic": <DiplomaticServicesPage />,
  "/track-order": <TrackOrderPage />,
  "/trackingresult": <TrackingResultPage />,
  "/privacy-policy": <PrivacyPolicyPage />,
  "/terms-of-service": <TermsOfServicePage />,
  "/shipping-policy": <ShippingPolicyPage />,
  "/deposits": <PaymentPage />,
  "/payment": <PaymentConfirmPage />,
  "/login": <LoginPage />,
  "/reset-password": <ResetPasswordPage />,
}

const pageTitles: Record<string, string> = {
  "/":                        "Federalogistic – Global Shipping & Logistics",
  "/about":                   "About Us | Federalogistic",
  "/contact":                 "Contact Us | Federalogistic",
  "/services":                "Our Services | Federalogistic",
  "/services/sea-freight":    "Sea & Ocean Freight | Federalogistic",
  "/services/road":           "Road Transportation | Federalogistic",
  "/services/air-freight":    "Air Freight | Federalogistic",
  "/services/warehousing":    "Warehousing | Federalogistic",
  "/services/packaging":      "Packaging & Storage | Federalogistic",
  "/services/diplomatic":     "Diplomatic Services | Federalogistic",
  "/track-order":             "Track Your Shipment | Federalogistic",
  "/trackingresult":          "Tracking Result | Federalogistic",
  "/deposits":                "Payment | Federalogistic",
  "/privacy-policy":          "Privacy Policy | Federalogistic",
  "/terms-of-service":        "Terms of Service | Federalogistic",
  "/shipping-policy":         "Shipping Policy | Federalogistic",
  "/login":                   "Admin Login | Federalogistic",
  "/reset-password":          "Reset Password | Federalogistic",
}

function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/"

  useEffect(() => {
    const title = pageTitles[path]
    if (title) document.title = title
    else if (path.startsWith("/admin/")) document.title = "Admin Panel | Federalogistic"
  }, [path])

  // Pages with their own full-screen layout (no nav/footer)
  if (path === "/printnow") return <PrintReceiptPage />
  if (path === "/login") return <LoginPage />
  if (path === "/reset-password") return <ResetPasswordPage />
  if (path === "/admin" || path.startsWith("/admin/")) return <AdminPage />

  const page = routes[path] ?? <HomePage />

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header />
      <main>{page}</main>
      <Footer />
    </div>
  )
}

export default App
