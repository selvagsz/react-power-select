export const matcher = ({ option, searchTerm = '', searchIndices }) => {
  searchTerm = searchTerm.trim().toLowerCase()
  if (typeof option === 'string') {
    return option.toLowerCase().indexOf(searchTerm) !== -1
  }
  if (searchIndices) {
    return makeArray(searchIndices).some((index) => {
      return (option[index] || '').toLowerCase().indexOf(searchTerm) !== -1
    })
  }
  return true
}

export const makeArray = (obj) => {
  if (obj === null || obj === undefined) { return []; }
  return Array.isArray(obj) ? obj : [obj];
}
