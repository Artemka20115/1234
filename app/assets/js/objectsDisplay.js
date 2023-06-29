var lastX, lastY;
var curObjectPropertyId = -1;
var lastObjectTypeShortName;
var lastObjectTypeNr;
var lastObjectIsPodkladka = false;
var persSelected = -1;
var bodyPartTypeSelected = -1;
var bodyPartNrSelected = -1;
var newOpen = 0;

let filterTypes = [];

function showObjectsSelectTable(event, objectTypeShortName, subtypeSelected, showOnlyPodkladki) {

	function updateFilterTypes(idx) {
		if (idx === undefined) {
			filterTypes = [];
		} else {
			if (filterTypes.includes(idx)) {
				filterTypes.splice(filterTypes.indexOf(idx), 1);
			} else {
				filterTypes.push(idx);
			}
		}
		if (filterTypes.length) {
			let activeFilters = [];
			for (let i = 0; i < filterTypes.length; i++) {
				if (filterTypes[i] === 1) {
					activeFilters.push('<span style="cursor:pointer;display:inline-block;padding:2px;background-color:#e9c07c" id="specialObjectsShow" onclick="showObjectsSelectTable(event)">Именные</span>');
				} else if (filterTypes[i] === 2) {
					activeFilters.push('<span style="cursor:pointer;display:inline-block;padding:2px;background-color:#e9c07c" id="personalObjectsShow" onclick="showObjectsSelectTable(event)">Личные</span>');
				} else if (filterTypes[i] === 3) {
					activeFilters.push('<span style="cursor:pointer;display:inline-block;padding:2px;background-color:#e9c07c" id="battleFieldObjectsShow" onclick="showObjectsSelectTable(event)">Артефакты древних</span>');
				} else if (filterTypes[i] === 4) {
					activeFilters.push('<span style="cursor:pointer;display:inline-block;padding:2px;background-color:#e9c07c" id="ancientWrathObjectsShow" onclick="showObjectsSelectTable(event)">Вещи 17-28 уровня</span>');
				}
			}
			document.querySelector('#activeTypeFilters').innerHTML = '<div style="margin-bottom:5px;">Показывать только: ' + activeFilters.join(', ') + '</div>';
		} else {
			document.querySelector('#activeTypeFilters').innerHTML = '';
		}

	}
	switch (event.target.id) {
		case "allObjectsShow":
			updateFilterTypes();
			break;
		case "specialObjectsShow":
			updateFilterTypes(1);
			break;
		case "personalObjectsShow":
			updateFilterTypes(2);
			break;
		case "battleFieldObjectsShow":
			updateFilterTypes(3);
			break;
		case "ancientWrathObjectsShow":
			updateFilterTypes(4);
			break;
	}
	let allObjectsShow = true;
	let specialObjectsShow = true;
	let personalObjectsShow = true;
	let battleFieldObjectsShow = true;
	let ancientWrathObjectsShow = true;
	switch (objectTypeShortName) {
		case 'shl':
			ancientWrathObjectsShow = false;
			break;
		case 'amu1':
		case 'amu2':
			ancientWrathObjectsShow = false;
			break;
		case 'nar':
			ancientWrathObjectsShow = false;
			break;
		case 'pon':
			ancientWrathObjectsShow = false;
			break;
		case 'sht':
			battleFieldObjectsShow = false;
			ancientWrathObjectsShow = false;
			break;
		case 'poi':
			ancientWrathObjectsShow = false;
			break;
		case 'lat':
			ancientWrathObjectsShow = false;
			break;
		case 'per':
			ancientWrathObjectsShow = false;
			break;
		case 'kol1':
		case 'kol2':
		case 'kol3':
		case 'kol4':
		case 'kol5':
		case 'kol6':
		case 'kol7':
		case 'kol8':
			ancientWrathObjectsShow = false;
			break;
		case 'oru1':
		case 'oru2':
			ancientWrathObjectsShow = false;
			break;
	}

	document.querySelector('#allObjectsShow').style.display = (showOnlyPodkladki === true ? 'none' : (!allObjectsShow ? 'none' : ''));
	document.querySelector('#specialObjectsShow').style.display = (showOnlyPodkladki === true ? 'none' : (!specialObjectsShow ? 'none' : ''));
	document.querySelector('#personalObjectsShow').style.display = (showOnlyPodkladki === true ? 'none' : (!personalObjectsShow ? 'none' : ''));
	document.querySelector('#battleFieldObjectsShow').style.display = (showOnlyPodkladki === true ? 'none' : (!battleFieldObjectsShow ? 'none' : ''));
	document.querySelector('#ancientWrathObjectsShow').style.display = (showOnlyPodkladki === true ? 'none' : (!ancientWrathObjectsShow ? 'none' : ''));

	if (showOnlyPodkladki) {
		podklLastX = getMouseX(event);
		podklLastY = getMouseY(event);
	}

	newOpen = 1;
	hideObjectsTypeSelectTable();
	hideModChooseDiv();
	hideZatChooseDiv();

	var isFilter = 0;
	var objectTypeNr = 0;
	subtypeSelected = (typeof(subtypeSelected) != 'undefined' || isFilter) ? subtypeSelected : 0;
	if (typeof(objectTypeShortName) != 'undefined') {
		lastObjectTypeShortName = objectTypeShortName;
	} else {
		newOpen = 0;
		objectTypeShortName = lastObjectTypeShortName;
		isFilter = 1;
		subtypeSelected = 1;
	}
	if (subtypeSelected == 1) {
		objectTypeNr = lastObjectTypeNr;
	}
	var objectTypeId = -1;
	if (!isNaN(objectTypeShortName.charAt(objectTypeShortName.length - 1))) {
		objectTypeNr = objectTypeShortName.charAt(objectTypeShortName.length - 1) - 1;
		objectTypeShortName = objectTypeShortName.substring(0, objectTypeShortName.length - 1);
	}
	BodyPartId = getBodyPartId(objectTypeShortName);
	BodyPartSubId = getBodyPartSubId(objectTypeShortName);
	var bodyPartsGen = persSelected == 0 ? bodyParts1 : bodyParts2;
	lastObjectTypeNr = objectTypeNr;

	var obj = bodyPartsGen[BodyPartId].objects[objectTypeNr];

	if (newOpen == 1 && ((showOnlyPodkladki != true && obj.id >= 0) || (showOnlyPodkladki == true && obj.podklId >= 0))) {
		takeOffCloth(event);
		return;
	}
	if (bodyPartsGen[BodyPartId].objectTypes.length == 1 || showOnlyPodkladki) {
		objectTypeId = bodyPartsGen[BodyPartId].objectTypes[0].id;
	} else if (subtypeSelected == 1) {
		objectTypeId = bodyPartsGen[BodyPartId].objectTypes[BodyPartSubId].id;
		hideObjectsTypeSelectTable();
	} else {
		hideObjectsSelectTable();
		lastX = getMouseX(event);
		lastY = getMouseY(event);
		document.getElementById('objects_table_div').innerHTML = "";
		positionPopup('objects_choose_div', event)
		document.getElementById('objects_choose_div').style.display = "inline";
		return;
	}
	var i = 0;
	var table = "";
	var row_closed = true;
	var curRowImagesNr = 0;
	var elementsPerRow = 9;

	//filtering by parameters
	statFilters = getUsedStatFilters("parameters_filter");
	var filtersList = "";
	if (statFilters.length > 0) {
		filtersList = "<b>Фильтры: </b>";
		for (var filterInd = 0; filterInd < statFilters.length; filterInd++) {
			filtersList += statFilters[filterInd].name;
			if (filterInd < statFilters.length - 1)
				filtersList += ", ";
		}
		filtersList += ". <a onclick='resetStatFilters(\"parameters_filter\");showObjectsSelectTable(event);' class='pointerCursor' style='color:blue'>Сбросить</a>";
	}
	document.getElementById('parameters_filters_list').innerHTML = filtersList;

	var minLevel = 0;
	pageMinLevel = document.getElementById("object_select_filter_min_level").value;
	if (!isNaN(pageMinLevel))
		minLevel = parseInt(pageMinLevel);
	var maxLevel = 1000;
	pageMaxLevel = document.getElementById("object_select_filter_max_level").value;
	if (!isNaN(pageMaxLevel))
		maxLevel = parseInt(pageMaxLevel);

	if (isFilter) {
		var nameFilter = document.getElementById('object_select_filter_name').value;
		var nameRegex = new RegExp("(.*" + nameFilter + ".*)", "i");
	}

	for (var i = 0; i < objects.length; i++) {
		var obj = objects[i];

		// console.log(obj);
		if (showOnlyPodkladki !== true) {
			if (filterTypes.length) {
				if (obj.defaultObject || (!filterTypes.includes(obj.art_type) && !obj.defaultObject)) {
					continue;
				}
			}
		}

		if (showOnlyPodkladki == true && obj.is_podkladka != 1)
			continue;

		//do not take into consideration invalid objects
		if (obj.photo_location == -1)
			continue;

		if (obj["is_drink"] == 1 || obj["type_id"] != objectTypeId)
			continue;
		if (isFilter) {
			if (!obj["name"].match(nameRegex))
				continue;
		}

		if (obj["max_level"] == -1) {
			if ((obj["min_level"] < minLevel && obj.is_podkladka != 1) || obj["min_level"] > maxLevel || minLevel > maxLevel)
				continue;
		} else {
			if (minLevel > obj["max_level"] || maxLevel < obj["min_level"] || maxLevel < minLevel)
				continue;
		}

		//filtering by stats
		var found = true;
		for (var filterId = 0; filterId < statFilters.length; filterId++) {
			var filterStat = statFilters[filterId].short_name;
			found = false;
			for (var parId = 0; parId < obj.parameters.length; parId++) {
				if (parameterTypes[obj.parameters[parId].id].short_name == filterStat && obj.parameters[parId].value > 0) {
					found = true;
					break;
				}
			}
			if (!found) {
				break;
			}
		}
		if (!found)
			continue;

		if (curRowImagesNr == 0) {
			table += "<div><tr height='" + bodyPartsGen[BodyPartId].height + "px'></div>"
			row_closed = false;
			var titlesRow = "";
		}
		curRowImagesNr++;
		var path = obj.defaultObject ? OBJECTS_PATH : (obj.imageFromDB ? SPECIAL_OBJECTS_PATH : TEMP_SPECIAL_OBJECTS_PATH);

		if (obj.is_podkladka == 1)
			path = MISC_IMAGES_PATH;

		table += "<td width='" + bodyPartsGen[BodyPartId].height + "px'><img src='" + path + obj["photo_location"] + "' width='" +
			(bodyPartsGen[BodyPartId].width) + "px'  height='" + (bodyPartsGen[BodyPartId].height) + "px' onmousemove='moveObjectsPropertiesDiv(event," + i + ");'" +
			" onmouseup='showPutOnDiv(event," + i + "," + persSelected + ",\"" + objectTypeShortName + "\"," + objectTypeNr + ");'></img>";
		if (!obj.defaultObject) {
			table += "<br><img style='width:13px; height:13px; border:0px;' src='" + MISC_IMAGES_PATH + "red_cross.png' onclick='deleteSpecialObject(" + i + ")' title='Удалить предмет'>"
			if (obj.is_podkladka == 0) {
				table += "<img style='border:0px;' src='" + MISC_IMAGES_PATH + "edit.png' onclick='modifySpecialObject(" + i + ")' title='Править предмет'>"
			}
		}
		table += "</td>";
		titlesRow += "<td><font class='object_info_title'>" + obj.name + "</font></td>"
		if (curRowImagesNr == elementsPerRow) {
			table += "</tr>";
			table += "<tr>" + titlesRow + "</tr>";
			row_closed = true;
			curRowImagesNr = 0;
		}
	}
	if (row_closed == false) {
		table += "</tr>";
		table += "<tr>" + titlesRow + "</tr>";
		row_closed = true;
		curRowImagesNr = 0;
	}

	var rez = "<table id='objects_table'>" + table + "</table>";

	if (showOnlyPodkladki == true) {
		rez += "<button onclick='hideObjectsSelectTable();showPodkladkaCreate(\"" + objectTypeShortName + "\");window.scrollTo(0,0)'>Создать подкладку</button>";
	}

	document.getElementById('objects_table_div').innerHTML = rez;
	if (document.getElementById('objects_div').style.display != "inline") {
		document.getElementById('objects_div').style.display = "inline";
		resetNameFilter();
		setTimeout("document.getElementById('object_select_filter_name').focus()", 0);
	}
	if (!isFilter) {
		/*(subtypeSelected==1)?positionPopup("objects_div",event,0,0,lastX,lastY):*/
		positionPopup("objects_div", event);
	}

	document.getElementById('filters_outer_div').style.display = showOnlyPodkladki ? "none" : "inline";
	document.getElementById('objectsListCreateSpecial').style.display = showOnlyPodkladki ? "none" : "inline";
}

