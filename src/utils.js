export const matcher = ({ option, searchTerm = '', searchIndices }) => {
  searchTerm = searchTerm.trim().toLowerCase()
  if (typeof option === 'string') {
    return option.toLowerCase().indexOf(searchTerm) !== -1
  }
  if (searchIndices) {
    return searchIndices.some((index) => {
      return (option[index] || '').toLowerCase().indexOf(searchTerm) !== -1
    })
  }
  return true
}
