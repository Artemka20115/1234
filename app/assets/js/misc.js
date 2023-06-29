String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function() {
		return this.replace(/\s+$/, "");
	}
	/*
	var DMap = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49, 50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59, 60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65, 66: 66, 67: 67, 68: 68, 69: 69, 70: 70, 71: 71, 72: 72, 73: 73, 74: 74, 75: 75, 76: 76, 77: 77, 78: 78, 79: 79, 80: 80, 81: 81, 82: 82, 83: 83, 84: 84, 85: 85, 86: 86, 87: 87, 88: 88, 89: 89, 90: 90, 91: 91, 92: 92, 93: 93, 94: 94, 95: 95, 96: 96, 97: 97, 98: 98, 99: 99, 100: 100, 101: 101, 102: 102, 103: 103, 104: 104, 105: 105, 106: 106, 107: 107, 108: 108, 109: 109, 110: 110, 111: 111, 112: 112, 113: 113, 114: 114, 115: 115, 116: 116, 117: 117, 118: 118, 119: 119, 120: 120, 121: 121, 122: 122, 123: 123, 124: 124, 125: 125, 126: 126, 127: 127, 1027: 129, 8225: 135, 1046: 198, 8222: 132, 1047: 199, 1168: 165, 1048: 200, 1113: 154, 1049: 201, 1045: 197, 1050: 202, 1028: 170, 160: 160, 1040: 192, 1051: 203, 164: 164, 166: 166, 167: 167, 169: 169, 171: 171, 172: 172, 173: 173, 174: 174, 1053: 205, 176: 176, 177: 177, 1114: 156, 181: 181, 182: 182, 183: 183, 8221: 148, 187: 187, 1029: 189, 1056: 208, 1057: 209, 1058: 210, 8364: 136, 1112: 188, 1115: 158, 1059: 211, 1060: 212, 1030: 178, 1061: 213, 1062: 214, 1063: 215, 1116: 157, 1064: 216, 1065: 217, 1031: 175, 1066: 218, 1067: 219, 1068: 220, 1069: 221, 1070: 222, 1032: 163, 8226: 149, 1071: 223, 1072: 224, 8482: 153, 1073: 225, 8240: 137, 1118: 162, 1074: 226, 1110: 179, 8230: 133, 1075: 227, 1033: 138, 1076: 228, 1077: 229, 8211: 150, 1078: 230, 1119: 159, 1079: 231, 1042: 194, 1080: 232, 1034: 140, 1025: 168, 1081: 233, 1082: 234, 8212: 151, 1083: 235, 1169: 180, 1084: 236, 1052: 204, 1085: 237, 1035: 142, 1086: 238, 1087: 239, 1088: 240, 1089: 241, 1090: 242, 1036: 141, 1041: 193, 1091: 243, 1092: 244, 8224: 134, 1093: 245, 8470: 185, 1094: 246, 1054: 206, 1095: 247, 1096: 248, 8249: 139, 1097: 249, 1098: 250, 1044: 196, 1099: 251, 1111: 191, 1055: 207, 1100: 252, 1038: 161, 8220: 147, 1101: 253, 8250: 155, 1102: 254, 8216: 145, 1103: 255, 1043: 195, 1105: 184, 1039: 143, 1026: 128, 1106: 144, 8218: 130, 1107: 131, 8217: 146, 1108: 186, 1109: 190}

	function UnicodeToWin1251(s) {
	    var L = []
	    for (var i=0; i<s.length; i++) {
	        var ord = s.charCodeAt(i)
	        if (!(ord in DMap))
	            throw "Character "+s.charAt(i)+" isn't supported by win1251!"
	        L.push(String.fromCharCode(DMap[ord]))
	    }
	    return L.join('')
	}*/

function is_int(value) {
	if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
		return true;
	} else {
		return false;
	}
}

function getBodyPartSubId(bodyPartTypeShortName) {
	for (var i = 0; i < bodyParts1.length; i++) {
		for (var j = 0; j < bodyParts1[i].objectTypes.length; j++) {
			if (bodyParts1[i].objectTypes[j].shortName == bodyPartTypeShortName) {
				return j;
			}
		}
	}
}

