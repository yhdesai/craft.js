import { UserComponent, useNode } from '@craftjs/core';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';

import { InputSettings } from './InputSettings';

import { Text } from '../Text';

type InputProps = {
  background?: Record<'r' | 'g' | 'b' | 'a', number>;
  color?: Record<'r' | 'g' | 'b' | 'a', number>;
  buttonStyle?: string;
  margin?: any[];
  text?: string;
  textComponent?: any;
};

const StyledInput = styled.button<InputProps>`
  background: ${(props) =>
    props.buttonStyle === 'full'
      ? `rgba(${Object.values(props.background)})`
      : 'transparent'};
  border: 2px solid transparent;
  border-color: ${(props) =>
    props.buttonStyle === 'outline'
      ? `rgba(${Object.values(props.background)})`
      : 'transparent'};
  margin: ${({ margin }) =>
    `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`};
`;

export const Button: UserComponent<InputProps> = (props: any) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { text, textComponent, color, ...otherProps } = props;
  return (
    <StyledInput
      ref={connect}
      className={cx([
        'rounded w-full px-4 py-2',
        {
          'shadow-lg': props.buttonStyle === 'full',
        },
      ])}
      {...otherProps}
    >
      <Text {...textComponent} text={text} color={props.color} />
    </StyledInput>
  );
};

StyledInput.craft = {
  displayName: 'Input',
  props: {
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    buttonStyle: 'full',
    text: 'Input',
    margin: ['5', '0', '5', '0'],
    textComponent: {
      ...Text.craft.props,
      textAlign: 'center',
    },
  },
  related: {
    toolbar: ButtonSettings,
  },
};
