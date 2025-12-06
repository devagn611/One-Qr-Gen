/**
 * Parse flat query parameters into nested objects
 * Example: { 'dotsOptions.color': '#ff0000', 'width': '300' }
 * Becomes: { dotsOptions: { color: '#ff0000' }, width: '300' }
 */
export function parseNestedQuery(query) {
  const result = {};
  
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '') {
      continue;
    }
    
    // Handle nested keys like 'dotsOptions.color'
    if (key.includes('.')) {
      const keys = key.split('.');
      let current = result;
      
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!current[k]) {
          current[k] = {};
        }
        current = current[k];
      }
      
      const lastKey = keys[keys.length - 1];
      current[lastKey] = parseValue(value);
    } else {
      result[key] = parseValue(value);
    }
  }
  
  return result;
}

/**
 * Parse string values to appropriate types
 */
function parseValue(value) {
  if (typeof value !== 'string') {
    return value;
  }
  
  // Try to parse as number
  if (/^-?\d+$/.test(value)) {
    return parseInt(value, 10);
  }
  
  // Try to parse as float
  if (/^-?\d*\.\d+$/.test(value)) {
    return parseFloat(value);
  }
  
  // Parse boolean strings
  if (value.toLowerCase() === 'true') {
    return true;
  }
  if (value.toLowerCase() === 'false') {
    return false;
  }
  
  // Return as string
  return value;
}

