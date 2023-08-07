import React, { Component } from 'react';
import './style.css'
import styles from './StopWatch.module.css'

interface IStopProps {
  time: Date;
}

interface IStopState {
  time: Date;
  idTimeout: any;
}

// export class StopWatch extends Component<IStopProps, IStopState> {
//   constructor(props: IStopProps) {
//     super(props);
//     this.state = { time: new Date(0, 0, 0, 0, 0, 0), idTimeout: undefined };
//     console.log('constructor');
//   }

//   start = () => {
//     this.tick();
//   };

//   tick = () => {
//     const idTimeout = setTimeout(() => {
//       const { time } = this.state;
//       const newTime = new Date(time.getTime() + 1000);
//       console.log('tick');
//       this.setState({ time: newTime });
//       this.tick();
//     }, 1000);
//     this.setState({ idTimeout });
//   };

//   stop = () => {
//     clearTimeout(this.state.idTimeout);
//     this.setState({ idTimeout: undefined });
//   };

//   reset = () => {
//     this.stop();
//     this.setState({ time: new Date(0, 0, 0, 0, 0, 0) });
//   };

//   componentWillUnmount(): void {
//     console.log('componentWillUnmount');
//     this.stop();
//   }

//   render() {
//     console.log('render');
//     const { time } = this.state;
//     return (
//       <div className={styles.container}>
//         <h2 className='text'>{time.toLocaleTimeString('en-GB')}</h2>
//         <button onClick={this.start}>start</button>
//         <button onClick={this.stop}>stop</button>
//         <button onClick={this.reset}>reset</button>
//       </div>
//     );
//   }
// }


interface IStopProps { }

interface IStopState {
  time: Date;
  idTimeout: any;
  run: boolean;
  laps: Date[];
}

export class StopWatch extends Component<IStopProps, IStopState> {
  constructor(props: IStopProps) {
    super(props);
    this.state = {
      time: new Date(0, 0, 0, 0, 0, 0),
      idTimeout: undefined,
      run: false,
      laps: [],
    };
    console.log('constructor');
  }

  start = () => {
    this.tick();
    this.setState({ run: true });
  };

  tick = () => {
    const idTimeout = setTimeout(() => {
      const { time } = this.state;
      const newTime = new Date(time.getTime() + 10);
      console.log('tick');
      this.setState({ time: newTime });
      this.tick();
    }, 10);
    this.setState({ idTimeout });
  };

  pause = () => {
    clearTimeout(this.state.idTimeout);
    this.setState({ idTimeout: undefined, run: false });
  };

  reset = () => {
    this.pause();
    this.setState({ time: new Date(0, 0, 0, 0, 0, 0), laps: [] });
  };

  lap = () => {
    const { time, laps } = this.state;
    this.setState({ laps: [...laps, time] });//Додав поточний час до масиву кіл через спред
  };

  deleteAll = () => {
    this.setState({ laps: [] });//Очищення масиву кіл
  }

  componentWillUnmount(): void {//Зупинка секундоміра + щастя для пам'яті
    console.log('componentWillUnmount');
    this.pause();
  }

  render() {
    console.log('render');
    const { time, run, laps } = this.state;
    return (
      <>
        <div className={styles.container}>
          <h2 className='interface'>
            <span className='interface-text'>{time.toLocaleTimeString('en-GB')}</span>.<span className='mini-text'>{Math.floor(time.getMilliseconds() / 100)}</span>
          </h2>
          <div className={styles.btnsContainer}>
            {run ? <button className='btn btn-pause' onClick={this.pause}>Пауза</button> : <button className='btn btn-start' onClick={this.start}>Старт</button>}
            <button className='btn btn-reset' onClick={this.reset}>Скинути</button>
            {run ? <button className='btn btn-lap' onClick={this.lap}>Коло</button> : <button disabled className='btn btn-lap-dis' onClick={this.lap}>Коло</button>}
          </div>
        </div >
        <div>
          <button onClick={this.deleteAll} className='btn-delete-all'>Видалити дані
            <ul>
              {laps.map(el => (
                <li >
                  {el.toLocaleTimeString('en-GB')}.{Math.floor(el.getMilliseconds() / 100)}
                </li>
              ))}
            </ul>
          </button>
        </div>
      </>
    );
  }
}

