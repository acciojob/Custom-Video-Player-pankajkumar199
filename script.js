
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.player__button.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}


function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}


function handleRangeUpdate() {
  // name is either "volume" or "playbackRate"
  video[this.name] = this.value;
}

function skip() {
  const skipValue = parseFloat(this.dataset.skip);
  video.currentTime += skipValue;
}


function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}


function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


function handleVideoError() {
  let errorMsg = player.querySelector('.video-error');
  if (!errorMsg) {
    errorMsg = document.createElement('div');
    errorMsg.classList.add('video-error');
    errorMsg.textContent = 'Error: Unable to load video (download.mp4).';
    errorMsg.style.position = 'absolute';
    errorMsg.style.top = '50%';
    errorMsg.style.left = '50%';
    errorMsg.style.transform = 'translate(-50%, -50%)';
    errorMsg.style.color = 'white';
    errorMsg.style.background = 'rgba(0,0,0,0.7)';
    errorMsg.style.padding = '10px 15px';
    errorMsg.style.borderRadius = '4px';
    player.appendChild(errorMsg);
  }
}


video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// when play/pause happens, update button icon
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);


video.addEventListener('timeupdate', handleProgress);


ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


skipButtons.forEach(button => button.addEventListener('click', skip));


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));


video.addEventListener('error', handleVideoError);
