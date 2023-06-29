function putOnObject(objId, persNr, bodyPartTypeShortName, bodyPartNr, modType, modMult, zaklType, zaklMult, zatType, zatNr) //persNr=0 or 1, where 0=the left one, 1= the right one 
{
	var obj = objects[objId];
	var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
	if (typeof(bodyPartTypeShortName) == 'undefined' || bodyPartTypeShortName == -1) {
		for (var i = 0; i < bodyPartsDB.length; i++) {
			if (bodyPartsDB[i].id == objects[objId].type_id)
				break;
		}
		var bpId = getBodyPartId(bodyPartsDB[i].short_name);
		var found = false;
		for (var i = 0; i < bodyPartsGen[bpId].objects.length; i++) {
			if ((obj.is_podkladka != 1 ? bodyPartsGen[bpId].objects[i].id : bodyPartsGen[bpId].objects[i].podklId) == -1) {
				bodyPartTypeShortName = bodyPartsGen[bpId].shortName;
				bodyPartNr = i;
				found = true;
				break;
			}
		}
		if (!found) {
			alert("Нету свободного места для данной вещи.");
			return false;
		}
		hideBagContent();
		putOnStone(modType, modMult, 1, persNr, bodyPartTypeShortName, bodyPartNr, (obj.is_podkladka == 1));
		putOnStone(zaklType, zaklMult, 0, persNr, bodyPartTypeShortName, bodyPartNr, (obj.is_podkladka == 1));
	}
	var found = 0;
	for (var i = 0; i < bodyPartsGen.length; i++) {
		if (bodyPartsGen[i].shortName == bodyPartTypeShortName)
			break;
		for (var j = 0; j < bodyPartsGen[i].objectTypes.length; j++) {
			if (bodyPartsGen[i].objectTypes[j].shortName == bodyPartTypeShortName) {
				found = 1;
				break;
			}
		}
		if (found)
			break;
	}
	if (bodyPartsGen[i].shortName == 'oru' && obj.is_podkladka != 1) {
		if (bodyPartNr == 0) {
			var obj2Id = bodyPartsGen[i].objects[1].id;
			if (obj2Id != -1 && objects[obj2Id].is_twohanded == '1') {
				alert("Вы не можете одеть этот предмет из за того что вы уже одели двуручное оружие");
				hideObjectsSelectTable();
				return;
			}
		} else {
			var obj2Id = bodyPartsGen[i].objects[0].id;
			if (obj2Id != -1 && objects[obj2Id].is_twohanded == '1') {
				alert("Вы не можете одеть этот предмет из за того что вы уже одели двуручное оружие");
				hideObjectsSelectTable();
				return;
			}
		}
	}
	if (obj.is_podkladka != 1) {
		bodyPartsGen[i].objects[bodyPartNr].id = objId;
		if (zatType != undefined && zatNr != undefined) {
			bodyPartsGen[i].objects[bodyPartNr].zatType = zatType;
			bodyPartsGen[i].objects[bodyPartNr].zatNr = zatNr;
		}
	} else {
		bodyPartsGen[i].objects[bodyPartNr].podklId = objId;
	}
	hideObjectsSelectTable();
	reload();
	window.scrollTo(0, 0);
}

function putOnStone(stoneId, stoneStat, StoneIsMod, persNr, bodyPartTypeShortName, bodyPartNr, isPodkladka) //persNr=0 or 1, where 0=the left one, 1= the right one 
// StoneIsMod - 1=mod, 0=zakl
{
	var obj;
	if (bodyPartTypeShortName == -1) //if the object is from the bag
	{
		obj = bag[bodyPartNr - 0 + (1 - 0)];
	} else {
		var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
		BodyPartId = getBodyPartId(bodyPartTypeShortName);
		obj = bodyPartsGen[BodyPartId].objects[bodyPartNr];
	}
	if (isPodkladka != true) {
		if (StoneIsMod) {
			obj.modType = stoneId;
			obj.modMult = stoneStat;
		} else {
			obj.zaklType = stoneId;
			obj.zaklMult = stoneStat;
		}
	} else {
		if (StoneIsMod) {
			obj.podklModType = stoneId;
			obj.podklModMult = stoneStat;
		} else {
			obj.podklZaklType = stoneId;
			obj.podklZaklMult = stoneStat;
		}
	}
	hideModChooseDiv();
	if (bodyPartTypeShortName == -1)
		displayBagContent(persNr);
	else
		reload();
}

