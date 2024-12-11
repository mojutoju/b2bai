document.addEventListener('DOMContentLoaded', () => {
    // Create the footer element
    const footer = document.createElement('footer');
    footer.className = 'text-center text-lg-start text-muted';
    footer.style.backgroundColor = '#181818';

  
    // Add the footer's inner HTML
    footer.innerHTML = `
      <!-- Links Section -->
      <section class="">
        <div class="container text-center text-md-start p-4">
          <div class="row mt-3">
            <!-- Column 1 -->
            <div class="col-md-4 mx-auto mb-4">
              <h3 class="fw-bold mb-4" style="color:white;">
               <img src="img/logowhite.png" class="img-fluid" width="80px">
              </h3>
              <p style="color:white; font-size:12px;">
          Transform your business with our cutting-edge AI Solutions tailored to streamline operations, enhance decision-making, and foster seamless business relationships.
              </p>
            </div>
            <!-- Column 2 -->
            <div class="col-md-2 mx-auto mb-4">
              <h6 class="fw-bold mb-4" style="color:white;">Sitemap</h6>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset">Features</a>
              </p>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset">Solutions</a>
              </p>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset">Pricing</a>
              </p>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset">Resources</a>
              </p>
            </div>
            <!-- Column 3 -->
            <div class="col-md-2 mx-auto mb-4">
              <h6 class="fw-bold mb-4" style="color:white;">Privacy Policy</h6>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset">Copyright</a>
              </p>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset">License Agreement</a>
              </p>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset">Subscribe</a>
              </p>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset">Terms and Conditions</a>
              </p>
            </div>
            <!-- Column 4 -->
            <div class="col-md-3 mx-auto mb-md-0 mb-4">
              <h6 class="fw-bold mb-4" style="color:white;">Contact Us</h6>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset"><i class="fab fa-instagram"></i> Instagram</a>
              </p>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset"><i class="fab fa-twitter"></i> Twitter</a>
              </p>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset"><i class="fab fa-facebook"></i> Facebook</a>
              </p>
              <p style="font-size:12px; color:white;">
                <a href="#!" class="text-reset"><i class="fab fa-medium"></i> Medium</a>
              </p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Copyright Section -->
      <div class="text-center p-4" style="background-color:black; color:white; ">
        © 2024 Copyright:
        <a class="text-reset fw-bold" href="#" style="color:#FF00A8;">Business2Business AI </a>
      </div>
    `;
  
    // Append the footer to the body
    document.body.appendChild(footer);
  });
  