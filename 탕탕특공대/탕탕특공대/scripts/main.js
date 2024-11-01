// ======== 사전 정의 (Pre-definitions) ========//
const canvas = _______ //canvas라는 id를 가진 요소를 불러와봅시댜.
const ctx = _______; // 아까 2d 그림을 그리기 위해선 뭘 해야 한다 했죠?

ctx.canvas.width  = window.innerWidth / 2;
ctx.canvas.height = window.innerHeight - 5;

//이미지 정의
const backgroundImage = generateImage("../images/bg.jpg")
const missileImage = generateImage("../images/player/missle.png")
const moveLeftImage = generateImage("../images/player/walk_left.png")
const moveRightImage = generateImage("../images/player/walk_right.png")
const enemyLeft = generateImage("../images/enemy/dwarf_left.png")
const enemyRight = generateImage("../images/enemy/dwarf_right.png")
const tenAll = generateImage("../images/skills/10all.png")
//============================================//

// 기능 함수들
    //1. 적들이 나올 위치의 랜덤을 구하는 함수
    function generateRandom() {
        let rand = Math.random();
        rand = Math.floor(rand * canvas.width);
        return rand;
    }
    
    //2. 랜덤스킬을 구하는 함수
    function generateRandomSkill() {
        let rand = Math.random();
        rand = Math.floor( rand * newPlayer.availableUpgrades.length);
        return rand;
    }

    //3.랜덤 반동을 구하는 함수
    function randomPushback() {
        let rand = Math.random();
        rand = Math.floor((rand * 10)%3);
        return rand;
    }
    
    function pythagorasDistance(x, y){
        return(Math.sqrt((x * x) + (y * y)))
    }
    
    function findDistance(missleX, missleY, enemyX, enemyY) {
        let y = missleY - enemyY
        let x = missleX - enemyX
        return(pitagorasDistance(x,y))
    }

//4.차이를 구하는 함수
const findDiff = (missleP, enemyP, distance) => (enemyP - missleP) / distance

// ===== 플레이어 관련 =====
// 5.플레이어 객체를 생성하고, 플레이어의 기본 위치를 설정하는곳입니다.
const newPlayer = new Player()
const playerPos = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

// 6.플레이어 관련 변수들을 설정해줍니다.
let isPlayerLeft = false
let playerSpriteDelay = 0
let isPlayerInvincible = false
let isPlayerInvincibleTimer = 0
let isPlayerInvincibleConst = 100

// 7.키 배열 함수 만들고, 상하좌우 움직이기 설정
const keys = []
const moveLeft = () => playerPos.x -= newPlayer.ms
const moveRight = () => playerPos.x += newPlayer.ms
const moveUp = () => playerPos.y -= newPlayer.ms
const moveDown = () => playerPos.y += newPlayer.ms

// 8.키를 눌렀을때 움직이고 플레이어의 이미지 설정
document.addEventListener("keydown", (event)=>{
if (event.key === 'a' && !keys.includes(event.key)) {
    keys.push(/*눌린 키*/)
    isPlayerLeft = true
} else if (event.key === 'd' && !keys.includes(event.key)) {
    keys.push(/*눌린 키*/)
    isPlayerLeft = false
} else if (event.key === 'w' && !keys.includes(event.key)) {
    keys.push(/*눌린 키*/)
} else if (event.key=== 's' && !keys.includes(event.key)) {
    keys.push(/*눌린 키*/)
}
})

// 9. 키를 떼엇을때, 키를 떼었다는걸 배열에 추가하기
document.addEventListener('keyup', (event) => {
keys.splice(keys.indexOf(event.key), 1)
});

// ===== 적 관련 =====
// 10. 적 관련 변수 설정
const enemies = []
let enemyDelay = 0
let enemySpriteDelay = 0

// ===== 스킬 관련 =====
// 11. 스킬 기본적 변수 선언
const missles = []
let missleDelay = 0
let tenAllDelay = false
let tenAllCounter = 0
let kills = 0
let killsForLevelUp = 2 * newPlayer.level
let isChoosingUpgrade = false

// 12. 스킬중 하나인 지속 데미지 주는 스킬을 setInterval을 이용해 지속적으로 주도록 설정
setInterval(()=>{
enemies.map((enemy, i) => {
    enemy.health -= newPlayer.tenAllNumber * 5
    if ( _______ /*적의 체력이 0보다 작거나 같으면*/) {
        _______ //킬을 1 올린다
        enemies.splice(i,1)
    }
})

if (newPlayer.tenAllNumber > 0) {
    tenAllDelay = true
}
}, 5000)

