import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import cn from 'classnames';
import styles from './MediaPlayer.module.css';
import PlayIcon from '../../assets/svg/play.svg';
import RewindIcon from '../../assets/svg/rewind.svg';
import PauseIcon from '../../assets/svg/pause.svg';
import { controlSong, startSong } from '../../redux/actions/playingSongAction';
import InfoContent from './InfoContent/InfoContent';
import SoundControl from './SoundControl/SoundControl';
import { errorSongNotFound } from '../../redux/actions/notificationAction';

class MediaPlayer extends React.Component {
  static audio;

  constructor(props) {
    super(props);

    this.progressBarRef = React.createRef();

    this.state = {
      currentTime: '00:00',
      currentWidthBar: '0',
      volState: '0.5',
      clientWidth: 0,
    };
  }

  componentDidMount() {
    const { volume } = this.props;
    this.setState({ volState: volume });
    this.setState({ clientWidth: this.progressBarRef.current.clientWidth });
  }

  componentDidUpdate(prevProps) {
    const { currentSong, isPlaySong } = this.props;

    if (currentSong?.id && currentSong.id !== prevProps.currentSong.id) {
      this.playSong(currentSong.url);
    }
    if (isPlaySong) {
      setInterval(() => {
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
    }
    if (
      this.audio !== undefined &&
      this.audio.currentTime === this.audio.duration
    ) {
      this.nextSong();
    }
  }

  componentWillUnmount() {
    const { isPlaySong, changeSongStatus } = this.props;
    if (isPlaySong) {
      changeSongStatus();
    }
    if (this.audio !== undefined) {
      this.audio.pause();
    }
  }

  prevSong = () => {
    const { currentSong, playingPlaylist, playingSong } = this.props;
    if (currentSong?.id) {
      const currentIndex = playingPlaylist.findIndex(
        (song) => song.id === currentSong.id
      );
      if (currentIndex === 0) {
        playingSong(
          playingPlaylist[playingPlaylist.length - 1],
          playingPlaylist
        );
      } else {
        playingSong(playingPlaylist[currentIndex - 1], playingPlaylist);
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
        playingSong(playingPlaylist[0], playingPlaylist);
      } else {
        playingSong(playingPlaylist[currentIndex + 1], playingPlaylist);
      }
    }
  };

  playSong = (url) => {
    const { volume } = this.props;

    if (this.audio !== undefined) {
      this.audio.pause();
      this.audio.currentTime = '0';
      this.audio.src = `/api${url}`;
      this.audio.volume = volume;
      this.isWorkSong();
      return;
    }
    if (this.audio === undefined) {
      this.audio = new Audio();
      this.audio.src = `/api${url}`;
      this.audio.volume = volume;
      this.isWorkSong();
    }
  };

  isWorkSong = () => {
    const { changeSongStatus, songNotFound, isPlaySong } = this.props;
    this.audio
      .play()
      .then(() => {
        if (!isPlaySong) {
          changeSongStatus();
        }
      })
      .catch(() => {
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
    if (this.audio === undefined && currentSong?.id) {
      this.playSong(currentSong.url);
      return;
    }
    if (this.audio !== undefined && isPlaySong) {
      this.audio.pause();
      changeSongStatus();
    }
    if (this.audio !== undefined && !isPlaySong) {
      this.audio.play();
      changeSongStatus();
    }
  };

  changeVolume = (vol) => {
    this.setState({ volState: vol });
    if (this.audio !== undefined) {
      this.audio.volume = vol;
    }
  };

  render() {
    const { currentSong, isPlaySong } = this.props;
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
            >
              <div
                className={styles.icon}
                role='presentation'
                onClick={() => this.toggleSongStatus()}
              >
                {isPlaySong ? <PauseIcon /> : <PlayIcon />}
              </div>
            </div>
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
              {currentSong?.duration
                ? moment()
                    .minute(0)
                    .second(currentSong.duration)
                    .format('mm:ss')
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
};

const mapStateToProps = (state) => ({
  volume: state.playingSong.volume,
  isPlaySong: state.playingSong.playSong,
  playingPlaylist: state.playingSong.playingPlaylist,
  currentSong: state.playingSong.currentSong,
});

const mapDispatchToProps = (dispatch) => ({
  changeSongStatus: () => dispatch(controlSong()),
  playingSong: (currentSong, playingPlaylist) =>
    dispatch(startSong(currentSong, playingPlaylist)),
  songNotFound: () => dispatch(errorSongNotFound()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);
