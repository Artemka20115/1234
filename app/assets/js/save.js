//order for first version: 1 letter compression type, race,level,params,objects,mods,zakl

//previous version => e/E; current f/F (zatochki added, podkladki + mod/zakl for podkladki)

var lettersUsed="qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM0123456789-+";
var powTwo=new Array(1,2,4,8,16,32);
var bitsPerLetter=6;
var sizes=new Object();
//in the DB the objects start from the ID 2156, 2150 will be substracted from each objectId
sizes.objectsOffset=2150;
sizes.object=11;
//there are 3402-2156=1246 objects, will start numbering costum objects from 1300
//there are 2807-2156=651 objects, will start numbering costum objects from 850
sizes.specialObjectStart=1300;
// sizes.specialObjectStart=850;
//the number of custom objects
sizes.nrCustomObjects=10;
sizes.nameLength=7;
//default unicode character length
sizes.bitsPerChar=16;
sizes.imgNameLength=6;
sizes.imgNameBitsPerChar=8;//onli ascii
sizes.priceSerye=1;
sizes.priceSinie=16;
sizes.hp=9;//true for special objects, did not check for personal
sizes.type_id=5;
sizes.art_type=3;
sizes.art_type_old=2;
sizes.itemParameter=15;
sizes.imageFromDB=1;//can be 0 or 1 
sizes.nrParameters=6;
sizes.nrDrinks=11;
sizes.drinkNr=23;
sizes.isDrink=1;//can be 0 or 1
sizes.isPodkladka=2;//do I need 2?
sizes.drinkDuration=10;
sizes.nrBagItems=10;
sizes.qntBagItems=10;
sizes.stoneType=5;
sizes.stoneMult=6;
sizes.param=11;
sizes.level=6;
sizes.race=3;
sizes.zatType=6;
sizes.zatNr=10;

var lettersIndex=new Array();

lastPersNrForDb=-1;

function showSaveLoadDiv(persNr)
{
	var out="";
	/*out+='<button onclick="offlineSave('+persNr+');">Сохранить в строку</button>';
	out+='<button onclick="offlineLoad('+persNr+');">Загрузить из строки</button>';
	out+="<br>";*/
	if (isLoggedIn())
	{
		out+='<button onclick="serverSave('+persNr+');">Сохранить в новой записи</button>';
		out+="<div id='saveLoadTableDiv'>Подождите, идёт закрузка</div>";
	}
	else//user is not logged in
	{
		out+="Для сохранения на сервере необходимо <a href='../index.php?do=login'>залогиниться</a> или <a href='../index.php?do=register'>зарегистрироваться</a> на сайте";
	}

	out+='<br><button onclick="hideSaveLoadDiv();">Закрыть</button>';
	document.getElementById('saveLoadDiv').innerHTML=out;
	document.getElementById('saveLoadDiv').style.display="inline";
	if (isLoggedIn())
		serverLoad(persNr);
	lastPersNrForDb=persNr;
}

function hideSaveLoadDiv()
{
	document.getElementById('saveLoadDiv').style.display="none";
}

for (var i=0; i<lettersUsed.length; i++)
{
	lettersIndex[lettersUsed.charAt(i)]=i;
}


function encode(arr, isCompressed)//receives binary array, returns an encoded string
{
	var str="";
	var len=arr.length;
	var val=0;
	var nr=0;
	for (var i=0; i<len; i++)
	{
		val+=powTwo[nr]*arr[i];
		nr++;
		if (nr>=bitsPerLetter || i==len-1)
		{
			str+=lettersUsed.charAt(val);
			val=0;
			nr=0;
		}
	}
	var version=(isCompressed?"f":"F");
	return version+str;
}

//1 or 2; 2 is with zatochki, podkladki.

var programVersion;

function isCompressed(str)
{
	return (str.charAt(0)=="e" || str.charAt(0)=="f");
}

