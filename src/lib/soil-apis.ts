// Soil Data API Integration for Great Crops Platform
// Integrates with SoilTech, Agrology, and the third soil data provider

export interface SoilAPIConfig {
  soilTech: {
    apiKey: string;
  };
  agrology: {
    accessToken: string;
    siteIds: string[];
  };
  // Third provider to be added when identified
}

export interface SoilDataPoint {
  timestamp: string;
  moisture: number;
  temperature: number;
  conductivity: number;
  ph?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
}

export interface SoilSite {
  id: string;
  name: string;
  blockId: string;
  latitude: number;
  longitude: number;
  provider: 'soiltech' | 'agrology' | 'provider3';
  status: 'active' | 'inactive' | 'offline';
  lastReading?: string;
}

// SoilTech API Integration
export class SoilTechAPI {
  private apiKey: string;
  private baseUrl = 'https://api.soiltech.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getSites(): Promise<SoilSite[]> {
    try {
      const response = await fetch(`${this.baseUrl}/sites`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`SoilTech API error: ${response.status}`);
      }

      const data = await response.json();
      return data.sites.map((site: any) => ({
        id: site.id,
        name: site.name,
        blockId: site.field_id || site.block_id || 'unknown',
        latitude: site.latitude,
        longitude: site.longitude,
        provider: 'soiltech',
        status: site.status === 'online' ? 'active' : 'offline',
        lastReading: site.last_reading_time,
      }));
    } catch (error) {
      console.error('SoilTech API Error:', error);
      return [];
    }
  }

  async getSiteData(siteId: string, startDate?: string, endDate?: string): Promise<SoilDataPoint[]> {
    try {
      const url = new URL(`${this.baseUrl}/sites/${siteId}/data`);
      if (startDate) url.searchParams.append('start_date', startDate);
      if (endDate) url.searchParams.append('end_date', endDate);

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`SoilTech API error: ${response.status}`);
      }

      const data = await response.json();
      return data.readings.map((reading: any) => ({
        timestamp: reading.timestamp,
        moisture: reading.soil_moisture_percent,
        temperature: reading.soil_temperature_celsius,
        conductivity: reading.electrical_conductivity,
        ph: reading.ph,
        nitrogen: reading.nitrogen_ppm,
        phosphorus: reading.phosphorus_ppm,
        potassium: reading.potassium_ppm,
      }));
    } catch (error) {
      console.error('SoilTech Data Error:', error);
      return [];
    }
  }
}

// Agrology API Integration
export class AgrologyAPI {
  private accessToken: string;
  private baseUrl = 'https://api.agrology.ag/v1';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getSites(siteIds: string[]): Promise<SoilSite[]> {
    try {
      const sites: SoilSite[] = [];
      
      for (const siteId of siteIds) {
        const response = await fetch(`${this.baseUrl}/sites/${siteId}`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          sites.push({
            id: data.site.id,
            name: data.site.name || `Site ${siteId}`,
            blockId: data.site.field_reference || 'unknown',
            latitude: data.site.location.latitude,
            longitude: data.site.location.longitude,
            provider: 'agrology',
            status: data.site.is_active ? 'active' : 'inactive',
            lastReading: data.site.last_measurement_time,
          });
        }
      }

      return sites;
    } catch (error) {
      console.error('Agrology API Error:', error);
      return [];
    }
  }