function takeOffCloth(event, action) //action=1-throw, action=2-send to bag
{
	document.getElementById('take_off_div').style.display = "none";
	action = (typeof(action) != 'undefined') ? action : 0;
	if (action == 0) {
		positionPopup("take_off_div", event);
		document.getElementById('take_off_div').style.display = "inline";
		return;
	}

	var objectTypeShortName = lastObjectTypeShortName;
	var objectTypeNr = lastObjectTypeNr;
	if (!isNaN(objectTypeShortName.charAt(objectTypeShortName.length - 1))) {
		objectTypeShortName = objectTypeShortName.substring(0, objectTypeShortName.length - 1);
	}

	var BodyPartId = getBodyPartId(objectTypeShortName);

	var bodyPartsGen = persSelected == 0 ? bodyParts1 : bodyParts2;
	if (action == 2) //add to bag
	{
		if (lastObjectIsPodkladka != true) {
			addToBag(persSelected, bodyPartsGen[BodyPartId].objects[objectTypeNr].id, 1, bodyPartsGen[BodyPartId].objects[objectTypeNr].modType,
				bodyPartsGen[BodyPartId].objects[objectTypeNr].modMult, bodyPartsGen[BodyPartId].objects[objectTypeNr].zaklType,
				bodyPartsGen[BodyPartId].objects[objectTypeNr].zaklMult, bodyPartsGen[BodyPartId].objects[objectTypeNr].zatType,
				bodyPartsGen[BodyPartId].objects[objectTypeNr].zatNr);
		} else {
			addToBag(persSelected, bodyPartsGen[BodyPartId].objects[objectTypeNr].podklId, 1, bodyPartsGen[BodyPartId].objects[objectTypeNr].podklModType,
				bodyPartsGen[BodyPartId].objects[objectTypeNr].podklModMult, bodyPartsGen[BodyPartId].objects[objectTypeNr].podklZaklType,
				bodyPartsGen[BodyPartId].objects[objectTypeNr].podklZaklMult, -1, -1);
		}
	}
	if (lastObjectIsPodkladka != true) {
		bodyPartsGen[BodyPartId].objects[objectTypeNr].id = -1;
		bodyPartsGen[BodyPartId].objects[objectTypeNr].modType = -1;
		bodyPartsGen[BodyPartId].objects[objectTypeNr].zaklType = -1;
		bodyPartsGen[BodyPartId].objects[objectTypeNr].zatType = -1;
	} else {
		bodyPartsGen[BodyPartId].objects[objectTypeNr].podklId = -1;
		bodyPartsGen[BodyPartId].objects[objectTypeNr].podklModType = -1;
		bodyPartsGen[BodyPartId].objects[objectTypeNr].podklZaklType = -1;
	}
	reload();
}