function putOnZat(bagId) //persNr=0 or 1, where 0=the left one, 1= the right one 
{
	reloadZatStats();
	var zatType, zatIsBlue;
	for (var i = 0; i < zatochki.length * 2; i++) {
		var el = document.getElementById("zat_option_" + i);
		if (el != null && el.checked) {
			zatType = Math.floor(i / 2);
			zatIsBlue = (i % 2 == 1);
		}
	}
	var zatNr = document.getElementById('zat_quantity').value;
	var persNr = persSelected;
	var bodyPartTypeShortName = bodyPartTypeSelected;
	var bodyPartNr = bodyPartNrSelected - 1;

	var obj;
	if (bagId != undefined) //if the object is from the bag
	{
		obj = bag[bagId];
	} else {
		var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
		BodyPartId = getBodyPartId(bodyPartTypeShortName);
		obj = bodyPartsGen[BodyPartId].objects[bodyPartNr];
	}
	obj.zatType = zatType * 2 + (zatIsBlue ? 1 : 0);
	obj.zatNr = zatNr;

	hideZatChooseDiv();
	if (bagId != undefined)
		displayBagContent(persNr);
	else
		reload();
}

function reload() //reloads the images and parameters of the objects wich are currently on
{
	for (var persNr = 0; persNr < 2; persNr++) {
		var priceSerye = 0,
			priceSinie = 0;
		var level;
		var race = races[document.getElementById("race_pers" + (persNr - 0 + 1)).value];
		var rating = 0;
		var usedStatsUps = 0;
		var usedMastUps = 0;
		window.min_damage_left = 0,
			min_damage_right = 0,
			max_damage_left = 0,
			max_damage_right = 0,
			vlijanie_sily_left = 100,
			vlijanie_sily_right = 100,
			sila = 0;

		let ratingStats = {
			SS: 0,
			SM: 0,
			SW: 0,
			SB: 0,
			LVL: 0
		};
		var bodyPartsGen = persNr == 0 ? bodyParts1 : bodyParts2;
		var drinksUsed = persNr == 0 ? drinksUsed1 : drinksUsed2;
		var len = parameterTypesZero.length;
		var stat = new Array();
		let artMultipler = [];
		for (var i = 0; i < len; i++) {
			stat[i] = 0;
		}
		for (var i = 0; i < bodyPartsGen.length; i++) {
			for (var j = 0; j < bodyPartsGen[i].objects.length; j++) {
				var obj = bodyPartsGen[i].objects[j];
				var object = objects[obj.id];
				var podklObject = objects[obj.podklId];
				var name = bodyPartsGen[i].shortName;
				if (bodyPartsGen[i].objects.length > 1)
					name += (j + 1);
				path = OBJECTS_PATH;
				var imgName = "blank.gif";
				if (obj.id != -1) {
					if (objects[obj.id].art_type === 4) {
						for (let sotNr = 0; sotNr < specialObjectsTypes.length; sotNr++) {
							if (objects[obj.id].name === specialObjectsTypes[sotNr].name) {
								let mp = specialObjectsTypes[sotNr].magic_properties.find(o => o.name === 'Бонус ко всем статам');
								artMultipler.push(parseInt(mp.value));
							}
						}
					}

					/*					if (typeof(object.price_serye) != 'undefined' && object.price_serye!==null && object.price_serye>(0-0))
										{
											priceSerye=priceSerye-0+(object.price_serye-0);
										}
										if (typeof(object.price_sinie) != 'undefined' && object.price_sinie!==null && object.price_sinie>(0-0))
										{
											priceSinie=priceSinie-0+(object.price_sinie-0);
										}*/
					if (typeof(object.min_damage) != 'undefined' && object.min_damage !== null && object.min_damage > (0 - 0)) {
						ratingStats.SW += parseInt(object.min_damage);
						rating += object.min_damage * 0.25;
						if (j == 0)
							min_damage_left = object.min_damage;
						else
							min_damage_right = object.min_damage;
					}
					if (typeof(object.vlijanie_sily) != 'undefined' && object.vlijanie_sily !== null && object.vlijanie_sily > (0 - 0)) {
						if (j == 0)
							vlijanie_sily_left = object.vlijanie_sily;
						else
							vlijanie_sily_right = object.vlijanie_sily;
					}

					if (typeof(object.max_damage) != 'undefined' && object.max_damage !== null && object.max_damage > (0 - 0)) {
						ratingStats.SW += parseInt(object.max_damage);
						rating += object.max_damage * 0.25;
						if (j == 0)
							max_damage_left = object.max_damage;
						else
							max_damage_right = object.max_damage;
					}
					if (typeof(object.max_damage) != 'undefined' && object.max_damage !== null && object.max_damage > (0 - 0)) {
						if (j == 0)
							max_damage_left = object.max_damage;
						else
							max_damage_right = object.max_damage;
					}

					imgName = object.photo_location;
					for (var k = 0; k < object.parameters.length; k++) {
						var par = object.parameters[k];
						var parZeroId = parameterTypes[par.id].zero_id;
						stat[parZeroId] += par.value;
					}
					path = object.defaultObject ? OBJECTS_PATH : (object.imageFromDB ? SPECIAL_OBJECTS_PATH : TEMP_SPECIAL_OBJECTS_PATH);
				}


				document.getElementById("img_" + name + "_pers" + (persNr + 1)).src = path + imgName;

				imgName = "blank.gif";
				if (obj.modType != -1) {
					imgName = stones[obj.modType].image;
					var statId = getStatId(stones[obj.modType].statShortName);
					stat[statId] += obj.modMult;
				}
				modObject = document.getElementById("img_" + name + "_mod" + "_pers" + (persNr + 1));
				modObject.src = STONES_PATH + imgName;
				modObject.title = (obj.modType == -1 ? 'мод' : '');

				imgName = "blank.gif";
				if (obj.zaklType != -1) {
					imgName = stones[obj.zaklType].image;
					var statId = getStatId(stones[obj.zaklType].statShortName);
					stat[statId] += obj.zaklMult;
				}
				var zaklObject = document.getElementById("img_" + name + "_zakl" + "_pers" + (persNr + 1));
				zaklObject.src = STONES_PATH + imgName;
				zaklObject.title = (obj.zaklType == -1 ? 'Закл' : '');

				//podkladki mod,zakl
				imgName = "blank.gif";
				if (obj.podklModType != -1) {
					imgName = stones[obj.podklModType].image;
					var statId = getStatId(stones[obj.podklModType].statShortName);
					stat[statId] += obj.podklModMult;
				}
				podklModObject = document.getElementById("img_" + name + "_mod_podkl" + "_pers" + (persNr + 1));
				podklModObject.src = STONES_PATH + imgName;
				podklModObject.title = (obj.podklModType == -1 ? 'мод (подкладка)' : '');

				imgName = "blank.gif";
				if (obj.podklZaklType != -1) {
					imgName = stones[obj.podklZaklType].image;
					var statId = getStatId(stones[obj.podklZaklType].statShortName);
					stat[statId] += obj.podklZaklMult;
				}
				var podklZaklObject = document.getElementById("img_" + name + "_zakl_podkl" + "_pers" + (persNr + 1));
				podklZaklObject.src = STONES_PATH + imgName;
				podklZaklObject.title = (obj.podklZaklType == -1 ? 'Закл (подкладка)' : '');


				imgName = "blank.gif";
				if (obj.podklId != -1) {
					imgName = podklObject.photo_location;
					var par = podklObject.parameters[0];
					var parZeroId = parameterTypes[par.id].zero_id;
					stat[parZeroId] += par.value;
				}
				var podklObj = document.getElementById("img_" + name + "_podkl" + "_pers" + (persNr + 1));
				podklObj.src = MISC_IMAGES_PATH + imgName;
				podklObj.title = (obj.podklId == -1 ? 'Место для подкладки' : '');


				imgName = "blank.gif";
				if (obj.zatType != -1) {
					var zatType = Math.floor(obj.zatType / 2);
					imgName = "zatochka.png";
					var statName = zatochki[zatType].statShortName;
					if (statName == 'bron') {
						switch (name) {
							case "shl":
								statName = "bron_gol";
								break;
							case "lat":
								statName = "bron_korp";
								break;
							case "per":
								statName = "bron_ruk";
								break;
							case "oru1":
							case "oru2":
								statName = "bron_korp";
								break;
							case "pon":
								statName = "bron_nog";
								break;
							case "nar":
								statName = "bron_ruk";
								break;
						}
					}

					if (statName == 'damage') {

						if (j == 0) {
							min_damage_left = (min_damage_left - 0) + (5 * (obj.zatNr) - 0);
							max_damage_left = (max_damage_left - 0) + (5 * (obj.zatNr) - 0);
							rating = (rating - 0) + (5 * obj.zatNr * 0.5 - 0);
						} else {
							min_damage_right = (min_damage_right - 0) + (5 * obj.zatNr - 0);
							max_damage_right = (max_damage_right - 0) + (5 * obj.zatNr - 0);
							rating = (rating - 0) + (5 * obj.zatNr * 0.5 - 0);
						}

						ratingStats.SW += parseInt(obj.zatNr * 5 * 2);

					} else {
						var statId = getStatId(statName);
						stat[statId] += 5 * obj.zatNr;
					}
				}
				var zatObj = document.getElementById("img_" + name + "_zat_pers" + (persNr + 1));
				zatObj.src = STONES_PATH + imgName;
				zatObj.title = (obj.zatType == -1 ? 'Место для заточки' : '');
			}

		}

		/*** detect multipler from ancient wrath artifacts ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ***/
		let statIncreaser = artMultipler.reduce((accumulator, a) => {
			return accumulator + a;
		}, 0);
		/*** detect multipler from ancient wrath artifacts ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ***/

		/*** count objects stats and multiple them ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ***/
		// if (statIncreaser > 0) {
		// 	console.log(statIncreaser);
		// 	for (let i = 0; i < stat.length; i++) {
		// 		let statVal = stat[i];
		// 		if (statVal !== 0) {
		// 			stat[i] = Math.floor(statVal + (statVal * (statIncreaser / 100)));
		// 		}
		// 	}
		// }
		/*** count objects stats and multiple them ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ***/

		for (var i = 0; i < drinksUsed.length; i++) {
			if (drinksUsed[i].id == -1)
				continue;

			var obj = objects[drinksUsed[i].id];
			for (var j = 0; j < obj.parameters.length; j++) {
				var par = obj.parameters[j];
				var parZeroId = parameterTypes[par.id].zero_id;
				stat[parZeroId] += par.value * drinksUsed[i].nr;
			}
			/*			if (typeof(obj.price_serye) != 'undefined' && obj.price_serye!==null && obj.price_serye>(0-0))
						{
							priceSerye=priceSerye-0+(obj.price_serye*drinksUsed[i].nr);
						}
						if (typeof(obj.price_sinie) != 'undefined' && obj.price_sinie!==null && obj.price_sinie>(0-0))
						{
							priceSinie=priceSinie-0+(obj.price_sinie*drinksUsed[i].nr);
						}*/
		}


		/*** count objects + drinks stats and multiple them ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ***/
		if (statIncreaser > 0) {
			for (let i = 0; i < stat.length; i++) {
				let statVal = stat[i];
				if (statVal !== 0) {
					// console.log(parameterTypesZero[i].short_name + ' - ' + stat[i]);
					stat[i] = statVal + (statVal * (statIncreaser / 100));
				}
			}
		}
		/*** count objects + drinks stats and multiple them ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ***/

		for (var i = -1; i < len; i++) {
			var name = (i >= 0 ? ("user_parameter_" + parameterTypesZero[i].short_name + "_" + (persNr + 1)) : ("level_pers" + (persNr + 1)));
			var el = document.getElementById(name);

			if (el !== null) {
				var val = el.value;
				val = val.replace(nonDigitRegex, "");
				el.value = val;


				if (i >= 0) {
					if (parameterTypesZero[i].multiplier == 1 && parameterTypesZero[i].isArmor == 0 && parameterTypesZero[i].short_name != 'intel') {
						var defaultVal = 0;
						for (var j = 0; j < race.parameters.length; j++) {
							if (race.parameters[j].short_name == parameterTypesZero[i].short_name) {
								defaultVal = race.parameters[j].value;
								break;
							}
						}
						if (parameterTypesZero[i].short_name == "sloj" && race.name !== 'ПБ')
							defaultVal = defaultVal - 0 + (level - 0);
						if (parameterTypesZero[i].short_name == race.incrementStat)
							defaultVal = defaultVal - 0 + (level - 0);
						//if (defaultVal<stat[i]-0)
						{
							usedStatsUps += (val - defaultVal);
						}
					} else if (parameterTypesZero[i].multiplier == 5 && parameterTypesZero[i].short_name.indexOf("ob_") == -1) {
						var defaultVal = 0;
						for (var j = 0; j < race.parameters.length; j++) {
							if (race.parameters[j].short_name == parameterTypesZero[i].short_name) {
								defaultVal = race.parameters[j].value;
								break;
							}
						}
						//if (defaultVal<stat[i]-0)
						{
							usedMastUps += (val / parameterTypesZero[i].multiplier - defaultVal);
						}
					}

					/*** stats multiple ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ***/
					if (statIncreaser > 0 && !["intel"].includes(parameterTypesZero[i].short_name)) {
						let statVal = val / parameterTypesZero[i].multiplier;
						if (statVal !== 0) {
							stat[i] += statVal + (statVal * (statIncreaser / 100));
						}
					} else {
						stat[i] += val / parameterTypesZero[i].multiplier;
					}
					/*** stats multiple ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ***/

					// stat[i]+=val/parameterTypesZero[i].multiplier;

					if (parameterTypesZero[i].short_name == 'sloj')
						document.getElementById("hp_div_" + (persNr - 0 + 1)).innerHTML = Math.floor(stat[i] * 5 + (10 - 0));
					if (parameterTypesZero[i].short_name == 'intel') {
						document.getElementById("mana_div_" + (persNr - 0 + 1)).innerHTML = stat[i] * 5;
						if (stat[i] > 10)
							usedStatsUps += (stat[i] - 10)
					}

					if (parameterTypesZero[i].short_name == 'sila')
						sila = stat[i];


				} else { //level
					level = el.value;
				}
			}



			if (i >= 0) {

				//stats
				if (["sila", "lovk", "reak", "zlosti", "udaca", "sloj", "intel"].includes(parameterTypesZero[i].short_name)) {
					ratingStats.SS += stat[i];
				}
				//skills
				if (["kulac", "zasita", "vlad", "metk", "anti_kul", "anti_zasita", "anti_vlad", "anti_metk"].includes(parameterTypesZero[i].short_name)) {
					ratingStats.SM += stat[i];
				}
				//amulets
				if (["ob_uv", "ob_ud", "ob_otv", "ob_krit", "anti_ob_uv", "anti_ob_ud", "anti_ob_otv", "anti_ob_krit"].includes(parameterTypesZero[i].short_name)) {
					ratingStats.SM += stat[i];
				}
				//armor
				if (["bron_gol", "bron_korp", "bron_nog"].includes(parameterTypesZero[i].short_name)) {
					ratingStats.SB += stat[i];
				}
				if (parameterTypesZero[i].short_name === "bron_ruk") {
					ratingStats.SB += stat[i];
				}

				if (parameterTypesZero[i].isArmor == 1) {
					rating += stat[i] / 10;
					if (parameterTypesZero[i].short_name == 'bron_ruk')
						rating += stat[i] / 10;
				} else {
					rating += (stat[i] - 0);
				}

				document.getElementById("parameter_" + parameterTypesZero[i].short_name + "_" + (persNr - 0 + 1)).innerHTML = formatStat(stat[i], parameterTypesZero[i], false, true);
				if (parameterTypesZero[i].short_name == 'bron_ruk') {
					document.getElementById("parameter_" + parameterTypesZero[i].short_name + "2_" + (persNr - 0 + 1)).innerHTML = formatStat(stat[i], parameterTypesZero[i], false, true);
				}
			}


		}

		ratingStats.LVL = parseInt(level);

		// console.log(rating);
		rating = Math.floor(rating * (0.215 * level + 1.422));
		//console.log(rating);
		rating /= 10;
		//console.log(rating);
		rating = calculateRating(ratingStats);

		document.getElementById("rating_div_" + (persNr - 0 + 1)).innerHTML = rating;
		window.silaLeft = vlijanie_sily_left * sila/ 100;
		window.minUronLeft = silaLeft - 0 + (min_damage_left - 0);
		window.maxUronLeft = silaLeft - 0 + (max_damage_left - 0);
		document.getElementById("uron_udac_left_" + (persNr - 0 + 1)).innerHTML = Math.floor(window.minUronLeft) + " - " + Math.floor(window.maxUronLeft);
		document.getElementById("uron_krit_left_" + (persNr - 0 + 1)).innerHTML = Math.floor(window.minUronLeft * 1.5) + " - " + Math.floor(window.maxUronLeft * 1.5);

		var price = "";
		if (priceSerye > 0) {
			price += Math.round(priceSerye * 100) / 100;
			if (priceSinie > 0) {
				price += "+";
			}
		}
		if (priceSinie > 0) {
			price += "<font style='color:blue'>" + Math.round(priceSinie * 100) / 100 + "</font>";
		}
		if (priceSerye == 0 && priceSinie == 0)
			price = "0";
		document.getElementById("price_pers" + (persNr - 0 + 1)).innerHTML = price;

		window.silaRight = vlijanie_sily_right * sila / 100;
		window.minUronRight = silaRight - 0 + (min_damage_right - 0);
		window.maxUronRight = silaRight - 0 + (max_damage_right - 0);
		document.getElementById("uron_udac_right_" + (persNr - 0 + 1)).innerHTML = Math.floor(minUronRight) + " - " + Math.floor(maxUronRight);
		document.getElementById("uron_krit_right_" + (persNr - 0 + 1)).innerHTML = Math.floor(minUronRight * 1.5) + " - " + Math.floor(maxUronRight * 1.5);

		var race = document.getElementById("race_pers" + (persNr - 0 + 1)).value;

		var totalUps = 0;
		for (var i = 0; i < level - 0; i++) {
			totalUps += (i - 0 + 1);
		}
		totalUps += (3 * level - 0);

		totalMastUps = level;
		if (race !== '7') {
			document.getElementById("stat_ups_div_" + (persNr - 0 + 1)).innerHTML = usedStatsUps + "/" + totalUps + "(+" + (level - 0 + (1 - 0)) + ")";
			document.getElementById("mast_ups_div_" + (persNr - 0 + 1)).innerHTML = usedMastUps + "/" + totalMastUps;
		} else {
			document.getElementById("stat_ups_div_" + (persNr - 0 + 1)).innerHTML = '0/0';
			document.getElementById("mast_ups_div_" + (persNr - 0 + 1)).innerHTML = '0/0';
		}
		//coloring the body part in red in case it doesn't fit the level or race of the person
		for (var i = 0; i < bodyPartsGen.length; i++) {
			for (var j = 0; j < bodyPartsGen[i].objects.length; j++) {
				var obj = bodyPartsGen[i].objects[j];
				var el = document.getElementById("img_" + bodyPartsGen[i].shortName + (bodyPartsGen[i].objects.length > 1 ? j + (1 - 0) : "") + "_pers" + (persNr + 1));
				if (obj.id == -1) {
					el.style.backgroundColor = "transparent";

				} else {
					var object = objects[obj.id];
					if ((level >= object.min_level && (object.max_level == -1 || level <= object.max_level) && (typeof(object.required_race) == 'undefined' || race == object.required_race || object.required_race == -1)) || (object.art_type > 0 && level >= 11)) {
						el.style.backgroundColor = "transparent";
					} else {
						el.style.backgroundColor = "#ff4646";
					}
				}

				var elPodkl = document.getElementById("img_" + bodyPartsGen[i].shortName + (bodyPartsGen[i].objects.length > 1 ? j + (1 - 0) : "") + "_podkl_pers" + (persNr + 1));
				if (obj.podklId == -1 || level >= 5) {
					elPodkl.style.backgroundColor = "transparent";
				} else {
					elPodkl.style.backgroundColor = "#ff4646";
				}

				var elZat = document.getElementById("img_" + bodyPartsGen[i].shortName + (bodyPartsGen[i].objects.length > 1 ? j + (1 - 0) : "") + "_zat_pers" + (persNr + 1));
				if (obj.zatType == -1 || level >= 3) {
					elZat.style.backgroundColor = "transparent";
				} else {
					elZat.style.backgroundColor = "#ff4646";
				}
			}
		}

		var isPitomec = races[race].image.indexOf("pitomec") >= 0;
		if (level - 0 < 1 && isPitomec) {
			takeOffSpecificCloth(persNr, "pon", 1);
			takeOffSpecificCloth(persNr, "lat", 1);
			takeOffSpecificCloth(persNr, "shl", 1);
		}
		document.getElementById("div_pon_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 1) ? "inline" : "none";
		document.getElementById("div_lat_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 1) ? "inline" : "none";
		document.getElementById("div_shl_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 1) ? "inline" : "none";
		if (level - 0 < 2 && isPitomec) {
			takeOffSpecificCloth(persNr, "per", 1);
		}
		document.getElementById("div_per_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 2) ? "inline" : "none";
		if (level - 0 < 3 && isPitomec) {
			takeOffSpecificCloth(persNr, "oru", 1);
			takeOffSpecificCloth(persNr, "oru", 2);
		}
		document.getElementById("div_oru1_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 3) ? "inline" : "none";
		document.getElementById("div_oru2_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 3) ? "inline" : "none";
		if (level - 0 < 5 && isPitomec) {
			takeOffSpecificCloth(persNr, "amu", 1);
			takeOffSpecificCloth(persNr, "amu", 2);
		}
		document.getElementById("div_amu1_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 5) ? "inline" : "none";
		document.getElementById("div_amu2_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 5) ? "inline" : "none";
		if (level - 0 < 6 && isPitomec) {
			takeOffSpecificCloth(persNr, "poi", 1);
		}
		document.getElementById("div_poi_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 6) ? "inline" : "none";
		if (level - 0 < 7 && isPitomec) {
			for (var cl = 1; cl <= 8; cl++)
				takeOffSpecificCloth(persNr, "kol", cl);
			takeOffSpecificCloth(persNr, "nar", 1);
		}
		document.getElementById("div_kol1_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 7) ? "inline" : "none";
		document.getElementById("div_kol2_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 7) ? "inline" : "none";
		document.getElementById("div_kol3_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 7) ? "inline" : "none";
		document.getElementById("div_kol4_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 7) ? "inline" : "none";
		document.getElementById("div_kol5_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 7) ? "inline" : "none";
		document.getElementById("div_kol6_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 7) ? "inline" : "none";
		document.getElementById("div_kol7_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 7) ? "inline" : "none";
		document.getElementById("div_kol8_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 7) ? "inline" : "none";
		document.getElementById("div_nar_pers" + (persNr + (1 - 0))).style.display = (!isPitomec || level - 0 >= 7) ? "inline" : "none";
		document.getElementById("div_sht_pers" + (persNr + (1 - 0))).style.display = (!isPitomec) ? "inline" : "none";
		if (isPitomec)
			takeOffSpecificCloth(persNr, "sht", 1);
	}
	reloadDrinksQuantity();
}

function calculateRating(obj) {
	// let reit = ( ( ( obj.SS + obj.SM/5 + obj.SB/4 ) / 7 ) + obj.SW/28 ) * ( 1 + level*0.15 );

	let reit = (((obj.SS + obj.SM + obj.SB / 5) / 7) + obj.SW / 28) * (1 + obj.LVL * 0.15);

	// console.log(obj);
	// console.log(reit);

	let reitString = "" + reit;
	let reitArr = reitString.split('.');
	let result = 0;
	if (reitArr.length > 1) {
		let num = parseInt(reitArr[0]);
		let dec = parseFloat(reitArr[1].slice(0, 1));
		result = num + (dec > 0 ? '.' + dec : '');
	} else {
		result = reitArr[0];
	}
	return result;
}

function raceChanged(persNr, resetStats, resetOnlyIncrementStats) {
	var race = races[document.getElementById("race_pers" + persNr).value];
	var level = document.getElementById("level_pers" + persNr).value;
	document.getElementById("pers_image" + (persNr - 0)).src = MISC_IMAGES_PATH + race.image;

	if (resetStats) {
		for (var i = 0; i < parameterTypesZero.length; i++) {
			var el = document.getElementById("user_parameter_" + parameterTypesZero[i].short_name + "_" + (persNr));
			var val = 0;
			if (el !== null) {
				for (var j = 0; j < race.parameters.length; j++) {
					if (race.parameters[j].short_name == parameterTypesZero[i].short_name) {
						val = race.parameters[j].value * parameterTypesZero[i].multiplier;
						break;
					}
				}
				if (parameterTypesZero[i].short_name == "sloj" && race.name !== 'ПБ')
					val += (level - 0);
				if (parameterTypesZero[i].short_name == race.incrementStat)
					val += (level - 0);
				if (!resetOnlyIncrementStats || parameterTypesZero[i].short_name == "sloj" || parameterTypesZero[i].short_name == race.incrementStat)
					el.value = val;
			}
		}
		reload();
	}
}