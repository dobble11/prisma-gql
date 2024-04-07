import { keyframes, style } from '@vanilla-extract/css';

export const wrapper = style({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '2rem',
  textAlign: 'center',
});

export const logo = style({
  height: '6em',
  padding: '1.5em',
  willChange: 'filter',
  transition: 'filter 300ms',

  ':hover': {
    filter: 'drop-shadow(0 0 2em #646cffaa)',
  },
});

const logoSpin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const react = style({
  ':hover': {
    filter: 'drop-shadow(0 0 2em #61dafbaa)',
  },

  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${logoSpin} infinite 20s linear`,
    },
  },
});