function takeOffSpecificCloth(persNr, body_part, body_part_nr) //action=1-throw, action=2-send to bag
{
	var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
	var BodyPartId = getBodyPartId(body_part);
	bodyPartsGen[BodyPartId].objects[body_part_nr - 1].id = -1;
	bodyPartsGen[BodyPartId].objects[body_part_nr - 1].modType = -1;
	bodyPartsGen[BodyPartId].objects[body_part_nr - 1].zaklType = -1;
}

function showPutOnDiv(event, objId, persNr, bodyPartTypeShortName, bodyPartNr, modType, modMult, zaklType, zaklMult) {
	var rightclick;
	if (!event) var event = window.event;
	if (event.which) rightclick = (event.which == 3);
	else if (event.button) rightclick = (event.button == 2);
	if (rightclick) {
		hideObjectsPropertiesDiv();
		rez = "";
		rez += '<table id="put_on_table">';
		rez += "<tr><td onMouseDown='putOnObject(" + objId + "," + persNr + ",\"" + bodyPartTypeShortName + "\"," + bodyPartNr + ");hidePutOnClothDiv();' id='put_on_td'>Одеть</td></tr>";
		rez += "<tr><td onMouseDown='addToBag(" + persNr + "," + objId + ",1,-1,-1,-1,-1" + ");hidePutOnClothDiv();' id='add_to_bag_td'>Добавить в рюкзак</td></tr>";
		rez += "</table><button onclick='hidePutOnClothDiv();'>Закрыть</button>";

		document.getElementById('put_on_div').innerHTML = rez;
		positionPopup('put_on_div', event);
		document.getElementById('put_on_div').style.display = "inline";
	} else {
		putOnObject(objId, persNr, bodyPartTypeShortName, bodyPartNr);
		hidePutOnClothDiv();
	}
}

