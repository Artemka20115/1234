function serverSave(persNr, name)
{
	if (typeof(name) == 'undefined')
		name=false;
	if (!name)
	{
		var message="Введите имя для нового сохранения.";
		var errorMessage="";
		do{
			name=prompt(errorMessage+message,"");
			errorMessage="";
			name=name.trim();
			if (name.length==0)
				errorMessage="Имя не может быть пустым. ";
			else
			{
				//TODO: check if exists, then overwrite
			}
		}while (errorMessage.length>0);
	}

	var str=generateOfflineSaveStr(persNr);
	if (str==false)
		return false;
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			serverSaveFinished(xmlhttp,persNr,name);
		}
	}
	xmlhttp.open("POST","dbSave.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	try
	{
		xmlhttp.send("op=write&data="+encodeURIComponent(str)+"&name="+encodeURIComponent(name));
	}
	catch (err)
	{
		alert("ВНИМАНИЕ! Произошла ошибка при подключение к серверу сайта.");
		return false;
	}
}

function serverSaveLink(persNr, name)
{
	if (typeof(name) == 'undefined')
		name=false;
	if (!name)
	{
		var message="Введите имя для нового сохранения.";
		var errorMessage="";
		do{
			name=prompt(errorMessage+message,"");
			errorMessage="";
			name=name.trim();
			if (name.length==0)
				errorMessage="Имя не может быть пустым. ";
			else
			{
				//TODO: check if exists, then overwrite
			}
		}while (errorMessage.length>0);
	}

	var str=generateOfflineSaveStr(persNr);
	if (str==false)
		return false;
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			serverSaveFinishedLink(xmlhttp,persNr,name);
		}
	}
	xmlhttp.open("POST","dbSave.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	try
	{
		xmlhttp.send("op=write&data="+encodeURIComponent(str)+"&name="+encodeURIComponent(name));
	}
	catch (err)
	{
		alert("ВНИМАНИЕ! Произошла ошибка при подключение к серверу сайта.");
		return false;
	}
}

function serverSaveFinishedLink(xmlhttp,persNr,name)
{
	if (xmlhttp.responseText==false)
	{
		alert("Error on database write");
		return;
	}
	//alert("serverSaveFinished. Response text:"+xmlhttp.responseText);
	if(name=="4h654fshg7324dgs46"){
		var str=xmlhttp.responseText.trim();
		prompt("Сохраните строку любым удобым способом. В этой строке содержится вся информация об одном из персонажей(вещи, моды, рюкзак, упив,...).", "://pdizclan.ru/primerka/index.php?id="+str);
		hideSaveLoadDiv();
	}
	else serverLoad(persNr);
}

function serverSaveFinished(xmlhttp,persNr,name)
{
	if (xmlhttp.responseText==false)
	{
		alert("Error on database write");
		return;
	}
	//alert("serverSaveFinished. Response text:"+xmlhttp.responseText);
	if(name=="4h654fshg7324dgs46"){
		var str=xmlhttp.responseText.trim();
		prompt("Сохраните строку любым удобым способом. В этой строке содержится вся информация об одном из персонажей(вещи, моды, рюкзак, упив,...).", str);
		hideSaveLoadDiv();
	}
	else serverLoad(persNr);
}

function serverLoad(persNr)
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
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			serverLoadFinished(xmlhttp);
		}
	}
	xmlhttp.open("POST","dbSave.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	try
	{
		xmlhttp.send("op=read");
	}
	catch (err)
	{
		var message="<br> Произошла ошибка при подключение к серверу сайта.";
		document.getElementById('saveLoadTableDiv').innerHTML=message;
		document.getElementById('saveLoadTableDiv').style.display="inline";
	}
}

function serverLoadFinished(xmlhttp)
{
	if (xmlhttp.responseText==false)
	{
		alert("Error on database write");
		return;
	}
	var rez=decodeURIComponent(xmlhttp.responseText);

	document.getElementById('saveLoadTableDiv').innerHTML=rez;
	document.getElementById('saveLoadTableDiv').style.display="inline";
}

function isLoggedIn()
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
		xmlhttp.send("op=isLoggedIn")
	}
	catch (err)
	{
		alert("ВНИМАНИЕ! Произошла ошибка при подключение к серверу сайта.");
		return false;
	}
	return (xmlhttp.responseText=='1');
}

function showDbSavedString(id)
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
		xmlhttp.send("op=getSha1&id="+id)
		prompt("Строка сохранения:",decodeURIComponent(xmlhttp.responseText.trim()));
	}
	catch (err)
	{
		alert("ВНИМАНИЕ! Произошла ошибка при подключение к серверу сайта.");
		return false;
	}
}

function deleteDbSave(id, showDialog)
{
	if (typeof(showDialog) == 'undefined')
		showDialog=true;

	if (showDialog && !confirm("Вы уверяны что хотите УДАЛИТЬ эту запись?"))
		return;
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
		xmlhttp.send("op=deleteSave&id="+id);
		serverLoad(lastPersNrForDb);
	}
	catch (err)
	{
		alert("ВНИМАНИЕ! Произошла ошибка при подключение к серверу сайта.");
		return false;
	}
	//alert("string delete finished. Response text:"+xmlhttp.responseText);
}

function rewriteDbSave(id)
{
	if (!confirm("Вы уверены что хотите ПЕРЕЗАПИСАТЬ существующую запись?"))
		return;

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
		xmlhttp.send("op=getSaveName&id="+id)
	}
	catch (err)
	{
		alert("ВНИМАНИЕ! Произошла ошибка при подключение к серверу сайта.");
		return false;
	}

	name=decodeURIComponent(xmlhttp.responseText).trim();

	serverSave(lastPersNrForDb,name);
	deleteDbSave(id,false);
}

function loadDbSavedString(id)
{
	if (!confirm("Вы уверены что хотите ЗАГРУЗИТЬ новый комплект?"))
		return;

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
		xmlhttp.send("op=getSaveString&id="+id)
	}
	catch (err)
	{
		alert("ВНИМАНИЕ! Произошла ошибка при подключение к серверу сайта.");
		return false;
	}
	var str=decodeURIComponent(xmlhttp.responseText.trim());
	loadString(lastPersNrForDb,str);
}
