import { globalStyle } from '@vanilla-extract/css';

globalStyle(':root', {
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  lineHeight: 1.5,
  fontWeight: 400,
  color: 'rgba(255, 255, 255, 0.87)',
  backgroundColor: '#242424',
  fontSynthesis: 'none',
  textRendering: 'optimizeLegibility',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});
