# The Four Agreements Website

A simple, responsive website displaying "The Four Agreements" content in both English and Portuguese with light/dark mode support.

## Features

- Responsive design for all device sizes
- Language toggle between English (EN) and Portuguese (PT)
- Dark mode / Light mode toggle
- Markdown-style text formatting
- Simple, clean news-style layout

## Local Development

To run this website locally, you can use any simple HTTP server. Here are a few options:

### Using Python (if installed)

```bash
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

### Using Node.js (if installed)

First, install the http-server package:

```bash
npm install -g http-server
```

Then run:

```bash
http-server
```

The website will typically be available at http://localhost:8000 or http://127.0.0.1:8000

## Deployment

### GitHub Pages

1. Create a GitHub repository
2. Push this code to the repository
3. Enable GitHub Pages in the repository settings

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy your website

## Project Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles for the website
- `script.js` - JavaScript for language switching and theme toggling
- `EN.svg.png` - English language icon
- `PT.svg.png` - Portuguese language icon
- `README.md` - This file

## Future Improvements

- Add more content sections
- Implement additional language options
- Add animations for smoother transitions
