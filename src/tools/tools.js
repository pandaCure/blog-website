export const checkWebp = () => {
  return (
    document
      .createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0
  )
}

export const sortBy = (parent, child) => (a, b) => {
  return a[parent][child] < b[parent][child] ? 1 : a[parent][child] > b[parent][child] ? -1 : 0
}
export const formatJSONDate = jsonDate => {
  return new Date(+new Date(new Date(jsonDate).toJSON()) + 8 * 3600 * 1000).toISOString()
    .replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
