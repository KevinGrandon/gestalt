// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import Image from '../Image/Image';
import Mask from '../Mask/Mask';
import typography from '../Typography.css';

const Square = (props: *) => (
  <Box {...props} position="relative">
    <Box
      dangerouslySetInlineStyle={{ __style: { paddingBottom: '100%' } }}
      position="relative"
    />
    <Box position="absolute" top left bottom right>
      {props.children}
    </Box>
  </Box>
);

const DefaultAvatar = ({ name }: { name: string }) => {
  const firstInitial = [...name][0].toUpperCase();
  return (
    <Square color="gray" shape="circle">
      <svg
        width="100%"
        viewBox="-50 -50 100 100"
        version="1.1"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{name}</title>
        <text
          fontSize="50px"
          fill="#FFFFFF"
          dominantBaseline="central"
          textAnchor="middle"
          className={[
            typography.antialiased,
            typography.sansSerif,
            typography.leadingSmall,
            typography.fontWeightBold,
          ].join(' ')}
        >
          {firstInitial}
        </text>
      </svg>
    </Square>
  );
};

type AvatarProps = {|
  name: string,
  size?: 'sm' | 'md' | 'lg',
  src?: string,
  verified?: boolean,
|};

const sizes = {
  sm: 24,
  md: 40,
  lg: 72,
};

export default function Avatar({ name, size, src, verified }: AvatarProps) {
  const width = size ? sizes[size] : '100%';
  const height = size ? sizes[size] : '';
  return (
    <Box
      color="white"
      dangerouslySetInlineStyle={{
        __style: {
          boxShadow: '0 0 0 2px #fff',
        },
      }}
      width={width}
      height={height}
      position="relative"
      shape="circle"
    >
      {src ? (
        <Mask shape="circle" wash>
          <Image
            alt={name}
            color="#EFEFEF"
            naturalHeight={1}
            naturalWidth={1}
            src={src}
          />
        </Mask>
      ) : (
        <DefaultAvatar name={name} />
      )}
      {verified && (
        <Box
          position="absolute"
          width="20%"
          height="20%"
          minWidth={8}
          minHeight={8}
          dangerouslySetInlineStyle={{
            __style: {
              bottom: '4%',
              right: '4%',
            },
          }}
        >
          <Box
            color="white"
            width="100%"
            height="100%"
            shape="circle"
            dangerouslySetInlineStyle={{
              __style: {
                boxShadow: '0 0 0 2px #fff',
              },
            }}
          >
            <Icon
              color="red"
              icon="check-circle"
              accessibilityLabel=""
              size="100%"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  verified: PropTypes.bool,
};