function getBodyPartId(bodyPartTypeShortName) {
	for (var i = 0; i < bodyParts1.length; i++) {
		for (var j = 0; j < bodyParts1[i].objectTypes.length; j++) {
			if (bodyParts1[i].objectTypes[j].shortName == bodyPartTypeShortName) {
				return i;
			}
		}
		if (bodyParts1[i].shortName == bodyPartTypeShortName) {
			return i;
		}
	}
}

function getStatId(statShortName) {
	for (var i = 0; i < parameterTypesZero.length; i++) {
		if (parameterTypesZero[i].short_name == statShortName)
			return i;
	}
}

function formatStat(value, parameter, showPlusBefore, floor) {
	if (typeof(showPlusBefore) == 'undefined') {
		showPlusBefore = true;
	}
	var val = value * parameter.multiplier;
	if (floor !== undefined && floor) {
		val = Math.floor(val);
	}
	if (val > 0 && parameter.isArmor == 0 && showPlusBefore) {
		val = "+" + val;
	}
	if (parameter.multiplier < 0 && value == 0) {
		val = "-" + val;
	}
	if (parameter.multiplier != 1 && parameter.isArmor == 0) {
		val += "%";
	}
	return val;
}

function positionPopup(htmlId, event, offsetX, offsetY, xPos, yPos) {
	var X, Y;
	var e = (window.event) ? window.event : event;
	if (typeof(offsetX) == 'undefined') {
		offsetX = 0;
		offsetY = 0;
	}
	if (typeof(xPos) == 'undefined') {
		X = e.clientX;
		Y = e.clientY;
	} else {
		X = xPos;
		Y = yPos;
	}

	var ScrollTop = document.body.scrollTop;
	if (ScrollTop == 0) {
		if (window.pageYOffset)
			ScrollTop = window.pageYOffset;
		else
			ScrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
	}

	var ScrollLeft = document.body.scrollLeft;
	if (ScrollLeft == 0) {
		if (window.pageXOffset)
			ScrollLeft = window.pageXOffset;
		else
			ScrollLeft = (document.body.parentElement) ? document.body.parentElement.scrollLeft : 0;
	}
	var docHeight = getDocHeight();
	var divHeight = document.getElementById(htmlId).offsetHeight;
	var yPos = Y + (offsetY - 0) + (ScrollTop - 0);
	//alert(htmlId);
	if (htmlId != "objects_div") {
		if (yPos + (divHeight - 0) - 0 >= docHeight - 0)
			yPos = yPos - divHeight - offsetY;
		if (yPos < 10)
			yPos = 10;
	}

	var docWidth = getDocWidth();
	var divWidth = document.getElementById(htmlId).offsetWidth;
	var xPos = X + (offsetX - 0) + (ScrollLeft - 0);

	if (xPos + (divWidth - 0) - 0 >= docWidth - 0)
		xPos = xPos - divWidth - 2 * offsetX;
	if (xPos < 10)
		xPos = 10;
	document.getElementById(htmlId).style.left = xPos + "px";
	document.getElementById(htmlId).style.top = yPos + "px";
}

function getDocHeight() {
	var D = document;
	return Math.max(
		Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
		Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
		Math.max(D.body.clientHeight, D.documentElement.clientHeight)
	);
}

function getDocWidth() {
	var D = document;
	return Math.max(
		Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
		Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
		Math.max(D.body.clientWidth, D.documentElement.clientWidth)
	);
}

function getMouseX(event) {
	var e = (window.event) ? window.event : event;
	return e.clientX;
}

function getMouseY(event) {
	var e = (window.event) ? window.event : event;
	return e.clientY;
}

