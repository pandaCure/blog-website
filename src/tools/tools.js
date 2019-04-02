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
