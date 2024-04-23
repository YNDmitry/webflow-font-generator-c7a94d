// Your code here
export default function homePage() {
	// /* String Extensions */
	$.fn.extend({
		unicodeAwareSplit: function () {
			let _arr = [];
			for (const _c of this.val()) {
				_arr.push(_c);
			}
			return _arr;
		}
	});

	// $.fn.extend({
	// 	toAlternateCase: function () {
	// 		let _arr = [];
	// 		let _alternate = true;
	// 		for (const _c of this.val()) {
	// 			if (_alternate) {
	// 				_alternate = false;
	// 				_arr.push(_c.toUpperCase());
	// 			} else {
	// 				_alternate = true;
	// 				_arr.push(_c.toLowerCase());
	// 			}
	// 		}
	// 		return _arr.join('');
	// 	}
	// });

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

	var convertAll = false;  // конвертировать и отображать все доступные шрифты или нет.
	var randomText = "";  // Рандомный текст
	var userInput = ""; // input от юзера
	var selectedFont = "";  // Шрифт который выбрал юзер
	var selectedStyle = "";  // Выбранный стиль

	// /* Elements */
	const e_inputTextArea = $('#input-text-area');
	// const e_fontSelect = $('#font-select');
	// const e_fontStyleSelect = $('#font-style-select');
	// const e_viewAllConversions = $('#view-all-conversions');

	// const e_outputText = $('#output-text');
	// const e_outputList = $('#output-list');

	// const e_accessibilityWarning = $('#accessibility-warning');


	// // Fetch the fonts.json file and set everything up.
	// // To-Do: add a fallback in case the fonts can't be fetched (in case of running offline or something)
}

// // Split string into array of characters
function unicodeAwareSplit(str) {
	let _arr = [];
	for (let i = 0; i < str.length; i++) {
		_arr.push(str[i]);
	}
	return _arr;
}

const container = $('.table_body')
const fonts = [];   // все шрифты
$.get("https://uploads-ssl.webflow.com/661fb3747104d7cfc84a31a5/6627337a03be82eb49dbc40f_fonts.json.txt", function (_fontFiles) {
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
					<div class="table_item-title">${_newFont.fontName}</div>
					<div class="table_item-footer">
						<div class="table_item-settings">
							<div>${_newFont.fontName}</div>
							<div data-hover="false" data-delay="0" class="table_item-dd w-dropdown">
								<div class="table_item-dd-toggle w-dropdown-toggle" id="w-dropdown-toggle-${_newFont.fontName}" aria-controls="w-dropdown-list-${_newFont.fontName}" aria-haspopup="menu" aria-expanded="false" role="button" tabindex="0">
									<div>Regular</div>
									<div class="icon-embed-xxsmall w-embed">
										<!-- SVG arrow down icon here -->
									</div>
								</div>
								<nav class="table_item-dd-list w-dropdown-list" id="w-dropdown-list-${_newFont.fontName}" aria-labelledby="w-dropdown-toggle-${_newFont.fontName}">
									<a href="#" class="w-dropdown-link" tabindex="0">Link 1</a>
									<a href="#" class="w-dropdown-link" tabindex="0">Link 2</a>
									<a href="#" class="w-dropdown-link" tabindex="0">Link 3</a>
								</nav>
							</div>
							<div>Basic</div>
						</div>
						<div class="table_item-buttons">
							<a href="#" class="button_small w-inline-block">
								<div class="button_small-ico w-embed">
									<!-- SVG copy icon here -->
								</div>
								<div class="text-decoration-none">Copy font</div>
							</a>
							<a href="#" class="button_small w-inline-block">
								<div class="button_small-ico w-embed">
									<!-- SVG Webflow icon here -->
								</div>
								<div class="text-decoration-none">Try on Webflow</div>
							</a>
						</div>
					</div>
				</div>`;

		container.append(html)

		// add the font to the fonts selection list.
		// let _newFontOption = $('<option></option>');
		// _newFontOption.val(_newFont.fontName);
		// if (_newFont.experimental) {
		// 	_newFontOption.html(`${_newFont.fontName} [EXPERIMENTAL]`);
		// } else {
		// 	_newFontOption.html(`${_newFont.fontName} (${_newFont.convert(_newFont.fontName)})`);
		// }
		// e_fontSelect.append(_newFontOption);
	});

	// 	// enable the text area once the fonts have been loaded.
	e_inputTextArea.prop('disabled', false);

	// 	// show how many fonts are loaded inside parenthesis
	// 	//e_viewAllConversions.text(`View All Fonts (${fonts.length})`);
	// 	e_viewAllConversions.text(`View All Fonts (${fonts.filter(x => !x.experimental).length})`);  // excluding experimental fonts

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

	// // Enable/disable whether to convert all fonts or not.
	// e_viewAllConversions.on('click', function () {
	// 	convertAll = (convertAll ? false : true);
	// 	convertTextAll();
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
	// function updateUserInput() {
	// 	let _userInput = e_inputTextArea.val();
	// 	if (_userInput.trim()) {
	// 		userInput = _userInput;
	// 	} else {
	// 		// generate a new random placeholder if the textarea has no value.
	// 		userInput = randomText;
	// 	}

	// 	switch (selectedStyle) {
	// 		case "shift-upper":
	// 			userInput = userInput.toUpperCase();
	// 			break;
	// 		case "shift-lower":
	// 			userInput = userInput.toLowerCase();
	// 			break;
	// 		case "shift-alternate":
	// 			userInput = $.toAlternateCase(userInput);
	// 			break;
	// 		case "spaced":
	// 			userInput = userInput.split('').join(' ');
	// 			break;
	// 		case "reverse":
	// 			userInput = userInput.split('').reverse().join('');
	// 			break;
	// 	}
	// }

	// function updateFontInput() {
	// 	// update the selected font and its style.
	// 	selectedFont = fonts.find(fnt => fnt.fontName === e_fontSelect.val());
	// 	selectedStyle = e_fontStyleSelect.val();
	// }

	// /* Conversion Functions */
	// function convertText() {
	// 	// update the main font output.
	// 	e_outputText.html(selectedFont.convert(userInput));
	// }

	// function convertTextAll() {
	// 	// update the main font output.
	// 	convertText();

	// 	// make sure we convert everything only if the user has clicked the "View All" <detail> tag.
	// 	if (convertAll) {
	// 		// remove all children of the output list
	// 		e_outputList.empty();

	// 		// convert the text and display all available fonts.
	// 		fonts.forEach(function (_font) {
	// 			if (!_font.experimental) {
	// 				let _li = $('<li></li>');
	// 				_li.html(`<p> <b class="unselectable">${_font.fontName}:</b> ${_font.convert(userInput)}</p>`);
	// 				e_outputList.append(_li);
	// 			}
	// 		});
	// 	}
	// }
})
