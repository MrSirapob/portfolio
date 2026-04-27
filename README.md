# 👨‍💻 Sirapob Raksabun — Portfolio

> Computer Engineering graduate focused on creating user-friendly UI from design to real-world implementation

## ✨ Features

- 🎨 **Modern & Minimal Design** - Clean UI with professional aesthetics
- 📱 **Fully Responsive** - Seamlessly adapts to desktop and mobile devices (breakpoint: 860px)
- ⚡ **Smooth Interactions** - Optimized scrolling, modal dialogs, and interactive effects
- 🌙 **Dark Theme** - Eye-friendly dark color scheme with blue accent colors
- 🎬 **Interactive Glow Effect** - Mouse-tracking radial gradient animation
- ♿ **Semantic HTML** - Built with proper HTML5 structure and accessibility in mind

## 📁 Project Structure

```
portfolio/
├── index.html          # Main portfolio page (Thai language)
├── css/
│   └── style.css       # All styles (Grid, Flexbox, CSS Variables)
├── js/
│   └── script.js       # Interactive features (Glow effect, Navigation, Modal, etc.)
├── images/
│   └── logo.png        # Favicon
└── README.md           # This file
```

## 🚀 Getting Started

This portfolio is live at your domain. To run locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/MrSirapob/portfolio.git
   cd portfolio
   ```

2. **Open locally**
   - Open `index.html` directly in your browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Visit http://localhost:8000
     ```
   - Or use Live Server extension in VS Code

## 📋 Sections

- **About** - Introduction as a recent graduate, professional background, internship experience, and current job opportunity status
- **Experience** - Education at Phaya University and Fullstack Developer internship at Hyphen Plus Company
- **Projects** - Showcase of completed projects:
  - Smart Refrigerator (IoT): AI-powered smart refrigerator using ESP32, Raspberry Pi, and YOLO
  - G3nz Website: Personal gaming website with game statistics and recommendations

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend** (from internship): PHP, MySQL
- **Hardware/IoT**: ESP32, Raspberry Pi, YOLO
- **Developer Tools**: Git, Postman
- **Other**: Bootstrap, C
- **Fonts**: Inter (body), JetBrains Mono (monospace)
- **Design Approach**: Custom CSS with CSS Grid and Flexbox for responsive layouts

## 🎯 Features Breakdown

### Mouse-Tracking Glow Effect
- Canvas-based radial gradient animation that follows the cursor
- Creates an interactive visual element without affecting performance

### Marquee Technology Showcase
- Continuous scrolling animation of skills/technologies
- Displays: HTML5, CSS3, JavaScript, Bootstrap, PHP, C, Git, Postman

### Sticky Navigation Sidebar
- Left-side navigation with active state indicators
- Automatically highlights current section based on scroll position
- Includes social media links (GitHub, X/Twitter, Email)

### Interactive Project Modal
- Click projects to view detailed information
- Modal can be closed via X button, Escape key, or clicking outside
- Displays project details, description, and technology stack

### Automatic Age Calculator
- Calculates and displays the user's age from birth date (Sept 11, 2003)
- Updates automatically using JavaScript

### Responsive Design
- Mobile-first approach with breakpoint at 860px
- Adapts layout for smaller screens
- Touch-friendly navigation and interactions

## 📝 Customization Guide

### Update Personal Information
In `index.html`:
- **Name & Title**: Update `.name` and `.role` divs in the left sidebar
- **Tagline**: Modify the text in the `<div class="tagline">` section
- **About Text**: Edit the paragraphs in the About section
- **Status Pills**: Update or remove the `.pill` elements showing availability
- **Experience**: Add/remove entries in the Experience section
- **Projects**: Modify project details and modal content

### Modify Color Scheme
In `css/style.css`:
- All colors are defined as CSS variables in the `:root` selector
- Key variables:
  - `--primary`: Main text color
  - `--accent`: Primary accent color (blue)
  - `--accent2`: Secondary accent color (cyan)
  - `--bg`: Background color
  - `--bg2`: Secondary background color
- Update these to match your brand

### Update Technologies List
In `js/script.js`:
- Find the technology marquee section
- Update the `.tech-group` span elements with your skills
- The marquee duplicates content automatically for the scroll effect

### Add/Remove Social Links
In `index.html`:
- Update the `.socials` section with your social media links
- Modify SVG paths or use icons from your preferred icon library

### Change Project Details
In `index.html`:
- Update project thumbnails (emoji or images)
- Modify project descriptions and tech tags
- Update modal content for detailed project information

## 📞 Contact & Social

- **Email**: [sirapob.1109@gmail.com](mailto:sirapob.1109@gmail.com)
- **GitHub**: [@MrSirapob](https://github.com/MrSirapob)
- **X (Twitter)**: [@MrG3nz](https://x.com/MrG3nz)
- **Location**: Phichit, Thailand

Feel free to reach out for opportunities, collaborations, or just to connect!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

Design inspiration from [Brittany Chiang](https://brittanychiang.com)

---

**Made with ❤️ by Sirapob Raksabun**
