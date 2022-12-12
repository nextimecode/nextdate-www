import { NextTemplateHome } from '../components/templates/NextTemplateHome'
import { nextHeroItem, nextCallToActionItems } from '../data'

const NextHome = () => {
  return (
    <NextTemplateHome nextHeroItem={nextHeroItem} nextCallToActionItems={nextCallToActionItems} />
  )
}

export default NextHome
