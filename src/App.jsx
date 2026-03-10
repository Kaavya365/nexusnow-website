import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Homepage from "./pages/Homepage";
import ComingSoon from "./pages/ComingSoon";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<ComingSoon page="About Us" desc="Our story, mission, values, and the global team behind NexusNow.ai." />} />
        <Route path="/why-choose-us" element={<ComingSoon page="Why Choose Us" desc="What sets NexusNow.ai apart — our credentials, our approach, and our results." />} />
        <Route path="/services" element={<ComingSoon page="Our Services" desc="The full suite of AI and enterprise technology services we deliver." />} />
        <Route path="/services/agentic-ai" element={<ComingSoon page="Agentic AI" desc="Deploy autonomous AI agents that act, decide, and deliver results without manual intervention." tag="New Service" />} />
        <Route path="/services/servicenow" element={<ComingSoon page="ServiceNow" desc="Premier ServiceNow implementation, optimisation, and managed services for the enterprise." tag="New Service" />} />
        <Route path="/services/sap" element={<ComingSoon page="SAP" desc="AI-augmented SAP implementation, S/4HANA migration, and BTP integration." tag="New Service" />} />
        <Route path="/services/cyber-security" element={<ComingSoon page="Cyber Security" desc="AI-powered cyber defence with proactive threat intelligence and zero trust architecture." tag="New Service" />} />
        <Route path="/services/cio-as-a-service" element={<ComingSoon page="CIO as a Service" desc="Fractional CIO leadership — strategic IT direction without the full-time overhead." tag="New Service" />} />
        <Route path="/services/advisory" element={<ComingSoon page="Advisory Services" desc="Navigate digital transformation and maximise the value of your technology investments." />} />
        <Route path="/services/ai-insights" element={<ComingSoon page="AI-Powered Insights" desc="AI-driven managed IT services for proactive decision-making and predictive operations." />} />
        <Route path="/services/value-accelerators" element={<ComingSoon page="Value Accelerators" desc="Unlock the full potential of ServiceNow Intelligence and reduce implementation risks." />} />
        <Route path="/services/workflow-automation" element={<ComingSoon page="Workflow Automation" desc="Automate outdated manual processes and eliminate spreadsheets with ServiceNow workflows." />} />
        <Route path="/services/managed-services" element={<ComingSoon page="Managed Services" desc="A dedicated team to manage and develop your ServiceNow platform at scale." />} />
        <Route path="/services/migration-implementation" element={<ComingSoon page="Migration & Implementation" desc="Seamless ServiceNow delivery — whether you're new, re-implementing, or building custom apps." />} />
        <Route path="/industries" element={<ComingSoon page="Industries" desc="Domain expertise across Banking, Insurance, Telecom, Manufacturing, and Retail." />} />
        <Route path="/industries/banking" element={<ComingSoon page="Banking" desc="AI-powered risk management, operations, and customer service transformation for banks." />} />
        <Route path="/industries/insurance" element={<ComingSoon page="Insurance" desc="Claims automation, intelligent underwriting, and AI-driven policy operations." />} />
        <Route path="/industries/telecom-media" element={<ComingSoon page="Telecom & Media" desc="Network operations, CX transformation, and AI ops for telecoms and media companies." />} />
        <Route path="/industries/manufacturing" element={<ComingSoon page="Manufacturing" desc="Smart factory, predictive maintenance, and supply chain AI for manufacturers." />} />
        <Route path="/industries/retail-supply-chain" element={<ComingSoon page="Retail & Supply Chain" desc="Demand forecasting, intelligent fulfilment, and AI-powered retail operations." />} />
        <Route path="/leaders" element={<ComingSoon page="Our Leaders" desc="Meet the executive team driving NexusNow.ai's global AI transformation mission." />} />
        <Route path="/learning" element={<ComingSoon page="Learning" desc="Resources, whitepapers, webinars, and insights from the NexusNow.ai team." />} />
        <Route path="/careers" element={<ComingSoon page="Careers" desc="Join a world-class AI and ServiceNow team working across Singapore, India, and Europe." />} />
        <Route path="/contact" element={<ComingSoon page="Contact Us" desc="Reach our teams in Singapore, Mumbai, Bengaluru, and Amsterdam." />} />
        <Route path="*" element={<ComingSoon page="Page Not Found" desc="This page doesn't exist — but we're building something great here." />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}