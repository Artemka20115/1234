let div = document.createElement("div");
div.className = "blg";
parameters_table.append(div)
let div1 = document.createElement("div1");
div1.className = "blg1";
parameters_table.append(div1)
let div2 = document.createElement("div2");
div2.className = "blg2";
parameters_table.append(div2)
let div3 = document.createElement("div3");
div3.className = "blg3";
parameters_table.append(div3)
let div4 = document.createElement("div4");
div4.className = "blg4";
parameters_table.append(div4)
let div5 = document.createElement("div5");
div5.className = "blg5";
parameters_table.append(div5)
let div6 = document.createElement("div6");
div6.className = "blg6";
parameters_table.append(div6)
let div7 = document.createElement("div7");
div7.className = "blg7";
parameters_table.append(div7)
let div8 = document.createElement("div8");
div8.className = "blg8";
parameters_table.append(div8)
let div9 = document.createElement("div9");
div9.className = "blg9";
parameters_table.append(div9)
let div10 = document.createElement("div10");
div10.className = "blg10";
parameters_table.append(div10)
let div11 = document.createElement("div11");
div11.className = "blg11";
parameters_table.append(div11)
let div12 = document.createElement("div12");
div12.className = "hp12";
parameters_table.append(div12)
let div13 = document.createElement("div13");
div13.className = "hp13";
parameters_table.append(div13);
let div14 = document.createElement("div14");
div14.className = "ur14";
parameters_table.append(div14);
let div15 = document.createElement("div15");
div15.className = "ur15";
parameters_table.append(div15);
let div16 = document.createElement("div16");
div16.className = "ur16";
parameters_table.append(div16);
let div17 = document.createElement("div17");
div17.className = "ur17";
parameters_table.append(div17);
let div18 = document.createElement("div18");
div18.className = "ur18";
parameters_table.append(div18);
let div19 = document.createElement("div19");
div19.className = "ur19";
parameters_table.append(div19);
let div20 = document.createElement("div20");
div20.className = "ur20";
parameters_table.append(div20);
let div21 = document.createElement("div21");
div21.className = "ur21";
parameters_table.append(div21);
var c = document.querySelector('#sloj1');
c.onclick = function blag5() {
    if (c.checked) {
        element_sloj1 = document.getElementById('parameter_sloj_1');
        let oldStat5 = element_sloj1.innerHTML
        let newStat5 = (oldStat5 * 1.5);
        div5.innerHTML = Math.floor(newStat5);
        element_hp12 = div5;
        let oldStat12 = element_hp12.innerHTML
        let newStat12 = (oldStat12 * 5);
        div12.innerHTML = '(' + newStat12 + ')';
        window.setTimeout(blag5, 1000);
    } else {
        div5.innerHTML = "";
        div12.innerHTML = "";
        window.setTimeout(blag5, 1000);
    }
}
var c1 = document.querySelector('#sloj2');
c1.onclick = function blag11() {
    if (c1.checked) {
        element_sloj2 = document.getElementById('parameter_sloj_2');
        let oldStat11 = element_sloj2.innerHTML
        let newStat11 = (oldStat11 * 1.5);
        div11.innerHTML = Math.floor(newStat11);
        element_hp13 = div11;
        let oldStat13 = element_hp13.innerHTML
        let newStat13 = (oldStat13 * 5);
        div13.innerHTML = '(' + newStat13 + ')';
        window.setTimeout(blag11, 1000);
    } else {
        div13.innerHTML = "";
        div11.innerHTML = "";
        window.setTimeout(blag11, 1000);
    }
}
var c2 = document.querySelector('#sila1');
c2.onclick = function blag() {
    if (c2.checked) {
        element_sila1 = document.getElementById('parameter_sila_1');
        let oldStat = element_sila1.innerHTML
        let newStat = (oldStat * 1.5);
        div.innerHTML = Math.floor(newStat);
        window.raz = Math.floor(newStat - oldStat);
        let msg = uron_udac_left_1.innerHTML;
        let arr = msg.split('-');
        let qwe = arr[0];
        let ewq = arr[1];
        let resultat = parseInt(qwe) + window.raz;
        let resultat1 = parseInt(ewq) + window.raz;
        div14.innerHTML = resultat + "-" + resultat1;
        let msg2 = uron_krit_left_1.innerHTML;
        let arr1 = msg2.split('-');
        let qwe1 = arr1[0];
        let ewq1 = arr1[1];
        let resultat2 = parseInt(qwe1) + window.raz;
        let resultat3 = parseInt(ewq1) + window.raz;
        div15.innerHTML = resultat2 + "-" + resultat3;
        let msg3 = uron_udac_right_1.innerHTML;
        let arr2 = msg3.split('-');
        let qwe3 = arr2[0];
        let ewq3 = arr2[1];
        let resultat4 = parseInt(qwe3) + window.raz;
        let resultat5 = parseInt(ewq3) + window.raz;
        div16.innerHTML = resultat4 + "-" + resultat5;
        let msg4 = uron_krit_right_1.innerHTML;
        let arr3 = msg4.split('-');
        let qwe4 = arr3[0];
        let ewq4 = arr3[1];
        let resultat6 = parseInt(qwe4) + window.raz;
        let resultat7 = parseInt(ewq4) + window.raz;
        div17.innerHTML = resultat6 + "-" + resultat7;
        window.setTimeout(blag, 1000);
    } else {
        div.innerHTML = "";
        div14.innerHTML = "";
        div15.innerHTML = "";
        div16.innerHTML = "";
        div17.innerHTML = "";
        window.setTimeout(blag, 1000);
    }
}
var c3 = document.querySelector('#lovk1');
c3.onclick = function blag1() {
    if (c3.checked) {
        element_lovk1 = document.getElementById('parameter_lovk_1');
        let oldStat1 = element_lovk1.innerHTML
        let newStat1 = (oldStat1 * 1.5);
        div1.innerHTML = Math.floor(newStat1);
        window.setTimeout(blag1, 1);
    } else {
        div1.innerHTML = "";
        window.setTimeout(blag1, 1000);
    }
}
var c4 = document.querySelector('#reak1');
c4.onclick = function blag2() {
    if (c4.checked) {
        element_reak1 = document.getElementById('parameter_reak_1');
        let oldStat2 = element_reak1.innerHTML
        let newStat2 = (oldStat2 * 1.5);
        div2.innerHTML = Math.floor(newStat2);
        window.setTimeout(blag2, 1000);
    } else {
        div2.innerHTML = "";
        window.setTimeout(blag2, 1000);
    }
}
var c5 = document.querySelector('#zlost1');
c5.onclick = function blag3() {
    if (c5.checked) {
        element_zlost1 = document.getElementById('parameter_zlosti_1');
        let oldStat3 = element_zlost1.innerHTML
        let newStat3 = (oldStat3 * 1.5);
        div3.innerHTML = Math.floor(newStat3);
        window.setTimeout(blag3, 1000);
    } else {
        div3.innerHTML = "";
        window.setTimeout(blag3, 1000);
    }
}
var c6 = document.querySelector('#udacha1');
c6.onclick = function blag4() {
    if (c6.checked) {
        element_udaca1 = document.getElementById('parameter_udaca_1');
        let oldStat4 = element_udaca1.innerHTML
        let newStat4 = (oldStat4 * 1.5);
        div4.innerHTML = Math.floor(newStat4);
        window.setTimeout(blag4, 1000);
    } else {
        div4.innerHTML = "";
        window.setTimeout(blag4, 1000);
    }
}

