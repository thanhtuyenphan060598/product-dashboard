export const useLoadProducts = () => {
  const loadProducts = async () => {
    //Mock data - fetch from data/products.json
    try {
      const response = await fetch('data/products.json')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  return { loadProducts }
}
