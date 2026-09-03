// Type declarations for side-effect imports
declare module '*.css' {}
declare module '*.jpg' {}
declare module '*.png' {}
declare module '*.svg' {}
declare module '*.json' {
  const value: any
  export default value
}