// 13. 이미 선택한 스킬을 다시 뜨지 않도록 없애주는 함수
function resetGenerated() {
    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName("upgradeSelect")[0].removeChild(document.getElementsByClassName("upgradeSelect")[0].lastChild)
    }
    isChoosingUpgrade = false
    newPlayer.skillpoints -= 1
}

// ===== 게임 상태 =====
// 14. 게임 루프 돌리기
let isPlaying = true
window.requestAnimationFrame(gameLoop)

function gameLoop() {
//  15. 캔버스 재설정 및 기본 그림들 그리기
ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
drawLevelBar()
drawHealthBar(playerPos.x, playerPos.y - 10, 50, 8 ,newPlayer.health, newPlayer.maxHealth)

// 16. tenall스킬의 스킬 이펙트 
if (newPlayer.tenAllNumber > 0 && tenAllDelay) {
    ctx.drawImage(tenAll, -300, -300, canvas.width * 2, canvas.height * 2)
    tenAllCounter += 1
    if (tenAllCounter === 100) {
        tenAllCounter = 0
            tenAllDelay = false
    }
}

// 17. 시간바 그리기
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.font = "50px Galmuri7";
if (seconds < 10) {
    ctx.fillText(`${minutes}:0${seconds}`, canvas.width /2 , 50);
} else  {
    ctx.fillText(`${minutes}:${seconds}`, canvas.width /2 , 50);
}

// 플레이어 로직 (Player Logic)
// 18. 벽에 닿았을때, 벽을 못 넘어가게 설정하기
if (playerPos.x > canvas.width - 50) {
    playerPos.x = canvas.width - 50
} else if (playerPos.x < 0) {
    playerPos.x = 0
} else if (playerPos.y > canvas.height - 50) {
    playerPos.y = canvas.height - 50
} else if (playerPos.y < 0) {
    playerPos.y = 0
}

// 19. 플레이어가 왼쪽 오른쪽인지에 따라 이미지 방향 설정
if (isPlayerLeft) {
    ctx.drawImage(moveLeftImage, playerPos.x, playerPos.y, 50, 60)
} else {
    ctx.drawImage(moveRightImage, playerPos.x, playerPos.y, 50, 60)
}

// 20. 위에서 설정했던 변수로, forEach라는 keys 배열을 돌며, 상하좌우 움직이게 하기
keys.forEach((key) => {
    //만약 a일시 좌로, w일시 위로 움직이게 코드를 설정해봅시다.
});

// 21. 미사일 로직 (Missile Logic)
if (missleDelay === 0) {
    if (enemies.length > 0) {
        let closestEnemyDistance = 1000000
        let enemyX = null
        let enemyY = null
        enemies.map((enemy) => {
            let distance = findDistance(playerPos.x, playerPos.y, enemy.x + 15, enemy.y + 15)
            if (distance < closestEnemyDistance) {
                closestEnemyDistance = distance
                enemyX = enemy.x + 15
                enemyY = enemy.y + 15
            }
        })

        let xDiff = findDiff(playerPos.x, enemyX, closestEnemyDistance)
        let yDiff = findDiff(playerPos.y, enemyY, closestEnemyDistance)

        missles.push({x:playerPos.x, y:playerPos.y, xDiff: xDiff, yDiff: yDiff})
    }
}

missles.map((missle, i) => {
    missle.x += missle.xDiff * 10
    missle.y += missle.yDiff * 10
    ctx.drawImage(missileImage, missle.x, missle.y, 35, 35);
    if (missle.x > canvas.width || missle.x < 0 || missle.y > canvas.height || missle.y < 0) {
        missles.splice(i, 1)
    }
})

// 22. 충돌 감지 (Collision Detection)
missles.map((missle, missleI) => {
    enemies.map((enemy, enemyI) => {
        if (findDistance(missle.x, missle.y, enemy.x + 15, enemy.y + 15) < 25) {
            if (!newPlayer.gameplayUpgrades.includes("piercingShots")) {
                missles.splice(missleI,1)
            }
            enemy.health -= newPlayer.attack
            if (enemy.health <= 0) {
                kills += 1
                enemies.splice(enemyI,1)
            }
        }
    })
})



// 23 .적 로직 (Enemy Logic)
enemies.map((enemy) => {
    let distance = findDistance(enemy.x, enemy.y, playerPos.x + 25, playerPos.y + 25)
    let xEnemyDiff = findDiff(enemy.x , playerPos.x + 15, distance)
    let yEnemyDiff = findDiff(enemy.y, playerPos.y + 25, distance)
    enemy.x += xEnemyDiff * 2
    enemy.y += yEnemyDiff * 2

    if (findDistance(playerPos.x + 25, playerPos.y + 25, enemy.x, enemy.y) < 25) {
        playerPos.x += _______ //randomPushback으로 반동을 구한뒤 1 더해봅시다.
        playerPos.y += _______ //randomPushback으로 반동을 구한뒤 1 더해봅시다.
        if (!isPlayerInvincible) {
            //플레이어를 체력을 1 없애봅시다..
            isPlayerInvincible = true
        }
    }

    if (newPlayer.health === 0) {
        isPlaying = false
        document.getElementsByClassName("gameCanvas")[0].style.display = "none"
        document.getElementsByClassName("gameInfo")[0].style.display = "none"
        document.getElementsByClassName("endScreenDefeat")[0].style.display = "flex"
    }

    enemies.map((enemy) => {
        drawHealthBar(enemy.x, enemy.y - 10,50, 5, enemy.health, enemy.maxHealth)
        if (enemy.x > playerPos.x + 25) {
            ctx.drawImage(enemyLeft, enemy.x, enemy.y, 50, 50)
        } else (
            ctx.drawImage(enemyRight, enemy.x, enemy.y, 50, 50)
        )
    })
})

// 24. 타이머 및 딜레이 업데이트 (Timer and Delay Updates)
missleDelay += 1
if (missleDelay > newPlayer.fireRate) {
    missleDelay = 0
}

if (enemyDelay === 0 && enemies.length < 70) {
    if (minutes === 2) {
        enemies.push(new Enemy(generateRandom(), generateRandom(),_______))
    } else if (minutes === 1) {
        enemies.push(new Enemy(generateRandom(), generateRandom(), _______))
    }else  if (minutes === 0) {
        enemies.push(new Enemy(generateRandom(), generateRandom(), _______))
    }
}
//빈 주석에 숫자를 채워넣어 시간이 지날수록 적의 체력이 점점 늘어나게 해봅시다!

enemyDelay += 1
if (enemyDelay > minutes * 25 + 15) {
    enemyDelay = 0
}

playerSpriteDelay += 1
if (playerSpriteDelay === 41) {
    playerSpriteDelay = 0
}

enemies.map((enemy)=>{
    enemy.spriteDelay += 1
    if (enemy.spriteDelay === 11) {
        enemy.spriteDelay = 0
    }
})

if (isPlayerInvincible) {
    isPlayerInvincibleTimer += 1
    if (isPlayerInvincibleTimer === isPlayerInvincibleConst) {
        isPlayerInvincibleTimer = 0
        isPlayerInvincible = false
    }
}

// 25. 레벨업 및 스킬 시스템 (Level Up and Skill System)
if (kills >= killsForLevelUp) {
    kills = 0
    newPlayer.level += 1
    killsForLevelUp = 2 * newPlayer.level
    newPlayer.skillpoints += 1
}

if (newPlayer.skillpoints > 0 && isChoosingUpgrade === false) {
    isChoosingUpgrade = true
    for (let i = 0; i < 3; i++) {
        const generatedSkill = generateRandomSkill()
        const skillName = newPlayer.availableUpgrades[generatedSkill].name
        const skillFunc = newPlayer.availableUpgrades[generatedSkill].function
        const icon = newPlayer.availableUpgrades[generatedSkill].icon
        const skill = document.createElement("h1")
        skill.style.textAlign = 'center'
        skill.style.padding = '5%'
        skill.style.margin = "5px"
        skill.style.border = '5px solid white'

        const span = document.createElement("span")
        span.style.backgroundImage = `url(${icon})`
        span.style.backgroundSize = 'cover'
        span.style.width = '50px'
        span.style.height = '50px'
        span.style.display = 'inline-block'
        skill.appendChild(span)
        skill.appendChild(document.createTextNode(skillName))

        skill.onclick = skillFunc
        document.getElementsByClassName("upgradeSelect")[0].appendChild(skill)
    }
}


// 26. 게임 종료 조건 (Game End Conditions)
if (_______ === 0 && _______ === 0 ) { // 타이머가 0분 0초일 때
    _______ = false /*게임 상태를 종료로 설정하려면 어떤 변수를 써야할까요?*/
    document.getElementsByClassName("gameCanvas")[0].style.display = "none"
    document.getElementsByClassName("gameInfo")[0].style.display = "none"
    document.getElementsByClassName("endScreenVictory")[0].style.display = "flex"
}

if (_______ /*게임 상태를 계속 진행 하려면 어떤 변수를 써야할까요?*/) {
    window.requestAnimationFrame(gameLoop) // 게임 루프 호출
}
}