function decode(str)//receives an encoded string, returns abinary array
{
	var arr=new Array();
	var len=str.length;
	var val=0;
	var nr=0;
	for (var i=1; i<len; i++)//str[0] is the version
	{
		val=lettersIndex[str.charAt(i)];
		for (var j=bitsPerLetter-1; j>=0; j--)
		{
			arr[nr+j]=Math.floor(val/powTwo[j]);
			val=val%powTwo[j];
		}
		nr+=bitsPerLetter;
	}
	return arr;
}

function CRC(str)//outputs a 6 character CRC
{
}

function loadOfflineSavedArray(persNr,arr)
{
	takeOffAll(persNr);
	persNr++;
	var bp=persNr==1?bodyParts1:bodyParts2;

	var race=getNrFromArr(arr,sizes.race);
	document.getElementById('race_pers'+persNr).value=race;
	var level=getNrFromArr(arr,sizes.level);
	document.getElementById('level_pers'+persNr).value=level;
	var parLen=parameterTypesZero.length;
	for (var i=0; i<parLen; i++)
	{
		var el=document.getElementById("user_parameter_"+parameterTypesZero[i].short_name+"_"+(persNr));
		if (el!==null)
		{
			var el_val=getNrFromArr(arr,sizes.param);
			el.value=el_val;
		}
	}

	//get the id where the first object appears in the array
	var spStartId=-1;
	for (var j=0; j<objects.length; j++)
	{
		//do not take into consideration invalid objects
		if (objects[j].photo_location==-1)
			continue;

		if (objects[j].defaultObject==0)
		{
			spStartId=j;
			break;
		}
	}
	var costumNr=getNrFromArr(arr,sizes.nrCustomObjects);
	var costumObjectsIdArr=new Array();
	for (var i=0; i<costumNr; i++)
	{
		objects[objects.length]=new Object();
		var obj=objects[objects.length-1];
		costumObjectsIdArr[i]=objects.length-1;

		var nameLen=getNrFromArr(arr,sizes.nameLength);
		var name="";
		for (var j=0; j<nameLen; j++)
		{
			var code=getNrFromArr(arr,sizes.bitsPerChar);
			name+=String.fromCharCode(code);
		}
		obj.name=name;
		obj.id=-1;
		obj.defaultObject=0;
		var photoLen=getNrFromArr(arr,sizes.imgNameLength);
		var photo="";
		for (var j=0; j<photoLen; j++)
		{
			var code=getNrFromArr(arr,sizes.imgNameBitsPerChar);
			photo+=String.fromCharCode(code);
		}
		obj.photo_location=photo;
		obj.price_serye=getNrFromArr(arr,sizes.priceSerye);
		obj.price_sinie=getNrFromArr(arr,sizes.priceSinie);
		obj.is_drink=getNrFromArr(arr,sizes.isDrink);
		obj.imageFromDB=getNrFromArr(arr,sizes.imageFromDB);

		if (obj.is_drink==0)
		{
			obj.hp=getNrFromArr(arr,sizes.hp);
			obj.min_level=getNrFromArr(arr,sizes.level);
			obj.max_level=getNrFromArr(arr,sizes.level);
			obj.type_id=getNrFromArr(arr,sizes.type_id);

			obj.art_type=getNrFromArr(arr,(programVersion==2?sizes.art_type:sizes.art_type_old));
			if (obj.art_type==-1)
				obj.art_type=4;

			if (programVersion==2)
			{
				obj.klan_art_type=getNrFromArr(arr,sizes.art_type);
				obj.is_podkladka=getNrFromArr(arr,sizes.isPodkladka);
			}

			if (obj.is_podkladka)
				obj.art_type=-1;

			obj.min_damage=getNrFromArr(arr,sizes.itemParameter);
			obj.max_damage=getNrFromArr(arr,sizes.itemParameter);
		}
		else
		{
			obj.drink_duration=getNrFromArr(arr,sizes.drinkDuration);
		}

		var parLen=getNrFromArr(arr,sizes.nrParameters);

		obj.parameters=new Array();
		for (var j=0; j<parLen; j++)
		{
			obj.parameters[j]=new Object();
			obj.parameters[j].id=getNrFromArr(arr,sizes.nrParameters);
			var val=getNrFromArr(arr,sizes.itemParameter);
			if (parameterTypes[obj.parameters[j].id].multiplier-0!=1-0)
				val/=5;
			obj.parameters[j].value=val;
		}
		//check if the newly created object is allready existing

		if (spStartId==-1)
			continue;
		var found=false;

		for (var j=spStartId; j<objects.length-1; j++)
		{
			//do not take into consideration invalid objects
			if (objects[j].photo_location==-1)
				continue;

			var ob=objects[j];
			if (obj.name!=ob.name || obj.photo_location!=ob.photo_location || obj.price_serye!=ob.price_serye || obj.price_sinie!=ob.price_sinie || obj.is_drink!=ob.is_drink)
				continue;
			if (obj.is_drink==0)
			{
				if (obj.hp!=ob.hp || obj.min_level!=ob.min_level || obj.max_level!=ob.max_level || obj.type_id!=ob.type_id || obj.art_type!=ob.art_type
					|| obj.min_damage!=ob.min_damage || obj.max_damage!=ob.max_damage)
					continue;
			}
			else
			{
				if (obj.drink_duration!=ob.drink_duration)
					continue;
			}
			if (obj.parLen!=ob.parLen)
				continue;
			found=true;
			for (var k=0; k<obj.parameters.length; k++)
			{
				if (obj.parameters[k].id!=ob.parameters[k].id || obj.parameters[k].value!=ob.parameters[k].value)
				{
					found=false;
					break;
				}
			}
			if (found)
			{
				costumObjectsIdArr[i]=j;
				objects.length=objects.length-1;
				break;
			}
		}
	}

	for (var i=0; i<bp.length; i++)
	{
		for (var j=0; j<bp[i].objects.length;j++)
		{
			var bpId=getNrFromArr(arr,sizes.object);
			if (bpId>0)
			{
				if (bpId>=sizes.specialObjectStart)
				{
					bpId=costumObjectsIdArr[bpId-sizes.specialObjectStart];
				}
				else
				{
					bpId=objectsDb[bpId+(sizes.objectsOffset-0)];
				}
				bp[i].objects[j].id=bpId;
			}

			if (programVersion==2)
			{
				var podklId=getNrFromArr(arr,sizes.object);
				if (podklId>0)
				{
					if (podklId>=sizes.specialObjectStart)
					{
						podklId=costumObjectsIdArr[podklId-sizes.specialObjectStart];
					}
					else
					{
						podklId=objectsDb[podklId+(sizes.objectsOffset-0)];
					}
					bp[i].objects[j].podklId=podklId;
				}
			}
		}
	}

	for (var i=0; i<bp.length; i++)
	{
		for (var j=0; j<bp[i].objects.length;j++)
		{
			//item mod
			bp[i].objects[j].modType=getNrFromArr(arr,sizes.stoneType);
			bp[i].objects[j].modMult=getNrFromArr(arr,sizes.stoneMult);
			//podkl mod
			if (programVersion==2)
			{
				bp[i].objects[j].podklModType=getNrFromArr(arr,sizes.stoneType);
				bp[i].objects[j].podklModMult=getNrFromArr(arr,sizes.stoneMult);
			}
		}
	}
	for (var i=0; i<bp.length; i++)
	{
		for (var j=0; j<bp[i].objects.length;j++)
		{
			//item zakl
			bp[i].objects[j].zaklType=getNrFromArr(arr,sizes.stoneType);
			bp[i].objects[j].zaklMult=getNrFromArr(arr,sizes.stoneMult);
			//podkl zakl
			if (programVersion==2)
			{
				bp[i].objects[j].podklZaklType=getNrFromArr(arr,sizes.stoneType);
				bp[i].objects[j].podklZaklMult=getNrFromArr(arr,sizes.stoneMult);
			}
		}
	}
	if (programVersion==2)
	{
		for (var i=0; i<bp.length; i++)
		{
			for (var j=0; j<bp[i].objects.length;j++)
			{
				bp[i].objects[j].zatType=getNrFromArr(arr,sizes.zatType);
				bp[i].objects[j].zatNr=getNrFromArr(arr,sizes.zatNr);
			}
		}
	}

	var len=getNrFromArr(arr,sizes.nrDrinks);
	drinksUsed=(persNr==1?drinksUsed1:drinksUsed2);
	for (var i=0; i<len; i++)
	{
		var id=drinksUsed.length;
		drinksUsed[id]=new Object();
		var objId=getNrFromArr(arr,sizes.object);
		if (objId>=sizes.specialObjectStart)
		{
			objId=costumObjectsIdArr[objId-sizes.specialObjectStart];
		}
		else
		{
			objId=objectsDb[objId+(sizes.objectsOffset-0)];
		}
		drinksUsed[id].id=objId
		drinksUsed[id].nr=getNrFromArr(arr,sizes.drinkNr);
	}

	var len=getNrFromArr(arr,sizes.nrBagItems);
	bag=(persNr==1?bag1:bag2);
	for (var i=0; i<len; i++)
	{
		var id=bag.length;
		bag[id]=new Object();
		var objId=getNrFromArr(arr,sizes.object);
		if (objId>=sizes.specialObjectStart)
		{
			objId=costumObjectsIdArr[objId-sizes.specialObjectStart];
		}
		else
		{
			objId=objectsDb[objId+(sizes.objectsOffset-0)];
		}
		bag[id].id=objId
		bag[id].quantity=getNrFromArr(arr,sizes.qntBagItems);
		bag[id].modType=getNrFromArr(arr,sizes.stoneType);
		bag[id].modMult=getNrFromArr(arr,sizes.stoneMult);
		bag[id].zaklType=getNrFromArr(arr,sizes.stoneType);
		bag[id].zaklMult=getNrFromArr(arr,sizes.stoneMult);
		if (programVersion==2)
		{
			bag[id].zatType=getNrFromArr(arr,sizes.zatType);
			bag[id].zatNr=getNrFromArr(arr,sizes.zatNr);
		}
	}

	reload();
}

