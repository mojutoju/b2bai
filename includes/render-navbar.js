document.addEventListener('DOMContentLoaded', () => {
  // Create and populate the head section
  const head = document.head;

  // Meta tags
  const metaCharset = document.createElement('meta');
  metaCharset.setAttribute('charset', 'UTF-8');
  head.appendChild(metaCharset);

  const metaViewport = document.createElement('meta');
  metaViewport.setAttribute('name', 'viewport');
  metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
  head.appendChild(metaViewport);

  // Title
  const title = document.createElement('title');
  title.textContent = 'B2BAI - Revolutionizing Enterprise with AI-Driven Insights.';
  head.appendChild(title);

  // Stylesheets
  const stylesheets = [
    'https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.0/mdb.min.css',
    'https://fonts.cdnfonts.com/css/roboto',
    'css/navbar.css',
    'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css',
   
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
  ];

  stylesheets.forEach((href) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    head.appendChild(link);
  });

  // Favicon
  const favicon = document.createElement('link');
  favicon.setAttribute('rel', 'icon');
  favicon.setAttribute('href', 'img/logo.png');
  favicon.setAttribute('type', 'image/png');
  head.appendChild(favicon);

  // Create Navbar
  const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="img/logo.png" class="img-fluid" width="60px">
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style="background-color: #065CE1;"
        >
          <i class="fas fa-bars" style="color: #fff;"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item"><a class="nav-link" href="features.html" style="font-size: 13px; color:black;">Features</a></li>
            <li class="nav-item"><a class="nav-link" href="#solutions" style="font-size: 13px; color:black;">Solutions</a></li>
            <li class="nav-item"><a class="nav-link" href="#pricing" style="font-size: 13px; color:black;">Pricing</a></li>
            <li class="nav-item"><a class="nav-link" href="#resources" style="font-size: 13px; color:black;">Resources</a></li>
          </ul>
          <form class="d-flex input-group w-auto">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="includes/login.html" style="padding: 13px; font-size: 13px; color: black; font-weight: bold; border-radius: 20px; width: 130px;">Contact Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link btn btn-lg" href="includes/login.html" style="background-color: #065CE1; color: white; font-size: 13px; font-weight: bold; border-radius: 12px; width: 120px;">Try B2B AI</a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  `;

  // Add Navbar to the top of the body
  const body = document.body;
  const navbarWrapper = document.createElement('div');
  navbarWrapper.innerHTML = navbarHTML;

  // Prepend the navbar
  body.insertBefore(navbarWrapper, body.firstChild);

  // Add MDB JS
  const mdbScript = document.createElement('script');
  mdbScript.type = 'text/javascript';
  mdbScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.0/mdb.min.js';
  body.appendChild(mdbScript);
});
