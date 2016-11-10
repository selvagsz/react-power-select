export const matcher = ({ option, searchTerm = '', searchIndices = [] }) => {
  searchTerm = searchTerm.trim().toLowerCase()
  if (searchIndices) {
    return searchIndices.some((index) => {
      return (option[index] || '').toLowerCase().indexOf(searchTerm) !== -1
    })
  }
  return option.indexOf(searchTerm) !== -1
}