//note: binary representation is inverted
function makeOfflineSaveArray(persNr)
{
	persNr++;
	drinksUsed=(persNr==1?drinksUsed1:drinksUsed2);
	var arr=new Array();
	var bp=persNr==1?bodyParts1:bodyParts2;

	var race=document.getElementById('race_pers'+persNr).value;
	addBinaryToArr(arr,race,sizes.race);
	var level=document.getElementById('level_pers'+persNr).value;
	addBinaryToArr(arr,level,sizes.level);
	var parLen=parameterTypesZero.length;
	for (var i=0; i<parLen; i++)
	{
		var el=document.getElementById("user_parameter_"+parameterTypesZero[i].short_name+"_"+(persNr));
		if (el!==null)
		{
			var val=el.value.replace(nonDigitRegex,"");
			addBinaryToArr(arr,val,sizes.param);
		}
	}

	var objNr=0;
	for (var i=0; i<objects.length; i++)
	{
		//do not take into consideration invalid objects
		if (objects[i].photo_location==-1)
			continue;

		if (objects[i].id==-1)
			++objNr;
	}


	addBinaryToArr(arr,objNr,sizes.nrCustomObjects);

	var costumObjectsIdArr=new Array();

	var costumNr=sizes.specialObjectStart;
	for (var objNr=0; objNr<objects.length; objNr++)
	{
		//do not take into consideration invalid objects
		if (objects[objNr].photo_location==-1)
			continue;

		if (objects[objNr].id==-1)
		{
			var obj=objects[objNr];
			costumObjectsIdArr[objNr]=costumNr;

			var nameLen=obj.name.length;
			if (nameLen>Math.pow(2,sizes.nameLength)-1)
				nameLen=Math.pow(2,sizes.nameLength)-1;
			addBinaryToArr(arr,nameLen,sizes.nameLength);
			for (var i=0; i<nameLen; i++)
				addBinaryToArr(arr,obj.name.charCodeAt(i),sizes.bitsPerChar);

			addBinaryToArr(arr,obj.photo_location.length,sizes.imgNameLength);
			for (var i=0; i<obj.photo_location.length; i++)
				addBinaryToArr(arr,obj.photo_location.charCodeAt(i),sizes.imgNameBitsPerChar);

			var priceSerye=obj.price_serye;
			if (priceSerye<0)
				priceSerye=0;
			var priceSinie=obj.price_sinie;
			if (priceSinie<0)
				priceSinie=0;
			addBinaryToArr(arr,priceSerye,sizes.priceSerye);
			addBinaryToArr(arr,priceSinie,sizes.priceSinie);



			var isDrink=obj.is_drink;
			addBinaryToArr(arr,isDrink,sizes.isDrink);
			addBinaryToArr(arr,obj.imageFromDB,sizes.imageFromDB);

			if (isDrink==0)
			{
				var hp=obj.hp;
				if (!hp>0)
					hp=0;
				addBinaryToArr(arr,hp,sizes.hp);
				addBinaryToArr(arr,obj.min_level,sizes.level);
				addBinaryToArr(arr,obj.max_level,sizes.level);
				addBinaryToArr(arr,obj.type_id,sizes.type_id);
				addBinaryToArr(arr,obj.art_type==4?-1:obj.art_type,sizes.art_type);
				addBinaryToArr(arr,obj.klan_art_type!=undefined?obj.klan_art_type:-1,sizes.art_type);
				addBinaryToArr(arr,obj.is_podkladka!=undefined?obj.is_podkladka:0,sizes.isPodkladka);
				addBinaryToArr(arr,obj.min_damage,sizes.itemParameter);
				addBinaryToArr(arr,obj.max_damage,sizes.itemParameter);
			}
			else
			{
				addBinaryToArr(arr,obj.drink_duration,sizes.drinkDuration);
			}

			addBinaryToArr(arr,obj.parameters.length,sizes.nrParameters);
			for (var i=0; i<obj.parameters.length; i++)
			{
				var parId=obj.parameters[i].id;
				var par=parameterTypes[parId];
				addBinaryToArr(arr,parId,sizes.nrParameters);
				var val=obj.parameters[i].value;
				if (par.multiplier-0!=1-0)
					val*=5;
				addBinaryToArr(arr,val,sizes.itemParameter);
			}

			costumNr++;
		}
	}


	for (var i=0; i<bp.length; i++)
	{
		for (var j=0; j<bp[i].objects.length;j++)
		{
			var objId=bp[i].objects[j].id;
			var podklId=bp[i].objects[j].podklId;
			if (objId-0>0)
			{
				//objects
				if (objects[objId].id==-1)
					objId=costumObjectsIdArr[objId];
				else
				{
					objId=objects[objId].id-sizes.objectsOffset;
				}
			}
			addBinaryToArr(arr,objId,sizes.object);

			if (podklId-0>0)
			{
				//podkladki
				if (objects[podklId].id==-1)
					podklId=costumObjectsIdArr[podklId];
				else
				{
					podklId=objects[podklId].id-sizes.objectsOffset;
				}
			}
			addBinaryToArr(arr,podklId,sizes.object);
		}
	}
	for (var i=0; i<bp.length; i++)
	{
		for (var j=0; j<bp[i].objects.length;j++)
		{
			//object mod
			addBinaryToArr(arr,bp[i].objects[j].modType,sizes.stoneType);
			addBinaryToArr(arr,bp[i].objects[j].modMult,sizes.stoneMult);
			//podkladka mod
			addBinaryToArr(arr,bp[i].objects[j].podklModType,sizes.stoneType);
			addBinaryToArr(arr,bp[i].objects[j].podklModMult,sizes.stoneMult);
		}
	}
	for (var i=0; i<bp.length; i++)
	{
		for (var j=0; j<bp[i].objects.length;j++)
		{
			//object zakl
			addBinaryToArr(arr,bp[i].objects[j].zaklType,sizes.stoneType);
			addBinaryToArr(arr,bp[i].objects[j].zaklMult,sizes.stoneMult);
			//podkladka zakl
			addBinaryToArr(arr,bp[i].objects[j].podklZaklType,sizes.stoneType);
			addBinaryToArr(arr,bp[i].objects[j].podklZaklMult,sizes.stoneMult);
		}
	}
	for (var i=0; i<bp.length; i++)
	{
		for (var j=0; j<bp[i].objects.length;j++)
		{
			addBinaryToArr(arr,bp[i].objects[j].zatType,sizes.zatType);
			addBinaryToArr(arr,bp[i].objects[j].zatNr,sizes.zatNr);
		}
	}

	var nrDr=0;
	for (var i=0; i<drinksUsed.length; i++)
	{
		if (drinksUsed[i].id!=-1)
			nrDr++;
	}

	addBinaryToArr(arr,nrDr,sizes.nrDrinks);

	nrDr=0;
	for (var i=0; i<drinksUsed.length; i++)
	{
		if (drinksUsed[i].id!=-1)
		{
			var drId=drinksUsed[i].id;
			if (objects[drId].id==-1)
				drId=costumObjectsIdArr[drId];
			else
				drId=objects[drinksUsed[i].id].id-sizes.objectsOffset;
			addBinaryToArr(arr,drId,sizes.object);
			addBinaryToArr(arr,drinksUsed[i].nr,sizes.drinkNr);
		}
	}

	var bag=(persNr==1?bag1:bag2);

	var nrBag=0;
	for (var i=0; i<bag.length; i++)
	{
		if (bag[i].id!=-1)
			nrBag++;
	}

	addBinaryToArr(arr,nrBag,sizes.nrBagItems);

	nrDr=0;
	for (var i=0; i<bag.length; i++)
	{
		if (bag[i].id!=-1)
		{
			var bagId=bag[i].id;
			if (objects[bagId].id==-1)
			{
				bagId=costumObjectsIdArr[bagId];
			}
			else
			{
				bagId=objects[bagId].id-sizes.objectsOffset;
			}
			addBinaryToArr(arr,bagId,sizes.object);
			addBinaryToArr(arr,bag[i].quantity,sizes.qntBagItems);
			addBinaryToArr(arr,bag[i].modType,sizes.stoneType);
			addBinaryToArr(arr,bag[i].modMult,sizes.stoneMult);
			addBinaryToArr(arr,bag[i].zaklType,sizes.stoneType);
			addBinaryToArr(arr,bag[i].zaklMult,sizes.stoneMult);
			addBinaryToArr(arr,bag[i].zatType,sizes.zatType);
			addBinaryToArr(arr,bag[i].zatNr,sizes.zatNr);
		}
	}


	return arr;
}

