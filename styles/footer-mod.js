// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find the footer
  const footer = document.querySelector('footer');
  
  if (footer) {
    // Option 1: Hide the footer completely
    footer.style.display = 'none';
    
    // Option 2: Replace the footer content instead of hiding
    // footer.innerHTML = '<hr><p>© 2023 Bananarama - All Rights Reserved</p>';
  }
}); 