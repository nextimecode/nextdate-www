import React from 'react'
import { NextCallToAction, NextCallToActionProps } from '../../organisms/NextCallToAction'
import NextHero, { NextHeroProps } from '../../organisms/NextHero'
import { NextLayout } from '../NextLayout'

export type NextTemplateHomeProps = {
  nextHeroItem: NextHeroProps
  nextCallToActionItems: Array<NextCallToActionProps>
}

export const NextTemplateHome = ({
  nextHeroItem,
  nextCallToActionItems
}: NextTemplateHomeProps) => {
  return (
    <NextLayout>
      <NextHero
        image={nextHeroItem.image}
        words={nextHeroItem.words}
        title={nextHeroItem.title}
        text={nextHeroItem.text}
        textButton={nextHeroItem.textButton}
        url={nextHeroItem.url}
      />
      {nextCallToActionItems?.map((item, index) => (
        <NextCallToAction
          id={item.id}
          key={index}
          title={item.title}
          text={item.text}
          image={item.image}
          textButton={item.textButton}
          directionMd={item.directionMd}
          width={item.width}
          height={item.height}
          url={item.url}
        />
      ))}
    </NextLayout>
  )
}
