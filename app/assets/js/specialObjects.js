var specialBodyPartsId;
var specialPersonalId=new Array();
var specialImensId=new Array();
var specialBattleFieldsId=new Array();
var specialAncientWrathId=new Array();
var lastPersNr=-1;

function initSpecialObjectsVariables() {
	specialBodyPartsId=new Array();
	var j=0;
	for (var i=0; i<bodyPartsDB.length; i++) {
		if (bodyPartsDB[i].short_name!="str") {
			specialBodyPartsId[j]=i;
			j++;
		}
	}

	for (var i=0; i<specialObjectsTypes.length; i++) {
		if (specialObjectsTypes[i].isImenoi==1) {
			specialImensId[specialImensId.length]=i;
		} else if (specialObjectsTypes[i].isImenoi==0) {
			specialPersonalId[specialPersonalId.length]=i;
		} else if (specialObjectsTypes[i].isImenoi==6) {
			specialBattleFieldsId[specialBattleFieldsId.length]=i;
		} else if (specialObjectsTypes[i].isImenoi==7) {
			specialAncientWrathId[specialAncientWrathId.length]=i;
		}
	}
}

function hideSpecialObjectsCreate() {
	document.getElementById("special_objects_div").style.display="none";
}

function showSpecialObjectsCreate(divId, specialNr, openedFromObjectsSelectTable) { //specialNr should be set if the object will be edited
	hideObjectsSelectTable();
	var rez="", editObject=-1, isImen="", isLic="", isPB="", isAW="";
	if (typeof(specialNr) !== 'undefined') {
		editObject=objects[specialNr];
	}
	rez+="<div id='objectBodyPart'>Предмет для части тела: <select id='specialObjectsCreate_bodyPart'  ONCHANGE='specialObjectBodyPartChanged();'>";
	for (var i=0; i<specialBodyPartsId.length; i++) {
		var sel="";
		var lastBpShortName;
		switch (lastObjectTypeShortName) {
			case 'kol1':
			case 'kol2':
			case 'kol3':
			case 'kol4':
			case 'kol5':
			case 'kol6':
			case 'kol7':
			case 'kol8':
				lastBpShortName='kol';
				break;
			case 'oru1':
			case 'oru2':
				lastBpShortName='oru';
				break;
			case 'amu1':
			case 'amu2':
				lastBpShortName='amu';
				break;
			default:
				lastBpShortName=lastObjectTypeShortName;
		}
		if (editObject !== -1) {
			var bpId=jsBodypartsId[editObject.type_id];
			if (bpId === specialBodyPartsId[i]) {
				sel=" selected ";
			}
		} else if (openedFromObjectsSelectTable === true &&  lastBpShortName === bodyPartsDB[specialBodyPartsId[i]].short_name) {
			sel=" selected ";
		}
		rez+="<option value='"+specialBodyPartsId[i]+"'"+sel+">"+bodyPartsDB[specialBodyPartsId[i]].name+"</option><br>";
	}
	rez+="</select></div>";
	if (editObject !== -1) {
		if (editObject.art_type - 0 === 1) {
			isImen=" selected ";
		} else if (editObject.art_type - 0 === 2) {
			isLic=" selected ";
		} else if (editObject.art_type - 0 === 3) {
			isPB = " selected ";
		} else if (editObject.art_type - 0 === 4) {
			isAW = " selected ";
		}
	}
	rez+="Вид специального предмета: <select id='specialObjectsCreate_artType' ONCHANGE='specialObjectArtTypeChanged()'>"+
		"<option value='im'"+isImen+">Именной</option>"+
		"<option value='lic'"+isLic+">Лички | Оружее победителей турнира</option>"+
		"</select><br>";

	rez+="<div id='objectLevelTSelection'>";
	rez+="<span id='objectLevelTitle'>Вид|уровень предмета</span>: <select id='specialObjectsCreate_artLevel' ONCHANGE='specialObjectLevelChanged()'></select><br>";
	rez+="</div>";
	rez+="<div id='ancientWrathStats'></div>";
	rez+="<input='checkbox' id='specialIsBorrowed' '></input>"
	rez+="Всего очков: <a id='specialObjectTotalPoints'></a><br>";
	// rez+="Стоимость: <a id='specialObjectPrice'></a><br>";
	rez+="Осталось очков: <a id='specialStatsLeft'></a><br>";
	var name;
	if (editObject !== -1) {
		name=editObject.name;
	} else {
		name="" ;
	
	}

	rez+="Название: <input type='text' id='specialObjectName' value='"+name+"' style='width:200px;'><br>";
	rez+="Статы:<br>";
	rez+="<table style='border:1px solid #000000; width:800px; height: 200px;'>";
	var columns=2;
	var j=0;
	for (var i=0; i<parameterTypesZero.length; i++) {
		if (parameterTypesZero[i].short_name === "intel" || parameterTypesZero[i].short_name.indexOf("anti") !== -1) {
			continue;
		}
		if (j%columns === 0) {
			rez+="<tr>";
		}
		rez+="<td>"+parameterTypesZero[i].name+": </td>";
		rez+="<td><input style='width:50px;' id='specialPar_"+parameterTypesZero[i].short_name+"' onkeyup='reloadSpecialsStats()'></input></td>";
		if (parameterTypesZero[i].short_name.indexOf("ob_")===-1 && parameterTypesZero[i].short_name!=="kulac" && parameterTypesZero[i].short_name!=="zasita"
			&& parameterTypesZero[i].short_name!=="vlad" && parameterTypesZero[i].short_name!=="metk") {
			rez+="<td></td>";
		} else {
			rez+="<td><input style='width:50px; background-color:#ff80c0' id='specialPar_anti_"+(parameterTypesZero[i].short_name==="kulac"?"kul":parameterTypesZero[i].short_name)+"' onkeyup='reloadSpecialsStats()'></input></td>";
		}
		if (j%columns===columns-1 || i===parameterTypesZero.length-1) {
			rez+="</tr>";
		}
		j++;
	}
	rez+="<tr id='specialDamageRow'><td>Урон: </td><td><input style='width:50px;' id='specialPar_minUron' onkeyup='reloadSpecialsStats()'></input>";
	rez+="</td><td>- <input style='width:50px;' id='specialPar_maxUron' onkeyup='reloadSpecialsStats()'></input></td></tr>";
	rez+="</table>";

	rez+="Картинка:<img src='"+SPECIAL_OBJECTS_PATH+"blank.gif' id='specialObjectImage'/><br>";
	rez+='<div class="form" style="border:1px solid #cda15f" id="uploadDiv"><form method="post" action="div/filereceiver.php" enctype="multipart/form-data" id="uploadForm"><div>';
	rez+='<input type="file" name="test" id="uploadInput1"/><input class="submit" type="submit" value="Загрузить изображение" id="uploadInput2"/></div></form>'
	rez+='</div>';


	rez+="<div id='specialImagesTableDiv'></div>"
	var createPar="", createText="Создать предмет";
	if (editObject !== -1) {
		createPar = specialNr;
		createText="Изменить предмет";
	}

	rez+="<div id='special_items_warning' style='color:#ff2020'>Внимание! На полях битв все 8 колец которые вы можете создать одинаковые</div><br>"
	rez+="<button onclick='createSpecialObject("+createPar+");window.scrollTo(0,0);'>"+createText+"</button>"
	rez+="<button onclick='hideSpecialObjectsCreate()'>Закрыть</button>"

	document.getElementById(divId).innerHTML=rez;

	specialObjectArtTypeChanged(false);//this function will also call generateImageList('specialImagesTableDiv');
	specialObjectBodyPartChanged();
	loadFileUpload();

	var nr=-1;

	if (editObject !== -1) {
		hideObjectsSelectTable();
		if (editObject.art_type - 0 === 3) {
			console.log('Для хаота шмот сохраненный');
		} else if (editObject.art_type - 0 === 4) {
			for (let i = 0; i < specialAncientWrathId.length; i++) {
				nr++;
				if	(specialObjectsTypes[specialAncientWrathId[i]].name === editObject.name) {

					break;
				}
			}
		} else {
			for (var i=0; i<specialObjectsTypes.length; i++) {
				if ((specialObjectsTypes[i].isImenoi-0 === 1) === (editObject.art_type-0 === 1)) {
					nr++;
					if (specialObjectsTypes[i].price-0 === editObject.price_sinie-0) {
						break;
					}
				}
			}
		}
		document.getElementById("specialObjectsCreate_artLevel").selectedIndex = nr;
		let objectTemplate = specialObjectsTypes[document.getElementById("specialObjectsCreate_artLevel").value - 0];

		for (var i=0; i<editObject.parameters.length; i++) {
			var par=parameterTypes[editObject.parameters[i].id];
			var val=editObject.parameters[i].value*Math.abs(par.multiplier);
			if (objectTemplate.parameters !== undefined) {
				let paramExists = objectTemplate.parameters.find( param => param.id === editObject.parameters[i].id);
				val -= (paramExists !== undefined ? parseInt(paramExists.value * Math.abs(par.multiplier)) : 0);
			}

			document.getElementById("specialPar_"+par.short_name).value=val;
		}
		if (typeof(editObject.min_damage) != 'undefined' && is_int(editObject.min_damage) && editObject.min_damage-0>=0) {
			document.getElementById("specialPar_minUron").value=editObject.min_damage;
		}
		if (typeof(editObject.max_damage) != 'undefined' && is_int(editObject.max_damage) && editObject.max_damage-0>=0) {
			document.getElementById("specialPar_maxUron").value=editObject.max_damage;
		}

		var img_id=-1;
		for (var i=0; i<imagesArray.length; i++) {
			if (imagesArray[i].photoLocation==editObject.photo_location && imagesArray[i].objectTypeId==editObject.type_id) {
				img_id=i;
				break;
			}
		}
		if (img_id==-1) {
			img_id=imagesArray.length;
			imagesArray[img_id]=new Object();
			imagesArray[img_id].objectTypeId=editObject.type_id;
			imagesArray[img_id].userId=-2;
			imagesArray[img_id].photoLocation=editObject.photo_location;
			imagesArray[img_id].artType=(editObject.art_type==1?0:1);
			imagesArray[img_id].takenFromDB=0;
		}
		loadSpecialObjectImage(img_id);
	} //if (editObject !== -1)

	specialObjectLevelChanged(false);
	//specialObjectArtTypeChanged(false);
	//specialObjectBodyPartChanged();
	if (editObject !== -1 && editObject.art_type === 1) {
		if (document.getElementById("specialStatsLeft").innerHTML-0>=1) {
			document.getElementById("specialIsBorrowed").checked="true";
			reloadSpecialsStats();
		}
	}
	document.getElementById(divId).style.display="inline";
}

