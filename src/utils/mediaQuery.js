import { css } from 'styled-components'

export const size = {
    phone: 480,
    tablet: 768,
    desktop: 992,
}
  

export const device = {
    phone : `(max-width: ${size.phone}px)`,
    tablet : `(max-width: ${size.tablet}px)`,
    desktop : `(max-width: ${size.desktop}px)`,
    invertPhone: `(min-width: ${size.phone+1}px)`,
}



export const media = {
  phone: (...args) => css`
    @media ${device.phone} {
      ${css(...args)};
    }
  `,
  tablet: (...args) => css`
    @media ${device.tablet} {
      ${css(...args)};
    }
  `,
  desktop: (...args) => css`
    @media ${device.desktop} {
      ${css(...args)};
    }
  `,
  invertPhone: (...args) => css`
  @media ${device.invertPhone} {
    ${css(...args)};
  }
`
}