function hideTakeOffClothDiv() {
	document.getElementById('take_off_div').style.display = "none";
}

function hidePutOnClothDiv() {
	document.getElementById('put_on_div').style.display = "none";
}

function showBodyPartObjectPopup(event, persNr, bodyPartTypeShortName, bodyPartNr, isPodkladka) {
	var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
	bodyPartNr = (typeof(bodyPartNr) != 'undefined' || isFilter) ? bodyPartNr : 1;
	bodyPartNr--;
	var partId = getBodyPartId(bodyPartTypeShortName);
	if (isPodkladka != true) {
		var id = bodyPartsGen[partId].objects[bodyPartNr].id;
		modType = bodyPartsGen[partId].objects[bodyPartNr].modType;
		modMult = bodyPartsGen[partId].objects[bodyPartNr].modMult;
		zaklType = bodyPartsGen[partId].objects[bodyPartNr].zaklType;
		zaklMult = bodyPartsGen[partId].objects[bodyPartNr].zaklMult;
		zatType = bodyPartsGen[partId].objects[bodyPartNr].zatType;
		zatNr = bodyPartsGen[partId].objects[bodyPartNr].zatNr;
	} else {
		var id = bodyPartsGen[partId].objects[bodyPartNr].podklId;
		modType = bodyPartsGen[partId].objects[bodyPartNr].podklModType;
		modMult = bodyPartsGen[partId].objects[bodyPartNr].podklModMult;
		zaklType = bodyPartsGen[partId].objects[bodyPartNr].podklZaklType;
		zaklMult = bodyPartsGen[partId].objects[bodyPartNr].podklZaklMult;
		zatType = -1;
		zatNr = -1;
	}

	if (id != -1)
		moveObjectsPropertiesDiv(event, id, modType, modMult, zaklType, zaklMult, zatType, zatNr);
}


