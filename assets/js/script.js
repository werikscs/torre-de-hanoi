const gameBoard = document.querySelector('.gameBoard');
let numberOfDisks = 3;
let isDiskSelected = false;
let topDisk = null;
let numberOfMoves = 0;

setDifficulty();
startGame();
resetGame();
gameLoop();

function startGame(){
	const btnStart = document.getElementById('btnStart');
	btnStart.addEventListener('click',()=>{
		createTowers();
		fillsTower();
		hideElementsAtStartGame();
	});
}

function resetGame(){
	const btnReset = document.getElementById('resetGame');
	btnReset.addEventListener('click',()=>{
		isDiskSelected = false;
		topDisk = null;
		numberOfMoves = 0;
		score = 0;

		changeNumberOfMoves(numberOfMoves);
		cleanTowers();
		fillsTower();
		gameLoop();
	});
}

function gameLoop(){
	gameBoard.addEventListener('click',selectDisk);
}

function selectDisk(event){
	const tower = event.target.querySelector('.diskContainer');
	
	if(isDiskSelected){
		moveDisk(tower,topDisk);
		topDisk.classList.remove('diskSelected')
		topDisk = null;
		isDiskSelected = false;
	} else {
		if(!isTowerEmpty(tower)){
			topDisk = tower.lastElementChild;
			topDisk.classList.add('diskSelected')
			isDiskSelected = true;
		}
	}
}

function isTowerEmpty(tower){
	return tower.children.length === 0;
}

function moveDisk(destinyTower,originDisk){
	const destinyDisk = destinyTower.lastElementChild;
	if(isTowerEmpty(destinyTower) || isOriginDiskSmallerThanDestinyDisk(originDisk,destinyDisk)){
		destinyTower.appendChild(originDisk)
		changeNumberOfMoves(++numberOfMoves);
		checkVictory();
	}
}

function isOriginDiskSmallerThanDestinyDisk(originDisk,destinyDisk){
	return originDisk.clientWidth < destinyDisk.clientWidth;
}

function checkVictory(){
	const endTower = document.getElementById('endContainer').querySelector('.diskContainer');
	const endTowerNumberOfDisks = endTower.children.length;

	if(endTowerNumberOfDisks === numberOfDisks){
		showVictoryMessage();
	}
}

function changeNumberOfMoves(numberOfMoves){
	const numberOfMovesText = document.getElementById('numbersOfMoves');
	numberOfMovesText.textContent = `n° movimentos: ${numberOfMoves}`;
}

function setDifficulty(){
	let selectedDificulty = 0;
	const selectElement = document.getElementById('dificulties');

	selectElement.addEventListener('change', () => {
		selectedDificulty = selectElement.selectedIndex
		changeNumberOfDisks(selectedDificulty);
	})
}

function changeNumberOfDisks(selectedDificulty){
	switch(selectedDificulty){
		case 0:
		numberOfDisks = 3;
		break;

		case 1:
		numberOfDisks = 4;
		break;

		case 2:
		numberOfDisks = 5;
		break;
	}
}

function createTowers(){
	for(let i=0; i<3; i++){
		const tower = document.createElement('section');
		const diskContainer = document.createElement('div');
		const rod = document.createElement('div');
		const rodLabel = document.createElement('div');
		const textRodLabel = document.createElement('span');

		tower.classList.add('containerTower');
		diskContainer.classList.add('diskContainer');
		rod.classList.add('rod');
		rodLabel.classList.add('rodLabel');

		if(i===0){
			tower.setAttribute('id','startContainer');
			textRodLabel.textContent = 'Começo';
		} 

		if(i==1){
			tower.setAttribute('id','midSetContainer');
			textRodLabel.textContent = 'Meio';
		}

		if(i==2){
			tower.setAttribute('id','endContainer');
			textRodLabel.textContent = 'Objetivo';
		}
		rodLabel.appendChild(textRodLabel);
		tower.appendChild(diskContainer);
		tower.appendChild(rod);
		tower.appendChild(rodLabel);
		gameBoard.appendChild(tower);
	}
}

function fillsTower(){
	const towerStart = gameBoard.querySelector('.diskContainer');
	for(let i=numberOfDisks; i>0; i--){
		const disk = document.createElement('div');
		disk.classList.add(`disk`);
		disk.classList.add(`disk${i}`);
		towerStart.appendChild(disk);
	}
}

function cleanTowers(){
	const towers = document.querySelectorAll('.diskContainer');
	towers.forEach(tower => tower.replaceChildren());
}

function hideElementsAtStartGame(){
	const startGameContainer = document.querySelector('.startGame');
	const resetGameContainer = document.querySelector('.resetGame');
	const msgIntroductionContainer = document.querySelector('.msgIntroductionContainer')

	startGameContainer.classList.add('disabled');
	msgIntroductionContainer.classList.add('disabled');
	resetGameContainer.classList.remove('disabled');
	gameBoard.classList.remove('disabled');
}

function showVictoryMessage(){
	const msgWinnerContainer = document.querySelector('.msgWinnerContainer');
	const btnCloseAlertCompleted = document.getElementById('btnCloseAlertCompleted');

	msgWinnerContainer.classList.remove('disabled');
	btnCloseAlertCompleted.addEventListener('click', ()=> {
		msgWinnerContainer.classList.add('disabled');
	});
}