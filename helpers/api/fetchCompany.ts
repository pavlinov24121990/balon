const fetchCompany = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/companies');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { fetchCompany }