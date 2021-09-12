import styled from 'styled-components'
import { cryptoImage, IconsMap } from './cryptocurrency-icons'
import { FlexRow } from 'components/Common/Containers'

interface CryptoIconProps {
  /**  @description Return a color image (default false) */
  color?: boolean
  /**  @description Show name beside icon when false */
  iconOnly?: boolean
  /**  @description Crypto abbreviation (e.g. ETH) */
  symbol: string
  /**  @description Width and height of icon: default is `20px` */
  size?: number
}

const IconWrapper = styled(FlexRow)`
  width: 100%;

  .label {
    padding-left: 0.3rem;
  }
`

function CryptoIcon(props: CryptoIconProps) {
  const { symbol, color, iconOnly, size = 20 } = props
  const imgProps = { width: size, height: size }
  const data = IconsMap.get(symbol)
  const src = cryptoImage(symbol, color)

  // Show icon with or without text (per props)
  return iconOnly ? (
    <img {...imgProps} src={src} alt={data?.name} />
  ) : (
    <IconWrapper>
      <img {...imgProps} src={src} alt={data?.name} />
      <span className='label'>{data?.name}</span>
    </IconWrapper>
  )
}

export default CryptoIcon