function zatGetRealStatShortName(zatStatShortName, bodyPartTypeShortName) {
	var realShortName;
	if (zatStatShortName == 'bron') {
		switch (bodyPartTypeShortName) {
			case "shl":
				realShortName = "bron_gol";
				break;
			case "lat":
				realShortName = "bron_korp";
				break;
			case "per":
				realShortName = "bron_ruk";
				break;
			case "oru":
				realShortName = "bron_ruk";
				break;
			case "pon":
				realShortName = "bron_nog";
				break;
			case "nar":
				realShortName = "bron_ruk";
				break;
		}
	} else {
		realShortName = zatStatShortName;
	}
	return realShortName;
}

function initPersBody(persNr) {
	var rez = "";
	var bodyParts = new Array("oru1", "oru2", "kol1", "kol2", "kol3", "kol4", "kol5", "kol6", "kol7", "kol8", "shl", "amu1", "amu2", "lat", "sht", "poi", "pon", "nar", "per");
	stone_locations = new Array();
	stone_locations["oru1"] = 'bottom_right';
	stone_locations["oru2"] = '';
	stone_locations["kol1"] = '';
	stone_locations["kol2"] = '';
	stone_locations["kol3"] = '';
	stone_locations["kol4"] = '';
	stone_locations["kol5"] = '';
	stone_locations["kol6"] = '';
	stone_locations["kol7"] = '';
	stone_locations["kol8"] = '';
	stone_locations["shl"] = 'left';
	stone_locations["amu1"] = 'left';
	stone_locations["amu2"] = 'left';
	stone_locations["lat"] = 'left';
	stone_locations["sht"] = 'left';
	stone_locations["poi"] = 'left';
	stone_locations["pon"] = 'left_bottom';
	stone_locations["nar"] = 'right';
	stone_locations["per"] = 'left';

	zat_locations = new Array();
	zat_locations["oru1"] = 'inner_right_bottom';
	zat_locations["oru2"] = 'inner_left_bottom';
	zat_locations["kol1"] = 'inner_left_bottom';
	zat_locations["kol2"] = 'inner_left_bottom';
	zat_locations["kol3"] = 'inner_right_bottom';
	zat_locations["kol4"] = 'inner_right_bottom';
	zat_locations["kol5"] = 'inner_left_bottom';
	zat_locations["kol6"] = 'inner_left_bottom';
	zat_locations["kol7"] = 'inner_right_bottom';
	zat_locations["kol8"] = 'inner_right_bottom';
	zat_locations["shl"] = 'inner_left_bottom';
	zat_locations["amu1"] = 'inner_left_bottom';
	zat_locations["amu2"] = 'inner_left_bottom';
	zat_locations["lat"] = 'inner_left_bottom';
	zat_locations["sht"] = 'inner_left_bottom';
	zat_locations["poi"] = 'inner_left_bottom';
	zat_locations["pon"] = 'inner_left_bottom';
	zat_locations["nar"] = 'inner_right_bottom';
	zat_locations["per"] = 'inner_left_bottom';

	podkl_locations = new Array();
	podkl_locations["oru1"] = '';
	podkl_locations["oru2"] = 'left_top';
	podkl_locations["kol1"] = '';
	podkl_locations["kol2"] = '';
	podkl_locations["kol3"] = 'left_top';
	podkl_locations["kol4"] = 'left_top';
	podkl_locations["kol5"] = '';
	podkl_locations["kol6"] = '';
	podkl_locations["kol7"] = 'left_top';
	podkl_locations["kol8"] = 'left_top';
	podkl_locations["shl"] = 'right_top';
	podkl_locations["amu1"] = 'right_top';
	podkl_locations["amu2"] = 'right_top';
	podkl_locations["lat"] = 'right_top';
	podkl_locations["sht"] = 'right_top';
	podkl_locations["poi"] = 'right_top';
	podkl_locations["pon"] = 'right_bottom';
	podkl_locations["nar"] = 'left_bottom';
	podkl_locations["per"] = 'right_bottom';

	podkl_stone_locations = new Array();
	podkl_stone_locations["oru1"] = 'top_right';
	podkl_stone_locations["oru2"] = 'top';
	podkl_stone_locations["kol1"] = '';
	podkl_stone_locations["kol2"] = '';
	podkl_stone_locations["kol3"] = 'left';
	podkl_stone_locations["kol4"] = 'left';
	podkl_stone_locations["kol5"] = '';
	podkl_stone_locations["kol6"] = '';
	podkl_stone_locations["kol7"] = 'left';
	podkl_stone_locations["kol8"] = 'left';
	podkl_stone_locations["shl"] = 'right';
	podkl_stone_locations["amu1"] = 'right';
	podkl_stone_locations["amu2"] = 'right';
	podkl_stone_locations["lat"] = 'right';
	podkl_stone_locations["sht"] = 'right';
	podkl_stone_locations["poi"] = 'right';
	podkl_stone_locations["pon"] = 'right_bottom';
	podkl_stone_locations["nar"] = 'bottom_left';
	podkl_stone_locations["per"] = 'bottom_right';


	rez += "<img id='pers_image" + (persNr - 0 + 1) + "' class='pers_image'/>";
	for (var i = 0; i < bodyParts.length; i++) {
		part = bodyParts[i];
		var part1 = part.substring(0, 3);
		var nr = part.length == 4 ? part.substring(3, 4) : "1";
		rez += "<div class='" + part + " body_parts " + part1 + "' id='div_" + part + "_pers" + (persNr + 1) + "'>";
		var location = stone_locations[bodyParts[i]];
		var podklStoneLocation = podkl_stone_locations[bodyParts[i]];
		var zatLocation = zat_locations[bodyParts[i]];
		var podklLocation = podkl_locations[bodyParts[i]];
		if (location.length == 0)
			location = "bottom";
		if (podklStoneLocation.length == 0)
			podklStoneLocation = "right";
		if (podklLocation.length == 0)
			podklLocation = "right_top";
		if (zatLocation.length == 0)
			zatLocation = "right";

		//objects	
		rez += "<img id='img_" + part + "_pers" + (persNr + 1) + "' class='item' src='" + OBJECTS_PATH + "blank.gif' onMouseDown='lastObjectIsPodkladka=false;lastPersNr=" + persNr + ";persSelected=" + persNr + ";showObjectsSelectTable(event,\"" + part + "\");'	" +
			"onMouseMove='showBodyPartObjectPopup(event," + persNr + ",\"" + part1 + "\"," + nr + ");' onMouseOut='hideObjectsPropertiesDiv();'></img>";

		//mod, zakl
		for (var j = 1; j >= 0; j--) {
			var type = j ? "mod" : "zakl";
			rez += '<img id=\'img_' + part + "_" + type + '_pers' + (persNr + 1) + '\' class="kam ' + type + '_' + location + '" src="' + STONES_PATH + 'blank.gif"' +
				'onclick="lastObjectIsPodkladka=false;persSelected=' + persNr + ';showModSelectTable(event,' + j + ',' + persNr + ',\'' + part1 + '\',' + nr + ');"' +
				'onMouseMove="showStonePropPopup(event,' + persNr + ',\'' + part1 + '\',' + nr + ',' + j + ');" onMouseOut="hideStonePropPopup();">'

			rez += "</img>";
		}

		//zatochki
		rez += "<span class='zatochka zatochka_" + zatLocation + "'" +
			'onMouseMove="showZatPropPopup(event,' + persNr + ',\'' + part1 + '\',' + nr + ');" onMouseOut="hideStonePropPopup();"' +
			'onMouseDown="lastObjectIsPodkladka=false;persSelected=' + persNr + ';bodyPartTypeSelected=\'' + part1 + '\';bodyPartNrSelected=' + nr + ';showZatochkiSelectTable(event,' + persNr + ',\'' + part1 + '\',' + nr + ');">';
		rez += "<div class='zatochkaOpacityDiv' style='position:absolute'></div>";
		rez += "<img id='img_" + part + "_zat_pers" + (persNr + 1) + "' src='" + OBJECTS_PATH + "blank.gif' class='zatochkaImg' style='position:absolute'>"
		rez += "</span>";


		//podkladki
		rez += "<div class='podkladka podkladka_" + podklLocation + " podkladka_" + part1 + "'" +
			"onMouseMove='showBodyPartObjectPopup(event," + persNr + ",\"" + part1 + "\"," + nr + ",true);' onMouseOut='hideObjectsPropertiesDiv();'" +
			"onMouseDown='lastObjectIsPodkladka=true;persSelected=" + persNr + ";showObjectsSelectTable(event,\"" + part + "\",\"undefined\",true);'>";
		rez += "<div class='podkladkaOpacityDiv podkladka_" + part1 + "' style='position:absolute'></div>";
		rez += "<img id='img_" + part + "_podkl_pers" + (persNr + 1) + "' src='" + OBJECTS_PATH + "blank.gif' class='podkladkaImg podkladka_" + part1 + "' style='position:absolute'>"
		rez += "</div>";

		//podkladki mod, zakl
		for (var j = 1; j >= 0; j--) {
			var type = j ? "mod" : "zakl";
			rez += '<img id=\'img_' + part + "_" + type + '_podkl_pers' + (persNr + 1) + '\' class="kam_podkladka ' + type + '_' + podklStoneLocation + '" src="' + STONES_PATH + 'blank.gif"' +
				'onclick="persSelected=' + persNr + ';showModSelectTable(event,' + j + ',' + persNr + ',\'' + part1 + '\',' + nr + ',true);"' +
				'onMouseMove="showStonePropPopup(event,' + persNr + ',\'' + part1 + '\',' + nr + ',' + j + ',true);" onMouseOut="hideStonePropPopup();">'

			rez += "</img>";
		}


		rez += "</div>";

	}
	rez += '<div id="armor_div_' + (persNr - 0 + 1) + '"></div>';
	rez += '<div id="rating_div_' + (persNr - 0 + 1) + '"></div>';
	rez += '<div id="hp_div_' + (persNr - 0 + 1) + '"></div>';
	rez += '<div id="mana_div_' + (persNr - 0 + 1) + '"></div>';
	rez += "<img src='" + MISC_IMAGES_PATH + "mana.png' class='mana_bar'>";
	rez += "<img src='" + MISC_IMAGES_PATH + "mana_drop.png' class='mana_drop'>";
	rez += "<img src='" + MISC_IMAGES_PATH + "hp.png' class='hp_bar'>";
	rez += "<img src='" + MISC_IMAGES_PATH + "hp_drop.png' class='hp_drop'>";
	rez += "<div id='uron_div_left_" + (persNr - 0 + 1) + "'>Урон левой:<br><div id='uron_udac_left_" + (persNr - 0 + 1) + "'></div><div id='uron_krit_left_" + (persNr - 0 + 1) + "'></div></div>";
	rez += "<div id='uron_div_right_" + (persNr - 0 + 1) + "'>Урон правой:<br><div id='uron_udac_right_" + (persNr - 0 + 1) + "'></div><div id='uron_krit_right_" + (persNr - 0 + 1) + "'></div></div>";
	document.getElementById("pers" + (persNr + 1) + "_body").innerHTML = rez;
}

