const getSearchId = async () => {
  const searchIdResponse = await fetch('https://aviasales-test-api.kata.academy/search')
  const searchIdObj = await searchIdResponse.json()
  const { searchId } = searchIdObj
  return searchId
}
export default getSearchId
