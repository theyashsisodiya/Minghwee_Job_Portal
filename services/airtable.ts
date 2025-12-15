
// Airtable Configuration

// Update these values according to your Airtable setup
export const AIRTABLE_CONFIG = {
  // Replace with your Airtable API key
  // Using optional chaining and fallback to prevent crashes if env is undefined
  apiKey: (import.meta as any).env?.VITE_AIRTABLE_API_KEY || process.env.VITE_AIRTABLE_API_KEY || '',
  
  // Replace with your Airtable base ID
  baseId: (import.meta as any).env?.VITE_AIRTABLE_BASE_ID || process.env.VITE_AIRTABLE_BASE_ID || '',
  
  // Table configurations - easily changeable
  tables: {
    clients: {
      name: 'Clients', 
      id: 'tblClients',
    },
    Users: {
      name: 'Users', 
      id: 'tblTy2RyoRqG9cOBb',
    }
  }
};

export default AIRTABLE_CONFIG;
