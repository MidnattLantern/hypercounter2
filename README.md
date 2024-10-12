Hypercounter use UUID to handle term index id.

Hypercounter is deployed on Github Pages. To deploy to Github pages, bash this command:
`npm install gh-pages --save-dev`

Add to package.json:
`"homepage": "https://github.com/MidnattLantern/hypercounter2"`

Add to the "scripts" section in package.json:
`  "predeploy": "npm run build",`
`  "deploy": "gh-pages -d build"`

Theme font:
```css
{
font-family: 'Ewert', cursive;
}
```