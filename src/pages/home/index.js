export default function homePage() {
  const container = $('.table_body')
  let currentIndex = 0; // To track the current index of fonts displayed
  let displayedFonts = []; // Store displayed PseudoFont objects for later reference
  let currentCategory = 'All';

  String.prototype.unicodeAwareSplit = function () {
    return [...this];
  }

  class PseudoFont {
    constructor(fontName, fontLower, fontUpper, fontDigits, fontCategory) {
      this.fontName = fontName;
      this.fontCategory = fontCategory;
      this.fontLower = Array.isArray(fontLower) ? fontLower : fontLower.unicodeAwareSplit();
      this.fontUpper = Array.isArray(fontUpper) ? fontUpper : fontUpper.unicodeAwareSplit();
      this.fontDigits = Array.isArray(fontDigits) ? fontDigits : fontDigits.unicodeAwareSplit();
      this.referenceLower = "abcdefghijklmnopqrstuvwxyz";
      this.referenceUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      this.referenceDigits = "0123456789";
    }

    convert(rawText) {
      return rawText.split('').map(char => {
        if (this.referenceLower.includes(char)) {
          return this.fontLower[this.referenceLower.indexOf(char)];
        } else if (this.referenceUpper.includes(char)) {
          return this.fontUpper[this.referenceUpper.indexOf(char)];
        } else if (this.referenceDigits.includes(char)) {
          return this.fontDigits[this.referenceDigits.indexOf(char)];
        } else {
          return char;
        }
      }).join('');
    }
  }

  function addFontToHTML(_newFont, index) {
    let html = `
      <div class="table_item">
        <div class="table_item-title" data-font-index="${index}">${_newFont.convert(_newFont.fontName)}</div>
        <div class="table_item-footer">
          <div class="table_item-settings">
            <div>${_newFont.fontName}</div>
            <div>${_newFont.fontCategory}</div>
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

  async function displayFonts(limit, category = currentCategory) {
    const response = await fetch('https://uploads-ssl.webflow.com/661fb3747104d7cfc84a31a5/6627337a03be82eb49dbc40f_fonts.json.txt');
    const _fonts = await response.text();
    if (category !== currentCategory) {
      currentIndex = 0; // Reset index if category changes
      currentCategory = category;
    }

    let maxIndex = currentIndex + limit;
    displayedFonts = JSON.parse(_fonts).filter(font => font.fontCategory === category || category === 'All');
    while (currentIndex < maxIndex && currentIndex < displayedFonts.length) {
      const _font = displayedFonts[currentIndex];
      let _newFont = new PseudoFont(_font.fontName, _font.fontLower, _font.fontUpper, _font.fontDigits, _font.fontCategory);
      addFontToHTML(_newFont, currentIndex);
      currentIndex++;
    }

    const inputText = $('#input-text-area').val();
    if (inputText) {
      convertText(inputText);
    }

    // Hide the load-more button if there are no more fonts to display
    if (currentIndex >= displayedFonts.length) {
      $('#load-more').hide();
    } else {
      $('#load-more').show();
    }
  }

  $('#input-text-area').on('input', function () {
    const text = $(this).val();
    convertText(text);
  });

  function convertText(text) {
    $('.table_item-title').each(function () {
      const index = $(this).data('font-index');
      const _font = displayedFonts[index];
      let _newFont = new PseudoFont(_font.fontName, _font.fontLower, _font.fontUpper, _font.fontDigits, _font.fontCategory);

      if (text.trim().length > 0) {
        // Only convert text if there is something to convert
        $(this).text(_newFont.convert(text));
      } else {
        // If input is empty, revert to displaying the default font name
        $(this).text(_newFont.convert(_newFont.fontName));
      }
    });
  }

  $('[data-filter-item]').click(function () {
    const category = $(this).attr('data-filter-item');
    $('[data-filter-item]').removeClass('is-active').attr('disabled', false);
    $(this).addClass('is-active').attr('disabled', true);
    container.empty(); // Clear the container before adding new fonts
    displayFonts(15, category); // Initial display with 15 fonts
  });

  // Initial display of 15 fonts
  displayFonts(15);

  $('#load-more').click(function () {
    displayFonts(30);
  });
}