function createSpecialObject(specialNr) {
	if (typeof(specialNr) === 'undefined') {
		specialNr = -1;
	}
	/*	if (document.getElementById('specialObjectName').value.length==0)
        {
            alert("Введите имя предмета");
            return;
        }*/
	reloadSpecialsStats();
	var statsLeft=parseInt(document.getElementById('specialStatsLeft').innerHTML);
	var borrowed=document.getElementById('specialIsBorrowed').checked;

	if (statsLeft === 0 || (statsLeft > 0 && statsLeft < 1) || (borrowed && statsLeft >= 0)) {
		if (statsLeft >= 1) {
			let message = "Внимание! В вашей разбивке статов именного предметов остались нераспределенные статы.  Это могло произойти по ошибке или как результат округлений при деление статов именного предмета. Вы хотите продолжить с созданием предмета?"
			if (!confirm(message)) {
				return;
			}
		}
		//proceeding with object creation
		var objTypeEl=document.getElementById("specialObjectsCreate_artLevel");
		var spObjTypeId;
		if (objTypeEl.options.length>0) {
			spObjTypeId = document.getElementById("specialObjectsCreate_artLevel").value;
		} else {
			spObjTypeId = lastObjectturnirRavn;
		}
		var ind = specialNr === -1 ? objects.length : specialNr;
		elBp=document.getElementById('specialObjectsCreate_bodyPart');

		let object = specialObjectsTypes[spObjTypeId];

		objects[ind]=new Object();
		objects[ind].id=-1;
		objects[ind].is_drink=0;
		objects[ind].name=document.getElementById('specialObjectName').value;
		if (document.getElementById("specialObjectsCreate_artType").selectedIndex === 2 ) {
			objects[ind].photo_location = object.images[bodyPartsDB[elBp.options[elBp.selectedIndex].value].short_name];
			objects[ind].imageFromDB = true;
			objects[ind].type_id = bodyPartsDB[elBp.options[elBp.selectedIndex].value].id;
		} else if (document.getElementById("specialObjectsCreate_artType").selectedIndex === 3){
			let bodyPart = bodyPartsDB.find( el => {
				if (el.id === object.type_id) {
					return el;
				}
			});
			objects[ind].photo_location = object.images[bodyPart.short_name];
			objects[ind].imageFromDB = true;
			objects[ind].type_id = bodyPart.id;
		} else {
			objects[ind].photo_location = imagesArray[specialObjectImageId].photoLocation;
			objects[ind].imageFromDB = (parseInt(imagesArray[specialObjectImageId].takenFromDB) === 1);
			objects[ind].type_id = bodyPartsDB[elBp.options[elBp.selectedIndex].value].id;
		}
		objects[ind].price_serye = 0;
		objects[ind].price_sinie = object.price;
		objects[ind].hp=200;//true for special objects, did not check for personal
		objects[ind].min_level = object.minLevel;
		objects[ind].max_level = object.maxLevel;
		objects[ind].art_type = document.getElementById("specialObjectsCreate_artType").selectedIndex+1;
		objects[ind].is_metatelinoe = object.is_metatelinoe !== undefined ? object.is_metatelinoe : 0 ;
		objects[ind].is_twohanded = object.is_twohanded !== undefined ? object.is_twohanded : 0 ;
		objects[ind].charges = object.charges !== undefined ? object.charges : -1;
		objects[ind].recharge_price = object.recharge_price !== undefined ? object.recharge_price : -1.00;
		objects[ind].min_damage=document.getElementById('specialPar_minUron').value - 0;
		objects[ind].max_damage=document.getElementById('specialPar_maxUron').value - 0;
		if (objects[ind].min_damage === 0 && objects[ind].max_damage === 0) {
			objects[ind].min_damage = -1;
			objects[ind].max_damage = -1;
		}
		objects[ind].required_race = -1;
		objects[ind].radius = object.radius !== undefined ? object.radius : -1;
		objects[ind].vlijanie_sily = object.vlijanie_sily !== undefined ? object.vlijanie_sily : -1;
		objects[ind].tochnosti = object.tochnosti !== undefined ? object.tochnosti : -1;
		objects[ind].defaultObject = 0;

		objects[ind].parameters=new Array();
		var parId=-1;
		for (var i=0; i<parameterTypesZero.length; i++) {
			var el=document.getElementById("specialPar_"+parameterTypesZero[i].short_name);
			if (el!==null && el.value.length>0) {
				el.value=el.value.replace(nonDigitRegex,"");
			}
			if (el!==null && el.value.length>0 && el.value.length-0>0) {
				parId++;
				objects[ind].parameters[parId]=new Object();
				objects[ind].parameters[parId].id=parameterTypesZero[i].id;
				objects[ind].parameters[parId].value=el.value/Math.abs(parameterTypesZero[i].multiplier);
			}
		}

		if (object.isImenoi === 7) {
			for (let i = 0; i < object.parameters.length; i++) {
				let objParam = object.parameters[i];
				for (let j = 0; j < objects[ind].parameters.length; j++) {
					let objsParam = objects[ind].parameters[j];
					if (objParam.id === objsParam.id) {
						objects[ind].parameters[j].value += objParam.value;
					}
				}
				if (objects[ind].parameters.find( param => param.id === objParam.id) === undefined) {
					objects[ind].parameters.push({id:objParam.id,value:objParam.value});
				}
			}
		}

		if (specialNr !== -1) {
			reload();
		}
		hideSpecialObjectsCreate();
		displayAllSpecial(lastPersNr);
	} else {
		alert("Ошибка! Количество оставшихся статов не равно нулю. Проверьте распределение статов.");
	}
}

