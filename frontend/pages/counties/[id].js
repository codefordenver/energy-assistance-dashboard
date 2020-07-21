import { useRouter } from 'next/router'

const County = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>County: {id}</p>
}

export default County