function initParametersDiv(divName) {
	var out = "<table id='parameters_table'>";
	var options1 = "",
		options2 = "";
	for (var i = 0; i < races.length; i++) {
		options1 += "<option value='" + i + "'>" + races[i].name + "</option>";
		options2 += "<option value='" + i + "'>" + races[i].name + "</option>";
	}
	out += "<tr><td colspan='2'><select id='race_pers1' onchange='raceChanged(1,true, false)'>" + options1 + "</select></td><td>Раса</td><td colspan='2'>";
	out += "<select id='race_pers2' onchange='raceChanged(2,true, false)'>" + options2 + "</select></td></tr>";
	out += "<tr><td colspan='2'><input type='text' class='level_pers' id='level_pers1' value='0' onblur='reload();raceChanged(1,true,true)' onKeyPress='if (event.which == 13) {reload();raceChanged(1,true,true);}'></input></td><td>Уровень</td>" +
		"<td colspan='2'><input type='text' class='level_pers' id='level_pers2' value='0' onblur='reload();raceChanged(2,true,true)'  onKeyPress='if (event.which == 13) {reload();raceChanged(2,true,true);}'></input></td></tr>";
	out += "<tr style='display:none;'><td colspan='2' id='price_pers1'></td><td>Стоимость</td><td colspan='2' id='price_pers2'></td></tr>";
	for (var i = 0; i < parameterTypesZero.length; i++) {
		if (parameterTypesZero[i].isArmor == '1')
			continue;
		if (i == 0)
			out += "<tr><td colspan=2><div style='text-align:center' id='stat_ups_div_1'></div></td><td><div class='parameters_class_div' style='text-align:center'>Статы</div></td><td colspan=2><div style='text-align:center' id='stat_ups_div_2'></div></td></tr>";
		if (parameterTypesZero[i].multiplier == 5 && parameterTypesZero[i - 1].multiplier == 1)
			out += "<tr><td colspan=2><div style='text-align:center' id='mast_ups_div_1'></div></td><td><div class='parameters_class_div' style='text-align:center'>Мастерство</div></td><td colspan=2><div style='text-align:center' id='mast_ups_div_2'></div></td></tr>";
		if (parameterTypesZero[i].short_name.indexOf("ob_") == 0 && parameterTypesZero[i - 1].short_name.indexOf("ob_") == -1)
			out += "<tr><td colspan=5><div style='text-align:center' class='parameters_class_div'>Обереги</div></td></tr>";
		if (parameterTypesZero[i].multiplier == -5 && parameterTypesZero[i - 1].multiplier == 5)
			out += "<tr><td colspan=5><div style='text-align:center' class='parameters_class_div'>Минус мастерство противника</div></td></tr>";
		if (parameterTypesZero[i].short_name.indexOf("anti_ob_") == 0 && parameterTypesZero[i - 1].short_name.indexOf("anti_ob_") == -1)
			out += "<tr><td colspan=5><div style='text-align:center' class='parameters_class_div'>Минус оберег противника</div></td></tr>";
		var par = parameterTypesZero[i];
		var hasUserInput = (par.multiplier == 1 && par.isArmor == 0) || (par.multiplier == 5);
		out += "<tr><td>";
		if (hasUserInput) {
			out += "<input type='text' class='user_parameter' id='user_parameter_" + par.short_name + "_1' value='0' onkeyup='reload()' style='margin-top:0px;margin-bottom:0px;'></input>";
		} else {
			out += "&nbsp;";
		}
		out += "</td>";
		out += "<td><div id='parameter_" + par.short_name + "_1'>0</div></td><td>" + par.name + "</td><td><div id='parameter_" + par.short_name + "_2'>0</div></td>";
		out += "<td>"
		if (hasUserInput) {
			out += "<input type='text' class='user_parameter' id='user_parameter_" + par.short_name + "_2' value='0' onkeyup='reload()'style='margin-top:0px;margin-bottom:0px;'></input>";
		} else {
			out += "&nbsp;";
		}
		out += "</td></tr>";
	}
	out += "</table>";
	document.getElementById(divName).innerHTML = out;
	//init armor display
	for (var persNr = 1; persNr <= 2; persNr++) {
		out = "";
		out += "Броня:";
		out += "<table>";
		out += "<tr><td></td><td class='armor_td'><div id='parameter_bron_gol_" + persNr + "'></div></td></tr>";
		out += "<tr><td class='armor_td'><div id='parameter_bron_ruk_" + persNr + "'></div></td><td class='armor_td'><div id='parameter_bron_korp_" + persNr + "'></div></td>" +
			"<td class='armor_td'><div id='parameter_bron_ruk2_" + persNr + "'></div></td></tr>";
		out += "<tr><td></td><td class='armor_td'><div id='parameter_bron_nog_" + persNr + "'></div></td></tr>";
		out += "</table>";
		document.getElementById("armor_div_" + persNr).innerHTML = out;
	}
}

