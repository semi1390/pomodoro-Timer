// Uncomment the import statemnets while running the test code and while submitting the solution
// Comment this code while running the solution in the browser
// import React from 'react';


//Write the code for creating App class component
class App extends React.Component{

    /* define the constructor and initialize the following:
       1. define timer states with values 'Running', 'Stopped' and 'Ended'
       2. define timers object with object properties: pomodoro and shortBreak, where each property 
       object should have properties: type, timeout, timerState, timeLeft, timeLeftDisplay and message
       3. set the 'currentTimer' state value to pomodoro that has been defined in 2nd step 
    */

    constructor(props){
        super(props);
        this.loop = undefined;
        
        this.timerstate = { Running: false, Stopped: true, Ended: false};
        this.pomodoro = {
            type: 'Pomodoro',
            timeout: 0, 
            timerState: 'stopped',
            timeLeft: 1500,
            timeLeftDisplay: 1500, 
            message: 'Time to Work'
        }
        this.shortBreak = {
            type: 'shortBreak',
            timeout: 0, 
            timerState: 'stopped',
            timeLeft: 300,
            timeLeftDisplay: 300, 
            message: 'Time for Break!'
        }
        this.state = { currentTimer: {...this.pomodoro} };


        this.startTimer = this.startTimer.bind(this);
        this.endTimer = this.endTimer.bind(this);
        this.navigateToTimer = this.navigateToTimer.bind(this);
        this.navigateToNextTimer = this.navigateToNextTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this)

    }

    // define startTimer() function to start timer and update currentTimer state
    startTimer(){
        const {currentTimer} = this.state
        if(currentTimer.timerState == 'stopped'){

        
        this.loop = setInterval(()=>{
            this.navigateToNextTimer()
            this.setState(prevState =>({
                currentTimer:{
                    ...prevState.currentTimer,
                    timeLeft: prevState.currentTimer.timeLeft - 1,
                    timerState: 'running'
                }
            }))
        }, 1000)
    }  
    
    }
    

    
    // define endTimer() function to end current timer and navigate to next timer
    endTimer(){
        const {currentTimer} = this.state;
        // clearInterval(this.loop);
        this.setState(prevState =>({
            currentTimer:{
                ...prevState.currentTimer,
                timerState: 'Ended',
                timeLeft: 0
            }
        }))
        
        this.navigateToTimer()
    }
    
    // define navigateToTimer() function to update currentTimer state with given timer 
    navigateToTimer(){
        const {currentTimer} = this.state
        if(currentTimer.type == 'Pomodoro'){
            this.setState({currentTimer:{...this.shortBreak}}) 
        }else{
            this.setState({currentTimer:{...this.pomodoro}})
        } 
    }

    
    // define navigateToNextTimer() function to update currentTimer with next timer state
    navigateToNextTimer(){
        const {currentTimer} = this.state;
        if(currentTimer.type === "Pomodoro" && currentTimer.timeLeft === 0){
            this.setState({currentTimer:{...this.shortBreak}})
        } else if(currentTimer.type === "shortBreak" && currentTimer.timeLeft === 0){
            this.setState({currentTimer:{...this.pomodoro}})
        }

    }
    
    // define stopTimer() function to pause the current timer and update the currentTimer state
    stopTimer(){
        clearInterval(this.loop)
        this.setState(prevState =>({
            currentTimer:{
                ...prevState.currentTimer,
                timerState: 'stopped'
            }
        }))
    }
    render(){
        const {currentTimer} = this.state

        const formatTime = (time) =>{
            let minutes = Math.floor(time / 60);
            let seconds = Math.floor(time % 60);
            return(
                (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
            );
        }
       

        return(
            <div className='app'>
                <h3>Pomodoro</h3>
                <div className='body'>
                    <button className={currentTimer.type!=="Pomodoro"? 'tab-btn':"tab-btn blue"}>Pomodoro</button>
                    <button className={currentTimer.type!=="shortBreak"?'tab-btn':'tab-btn blue'}>Short Break</button>
                    <div className='tab'>
                        <div><h1>{formatTime(this.state.currentTimer.timeLeft)}</h1></div>

                        {this.state.currentTimer.timerState == "stopped" 
                            ?
                        <div><button onClick={this.startTimer} className='btn-start'>Start</button></div>
                            :
                        <div>
                            <button className='btn-stop' onClick={this.stopTimer}>STOP</button>
                            <button className='btn-stop' onClick={this.endTimer}>END</button>
                        </div>    
                    }
                        {/* <div><button onClick={this.startTimer} className='btn-start'>Start</button></div> */}
                    </div>
                </div>
                <p>{this.state.currentTimer.message}</p>
            </div>
        )

    }
}


// uncomment the export statement while testing the code and submitting the solution
// comment this code while running the solution in the browser
module.exports={App};


