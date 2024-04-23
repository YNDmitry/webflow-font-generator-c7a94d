export default function homePage() {
  const container = $('.table_body')
  const jsonFonts = 'https://uploads-ssl.webflow.com/661fb3747104d7cfc84a31a5/6627337a03be82eb49dbc40f_fonts.json.txt'
  const fonts = [];   // all fonts

  $.fn.extend({
    unicodeAwareSplit: function () {
      let _arr = [];
      for (const _c of this.val()) {
        _arr.push(_c);
      }
      return _arr;
    }
  });

  // /* PseudoFont: Unicode Font Parser & Converter */
  class PseudoFont {
    constructor(fontName, fontLower, fontUpper, fontDigits, fontCategory) {
      this.fontName = fontName;

      // splitting if not already an array, otherwise JavaScript won't handle the characters properly.
      this.fontLower = Array.isArray(fontLower) ? fontLower : unicodeAwareSplit(fontLower);
      this.fontUpper = Array.isArray(fontUpper) ? fontUpper : unicodeAwareSplit(fontUpper);
      this.fontDigits = Array.isArray(fontDigits) ? fontDigits : unicodeAwareSplit(fontDigits);
      this.fontCategory = Array.isArray(fontCategory) ? fontCategory : unicodeAwareSplit(fontCategory);

      this.referenceLower = "abcdefghijklmnopqrstuvwxyz";
      this.referenceUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      this.referenceDigits = "0123456789";
    }

    convert(rawText) {
      let _converted = "";
      for (const _char of rawText) {
        if (this.referenceLower.includes(_char)) {
          // if character is lowercase
          _converted += this.fontLower[this.referenceLower.indexOf(_char)];
        } else if (this.referenceUpper.includes(_char)) {
          // if character is uppercase
          _converted += this.fontUpper[this.referenceUpper.indexOf(_char)];
        } else if (this.referenceDigits.includes(_char)) {
          // if character is digit
          _converted += this.fontDigits[this.referenceDigits.indexOf(_char)];
        } else {
          _converted += _char;
        }
      }
      return _converted;
    }
  }

  function unicodeAwareSplit(str) {
    let _arr = [];
    for (let i = 0; i < str.length; i++) {
      _arr.push(str[i]);
    }
    return _arr;
  }

  $.get(jsonFonts, function (_fontFiles) {
    JSON.parse(_fontFiles).forEach(function (_font) {
      // make a new pseudofont object.
      let _newFont = new PseudoFont(
        _font['fontName'],
        _font['fontLower'] || 'abcdefghijklmnopqrstuvwxyz',
        _font['fontUpper'] || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        _font['fontDigits'] || '0123456789',
        _font['fontCategory'] || ''
      );

      // add the font to the font list.
      fonts.push(_newFont);

      let html = `
				<div class="table_item">
					<div class="table_item-title" style="font-family: Picsart-Fonts, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Helvetica, Arabic, sans-serif;">${_newFont.convert(_newFont.fontName)}</div>
					<div class="table_item-footer">
						<div class="table_item-settings">
							<div>${_newFont.fontName})</div>
							<div data-hover="false" data-delay="0" class="table_item-dd w-dropdown">
								<div class="table_item-dd-toggle w-dropdown-toggle" id="w-dropdown-toggle-${_newFont.fontName}" aria-controls="w-dropdown-list-${_newFont.fontName}" aria-haspopup="menu" aria-expanded="false" role="button" tabindex="0">
									<div>Regular</div>
									<div class="icon-embed-xxsmall w-embed">
										<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
<path d="M13.3538 6.35375L8.35378 11.3538C8.30734 11.4002 8.2522 11.4371 8.1915 11.4623C8.1308 11.4874 8.06574 11.5004 8.00003 11.5004C7.93432 11.5004 7.86926 11.4874 7.80856 11.4623C7.74786 11.4371 7.69271 11.4002 7.64628 11.3538L2.64628 6.35375C2.57627 6.28382 2.52859 6.1947 2.50926 6.09765C2.48994 6.00061 2.49984 5.90002 2.53772 5.8086C2.57559 5.71719 2.63974 5.63908 2.72204 5.58414C2.80433 5.5292 2.90108 5.49992 3.00003 5.5H13C13.099 5.49992 13.1957 5.5292 13.278 5.58414C13.3603 5.63908 13.4245 5.71719 13.4623 5.8086C13.5002 5.90002 13.5101 6.00061 13.4908 6.09765C13.4715 6.1947 13.4238 6.28382 13.3538 6.35375Z" fill="currentColor"></path>
</svg>
									</div>
								</div>
								<nav class="table_item-dd-list w-dropdown-list" id="w-dropdown-list-${_newFont.fontName}" aria-labelledby="w-dropdown-toggle-${_newFont.fontName}">
									<a href="#" class="w-dropdown-link" tabindex="0">Link 1</a>
									<a href="#" class="w-dropdown-link" tabindex="0">Link 2</a>
									<a href="#" class="w-dropdown-link" tabindex="0">Link 3</a>
								</nav>
							</div>
							<div>Basic</div>
						</div >
    <div class="table_item-buttons">
      <a href="#" class="button_small w-inline-block">
        <div class="button_small-ico w-embed">
          <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25M5.25 7.5L9 11.25M9 11.25L12.75 7.5M9 11.25V2.25" stroke="#A6A6A6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
        <div class="text-decoration-none">Copy font</div>
      </a>
      <a href="#" class="button_small w-inline-block">
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

      container.append(html)

      // add the font to the fonts selection list.
      // let _newFontOption = $('<option></option>');
      // _newFontOption.val(_newFont.fontName);
      // if (_newFont.experimental) {
      // 	_newFontOption.html(`${ _newFont.fontName }[EXPERIMENTAL]`);
      // } else {
      // 	_newFontOption.html(`${ _newFont.fontName }(${ _newFont.convert(_newFont.fontName) })`);
      // }
      // e_fontSelect.append(_newFontOption);
    });

    // 	// enable the text area once the fonts have been loaded.
    e_inputTextArea.prop('disabled', false);

    // 	// show how many fonts are loaded inside parenthesis
    // 	//e_viewAllConversions.text(`View All Fonts(${ fonts.length })`);
    // 	e_viewAllConversions.text(`View All Fonts(${ fonts.filter(x => !x.experimental).length })`);  // excluding experimental fonts

    // 	// select a random font to show at start.
    // 	e_fontSelect.prop('selectedIndex', Math.floor(Math.random() * fonts.length));

    // 	// update all variables and convert the first text.
    // 	updateUserInput();
    // 	updateFontInput();
    // 	convertText();
    // });

    // /* Event Listeners */
    // // Convert text on update of the text field.
    // e_inputTextArea.on('keyup', function () {
    // 	updateUserInput();
    // 	convertTextAll();
    // });

    // // Convert text when font is changed from the list.
    // e_fontSelect.on('change', function () {
    // 	updateFontInput();
    // 	convertText();
    // });

    // // Convert text when font style is changed from the list.
    // e_fontStyleSelect.on('change', function () {
    // 	updateFontInput();
    // 	updateUserInput();
    // 	convertText();
    // });

    // // Get rid of the accessibility warning on click.
    // e_accessibilityWarning.on('click', function () {
    // 	e_accessibilityWarning.css('display', 'none');
    // });

    // // Copy content to clipboard if the user clicks on the converted text.
    // e_outputText.on('click', function () {
    // 	let _range = document.createRange();
    // 	window.getSelection().removeAllRanges();
    // 	_range.selectNode(e_outputText.get(0));
    // 	window.getSelection().addRange(_range);
    // 	document.execCommand('copy');
    // 	window.getSelection().removeAllRanges();

    // 	// To-Do: replace this with a less annoying pop-up later.
    // 	alert("Copied to clipboard!");
    // });

    // /* Update Functions */
    function updateUserInput() {
      let _userInput = e_inputTextArea.val();
      if (_userInput.trim()) {
        userInput = _userInput;
      }

      switch (selectedStyle) {
        case "shift-upper":
          userInput = userInput.toUpperCase();
          break;
        case "shift-lower":
          userInput = userInput.toLowerCase();
          break;
        case "shift-alternate":
          userInput = $.toAlternateCase(userInput);
          break;
        case "spaced":
          userInput = userInput.split('').join(' ');
          break;
        case "reverse":
          userInput = userInput.split('').reverse().join('');
          break;
      }
    }

    function updateFontInput() {
      // update the selected font and its style.
      selectedFont = fonts.find(fnt => fnt.fontName === e_fontSelect.val());
      selectedStyle = e_fontStyleSelect.val();
    }

    // /* Conversion Functions */
    function convertText() {
      // update the main font output.
      e_outputText.html(selectedFont.convert(userInput));
    }
  }, 'text')
}