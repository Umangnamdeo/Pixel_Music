================================================================================
                                PIXEL MUSIC WEB
================================================================================

A modern, lightweight landing and distribution website for the Pixel Music
application ecosystem. Designed for fast loading, clean visuals, and seamless
release asset distribution.

--------------------------------------------------------------------------------
1. PROJECT OVERVIEW
--------------------------------------------------------------------------------
Pixel Music Web serves as the central hub for users to explore app features,
view updates, and download the latest mobile and desktop release packages.

- Repository : https://github.com/Umangnamdeo/Pixel_Music
- License    : MIT (or project default)

--------------------------------------------------------------------------------
2. PROJECT STRUCTURE
--------------------------------------------------------------------------------
Pixel_Music/
│
├── .gitignore             # Excludes large binaries (*.apk, *.exe, builds)
├── index.html             # Main website landing page
├── README.txt             # Documentation & repository guide
│
├── assets/                # Web media assets
│   ├── css/               # Stylesheets (or bundled Tailwind/vanilla CSS)
│   ├── js/                # Client-side scripts and interaction logic
│   └── images/            # UI mockups, icons, and logo assets
│
└── public/                # Static public folder
    └── (Static web resources; keep large install binaries out)

--------------------------------------------------------------------------------
3. LOCAL DEVELOPMENT SETUP
--------------------------------------------------------------------------------
To run and test the website locally:

Option A: VS Code Live Server (Recommended)
1. Open the repository folder in Visual Studio Code.
2. Install the "Live Server" extension.
3. Right-click on "index.html" and select "Open with Live Server".

Option B: Node.js (npx serve / http-server)
1. Open PowerShell or Terminal in the repository root:
     npx serve .
2. Open http://localhost:3000 in your browser.

Option C: Python Built-in Server
1. Open terminal in the repository root:
     python -m http.server 8080
2. Open http://localhost:8080 in your browser.

--------------------------------------------------------------------------------
4. DEPLOYMENT & HOSTING (GitHub Pages)
--------------------------------------------------------------------------------
The website is configured to deploy automatically via GitHub Pages:

1. Push your latest code changes to the "main" branch:
     git add .
     git commit -m "Update website content"
     git push origin main

2. Ensure GitHub Pages is configured:
   - Go to GitHub -> Settings -> Pages.
   - Source: Deploy from a branch.
   - Branch: main / Root (/).

3. Your site will automatically build and publish via GitHub Actions.

--------------------------------------------------------------------------------
5. BINARY RELEASES & DOWNLOAD MANAGEMENT (IMPORTANT)
--------------------------------------------------------------------------------
Do NOT commit heavy APK or executable installer files directly into Git history
or Git LFS. Git LFS enforces strict monthly bandwidth limits (2 GB/month).

Best Practice for Distributing Builds:
1. Build your release binary locally (e.g., app-release.apk).
2. Go to GitHub -> Pixel_Music -> Releases -> "Draft a new release".
3. Create a tag (e.g., v1.8.0), add release notes, and attach the APK asset.
4. Publish the release.
5. In index.html, point your download button directly to the GitHub Release URL:

   <a href="https://github.com/Umangnamdeo/Pixel_Music/releases/latest/download/app-release.apk"
      class="download-btn">
      Download APK
   </a>

This ensures unlimited download bandwidth, fast speeds worldwide, and avoids
hitting deployment quota limits.

--------------------------------------------------------------------------------
6. GIT MAINTENANCE & BEST PRACTICES
--------------------------------------------------------------------------------
- Keep repository size small: Always keep "*.apk", "*.exe", and large media
  files in .gitignore.
- Check status before pushing:
     git status
- Test changes in an Incognito browser window (Ctrl + Shift + R) to bypass
  local caching when reviewing live updates.

================================================================================
