import React from 'react'
import NextTemplateHome from '../components/templates/NextTemplateHome'
import { nextHeroItem, nextCallToActionItems, nextTechnologyItems, nextTeamItems } from '../data'

const NextHome = () => {
  return (
    <NextTemplateHome
      nextHeroItem={nextHeroItem}
      nextCallToActionItems={nextCallToActionItems}
      nextTechnologyItems={nextTechnologyItems}
      nextTeamItems={nextTeamItems}
    />
  )
}

export default NextHome