function takeOffAll(persNr) {
	var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
	for (var i = 0; i < bodyPartsGen.length; i++) {
		for (var j = 0; j < bodyPartsGen[i].objects.length; j++) {
			bodyPartsGen[i].objects[j].id = -1;
			bodyPartsGen[i].objects[j].modType = -1;
			bodyPartsGen[i].objects[j].zaklType = -1;
			bodyPartsGen[i].objects[j].zatType = -1;
			bodyPartsGen[i].objects[j].zatNr = -1;
			bodyPartsGen[i].objects[j].podklId = -1;
			bodyPartsGen[i].objects[j].podklModType = -1;
			bodyPartsGen[i].objects[j].podklZaklType = -1;
		}
	}

	var drinksUsed = (persNr == 0 ? drinksUsed1 : drinksUsed2);
	drinksUsed.length = 0;
	/*for (var i=0; i<drinksUsed.length; i++)
	{
		drinksUsed[i].id=-1;
	}*/

	var bag = (persNr == 0 ? bag1 : bag2);
	bag.length = 0;
	/*for (var i=0; i<bag.length; i++)
	{
		bag[i].id=-1;
	}*/
	reload();
}

function copyPers(persNr) {
	if (persNr == 0) {
		var arr = makeOfflineSaveArray(0);
		programVersion = 2;
		loadOfflineSavedArray(1, arr, false);
		raceChanged(2, false, false);
	} else {
		var arr = makeOfflineSaveArray(1);
		programVersion = 2;
		loadOfflineSavedArray(0, arr);
		raceChanged(1, false, false);
	}
}

