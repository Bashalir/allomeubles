/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// Déclarations de types pour les imports de modules
declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
