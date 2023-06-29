var plantTypeSelected = new Array();
plantTypeSelected[0] = -1;
plantTypeSelected[1] = -1;
plantTypeSelected[2] = -1;
plantTypeSelected[3] = -1;

plantListByTypes = new Array();
plantListByTypes[0] = new Array();
plantListByTypes[1] = new Array();
plantListByTypes[2] = new Array();
plantListByTypes[3] = new Array();

//type_id==1 => fruit
function useDrink(id, persNr) {
	var drinksUsed = (persNr == 1 ? drinksUsed1 : drinksUsed2);
	var normalLeft = 50;
	var createdLeft = 10;
	var fruitsLeft = 50;
	var magicLeft = 20;

	for (var i = 0; i < drinksUsed.length; i++) {
		var dr = drinksUsed[i];
		var obj = objects[dr.id];
		if (dr.id == -1)
			continue;
		if (obj.defaultObject) {

			switch (obj.drink_type) {
				case 1:
					normalLeft -= dr.nr;
					break;
				case 3:
					fruitsLeft -= dr.nr;
					break;
				case 4:
					magicLeft -= dr.nr;
					break;
			}

		} else
			createdLeft -= dr.nr;
	}
	var obj = objects[id];

	var nr = -1;
	var maxDrinks = -1;
	if (obj.defaultObject) {

		switch (obj.drink_type) {
			case 1:
				maxDrinks = normalLeft;
				break;
			case 3:
				maxDrinks = fruitsLeft;
				break;
			case 4:
				maxDrinks = magicLeft;
				break;
		}
	} else if (!obj.defaultObject) {
		maxDrinks = createdLeft;
	}


	if (maxDrinks == 0) {
		alert("Вы больше не можете употреблять данный тип снадобий так как максимальное количество достигнуто.");
		return;
	}

	while ((!is_int(nr) || nr < 0 || (maxDrinks != -1 && nr - 0 > maxDrinks - 0)) && nr !== null) {
		if (maxDrinks == -1)
			nr = prompt("Введите сколько снадобий|плодов \"" + objects[id].name + "\" вы хотите выпить |съесть или 0 для отмены.", "");
		else
			nr = prompt("Введите сколько снадобий|плодов \"" + objects[id].name + "\" вы хотите выпить |съесть или 0 для отмены. Максимальное количество: " + maxDrinks, "");
	}
	if (nr == 0 || nr === null)
		return;
	drinksUsed = (persNr == 1) ? drinksUsed1 : drinksUsed2;
	var ind = drinksUsed.length;
	drinksUsed[ind] = new Object();
	drinksUsed[ind].id = id;
	drinksUsed[ind].nr = nr;
	reloadDrinksQuantity();
	reload();
	hideDrinkSelectTable();
	hideDrinksPropertiesDiv();
}

var lastDrinkPersNr = -1;

