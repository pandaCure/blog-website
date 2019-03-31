export const checkWebp = () => {
  return (
    document
      .createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0
  )
}
