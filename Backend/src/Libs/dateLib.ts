export const getCurrentDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0-11
    const year = today.getFullYear();
    
    return `${day}/${month}/${year}`;
  };