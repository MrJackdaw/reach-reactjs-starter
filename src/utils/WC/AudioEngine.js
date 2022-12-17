/* eslint-disable */ 
// NOTE: WebAudio will only be allowed on an iOS browser if it's triggered
// AFTER a user interaction (click for example) => The audio context has to be
// created after a user interaction

class AudioEngine {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
  }

  _fillBufferSilence(audioBuffer, sampleN) {
    for (let i = 0; i < sampleN; i++) {
      audioBuffer[i] = 0;
    }
  }

  loopAudio() {
    try {
      const samples = 4;
      const channels = 1;
      this.outputNode = this.context.createGain();
      this.outputNode.connect(this.context.destination);
      this.outputNode.gain.setValueAtTime(channels, this.context.currentTime);

      const buffer = this.context.createBuffer(
        channels,
        samples,
        this.context.sampleRate
      );
      const channelOneBuffer = buffer.getChannelData(0);
      this._fillBufferSilence(channelOneBuffer, samples);

      const audioSource = this.context.createBufferSource();
      audioSource.buffer = buffer;
      audioSource.loop = true;
      audioSource.connect(this.outputNode);
      audioSource.start(0);
    } catch (e) {
      console.error(e);
    }
  }

  stopAudio = () => {
    this.context.close();
  };
}

export default AudioEngine;
