declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: false; // remove the `mobile` breakpoint
    tablet: false;
    laptop: false;
    desktop: false;
  }
}

declare module 'path-browserify';
