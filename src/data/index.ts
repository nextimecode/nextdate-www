import { NextCallToActionProps } from '../types/LandingPageItems'

const numberPhone = '553189217467'
const whatsappURL = `https://api.whatsapp.com/send?phone=${numberPhone}&text=Ol%C3%A1,%20NeXTIME!%0AGostaria%20de%20solicitar%20um%20orçamento.`

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
  socialNetwork:
    'https://api.whatsapp.com/send?phone=5511972436305&text=Ol%C3%A1,%20Pedro!%0ATenho%20dúvidas%20sobre%20o%20NeXTShow.',
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
  url: whatsappURL
}

export const nextCallToActionItems = [
  {
    id: 'app',
    title: 'Crie seu próprio app e multiplique suas vendas',
    text: 'Na NeXTIME, temos a solução completa para você se conectar com quem mais importa: seus clientes. Faça todo mundo levar sua empresa na palma da mão e ter acesso ao melhor que você oferece com poucos cliques.',
    image: '/images/home/tattoo_pop.png',
    textButton: 'Quero meu próprio app',
    url: whatsappURL,
    width: 600,
    height: 630,
    directionMd: 'row-reverse'
  },
  {
    id: 'site',
    title: 'Tenha um site inovador e veja sua empresa decolar',
    text: 'Conte com nossos especialistas NeXTIME para criar tudo utilizando as ferramentas mais modernas. Desenvolvemos páginas otimizadas que carregam em poucas frações de segundo e não te fazem perder clientes.',
    textButton: 'Quero meu site mais moderno',
    url: whatsappURL,
    width: 595,
    height: 528,
    image: '/images/home/optar.png'
  },
  {
    id: 'marketing',
    title: 'Faça sua empresa ser vista e conquiste fãs para sua marca',
    text: 'Tenha a ajuda dos experts NeXTIME para criar campanhas completas para sua marca. Esteja presente em todas as plataformas e redes sociais para ganhar uma legião de clientes.',
    image: '/images/home/instagram.png',
    url: whatsappURL,
    width: 450,
    height: 480,
    textButton: 'Quero que minha empresa seja vista',
    directionMd: 'row-reverse'
  }
] as unknown as Array<NextCallToActionProps>
