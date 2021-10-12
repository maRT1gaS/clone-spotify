import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';
import { connect } from 'react-redux';

import InfoContent from './InfoContent/InfoContent';
import SoundControl from './SoundControl/SoundControl';

import { errorSongNotFound } from '../../redux/actions/notificationAction';
import {
  controlSong,
  startSong,
  toggleRepeat,
} from '../../redux/actions/playingSongAction';

import PlayIcon from '../../assets/svg/play.svg';
import RewindIcon from '../../assets/svg/rewind.svg';
import PauseIcon from '../../assets/svg/pause.svg';
import RepeatIcon from '../../assets/svg/repeat.svg';

import styles from './MediaPlayer.module.css';

class MediaPlayer extends React.Component {
  static audio;

  static interval;

  constructor(props) {
    super(props);

    this.progressBarRef = React.createRef();

    this.state = {
      currentTime: '00:00',
      currentWidthBar: '0',
      volState: '0.5',
      clientWidth: 0,
      intervalId: null,
    };
  }

  componentDidMount() {
    const { volume } = this.props;
    this.setState({ volState: volume });
    this.setState({ clientWidth: this.progressBarRef.current.clientWidth });
  }

  componentDidUpdate(prevProps) {
    const { currentSong, isPlaySong, isRepeat, event } = this.props;
    const { intervalId } = this.state;
    if (currentSong?.id !== prevProps.currentSong.id && event === 'click') {
      this.playSong(currentSong);
    }
    if (isPlaySong && !intervalId && currentSong?.id) {
      this.calculateTime();
    }
    if (
      isPlaySong &&
      this.audio !== undefined &&
      isPlaySong !== prevProps.isPlaySong
    ) {
      this.isWorkSong();
    }
    if (
      !isPlaySong &&
      this.audio !== undefined &&
      isPlaySong !== prevProps.isPlaySong
    ) {
      this.audio.pause();
      this.clearTimer(intervalId);
    }
    if (
      this.audio !== undefined &&
      this.audio.currentTime === this.audio.duration
    ) {
      if (!isRepeat) {
        this.nextSong();
        return;
      }
      this.playSong(currentSong);
    }
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    if (intervalId) {
      this.clearTimer(intervalId);
    }

    if (this.audio !== undefined) {
      this.audio.pause();
    }
  }

  clearTimer = (intervalId) => {
    clearInterval(intervalId);
    this.setState({ intervalId: null });
  };

  calculateTime = () => {
    const interval = setInterval(() => {
      this.setState({
        currentTime: moment()
          .minute(0)
          .second(this.audio.currentTime)
          .format('mm:ss'),
      });
      this.setState({
        currentWidthBar: (this.audio.currentTime / this.audio.duration) * 100,
      });
    }, 1000);
    this.setState({ intervalId: interval });
  };

  prevSong = () => {
    const { currentSong, playingPlaylist, playingSong } = this.props;
    if (currentSong?.id) {
      const currentIndex = playingPlaylist.findIndex(
        (song) => song.id === currentSong.id
      );
      if (currentIndex === 0) {
        playingSong(
          playingPlaylist[playingPlaylist.length - 1],
          playingPlaylist,
          'auto'
        );
        this.playSong(playingPlaylist[playingPlaylist.length - 1], 'PREV');
      } else {
        playingSong(playingPlaylist[currentIndex - 1], playingPlaylist, 'auto');
        this.playSong(playingPlaylist[currentIndex - 1], 'PREV');
      }
    }
  };

  nextSong = () => {
    const { currentSong, playingPlaylist, playingSong } = this.props;
    if (currentSong?.id) {
      const currentIndex = playingPlaylist.findIndex(
        (song) => song.id === currentSong.id
      );
      if (currentIndex === playingPlaylist.length - 1) {
        playingSong(playingPlaylist[0], playingPlaylist, 'auto');
        this.playSong(playingPlaylist[0], 'NEXT');
      } else {
        playingSong(playingPlaylist[currentIndex + 1], playingPlaylist, 'auto');
        this.playSong(playingPlaylist[currentIndex + 1], 'NEXT');
      }
    }
  };

  playSong = (song, action) => {
    const { volume } = this.props;

    if (this.audio !== undefined) {
      this.audio.pause();
      this.audio.currentTime = '0';
      this.audio.src = `/api${song.url}`;
      this.audio.volume = volume;
      this.isWorkSong(action);
      return;
    }
    if (this.audio === undefined) {
      this.audio = new Audio();
      this.audio.src = `/api${song.url}`;
      this.audio.volume = volume;
      this.isWorkSong(action);
    }
  };

