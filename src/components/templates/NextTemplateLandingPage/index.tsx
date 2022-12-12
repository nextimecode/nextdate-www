import { NextLayout } from '../NextLayout'
import NextCallToActionWithAnnotation from '../../organisms/NextCallToActionWithAnnotation'
import { LandingPageItems } from '../../../types/LandingPageItems'
import { NextCallToAction } from '../../organisms/NextCallToAction'

export type NextTemplateLandingPageProps = {
  items: LandingPageItems
  idWhoInvited?: string | string[] | undefined
}

export const NextTemplateLandingPage = ({ items, idWhoInvited }: NextTemplateLandingPageProps) => {
  if (idWhoInvited && typeof idWhoInvited === 'string') {
    localStorage.setItem('idWhoInvited', idWhoInvited)
  }
  return (
    <NextLayout isLogged={false} title={'NeXTBolao | Home'}>
      {items.hasNextCallToActionWithAnnotation && <NextCallToActionWithAnnotation />}
      {items.nextCallToActionItems?.map((item, index) => (
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
