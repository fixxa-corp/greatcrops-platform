import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './lib/auth';

// Platform (admin)
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { ClientsPage } from './components/clients/ClientsPage';
import { ClientDetailPage } from './components/clients/ClientDetailPage';
import { FieldsPage } from './components/fields/FieldsPage';
import { FieldDetailPage } from './components/fields/FieldDetailPage';
import { TreatmentsPage } from './components/treatments/TreatmentsPage';
import { LabResultsPage } from './components/lab-results/LabResultsPage';
import { FieldVisitsPage } from './components/field-visits/FieldVisitsPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { AgSpyPage } from './components/agspy/AgSpyPage';

// New hierarchical components
import { RanchesPage } from './components/ranches/RanchesPage';
import { RanchDetailPage } from './components/ranches/RanchDetailPage';
import { BlocksPage } from './components/blocks/BlocksPage';
import { BlockDetailPage } from './components/blocks/BlockDetailPage';
import { SoilMicrobiologyPage } from './components/soil-microbiology/SoilMicrobiologyPage';
import { SoilMicrobiologyDetailPage } from './components/soil-microbiology/SoilMicrobiologyDetailPage';
import { RemoteSensingPage } from './components/remote-sensing/RemoteSensingPage';
import { RemoteSensingDetailPage } from './components/remote-sensing/RemoteSensingDetailPage';
import { SoilChemistryPage } from './components/soil-chemistry/SoilChemistryPage';
import { WaterChemistryPage } from './components/water-chemistry/WaterChemistryPage';
import { DataImportPage } from './components/data-import/DataImportPage';
import { SoilMonitoringDashboard } from './components/soil-monitoring/SoilMonitoringDashboard';

// Public website
import { WebsiteLayout } from './components/website/WebsiteLayout';
import { HomePage } from './components/website/HomePage';
import { AboutPage } from './components/website/AboutPage';
import { ServicesPage } from './components/website/ServicesPage';
import { ResearchPage } from './components/website/ResearchPage';
import { ContactPage } from './components/website/ContactPage';

// Auth
import { AdminLoginPage } from './components/auth/AdminLoginPage';
import { ClientLoginPage } from './components/auth/ClientLoginPage';

// Client portal
import { ClientLayout } from './components/client-portal/ClientLayout';
import { ClientDashboard } from './components/client-portal/ClientDashboard';
import { ClientFields } from './components/client-portal/ClientFields';
import { ClientTreatments } from './components/client-portal/ClientTreatments';
import { ClientLabResults } from './components/client-portal/ClientLabResults';
import { ClientVisits } from './components/client-portal/ClientVisits';
import { ClientReports } from './components/client-portal/ClientReports';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public website */}
          <Route element={<WebsiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/programs" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Auth pages */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/portal" element={<ClientLoginPage />} />

          {/* Admin platform (protected) */}
          <Route
            path="/app"
            element={
              <ProtectedRoute role="admin">
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />

            {/* Hierarchical structure */}
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/:id" element={<ClientDetailPage />} />
            <Route path="ranches" element={<RanchesPage />} />
            <Route path="ranches/:id" element={<RanchDetailPage />} />
            <Route path="blocks" element={<BlocksPage />} />
            <Route path="blocks/:id" element={<BlockDetailPage />} />

            {/* Great Crops services */}
            <Route path="soil-microbiology" element={<SoilMicrobiologyPage />} />
            <Route path="soil-microbiology/:id" element={<SoilMicrobiologyDetailPage />} />
            <Route path="remote-sensing" element={<RemoteSensingPage />} />
            <Route path="remote-sensing/:id" element={<RemoteSensingDetailPage />} />
            <Route path="soil-chemistry" element={<SoilChemistryPage />} />
            <Route path="water-chemistry" element={<WaterChemistryPage />} />
            <Route path="soil-monitoring" element={<SoilMonitoringDashboard />} />
            <Route path="data-import" element={<DataImportPage />} />

            {/* Legacy routes */}
            <Route path="fields" element={<FieldsPage />} />
            <Route path="fields/:id" element={<FieldDetailPage />} />
            <Route path="treatments" element={<TreatmentsPage />} />
            <Route path="lab-results" element={<LabResultsPage />} />
            <Route path="agspy" element={<AgSpyPage />} />
            <Route path="field-visits" element={<FieldVisitsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Client portal (protected) */}
          <Route
            path="/client"
            element={
              <ProtectedRoute role="client">
                <ClientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="fields" element={<ClientFields />} />
            <Route path="treatments" element={<ClientTreatments />} />
            <Route path="lab-results" element={<ClientLabResults />} />
            <Route path="visits" element={<ClientVisits />} />
            <Route path="reports" element={<ClientReports />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
