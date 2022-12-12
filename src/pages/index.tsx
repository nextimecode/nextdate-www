import { NextTemplateHome } from '../components/templates/NextTemplateHome'
import { nextHeroItem, nextCallToActionItems } from '../data'

export const NextHome = () => {
  return (
    <NextTemplateHome nextHeroItem={nextHeroItem} nextCallToActionItems={nextCallToActionItems} />
  )
}