function showObjectsPropertiesDiv(id, modType, modMult, zaklType, zaklMult, zatType, zatNr) {
	var modStat = "",
		initialModStat = "";
	if (modType != -1 && modMult != -1) {
		modStat = stones[modType].statShortName;
		initialModStat = modStat;
	}

	var zaklStat = "",
		initialZaklStat = "";
	if (zaklType != -1 && zaklMult != -1) {
		zaklStat = stones[zaklType].statShortName;
		initialZaklStat = zaklStat;
	}

	var zatStat = "",
		initialZatStat = "";
	if (zatType != -1 && zatNr != -1) {
		zatStat = zatochki[Math.floor(zatType / 2)].statShortName;
	}

	if (zatStat == 'bron') {
		for (var i = 0; i < bodyPartsDB.length; i++) {
			if (bodyPartsDB[i].id == objects[id].type_id)
				break;
		}

		switch (bodyPartsDB[i].short_name) {
			case "shl":
				zatStat = "bron_gol";
				break;
			case "lat":
				zatStat = "bron_korp";
				break;
			case "per":
				zatStat = "bron_ruk";
				break;
			case "oru":
			case "shi":
				zatStat = "bron_ruk";
				break;
			case "pon":
				zatStat = "bron_nog";
				break;
			case "nar":
				zatStat = "bron_ruk";
				break;
		}
	}

	initialZatStat = zatStat;

	//rewrite mod, zakl, zat type to stats
	if (modStat != "" && zaklStat != "" && modStat == zaklStat) {
		zaklStat = "";
		modMult = modMult - 0 + (zaklMult - 0);
	}

	if (zatStat != "" && modStat != "" && zatStat == modStat) {
		zatStat = "";
		modMult = modMult - 0 + (zatNr * 5 - 0);
	}

	if (zatStat != "" && zaklStat != "" && zatStat == zaklStat) {
		zatStat = "";
		zaklMult = zaklMult - 0 + (zatNr * 5 - 0);
	}

	var obj = objects[id];
	var data = "";
	data += "<div class='object_info_popup_title'>" + obj.name + "</div>";
	if (obj.price_serye > EPS || obj.price_sinie > EPS) {
		/*		data+="<font class='object_info_popup_caption'>Цена:</font> ";
				if (obj.price_serye>EPS)
					data+=obj.price_serye+((obj.price_serye-parseInt(obj.price_serye)<EPS)?".00":0);
				if (obj.price_serye>EPS && obj.price_sinie>EPS)
					data+=" + ";
				if (obj.price_sinie>EPS)
					data+="<font class='object_info_popup_price_sinie'>"+obj.price_sinie+((obj.price_sinie-parseInt(obj.price_sinie)<EPS)?".00":0)+"</font>";
				data+="<br>";*/
	}

	if (obj.art_type === 1 || obj.art_type === 2) {
		for (var j = 0; j < specialObjectsTypes.length; j++) {
			if ((specialObjectsTypes[j].isImenoi - 0 === 1) == (obj.art_type - 0 === 1)) {
				if (specialObjectsTypes[j].price - 0 === obj.price_sinie - 0) {
					break;
				}
			}
		}
		level = specialObjectsTypes[j].objectLevel;
		data += "<font class='object_info_popup_caption'>" + (obj.art_type === 1 ? "Именной предмет" : "Личный предмет") + " " + level + " уровня</font><br>";
	}

	if (obj.defaultObject) {
		data += "<font class='object_info_popup_caption'>Прочность:</font> " + obj.hp + "<br>";
		data += "<font class='object_info_popup_caption'>Требуемый Уровень:</font> " + obj.min_level;
		if (obj.max_level != -1) {
			data += "-" + obj.max_level;
		}
		data += "<br>";
	}
	if (obj.min_damage != -1) {
		data += "<font class='object_info_popup_caption'>Урон:</font> " + (obj.min_damage === "" ? 0 : obj.min_damage);
		if (obj.max_damage != -1 && obj.max_damage != "") {
			data += "-" + obj.max_damage;
		}

		if (zatStat == "damage") {
			data += " +" + zatNr * 5 + "(заточ) = " + (obj.min_damage - 0 + (zatNr * 5 - 0));
			if (obj.max_damage != -1) {
				data += "-" + (obj.max_damage - 0 + (zatNr * 5 - 0));
			}
			zatStat = "";
		}
		data += "<br>";
	}
	if (obj.is_twohanded)
		data += "<font class='object_info_popup_caption'>Двуручное.</font><br>";
	if (obj.radius >= 0)
		data += "<font class='object_info_popup_caption'>Радиус поражения:</font> " + obj.radius + "<br>";
	if (obj.charges >= 0)
		data += "<font class='object_info_popup_caption'>Зарядов:</font> " + obj.charges + "<br>";
	if (obj.recharge_price >= 0)
	// data+="<font class='object_info_popup_caption'>Стоимость зарядки 1 единицы:</font> "+obj.recharge_price+"<br>";
		if (obj.tochnosti >= 0)
			data += "<font class='object_info_popup_caption'>Точность:</font> " + obj.tochnosti + "%<br>";
	if (obj.vlijanie_sily >= 0)
		data += "<font class='object_info_popup_caption'>Влияние силы:</font> " + obj.vlijanie_sily + "%<br>";
	if (obj.required_race >= 0)
		data += "<font class='object_info_popup_caption'>Требуемая Раса:</font> " + races[obj.required_race].name + "<br>";

	for (var i = 0; i < obj.parameters.length; i++) {
		var par = parameterTypes[obj.parameters[i].id];
		var val = formatStat(obj.parameters[i].value, par);

		if (modStat != "" && par.short_name == modStat) {
			val += " " + formatStat(modMult, par) + "(мод" +
				(initialZaklStat == initialModStat ? ", Закл" : "") + (initialZatStat == initialModStat ? ", заточ" : "") + ") = " + formatStat(obj.parameters[i].value - 0 + (modMult - 0), par);
			modStat = "";
		}

		if (zaklStat != "" && par.short_name == zaklStat) {
			val += " " + formatStat(zaklMult, par) + "(Закл" +
				(initialZatStat == initialZaklStat ? ", заточ" : "") + ") = " + formatStat(obj.parameters[i].value - 0 + (zaklMult - 0), par);
			modStat = "";
			zaklStat = "";
		}

		if (zatStat != "" && par.short_name == zatStat) {
			var plus = "";
			if (zatStat.indexOf('bron') >= 0)
				plus = "+ ";

			val += " " + plus + formatStat(zatNr * 5, par) + "(заточ) = " + formatStat(obj.parameters[i].value - 0 + (zatNr * 5 - 0), par);
			zatStat = "";
		}

		data += "<font class='object_info_popup_caption'>" + par.name + ":</font> " + val + "<br>";
	}

	if (modStat != "") {
		var parId = getStatId(modStat);
		data += "<font class='object_info_popup_caption'>" + parameterTypesZero[parId].name + ":</font> " + formatStat(modMult, parameterTypesZero[parId]) + "(мод" +
			(initialZaklStat == initialModStat ? ", Закл" : "") + (initialZatStat == initialModStat ? ", заточ" : "") + ")<br>";
		modStat = "";
	}

	if (zaklStat != "") {
		var parId = getStatId(zaklStat);
		data += "<font class='object_info_popup_caption'>" + parameterTypesZero[parId].name + ":</font> " + formatStat(zaklMult, parameterTypesZero[parId]) + "(Закл" +
			(initialZatStat == initialZaklStat ? ", заточ" : "") + ")<br>";
		zaklStat = "";
	}

	if (zatStat == "damage") {
		data += "<font class='object_info_popup_caption'>Урон:</font> +" + zatNr * 5 + "(заточ)<br>";
		if (obj.max_damage != -1) {
			data += "-" + (obj.max_damage - 0 + (zatNr * 5 - 0));
		}
		zatStat = "";
	}

	if (zatStat != "") {
		var parId = getStatId(zatStat);
		data += "<font class='object_info_popup_caption'>" + parameterTypesZero[parId].name + ":</font> " + formatStat(zatNr * 5, parameterTypesZero[parId]) + "(заточ)<br>"
		zatStat = "";
	}

	/*	
		if (zaklStat!="" && par.short_name==zaklStat)
		{
			val+=" "+formatStat(zaklMult,par)+"(закл"
				+(initialZatStat==initialZaklStat ?", зат":"")+") = "+formatStat(obj.parameters[i].value-0+(zaklMult-0),par);
					Stat="";
			zaklStat="";
		}
		
		if (zatStat!="")
		{
			val+=" "+formatStat(zatNr*5,par)+"(зат) = "+formatStat(obj.parameters[i].value-0+(zatNr*5-0),par);
			zatStat="";
		}
		
		if (modType-0>=0)
		{
			var parId=getStatId(stones[modType].statShortName);
			data+="<font class='object_info_popup_caption'>"+parameterTypesZero[parId].name+":</font> "+formatStat((modMult-0),parameterTypesZero[parId])+" (мод"
				+(modMult%2==0?", закл":"")+")<br>";
		}
		if (zaklType-0>=0)
		{
			var parId=getStatId(stones[zaklType].statShortName);
			data+="<font class='object_info_popup_caption'>"+parameterTypesZero[parId].name+":</font> "+formatStat((zaklMult-0),parameterTypesZero[parId])+"(закл)<br>";
		}
		*/


	if (obj.art_type === 4) {
		for (var j = 0; j < specialObjectsTypes.length; j++) {
			if ((specialObjectsTypes[j].name === obj.name)) {
				break;
			}
		}
		if (specialObjectsTypes[j].magic_properties.length) {
			data += "<font class='object_info_popup_title'>Магические свойства</font><br>"
			for (let mp = 0; mp < specialObjectsTypes[j].magic_properties.length; mp++) {
				data += "<font class='object_info_popup_caption'>" + specialObjectsTypes[j].magic_properties[mp].name + ": </font> " + specialObjectsTypes[j].magic_properties[mp].value + "<br>";
			}
		}

	}

	document.getElementById('objects_properties_div').innerHTML = data;
	document.getElementById('objects_properties_div').style.display = "inline";
	curObjectPropertyId = id;
}

