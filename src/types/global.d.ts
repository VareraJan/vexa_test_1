declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
// declare module '*.svg' {
//   import React, { SVGProps } from 'react';
//   const SVG: React.SVGProps<SVGSVGElement>;
//   // const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
//   export default SVG;
// }
declare module '*.svg' {
  const content: any;
  export default content;
}
