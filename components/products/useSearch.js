import useSWR from 'swr'
const useSearch = ({ phrase }) => {
    const { data, error } = useSWR(`/api/products/search/${phrase}`)

    return {
      results: data.state ? data.results : [],
      loading: !error && !data,
      isError: error,
      msg: data.msg
    }
}
export default useSearch