function reloadSpecialsStats() {

	let objType = document.getElementById("specialObjectsCreate_artType").selectedIndex;
	let objIndex;

	if (objType === 2) {
		objIndex = lastObjectturnirRavn;
	} else {
		objIndex = parseInt(document.querySelector('#specialObjectsCreate_artLevel').value);
	}

	let isBorrowed=(document.getElementById("specialIsBorrowed").checked && objType === 0);
	let divider=1;
	if (isBorrowed){
		divider=specialObjectsTypes[objIndex].divisionOnSend;
	}
	let totalStats=Math.floor(specialObjectsTypes[objIndex].nrStats/divider);

	let params = parameterTypesZero.concat([
		{
			short_name:'minUron',
			multiplier:4,
		},
		{
			short_name:'maxUron',
			multiplier:4,
		}
	]);

	let paramsExclude = [];

	if (objType === 3) {
		paramsExclude = ["minUron", "maxUron"];
	}

	let nrStats=0;
	for (let i = 0; i < params.length - paramsExclude.length; i++) {
		let input = document.querySelector('#specialPar_' + params[i].short_name);
		if	(input !== null) {
			let value = input.value;
			let newValue = value.replace(nonDigitRegex,"");
			input.value = ( params[i].multiplier < 0 ? "-" : "" ) + newValue;
			nrStats+=Math.abs(newValue / (params[i].isArmor === 1 ? params[i].multiplier * 5 :  params[i].multiplier ));
		}
	}

	document.getElementById('specialStatsLeft').innerHTML=totalStats-nrStats;
}


