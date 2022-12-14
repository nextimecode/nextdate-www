import NextArticleList from '../../components/organisms/NextArticleList'
import { NextLayout } from '../../components/templates/NextLayout'
import { useGetPostsQuery } from '../../graphql/generated'

export default function Blog() {
  const { data } = useGetPostsQuery()
  return (
    <NextLayout>
      <NextArticleList posts={data?.posts} />
    </NextLayout>
  )
}
