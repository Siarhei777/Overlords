/*******************************************************************************/
/*Creation of a clean object for subsequent filling with calculated indicators.*/
/*******************************************************************************/
export default class Etalon {
    constructor() {
        this.sum3Parameters = {value: 0, percent: 0, name: 'Броня+Урон+Шок', commandValue: 0, commandPercent: 0, calculate: 0};
        this.allParameters = {value: 0, percent: 0, name: 'Сумма всех', commandValue: 0, commandPercent: 0, calculate: 0};
        this.allDamage = {value: 0, percent: 0, name: 'Общий урон', commandValue: 0, commandPercent: 0, calculate: 2};
        this.damagePhisical = {value: 0, percent: 0, name: 'Урон (Физич.)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damagePoison = {value: 0, percent: 0, name: 'Урон (Яд)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damageElectricity = {value: 0, percent: 0, name: 'Урон (Электр.)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damageWater = {value: 0, percent: 0, name: 'Урон (Вода)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damageFair = {value: 0, percent: 0, name: 'Урон (Огонь)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damageDead = {value: 0, percent: 0, name: 'Урон (Смерть)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damageAstral = {value: 0, percent: 0, name: 'Урон (Астрал.)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.initiative = {value: 0, percent: 0, name: 'Инициатива', commandValue: 0, commandPercent: 0, calculate: 2};
        this.accuracy = {value: 0, percent: 0, name: 'Точность атаки', commandValue: 0, commandPercent: 0, calculate: 2};
        this.shock = {value: 0, percent: 0, name: 'Шоковая атака', commandValue: 0, commandPercent: 0, calculate: 2};
        this.antiShock = {value: 0, percent: 0, name: 'Устойчивость к шоку', commandValue: 0, commandPercent: 0, calculate: 2};
        this.generalProtection = {value: 0, percent: 0, name: 'Общая защита', commandValue: 0, commandPercent: 0, calculate: 2};
        this.resistancePhysical = {value: 0, percent: 0, name: 'Сопр. (Физич.)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.poisonResistance = {value: 0, percent: 0, name: 'Сопр. (Яд)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.electricityResistance = {value: 0, percent: 0, name: 'Сопр. (Электр.)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.waterResistance = {value: 0, percent: 0, name: 'Сопр. (Вода)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.fairResistance = {value: 0, percent: 0, name: 'Сопр. (Огонь)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.deadResistance = {value: 0, percent: 0, name: 'Сопр. (Смерть)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfGeneralProtection = {value: 0, percent: 0, name: 'Пробой общей защиты', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfPhysicalProtection = {value: 0, percent: 0, name: 'Пробой сопр. физ. урону', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfPoisonProtection = {value: 0, percent: 0, name: 'Пробой сопр. яду', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfElectricityProtection = {value: 0, percent: 0, name: 'Пробой сопр. электричеству', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfWaterProtection = {value: 0, percent: 0, name: 'Пробой сопр. воде', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfFairProtection = {value: 0, percent: 0, name: 'Пробой сопр. огню', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfDeadProtection = {value: 0, percent: 0, name: 'Пробой сопр. смерти', commandValue: 0, commandPercent: 0, calculate: 2};
        this.hp = {value: 0, percent: 0, name: 'Здоровье', commandValue: 0, commandPercent: 0, calculate: 2};
        this.damage = {value: 0, percent: 0, name: 'Урон', commandValue: 0, commandPercent: 0, calculate: 1};
    }
    countSomeParameters() {
        Object.keys(this).forEach(prop => {
            if (this[prop].value && this[prop].percent) {
                this[prop].value += Math.ceil((this[prop].value * this[prop].percent) / 100);
            }
        });

        this.allDamage.value = Object.keys(this).filter(prop => this[prop].calculate === 1).reduce((res, current) => res + this[current].value, 0);

        this.sum3Parameters.value = this.allDamage.value + this.generalProtection.value + this.shock.value;

        this.allParameters.value = Object.keys(this).filter(prop => this[prop].calculate === 2).reduce((res, current) => res + ((!this[current].value && this[current].percent) ? this[current].percent : (this[current].value) ? this[current].value : 0), 0);

    }
}