/**
 *
 *  Javascript crc32
 *  http://www.webtoolkit.info/
 *
 **/

function crc32(str) {

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	str = Utf8Encode(str);
	var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
	var crc = 0;
	//if (typeof(crc) == "undefined") { crc = 0; }
	var x = 0;
	var y = 0;

	crc = crc ^ (-1);
	for (var i = 0, iTop = str.length; i < iTop; i++) {
		y = (crc ^ str.charCodeAt(i)) & 0xFF;
		x = "0x" + table.substr(y * 9, 8);
		crc = (crc >>> 8) ^ x;
	}

	return crc ^ (-1);

};

function pausecomp(ms) {
	ms += new Date().getTime();
	while (new Date() < ms) {}
}

function generateParametersFilter(divId, callbackOnUpdate) {
	var prefix = divId + "_";

	var stat = new Array();
	var ob = new Array();
	var antiOb = new Array();
	var mast = new Array();
	var antiMast = new Array();
	var armor = new Array();
	for (var i = 0; i < parameterTypesZero.length; i++) {
		var par = parameterTypesZero[i];
		if (par.short_name == 'intel')
			continue;
		if (par.isArmor == '1')
			armor[armor.length] = i;
		else if (par.multiplier == 1)
			stat[stat.length] = i;
		else if (par.multiplier == 5) {
			if (par.short_name.indexOf("ob_") == 0)
				ob[ob.length] = i;
			else
				mast[mast.length] = i;
		} else //parameterTypesZero[i].multiplier==-5
		{
			if (par.short_name.indexOf("anti_ob_") == 0)
				antiOb[antiOb.length] = i;
			else
				antiMast[antiMast.length] = i;
		}
	}

	var out = "";
	out += "<table class='statFilterTable'>"

	var statId = -1;
	var obId = -1;
	var antiObId = -1;
	var mastId = -1;
	var antiMastId = -1;
	var armorId = -1;

	while (statId < stat.length || obId < ob.length || antiObId < antiOb.length || mastId < mast.length || antiMastId < antiMast.length || armorId < armor.length) {
		out += "<tr>";

		out += "<td>";
		if (statId < stat.length) {
			if (statId == -1)
				out += "<div class='parameters_class_div' style='text-align:center'>Статы</div>";
			else
				out += "<input type='checkbox' id='" + prefix + parameterTypesZero[stat[statId]].short_name + "' onchange='" + callbackOnUpdate + "'/>" + parameterTypesZero[stat[statId]].name;
			++statId;
		}
		out += "</td>";

		out += "<td>";
		if (obId < ob.length) {
			if (obId == -1)
				out += "<div class='parameters_class_div' style='text-align:center'>Обереги</div>";
			else
				out += "<input type='checkbox' id='" + prefix + parameterTypesZero[ob[obId]].short_name + "' onchange='" + callbackOnUpdate + "'/>" + parameterTypesZero[ob[obId]].name;
			++obId;
		} else if (antiObId < antiOb.length) {
			if (antiObId == -1)
				out += "<div class='parameters_class_div' style='text-align:center'>Минус оберег противника</div>";
			else
				out += "<input type='checkbox' id='" + prefix + parameterTypesZero[antiOb[antiObId]].short_name + "' onchange='" + callbackOnUpdate + "'/>" + parameterTypesZero[antiOb[antiObId]].name;
			++antiObId;
		}
		out += "</td>";

		out += "<td>";
		if (mastId < mast.length) {
			if (mastId == -1)
				out += "<div class='parameters_class_div' style='text-align:center'>Мастерства</div>";
			else
				out += "<input type='checkbox' id='" + prefix + parameterTypesZero[mast[mastId]].short_name + "' onchange='" + callbackOnUpdate + "'/>" + parameterTypesZero[mast[mastId]].name;
			++mastId;
		} else if (antiMastId < antiMast.length) {
			if (antiMastId == -1)
				out += "<div class='parameters_class_div' style='text-align:center'>Минус мастерство противника</div>";
			else
				out += "<input type='checkbox' id='" + prefix + parameterTypesZero[antiMast[antiMastId]].short_name + "' onchange='" + callbackOnUpdate + "'/>" + parameterTypesZero[antiMast[antiMastId]].name;
			++antiMastId;
		}
		out += "</td>";

		out += "<td>";
		if (armorId < armor.length) {
			if (armorId == -1)
				out += "<div class='parameters_class_div' style='text-align:center'>Броня</div>";
			else
				out += "<input type='checkbox' id='" + prefix + parameterTypesZero[armor[armorId]].short_name + "' onchange='" + callbackOnUpdate + "'/>" + parameterTypesZero[armor[armorId]].name;
			++armorId;
		}
		out += "</td>";

		out += "</tr>";
	}
	out += "</table>";
	document.getElementById(divId).innerHTML = out;
}

