function cleanPage() {
  // Remove common distracting elements
  const distractingSelectors = [
    'header',
    'footer',
    'nav',
    'aside',
    '.ad',
    '.ads',
    '.advertisement',
    '.social-share',
    '.comments',
    '.related-articles'
  ];

  distractingSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.style.display = 'none';
    });
  });

  // Find main content
  const mainContent = findMainContent();
  if (mainContent) {
    // Center content and improve readability
    document.body.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'clean-reader-container';
    container.appendChild(mainContent);
    document.body.appendChild(container);
  }
}

function findMainContent() {
  // Common article content selectors
  const contentSelectors = [
    'article',
    '[role="main"]',
    '.post-content',
    '.article-content',
    '.entry-content',
    'main'
  ];

  for (const selector of contentSelectors) {
    const element = document.querySelector(selector);
    if (element) return element;
  }

  // Fallback: Find largest text content block
  return findLargestTextBlock();
}

function findLargestTextBlock() {
  const textBlocks = Array.from(document.getElementsByTagName('*'))
    .filter(element => {
      const text = element.textContent.trim();
      return text.length > 500 && element.children.length < 20;
    });

  return textBlocks.sort((a, b) => 
    b.textContent.length - a.textContent.length
  )[0];
}

function toggleDarkMode() {
  document.body.classList.toggle('clean-reader-dark');
}