function showDrinkSelectTable(event, persNr) {
	if (typeof(persNr) == 'undefined')
		persNr = lastDrinkPersNr;
	else {
		resetNameFilter();
		lastDrinkPersNr = persNr;
	}
	hideDrinksPropertiesDiv();
	var table = "";
	var row_closed = true;
	var curRowImagesNr = 0;
	var elementsPerRow = 7;

	var drinkFound = false;

	var nameFilter = document.getElementById('drinks_select_filter_name').value;


	var nameRegex = new RegExp("(.*" + nameFilter + ".*)", "i");

	showNormal = document.getElementById("showNormalDrinksFilter").checked;
	showCreated = document.getElementById("showCreatedDrinksFilter").checked;
	showBlue = document.getElementById("showBlueDrinksFilter").checked;
	showFruits = document.getElementById("showFruitsFilter").checked;
	showMagic = document.getElementById("showMagicDrinksFilter").checked;

	//filtering by parameters
	statFilters = getUsedStatFilters("drinks_parameters_filter");
	var filtersList = "";
	if (statFilters.length > 0) {
		filtersList = "<b>Фильтры: </b>";
		for (var filterInd = 0; filterInd < statFilters.length; filterInd++) {
			filtersList += statFilters[filterInd].name;
			if (filterInd < statFilters.length - 1)
				filtersList += ", ";
		}
		filtersList += ". <a onclick='resetStatFilters(\"drinks_parameters_filter\");showDrinkSelectTable(event);' class='pointerCursor' style='color:blue'>Сбросить</a>";
	}
	document.getElementById('drinks_parameters_filters_list').innerHTML = filtersList;

	for (var i = 0; i < objects.length; i++) {
		//do not take into consideration invalid objects
		var obj = objects[i];
		if (obj.photo_location == -1)
			continue;

		if (obj["is_drink"] == 0)
			continue;
		if (!obj["name"].match(nameRegex))
			continue;

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

		//filter by drink type
		if (obj.defaultObject) {
			switch (obj.drink_type) {
				case 1:
					if (!showNormal) {
						continue;
					}
					break;
				case 2:
					if (!showBlue) {
						continue;
					}
					break;
				case 3:
					if (!showFruits) {
						continue;
					}
					break;
				case 4:
					if (!showMagic) {
						continue;
					}
					break;
			}

			/*
						if (obj.price_sinie>0)
						{
							if (!showBlue)
								continue;	
						}
						else
						{
							if (obj.drink_type==3)
							{
								if (!showFruits)
									continue;
							}
							else
								if (!showNormal)
									continue;
						}*/
		} else {
			if (!showCreated)
				continue;
		}

		drinkFound = true;

		if (curRowImagesNr == 0) {
			table += "<div><tr></div>"
			row_closed = false;
			var titlesRow = "";
		}
		curRowImagesNr++;
		table += "<td onmousemove='moveDrinksPropertiesDiv(event," + i + ",1);'><img style='width:50px; height:50px;' src='" + MISC_IMAGES_PATH + obj["photo_location"] + "' onclick='useDrink(" + i + "," + persNr + ")'></img>";
		if (!obj.defaultObject)
			table += "<img style='width:13px; height:13px;' src='" + MISC_IMAGES_PATH + "red_cross.png' onclick='deleteDrink(" + i + ")' title='Удалить напиток'></img>"
		table += "</td>";
		titlesRow += "<td onmousemove='moveDrinksPropertiesDiv(event," + i + ",1);'><font class='object_info_title'>" + obj.name + "</font></td>"
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
	table = "<table id='drinks_table'>" + table + "</table>";

	if (drinkFound == false)
		table += "<br> <br>Не найдены напитки/плоды которые соответствуют выбранными фильтрами<br><br>"

	table += '<button onclick="showDrinkCreate(event);window.scrollTo(0,0);hideDrinkSelectTable();hideDrinksPropertiesDiv();">Создать напиток</button>';
	table += '<button onclick="showUsedDrinksList(1,true,true,true,true,true);window.scrollTo(0,0);hideDrinkSelectTable();hideDrinksPropertiesDiv();">Показать все выпитые напитки</button>';

	document.getElementById('drinks_table_div').innerHTML = table;
	var reloadDr = false
	if (document.getElementById('drinks_div').style.display != "inline") {
		resetDrinksSelectNameFilter();
		reloadDr = true;
	}
	document.getElementById('drinks_div').style.display = "inline";
	if (reloadDr)
		showDrinkSelectTable(event);
	document.getElementById('drinks_select_filter_name').focus();
}

var curMultiplier = -1;

function moveDrinksPropertiesDiv(event, id, multiplier) {
	positionPopup('drinks_properties_div', event, POPUP_OFSET_X, POPUP_OFSET_Y);

	if (typeof(id) != 'undefined' && (id != curObjectPropertyId || multiplier != curMultiplier)) {
		showDrinksPropertiesDiv(id, multiplier);
	}
}

function showDrinksPropertiesDiv(id, multiplier) {
	var obj = objects[id];

	let description = '';
	switch (obj.name) {
		case "Волшебный эликсир силы":
			description += 'Заморозить противника';
			break;
		case "Волшебный эликсир реакции":
			description += 'Магический панцирь';
			break;
		case "Волшебный эликсир ловкости":
			description += 'Напугать противника';
			break;
		case "Волшебный эликсир злости":
			description += 'Берсерк';
			break;
		case "Волшебный эликсир удачи":
			description += 'Противостояние';
			break;
	}
	var data = "";
	data += "<div class='object_info_popup_title'>" + obj.name + "</div>";
	/*	if (obj.price_serye>EPS || obj.price_sinie>EPS)
		{
			data+="<font class='object_info_popup_caption'>Цена:</font> ";
			if (obj.price_serye>EPS)
				data+=obj.price_serye+((obj.price_serye-parseInt(obj.price_serye)<EPS)?".00":0);
			if (obj.price_serye>EPS && obj.price_sinie>EPS)
				data+=" + ";
			if (obj.price_sinie>EPS)
				data+="<font class='object_info_popup_price_sinie'>"+obj.price_sinie+((obj.price_sinie-parseInt(obj.price_sinie)<EPS)?".00":0)+"</font>";
			data+="<br>";
		}*/
	for (var i = 0; i < obj.parameters.length; i++) {
		var par = parameterTypes[obj.parameters[i].id];
		var val;
		if (multiplier == 1)
			val = formatStat(obj.parameters[i].value, par);
		else
			val = formatStat(obj.parameters[i].value, par) + " * " + multiplier + " = " + formatStat(obj.parameters[i].value * multiplier, par);
		data += "<font class='object_info_popup_caption'>" + par.name + ":</font> " + val + "<br>";
	}

	if (obj.drink_duration >= 0) {
		var duration = "";
		if (obj.drink_duration >= 24) {
			duration += obj.drink_duration / 24 + "д ";
		}
		if (obj.drink_duration % 24 != 0)
			duration += obj.drink_duration % 24 + "ч";

		data += "<font class='object_info_popup_caption'>Время действия:</font> " + duration + "<br>";
	}
	if (obj.drink_type === 4) {
		data += '<font class="object_info_popup_caption"></font> ' + description + '<br>';
	}
	document.getElementById('drinks_properties_div').innerHTML = data;
	resetDrinksSelectNameFilter();
	document.getElementById('drinks_properties_div').style.display = "inline";
	curObjectPropertyId = id;
	curMultiplier = multiplier;
}

function deleteDrink(id) {
	var obj = objects[id];
	if (!confirm("Вы уверены что хотите удалить напиток \"" + obj.name + "\"?"))
		return;
	hideDrinksPropertiesDiv();
	hideDrinkSelectTable();
	for (var persNr = 0; persNr <= 1; persNr++) {
		var drinksUsed = (persNr == 0 ? drinksUsed1 : drinksUsed2);
		for (var i = 0; i < drinksUsed.length; i++) {
			if (drinksUsed[i].id == id)
				drinksUsed[i].id = -1;
		}
	}
	objects[id] = new Object();
	objects[id].photo_location = -1; //invalidate object

	reload();
}

function hideDrinksPropertiesDiv() {
	document.getElementById('drinks_properties_div').style.display = "none";
	curObjectPropertyId = -1;
	curMultiplier = -1;
}


function hideDrinkSelectTable() {
	document.getElementById('drinks_div').style.display = "none";
}

function createDrink(event) {
	if (plantTypeSelected == -1 || plantTypeSelected[2] == -1 || (plantTypeSelected[1] == -1 && plantTypeSelected[0] == -1)) {
		alert("Вы не выбрали все нужные травы");
		return;
	}

	var parameter1 = plantTypeSelected[0] == -1 ? -1 : parameterTypesZero[getStatId(plantTypes[plantListByTypes[0][plantTypeSelected[0]]].parameter)];
	var parameter2 = plantTypeSelected[1] == -1 ? -1 : parameterTypesZero[getStatId(plantTypes[plantListByTypes[1][plantTypeSelected[1]]].parameter)];
	var plant1 = plantTypeSelected[0] == -1 ? -1 : plantTypes[plantListByTypes[0][plantTypeSelected[0]]];
	var plant2 = plantTypeSelected[1] == -1 ? -1 : plantTypes[plantListByTypes[1][plantTypeSelected[1]]];
	var plant1Id = plantTypeSelected[0] == -1 ? -1 : plantListByTypes[0][plantTypeSelected[0]];
	var plant2Id = plantTypeSelected[1] == -1 ? -1 : plantListByTypes[1][plantTypeSelected[1]];

	var duration = plantTypes[plantListByTypes[2][plantTypeSelected[2]]].duration;
	var quantity = plantTypes[plantListByTypes[3][plantTypeSelected[3]]].quantity;

	var drinkName = GenerateDrinkName(plant1 == -1 ? -1 : plant1.articledName, plant2 == -1 ? -1 : plant2.articledName, duration, quantity);
	var photoLocation = getDrinkImage(plant1Id, plant2Id, duration);

	var id = objects.length;
	objects[id] = new Object();
	objects[id].id = -1;
	objects[id].name = drinkName;
	objects[id].photo_location = photoLocation;
	objects[id].price_serye = 0;
	objects[id].price_sinie = 0;
	objects[id].is_drink = 1;
	objects[id].drink_duration = duration;
	objects[id].imageFromDB = false;
	objects[id].defaultObject = false;
	objects[id].parameters = new Array();
	var nr = 0;
	for (var i = 0; i < 2; i++) {
		var par = (i == 0 ? parameter1 : parameter2);
		if (par != -1) {
			objects[id].parameters[nr] = new Object();
			objects[id].parameters[nr].id = par.id;
			objects[id].parameters[nr].value = quantity;
			++nr;
		}
	}

	resetPlantTypesSelected();
	hideDrinkCreate(lastDrinkPersNr);
	showDrinkSelectTable();
}

function GenerateDrinkName(plant1name, plant2name, duration, quantity) {
	var name = "";
	if (duration == 8)
		name += "крепкое ";
	if (duration == 2)
		name += "слабое ";
	name += "зелье из ";
	if (plant1name != -1) {
		name += plant1name;
		if (plant2name != -1)
			name += " и ";
	}
	if (plant2name != -1)
		name += plant2name;
	return name;
}

function getDrinkImage(plant1Id, plant2Id, duration) {
	var plantId = (plant1Id != -1 ? plant1Id : plant2Id);
	var photo = "smd";
	if (duration == 2)
		photo += "0";
	if (duration == 4)
		photo += "1";
	if (duration == 8)
		photo += "2";
	photo += "_" + plantId + ".gif";
	return photo;
}

function hideDrinkCreate() {
	document.getElementById("drink_create_div").style.display = "none";
}

function showDrinkCreate() {
	var rez = '';
	rez += "<table id='drink_create_table'>";
	rez += "<tr><td colspan=100>Травы на статы</td></tr>"
	rez += "<tr class='plantsSelectTr'>";
	var inserted = 0;
	for (var i = 0; i < plantTypes.length; i++) {
		if (plantTypes[i].parameter == -1)
			continue;
		var stat = parameterTypesZero[getStatId(plantTypes[i].parameter)];
		if (stat.multiplier == 1) {
			plantListByTypes[0][inserted] = i;
			if (inserted == 5)
				rez += "</tr><tr>";
			rez += "<td style='text-align: center' class='plantsSelectTd' id='plantSelect_0_" + inserted + "' onclick='selectPlant(0," + inserted + ")'>" + plantTypes[i].name + "<br><img src='" + MISC_IMAGES_PATH + plantTypes[i].image + "'/><br>" + stat.name + "</td>";
			++inserted;
		}
	}
	rez += "<td style='text-align: center' class='plantsSelectTd' onclick='selectPlant(0,-1)'>Без травы</td></tr>";
	rez += "<tr><td colspan=100>Травы на обереги/антиобереги</td></tr>"
	rez += "<tr>";
	inserted = 0;
	for (var i = 0; i < plantTypes.length; i++) {
		if (plantTypes[i].parameter == -1)
			continue;
		var stat = parameterTypesZero[getStatId(plantTypes[i].parameter)];
		if (stat.multiplier == 5 || stat.multiplier == -5) {
			plantListByTypes[1][inserted] = i;
			if (inserted == 5)
				rez += "</tr><tr>";
			rez += "<td style='text-align: center' class='plantsSelectTd' id='plantSelect_1_" + inserted + "' onclick='selectPlant(1," + inserted + ")'>" + plantTypes[i].name + "<br><img src='" + MISC_IMAGES_PATH + plantTypes[i].image + "'/><br>" + stat.name + "</td>";
			++inserted;
		}
	}
	rez += "<td style='text-align: center' class='plantsSelectTd' onclick='selectPlant(1,-1)'>Без травы</td></tr>";
	rez += "<tr><td colspan=100>Травы на срок действия</td></tr>"
	rez += "<tr>";
	inserted = 0;
	for (var i = 0; i < plantTypes.length; i++) {
		if (plantTypes[i].duration == -1)
			continue;
		plantListByTypes[2][inserted] = i;
		rez += "<td style='text-align: center' class='plantsSelectTd' id='plantSelect_2_" + inserted + "' onclick='selectPlant(2," + inserted + ")'>" + plantTypes[i].name + "<br><img src='" + MISC_IMAGES_PATH + plantTypes[i].image + "'/><br>" + plantTypes[i].duration + " часа</td>";
		inserted++;
	}
	rez += "</tr>";
	rez += "<tr><td colspan=100>Травы на количество статов и оберегов</td></tr>"
	rez += "<tr>";
	inserted = 0;
	for (var i = 0; i < plantTypes.length; i++) {
		var qnt = plantTypes[i].quantity;
		if (qnt == -1)
			continue;
		plantListByTypes[3][inserted] = i;
		rez += "<td style='text-align: center' class='plantsSelectTd' id='plantSelect_3_" + inserted + "' onclick='selectPlant(3," + inserted + ")'>" + plantTypes[i].name + "<br><img src='" + MISC_IMAGES_PATH + plantTypes[i].image + "'/><br>+" + qnt + "/±" + 5 * qnt + "%</td>";
		inserted++;
	}
	rez += "</tr>";
	rez += "</table>";
	rez += "<button onclick='createDrink(event)'>Создать напиток</button>";
	rez += "<button onclick='hideDrinkCreate()'>Закрыть</button>";
	rez += "";
	document.getElementById("drink_create_div").innerHTML = rez;
	document.getElementById("drink_create_div").style.display = "inline";
}
//	background-color:#d3c1d7;

function selectPlant(type, id) {
	if (plantTypeSelected[type] != -1)
		document.getElementById("plantSelect_" + type + "_" + plantTypeSelected[type]).style.removeProperty('background-color');
	plantTypeSelected[type] = id;
	if (id >= 0)
		document.getElementById("plantSelect_" + type + "_" + id).style.backgroundColor = "#d5ac6d";
}

function resetDrinksSelectNameFilter() {
	document.getElementById('drinks_select_filter_name').value = "";
}

function resetDrinksSelectFilters() {
	resetStatFilters("drinks_parameters_filter");
	resetDrinksSelectNameFilter();
}

function reloadDrinksQuantity() {
	for (var persNr = 0; persNr < 2; persNr++) {
		drinksUsed = (persNr == 0 ? drinksUsed1 : drinksUsed2);
		var normal = 0;
		var created = 0;
		var blue = 0;
		var fruits = 0;
		var magic = 0;
		for (var i = 0; i < drinksUsed.length; i++) {
			var obj = objects[drinksUsed[i].id];
			if (drinksUsed[i].id == -1)
				continue;
			if (obj.defaultObject == 1) {

				switch (obj.drink_type) {
					case 1:
						normal = normal - 0 + (drinksUsed[i].nr - 0);
						break;
					case 2:
						blue = blue - 0 + (drinksUsed[i].nr - 0);
						break;
					case 3:
						fruits = fruits - 0 + (drinksUsed[i].nr - 0);
						break;
					case 4:
						magic = magic - 0 + (drinksUsed[i].nr - 0);
						break;
				}

			} else
				created = created - 0 + (drinksUsed[i].nr - 0);
		}
		var pers = "pers" + (persNr + 1) + "_";
		document.getElementById(pers + "normal_drinks_drinked").innerHTML = normal;
		document.getElementById(pers + "created_drinks_drinked").innerHTML = created;
		document.getElementById(pers + "blue_drinks_drinked").innerHTML = blue;
		document.getElementById(pers + "fruits_eaten").innerHTML = fruits;
		document.getElementById(pers + "magic_eaten").innerHTML = magic;
	}
}

function showUsedDrinksList(persNr, showNormal, showCreated, showBlue, showFruits, showMagic) {
	showNormal = (typeof(showNormal) != 'undefined') ? showNormal : document.getElementById("showNormalDrinksChk").checked;
	showCreated = (typeof(showCreated) != 'undefined') ? showCreated : document.getElementById("showCreatedDrinksChk").checked;
	showBlue = (typeof(showBlue) != 'undefined') ? showBlue : document.getElementById("showBlueDrinksChk").checked;
	showFruits = (typeof(showFruits) != 'undefined') ? showFruits : document.getElementById("showFruitsChk").checked;
	showMagic = (typeof(showMagic) != 'undefined') ? showMagic : document.getElementById("showMagicChk").checked;

	rez = "";
	var drinksUsed = (persNr == 1 ? drinksUsed1 : drinksUsed2);
	rez += "Показывать: "
	rez += "<input type='checkbox' onchange='showUsedDrinksList(" + persNr + ")' id='showNormalDrinksChk' " + (showNormal ? "checked" : "") + ">Обычные снадобья</input> ";
	rez += "<input type='checkbox' onchange='showUsedDrinksList(" + persNr + ")' id='showCreatedDrinksChk' " + (showCreated ? "checked" : "") + ">Самодельные снадобья</input> ";
	rez += "<input type='checkbox' onchange='showUsedDrinksList(" + persNr + ")' id='showBlueDrinksChk' " + (showBlue ? "checked" : "") + ">Снадобья Древних</input> ";
	rez += "<input type='checkbox' onchange='showUsedDrinksList(" + persNr + ")' id='showFruitsChk' " + (showFruits ? "checked" : "") + ">Проды 1 уровня</input> ";
	rez += "<input type='checkbox' onchange='showUsedDrinksList(" + persNr + ")' id='showMagicChk' " + (showMagic ? "checked" : "") + ">Проды 2 уровня</input> ";
	rez += "<input type='checkbox' onchange='showUsedDrinksList(" + persNr + ")' id='showMagicChk' " + (showMagic ? "checked" : "") + ">Благословения</input> ";

	if (drinksUsed.length > 0) {
		rez += "<br><table>";
		rez += "<tr><td></td><td>Название</td><td>Количество</td><td>Вероятность срабатывания статов</td></tr>";

		var nrDrinked = 0;
		for (var i = 0; i < drinksUsed.length; i++) {
			var dr = drinksUsed[i];
			var obj = objects[dr.id];
			if (dr.id == -1)
				continue;

			if (obj.defaultObject) {
				switch (obj.drink_type) {
					case 1:
						if (!showNormal) {
							continue;
						}
						break;
					case 2:
						if (!showBlue) {
							continue;
						}
						break;
					case 3:
						if (!showFruits) {
							continue;
						}
						break;
					case 4:
						if (!showMagic) {
							continue;
						}
						break;
				}
			} else {
				if (!showCreated)
					continue;
			}
			var nr = dr.nr;
			while (nr > 0) {
				var nr1 = (nrDrinked < 400 && nr - 0 + (nrDrinked - 0) > 400) ? 400 - nrDrinked : nr;
				rez += "<tr>";
				rez += "<td><img src='" + MISC_IMAGES_PATH + obj.photo_location + "' style='width:15px; height:15px;'/></td>";
				rez += "<td onmousemove='moveDrinksPropertiesDiv(event," + dr.id + "," + dr.nr + ");' onmouseout='hideDrinksPropertiesDiv()'>" + obj.name + "</td>";
				rez += "<td>" + nr1 + "</td>";
				rez += "<td>" + (nrDrinked < 400 ? "100%" : "30%") + "</td>";
				rez += "<td><button onclick='removeDrinkedDrink(" + persNr + "," + i + ")'>Удалить</button></td>";
				/*rez+="<td>"++"</td>";
				rez+="<td>"++"</td>";
				rez+="<td>"++"</td>";*/
				rez += "</tr>";
				nrDrinked += (nr1 - 0);
				nr -= nr1;
			}
		}
		rez += "</table>";
	} else
		rez += "<br> <br>Вы не использовали не один напиток. Для упива нажмите на кнопку \"Выпить напиток\"<br><br>";
	rez += "<button onclick='hideUsedDrinksList()'>Закрыть</button>"
	rez += "<button onclick='hideUsedDrinksList();showDrinkSelectTable(event,1);window.scrollTo(0,0)'>Выпить напиток</button>"
	document.getElementById("drinked_drinks_list").innerHTML = rez;
	window.scrollTo(0, 0);
	document.getElementById("drinked_drinks_list").style.display = "inline";
}

function hideUsedDrinksList() {
	document.getElementById("drinked_drinks_list").style.display = "none";
}

function removeDrinkedDrink(persNr, id) {
	var drinksUsed = (persNr == 1 ? drinksUsed1 : drinksUsed2);
	var maxNr = drinksUsed[id].nr;

	while ((!is_int(nr) || nr - 0 < 0 || nr - 0 > maxNr - 0) && nr !== null) {
		var nr = prompt("Какое количество снадобий \"" + objects[drinksUsed[id].id].name + "\" вы хотите удалить? Максимальное количество: " + maxNr, maxNr);
	}
	if (nr === null || nr == 0)
		return;

	if (nr == maxNr)
		drinksUsed[id].id = -1

	drinksUsed[id].nr -= nr;
	showUsedDrinksList(persNr);
	reloadDrinksQuantity();
	reload();
}

function resetPlantTypesSelected() {
	plantTypeSelected[0] = -1;
	plantTypeSelected[1] = -1;
	plantTypeSelected[2] = -1;
	plantTypeSelected[3] = -1;
}