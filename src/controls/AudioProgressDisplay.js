import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBarDisplay from './common/ProgressBarDisplay';
import AudioStatusBar from './common/AudioStatusBar';
import convertToTime from '../utils/convertToTime';
import getDisplayText from '../utils/getDisplayText';
import createControlRenderProp from '../factories/createControlRenderProp';

const audioStatusBarStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

class AudioProgressDisplay extends Component {
  render () {
    const { playlist, activeTrackIndex, currentTime, duration } = this.props;
    const progress = duration ? currentTime / duration : 0;
    return (
      <div className="rrap__audio_progress_container">
        <ProgressBarDisplay
          className="rrap__audio_progress_bar"
          progressClassName="progress"
          progress={progress}
        />
        <AudioStatusBar
          style={audioStatusBarStyle}
          displayText={getDisplayText(playlist[activeTrackIndex]) || ''}
          displayTime={`${convertToTime(currentTime)} / ${convertToTime(duration)}`}
        />
      </div>
    );
  }
}

AudioProgressDisplay.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      }).isRequired).isRequired
    ]).isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string,
    album: PropTypes.string,
    artwork: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      sizes: PropTypes.string,
      type: PropTypes.string
    })),
    meta: PropTypes.object
  }).isRequired),
  activeTrackIndex: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

export const renderAudioProgressDisplay = createControlRenderProp(
  AudioProgressDisplay,
  ['playlist', 'activeTrackIndex', 'currentTime', 'duration']
);

export default AudioProgressDisplay;