var c7 = document.querySelector('#sila2');
c7.onclick = function blag6() {
    if (c7.checked) {
        element_sila2 = document.getElementById('parameter_sila_2');
        let oldStat6 = element_sila2.innerHTML
        let newStat6 = (oldStat6 * 1.5);
        div6.innerHTML = Math.floor(newStat6);
        window.raz1 = Math.floor(newStat6 - oldStat6);
        let msg5 = uron_udac_left_2.innerHTML;
        let arr4 = msg5.split('-');
        let qwe5 = arr4[0];
        let ewq5 = arr4[1];
        let resultat8 = parseInt(qwe5) + window.raz1;
        let resultat9 = parseInt(ewq5) + window.raz1;
        div18.innerHTML = resultat8 + "-" + resultat9;
        let msg6 = uron_krit_left_2.innerHTML;
        let arr5 = msg6.split('-');
        let qwe6 = arr5[0];
        let ewq6 = arr5[1];
        let resultat22 = parseInt(qwe6) + window.raz1;
        let resultat11 = parseInt(ewq6) + window.raz1;
        div19.innerHTML = resultat22 + "-" + resultat11;
        let msg7 = uron_udac_right_2.innerHTML;
        let arr6 = msg7.split('-');
        let qwe7 = arr6[0];
        let ewq7 = arr6[1];
        let resultat12 = parseInt(qwe7) + window.raz1;
        let resultat13 = parseInt(ewq7) + window.raz1;
        div20.innerHTML = resultat12 + "-" + resultat13;
        let msg8 = uron_krit_right_2.innerHTML;
        let arr7 = msg8.split('-');
        let qwe8 = arr7[0];
        let ewq8 = arr7[1];
        let resultat14 = parseInt(qwe8) + window.raz1;
        let resultat15 = parseInt(ewq8) + window.raz1;
        div21.innerHTML = resultat14 + "-" + resultat15;
        window.setTimeout(blag6, 1000);
    } else {
        div6.innerHTML = "";
        div18.innerHTML = "";
        div19.innerHTML = "";
        div20.innerHTML = "";
        div21.innerHTML = "";
        window.setTimeout(blag6, 1000);
    }
}
var c8 = document.querySelector('#lovk2');
c8.onclick = function blag7() {
    if (c8.checked) {
        element_lovk2 = document.getElementById('parameter_lovk_2');
        let oldStat7 = element_lovk2.innerHTML
        let newStat7 = (oldStat7 * 1.5);
        div7.innerHTML = Math.floor(newStat7);
        window.setTimeout(blag7, 1000);
    } else {
        div7.innerHTML = "";
        window.setTimeout(blag7, 1000);
    }
}
var c9 = document.querySelector('#reak2');
c9.onclick = function blag7() {
    if (c9.checked) {
        element_reak2 = document.getElementById('parameter_reak_2');
        let oldStat8 = element_reak2.innerHTML
        let newStat8 = (oldStat8 * 1.5);
        div8.innerHTML = Math.floor(newStat8);
        window.setTimeout(blag7, 1000);
    } else {
        div8.innerHTML = "";
        window.setTimeout(blag7, 1000);
    }
}
var c10 = document.querySelector('#zlost2');
c10.onclick = function blag9() {
    if (c10.checked) {
        element_zlost2 = document.getElementById('parameter_zlosti_2');
        let oldStat9 = element_zlost2.innerHTML
        let newStat9 = (oldStat9 * 1.5);
        div9.innerHTML = Math.floor(newStat9);
        window.setTimeout(blag9, 1000);
    } else {
        div9.innerHTML = "";
        window.setTimeout(blag9, 1000);
    }
}
var c11 = document.querySelector('#udacha2');
c11.onclick = function blag10() {
    if (c11.checked) {
        element_udaca2 = document.getElementById('parameter_udaca_2');
        let oldStat10 = element_udaca2.innerHTML
        let newStat10 = (oldStat10 * 1.5);
        div10.innerHTML = Math.floor(newStat10);
        window.setTimeout(blag10, 1000);
    } else {
        div10.innerHTML = "";
        window.setTimeout(blag10, 1000);
    }
}


let cofblag = {
    sila1: 1,
    lova1: 1,
    reak1: 1,
    zlost1: 1,
    udacha1: 1,
    sloj1: 1,
    sila2: 1,
    lova2: 1,
    reak2: 1,
    zlost2: 1,
    udacha2: 1,
    sloj2: 1
}
document.querySelectorAll(".button_blago").forEach(function(item) {
    item.addEventListener('click', function(event) {
        if (cofblag[this.dataset.blago] === 1) {
            cofblag[this.dataset.blago] = 1.5
            return
        }

        cofblag[this.dataset.blago] = 1
    })
})