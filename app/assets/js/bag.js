function addToBag(persNr, id, quantity, modType, modMult, zaklType, zaklMult, zatType, zatNr) {
	bag = (persNr == 0 ? bag1 : bag2);
	var ind = bag.length;
	for (var i = 0; i < bag.length; i++) {
		if (bag[i].id == -1) {
			ind = i;
			break;
		}
	}
	bag[ind] = new Object();
	bag[ind].id = id;
	bag[ind].quantity = quantity;
	bag[ind].modType = modType;
	bag[ind].modMult = modMult;
	bag[ind].zaklType = zaklType;
	bag[ind].zaklMult = zaklMult;
	bag[ind].zatType = zatType;
	bag[ind].zatNr = zatNr;
	if (document.getElementById('bag_content_div').style.display == "inline")
		displayBagContent(persNr);
}

function removeFromBag(persNr, id, nr) {
	bag = (persNr == 0 ? bag1 : bag2);
	bag[id].quantity -= nr;
	if (bag[id].quantity - 0 <= 0)
		bag[id].id = -1;
	displayBagContent(persNr);
}

function displayBagContent(persNr) {
	var bag = (persNr == 0 ? bag1 : bag2);
	rez = "";
	rez += "<table onmousemove='moveObjectsPropertiesDiv(event);'>";
	rez += "<tr><td></td><td>Имя</td><td>Количество</td><td>Мод</td><td>Закл</td><td>Заточки</td></tr>";
	var added = false;
	for (var i = 0; i < bag.length; i++) {
		if (bag[i].id == -1)
			continue;
		added = true;
		var obj = objects[bag[i].id];
		rez += "<tr>";
		var path = obj.defaultObject ? OBJECTS_PATH : (obj.imageFromDB ? SPECIAL_OBJECTS_PATH : TEMP_SPECIAL_OBJECTS_PATH);
		if (obj.is_podkladka == 1)
			path = MISC_IMAGES_PATH;

		rez += "<td onmousemove='moveObjectsPropertiesDiv(event," + bag[i].id + ");'><img src='" + path + obj.photo_location + "' style='width:15px; height:15px;'/></td>";
		rez += "<td onmousemove='moveObjectsPropertiesDiv(event," + bag[i].id + ");'>" + obj.name + "</td>";
		rez += "<td onmousemove='moveObjectsPropertiesDiv(event," + bag[i].id + ");'>" + bag[i].quantity + "</td>"
		if (obj.is_drink == 0) {
			rez += "<td onmousemove='moveObjectsPropertiesDiv(event," + bag[i].id + ");' onclick='showModSelectTable(event,1," + persNr + ",-1," + i + ")' class='pointerCursor'>";
			if (bag[i].modType >= 0) {
				var parId = getStatId(stones[bag[i].modType].statShortName);
				rez += parameterTypesZero[parId].name + " " + formatStat(bag[i].modMult, parameterTypesZero[parId]);
			} else
				rez += "-";
			rez += "</td>";
			rez += "<td onmousemove='moveObjectsPropertiesDiv(event," + bag[i].id + ");' onclick='showModSelectTable(event,0," + persNr + ",-1," + i + ")' class='pointerCursor'>";
			if (bag[i].zaklType >= 0) {
				var parId = getStatId(stones[bag[i].zaklType].statShortName);
				rez += parameterTypesZero[parId].name + " " + formatStat(bag[i].zaklMult, parameterTypesZero[parId]);
			} else
				rez += "-";
			rez += "</td>";

			var clickRez = "";
			var classRez = "";
			if (obj.is_podkladka != 1) {
				clickRez = " onclick='showZatochkiSelectTable(event," + persNr + ",-1," + i + ")' ";
				classRez = " class='pointerCursor' ";
			}
			rez += "<td onmousemove='moveObjectsPropertiesDiv(event," + bag[i].id + ");'" + clickRez + classRez + ">";
			if (bag[i].zatType >= 0) {
				for (var k = 0; k < bodyPartsDB.length; k++) {
					if (bodyPartsDB[k].id == obj.type_id)
						break;
				}

				var statShortName = zatochki[Math.floor(bag[i].zatType / 2)].statShortName;
				statShortName = zatGetRealStatShortName(statShortName, bodyPartsDB[k].short_name);

				if (statShortName == "damage") {
					rez += "Урон: +" + bag[i].zatNr * 5;
				} else {
					var parId = getStatId(statShortName);
					rez += parameterTypesZero[parId].name + " " + formatStat(bag[i].zatNr * 5, parameterTypesZero[parId]);
				}
			} else if (obj.is_podkladka != 1)
				rez += "-";
			rez += "</td>";
			rez += "<td onmousemove='hideObjectsPropertiesDiv()'><button onclick='if (putOnObject(" + bag[i].id + "," + persNr + ",-1,-1," + bag[i].modType + "," + bag[i].modMult + "," + bag[i].zaklType + "," + bag[i].zaklMult + "," + bag[i].zatType + "," + bag[i].zatNr + ")!=false) removeFromBag(" + persNr + "," + i + ",1)'>Одеть</button></td>";
			rez += "<td onmousemove='hideObjectsPropertiesDiv()'><button onclick='changeBagObjectQunatity(" + persNr + "," + i + ")'>Поменять количество</button></td>";
			rez += "<td onmousemove='hideObjectsPropertiesDiv()'><button onclick='removeFromBag(" + persNr + "," + i + "," + bag[i].quantity + ")'>Удалить</button></td>";
		}
		rez += "</tr>";
	}
	rez += "</table>";
	rez += "примечание: чтобы поменять или снять камень из вещей нажмите на соответствующую ячейку в таблице<br>";
	if (!added)
		rez = 'Рюкзак пустой. Чтобы добавить в него вещь, при надевании или снятии предмета щёлкните <br>правой кнопкой мыши по картинке предмета и выберите "Добавить в рюкзак" или "Снять в рюкзак"<br>';
	rez += "<button onclick='hideBagContent();hideObjectsPropertiesDiv()'>Закрыть</button>"
	document.getElementById('bag_content_div').innerHTML = rez;
	document.getElementById('bag_content_div').style.display = "inline";
}

function hideBagContent() {
	document.getElementById('bag_content_div').style.display = "none";
}

function changeBagObjectQunatity(persNr, id) {
	bag = (persNr == 0 ? bag1 : bag2);
	var nr = -1;
	while ((!is_int(nr) || nr - 0 <= 0) && nr !== null) {
		nr = prompt("Введите новое количество предмета \"" + objects[bag[id].id].name + "\"", bag[id].quantity);
	}

	if (nr !== null) {
		bag[id].quantity = nr;
		displayBagContent(persNr);
	}
}