function addBinaryToArr(arr,nr,len) //exces 1 used, to make -1 values positive
{
	nr=nr-0+1;
	var arrLen=arr.length;
	for (var i=0; i<len; i++)
	{
		arr[arrLen+i]=nr%2;
		nr=Math.floor(nr/2);
	}
}

function getNrFromArr(arr,len) //exces 1 used, to make -1 values positive
{
	var val=0;
	p=1;
	for (var i=0; i<len; i++)
	{
		var sh=arr.shift()
		val+=p*sh;
		p*=2;
	}

	return val-1;
}

function generateOfflineSaveStr(persNr)
{
	var arr=makeOfflineSaveArray(persNr);
	var enc_arr=compressLZW(arr).split('');
	var str;
	if (arr.length>enc_arr.length)//use compressed variant
	{
		str=encode(enc_arr,true)
	}
	else
	{
		str=encode(arr,false)
	}
	var crc=crc32(str);
	var negative=false;
	//alert(str.length+" "+crc);
	//alert(str);
	if (crc-0<0)
	{
		negative=true;
		crc*=-1;
	}
	crc=crc.toString(8);
	var packedCrc="";
	for (var i=0; i<=10; i+=2)
	{
		var ind1=((crc.length>i?crc.charAt(i):0)-0);
		var ind2=(crc.length>i+1?crc.charAt(i+1):0);
		if (i==10 && negative)
			ind2=1;
		packedCrc+=""+lettersUsed.charAt(ind1*8+(ind2-0));
	}
	str=packedCrc+""+str;

	if (!tryLoad(str))
	{
		alert("Ошибка при сохранение. Пожалуйста сообщите об этой ошибке создателю примерки или на форуме. '"+str+"'");
		return false;
	}
	return str;
}

