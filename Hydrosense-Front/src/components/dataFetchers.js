export async function fetchTemperatureData() {
    const response = await fetch('http://52.205.230.122:3000/datas/?page=1&limit=10');
    const jsonData = await response.json();
    return jsonData.data.map(item => item.data.temperature);
  }
  
  export async function fetchScatterChartData() {
    const response = await fetch('http://52.205.230.122:3000/datas/?page=2&limit=500');
    const result = await response.json();
    return result.data.map(item => ({
      id: item.id_data,
      flowRate: item.data.flow_rate
    }));
  }
  