function moveObjectsPropertiesDiv(event, id, modType, modMult, zaklType, zaklMult, zatType, zatNr) {
	if (typeof(modType) == 'undefined')
		modType = -1;
	if (typeof(modMult) == 'undefined')
		modMult = -1;
	if (typeof(zaklType) == 'undefined')
		zaklType = -1;
	if (typeof(zaklMult) == 'undefined')
		zaklMult = -1;
	if (typeof(zatType) == 'undefined')
		zatType = -1;
	if (typeof(zatNr) == 'undefined')
		zatNr = -1;
	positionPopup('objects_properties_div', event, POPUP_OFSET_X, POPUP_OFSET_Y);

	if (typeof(id) != 'undefined' && id != curObjectPropertyId) {
		showObjectsPropertiesDiv(id, modType, modMult, zaklType, zaklMult, zatType, zatNr);
	}
}

function showModSelectTable(event, StoneIsMod, persNr, bodyPartTypeShortName, bodyPartNr, isPodkladka) {
	hideObjectsSelectTable();
	hidePodkladkaCreate();
	hideZatChooseDiv();

	var obj;
	if (bodyPartTypeShortName == -1) //if the object is from the bag
	{
		var bag = (persNr == 0 ? bag1 : bag2);
		obj = bag[bodyPartNr];
	} else {
		var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
		var bodyPartId = getBodyPartId(bodyPartTypeShortName);
		obj = bodyPartsGen[bodyPartId].objects[bodyPartNr - 1];
	}
	if (isPodkladka != true && (StoneIsMod == 1 ? obj.modType : obj.zaklType) >= 0) {
		if (StoneIsMod)
			obj.modType = -1;
		else
			obj.zaklType = -1;
		if (bodyPartTypeShortName == -1)
			displayBagContent(persNr);
		else
			reload();
		return;
	}
	if (isPodkladka == true && (StoneIsMod == 1 ? obj.podklModType : obj.podklZaklType) >= 0) {
		if (StoneIsMod)
			obj.podklModType = -1;
		else
			obj.podklZaklType = -1;
		if (bodyPartTypeShortName == -1)
			displayBagContent(persNr);
		else
			reload();
		return;
	}
	var rez = "";
	rez += "<table id='modSelectTable'>";
	for (var i = 0; i < stones.length; i++) {
		var stone = stones[i];
		rez += "<tr>";
		rez += "<td><img class='stone_selector_img' src='" + STONES_PATH + stone.image + "'></img></td>";
		rez += "<td>" + stone.name + "</td>";
		var statNr = getStatId(stone.statShortName);
		rez += "<td>" + parameterTypesZero[statNr].name + "</td>";
		var st = new Array(3, 5, 7, 9, 11, 15, 19, 23, 28, 30, 33, 35, 37, 39);
		for (var k = 0; k < st.length; k++) {
			rez += "<td><div class='stone_selector_stat_nr' onclick='putOnStone(" + i + "," + st[k] + "," + StoneIsMod + "," + persNr + ",\"" + bodyPartTypeShortName + "\"," + (bodyPartNr - 1) + "," + (isPodkladka == true ? "true" : "false") + ");window.scrollTo(0,0)'>" +
				formatStat(st[k], parameterTypesZero[statNr]) + "</div></td>";
		}
		rez += "</tr>";
	}
	document.getElementById('mod_table_div').innerHTML = rez;
	document.getElementById('mod_choose_div').style.display = "inline";
	positionPopup('mod_choose_div', event);
}

