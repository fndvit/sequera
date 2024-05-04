export default {
  title: "Sequera a Catalunya",
  theme: "dashboard",
  head: '<link rel="shortcut icon" type="image/x-icon" href="https://images.squarespace-cdn.com/content/v1/5e5b7eebeb83b746b6481a2d/1604671720103-EPJSELDNWVIPCWI63H7G/ke17ZwdGBToddI8pDm48kNCIUUInZz-JelovUC4TKJ9Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpy2nmdcYIRqEQwGN8P7xrL_yE-hs8s0G614KmYuoTh2b5xIcJ7iebeF3-4wt8VfJy4/favicon.ico?format=100w">',
  root: "src",
  style:"style.css",

  header:`<style>

  #observablehq-header .logo {
    height: 2rem;
    width: auto;
  }

  #observablehq-header a[href] {
    color: inherit;
  }
  
  #observablehq-header a[target="_blank"] {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    text-decoration: none;
  }
  
  #observablehq-header a[target="_blank"]:hover span {
    text-decoration: underline;
  }
  
  #observablehq-header a[target="_blank"]:not(:hover, :focus)::after {
    color: var(--theme-foreground-muted);
  }
  
  @container not (min-width: 640px) {
    .hide-if-small {
      display: none;
    }
  }
  
  </style>
  <div style="display: flex; align-items: center; gap: 0.5rem; height: 2.2rem; margin: -1.5rem -2rem 2rem -2rem; padding: 0.5rem 2rem; border-bottom: solid 1px var(--theme-foreground-faintest); font: 500 16px var(--sans-serif);">
    <a href="https://www.fundaciovit.org/" target="_self" rel="" style="display: flex; align-items: center;">
    <img class="logo" aria-roledescription="logo" aria-label="logo de la Fundació Visualització per a la Transparència ViT" width="659px" height="370px" src="https://static1.squarespace.com/static/5e5b7eebeb83b746b6481a2d/t/5eb5257ba6decf483335e112/1602266305881/?format=1500w" alt="logo de la Fundació Visualització per a la Transparència ViT">
    </a>
    <div style="display: flex; flex-grow: 1; justify-content: space-between; align-items: baseline;">
      <b>
        <a href="" target="_self" rel="">
          La sequera <span class="hide-if-small">a Catalunya</span>
        </a>
      </b>
      <span style="display: flex; align-items: baseline; gap: 0.5rem; font-size: 13px;">
        <a target="_blank" href="https://github.com/fndvit/sequera"><span>Col·labora al repositori</span></a>
      </span>
    </div>
  </div>`,
  footer: '',
  cleanUrls: false
};
