import { useRouter } from 'next/router'
import NextTemplateLandingPage from '../../components/templates/NextTemplateLandingPage'
import { items } from '../../data'

import api from '../../services/api'

// components
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function Convite() {
  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth()
  const [poolsCount, setPoolsCount] = useState<number>(0)
  const [guessesCount, setGuessesCount] = useState<number>(0)
  const [usersCount, setUsersCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchCounts = useCallback(async () => {
    setIsLoading(true)
    const [fetchPoolsCount, fetchGuessesCount, fetchUsersCount] = await Promise.all([
      api.get('pools/count'),
      api.get('guesses/count'),
      api.get('users/count')
    ])
    setPoolsCount(fetchPoolsCount.data.count)
    setGuessesCount(fetchGuessesCount.data.count)
    setUsersCount(fetchUsersCount.data.count)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchCounts()
  }, [fetchCounts])

  if (user) {
    router.push(`/bolao/${id}`)
  } else {
    return (
      <NextTemplateLandingPage
        items={items}
        idWhoInvited={id}
        poolsCount={poolsCount}
        guessesCount={guessesCount}
        usersCount={usersCount}
        isLoading={isLoading}
      />
    )
  }
}