function showZatochkiSelectTable(event, persNr, bodyPartTypeShortName, bodyPartNr) {
	hideObjectsSelectTable();
	hideModChooseDiv();
	var obj;
	var bagNr = -1;
	if (bodyPartTypeShortName == -1) //if the object is from the bag
	{
		var bag = (persNr == 0 ? bag1 : bag2);
		obj = bag[bodyPartNr];
		bagNr = bodyPartNr;
		var object = objects[obj.id];
		for (var i = 0; i < bodyPartsDB.length; i++) {
			if (bodyPartsDB[i].id == object.type_id)
				break;
		}

		bodyPartTypeShortName = bodyPartsDB[i].short_name;
		if (bodyPartTypeShortName == 'shi')
			bodyPartTypeShortName = 'oru';
	} else {
		var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
		var bodyPartId = getBodyPartId(bodyPartTypeShortName);
		obj = bodyPartsGen[bodyPartId].objects[bodyPartNr - 1];
	}

	//take off
	if (obj.zatType >= 0) {
		obj.zatType = -1;
		obj.zatNr = -1;
		/*if (bodyPartTypeShortName==-1)
			displayBagContent(persNr);
		else*/
		reload();
		return;
	}


	var rez = "";
	rez += "<table id='zatSelectTable'>";
	var firstZat = true;
	for (var i = 0; i < zatochki.length; i++) {
		var zat = zatochki[i];

		if (zat.statShortName == "damage") {
			//TO DO !!!!!!! check if not armor
			if (bodyPartTypeShortName != "oru") {
				continue;
			}
		} else if (zat.statShortName == "bron") {
			//TO DO !!!!!!! check if not weapon
			if (bodyPartTypeShortName != "shl" && bodyPartTypeShortName != "lat" && bodyPartTypeShortName != "per" &&
				bodyPartTypeShortName != "oru" && bodyPartTypeShortName != "pon" && bodyPartTypeShortName != "nar") {
				continue;
			}
		} else {
			if (bodyPartTypeShortName != "amu" && bodyPartTypeShortName != "poi" && bodyPartTypeShortName != "kol" && bodyPartTypeShortName != "sht") {
				continue;
			}
		}

		rez += "<tr>";
		rez += "<td>Свиток " + zat.name + "</td>";

		var statName;
		switch (zat.statShortName) {
			case "damage":
				statName = "Урон";
				break;
			case "bron":
				statName = "Броня";
				break;
			default:
				statNr = getStatId(zat.statShortName);
				statName = parameterTypesZero[statNr].name;
				break;
		}
		rez += "<td>" + statName + " +5</td>";
		rez += "<td><input type='radio' name='zat_radio' onchange='reloadZatStats()' id='zat_option_" + (i * 2) + "' " + (firstZat ? "checked" : "") + "></input><img class='zat_selector_img' src='" + STONES_PATH + zat.imageLevel1 + "'></img></td>";
		// rez+="<td><input type='radio' name='zat_radio' onchange='reloadZatStats()' id='zat_option_"+(i*2+1)+"'></input><img class='zat_selector_img' src='"+STONES_PATH+zat.imageLevel2+"'></img></td>";
		firstZat = false;
		rez += "</tr>";
	}
	rez = '<button onClick="putOnZat(' + (bagNr != -1 ? bagNr : "") + ')">Вставить</button>' + rez;
	document.getElementById('zat_table_div').innerHTML = rez;
	document.getElementById('zat_choose_div').style.display = "inline";
	reloadZatStats();
	positionPopup('zat_choose_div', event);
	setTimeout("document.getElementById('zat_quantity').focus()", 0);
}

function reloadZatStats() {
	var quantity = document.getElementById('zat_quantity').value;
	quantity = quantity.replace(/[^\d]+/g, "");
	quantity = quantity.match(/^.{0,20}/);
	document.getElementById('zat_quantity').value = quantity;

	for (var i = 0; i < zatochki.length * 2; i++) {
		var el = document.getElementById("zat_option_" + i);
		if (el != null && el.checked) {
			var zat = zatochki[Math.floor(i / 2)];
			// var unitaryProbability=(i%2==0?50:70);
			// document.getElementById('zat_unitar_probability').innerHTML=unitaryProbability+"%";
			if (quantity == null || String(quantity).length == 0 || String(quantity) == '0') {
				// document.getElementById('zat_simple_price').innerHTML="-";
				//document.getElementById('zat_total_probability').innerHTML="-";
				// document.getElementById('zat_predicted_quantity').innerHTML="-";
				// document.getElementById('zat_predicted_price').innerHTML="-";
				break;
			}
			// document.getElementById('zat_simple_price').innerHTML=5*quantity+".00";
			// document.getElementById('zat_simple_price').style.color=(i%2==0?"":"blue");
			var statName;
			switch (zat.statShortName) {
				case "damage":
					statName = "Урон";
					break;
				case "bron":
					statName = "Броня";
					break;
				default:
					statNr = getStatId(zat.statShortName);
					statName = parameterTypesZero[statNr].name;
					break;
			}
			document.getElementById('zat_stats').innerHTML = statName + ": +" + (5 * quantity);
			// var totalProbability=unitaryProbability/Math.pow(2,quantity-1);
			// var totalProbString=String(totalProbability.toFixed(10).match(/^[0-9]+[\.]{0,1}0*[1-9]{0,2}/)).replace(/[0]+$/, '').replace(/\.$/, '');
			//("/^[0-9]+[\.]{0,1}0*[1-9]{0,2}/");
			//document.getElementById('zat_total_probability').innerHTML=totalProbString+"%";

			var quantityNeeded = getProbability(i % 2 == 1, quantity);
			// document.getElementById('zat_predicted_quantity').innerHTML=(quantityNeeded>=0?(quantityNeeded):"Ну очень много");
			// document.getElementById('zat_predicted_price').innerHTML=(quantityNeeded>=0?(quantityNeeded*5+".00"):"Ну очень много");
			// document.getElementById('zat_predicted_price').style.color=(i%2==0?"":"blue");

			break;
		}
	}
}

