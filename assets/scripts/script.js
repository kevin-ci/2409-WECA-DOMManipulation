const hero = {
    name: "John Major",
    image: "https://www.shutterstock.com/editorial/image-editorial/MfT8gb32M7z4g71fNzQ2/john-major-ak47-assault-rifle-1500w-184705d.jpg",
    health: 100,
    attacks: [
        { id: 0, name: "Pistol Whip", damage: 10, quote: "Whoop-ah!", hitChance: 75 },
        {
            id: 1,
            name: "Mag Dump",
            damage: 20,
            quote: "Here's some lead to go with your iron,",
            hitChance: 60,
        },
        { id: 2, name: "Kerb Stomp", damage: 5, quote: "Bite the kerb!", hitChance: 90 },
    ],
    attack(id) {
        let att = this.attacks[id];
        let statusUpdate = `"${att.quote}" said ${this.name} as he unleashed his ${att.name} attack.`;
        let damage = att.damage;
        let hitChanceRand = Math.ceil(Math.random() * 100);
        let success = hitChanceRand < att.hitChance;
        damage = success ? damage : 0;
        return [statusUpdate, damage];
    },
    die() {
        return `"All right, ok, we lost..." croaked John Major, as he breathed his last. Thatcher stood triumphantly over his broken form, cackling.`;
    },
};

const villain = {
    name: "Margaret Thatcher",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhR-YfG4XaHVA4MD5-qnFltCL2MriEPaX3U9syyINItEIOgGH1aH9DRG3jTSPFzjXuliVNhvQkJNumhoyO73ragq2LmBtrScawBe9gkEOR5Bt9UhH40fIcB0_50W5MZI0TIrLuZ-f3lrww/s1600/ThatcherGun.JPG",
    health: 100,
    attacks: [
        {
            name: "Union Buster",
            damage: 10,
            quote: "You picketed the wrong day to mess with me,",
        },
        {
            name: "Miner Strike",
            damage: 20,
            quote: "You're going down... to the unemployment line,",
        },
        { name: "Milk Snatch", damage: 5, quote: "Got Milk?" },
    ],
    attack() {
        let randInt = Math.floor(Math.random() * 3);
        let att = this.attacks[randInt];
        let statusUpdate = `"${att.quote}" said ${this.name} as she unleashed her ${att.name} attack.`;
        let damage = att.damage;
        return [statusUpdate, damage];
    },
    die() {
        return `"GOTCHA," roared John Major, as Thatcher slumped to the floor. You might be able to beat the minors, but you can't beat the Major.`;
    },
};

const heroNameElement = document.getElementById("hero-name");
const heroImageElement = document.getElementById("hero-image");
const heroHealthElement = document.getElementById("hero-health");
const villainNameElement = document.getElementById("villain-name");
const villainImageElement = document.getElementById("villain-image");
const villainHealthElement = document.getElementById("villain-health");
const fightStatusElement = document.getElementById("fight-status");
const attackAreaElement = document.getElementById("attack-area");
const healthButtonElement = document.getElementById("health-button");

let playerTurn = true;
let maxHeals = 3;
let healCount = 0;

heroNameElement.innerText = hero.name;
heroImageElement.src = hero.image;
heroHealthElement.innerText = hero.health;
villainNameElement.innerText = villain.name;
villainImageElement.src = villain.image;
villainHealthElement.innerText = villain.health;

for (let attack of hero.attacks) {
    let attackName = attack.name;
    let attackId = attack.id;
    let htmlString = `<button type="button" class="btn btn-dark attack-btn" data-attack-id="${attackId}">${attackName}</button>`;
    attackAreaElement.innerHTML += htmlString;
}

let buttons = document.getElementsByClassName("attack-btn");
for (let button of buttons) {
    button.addEventListener('click', function() {
        if (playerTurn) {
            let id = this.getAttribute("data-attack-id");
            let attackInfo = hero.attack(id);
            let attackDamage = attackInfo[1];
            fightStatusElement.innerText = attackInfo[0];
            if (attackDamage == 0) {
                fightStatusElement.innerText += " It's not very effective.";
            }
            villain.health -= attackDamage;
            villainHealthElement.innerText = villain.health;
            playerTurn = false;
            checkGameOver();
            setTimeout(handleVillainAttack, 3000);
        }
    })
}

function handleVillainAttack() {
    let attackInfo = villain.attack();
    fightStatusElement.innerText = attackInfo[0];
    hero.health -= attackInfo[1];
    heroHealthElement.innerText = hero.health;
    playerTurn = true;
    checkGameOver();
}

function checkGameOver() {
    if (hero.health <= 0) {
        fightStatusElement.innerText = hero.die();
        playerTurn = false;
    }
    else if (villain.health <= 0) {
        fightStatusElement.innerText = villain.die();
        playerTurn = false;
    }
}

healthButtonElement.addEventListener('click', function() {
    if (healCount <= maxHeals) {
        let randHealth = Math.ceil(Math.random() * 21) + 4;
        hero.health += randHealth;
        if (hero.health > 100) {
            hero.health = 100;
        }
        heroHealthElement.innerText = hero.health;
        healCount++;
        if (healCount == 3) {
            this.style.display = "none";
        }
    } 
});