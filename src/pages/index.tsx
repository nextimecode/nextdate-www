import { nextCallToActionItems } from '../data'
import { NextCallToAction } from '../components/organisms/NextCallToAction'
import { NextLayout } from '../components/templates/NextLayout'

const NextHome = () => {
  return (
    <NextLayout>
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

export default NextHome