function getUsedStatFilters(prefix) {
	var fullPrefix = prefix + "_";
	var filters = new Array();
	for (var i = 0; i < parameterTypesZero.length; i++) {
		var par = parameterTypesZero[i];
		if (par.short_name == 'intel')
			continue;
		if (document.getElementById(fullPrefix + par.short_name).checked == true)
			filters[filters.length] = par;
	}
	return filters;
}

function resetStatFilters(prefix) {
	var fullPrefix = prefix + "_";
	for (var i = 0; i < parameterTypesZero.length; i++) {
		var par = parameterTypesZero[i];
		if (par.short_name == 'intel')
			continue;
		document.getElementById(fullPrefix + par.short_name).checked = false;
	}

}

var grayProb = new Array(2, 6, 14, 30, 62, 126, 254, 510, 1026, 2059, 4120, 8170, 16422, 32050, 66150, 133527, 255728, 534541, 1023000, 2126100);
var blueProb = new Array(1, 3, 6, 11, 16, 25, 37, 54, 79, 114, 165, 237, 339, 486, 699, 1000, 1426, 2040, 2930, 4150, 5853, 8663, 12302,
	17738, 25214, 34420, 71959, 104109, 149363, 146169, 211628, 307847, 418890, 602867, 875786, 1248990, 1805530, 2615920, 3724070);

function getProbability(isBlue, quantity) {
	if (isBlue) {
		if (blueProb.length < quantity || quantity < 1)
			return -1;
		else
			return blueProb[quantity - 1];
	} else {
		if (grayProb.length < quantity || quantity < 1)
			return -1;
		else
			return grayProb[quantity - 1];
	}
}