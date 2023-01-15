class Etalon{constructor(){this.sum3Parameters={value:0,percent:0,name:"Броня+Урон+Шок",commandValue:0,commandPercent:0,calculate:0},this.allParameters={value:0,percent:0,name:"Сумма всех",commandValue:0,commandPercent:0,calculate:0},this.allDamage={value:0,percent:0,name:"Общий урон",commandValue:0,commandPercent:0,calculate:2},this.damagePhisical={value:0,percent:0,name:"Урон (Физич.)",commandValue:0,commandPercent:0,calculate:1},this.damagePoison={value:0,percent:0,name:"Урон (Яд)",commandValue:0,commandPercent:0,calculate:1},this.damageElectricity={value:0,percent:0,name:"Урон (Электр.)",commandValue:0,commandPercent:0,calculate:1},this.damageWater={value:0,percent:0,name:"Урон (Вода)",commandValue:0,commandPercent:0,calculate:1},this.damageFair={value:0,percent:0,name:"Урон (Огонь)",commandValue:0,commandPercent:0,calculate:1},this.damageDead={value:0,percent:0,name:"Урон (Смерть)",commandValue:0,commandPercent:0,calculate:1},this.damageAstral={value:0,percent:0,name:"Урон (Астрал.)",commandValue:0,commandPercent:0,calculate:1},this.initiative={value:0,percent:0,name:"Инициатива",commandValue:0,commandPercent:0,calculate:2},this.accuracy={value:0,percent:0,name:"Точность атаки",commandValue:0,commandPercent:0,calculate:2},this.shock={value:0,percent:0,name:"Шоковая атака",commandValue:0,commandPercent:0,calculate:2},this.antiShock={value:0,percent:0,name:"Устойчивость к шоку",commandValue:0,commandPercent:0,calculate:2},this.generalProtection={value:0,percent:0,name:"Общая защита",commandValue:0,commandPercent:0,calculate:2},this.resistancePhysical={value:0,percent:0,name:"Сопр. (Физич.)",commandValue:0,commandPercent:0,calculate:2},this.poisonResistance={value:0,percent:0,name:"Сопр. (Яд)",commandValue:0,commandPercent:0,calculate:2},this.electricityResistance={value:0,percent:0,name:"Сопр. (Электр.)",commandValue:0,commandPercent:0,calculate:2},this.waterResistance={value:0,percent:0,name:"Сопр. (Вода)",commandValue:0,commandPercent:0,calculate:2},this.fairResistance={value:0,percent:0,name:"Сопр. (Огонь)",commandValue:0,commandPercent:0,calculate:2},this.deadResistance={value:0,percent:0,name:"Сопр. (Смерть)",commandValue:0,commandPercent:0,calculate:2},this.breakdownOfGeneralProtection={value:0,percent:0,name:"Пробой общей защиты",commandValue:0,commandPercent:0,calculate:2},this.breakdownOfPhysicalProtection={value:0,percent:0,name:"Пробой сопр. физ. урону",commandValue:0,commandPercent:0,calculate:2},this.breakdownOfPoisonProtection={value:0,percent:0,name:"Пробой сопр. яду",commandValue:0,commandPercent:0,calculate:2},this.breakdownOfElectricityProtection={value:0,percent:0,name:"Пробой сопр. электричеству",commandValue:0,commandPercent:0,calculate:2},this.breakdownOfWaterProtection={value:0,percent:0,name:"Пробой сопр. воде",commandValue:0,commandPercent:0,calculate:2},this.breakdownOfFairProtection={value:0,percent:0,name:"Пробой сопр. огню",commandValue:0,commandPercent:0,calculate:2},this.breakdownOfDeadProtection={value:0,percent:0,name:"Пробой сопр. смерти",commandValue:0,commandPercent:0,calculate:2},this.hp={value:0,percent:0,name:"Здоровье",commandValue:0,commandPercent:0,calculate:2},this.damage={value:0,percent:0,name:"Урон",commandValue:0,commandPercent:0,calculate:1}}countSomeParameters(){Object.keys(this).forEach((e=>{this[e].value&&this[e].percent&&(this[e].value+=Math.ceil(this[e].value*this[e].percent/100))})),this.allDamage.value=Object.keys(this).filter((e=>1===this[e].calculate)).reduce(((e,a)=>e+this[a].value),0),this.sum3Parameters.value=this.allDamage.value+this.generalProtection.value+this.shock.value,this.allParameters.value=Object.keys(this).filter((e=>2===this[e].calculate)).reduce(((e,a)=>e+(!this[a].value&&this[a].percent?this[a].percent:this[a].value?this[a].value:0)),0)}}const findMaxValues=(e,a)=>{Object.keys(e).forEach((t=>{"object"!=typeof e[t]||e[t]instanceof Array||["value","percent","commandValue","commandPercent"].forEach((c=>{e[t][c]>a[t][c]&&(a[t][c]=e[t][c])}))}))};onmessage=e=>{const a=e.data.object,t=new Etalon,c=e.data.func;let n;"find_all_variants"==c&&(n=e.data.forms,n=n.filter((e=>Number(e.value)>0)));const m=[],l=[[],[],[],[],[],[],[],[],[],[]],r=(e,a)=>{let t=!0;return a.forEach((a=>{let c=Number(a.value);a.command?(c&&!e[`${a.name}`].commandValue&&!e[`${a.name}`].commandPercent||e[`${a.name}`].commandValue&&c>e[`${a.name}`].commandValue||e[`${a.name}`].commandPercent&&c>e[`${a.name}`].commandPercent)&&(t=!1):(c&&!e[`${a.name}`].value&&!e[`${a.name}`].percent||e[`${a.name}`].value&&c>e[`${a.name}`].value||e[`${a.name}`].percent&&c>e[`${a.name}`].percent)&&(t=!1)})),t},u=e=>{const a=new Etalon;a.num=[];let t=0,c=0;return e.forEach(((e,n)=>{2==e.complect&&++t,3==e.complect&&++c,Object.keys(e).forEach((t=>{"object"==typeof e[t]&&t in a?(a[t].value+=e[t].value,a[t].percent+=e[t].percent,a[t].commandValue+=e[t].commandValue,a[t].commandPercent+=e[t].commandPercent):"num"===t&&a.num.push(e.num)}))})),t>=3&&(a.damage.value+=3,a.accuracy.value+=2,a.damage.percent+=3,a.damage.commandPercent+=3),c>=3&&(a.damage.percent+=10,a.generalProtection.value+=10,a.hp.value+=130,a.damage.value+=10,a.hp.commandValue+=30),a.countSomeParameters(),a};switch(a.forEach(((e,a,t)=>{t[a].num=a,l[t[a].type-1].push(a)})),[[{num:0,start:0},{num:1,start:0},{num:2,start:0},{num:3,start:0},{num:5,start:0},{num:6,start:0},{num:7,start:0},{num:8,start:0}],[{num:0,start:0},{num:2,start:0},{num:3,start:0},{num:5,start:0},{num:6,start:0},{num:8,start:0},{num:9,start:0}]].forEach((e=>{for(let o=0;o<l[4].length-1;o++)for(let s=o+1;s<l[4].length;s++){let i=e.length-2;for(;;){switch(m.length=0,m.push(l[4][o]),m.push(l[4][s]),e.forEach((e=>{m.push(l[e.num][e.start])})),c){case"count_max_values":findMaxValues(u(m.slice(0).map((e=>a[e]))),t);break;case"find_all_variants":r(u(m.slice(0).map((e=>a[e]))),n)&&postMessage(u(m.slice(0).map((e=>a[e]))))}let d=!1;for(let a=e.length-1;a>=i;a--){if(-1==i){d=!0;break}if(e[a].start=e[a].start+1,e[a].start<l[e[a].num].length)break;e[a].start=0,a==i&&--i}if(d)break}}})),c){case"count_max_values":postMessage(t);break;case"find_all_variants":postMessage(null)}};