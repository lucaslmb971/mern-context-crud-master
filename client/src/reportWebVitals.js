// Define la función reportWebVitals que recibe una función onPerfEntry como parámetro
const reportWebVitals = onPerfEntry => {
  // Verifica si onPerfEntry está definido y es una función
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Importa las funciones individuales de web-vitals utilizando import dinámico
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Llama cada función importada con onPerfEntry como argumento
      getCLS(onPerfEntry); // Cumulative Layout Shift (CLS)
      getFID(onPerfEntry); // First Input Delay (FID)
      getFCP(onPerfEntry); // First Contentful Paint (FCP)
      getLCP(onPerfEntry); // Largest Contentful Paint (LCP)
      getTTFB(onPerfEntry); // Time to First Byte (TTFB)
    });
  }
};

// Exporta la función reportWebVitals como valor predeterminado
export default reportWebVitals;
