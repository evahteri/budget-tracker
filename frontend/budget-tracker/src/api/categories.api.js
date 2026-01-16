import axios from 'axios'

const baseUrl = '/api/categories'

export const getCategories = () => {
  return axios
    .get(baseUrl)
    .then(response => {
      const categories = response.data
      console.log('Fetched categories:', categories)
      return categories
    })
    .catch(function (error) {
      console.log(error);
    })
}

export const postCategory = (newCategory) => {
  console.log('Posting new category:', newCategory)
  return axios
    .post(baseUrl, newCategory)
    .then(response => {
      const responseData = response.data
      console.log('Created categories:', responseData)
      return responseData
    })
    .catch(function (error) {
      console.log(error);
    })
}
