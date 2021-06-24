class View {
    constructor () {
        this.root = null;
        this.timer = null;
        this.gameTable = null;
        this.startButton = null;
        this.topContainer = null;
        this.mainContainer = null;
        this.tableContainer = null;
        this.movesCalculator = null;
    }

    init = () => {
        this.root = document.getElementById('root');
        this.timer = this.createTimer({ className: 'main__container-timer', id: 'container-timer' });
        this.startButton = this.createButton({className: 'main__container-start', id: 'container-start'});
        this.topContainer = this.createDiv({className: 'top-container', id: 'top-container'})
        this.mainContainer = this.createDiv({ className: 'root__main-container', id: 'main-container' });
        let movesDiv = this.createCalculator({className: 'main__container-moves', id: 'container-moves'})
        
        this.timer.style.borderStyle = 'solid';
        this.timer.style.width = '100px';
        movesDiv.style.borderStyle = 'solid';

        this.topContainer.append(movesDiv);
        this.topContainer.append(this.timer);
        this.mainContainer.append(this.topContainer);
        this.mainContainer.append(this.startButton);
        this.root.append(this.mainContainer);

    }

    createNewPositionsForNumber = cb => {
        this.startButton.addEventListener('click', () => {
            this.startButton.style.display = 'none';
            this.resetMoves();
            cb();
        });
    }

    createDiv = props => {
        const div = document.createElement('div');
        props.id && (div.id = props.id);
        props.className && (div.className = props.className);

        return div;
    }

    startTimer = () => {
        let milSec = 0;
        let sec = 0;
        let min = 0;
        let hour = 0;
        this.timerId = setInterval(() => {
            milSec++;
            
            if(milSec == 10) {
            milSec = 0;
            sec++;
            } else if(sec == 60) {
                sec = 0;
                min++;
            } else if(min === 60) {
                min = 0;
                hour++;
            }

            if(milSec <= 9) {
            milSec = "0" + milSec;
            }
            
            this.millisec.innerText = milSec;
            this.second.innerText = sec + ':';
            this.minute.innerText = min + ':';
            this.hour.innerText = hour + ':';
        }, 100);
    }

    onOffTimer = () => {
        this.hour.innerText = '00' + ':';
        this.second.innerText = '00' + ':';
        this.minute.innerText = '00' + ':';
        this.millisec.innerText = '00';
        clearInterval(this.timerId);
        this.startTimer();
    }

    stopTimer = () => {
        clearInterval(this.timerId);
    }

    createTimer = props => {
        this.hour = document.createElement('span')
        this.minute = document.createElement('span');
        this.second = document.createElement('span');
        this.millisec = document.createElement('span');
        const timerDiv = this.createDiv({className: 'main__time-container', id: 'time-container'})

        this.hour.innerText = '00' + ':';
        this.second.innerText = '00' + ':';
        this.minute.innerText = '00' + ':';
        this.millisec.innerText = '00';

        timerDiv.append(this.hour);
        timerDiv.append(this.minute);
        timerDiv.append(this.second);
        timerDiv.append(this.millisec);
                
        props.id && (timerDiv.id = props.id);
        props.className && (timerDiv.className = props.className);


        return timerDiv;
    }

    createButton = props => {
        const start = document.createElement('button');
        
        start.innerText = 'Let`s go!';

        props.id && (start.id = props.id);
        props.className && (start.className = props.className);

        return start;
    }

    createCalculator = props => {
        const movesDiv = this.createDiv({className: 'moves-container', id: 'moves-container'})
        this.movesCalculator = document.createElement('span');

        this.movesCalculator.innerText = '0';
        movesDiv.append(this.movesCalculator);

        props.id && (this.movesCalculator.id = props.id);
        props.className && (this.movesCalculator.className = props.className);

        return movesDiv;
    }

    getMoves = () => {
        let numberOfMoves = this.movesCalculator.innerText;
        
        return numberOfMoves;
    }

    setMoves = value => {
        this.movesCalculator.innerText = value;
    }

    resetMoves = () => {
        this.movesCalculator.innerText = 0;
    }

    createGameboard = () => {
        this.root = document.getElementById('root');
        this.gameTable = this.createTable({ className: 'main__game-table', id: 'game-table' });
        this.tableContainer = this.createDiv({ className: 'root__table-container', id: 'table-container' });

        this.tableContainer.append(this.gameTable);
        this.root.append(this.tableContainer);
    }

    clickGameBoardElement = (cb) => {
        this.gameTable.addEventListener('click', event => {
            if(event.path[0].id === 'table-element') {
                cb(event.target.textContent);
            }
        });
    }

    createDiv = props => {
        const div = document.createElement('div');
        props.id && (div.id = props.id);
        props.className && (div.className = props.className);

        return div;
    }

    createTable = props => {
        const table = document.createElement('table')
        props.className && (table.className = props.className);
        props.id && (table.id = props.id);

        table.style.border = 'solid';
        table.style.height = '250px';
        table.style.width = '250px';

        return table;
    }

    createTd = props => {
        const tableTd = document.createElement('td');
        props.className && (tableTd.id = props.className);
        props.id && (tableTd.id = props.id);
        props.tdText && (tableTd.innerText = props.tdText);
        
        tableTd.style.border = 'solid';
        tableTd.style.height = '50px';
        tableTd.style.width = '50px';
        tableTd.style.bgcolor = 'red';

        return tableTd;
    }

    createTr = props => {
        const tableTr = document.createElement('tr');
        props.className && (tableTr.id = props.className);
        props.id && (tableTr.id = props.id);

        tableTr.style.color = 'white';

        const gameTableElement1 = this.createTd({className: 'table__table-element', id: 'table-element', tdText: props.text[0]});
        const gameTableElement2 = this.createTd({className: 'table__table-element', id: 'table-element', tdText: props.text[1]});
        const gameTableElement3 = this.createTd({className: 'table__table-element', id: 'table-element', tdText: props.text[2]});
        const gameTableElement4 = this.createTd({className: 'table__table-element', id: 'table-element', tdText: props.text[3]});
        
        tableTr.append(gameTableElement1);
        tableTr.append(gameTableElement2);
        tableTr.append(gameTableElement3);
        tableTr.append(gameTableElement4);
        this.gameTable.append(tableTr);
    }

    deleteBoard = () => {
        this.gameTable.innerHTML = '';
    }

    makeStartButtonVisible = () => {
        this.startButton.style.display ='block';
    }
}

export default View;