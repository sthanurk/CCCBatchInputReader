//Auto tab to next cell while entering data in table
function auto_tab(from_input) {
	var temp = from_input.id;
	var to_input = "c" + Number(Number(temp.slice(1)) + 1);
	var len = from_input.value.length;
	var maxlen = from_input.getAttribute("maxlength");
	if (len == maxlen) {
		document.getElementById(to_input).focus();
	}
}
//function to make the input size vary based on it's maxlength
(function() {
	var i;
	var k = document.getElementsByTagName("td").length - 1; //subtracting 1 since a <td> for Signer Type is used
	for (i = 1; i <= k; i++) {
		var x = '';
		x = document.getElementById("c" + i);
		if (x.maxLength <= 15) {
			x.style.width = x.maxLength * 10 + 'px';
		}
		if (i == 4) {
			x.style.width = x.maxLength * 8 + 'px';
			//x.style.direction = "RTL"; //only for Account number the input is filled from right to left.
		}
		if (x.maxLength > 15 && x.id != "c4") {
			x.style.width = "80px";
		}
		if (x.id == "c24" || x.id == "c26" || x.id == "c29" || x.id == "c41" || x.id == "c47" || x.id == "c61" || x.id == "c63" || x.id == "c78" || x.id == "c79" || x.id == "c80" || x.id == "c81" || x.id == "c82" || x.id == "c83" || x.id == "c103" || x.id == "c104" || x.id == "c105" || x.id == "c106" || x.id == "c113" || x.id == "c114" || x.id == "c115" || x.id == "c117" || x.id == "c124" || x.id == "c129" || x.id == "c134" || x.id == "c139" || x.id == "c146" || x.id == "c147" || x.id == "c148" || x.id == "c149" || x.id == "c150") {
			x.style.width = "8px";
		}
	}
	//Give title for each input field
	for (i=0;i<=k;i++) {
	var cell_content = document.getElementById('results_table').rows[0].cells[i].innerText;
	document.getElementById('results_table').rows[1].cells[i].title=cell_content;
	}
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/ false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	if (isIE == true || isEdge == true) {
		var hide_gen_btn = document.getElementById("ac_count");
		hide_gen_btn.style.display = "none";
		var hide_gen_btn = document.getElementsByTagName("p");
		hide_gen_btn[1].style.display = "none";
		var hide_gen_btn = document.getElementById("export_content");
		hide_gen_btn.style.display = "none";
	}
	//var isChrome = !!window.chrome && !!window.chrome.webstore;
	if (isIE != true) {
		var hide_gen_btn = document.getElementById("generate_record_in_IE");
		hide_gen_btn.style.display = "none";
	}
})();
//Highlight error cells in red
function error_cells() {
	var all_cells = document.querySelectorAll('[id^="c"]'); //ids beginning with "c"
	var n = document.getElementById('results_table').rows[0].cells.length - 1; //subtracting 1 since a <td> for Signer Type is used
	for (i = 0; i < all_cells.length; i++) {
		var max = all_cells[i].maxLength;
		var first_char = all_cells[i].value[0];
		var last_char = all_cells[i].value[max - 1];
		var letters = all_cells[i].value.replace(/\s/g, ""); //replace all white spaces with nothing
		if (first_char == " " && last_char == " " && letters.length != 0) {
			all_cells[i].style.borderColor = "red";
			// var row = all_cells[i].parentNode.parentNode.id;
			// var row_no = Number(row.slice(1));
			// var limit = (row_no * n);
			// for (j = i; j < limit; j++) {
			// all_cells[j].style.borderColor = "red";
			// }
		} else {
			all_cells[i].style.border = "0.5px solid rgba(169, 169, 169, 1)";
			all_cells[i].style.boxShadow = "none";
			all_cells[i].style.padding = "1px";
			all_cells[i].style.margin = "1px";
		}
	}
}
//Add new reow below the last row
function newrecord(event_type) {
	var x = document.getElementById('results_table');
	var len = x.rows.length - 1; // get the total number of rows without header
	// get the total number of columns
	var col = x.rows[0].cells.length;
	// get the total number of ids to be used
	var n = len * col;
	// deep clone the targeted row
	var new_row = x.rows[len].cloneNode(true);
	// append the new row to the table
	x.appendChild(new_row);
	var current_row = x.rows[len + 1];
	var temp = len + 1;
	current_row.id = "r" + temp;
	var new_cell = [];
	for (var i = 0; i < col; i++) {
		new_cell[i] = x.rows[len + 1].cells[i].getElementsByTagName("input")[0];
		var value = n + 1 + i;
		new_cell[i].id = "c" + value;
		new_cell[i].style.border = "0.5px solid rgba(169, 169, 169, 1)";
		new_cell[i].style.boxShadow = "none";
		new_cell[i].style.padding = "1px";
		new_cell[i].style.margin = "1px";
		//new_cell[i].value = '';
		var previous_acno = x.rows[len].cells[3].getElementsByTagName("input")[0].value;
		var newvalue = parseInt(previous_acno, 10) + 1;
		var spaces = 20 - newvalue.toString().length;
		if (value % col == 4 && new_cell[i].value != new_cell[i - 1].value && isNaN(newvalue) != true) {
			new_cell[i].value = '';
			for (s = 1; s <= spaces; s++) {
				new_cell[i].value = new_cell[i].value + ' ';
			}
			new_cell[i].value = new_cell[i].value + newvalue;
		}
		var previous_signer_type = x.rows[len].cells[7].getElementsByTagName("input")[0].value; 
		if (value % col == 13 &&  previous_signer_type== "C") {
			var previous_ssn = x.rows[len].cells[12].getElementsByTagName("input")[0].value;
			new_cell[i].value = parseInt(previous_ssn, 10) + 1;
		}
		if (value % col == 27 &&  previous_signer_type== "B") {
			var previous_ein = x.rows[len].cells[26].getElementsByTagName("input")[0].value;
			new_cell[i].value = parseInt(previous_ein, 10) + 1;
		}
	}
	if (event_type == "new_record_btn") {
		table_to_text();
	}
}
//Insert a new row to the table when enter key is pressed while insertion point is in the element "textarea".
function enterpressalert(e, textarea) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) {
		newrecord("create");
	}
}
//Copy text present in textarea and paste it in table
function text_to_table() {
	var batch_text = document.getElementById("batch_full").value;
	var length_covered = 0;
	var n = document.getElementById('results_table').rows[0].cells.length;
	var rownos = document.getElementById('results_table').rows.length - 1; //subtracting 1 to exclude header row 
	var type = document.getElementById("Signer_Type_1");
	var article = new Array();
	var temp;
	var len = 0;
	/*
	/\n/g is a regular expression meaning 'look for the character \n (line break), and do it globally (across the whole string).
	The ||[] part is just in case there are no line breaks. Match will return null, so we test the length of an empty array instead to avoid errors.
	*/
	var numberOfLineBreaks = (batch_text.match(/\n/g) || []).length;
	if (numberOfLineBreaks >= rownos) {
		var differnece = numberOfLineBreaks - rownos
		for (z = 0; z <= differnece; z++) {
			newrecord("create");
		}
	}
	if (rownos > numberOfLineBreaks) {
		var del_count = rownos - numberOfLineBreaks - 1;
		var table = document.getElementById('results_table');
		for (z = 0; z < del_count; z++) {
			table.deleteRow(rownos - z);
		}
	}
	var text = batch_text.replace(/(\r\n|\n|\r)/gm, "");
	var indicator = new Array();
	var k = 0;
	do {
		for (var i = 1; i <= n; i++) {
			var a = (k * n) + i;
			article[a] = document.getElementById("c" + a);
			len = article[a].getAttribute('maxLength');
			temp = text.substr(length_covered, len);
			article[a].value = temp;
			length_covered = Number(length_covered) + Number(len);
		}
		k++;
	} while (k <= numberOfLineBreaks);
	error_cells();
}
//Copy text present in table and paste it in textarea
function table_to_text() {
	var j;
	var batch_text = document.getElementById("batch_full");
	var c = document.querySelectorAll('[id^="c"]').length; //ids beginning with "c"
	var n = document.getElementById('results_table').rows[0].cells.length;
	var z = '';
	var article1 = new Array();
	for (j = 1; j <= c; j++) {
		if (j % n == 1 && j != 1) {
			z = z + '\n';
		}
		article1[j] = document.getElementById("c" + j).value;
		z = z + article1[j];
	}
	batch_text.value = z;
	batch_text.scrollTop = batch_text.scrollHeight;
}

