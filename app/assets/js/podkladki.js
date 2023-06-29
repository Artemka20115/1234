var podklLastX = 0,
	podklLastY = 0;

var shkury = new Array();

shkury[0] = new Object();
shkury[0].name = "Шкура Зайца";
shkury[0].image = "1_6073.gif";
shkury[0].statNr = 15;
shkury[0].hp = 10;
shkury[1] = new Object();
shkury[1].name = "Шкура Лисы";
shkury[1].image = "1_6074.gif";
shkury[1].statNr = 30;
shkury[1].hp = 15;
shkury[2] = new Object();
shkury[2].name = "Шкура Волка";
shkury[2].image = "1_6075.gif";
shkury[2].statNr = 45;
shkury[2].hp = 20;
shkury[3] = new Object();
shkury[3].name = "Шкура Оленя";
shkury[3].image = "1_6076.gif";
shkury[3].statNr = 60;
shkury[3].hp = 25;
shkury[4] = new Object();
shkury[4].name = "Шкура Медведя";
shkury[4].image = "1_6077.gif";
shkury[4].statNr = 75;
shkury[4].hp = 30;


var podkladki = new Array();

podkladki[0] = new Object();
podkladki[0].name = "Подкладка под шлем";
podkladki[0].image = "1_3613.gif";
podkladki[0].bodyPartShortName = "shl";
podkladki[0].bodyPartName = "Шлем";
podkladki[1] = new Object();
podkladki[1].name = "Подкладка под амулет";
podkladki[1].image = "1_3617.gif";
podkladki[1].bodyPartShortName = "amu";
podkladki[1].bodyPartName = "Амулет";
podkladki[2] = new Object();
podkladki[2].name = "Подкладка под латы";
podkladki[2].image = "1_3623.gif";
podkladki[2].bodyPartShortName = "lat";
podkladki[2].bodyPartName = "Латы";
podkladki[3] = new Object();
podkladki[3].name = "Подкладка под перчатки";
podkladki[3].image = "1_3628.gif";
podkladki[3].bodyPartShortName = "per";
podkladki[3].bodyPartName = "Перчатки";
podkladki[4] = new Object();
podkladki[4].name = "Подкладка под наручи";
podkladki[4].image = "1_3648.gif";
podkladki[4].bodyPartShortName = "nar";
podkladki[4].bodyPartName = "Наручи";
podkladki[5] = new Object();
podkladki[5].name = "Подкладка под оружие";
podkladki[5].image = "1_3654.gif";
podkladki[5].bodyPartShortName = "oru";
podkladki[5].bodyPartName = "Оружие";
podkladki[6] = new Object();
podkladki[6].name = "Подкладка под пояс";
podkladki[6].image = "1_3633.gif";
podkladki[6].bodyPartShortName = "poi";
podkladki[6].bodyPartName = "Пояс";
podkladki[7] = new Object();
podkladki[7].name = "Подкладка под кольца";
podkladki[7].image = "1_3643.gif";
podkladki[7].bodyPartShortName = "kol";
podkladki[7].bodyPartName = "Кольца";
podkladki[8] = new Object();
podkladki[8].name = "Подкладка под штаны";
podkladki[8].image = "1_6190.gif";
podkladki[8].bodyPartShortName = "sht";
podkladki[8].bodyPartName = "Штаны";
podkladki[9] = new Object();
podkladki[9].name = "Подкладка под поножи";
podkladki[9].image = "1_3638.gif";
podkladki[9].bodyPartShortName = "pon";
podkladki[9].bodyPartName = "Поножи";


var podklPossibleStats = new Array();
podklPossibleStats[0] = "sila";
podklPossibleStats[1] = "lovk";
podklPossibleStats[2] = "reak";
podklPossibleStats[3] = "zlosti";
podklPossibleStats[4] = "udaca";
podklPossibleStats[5] = "sloj";
podklPossibleStats[6] = "ob_uv";
podklPossibleStats[7] = "ob_ud";
podklPossibleStats[8] = "ob_otv";
podklPossibleStats[9] = "ob_krit";
podklPossibleStats[10] = "kulac";
podklPossibleStats[11] = "zasita";
podklPossibleStats[12] = "vlad";
podklPossibleStats[13] = "metk";

const linings = [{
	name: "Заяц",
	hp: 50,
	stats: 15
}, {
	name: "Лиса",
	hp: 50,
	stats: 30
}, {
	name: "Волк",
	hp: 50,
	stats: 45
}, {
	name: "Олень",
	hp: 50,
	stats: 60
}, {
	name: "Медведь",
	hp: 50,
	stats: 75
}, ];

