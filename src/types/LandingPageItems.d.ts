export interface NextCallToActionProps {
  id?: string
  title: string
  text: string
  color?: string
  textButton?: string
  image: string
  url: string
  width: numbe
  height: number
  directionMd?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  directionBase?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
}

export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export interface Layout {
  title: string
  url: string
  keywords: Array<string>
  description: string
  socialTitle: string
  socialNetwork: string
  logoSrc: string
  logoHeight: number
  logoSubtitle: string
  logoSubtitleColor: string
}

export interface LandingPageItems {
  layout: Layout
  nextCallToActionItems: Array<NextCallToActionProps>
  hasNextCallToActionWithAnnotation?: boolean
}
