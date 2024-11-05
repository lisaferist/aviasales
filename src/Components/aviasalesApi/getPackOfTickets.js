const getPackOfTickets = async (searchId) => {
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  if (!response.ok && response.status !== 500) {
    throw new Error(`ошибка в fetch запросе, статус ${response.status}`)
  } else if (response.status === 500) {
    throw new Error('500 status')
  }
  const data = await response.json()
  return data
}
export default getPackOfTickets