function loadSpecialObjectImage(id)
{
	specialObjectImageId=id;
	document.getElementById("specialObjectImage").src=(imagesArray[id].takenFromDB==1?SPECIAL_OBJECTS_PATH:TEMP_SPECIAL_OBJECTS_PATH)+imagesArray[id].photoLocation;
}

function specialObjectImageUploaded(fileName)
{
	var elBp=document.getElementById("specialObjectsCreate_bodyPart");
	var bpId=bodyPartsDB[elBp.options[elBp.selectedIndex].value].id;

	var elAt=document.getElementById("specialObjectsCreate_artType");
	var atId=elAt.selectedIndex;

	var nr=imagesArray.length;
	imagesArray[nr]=new Object();
	imagesArray[nr].objectTypeId=bpId;
	imagesArray[nr].userId=-2;
	imagesArray[nr].photoLocation=fileName+'.gif';
	imagesArray[nr].artType=atId;
	imagesArray[nr].takenFromDB=0;

	loadSpecialObjectImage(nr);
	generateImageList("specialImagesTableDiv",false);
}

function specialObjectLevelChanged(updateSelectIndex) {
	var isBorrowed=(document.getElementById("specialIsBorrowed").checked && document.getElementById("specialObjectsCreate_artType").selectedIndex==0);
	var divider=1;
	var artLevId;
	var id;
	var artType=document.getElementById("specialObjectsCreate_artType").selectedIndex;
	if (artType === 2) {
		id = lastObjectturnirRavn;
	} else if (artType === 3) {
		id = document.getElementById("specialObjectsCreate_artLevel").value;
		let artObj = specialObjectsTypes[id];
		document.getElementById('specialPar_minUron').value=artObj.min_damage;
		document.getElementById('specialPar_maxUron').value=artObj.max_damage;
		document.getElementById('specialObjectName').value=artObj.name;
		document.getElementById("ancientWrathStats").innerHTML = getAncientWrathStats();
		generateImageList("specialImagesTableDiv",false);
	} else {
		artLevId=document.getElementById("specialObjectsCreate_artLevel").selectedIndex;
		id = document.getElementById("specialObjectsCreate_artLevel").options[artLevId].value;
	}

	if (isBorrowed) {
		divider=specialObjectsTypes[id].divisionOnSend;
	}

	document.getElementById("specialObjectTotalPoints").innerHTML=Math.floor(specialObjectsTypes[id].nrStats/divider)+(isBorrowed?"(максимум)":"");

	reloadSpecialsStats();
}