function showPodkladkaCreate(objectTypeShortName) {
	var rez = '';
	hideZatChooseDiv();
	rez += "Часть тела: ";
	rez += "<select id='podklCreateBodyPart' onchange='liningUpdate()'>"
	for (var i = 0; i < podkladki.length; i++) {
		var selected = "";
		if (objectTypeShortName == podkladki[i].bodyPartShortName)
			selected = "selected";
		rez += "<option value='" + i + "' " + selected + ">" + podkladki[i].bodyPartName + "</option>";
	}
	rez += "</select><br>";
	rez += "Стат: ";
	rez += "<select id='podklCreateStat' onchange='liningUpdate()'>"
	for (var i = 0; i < podklPossibleStats.length; i++) {
		var statId = getStatId(podklPossibleStats[i]);
		rez += "<option value='" + i + "'>" + parameterTypesZero[statId].name + "</option>";
	}
	rez += "</select>";
	rez += "<br>Шкура: ";
	rez += "<select id='podklCreateAnimal' onchange='liningUpdate()'>"
	for (var i = linings.length - 1; i >= 0; i--) {
		rez += "<option value='" + i + "'>" + linings[i].name + "</option>";
	}
	rez += "</select>";
	rez += "<div id='podklCreateSummary'></div>";
	rez += "<button type='button' id='btnCreatePodkl' onclick='CreatePodkl(event)'>Создать подкладку</button>";
	rez += "<button type='button' onclick='hidePodkladkaCreate()'>Закрыть</button><br>";
	document.getElementById("podkladka_create_div").innerHTML = rez;
	document.getElementById("podkladka_create_div").style.display = "inline";
	liningUpdate()
}

function liningUpdate() {
	let animals = document.querySelector('#podklCreateAnimal');
	let types = document.querySelector('#podklCreateBodyPart');
	let stats = document.querySelector('#podklCreateStat');
	//getLiningStarts
	var statShortName = podklPossibleStats[stats.value];
	var statId = getStatId(statShortName);
	var stat = parameterTypesZero[statId];

	var rez = "";
	rez += "<br><table id='podklCreateRezTable'><tr>";
	rez += "<td><img src='" + MISC_IMAGES_PATH + podkladki[types.value].image + "'></td>";
	rez += "<td>";
	rez += podkladki[types.value].name + "<br>";
	var statVal = formatStat(linings[animals.value].stats, stat, true);
	rez += stat.name + ": " + statVal + "<br>";
	rez += "</td>";
	rez += "</tr></table>";
	document.getElementById("podklCreateSummary").innerHTML = rez;
}

function CreatePodkl(event) {
	let animals = document.querySelector('#podklCreateAnimal');
	let types = document.querySelector('#podklCreateBodyPart');
	let stats = document.querySelector('#podklCreateStat');
	//get selected stat
	var statShortName = podklPossibleStats[stats.value];
	var statId = getStatId(statShortName);
	var stat = parameterTypesZero[statId];
	//get podkladka body part
	var podkladka = podkladki[types.value];
	var bpId = getBodyPartId(podkladka.bodyPartShortName);

	var id = objects.length;
	objects[id] = new Object();
	objects[id].id = -1;
	objects[id].name = podkladka.name;
	objects[id].photo_location = podkladka.image;
	objects[id].price_serye = 0;
	objects[id].price_sinie = 0;
	objects[id].is_drink = 0;
	objects[id].is_podkladka = 1;
	objects[id].hp = 50;
	objects[id].min_level = 5;
	objects[id].max_level = -1;
	objects[id].type_id = bodyParts1[bpId].objectTypes[0].id;
	objects[id].is_metatelinoe = 0;
	objects[id].is_twohanded = 0;
	objects[id].charges = -1;
	objects[id].recharge_price = -1.00;
	objects[id].min_damage = -1;
	objects[id].max_damage = -1;
	objects[id].required_race = -1;
	objects[id].radius = -1;
	objects[id].vlijanie_sily = -1;
	objects[id].tochnosti = -1;
	objects[id].imageFromDB = false;
	objects[id].defaultObject = false;
	objects[id].art_type = -1;
	objects[id].parameters = new Array();

	objects[id].parameters[0] = new Object();
	objects[id].parameters[0].id = stat.id;
	objects[id].parameters[0].value = linings[animals.value].stats;

	hidePodkladkaCreate();
	if (podklLastX >= 0 && podklLastY >= 0) {
		showObjectsSelectTable(event, undefined, undefined, true);
	}
}

function hidePodkladkaCreate() {
	document.getElementById("podkladka_create_div").style.display = "none";
}