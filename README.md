# Great Crops Platform

A comprehensive agricultural management platform built for Great Crops, integrating soil monitoring data from multiple providers including SoilTech and Agrology.

## Overview

The Great Crops Platform is the "mainframe" operating system for Tomas Aguayo's agricultural consulting practice. It provides a unified interface for managing clients, ranches, blocks, and comprehensive soil health monitoring.

## Features

### 🌾 Core Management
- **Client Management**: Track grower clients across Central Coast California
- **Ranch & Block Organization**: Hierarchical structure for agricultural properties
- **Treatment Programs**: Great Crops' proprietary 6-material water-applied program

### 🔬 Soil Science Integration
- **Live Soil Data**: Real-time integration with SoilTech and Agrology APIs
- **Microbiology Reports**: Biome Makers metagenomic soil analysis
- **Soil Chemistry**: Lab results tracking and trends
- **Remote Sensing**: Multi-provider soil sensor monitoring

### 📊 Analytics & Reporting
- **Soil Health Scoring**: Comprehensive soil health assessment
- **Pathogen Detection**: Early warning system for soil-borne diseases
- **Treatment Compliance**: Track program adherence and outcomes
- **ROI Reports**: Before/after analysis for growers

## Live Soil Data Integration

The platform integrates with multiple soil monitoring providers:

### SoilTech API
- Real-time soil moisture, temperature, and conductivity data
- Automated sensor status monitoring
- Historical data analysis

### Agrology API
- Advanced soil metrics including pH and nutrient levels
- Multi-depth sensor readings
- Predictive analytics integration

### Site IDs Currently Monitored
- Site 40907, 40868, 40867, 40906, 40902, 40903

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router v6
- **State Management**: React hooks + custom data layer
- **API Integration**: Fetch-based with TypeScript interfaces

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/greatcrops-platform.git
cd greatcrops-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your API credentials:
```env
REACT_APP_SOILTECH_API_KEY=your_soiltech_api_key_here
REACT_APP_AGROLOGY_TOKEN=your_agrology_access_token_here
REACT_APP_USE_MOCK_SOIL_DATA=false
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Mode

To run with mock data instead of live APIs:
```env
REACT_APP_USE_MOCK_SOIL_DATA=true
```

## Project Structure

```
src/
├── components/
│   ├── blocks/              # Block management and soil data panels
│   ├── clients/             # Client management
│   ├── ranches/             # Ranch management
│   ├── soil-monitoring/     # Soil monitoring dashboard
│   ├── soil-microbiology/   # Microbiology reports
│   ├── layout/              # App layout and navigation
│   └── ui/                  # Reusable UI components
├── data/                    # Mock data and processed datasets
├── lib/                     # Utilities and API integrations
├── types/                   # TypeScript type definitions
└── App.tsx                  # Main app component
```

## API Integration

### SoilTech Integration
```typescript
import { SoilTechAPI } from './lib/soil-apis';

const soilTech = new SoilTechAPI(apiKey);
const sites = await soilTech.getSites();
const data = await soilTech.getSiteData(siteId);
```

### Agrology Integration
```typescript
import { AgrologyAPI } from './lib/soil-apis';

const agrology = new AgrologyAPI(accessToken);
const sites = await agrology.getSites(['40907', '40868']);
const data = await agrology.getSiteData(siteId);
```

### React Hook Usage
```typescript
import { useSoilData } from './lib/useSoilData';

function BlockDetail({ blockId }) {
  const { sites, data, loading, error } = useSoilData(blockId);
  // Component logic here
}
```

## Deployment

The platform is deployed to Vercel:

1. Build the project:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
npx vercel --prod
```

Live URL: [https://greatcrops-platform.vercel.app/](https://greatcrops-platform.vercel.app/)

## Brand & Design

- **Color Palette**: Earth tones (deep green #1B5E20, warm brown #5D4037, golden wheat #F9A825)
- **Typography**: Professional, agricultural aesthetic
- **Layout**: Dashboard-style with card-based components
- **Icons**: Lucide React for consistent iconography

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_SOILTECH_API_KEY` | SoilTech API authentication key | Yes |
| `REACT_APP_AGROLOGY_TOKEN` | Agrology access token | Yes |
| `REACT_APP_USE_MOCK_SOIL_DATA` | Use mock data instead of live APIs | No |

## License

This project is proprietary software developed for Great Crops agricultural consulting.

## Contact

- **Company**: Great Crops
- **Location**: Los Osos, CA
- **Tagline**: "From Good Crops to Great Crops"

---

Built with ❤️ for sustainable agriculture in Central Coast California.