function specialObjectBodyPartChanged() {
	//change images
	generateImageList("specialImagesTableDiv",true);

	var elBp=document.getElementById("specialObjectsCreate_bodyPart");
	var bpId=elBp.options[elBp.selectedIndex].value;
	var bp1Id=getBodyPartId(bodyPartsDB[bpId].short_name);

	specialObjectImageWidth=bodyParts1[bp1Id].width;
	specialObjectImageHeight=bodyParts1[bp1Id].height;

	var imgEl=document.getElementById("specialObjectImage");
	imgEl.style.width=specialObjectImageWidth+"px";
	imgEl.style.height=specialObjectImageHeight+"px";
	if (bodyPartsDB[bpId].short_name === 'shi' || bodyPartsDB[bpId].short_name === 'oru') {
		document.getElementById('specialDamageRow').style.display='inline';
	} else {
		document.getElementById('specialDamageRow').style.display='none';
		document.getElementById('specialPar_minUron').value='';
		document.getElementById('specialPar_maxUron').value='';
		reloadSpecialsStats();
	}

	var artLevId=document.getElementById("specialObjectsCreate_artLevel").selectedIndex;
	var artTypeId=document.getElementById("specialObjectsCreate_artType").selectedIndex;

	if (artTypeId === 2) {
		document.getElementById("specialObjectName").value=getTurnRavnObjectName(bodyPartsDB[bpId].short_name);
	}
	document.getElementById("special_items_warning").style.display=((artTypeId === 2 && elBp.selectedIndex === 8)?"inline":"none");

}

function getTurnRavnObjectName(bodyPartShortName)
{
	var rez="";
	switch (bodyPartShortName)
	{
		case "nar":
			rez="Наручи";
			break
		case "shl":
			rez="Шлем";
			break
		case "amu":
			rez="Амулет";
			break
		case "lat":
			rez="Броня";
			break
		case "per":
			rez="Перчатки";
			break
		case "kol":
			rez="Кольцо";
			break
		case "pon":
			rez="Поножи";
			break
		case "oru":
			rez="Меч";
			break
		case "shi":
			rez="Щит";
			break
		case "poi":
			rez="Пояс";
			break
	}
	return rez+" для полей битв ";
}

