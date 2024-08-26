export default function init() {
  const container = $('.table_body');
  let currentIndex = 0; // To track the current index of fonts displayed
  let displayedFonts = []; // Store displayed PseudoFont objects for later reference
  let currentCategory = 'Free-font-generator';
  let fontsCache = {}; // Global cache for fonts

  class PseudoFont {
    constructor(fontData) {
      this.name = fontData.name;
      this.category = fontData.category;
      this.characters = fontData.characters;
    }

    convert(text) {
      if (typeof text !== 'string') {
        console.warn(`Expected string, got ${typeof text}`);
        return '';
      }
      return Array.from(text).map(char => this.characters[char] || char).join('');
    }
  }

  function addFontToHTML(_newFont, index) {
    let html = `
    <div class="table_item">
      <div class="table_item-title font" data-font-index="${index}">${_newFont.convert(_newFont.name || '')}</div>
      <div class="table_item-footer">
        <div class="table_item-settings">
          <div>${_newFont.name}</div>
          <div>${_newFont.category}</div>
        </div >
        <div class="table_item-buttons">
          <a href="#" class="button_small w-inline-block" data-copy-btn>
            <div class="button_small-ico w-embed">
              <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25M5.25 7.5L9 11.25M9 11.25L12.75 7.5M9 11.25V2.25" stroke="#A6A6A6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
            <div class="text-decoration-none">Copy font</div>
          </a>
          <a href="https://webflow.com/dashboard" target="_blank" class="button_small w-inline-block">
            <div class="button_small-ico w-embed">
              <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18 3.66061L12.2564 14.8737H6.86156L9.26525 10.2265H9.15742C7.1744 12.7973 4.2157 14.4897 0 14.8737V10.2909C0 10.2909 2.69688 10.1318 4.2823 8.46715H0V3.6607H4.81285V7.61393L4.92087 7.61349L6.88757 3.6607H10.5274V7.58887L10.6354 7.58869L12.6759 3.66061H18Z" fill="#A6A6A6"></path>
              </svg>
            </div>
            <div class="text-decoration-none">Try on Webflow</div>
          </a>
        </div>
      </div >
    </div > `;
    container.append(html);
  }

  function convertText(text) {
    $('.table_item-title').each(function() {
      const index = $(this).data('font-index');
      const font = displayedFonts[index];
      if (font) {
        $(this).text(text.trim() ? font.convert(text) : font.convert(font.name));
      }
    });
  }

  function updateUI() {
    const inputText = $('#input-text-area').val();
    if (inputText) {
      convertText(inputText);
    }

    $('[data-copy-btn]').off('click').on('click', function() {
      const text = $(this).closest('.table_item').find('.table_item-title').text();
      navigator.clipboard.writeText(text).then(() => {
        $(this).find('.text-decoration-none').text("Copied!");
        setTimeout(() => {
          $(this).find('.text-decoration-none').text("Copy font");
        }, 1000);
      });
    });
  }

  async function displayFonts(limit, category = currentCategory) {
    try {
      if (!fontsCache[category]) {
        const response = await fetch('fonts.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fontsCache[category] = await response.json();
      }

      if (category !== currentCategory) {
        currentIndex = 0;
        currentCategory = category;
        container.empty();
      }

      const fonts = fontsCache[category].filter(font => font.category === category || category === 'Free-font-generator');

      for (let i = currentIndex; i < currentIndex + limit && i < fonts.length; i++) {
        const font = new PseudoFont(fonts[i]);
        displayedFonts[i] = font;
        addFontToHTML(font, i);
      }

      currentIndex += limit;
      updateUI();

      if (currentIndex >= fonts.length) {
        $('#load-more').hide();
      } else {
        $('#load-more').show();
      }
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  }

  $('#input-text-area').on('input', function () {
    const text = $(this).val();
    convertText(text);
  });

  function getCategoryFromPath() {
    const path = window.location.pathname.split('/').pop();
    return path.charAt(0).toUpperCase() + path.slice(1) || 'Free-font-generator';
  }

  currentCategory = getCategoryFromPath();
  displayFonts(15, currentCategory);

  $('#load-more').click(function () {
    displayFonts(30);
  });
}