import { useState, useEffect } from 'react';
import { soilDataManager, type SoilSite, type SoilDataPoint } from './soil-apis';

export function useSoilData(blockId?: string, dateRange?: { start: string; end: string }) {
  const [sites, setSites] = useState<SoilSite[]>([]);
  const [data, setData] = useState<{ [siteId: string]: SoilDataPoint[] }>({});
  const [summary, setSummary] = useState({
    avgMoisture: 0,
    avgTemperature: 0,
    avgConductivity: 0,
    dataPoints: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSoilData() {
      try {
        setLoading(true);
        setError(null);

        if (blockId) {
          // Fetch data for specific block
          const blockData = await soilDataManager.getBlockSoilData(
            blockId,
            dateRange?.start,
            dateRange?.end
          );
          setSites(blockData.sites);
          setData(blockData.data);
          setSummary(blockData.summary);
        } else {
          // Fetch all sites
          const allSites = await soilDataManager.getAllSites();
          setSites(allSites);
          setData({});
          setSummary({
            avgMoisture: 0,
            avgTemperature: 0,
            avgConductivity: 0,
            dataPoints: 0,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch soil data');
      } finally {
        setLoading(false);
      }
    }

    fetchSoilData();
  }, [blockId, dateRange?.start, dateRange?.end]);

  const refreshData = async () => {
    if (blockId) {
      try {
        setLoading(true);
        const blockData = await soilDataManager.getBlockSoilData(
          blockId,
          dateRange?.start,
          dateRange?.end
        );
        setSites(blockData.sites);
        setData(blockData.data);
        setSummary(blockData.summary);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to refresh soil data');
      } finally {
        setLoading(false);
      }
    }
  };

  const getSiteData = (siteId: string): SoilDataPoint[] => {
    return data[siteId] || [];
  };

  const getLatestReading = (siteId: string): SoilDataPoint | null => {
    const siteData = getSiteData(siteId);
    if (siteData.length === 0) return null;
    
    return siteData.reduce((latest, current) => 
      new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
    );
  };

  const getProviderSites = (provider: 'soiltech' | 'agrology' | 'provider3') => {
    return sites.filter(site => site.provider === provider);
  };

  return {
    sites,
    data,
    summary,
    loading,
    error,
    refreshData,
    getSiteData,
    getLatestReading,
    getProviderSites,
  };
}

export function useAllSoilSites() {
  const [sites, setSites] = useState<SoilSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllSites() {
      try {
        setLoading(true);
        setError(null);
        const allSites = await soilDataManager.getAllSites();
        setSites(allSites);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch soil sites');
      } finally {
        setLoading(false);
      }
    }

    fetchAllSites();
  }, []);

  return {
    sites,
    loading,
    error,
    soilTechSites: sites.filter(s => s.provider === 'soiltech'),
    agrologySites: sites.filter(s => s.provider === 'agrology'),
  };
}