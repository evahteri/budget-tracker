import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getCategories, postCategory } from '../api/categories.api'

export function useCategories() {
  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  const { data: categoriesData = [], isLoading, error } = categoryQuery

  const [categories, setCategories] = useState([])

  useEffect(() => {
    setCategories(categoriesData)
  }, [categoriesData])

  const addCategory = async (event) => {
    event.preventDefault()

    const newCategory = {
      description: event.target[0].value,
      title: event.target[1].value,
    }

    const responseData = await postCategory(newCategory)
    newCategory.id = responseData.id

    setCategories((prev) => [...prev, newCategory])
  }


  return {
    categories,
    isLoading,
    error,
    addCategory,
  }
}