  async getSiteData(siteId: string, startDate?: string, endDate?: string): Promise<SoilDataPoint[]> {
    try {
      const url = new URL(`${this.baseUrl}/sites/${siteId}/measurements`);
      if (startDate) url.searchParams.append('start_time', startDate);
      if (endDate) url.searchParams.append('end_time', endDate);

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Agrology API error: ${response.status}`);
      }

      const data = await response.json();
      return data.measurements.map((measurement: any) => ({
        timestamp: measurement.timestamp,
        moisture: measurement.volumetric_water_content_percent,
        temperature: measurement.soil_temperature_celsius,
        conductivity: measurement.electrical_conductivity_ms_cm,
        ph: measurement.soil_ph,
        nitrogen: measurement.nitrate_nitrogen_ppm,
        phosphorus: measurement.available_phosphorus_ppm,
        potassium: measurement.exchangeable_potassium_ppm,
      }));
    } catch (error) {
      console.error('Agrology Data Error:', error);
      return [];
    }
  }
}

// Unified Soil Data Manager
export class SoilDataManager {
  private soilTech: SoilTechAPI;
  private agrology: AgrologyAPI;

  constructor(config: SoilAPIConfig) {
    this.soilTech = new SoilTechAPI(config.soilTech.apiKey);
    this.agrology = new AgrologyAPI(config.agrology.accessToken);
  }

  async getAllSites(): Promise<SoilSite[]> {
    try {
      const [soilTechSites, agrologySites] = await Promise.all([
        this.soilTech.getSites(),
        this.agrology.getSites([]), // Will be populated with actual site IDs
      ]);

      return [...soilTechSites, ...agrologySites];
    } catch (error) {
      console.error('Error fetching all sites:', error);
      return [];
    }
  }

  async getSiteData(site: SoilSite, startDate?: string, endDate?: string): Promise<SoilDataPoint[]> {
    try {
      switch (site.provider) {
        case 'soiltech':
          return await this.soilTech.getSiteData(site.id, startDate, endDate);
        case 'agrology':
          return await this.agrology.getSiteData(site.id, startDate, endDate);
        default:
          console.warn(`Unknown provider: ${site.provider}`);
          return [];
      }
    } catch (error) {
      console.error(`Error fetching data for site ${site.id}:`, error);
      return [];
    }
  }

  // Get aggregated data for a specific block
  async getBlockSoilData(blockId: string, startDate?: string, endDate?: string): Promise<{
    sites: SoilSite[];
    data: { [siteId: string]: SoilDataPoint[] };
    summary: {
      avgMoisture: number;
      avgTemperature: number;
      avgConductivity: number;
      dataPoints: number;
    };
  }> {
    const allSites = await this.getAllSites();
    const blockSites = allSites.filter(site => site.blockId === blockId);
    
    const data: { [siteId: string]: SoilDataPoint[] } = {};
    let totalMoisture = 0;
    let totalTemp = 0;
    let totalCond = 0;
    let totalPoints = 0;

    for (const site of blockSites) {
      const siteData = await this.getSiteData(site, startDate, endDate);
      data[site.id] = siteData;

      // Calculate averages
      for (const point of siteData) {
        totalMoisture += point.moisture;
        totalTemp += point.temperature;
        totalCond += point.conductivity;
        totalPoints++;
      }
    }

    return {
      sites: blockSites,
      data,
      summary: {
        avgMoisture: totalPoints > 0 ? totalMoisture / totalPoints : 0,
        avgTemperature: totalPoints > 0 ? totalTemp / totalPoints : 0,
        avgConductivity: totalPoints > 0 ? totalCond / totalPoints : 0,
        dataPoints: totalPoints,
      },
    };
  }
}

// Default configuration - will be overridden by environment variables
export const defaultSoilConfig: SoilAPIConfig = {
  soilTech: {
    apiKey: (import.meta.env?.VITE_SOILTECH_API_KEY as string) || 'cjmli10dTKQjaJPFlnHSadL0edYB4v7SI6I0KbocsJ23sdkoPm4mIRAybOrUL5zx',
  },
  agrology: {
    accessToken: (import.meta.env?.VITE_AGROLOGY_TOKEN as string) || 'eyJraWQiOiI4WUFSNGNtYm1SSmhna0Q4em50b0FLU0RsZEVNWEM5NWF2YnByVTNLeWlJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyODIzMTY0My04MmRjLTRlOTktYTBjYS1kOGE5NTYyYjczZjMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfcUJtdlNmeU5LIiwiY29nbml0bzp1c2VybmFtZSI6IjI4MjMxNjQzLTgyZGMtNGU5OS1hMGNhLWQ4YTk1NjJiNzNmMyIsIm9yaWdpbl9qdGkiOiJiYzQzODkwZi1kNmVhLTQwZDMtYTM3MC0wMzk0ZmZjMjg2MGUiLCJhdWQiOiJqZmx0b3E4N2liZHNya3I0Ym05YWs5cHByIiwiZXZlbnRfaWQiOiI3YTI1M2EyMS1lNzQzLTRjNjctODU4Yy02ZGMyNTU5ZTY4ZmMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTc3NzQ5NDA0NCwiZXhwIjoxNzc4NjE3ODM3LCJpYXQiOjE3Nzg2MTQyMzcsImp0aSI6IjIwZmYyYjMzLTQwZDMtNDUzZC04MmQ0LTcwMmEzNjQyNzQ4NSIsImVtYWlsIjoiYWd1YXlvc290YUBnbWFpbC5jb20ifQ.gKxu51YsaAkYLjrOqwHkAmQD9nl6i8mQs8mZRds5wulaK3oWRkkB6ZNCLkag16rbIR8zl5qPFuGQulB8DsaxwNz0sZfPH_JwjRID4w8MMTEm4iLmcJTl94m6oz5uC4Wew2R0Kq-mTvSP7ufCy4ddkCQ67r0KBeJVdR5dHnxPGJk2L36eBP_Kt3mOe0QCUvW58a-MyRwWs6XMDtQd6zHee0tzlXAmiyu0WdAiGp-XVsUitxel30ovwGB0PJdpEpAfoY9AwZj9dqa9ZXwOTsHagHWbLv5nadYso7iUHKSGTvB99Rr-ADlUo3joUk0QGxSPY-9b4E0RfqXVXcCl1Q-CgQ',
    siteIds: ['40907', '40868', '40867', '40906', '40902', '40903'],
  },
};

// Initialize the soil data manager
export const soilDataManager = new SoilDataManager(defaultSoilConfig);