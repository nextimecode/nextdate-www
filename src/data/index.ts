import { LandingPageItems, NextCallToAction } from '../types/LandingPageItems'

export const layout = {
  title: 'NeXTBolao | Bolões',
  url: 'https://bolao.nextime.com.br/',
  description:
    'O NeXTBolao é um game produzido pela empresa NeXTIME no qual você pode criar bolões para jogar com seus amigos. Você pode acompanhar a COPA de maneira divertida competindo com os seus amigos e outros.',
  keywords: ['bolão', 'bolão grátis', 'bolão copa do mundo', 'criar um bolão'],
  siteName: 'NeXTBolao',
  socialTitle:
    'Você pode criar bolões para jogar com seus amigos. Você pode acompanhar a COPA de maneira divertida competindo com os seus amigos e outros.',
  socialImageUrl: 'https:/bolao.nextime.com.br/images/image_page.png',
  socialNetwork:
    'https://api.whatsapp.com/send?phone=5511972436305&text=Ol%C3%A1,%20Pedro!%0ATenho%20dúvidas%20sobre%20o%20NeXTBolao.',
  logoSrc: '/images/logos/next.svg',
  logoHeight: 62,
  logoSubtitle: 'Bolao',
  logoSubtitleColor: 'next-primary'
}

export const nextCallToActionItems: Array<NextCallToAction> = [
  {
    id: 'hero',
    title: 'Crie seu próprio bolão da copa e compartilhe entre amigos!',
    text: 'Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀',
    color: '',
    textButton: 'Quero criar meu bolão',
    image: '/images/home/image1.png',
    url: '/cadastro',
    width: 518,
    height: 605
  }
]

export const hasNextCallToActionWithAnnotation = false

export const items: LandingPageItems = {
  layout,
  hasNextCallToActionWithAnnotation,
  nextCallToActionItems
}