function offlineSave(persNr)
{
	serverSave(persNr, "4h654fshg7324dgs46");
	return;
	var str=generateOfflineSaveStr(persNr);
	if (str!=false)
		if (prompt("Сохраните строку любым удобым способом. В этой строке содержится вся информация об одном из персонажей(вещи, моды, рюкзак, упив,...).", str))
			hideSaveLoadDiv();
}

function offlineSaveLink(persNr)
{
	serverSaveLink(persNr, "4h654fshg7324dgs46");
	return;
	var str=generateOfflineSaveStr(persNr);
	if (str!=false)
		if (prompt("Сохраните строку любым удобым способом. В этой строке содержится вся информация об одном из персонажей(вещи, моды, рюкзак, упив,...).", "://pdizclan.ru/primerka/index.php?id="+str))
			hideSaveLoadDiv();
}
function loadString(persNr,str)
{
	str=str.replace(saveStringRegex,"");
	var packedCrc=str.substring(0,6);
	var crc="";
	for (var i=0; i<6; i++)
	{
		var ind=lettersIndex[packedCrc.charAt(i-0)];
		crc+=""+Math.floor(ind/8);
		if (i<5)
			crc+=""+Math.floor(ind%8);
		else
		{
			if (ind%8==1)
				crc*=-1;
		}
	}
	//alert(str.length+" "+crc);
	str=str.substring(6);//throw away crc

	var calcCrc=crc32(str);
	//alert("calculated:"+calcCrc);
	//alert(str);
	calcCrc=calcCrc.toString(8);
	if (calcCrc-0!=(crc+"").substring(0,calcCrc.length)-0)
	{
		alert("Ошибка! Строка которую ввели не правильная. Проверьте если вы скопировали её полностю.");
		return;
	}
	var arr=decode(str);
	//alert(arr);
	if (str[0]=='e' || str[0]=='E')
		programVersion=1;
	else if (str[0]=='f' || str[0]=='F')
		programVersion=2;
	else
	{
		alert("Ошибка! Строка которую ввели не правильная. Проверьте если вы скопировали её полностю.");
		return;
	}

	if (isCompressed(str))
	{
		var arr_comp=deCompressLZW(arr);
		loadOfflineSavedArray(persNr,arr_comp);
	}
	else
		loadOfflineSavedArray(persNr,arr);

	raceChanged(persNr+1,false, false);
}

