class App
{
	constructor()
	{
		this.url = "/" + CONFIG.APP_NAME + "/app/api.php"
	}
	sendData(e, t)
	{
		let a = void 0 !== t ? new FormData(t) : new FormData;
		for (let t in e) e.hasOwnProperty(t) && a.append(t, e[t]);
		return this.request(a)
	}
	request(e)
	{
		return fetch(this.url,
		{
			method: "POST",
			body: e
		}).then((e => e.json()))
	}
	put(e)
	{
		this.sendData(
		{
			action: "preSave",
			data: this.collectData(e),
			persNr: e
		}).then((e =>
		{
			e && this.appendModal(e, (t =>
			{
				t ? this.sendData(
				{
					action: "save",
					data: e.data,
					user_id: e.user_id,
					datetime: e.datetime,
					sha1: e.sha1
				}).then((e =>
				{
					console.log(e)
				})) : console.log("Сохранение отменено!")
			}))
		}))
	}
	get(e, t)
	{
		e++, (t = void 0 === t ? prompt("Введите строку:", "") : t) ? this.sendData(
		{
			action: "load",
			sha1: t
		}).then((a =>
		{
			if (a)
			{
				let t = JSON.parse(a.replace(/&quot;/g, '"'));
				console.log(t), document.querySelector("#level_pers" + e).value = t.level, document.querySelector("#race_pers" + e).value = t.race;
				for (let e = 0; e < objects.length; e++)
					if (-1 === objects[e].id)
					{
						objects.splice(e);
						break
					}
				let o = objects.length - (t.objects.length ? t.objects[0].index : 0);
				for (let e = 0; e < t.objects.length; e++) objects[objects.length] = t.objects[e].data;
				for (let e = 0; e < t.drink.length; e++)
				{
					let a = t.objects.find((a => a.index === t.drink[e].id));
					void 0 !== a && (t.drink[e].id = a.index + o)
				}
				for (let e = 0; e < t.bag.length; e++)
				{
					let a = t.objects.find((a => a.index === t.bag[e].id));
					void 0 !== a && (t.bag[e].id = a.index + o)
				}
				for (let e = 0; e < t.body.length; e++)
					for (let a = 0; a < t.body[e].objects.length; a++)
					{
						let s = t.objects.find((o => o.index === t.body[e].objects[a].id));
						void 0 !== s && (t.body[e].objects[a].id = s.index + o), -1 !== t.body[e].objects[a].podklId && (t.body[e].objects[a].podklId += o)
					}
				for (let a = 0; a < t.parameters.length; a++)
				{
					let o = document.querySelector("#user_parameter_" + t.parameters[a].short_name + "_" + e);
					null !== o && (o.value = t.parameters[a].value)
				}
				1 === e ? (drinksUsed1 = t.drink, bag1 = t.bag, bodyParts1 = t.body) : (drinksUsed2 = t.drink, bag2 = t.bag, bodyParts2 = t.body), raceChanged(e, !1, !1), reload()
			}
			else console.log("В новой базе не найдена введенная строка."), this.sendData(
			{
				action: "loadOld",
				sha1: t,
				old: !0
			}).then((t =>
			{
				console.log(e), loadString(e - 1, decodeURIComponent(t.trim()))
			}))
		})): console.log("Загрузка отменена.")
	}
	setData(e, t, a)
	{
		if (e = parseInt(e), "new" === t.type)
		{
			t = JSON.parse(t.data.replace(/&quot;/g, '"')), document.querySelector("#level_pers" + e).value = t.level, document.querySelector("#race_pers" + e).value = t.race;
			for (let e = 0; e < objects.length; e++)
				if (-1 === objects[e].id)
				{
					objects.splice(e);
					break
				}
			let a = objects.length - (t.objects.length ? t.objects[0].index : 0);
			for (let e = 0; e < t.objects.length; e++) objects[t.objects[e].index] = t.objects[e].data;
			for (let e = 0; e < objects.length; e++) void 0 === objects[e] && (objects[e] = {
				photo_location: -1
			});
			for (let e = 0; e < t.drink.length; e++)
			{
				let o = t.objects.find((a => a.index === t.drink[e].id));
				void 0 !== o && (t.drink[e].id = o.index + a)
			}
			for (let e = 0; e < t.bag.length; e++)
			{
				let o = t.objects.find((a => a.index === t.bag[e].id));
				void 0 !== o && (t.bag[e].id = o.index + a)
			}
			for (let e = 0; e < t.body.length; e++)
				for (let o = 0; o < t.body[e].objects.length; o++)
				{
					let s = t.objects.find((a => a.index === t.body[e].objects[o].id));
					void 0 !== s && (t.body[e].objects[o].id = s.index + a), -1 !== t.body[e].objects[o].podklId && (t.body[e].objects[o].podklId += a)
				}
			for (let a = 0; a < t.parameters.length; a++)
			{
				let o = document.querySelector("#user_parameter_" + t.parameters[a].short_name + "_" + e);
				null !== o && (o.value = t.parameters[a].value)
			}
			1 === e ? (drinksUsed1 = t.drink, bag1 = t.bag, bodyParts1 = t.body) : (drinksUsed2 = t.drink, bag2 = t.bag, bodyParts2 = t.body), raceChanged(e, !1, !1), reload()
		}
		else "old" === t.type && loadString(e - 1, decodeURIComponent(t.data.trim()));
		"function" == typeof a && a()
	}
	collectData(e)
	{
		e = parseInt(e);
		let t = {
			level: document.getElementById("level_pers" + e).value,
			race: document.getElementById("race_pers" + e).value,
			parameters: [],
			body: 1 === e ? bodyParts1 : bodyParts2,
			objects: [],
			drink: 1 === e ? drinksUsed1 : drinksUsed2,
			bag: 1 === e ? bag1 : bag2
		};
		for (let a = 0; a < parameterTypesZero.length; a++)
		{
			let o = document.getElementById("user_parameter_" + parameterTypesZero[a].short_name + "_" + e);
			if (null !== o)
			{
				let e = o.value.replace(nonDigitRegex, "");
				t.parameters.push(
				{
					short_name: parameterTypesZero[a].short_name,
					value: e
				})
			}
		}
		for (let e = 0; e < objects.length; e++) - 1 !== objects[e].photo_location && -1 === objects[e].id && t.objects.push(
		{
			index: e,
			data: objects[e]
		});
		return console.log(t), JSON.stringify(t)
	}
	removeModal()
	{
		let e = document.body.querySelector('[data-modal="backdrop"]');
		e.style.opacity = 1,
			function t()
			{
				(e.style.opacity -= .1) < 0 ? (e.style.display = "none", document.body.querySelector('[data-modal="backdrop"]').remove(), document.body.setAttribute("oncontextmenu", "return false;"), document.body.style.paddingRight = "", document.body.style.overflow = "") : requestAnimationFrame(t)
			}()
	}
	appendModal(e, t, a)
	{
		let o = document.createElement("div");
		o.dataset.modal = "backdrop", void 0 !== a && void 0 !== a.class && o.classList.add(a.class), o.innerHTML = e, document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + "px", document.body.style.overflow = "hidden", document.body.removeAttribute("oncontextmenu"), setTimeout((() =>
		{
			document.body.appendChild(o), o.style.opacity = 0, o.style.display = "flex",
				function e()
				{
					var t = parseFloat(o.style.opacity);
					(t += .1) > 1 || (o.style.opacity = t, requestAnimationFrame(e))
				}(), "function" == typeof t && t()
		}), 100)
	}
	action(e)
	{
		let t, a;
		switch (e.dataset.app)
		{
			case "modalOfflineSaveUrl":
				this.sendData(
				{
					action: "modalOfflineSaveUrl",
					persNr: e.dataset.persNr,
					data: this.collectData(e.dataset.persNr)
				}).then((t =>
				{
					this.appendModal(t.template, (() =>
					{
						this.sendData(
						{
							action: "offlineSave",
							data: this.collectData(e.dataset.persNr)
						}).then((e =>
						{
							console.log(e), document.querySelector("#input-link").click()
						}))
					}))
				}));
				break;
			case "modalOfflineSaveString":
				this.sendData(
				{
					action: "modalOfflineSaveString",
					persNr: e.dataset.persNr,
					data: this.collectData(e.dataset.persNr)
				}).then((t =>
				{
					this.appendModal(t.template, (() =>
					{
						this.sendData(
						{
							action: "offlineSave",
							data: this.collectData(e.dataset.persNr)
						}).then((e =>
						{
							console.log(e), document.querySelector("#input-string").click()
						}))
					}))
				}));
				break;
			case "modalOfflineLoad":
				this.sendData(
				{
					action: "modalOfflineLoad",
					persNr: e.dataset.persNr
				}).then((e =>
				{
					this.appendModal(e.template, (() =>
					{
						document.querySelector('.modal-content [name="sha1"]').focus()
					}))
				}));
				break;
			case "modalServerSave":
				this.sendData(
				{
					action: "modalServerSave",
					persNr: e.dataset.persNr
				}).then((e =>
				{
					this.appendModal(e.template, null,
					{
						class: "items-start"
					})
				}));
				break;
			case "modalClose":
				this.removeModal();
				break;
			case "serverLoad":
				t = e.closest(".saved-row-actions").dataset, confirm('Вы уверяны что хотите ЗАГРУЗИТЬ комплект "' + t.name + '"?') && (document.querySelector(".modal-container").classList.add("loading"), e.closest(".saved-row-container").querySelector(".saved-row-status-info").innerHTML = "", a = {
					persNr: t.persNr
				}, "" !== t.save_id ? (a.action = "serverLoad", a.save_id = t.save_id) : "" === t.save_id && "" !== t.id && (a.action = "serverLoadOld", a.id = t.id), this.sendData(a).then((t =>
				{
					setTimeout((() =>
					{
						document.querySelector(".modal-container").classList.remove("loading"), t.loaded ? this.setData(t.pers_nr, t.loaded, (() =>
						{
							e.closest(".saved-row-container").querySelector(".saved-row-status-info").innerHTML = '<div class="result-success">Данные успешно загружены!</div>', setTimeout((() =>
							{
								this.removeModal()
							}), 1e3)
						})) : document.querySelector(".modal-content-body .input-container .error").innerHTML = '<div class="result-error">Не верная строка!</div>'
					}), 500)
				})));
				break;
			case "serverResave":
				confirm('Вы уверяны что хотите ПЕРЕЗАПИСАТЬ комплект "' + e.closest(".saved-row-actions").dataset.name + '"?') && (document.querySelector(".modal-container").classList.add("loading"), this.sendData(
				{
					action: "serverSave",
					data: this.collectData(e.closest(".saved-row-actions").dataset.persNr),
					persNr: e.closest(".saved-row-actions").dataset.persNr,
					name: e.closest(".saved-row-actions").dataset.name
				}).then((t =>
				{
					setTimeout((() =>
					{
						document.querySelector(".modal-container").classList.remove("loading"), console.log(t), t && this.sendData(
						{
							action: "modalServerSave",
							persNr: e.closest(".saved-row-actions").dataset.persNr
						}).then((e =>
						{
							document.body.querySelector('[data-modal="backdrop"]').innerHTML = e.template
						}))
					}), 500)
				})));
				break;
			case "serverGetUrl":
				t = e.closest(".saved-row-actions").dataset, document.querySelector(".modal-container").classList.add("loading"), a = {
					persNr: t.persNr
				}, "" !== t.save_id ? (a.action = "serverGetUrl", a.save_id = t.save_id) : "" === t.save_id && "" !== t.id && (a.action = "serverGetUrlOld", a.id = t.id), this.sendData(a).then((e =>
				{
					setTimeout((() =>
					{
						document.querySelector(".modal-container").classList.remove("loading"), prompt("Строка сохранения:", e)
					}), 500)
				}));
				break;
			case "serverRemove":
				t = e.closest(".saved-row-actions").dataset, document.querySelector(".modal-container").classList.add("loading"), e.closest(".saved-row-container").querySelector(".saved-row-status-info").innerHTML = "", a = {
					persNr: t.persNr
				}, "" !== t.save_id ? (a.action = "serverRemove", a.save_id = t.save_id) : "" === t.save_id && "" !== t.id && (a.action = "serverRemoveOld", a.id = t.id), confirm('Вы уверяны что хотите УДАЛИТЬ комплект "' + e.closest(".saved-row-actions").dataset.name + '"?') && this.sendData(a).then((t =>
				{
					setTimeout((() =>
					{
						this.sendData(
						{
							action: "modalServerSave",
							persNr: e.closest(".saved-row-actions").dataset.persNr
						}).then((e =>
						{
							document.body.querySelector('[data-modal="backdrop"]').innerHTML = e.template
						}))
					}), 500)
				}));
				break;
			case "serverSave":
				let r = document.querySelector('.modal-content [name="name"]').value,
					d = !1;
				document.querySelectorAll(".modal-content-body .saved-name:not(.old)").forEach((e =>
				{
					e.textContent === r && (d = !0)
				})), document.querySelector(".modal-content-body .error").innerHTML = "", "" !== document.querySelector('.modal-content [name="name"]').value ? (d && confirm('Вы уверяны что хотите ПЕРЕЗАПИСАТЬ комплект "' + r + '"?') || !d) && (document.querySelector(".modal-container").classList.add("loading"), this.sendData(
				{
					action: "serverSave",
					data: this.collectData(e.dataset.persNr),
					persNr: e.dataset.persNr,
					name: document.querySelector('.modal-content [name="name"]').value
				}).then((t =>
				{
					setTimeout((() =>
					{
						document.querySelector(".modal-container").classList.remove("loading"), console.log(t), t && this.sendData(
						{
							action: "modalServerSave",
							persNr: e.dataset.persNr
						}).then((e =>
						{
							document.body.querySelector('[data-modal="backdrop"]').innerHTML = e.template
						}))
					}), 500)
				}))) : document.querySelector(".modal-content-body .error").innerHTML = '<div class="result-error">Название не может быть пустым!</div>';
				break;
			case "offlineSave":
				document.querySelector(".modal-container").classList.add("loading"), this.sendData(
				{
					action: "offlineSave",
					data: this.collectData(e.dataset.persNr)
				}).then((e =>
				{
					setTimeout((() =>
					{
						document.querySelector(".modal-container").classList.remove("loading"), console.log(e), document.querySelector(".modal-content-body .modal-action-buttons").innerHTML = '<div class="result-success">Сохранение прошло успешно, не забудьте сохранить строку перед закрытием всплывающего окна!</div>'
					}), 500)
				}));
				break;
			case "offlineLoad":
				document.querySelector(".modal-content-body .input-container .error").innerHTML = "", document.querySelector(".modal-container").classList.add("loading"), this.sendData(
				{
					action: "offlineLoad",
					persNr: e.dataset.persNr,
					sha1: document.querySelector('.modal-content [name="sha1"]').value
				}).then((e =>
				{
					setTimeout((() =>
					{
						document.querySelector(".modal-container").classList.remove("loading"), e.loaded ? this.setData(e.pers_nr, e.loaded, (() =>
						{
							document.querySelector(".modal-content-body .modal-action-buttons").innerHTML = '<div class="result-success">Данные успешно загружены!</div>', setTimeout((() =>
							{
								this.removeModal()
							}), 1e3)
						})) : document.querySelector(".modal-content-body .input-container .error").innerHTML = '<div class="result-error">Не верная строка!</div>'
					}), 500)
				}));
				break;
			case "offlineLoadUrl":
				let n, l = [],
					c = String(document.location).split("?");
				if (c[1])
				{
					var o = c[1].split("&");
					for (i = 0; i < o.length; i++)
					{
						var s = o[i].split("=");
						s[0] && s[1] && (l[s[0]] = s[1])
					}
					n = l.id ? l.id : ""
				}
				this.sendData(
				{
					action: "offlineLoad",
					persNr: 1,
					sha1: n
				}).then((e =>
				{
					e.loaded && this.setData(e.pers_nr, e.loaded, (() =>
					{}))
				}))
		}
	}
}
const APP = new App;
document.addEventListener("click", (e =>
{
	null !== e.target.closest("[data-app]") && void 0 !== e.target.closest("[data-app]").dataset.app && APP.action(e.target.closest("[data-app]"))
}));