  isWorkSong = (action = null) => {
    const { changeSongStatus, songNotFound, isPlaySong } = this.props;
    this.audio
      .play()
      .then(() => {
        if (!isPlaySong) {
          changeSongStatus();
        }
      })
      .catch(() => {
        switch (action) {
          case 'NEXT':
            this.nextSong();
            break;
          case 'PREV':
            this.prevSong();
            break;
          default:
            if (isPlaySong) {
              changeSongStatus();
            }
            this.setState({ currentWidthBar: '0' });
        }
        songNotFound();
      });
  };

  setProgress = (e) => {
    const { clientWidth } = this.state;
    if (this.audio !== undefined) {
      const time = (e.nativeEvent.offsetX / clientWidth) * this.audio.duration;
      this.audio.currentTime = time;
    }
  };

  toggleSongStatus = () => {
    const { isPlaySong, changeSongStatus, currentSong } = this.props;
    const { intervalId } = this.state;
    if (this.audio === undefined && currentSong?.id) {
      this.playSong(currentSong);
      return;
    }
    if (this.audio !== undefined && isPlaySong) {
      this.audio.pause();
      changeSongStatus();
      this.clearTimer(intervalId);
    }
    if (this.audio !== undefined && !isPlaySong) {
      this.isWorkSong();
    }
  };

  changeVolume = (vol) => {
    this.setState({ volState: vol });
    if (this.audio !== undefined) {
      this.audio.volume = vol;
    }
  };

  render() {
    const { currentSong, isPlaySong, toggleRepeatSong, isRepeat } = this.props;
    const { currentTime, currentWidthBar, volState } = this.state;
    return (
      <div className={`${styles.playerWrapper} no-copy`}>
        <InfoContent currentSong={currentSong} />
        <div className={styles.controllerPannel}>
          <div className={styles.controllerBtn}>
            <div
              onClick={this.prevSong}
              role='presentation'
              className={cn(styles.rewindPrev, {
                [styles.rewindActive]: currentSong?.id !== undefined,
                [styles.rewindDisabled]: currentSong?.id === undefined,
              })}
            >
              <RewindIcon />
            </div>
            <div
              className={cn(styles.containerIcon, {
                [styles.statusActive]: currentSong?.id !== undefined,
                [styles.statusDisabled]: currentSong?.id === undefined,
              })}
              role='presentation'
              onClick={() => this.toggleSongStatus()}
            >
              <div className={styles.icon}>
                {isPlaySong ? <PauseIcon /> : <PlayIcon />}
              </div>
            </div>
            <div className={styles.controllerRepeat}>
              <div
                onClick={this.nextSong}
                role='presentation'
                className={cn(styles.rewindNext, {
                  [styles.rewindActive]: currentSong?.id !== undefined,
                  [styles.rewindDisabled]: currentSong?.id === undefined,
                })}
              >
                <RewindIcon />
              </div>
              <button type='button' onClick={() => toggleRepeatSong()}>
                <RepeatIcon
                  className={cn(styles.repeatSvg, {
                    [styles.repeatActive]: isRepeat,
                    [styles.repeatDisabled]: !isRepeat,
                  })}
                />
              </button>
            </div>
          </div>
          <div className={styles.progressBarCon}>
            <span className={styles.time}>
              {this.audio ? currentTime : '00:00'}
            </span>
            <div
              ref={this.progressBarRef}
              role='presentation'
              onClick={(event) => this.setProgress(event)}
              className={styles.progressBar}
            >
              <div
                style={{ width: `${currentWidthBar}%` }}
                className={styles.progressBarResult}
              />
            </div>
            <span className={styles.time}>
              {this.audio?.duration
                ? moment().minute(0).second(this.audio.duration).format('mm:ss')
                : '00:00'}
            </span>
          </div>
        </div>
        <SoundControl
          changeVolume={this.changeVolume}
          volState={volState}
          setVolState={() => this.setState()}
        />
      </div>
    );
  }
}

MediaPlayer.propTypes = {
  volume: PropTypes.string.isRequired,
  currentSong: PropTypes.shape().isRequired,
  changeSongStatus: PropTypes.func.isRequired,
  isPlaySong: PropTypes.bool.isRequired,
  playingPlaylist: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  playingSong: PropTypes.func.isRequired,
  songNotFound: PropTypes.func.isRequired,
  isRepeat: PropTypes.bool.isRequired,
  toggleRepeatSong: PropTypes.func.isRequired,
  event: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  volume: state.playingSong.volume,
  isPlaySong: state.playingSong.isPlayingSong,
  playingPlaylist: state.playingSong.playingPlaylist,
  currentSong: state.playingSong.currentSong,
  isRepeat: state.playingSong.isRepeat,
  event: state.playingSong.event,
});

const mapDispatchToProps = (dispatch) => ({
  changeSongStatus: () => dispatch(controlSong()),
  playingSong: (currentSong, playingPlaylist, event) =>
    dispatch(startSong(currentSong, playingPlaylist, event)),
  songNotFound: () => dispatch(errorSongNotFound()),
  toggleRepeatSong: () => dispatch(toggleRepeat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);
