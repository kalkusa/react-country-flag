import * as React from 'react';
import { Country } from "./countryEnum"

const DEFAULT_CDN_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/';
const DEFAULT_CDN_SUFFIX = 'svg';

// offset between uppercase ascii and regional indicator symbols
const OFFSET = 127397;

interface EmojiProps extends React.HTMLAttributes<HTMLSpanElement> {
  cdnSuffix?: string;
  cdnUrl?: string;
  countryCode: string | Country;
  style?: React.CSSProperties;
  svg?: false;
}

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  cdnSuffix?: string;
  cdnUrl?: string;
  countryCode: string;
  style?: React.CSSProperties;
  svg?: true;
}

export type ReactCountryFlagProps = EmojiProps | ImgProps;

export const ReactCountryFlag = ({
  cdnSuffix = DEFAULT_CDN_SUFFIX,
  cdnUrl = DEFAULT_CDN_URL,
  countryCode,
  style,
  svg = false,
  ...props
}: ReactCountryFlagProps) => {
  if (typeof countryCode !== 'string') {
    return null;
  }

  if (svg) {
    const flagUrl = `${cdnUrl}${countryCode.toLowerCase()}.${cdnSuffix}`;

    return (
      <img
        {...props}
        src={flagUrl}
        style={{
          display: 'inline-block',
          width: '1em',
          height: '1em',
          verticalAlign: 'middle',
          ...style,
        }}
      />
    );
  }

  const emoji = countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + OFFSET));

  return (
    <span
      role="img"
      {...props}
      style={{
        display: 'inline-block',
        fontSize: '1em',
        lineHeight: '1em',
        verticalAlign: 'middle',
        ...style,
      }}
    >
      {emoji}
    </span>
  );
};

export default ReactCountryFlag;
