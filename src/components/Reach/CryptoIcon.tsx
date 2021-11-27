import styled from "styled-components";
import { cryptoImage, IconsMap } from "./cryptocurrency-icons";
import { FlexColumn, FlexRow } from "components/Common/Containers";

interface CryptoIconProps {
  /**  @description Return a color image (default false) */
  color?: boolean;
  /**  @description Show name beside icon when false */
  iconOnly?: boolean;
  /**  @description Crypto abbreviation (e.g. ETH) */
  symbol: string;
  /**  @description Width and height of icon: default is `20px` */
  size?: number;
}

const AssetId = styled.span`
  font-size: 0.64rem;
  opacity: 0.66;
`;
const AssetName = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`;
const AssetWrapper = styled(FlexRow)`
  border: 1px dashed #9f9f9f66;
  border-radius: ${({ theme }) => theme.presets.rounded.sm};
  padding: 0.64rem;
  
  > * {
    padding-left: 0.3rem;
  }
`;
const CryptoIcon = styled((props: CryptoIconProps) => {
  const { symbol, color, iconOnly, size = 20 } = props;
  const imgProps = { width: size, height: size };
  const data = IconsMap.get(symbol);
  const src = cryptoImage(symbol, color);

  // Show icon with or without text (per props)
  return iconOnly ? (
    <img {...imgProps} src={src} alt={data?.name} />
  ) : (
    <AssetWrapper>
      <img {...imgProps} src={src} alt={data?.name} />
      <AssetName>{data?.name}</AssetName>
    </AssetWrapper>
  );
})`
  width: 100%;
`;

export default CryptoIcon;

type CCIProps = CryptoIconProps & { name?: string; address: string | number };

export const EnhancedCryptoIcon = styled((props: CCIProps) => {
  if (props.iconOnly) return <CryptoIcon {...props} />;

  const { symbol, color, size = 32, name, address } = props;
  const imgProps = { width: size, height: size };
  const src = cryptoImage(symbol, color);

  // Show icon with or without text (per props)
  return (
    <AssetWrapper>
      <img {...imgProps} src={src} alt={name} />

      <FlexColumn>
        <AssetName>{name}</AssetName>
        <AssetId>{`${symbol} - #${address}`}</AssetId>
      </FlexColumn>
    </AssetWrapper>
  );
})`
  width: 100%;
`;