function showStonePropPopup(event, persNr, bodyPartTypeShortName, bodyPartNr, StoneIsMod, isPodkladka) {
	var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
	bodyPartNr = (typeof(bodyPartNr) != 'undefined' || isFilter) ? bodyPartNr : 1;
	bodyPartNr--;
	var partId = getBodyPartId(bodyPartTypeShortName);
	var stoneType, stoneMult;
	if (isPodkladka != true) {
		if (StoneIsMod) {
			stoneType = bodyPartsGen[partId].objects[bodyPartNr].modType;
			stoneMult = bodyPartsGen[partId].objects[bodyPartNr].modMult;
		} else {
			stoneType = bodyPartsGen[partId].objects[bodyPartNr].zaklType;
			stoneMult = bodyPartsGen[partId].objects[bodyPartNr].zaklMult;
		}
	} else {
		if (StoneIsMod) {
			stoneType = bodyPartsGen[partId].objects[bodyPartNr].podklModType;
			stoneMult = bodyPartsGen[partId].objects[bodyPartNr].podklModMult;
		} else {
			stoneType = bodyPartsGen[partId].objects[bodyPartNr].podklZaklType;
			stoneMult = bodyPartsGen[partId].objects[bodyPartNr].podklZaklMult;
		}
	}

	if (stoneType == -1)
		return;

	var rez = "<table><tr><td><img src='" + STONES_PATH + stones[stoneType].image + "'></img></td><td>";
	rez += stones[stoneType].name + "<br>";
	var statId = getStatId(stones[stoneType].statShortName);
	rez += parameterTypesZero[statId].name + " " + formatStat(stoneMult, parameterTypesZero[statId]);
	rez += "</td></tr></table>";
	document.getElementById('stone_properties_div').innerHTML = rez;
	positionPopup('stone_properties_div', event, POPUP_OFSET_X, POPUP_OFSET_Y);
	document.getElementById('stone_properties_div').style.display = "inline";

}

function showZatPropPopup(event, persNr, bodyPartTypeShortName, bodyPartNr, isBlue) {
	var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
	bodyPartNr = (typeof(bodyPartNr) != 'undefined' || isFilter) ? bodyPartNr : 1;
	bodyPartNr--;
	var partId = getBodyPartId(bodyPartTypeShortName);

	var zatIsBlue = (bodyPartsGen[partId].objects[bodyPartNr].zatType % 2 == 1);
	var zatType = Math.floor(bodyPartsGen[partId].objects[bodyPartNr].zatType / 2);

	var zatNr = bodyPartsGen[partId].objects[bodyPartNr].zatNr;

	if (zatType == -1)
		return;

	var rez = "<table><tr><td><img src='" + STONES_PATH + (zatIsBlue ? zatochki[zatType].imageLevel2 : zatochki[zatType].imageLevel1) + "'></img></td><td>";
	rez += zatNr + "*Свиток " + zatochki[zatType].name + (zatIsBlue ? " 2" : " 1") + " уровня<br>";

	var statName = zatochki[zatType].statShortName;
	statName = zatGetRealStatShortName(statName, bodyPartTypeShortName);

	if (statName == 'damage') {
		statName = "Урон";
	} else {
		var statId = getStatId(statName);
		var statName = parameterTypesZero[statId].name;
	}

	//rez+=statName+" "+formatStat(zatNr*5,parameterTypesZero[statId]);
	rez += statName + ": +" + zatNr * 5;
	// rez+="<br>Цена: <span "+(zatIsBlue?"style='color:blue'":"")+">"+zatNr*5+".00</span>";
	rez += "</td></tr></table>";
	document.getElementById('stone_properties_div').innerHTML = rez;
	positionPopup('stone_properties_div', event, POPUP_OFSET_X, POPUP_OFSET_Y);
	document.getElementById('stone_properties_div').style.display = "inline";

}


function hideObjectsSelectTable() {
	document.getElementById('objects_div').style.display = "none";
	hideObjectsPropertiesDiv();
}

function hideObjectsTypeSelectTable() {
	document.getElementById('objects_choose_div').style.display = "none";
}

function hideObjectsPropertiesDiv() {
	curObjectPropertyId = -1;
	document.getElementById('objects_properties_div').style.display = "none";
}

function resetNameFilter() {
	document.getElementById('object_select_filter_name').value = "";
}

function resetObjectsSelectFilters() {
	resetNameFilter();
	document.getElementById('object_select_filter_min_level').value = "";
	document.getElementById('object_select_filter_max_level').value = "";
}

function hideModChooseDiv() {
	document.getElementById('mod_choose_div').style.display = "none";
}

function hideZatChooseDiv() {
	document.getElementById('zat_choose_div').style.display = "none";
	document.getElementById('zat_quantity').value = "1";
	reloadZatStats();
}

function hideStonePropPopup() {
	document.getElementById('stone_properties_div').style.display = "none";
}