function offlineLoad(persNr)
{
	var str=prompt("Введите строку", "");
	if (str)
	{
		var xmlhttp;
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("POST","dbSave.php",false);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
		try
		{
			xmlhttp.send("op=getSaveString_sha1&sha1="+str)
		}
		catch (err)
		{
			alert("ВНИМАНИЕ! Произошла ошибка при подключение к серверу сайта.");
			return false;
		}
		var str1=decodeURIComponent(xmlhttp.responseText.trim());
		loadString(persNr,str1);
	}
	//alert(str.length);
}

function offlineLoadUrl(str)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("POST","dbSave.php",false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	try
	{
		xmlhttp.send("op=getSaveString_sha1&sha1="+str)
	}
	catch (err)
	{
		alert("ВНИМАНИЕ! Произошла ошибка при подключение к серверу сайта.");
		return false;
	}
	var str1=decodeURIComponent(xmlhttp.responseText.trim());
	loadString(0,str1);
}

function tryLoad(str)//check CRC
{
	str=str.replace(saveStringRegex,"");
	var packedCrc=str.substring(0,6);
	var crc="";
	for (var i=0; i<6; i++)
	{
		var ind=lettersIndex[packedCrc.charAt(i)];
		crc+=""+Math.floor(ind/8);
		if (i<5)
			crc+=""+Math.floor(ind%8);
		else
		{
			if (ind%8==1)
				crc*=-1;
		}
	}
	str=str.substring(6);//throw away crc
	var calcCrc=crc32(str).toString(8);
	if (calcCrc-0!=(crc+"").substring(0,calcCrc.length)-0)
	{
		return false;
	}
	return true;
}

