import axios from './axios'

export const getAnalytics =() => {
  return axios.get('/analytics')
}
export const getPaymentsRequest = (startDate: string, endDate: string) => {
  return axios.post('/analytics/payments', {startDate, endDate})
}