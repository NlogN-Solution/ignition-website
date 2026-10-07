# Ignition fonts

Original Archivo and IBM Plex Sans WOFF2 subsets previously served by `next/font/google`, now bundled locally to remove build-time downloads and the Turbopack Google-font resolver dependency.

`app/fonts.css` preserves the original Unicode ranges, font weights, `swap` behavior, and Arial fallback metrics. The root layout preloads the two Latin subsets; other subsets load only when needed. The accompanying OFL files contain the upstream redistribution licenses.
