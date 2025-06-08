export const getDataByDNI = async (dni, apiKey) => {
  try {
    const url = `https://apiperu.dev/api/dni/${dni}?api_token=${apiKey}`;
    const response = await fetch(url);
    const { data, success, message: errorMessage } = await response.json();
    return { data, success, errorMessage };
  } catch (error) {
    return { error: true, message: error.message || "Error desconocido" };
  }
};
