import { NextCallToActionProps } from '../types/LandingPageItems'

const numberPhone = '553197396032'
const socialNetwork = `https://api.whatsapp.com/send?phone=${numberPhone}&text=Ol%C3%A1,%20NeXTDATE!%0AGostaria%20de%20de%20participar.`
const registerUrl = '/cadastro'

export const layout = {
  title: 'NeXTDATE | Dashboard',
  url: 'https://www.nextshow.com.br/',
  description:
    'O NeXTDate é um game produzido pela empresa NeXTIME no qual você deixa palpites sobre os participantes dos realities shows. Você pode acompanhar seu reality favorito de maneira divertida competindo com os seus amigos e outros.',
  keywords: ['relacionamento', 'namoro'],
  siteName: 'NeXTDATE',
  socialTitle:
    'Venha jogar esse game no qual você pode palpitar nos participantes dos realities shows',
  socialImageUrl: 'https://www.nextdate.com.br/images/image_page.jpg',
  socialNetwork,
  logoSrc: '/images/logos/next.svg',
  logoHeight: 62,
  logoSubtitle: 'Date',
  logoSubtitleColor: 'next-primary'
}

export const nextHeroItem = {
  words: 'TECNOLOGIA | DESIGN | MARKETING',
  title: 'Transforme suas ideias em negócios de sucesso',
  text: 'Tenha nosso time ao seu lado para fazer seus planos virarem realidade. Foque onde precisa enquanto nossos especialistas cuidam de tudo para o seu negócio evoluir como você sempre quis.',
  textButton: 'Quero revolucionar minha empresa',
  url: registerUrl
}

export const nextCallToActionItems = [
  {
    id: 'home1',
    title: 'Faça o teste de compatibilidade',
    text: 'No NeXTDATE você consegue fazer um teste de compatibilidade de forma gratuita entre você e qualquer outro participante, basta os dois estarem cadastrados no app. O teste utiliza inteligência artificial, algoritmo de análise de personalidade e os seus interesses para gerar uma porcentagem.',
    image: '/images/home/image1b.png',
    textButton: 'Quero fazer o teste de compatibilidade',
    url: registerUrl,
    width: 300,
    height: 300,
    directionMd: 'row-reverse'
  },
  {
    id: 'home2',
    title: 'Inspirado em Black Mirror',
    text: 'O episódio "Hang the DJ" da série Black Mirror é um episódio de ficção científica que explora o tema do amor e das relações em um mundo onde a tecnologia é muito avançada.',
    textButton: 'Veja a matéria sobre o episódio',
    url: '/blog/episodio-black-mirror',
    width: 1200,
    height: 720,
    image: '/images/home/image2.jpg'
  },
  {
    id: 'home3',
    title: 'Perfis verificados',
    text: 'Todos os perfis cadastrados antes de poderem dar match com outras pessoas são verificados. Pensando na segurança dos nossos usuários, todos os perfis cadastrados no app são verificados através de um documento com foto e foto da pessoa portando o mesmo.',
    textButton: 'Veja a matéria sobre o episódio',
    url: '/blog/episodio-black-mirror',
    width: 275,
    height: 275,
    image: '/images/home/image3.png',
    directionMd: 'row-reverse'
  },
  {
    id: 'home4',
    title: 'Sem exposição desnecessária',
    text: 'Suas fotos do perfil irão aparecer apenas para quem você tem compatibilidade e que manteve um nível de conversa. E o poder é todo seu de quem no match pode ou não ver suas fotos.',
    image: '/images/home/image4.webp',
    url: registerUrl,
    width: 384,
    height: 484,
    textButton: 'Abra conta grátis'
  },
  {
    id: 'home5',
    title: 'Talvez o destino precise de uma ajudinha',
    text: 'Para aqueles que estão cansados de dar match com pessoas que não tem nada em comum no NeXTDATE os matchs não são aleatórios, são todos baseados em interesses em comum que você tem com uma determinada pessoa.',
    image: '/images/home/image5.jpg',
    url: registerUrl,
    width: 450,
    height: 480,
    textButton: 'Abra conta grátis',
    directionMd: 'row-reverse'
  }
] as unknown as Array<NextCallToActionProps>
