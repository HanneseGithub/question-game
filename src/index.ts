/**
 * Polyfills and plugins for the browser.
 */
import 'svgxuse';

/**
 * Globals
 */
export {default as Reset} from '@reset';

/**
 * Components
 */
export {default as Button} from '@button';

export {default as Helpers} from '@helpers';

export {default as Icon} from '@icon';

export {default as Typography} from '@typography';

/**
 * Component examples
 * @todo should probably not bundle them in production app
 */
export {default as TypographyExample} from '@typography--example';