function generate_accnos_x() {
	var count = document.getElementById('ac_count').value;
	for (g = 1; g < count; g++) {
		newrecord("create");
	}
}
//Generate new records based on input with successive account numbers
function generate_accnos() {
	var batch_text = document.getElementById("batch_full").value;
	var start_acno = batch_text.substr(19, 20);
	var signer_type = batch_text.substr(49, 1);
	if (signer_type== "C") {
		var start_ssn = batch_text.substr(93, 9);
	}
	if (signer_type== "B") {
		var start_ssn = batch_text.substr(253, 9);
	}	
	var count = document.getElementById('ac_count').value;
	var myElem = document.getElementById('generated_text');
	if (myElem != null) {
		myElem.remove();
	}
	var hidden_textarea = document.createElement("textarea");
	hidden_textarea.id = "generated_text";
	hidden_textarea.wrap = "off";
	var text = batch_text.replace(/(\r\n|\n|\r)/gm, "");
	hidden_textarea.value = text;
	var new_acno = parseInt(start_acno, 10);
	if (start_ssn != '         ') {
		var new_ssn = parseInt(start_ssn, 10);
	} else {
		var new_ssn = '         ';
	}
	for (g = 1; g < count; g++) {
		new_acno = parseInt(new_acno, 10);
		new_acno = new_acno + 1;
		if (start_ssn != '         ') {
			new_ssn = parseInt(new_ssn, 10);
			new_ssn = new_ssn + 1;
		}
		var spaces = 20 - new_acno.toString().length;
		var empty_space = '';
		for (s = 1; s <= spaces; s++) {
			empty_space = empty_space + ' ';
		}
		new_acno = empty_space + new_acno;
		text = text.replace(text.substr(19, 20), new_acno);
		if (signer_type== "C") {
			text = text.replace(text.substr(93, 9), new_ssn);
		}
		if (signer_type== "B") {
			text = text.replace(text.substr(253, 9), new_ssn);
		}
		hidden_textarea.value += "\n";
		hidden_textarea.value += text;
	}
	document.body.appendChild(hidden_textarea);
	hidden_textarea.style.display = "none";
}
//highlight current row with green border
function highlight_row(cur_row) {
	var x = document.getElementById('results_table');
	var len = x.rows.length - 1; // get the total number of rows without header
	var n = x.rows[0].cells.length;
	var temp = cur_row.id;
	temp = Number(Number(temp.slice(1)));
	for (j = 1; j <= len; j++) {
		if (j == temp) {
			current_cols = cur_row.querySelectorAll('[id^="c"]');
			for (i = 0; i < n; i++) {
				current_cols[i].style.border = "1px solid rgba(140, 198, 63, 1)";
				current_cols[i].style.boxShadow = "0 0 5px rgba(140, 198, 63, 1)";
				current_cols[i].style.padding = "3px 0px 3px 3px";
				current_cols[i].style.margin = "5px 1px 3px 0px";
			}
		} else {
			var temp1 = "r" + j;
			var not_cur_row = document.getElementById(temp1);
			current_cols = not_cur_row.querySelectorAll('[id^="c"]');
			for (i = 0; i < n; i++) {
				current_cols[i].style.border = "0.5px solid rgba(169, 169, 169, 1)";
				current_cols[i].style.boxShadow = "none";
				current_cols[i].style.padding = "1px";
				current_cols[i].style.margin = "1px";
			}
		}
	}
}

function loadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("batch_full").value = textFromFileLoaded;
		text_to_table();
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

function saveTextAsFile(clicked_button) {
	if (clicked_button == "export_content") {
		var textToSave = document.getElementById("batch_full").value;
	} else if (clicked_button == "export_series") {
		var textToSave = document.getElementById("generated_text").value;
	}
	var textToSaveAsBlob = new Blob([textToSave], {
		type: "text/plain"
	});
	var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
	var fileNameToSaveAs = "CCC2017_2009R";
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	downloadLink.href = textToSaveAsURL;
	downloadLink.onclick = destroyClickedElement;
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);
	downloadLink.click();
}
// All the code of functions : Writedata, Maxlength_Verify()  has been contributed my Naga
function Writedata() {
	var batch_text = document.getElementById("batch_full").value;
	var length_covered = 0;
	var n = document.getElementById('results_table').rows[0].cells.length;
	var rownos = document.getElementById('results_table').rows.length - 1; //subtracting 1 to exclude header row 
	var type = document.getElementById("Signer_Type_1");
	var article = new Array();
	var temp;
	var len = 0;
	/*
	/\n/g is a regular expression meaning 'look for the character \n (line break), and do it globally (across the whole string).
	The ||[] part is just in case there are no line breaks. Match will return null, so we test the length of an empty array instead to avoid errors.
	*/
	var numberOfLineBreaks = (batch_text.match(/\n/g) || []).length;
	if (numberOfLineBreaks > rownos) {
		var differnece = numberOfLineBreaks - rownos
		for (z = 0; z < differnece; z++) {
			newrecord("create");
		}
	}
	var text = batch_text.replace(/(\r\n|\n|\r)/gm, "");
	var cut = (n * numberOfLineBreaks) + 1;
	var indicator = new Array();
	var k = 0;
	// var recordnos = document.getElementsByTagName("tr").length-1; console.log(recordnos);
	do {
		for (var i = 1; i <= n; i++) {
			var a = (k * n) + i;
			if (a === cut && numberOfLineBreaks != 0) {
				break;
			}
			article[a] = document.getElementById("c" + a);
			len = article[a].getAttribute('maxLength');
			temp = text.substr(length_covered, len);
			article[a].value = temp;
			length_covered = Number(length_covered) + Number(len);
		}
		k++;
	} while (k <= numberOfLineBreaks);
	error_cells();
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var write_id;
	write_id = document.getElementById('write_id').value;
	alert('The data has been written to \n' + write_id);
	var s = fso.CreateTextFile(write_id, true);
	var count = (document.getElementById('id_id').value);
	var can;
	var newvalue = parseInt(article[4].value, 10);
	var newFN = article[10].value; //--For ConsumerFirst-Name
	var newBN = article[25].value; //--For Business-Name
	var type = article[8].value; //B or C
	var newSSN = parseInt(article[13].value, 10); //Taking SSN value from Array
	var federalTaxID = parseInt(article[27].value, 10); //Federal Tax ID for Business record 
	while (count > 0) {
		var totalstr;
		totalstr = '';
		for (i = 1; i <= 150; i++) {
			if (i == 4) {
				var spaces = 20 - newvalue.toString().length;
				can = '';
				for (j = 1; j <= spaces; j++) {
					can = can + ' ';
				}
				can = can + newvalue;
				totalstr = totalstr + can;
				newvalue = newvalue + 1;
			}
			//ConsumerFirst Name increment
			else if (i == 10 && type == 'C') {
				String.prototype.replaceAt = function(index, character) {
					return this.substring(0, index) + character + this.substring(index + 1, newFN.length);
				}
				if (count < 26) {
					//oth position
					var a1 = count % 26;
					var re1 = a1 + 65;
					var res = String.fromCharCode(re1);
					newFN = newFN.replaceAt(0, res);
					//1st postion
					var ndplace = 65;
					var res2 = String.fromCharCode(ndplace);
					newFN = newFN.replaceAt(1, res2);
				}
				if (count < 676 && count >= 26) {
					//1st position
					var temp2 = count / 26;
					a2 = Math.floor(temp2);
					var re2 = a2 + 65;
					var res2 = String.fromCharCode(re2);
					newFN = newFN.replaceAt(1, res2);
					//0th position
					var a1 = count % 26;
					var re1 = a1 + 65;
					var res = String.fromCharCode(re1);
					newFN = newFN.replaceAt(0, res);
					//2ndpostion
					var ndplace = 65;
					var res3 = String.fromCharCode(ndplace);
					newFN = newFN.replaceAt(2, res3);
				}
				if (count < 17576 && count >= 676) {
					//2nd position
					var temp3 = count / 676;
					a3 = Math.floor(temp3);
					var re3 = a3 + 65;
					var res3 = String.fromCharCode(re3);
					newFN = newFN.replaceAt(2, res3);
					//1st position
					var temp2 = count % 676;
					var tem2 = temp2 / 26;
					a2 = Math.floor(tem2);
					var re2 = a2 + 65;
					var res2 = String.fromCharCode(re2);
					newFN = newFN.replaceAt(1, res2);
					//0th position
					var a1 = count % 26;
					var re1 = a1 + 65;
					var res = String.fromCharCode(re1);
					newFN = newFN.replaceAt(0, res);
					//3rdpostion
					var ndplace = 65;
					var res4 = String.fromCharCode(ndplace);
					newFN = newFN.replaceAt(3, res4);
				}
				if (count < 456976 && count >= 17576) {
					//3rd position
					var temp4 = count / 17576;
					a4 = Math.floor(temp4);
					var re4 = a4 + 65;
					var res4 = String.fromCharCode(re4);
					newFN = newFN.replaceAt(3, res4);
					//2nd position
					var temp3 = count % 17576;
					var tem3 = temp3 / 676;
					a3 = Math.floor(tem3);
					var re3 = a3 + 65;
					var res3 = String.fromCharCode(re3);
					newFN = newFN.replaceAt(2, res3);
					//1st position
					var temp2 = count % 17576;
					var tem2 = temp2 % 676;
					var te2 = tem2 / 26;
					a2 = Math.floor(te2);
					var re2 = a2 + 65;
					var res2 = String.fromCharCode(re2);
					newFN = newFN.replaceAt(1, res2);
					//0th position
					var a1 = count % 26;
					var re1 = a1 + 65;
					var res = String.fromCharCode(re1);
					newFN = newFN.replaceAt(0, res);
					//4rdpostion
					var ndplace = 65;
					var res5 = String.fromCharCode(ndplace);
					newFN = newFN.replaceAt(4, res5);
				}
				totalstr = totalstr + newFN;
			}
			//Business name Auto increment
			else if (i == 25 && type == 'B') {
				String.prototype.replaceAt = function(index, character) {
					return this.substring(0, index) + character + this.substring(index + 1, newBN.length);
				}
				if (count < 26) {
					//oth position
					var a1 = count % 26;
					var re1 = a1 + 65;
					var res = String.fromCharCode(re1);
					newBN = newBN.replaceAt(0, res);
					//1st postion
					var ndplace = 65;
					var res2 = String.fromCharCode(ndplace);
					newBN = newBN.replaceAt(1, res2);
				}
				if (count < 676 && count >= 26) {
					//1st position
					var temp2 = count / 26;
					a2 = Math.floor(temp2);
					var re2 = a2 + 65;
					var res2 = String.fromCharCode(re2);
					newBN = newBN.replaceAt(1, res2);
					//0th position
					var a1 = count % 26;
					var re1 = a1 + 65;
					var res = String.fromCharCode(re1);
					newBN = newBN.replaceAt(0, res);
					//2ndpostion
					var ndplace = 65;
					var res3 = String.fromCharCode(ndplace);
					newBN = newBN.replaceAt(2, res3);
				}
				if (count < 17576 && count >= 676) {
					//2nd position
					var temp3 = count / 676;
					a3 = Math.floor(temp3);
					var re3 = a3 + 65;
					var res3 = String.fromCharCode(re3);
					newBN = newBN.replaceAt(2, res3);
					//1st position
					var temp2 = count % 676;
					var tem2 = temp2 / 26;
					a2 = Math.floor(tem2);
					var re2 = a2 + 65;
					var res2 = String.fromCharCode(re2);
					newBN = newBN.replaceAt(1, res2);
					//0th position
					var a1 = count % 26;
					var re1 = a1 + 65;
					var res = String.fromCharCode(re1);
					newBN = newBN.replaceAt(0, res);
					//3rdpostion
					var ndplace = 65;
					var res4 = String.fromCharCode(ndplace);
					newBN = newBN.replaceAt(3, res4);
				}
				if (count < 456976 && count >= 17576) {
					//3rd position
					var temp4 = count / 17576;
					a4 = Math.floor(temp4);
					var re4 = a4 + 65;
					var res4 = String.fromCharCode(re4);
					newBN = newBN.replaceAt(3, res4);
					//2nd position
					var temp3 = count % 17576;
					var tem3 = temp3 / 676;
					a3 = Math.floor(tem3);
					var re3 = a3 + 65;
					var res3 = String.fromCharCode(re3);
					newBN = newBN.replaceAt(2, res3);
					//1st position
					var temp2 = count % 17576;
					var tem2 = temp2 % 676;
					var te2 = tem2 / 26;
					a2 = Math.floor(te2);
					var re2 = a2 + 65;
					var res2 = String.fromCharCode(re2);
					newBN = newBN.replaceAt(1, res2);
					//0th position
					var a1 = count % 26;
					var re1 = a1 + 65;
					var res = String.fromCharCode(re1);
					newBN = newBN.replaceAt(0, res);
					//4rdpostion
					var ndplace = 65;
					var res5 = String.fromCharCode(ndplace);
					newBN = newBN.replaceAt(4, res5);
				}
				totalstr = totalstr + newBN;
			}
			//SSN Auto Increment for Consumer record
			else if (i == 13 && type == 'C') {
				totalstr = totalstr + newSSN;
				newSSN = newSSN + 1;
			}
			//federalTaxID Auto Increment for Business record
			else if (i == 27 && type == 'B') {
				totalstr = totalstr + federalTaxID;
				federalTaxID = federalTaxID + 1;
			} else {
				ci = article[i].value;
				totalstr = totalstr + ci;
			}
		}
		s.writeline(totalstr);
		count = count - 1;
	}
	s.Close();
	var path = document.getElementById("open_path");
	var last_char = write_id.charAt(write_id.length-1); //find the last character of the Output Path
	write_id = write_id.replace(/\\/g,"/"); 
	var path_len = write_id.lastIndexOf("/");
	var final_path = write_id.substr(0,path_len+1);
	path.href = "file:///"+final_path;
}