function getAncientWrathStats() {

	let artType = parseInt(document.querySelector('#specialObjectsCreate_artLevel').value);

	let artObj = specialObjectsTypes[artType];
	//parameters
	let html = '';
	html += '<div>';
	html += '<div style="background-color:#f4cf91;padding:5px;">';
	if (artObj['is_twohanded']) {
		html+="<b>Двуручное.</b><br>";
	}
	if (artObj['radius']) {
		html+="Радиус поражения:<b> "+artObj['radius']+"</b><br>";
	}
	if (artObj['charges']>=0) {
		html+="Зарядов: <b>"+artObj['charges']+"</b><br>";
	}
	if (artObj['tochnosti']>=0) {
		html+="Точность: <b>"+artObj['tochnosti']+"%</b><br>";
	}
	if (artObj['vlijanie_sily']>=0) {
		html+="Влияние силы: <b>"+artObj['vlijanie_sily']+"%</b><br>";
	}
	for (var i=0; i < artObj.parameters.length; i++) {
		var par=parameterTypes[artObj.parameters[i].id];
		var val=formatStat(artObj.parameters[i].value,par);
		html+=par.name+": <b>"+val+"</b><br>";
	}
	html += '<b>Магические свойства:</b><br>';
	for (let i = 0; i < artObj.magic_properties.length; i++) {
		html += artObj.magic_properties[i].name + ': <b>' + artObj.magic_properties[i].value +'</b><br>';
	}
	html += '</div>';
	html += '</div>';
	return html;
}

function specialObjectArtTypeChanged(updateSelectIndex) {
	var elAt = document.getElementById("specialObjectsCreate_artType");
	var atId = elAt.selectedIndex;
	var el = document.getElementById("specialObjectsCreate_artLevel");
	let borrowed = document.getElementById("specialIsBorrowed");
	let specialObjectName = document.getElementById("specialObjectName");
	let minDamage = document.getElementById('specialPar_minUron');
	let maxDamage = document.getElementById('specialPar_maxUron');
	el.disabled = (atId === 2);
	borrowed.checked=false;
	if (atId === 2) {
		document.getElementById("specialIsBorrowed").disabled=true;
		if (document.getElementById("specialObjectsCreate_bodyPart").selectedIndex === 10) {
			document.getElementById("specialObjectsCreate_bodyPart").selectedIndex = 0;
		}
		el.options.length=0;
	} else if (atId === 3) {
		document.getElementById("specialObjectsCreate_bodyPart").selectedIndex = 6;
		el.options.length=0;
		for (var i=0; i<specialAncientWrathId.length; i++) {
			el.options.add(new Option(specialObjectsTypes[specialAncientWrathId[i]].name, specialAncientWrathId[i]));
		}
	} else {
		document.getElementById("specialIsBorrowed").disabled = ( atId === 1 || atId === 2);
		let objectLevelsArr = [];
		objectLevelsArr = atId === 0 ? specialImensId : (atId === 1 ? specialPersonalId : new Array());
		el.options.length=0;
		for (var i=0; i<objectLevelsArr.length; i++) {
			el.options.add(new Option(specialObjectsTypes[objectLevelsArr[i]].objectLevel, objectLevelsArr[i]));
		}
	}

	specialObjectBodyPartChanged();
	specialObjectLevelChanged(updateSelectIndex);

	document.getElementById("objectLevelTitle").innerHTML = atId === 3 ? 'Вид | уровень предмета' : 'Вид | уровень предмета';
	document.getElementById("objectBodyPart").style.display = atId === 3 ? 'none' : '';
	document.getElementById("objectLevelTSelection").style.display = atId === 3 ? 'none' : '';
	document.getElementById("ancientWrathStats").innerHTML = atId === 3 ? getAncientWrathStats() : '';

	if (atId === 3) {
		let artObj = specialObjectsTypes[el.value];
		minDamage.value=artObj.min_damage;
		maxDamage.value=artObj.max_damage;

		// for (var i=0; i < artObj.parameters.length; i++) {
		// 	var par=parameterTypes[artObj.parameters[i].id];
		// 	var val = formatStat(artObj.parameters[i].value,par);
		// 	let input = document.querySelector('#specialPar_' + par.short_name);
		// 	input.value = val;
		// 	let min = Math.abs(artObj.parameters[i].value * par.multiplier);
		// }


	} else {
		minDamage.value='';
		maxDamage.value='';
	}

	minDamage.disabled = atId === 3;
	maxDamage.disabled = atId === 3;

	let specialObjectBodyPart = document.getElementById("specialObjectsCreate_bodyPart");

	if (![2,3].includes(atId)) {
		specialObjectName.disabled = false;
		if (updateSelectIndex !== false) {
			specialObjectName.value = "";
		}
	}
	specialObjectBodyPart.options[0].disabled = (atId === 3);
	specialObjectBodyPart.options[1].disabled = (atId === 3);
	specialObjectBodyPart.options[2].disabled = (atId === 3);
	specialObjectBodyPart.options[3].disabled = (atId === 3);
	specialObjectBodyPart.options[4].disabled = (atId === 3);
	specialObjectBodyPart.options[5].disabled = (atId === 3);
	specialObjectBodyPart.options[7].disabled = (atId === 3);
	specialObjectBodyPart.options[8].disabled = (atId === 3);
	specialObjectBodyPart.options[9].disabled = (atId === 3);
	specialObjectBodyPart.options[10].disabled = ([2,3].includes(atId));
	if ([2,3].includes(atId)) {
		specialObjectName.disabled = true;
	}
	reloadSpecialsStats();
	//change images
	generateImageList("specialImagesTableDiv",true);
}

