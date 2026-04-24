# Great Crops Platform — MVP Spec

## Overview
Custom software platform for **Great Crops**, an agricultural consulting firm run by Tomas Aguayo (CCA-certified agronomist) based in Los Osos, CA. This is his "mainframe" — the operating system for his consulting practice.

## Brand
- **Company:** Great Crops
- **Tagline:** "From Good Crops to Great Crops"
- **Color palette:** Earth tones — deep green (#1B5E20), warm brown (#5D4037), golden wheat (#F9A825), cream (#FFF8E1), charcoal (#263238)
- **Vibe:** Professional, agricultural, modern but grounded. Not Silicon Valley — Central Coast farmer-tech.

## Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Routing:** React Router v6
- **State:** React hooks (keep it simple)
- **No backend needed for MVP** — use local state / mock data to demonstrate. We'll add Supabase later.

## Core Modules (Build ALL of these)

### 1. Dashboard (Home)
- Welcome card with summary stats
- Quick stats: Total clients, Active fields, Upcoming treatments, Recent lab results
- Activity feed showing recent events (field visits, lab results received, treatments applied)
- Season calendar showing upcoming treatment windows
- Weather widget placeholder (show mock data for SLO County)

### 2. Clients / Growers
- List of grower clients with search/filter
- Each client has: name, farm name, phone, email, location, total acreage, crops grown, contract status
- Client detail page showing their fields, treatment history, and upcoming schedule
- Mock data: 8-10 realistic Central Coast grower clients (avocado, almond, citrus, wine grapes)

### 3. Fields / Orchards
- Visual list of fields with crop type badges, acreage, health status indicator
- Field detail page with:
  - Field info (name, crop, acreage, planting year, rootstock variety)
  - Soil health score (0-100) with trend chart
  - Treatment timeline (visual Gantt-like chart showing the 6-material program across growth stages)
  - Lab results history (table with date, type, key metrics)
  - Photo gallery for field observations
  - Notes/observations log

### 4. Treatment Program
- The core IP — Great Crops' 6-material water-applied program
- Treatment schedule builder: define crop type → shows growth stages → assign materials to each stage
- Treatment calendar: see all scheduled treatments across all fields
- Treatment log: record when treatments were actually applied (date, field, materials, application rate, weather conditions, notes)
- Material inventory tracker (simple: material name, quantity on hand, reorder point)

### 5. Lab Results / Soil Analysis
- Upload/log lab results (mock the UI — date, lab name, field, result type)
- Result types: Soil composition, Tissue analysis, Microbiological assay, Water quality
- Dashboard showing key metrics over time per field:
  - Organic carbon levels
  - Microbial diversity index
  - pH, EC, macro/micro nutrients
  - Phytophthora pressure indicator
- Comparison view: before/after treatment program enrollment

### 6. Field Visits
- Log field visits: date, field, observations, photos (mock), weather, growth stage
- Visit checklist template (configurable per crop type)
- Quick-add from mobile-friendly interface
- Visit history timeline per field

### 7. Reports
- Grower ROI report: before/after yield comparison, cost savings, soil health improvement
- Season summary report per client
- Treatment compliance report (scheduled vs. actual)
- Export as PDF button (placeholder — just show the report UI)

### 8. Settings
- Profile (Tomas's info, CCA number, company details)
- Treatment program templates (the 6 materials, their descriptions, default application rates)
- Crop type configurations (growth stages per crop)
- Notification preferences (placeholder)

## Navigation
- Sidebar navigation, collapsible
- Top bar with search, notifications bell, user avatar
- Mobile-responsive (sidebar becomes hamburger menu)

## Mock Data Requirements
Create realistic mock data including:
- **Growers:** 8-10 clients (mix of avocado, almond, citrus, grape growers in SLO/Santa Barbara/Ventura counties)
- **Fields:** 15-20 fields across the clients
- **Treatments:** 2-3 months of scheduled and completed treatments
- **Lab Results:** Historical soil/tissue data showing improvement trends
- **Field Visits:** 10-15 recent visit logs with observations
- **Materials:** The 6 Great Crops proprietary materials (give them realistic names like "GC-Carbon Plus", "GC-MicroBio", "GC-RootShield", etc.)

## Design Notes
- Professional dashboard look — think Notion meets agricultural software
- Card-based layouts
- Status badges with color coding (green = healthy, yellow = attention, red = critical)
- Clean data tables with sort/filter
- Charts should tell a story (soil health improving over time)
- MUST look like a real, polished product — not a prototype
- Include the Great Crops logo area (use text logo with a leaf icon for now)

## What NOT to build
- No auth/login (demo mode)
- No real backend/API calls
- No real file upload (mock it)
- No real PDF export (show the UI)
- No real weather API (use mock data)

## File Structure
```
src/
  components/
    layout/          # Sidebar, TopBar, Layout wrapper
    dashboard/       # Dashboard widgets
    clients/         # Client list, client detail
    fields/          # Field list, field detail
    treatments/      # Treatment schedule, calendar, log
    lab-results/     # Lab result views, charts
    field-visits/    # Visit log, visit detail
    reports/         # Report templates
    settings/        # Settings pages
    ui/              # Shared UI components (Card, Badge, Button, Table, etc.)
  data/
    mock-data.ts     # All mock data in one place
  types/
    index.ts         # TypeScript interfaces
  lib/
    utils.ts         # Utility functions
  App.tsx
  main.tsx
```

## Priority
Build it ALL. This needs to be demo-ready by morning. The pitch is "This is what your practice looks like with software." Every screen should have real-feeling data and look polished.