function Maxlength_Verify() {
	var batch_text = document.getElementById("batch_full").value;
	var batch_length = batch_text.toString().length; // find the total no. of characters in batch_text. 1 character for every "\n". 
	
	var numberOfLineBreaks = (batch_text.match(/\n/g) || []).length;
	var array = new Array();
	var split = batch_text.replace(/(\r\n|\n|\r)/gm, "~"); // Replace all "\n" with "~". "~" is chosen since it is the least used symbol.
	var index = 0;
	var len = 0;
	var length = 0;
	var error_count = 0;
	var j = new Array();
	var n=0;
	var n;
	var balen = batch_length - 1; 
	var charA = batch_text.charAt(balen); //find the value of the last character 
	if (charA != "\n") { //if the last character is not a line break, add 1 to the count of linebreaks
		numberOfLineBreaks = numberOfLineBreaks + 1;
	}
	for (var i = 0; i < numberOfLineBreaks; i++) {
		var pos = split.indexOf("~", index);
		if (pos == -1) { //if no line breaks are present.
			var pos = len + 1;
			var len = batch_length - index;
			temp = split.substr(index, len);
			array.push(temp);
		} else {
			len = pos - index;
			temp = split.substr(index, len);
			array.push(temp);
			index = pos + 1;
		}
	}
	//Looping for each record length
	for (var i = 0; i < array.length; i++) {
		var arlen = array[i];
		var arlength = arlen.toString().length;
		
		if (arlength != 2109) {
			error_count += 1;
			j[n] = i + 1;
			n++;
		}
	}
	if (error_count == numberOfLineBreaks && batch_text!="") {
		alert("Please input the records in 2009R Format.");
	}	
	if (error_count>0 && error_count < numberOfLineBreaks) {
		alert("The following records are incomplete : "+j.toString());
	}	
}