function generateImageList(divId, setDefaultImage)
{
	var elBp=document.getElementById("specialObjectsCreate_bodyPart");
	var bpId=parseInt(bodyPartsDB[elBp.options[elBp.selectedIndex].value].id);

	var elAt=document.getElementById("specialObjectsCreate_artType");
	var atId=elAt.selectedIndex;

	let lvl = parseInt(document.getElementById("specialObjectsCreate_artLevel").value);

	var rez="";

	if (atId === 2 ) {
		document.getElementById("specialObjectImage").src=SPECIAL_OBJECTS_PATH+specialObjectsTypes[lastObjectturnirRavn].images[bodyPartsDB[elBp.options[elBp.selectedIndex].value].short_name];
		document.getElementById("uploadInput1").style.display="none";
		document.getElementById("uploadInput2").style.display="none";
	} else if (atId === 3) {
		let bodyPart = bodyPartsDB.find( el => {
			if (el.id === specialObjectsTypes[lvl].type_id) {
				return el;
			}
		});
		document.getElementById("specialObjectImage").src=SPECIAL_OBJECTS_PATH+specialObjectsTypes[lvl].images[bodyPart.short_name];
		document.getElementById("uploadInput1").style.display="none";
		document.getElementById("uploadInput2").style.display="none";
	} else {
		var firstImageId=-1;
		rez+="Примечание: Чтобы загрузить собственную картинку нажмите на кнопку<br> \"Обзор\"(или Browse), выберите файл и нажмите на кнопку \"Загрузить изображение\"";
		rez+="<table>";
		columns=6;
		var i=-1;
		for (var j=0; j<imagesArray.length; j++) {
			if (parseInt(imagesArray[j].objectTypeId) === bpId && (parseInt(imagesArray[j].artType) === atId || imagesArray[j].userId !== -1)) {
				if (firstImageId === -1) {
					firstImageId=j;
				}
				i++;
				if (i % columns === 0) {
					rez+="<tr>";
				}
				rez+="<td>"+"<img src='"+(imagesArray[j].takenFromDB === 1 ? SPECIAL_OBJECTS_PATH:TEMP_SPECIAL_OBJECTS_PATH)
					+imagesArray[j].photoLocation+"' onclick='loadSpecialObjectImage("+j+")' class='specialObjectImages'/></a> </td>";
				if (i%columns===columns-1 || i===imagesArray.length-1) {
					rez+="</tr>";
				}
			}
		}
		rez+="</table>";
		if (setDefaultImage) {
			loadSpecialObjectImage(firstImageId);
		}
		document.getElementById("uploadInput1").style.display="inline";
		document.getElementById("uploadInput2").style.display="inline";
	}
	document.getElementById(divId).innerHTML=rez;
}

function deleteSpecialObject(id)
{
	var obj=objects[id];
	if (!confirm("Вы уверены что хотите удалить предмет \""+obj.name+"\"?"))
		return;
	hideObjectsPropertiesDiv();
	hideObjectsSelectTable();
	for (var persNr=0; persNr<=1; persNr++)
	{
		var bodyParts=(persNr==0?bodyParts1:bodyParts2);
		for (var i=0; i<bodyParts.length; i++)
		{
			for (var j=0; j<bodyParts[i].objects.length; j++)
			{
				if (bodyParts[i].objects[j].id==id)
				{
					bodyParts[i].objects[j].id=-1;
					bodyParts[i].objects[j].modType=-1;
					bodyParts[i].objects[j].zaklType=-1;
				}
			}
		}
		var bag=(persNr==0?bag1:bag2);
		for (var i=0; i<bag.length; i++)
		{
			if (bag[i].id==id)
				bag[i].id=-1;
		}

	}
	objects[id]=new Object();
	objects[id].photo_location=-1;//invalidate object

	reloadDrinksQuantity();
	reload();
}

