import { css } from 'styled-components'

const size = {
    phone: '480px',
    tablet: '768px',
    desktop: '992px',
}
  

export const device = {
    phone : `(max-width: ${size.phone})`,
    tablet : `(max-width: ${size.tablet})`,
    desktop : `(max-width: ${size.desktop})`,
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
}