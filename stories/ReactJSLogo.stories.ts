import { ReactJSLogo } from '../components/ReactJSLogo';
import '../styles/globals.css'

/**
 * Componente capaz de mostrar na tela a logo do **React** podendo sofrer variações com base em suas cores estilizadas pela biblioteca do **tailwind**.
 */

export default {
  title: 'Components/ReactJSLogo',
  component: ReactJSLogo,
  tags: ['autodocs'],
  argTypes: {},
};

export const ReactJSLogo_Component_Blue = {
  args: {
    className: 'h-12 text-sky-600 sm:h-16',
  },
};

export const ReactJSLogo_Component_Red = {
  args: {
    className: 'h-12 text-red-600 sm:h-16',
  },
};

export const ReactJSLogo_Component_Green = {
  args: {
    className: 'h-12 text-green-600 sm:h-16',
  },
};