function modifySpecialObject(id)
{
	showSpecialObjectsCreate('special_objects_div',id);
}

function displayAllSpecial(persNr)
{
	lastPersNr=persNr;
	rez="";
	rez+="<table>";
	rez+="<tr><td></td><td>Имя</td><td>Предмет для части тела</td><td>Вид|уровень предмета</td><td>Уровень</td><td></td><td></td></tr>";
	var added=false;
	// objects.forEach(el => {
	// 	if (!el.defaultObject) {
	// 		console.log(el);
	// 	}
	// });
	for (var i=0; i<objects.length; i++)
	{
		//do not take into consideration invalid objects
		if (objects[i].photo_location === -1) {
			continue;
		}

		if (objects[i].defaultObject) {
			continue;
		}
		added=true;
		var obj=objects[i];
		if (obj !== undefined && !obj.is_podkladka && !obj.is_drink) {
			rez+="<tr>";
			var path=obj.defaultObject?OBJECTS_PATH:(obj.imageFromDB?SPECIAL_OBJECTS_PATH:TEMP_SPECIAL_OBJECTS_PATH);
			rez+="<td onmousemove='moveObjectsPropertiesDiv(event,"+i+");' onmouseout='hideObjectsPropertiesDiv()'><img src='"+path+obj.photo_location+"'/></td>";
			rez+="<td onmousemove='moveObjectsPropertiesDiv(event,"+i+");' onmouseout='hideObjectsPropertiesDiv()'>"+obj.name+"</td>";
			rez+="<td onmousemove='moveObjectsPropertiesDiv(event,"+i+");' onmouseout='hideObjectsPropertiesDiv()'>"+bodyPartsDB[jsBodypartsId[obj.type_id]].name+"</td>";
			let specialTypeName;
			if (obj.art_type === 1) {
				specialTypeName = "Именной";
			} else if (obj.art_type === 2) {
				specialTypeName = "Личный";
			} else if (obj.art_type === 3) {
				specialTypeName = "Артефакты древних";
			} else if (obj.art_type === 4) {
				specialTypeName = "Вещи 17-28 уровня";
			}
			rez+="<td onmousemove='moveObjectsPropertiesDiv(event,"+i+");' onmouseout='hideObjectsPropertiesDiv()'>"+specialTypeName+"</td>";
			var level=-1;
			if ([3,4].includes(obj.art_type)) {
				level="";
			} else {
				for (var j=0; j<specialObjectsTypes.length; j++) {
					if ((specialObjectsTypes[j].isImenoi-0==1)==(obj.art_type-0==1)) {
						if (specialObjectsTypes[j].price-0==obj.price_sinie-0) {
							break;
						}
					}
				}
				level=specialObjectsTypes[j].objectLevel;
			}
			rez+="<td onmousemove='moveObjectsPropertiesDiv(event,"+i+");' onmouseout='hideObjectsPropertiesDiv()'>"+level+"</td>";

			rez+="<td><button onclick='if (putOnObject("+i+","+persNr+",-1,-1,-1,-1,-1,-1)!=false) hideAllSpecial();'>Надеть</button></td>";
			rez+="<td><button onclick='hideAllSpecial();modifySpecialObject("+i+");'>Править</button></td>";
			rez+="<td><button onclick='deleteSpecialObject("+i+");displayAllSpecial("+persNr+");'>Удалить</button></td>";
			rez+="</tr>";
		}
	}
	rez+="</table>";
	if (!added) {
		rez='Нету именных или личных предметов. Для создания нажмите на кнопку "Создать именной/личный предмет"<br>';
	}
	rez+="<button onclick='showSpecialObjectsCreate(\"special_objects_div\");window.scrollTo(0,0);hideAllSpecial();'>Создать новый именной/личный предмет</button>";
	rez+="<button onclick='hideAllSpecial()'>Закрыть</button>"
	document.getElementById('all_special_objects_div').innerHTML=rez;
	document.getElementById('all_special_objects_div').style.display="inline";
}

function hideAllSpecial()
{
	document.getElementById('all_special_objects_div').style.display="none";
}



