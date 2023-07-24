(()=>{"use strict";var e={762:()=>{},73:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=i(s(319)),n=s(588);class E extends a.default{otherPickerBeats;constructor(e,t,s,i,a,E){super(e,t,s,i,a,E),this.otherPickerBeats=document.querySelector(n.BASE_BEAT_PICKER_BEATS_SELECTOR),this.picker.addEventListener("wheel",this.handleWheel.bind(this),{passive:!0}),this.picker.addEventListener("click",this.handleClick.bind(this))}handleWheel(){this.aimNumber=this.metronome.againstBeat,this.handleClasses()}handleClick(){this.pickerBeats.classList.contains(n.BEAT_PICKER_FOCUS_CLASS)||this.handleClasses()}handleClasses(){this.pickerBeats.classList.add(n.BEAT_PICKER_FOCUS_CLASS),this.otherPickerBeats.classList.remove(n.BEAT_PICKER_FOCUS_CLASS)}}t.default=E},693:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=i(s(319)),n=s(588);class E extends a.default{otherPickerBeats;constructor(e,t,s,i,a,E){super(e,t,s,i,a,E),this.otherPickerBeats=document.querySelector(n.AGAINST_BEAT_PICKER_BEATS_SELECTOR),this.picker.addEventListener("wheel",this.handleWheel.bind(this),{passive:!0}),this.picker.addEventListener("click",this.handleClick.bind(this))}handleWheel(){this.aimNumber=this.metronome.baseBeat,this.handleClasses()}handleClick(){this.pickerBeats.classList.contains(n.BEAT_PICKER_FOCUS_CLASS)||this.handleClasses()}handleClasses(){this.pickerBeats.classList.add(n.BEAT_PICKER_FOCUS_CLASS),this.otherPickerBeats.classList.remove(n.BEAT_PICKER_FOCUS_CLASS)}}t.default=E},319:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(588);t.default=class{pickerType;beatMin;beatMax;aimNumber;metronome;modal;picker;pickerBeats;constructor(e,t,s,a,n,E){this.pickerType=e,this.beatMin=t,this.beatMax=s,this.aimNumber=a,this.metronome=n,this.modal=E;const o="against"===e?i.AGAINST_BEAT_PICKER_BEATS_SELECTOR:i.BASE_BEAT_PICKER_BEATS_SELECTOR;"against"===e?(this.picker=document.querySelector(i.AGAINST_BEAT_PICKER_SELECTOR),this.pickerBeats=document.querySelector(o)):(this.picker=document.querySelector(i.BASE_BEAT_PICKER_SELECTOR),this.pickerBeats=document.querySelector(o)),this.createElements(),this.centerBeatOnLoad(),this.pickerBeats.addEventListener("scroll",this.handleScroll.bind(this))}createElements(){const e=[...Array.from({length:this.beatMax-this.beatMin+1},((e,t)=>t+this.beatMin))].map((e=>`<span class="${i.BEAT_PICKER_ITEM_CLASS}">${e}</span>`)).join("");this.pickerBeats.innerHTML=e;const t=document.createElement("span");t.classList.add(i.BEAT_PICKER_AIM_CLASS),this.pickerBeats.appendChild(t)}handleScroll(){let e;clearTimeout(e),this.updateBeatBasedOnCenter(),e=setTimeout((()=>{this.modal.isPoly(this.metronome.againstBeat,this.metronome.baseBeat)}),200)}centerBeatOnLoad(){const e=this.picker.parentElement.parentElement;if(!("none"!==window.getComputedStyle(e).display))return requestAnimationFrame((()=>{this.centerBeatOnLoad()})),0;const t=this.pickerBeats.querySelector(`${i.BEAT_PICKER_ITEM_SELECTOR}:nth-of-type(${this.aimNumber-1})`);if(!t)return 0;const s=t.offsetTop-this.pickerBeats.offsetHeight/2+t.offsetHeight/2;return requestAnimationFrame((()=>{this.pickerBeats.scrollTop=s,this.highlightCenterItem(this.pickerBeats)})),s}highlightCenterItem(e){const t=e.getBoundingClientRect(),s=window.pageYOffset+t.top+t.height/2,a=Array.from(e.querySelectorAll(i.BEAT_PICKER_ITEM_SELECTOR)).find((e=>{const t=e.getBoundingClientRect(),i=window.pageYOffset+t.top,a=window.pageYOffset+t.bottom;return i<=s&&a>=s}));return e.querySelectorAll(i.BEAT_PICKER_ITEM_SELECTOR).forEach((e=>e.classList.remove(i.BEATS_PICKER_CENTER_CLASS))),a&&a.classList.add(i.BEATS_PICKER_CENTER_CLASS),a||null}updateBeatBasedOnCenter(){const e=this.highlightCenterItem(this.picker);this.picker===document.querySelector(i.AGAINST_BEAT_PICKER_SELECTOR)?this.metronome.againstBeat=Number(e?.textContent)??0:this.metronome.baseBeat=Number(e?.textContent)??0}}},558:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(588);t.default=class{metronome;el;bpmKnobElement;bpmKnobTrack;bpmKnobBall;bpmKnobRange;bpmKnobText;isDragging;startX;startY;startAngle;constructor(e){this.metronome=e,this.el=document.querySelector(i.BPM_KNOB_CONTAINER_SELECTOR),this.bpmKnobElement=this.el.querySelector(i.BPM_KNOB_SELECTOR),this.bpmKnobTrack=this.el.querySelector(i.BPM_KNOB_INNER_TRACK_SELECTOR),this.bpmKnobBall=this.el.querySelector(i.BPM_KNOB_BALL_SELECTOR),this.bpmKnobRange=this.el.querySelector(i.BPM_KNOB_RANGE_SELECTOR),this.bpmKnobText=this.el.querySelector(i.BPM_KNOB_TEXT_SELECTOR),this.isDragging=!1,this.startX=null,this.startY=null,this.startAngle=null,this.el.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!0}),this.el.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!0}),this.el.addEventListener("touchend",this.handleTouchEnd.bind(this)),this.el.addEventListener("keydown",this.handleKeyDown.bind(this)),this.el.addEventListener("keyup",this.handleKeyUp.bind(this)),this.bpmKnobRange.addEventListener("change",this.handleChange.bind(this)),this.showBpmKnobIfPanelVisible()}showBpmKnobIfPanelVisible(){this.el.parentElement.classList.contains(i.SHOW_CLASS)&&this.updateKnob(),requestAnimationFrame((()=>this.showBpmKnobIfPanelVisible()))}updateKnob(){const e=this.bpmKnobBall.getBoundingClientRect(),t=e.width/2,s=e.height/2,a=this.bpmKnobElement.getBoundingClientRect(),n=a.width/2,E=a.height/2,o=a.width/2,_=(Number(this.metronome.tempo)-i.BPM_MIN)/((i.BPM_MAX-i.BPM_MIN)/100);this.bpmKnobTrack.style.backgroundImage=`conic-gradient(${this.isDragging?i.BPM_KNOB_ACTIVE_COLOR:i.BPM_KNOB_INACTIVE_COLOR} ${_}%, transparent ${_}%)`;const h=(360*_/100-i.BPM_KNOB_CSS_ORIGIN_FIX)*Math.PI/180,r=n+o*Math.cos(h)-t,T=E+o*Math.sin(h)-s;this.bpmKnobBall.style.left=`${r}px`,this.bpmKnobBall.style.top=`${T}px`,this.bpmKnobBall.style.background=this.isDragging?i.BPM_KNOB_ACTIVE_COLOR:i.BPM_KNOB_INACTIVE_COLOR,this.bpmKnobText.innerHTML=`${this.metronome.tempo} <span>BPM</span>`,this.bpmKnobRange.setAttribute("value",String(this.metronome.tempo))}handleChange(e){let t=e.target;this.metronome.tempo=Number(t.value),this.updateKnob()}handleTouchStart(e){this.startX=e.touches[0].clientX,this.startY=e.touches[0].clientY;let t=this.bpmKnobElement.offsetLeft+this.bpmKnobElement.offsetWidth/2-this.startX,s=this.bpmKnobElement.offsetTop+this.bpmKnobElement.offsetHeight/2-this.startY;this.startAngle=Math.atan2(s,t),this.startDrag()}handleTouchMove(e){let t=this.bpmKnobElement.getBoundingClientRect(),s=t.left+t.width/2-e.touches[0].clientX,a=t.top+t.height/2-e.touches[0].clientY,n=Math.atan2(a,s),E=n-this.startAngle,o=E>0?"clockwise":"anticlockwise",_=i.BPM_MAX+1,h=_*E/(2*Math.PI),r=this.metronome.tempo+("clockwise"===o?Math.ceil(h):Math.floor(h));r<i.BPM_MIN?(this.startAngle+=2*Math.PI,r=i.BPM_MIN):r>=_?(this.startAngle=this.startAngle+("clockwise"===o?-2:2)*Math.PI,r=i.BPM_MAX):this.metronome.tempo=r,this.updateKnob(),this.startX=e.touches[0].clientX,this.startY=e.touches[0].clientY,this.startAngle=n}handleTouchEnd(){this.endDrag()}handleKeyDown(){this.startDrag()}handleKeyUp(){this.endDrag()}startDrag(){this.isDragging=!0}endDrag(){this.isDragging=!1,this.updateKnob()}}},338:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=i(s(846)),n=s(588);t.default=class{metronome;engine;view;audioContext;animation;currentNote;againstBeatSquare;baseBeatSquare;canvas;canvasContext;constructor(e,t,s,i){this.metronome=e,this.engine=t,this.view=s,this.audioContext=i,this.canvas=document.querySelector(n.CANVAS_SELECTOR),this.canvasContext=this.canvas.getContext("2d"),this.animation=0,this.currentNote=0,this.resizeCanvas(),window.addEventListener("resize",(()=>this.resizeCanvas()))}reset(){this.canvasContext.reset(),window.cancelAnimationFrame(this.animation)}render(){this.reset(),this.animation=window.requestAnimationFrame((()=>this.render()));for(let e=0;e<this.metronome.againstBeat;e+=1)this.againstBeatSquare=new a.default(this.canvas,this.canvasContext,this.metronome,e,"against",this.view.canvasPicker.selected),this.againstBeatSquare.renderShape();for(let e=0;e<this.metronome.baseBeat;e+=1)this.baseBeatSquare=new a.default(this.canvas,this.canvasContext,this.metronome,e,"base",this.view.canvasPicker.selected),this.baseBeatSquare.renderShape()}playAnimation(){for(this.reset(),this.animation=window.requestAnimationFrame((()=>this.playAnimation()));this.engine.notesInQueue.length&&this.engine.notesInQueue[0].time<this.audioContext.currentTime;)this.currentNote=this.engine.notesInQueue[0].note,this.engine.notesInQueue.splice(0,1);for(let e=0;e<this.metronome.againstBeat;e++)this.againstBeatSquare=new a.default(this.canvas,this.canvasContext,this.metronome,e,"against",this.view.canvasPicker.selected,this.currentNote),this.againstBeatSquare.animateShape();for(let e=0;e<this.metronome.baseBeat;e+=1)this.baseBeatSquare=new a.default(this.canvas,this.canvasContext,this.metronome,e,"base",this.view.canvasPicker.selected,this.currentNote),this.baseBeatSquare.animateShape()}stopAnimation(){window.cancelAnimationFrame(this.animation),this.render()}resizeCanvas(){window.innerWidth>=n.MOBILE_VIEWPORT&&window.innerWidth<n.TABLET_VIEWPORT?(this.canvas.width=n.CANVAS_PIXEL_WIDTH_PHONE,this.canvas.height=n.CANVAS_PIXEL_HEIGHT_PHONE):window.innerWidth>=n.TABLET_VIEWPORT&&window.innerWidth<n.DESKTOP_VIEWPORT?(this.canvas.width=n.CANVAS_PIXEL_WIDTH_TABLET,this.canvas.height=n.CANVAS_PIXEL_HEIGHT_TABLET):(this.canvas.width=n.CANVAS_PIXEL_WIDTH_DESKTOP,this.canvas.height=n.CANVAS_PIXEL_HEIGHT_DESKTOP)}}},808:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(588);t.default=class{el;options;selected;constructor(){this.el=document.querySelector(i.CANVAS_PICKER_SELECTOR),this.options=this.el.querySelectorAll(i.CANVAS_PICKER_BUTTON_SELECTOR),this.selected=i.CANVAS_PICKER_SELECTED_DEFAULT,Array.from(this.options).forEach((e=>{e.addEventListener("click",this.handleOptionClick.bind(this,e))}))}handleOptionClick(e){e.classList.contains(i.CANVAS_PICKER_SELECTED_CLASS)||(this.deselectAllTabs(),e.classList.add(i.CANVAS_PICKER_SELECTED_CLASS),this.selected=e.dataset.canvasPickerButton)}deselectAllTabs(){Array.from(this.options).forEach((e=>{e.classList.remove(i.CANVAS_PICKER_SELECTED_CLASS)}))}}},660:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(588);t.default=class{el;panels;constructor(){this.el=document.querySelector(i.CONTROLLER_PANEL_SELECTOR),this.panels=this.el.querySelectorAll(i.CONTROLLER_PANEL_PANEL_SELECTOR),this.el.addEventListener("click",this.togglePanel.bind(this))}togglePanel(e){const t=e.target.closest(i.CONTROLLER_PANEL_BUTTON_SELECTOR);if(t){const e=this.el.querySelector(i.CONTROLLER_PANEL_ACTIVE_SELECTOR);e&&e.classList.remove(i.CONTROLLER_PANEL_ACTIVE_CLASS),t.classList.add(i.CONTROLLER_PANEL_ACTIVE_CLASS);const s=Array.from(t.parentNode.children).indexOf(t);this.panels.forEach(((e,t)=>{t===s?e.classList.add(i.SHOW_CLASS):e.classList.remove(i.SHOW_CLASS)}))}}}},625:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(588);t.default=class{metronome;audioContext;current16thNote;lookahead;scheduleAheadTime;nextNoteTime;noteLength;notesInQueue;gainNode;constructor(e,t){this.metronome=e,this.audioContext=t,this.current16thNote=0,this.lookahead=25,this.scheduleAheadTime=.1,this.nextNoteTime=0,this.noteLength=.05,this.notesInQueue=[],this.gainNode=this.audioContext.createGain()}nextNote(){const e=i.ONE_MINUTE_IN_SECONDS/this.metronome.tempo;this.nextNoteTime+=i.ENGINE_SMALL_DELAY*e,this.current16thNote+=1,this.current16thNote>=this.metronome.againstBeat*this.metronome.baseBeat&&(this.current16thNote=0)}scheduleNote(e,t){if(this.notesInQueue.push({note:e,time:t}),e%this.metronome.baseBeat!=0&&e%this.metronome.againstBeat!=0)return;const s=this.audioContext.createOscillator();s.connect(this.gainNode).connect(this.audioContext.destination),e%(this.metronome.againstBeat*this.metronome.baseBeat)==0?s.frequency.value=i.ENGINE_FREQUENCIES_BEAT_ONE:e%this.metronome.againstBeat==0?s.frequency.value=i.ENGINE_FREQUENCIES_BASE_BEAT:e%this.metronome.baseBeat==0&&(s.frequency.value=i.ENGINE_FREQUENCIES_AGAINST_BEAT),s.start(t),s.stop(t+this.noteLength)}scheduler(){for(;this.nextNoteTime<this.audioContext.currentTime+this.scheduleAheadTime;)this.scheduleNote(this.current16thNote,this.nextNoteTime),this.nextNote()}}},430:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.default=class{againstBeat;baseBeat;tempo;constructor(e,t,s){this.againstBeat=e,this.baseBeat=t,this.tempo=s}}},860:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(588);t.default=class{modal;modalOverlay;modalButton;constructor(){this.modal=document.querySelector(i.MODAL_SELECTOR),this.modalOverlay=this.modal.querySelector(i.MODAL_OVERLAY_SELECTOR),this.modalButton=this.modal.querySelector(i.MODAL_BUTTON_SELECTOR),this.modalButton.addEventListener("click",this.hideModal.bind(this)),this.handleDocumentClick=this.handleDocumentClick.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this)}isPoly(e,t){let s=Number(e),i=Number(t);Math.max(s,i)%Math.min(s,i)==0?this.showModal():this.hideModal()}showModal(){this.modal.classList.add(i.SHOW_CLASS),document.addEventListener("click",this.handleDocumentClick),document.addEventListener("keydown",this.handleDocumentKeyDown)}hideModal(){this.modal.classList.remove(i.SHOW_CLASS),document.removeEventListener("click",this.handleDocumentClick),document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDocumentClick(e){e.target===this.modalOverlay&&this.hideModal()}handleDocumentKeyDown(e){e.keyCode===i.ESC_KEY_CODE&&this.hideModal()}}},425:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(588);t.default=class{engine;muteButton;isSoundMuted;constructor(e){this.engine=e,this.muteButton=document.querySelector(i.MUTE_BUTTON_SELECTOR),this.isSoundMuted=!0,this.muteButton.disabled=!0,this.muteButton.addEventListener("click",this.toggleSound.bind(this))}toggleSound(){this.isSoundMuted?this.soundOn():this.soundOff()}soundOn(){this.muteButton.innerText=i.MUTE_BUTTON_SOUND_ON_LABEL,this.muteButton.removeAttribute("disabled"),this.unmuteSound()}soundOff(){this.muteButton.innerText=i.MUTE_BUTTON_SOUND_OFF_LABEL,this.muteButton.removeAttribute("disabled"),this.muteSound()}resetSound(){this.muteButton.innerText=i.MUTE_BUTTON_SOUND_RESET_LABEL,this.muteButton.setAttribute("disabled","true"),this.muteSound()}muteSound(){this.isSoundMuted=!0,this.engine.gainNode.gain.value=0}unmuteSound(){this.isSoundMuted=!1,this.engine.gainNode.gain.value=1}}},421:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(844),a=s(588);t.default=class{mute;engine;playButton;iconPlay;iconStop;constructor(e,t){this.mute=e,this.engine=t,this.playButton=document.querySelector(a.PLAY_BUTTON_SELECTOR),this.iconPlay=this.playButton.querySelector(a.PLAY_ICON_PLAY_SELECTOR),this.iconStop=this.playButton.querySelector(a.PLAY_ICON_STOP_SELECTOR),this.playButton.addEventListener("click",this.togglePlay.bind(this))}togglePlay(){i.app.isPlaying=!i.app.isPlaying,i.app.isPlaying?(this.iconPlay.classList.remove(a.SHOW_CLASS),this.iconStop.classList.add(a.SHOW_CLASS),i.app.play(),this.mute.soundOn()):(this.iconPlay.classList.add(a.SHOW_CLASS),this.iconStop.classList.remove(a.SHOW_CLASS),i.app.pause(),this.mute.resetSound())}}},846:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(588);t.default=class{canvas;canvasContext;metronome;size;index;beatType;currentNote;type;constructor(e,t,s,i,a,n,E){this.canvas=e,this.canvasContext=t,this.metronome=s,this.index=i,this.beatType=a,this.type=n,this.currentNote=E}resize(){window.innerWidth>=i.MOBILE_VIEWPORT&&window.innerWidth<i.TABLET_VIEWPORT?this.size=i.SHAPE_SIZE_MOBILE:window.innerWidth>=i.TABLET_VIEWPORT&&window.innerWidth<i.DESKTOP_VIEWPORT?this.size=i.SHAPE_SIZE_TABLET:this.size=i.SHAPE_SIZE_DESKTOP}createShape(){let e,t,s,a,n,E,o,_,h,r,T,c,S,l;switch(this.resize(),"against"===this.beatType?"square"===this.type||"line"===this.type?(e=this.canvas.width/this.metronome.againstBeat-this.size,a=0):"grid"===this.type?(e=10,t=1,_=this.canvas.width/this.metronome.againstBeat*this.index,h=t,T=this.index!==this.metronome.againstBeat-1?this.canvas.width/this.metronome.againstBeat-e:this.canvas.width/this.metronome.againstBeat):(e=this.canvas.width/this.metronome.againstBeat-this.size,S=this.size):"square"===this.type||"line"===this.type?(e=this.canvas.width/this.metronome.baseBeat-this.size,a=this.canvas.height-2*this.size):"grid"===this.type?(e=10,t=1,_=this.canvas.width/this.metronome.baseBeat*this.index,h=this.canvas.height/2+t,T=this.index!==this.metronome.baseBeat-1?this.canvas.width/this.metronome.baseBeat-e:this.canvas.width/this.metronome.baseBeat):(e=this.canvas.width/this.metronome.baseBeat-this.size,S=this.canvas.height-this.size),this.type){case"square":s=(this.size+e)*this.index,E=2*this.size,n=E,o=i.BORDER_RADIUS,this.canvasContext.beginPath(),this.canvasContext.roundRect(s,a,E,n,o),this.canvasContext.fill();break;case"line":s=(this.size+e)*this.index,E=this.size/2,n=2*this.size,o=i.BORDER_RADIUS,this.canvasContext.beginPath(),this.canvasContext.roundRect(s,a,E,n,o),this.canvasContext.fill();break;case"grid":r=this.canvas.height/2.5,o=i.BORDER_RADIUS,this.canvasContext.beginPath(),this.canvasContext.roundRect(_,h,T,r,o),this.canvasContext.strokeStyle=i.SHAPE_GRID_BORDER_COLOR,this.canvasContext.fill(),this.canvasContext.stroke();break;case"dot":c=(this.size+e)*this.index+this.size,l=this.size,this.canvasContext.beginPath(),this.canvasContext.arc(c,S,l,i.SHAPE_DOT_START_ANGLE,i.SHAPE_DOT_END_ANGLE),this.canvasContext.fill()}}renderShape(){this.canvasContext.fillStyle=i.SHAPE_INACTIVE_BEAT_COLOR,this.createShape()}animateShape(){let e;e="against"===this.beatType?this.metronome.baseBeat:this.metronome.againstBeat,this.currentNote%e==0?this.canvasContext.fillStyle=this.currentNote/e===this.index?i.SHAPE_ACTIVE_BEAT_COLOR_CURRENT:i.SHAPE_ACTIVE_BEAT_COLOR_OTHER:this.canvasContext.fillStyle=i.SHAPE_ACTIVE_BEAT_COLOR_OTHER,this.createShape()}}},952:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(588);t.default=class{metronome;againstBeatPicker;baseBeatPicker;switchBeatsChip;constructor(e,t,s){this.metronome=e,this.againstBeatPicker=t,this.baseBeatPicker=s,this.switchBeatsChip=document.querySelector(i.SWITCH_BEATS_CHIP_SELECTOR),this.switchBeatsChip.addEventListener("click",this.handleSwitchBeatsClick.bind(this))}handleSwitchBeatsClick(){[this.metronome.againstBeat,this.metronome.baseBeat]=[this.metronome.baseBeat,this.metronome.againstBeat],this.toggleBeatPickers(),this.updateBeatPickerCenterNumbers(),this.setPickerBeatCenterClass(this.againstBeatPicker.pickerBeats,this.againstBeatPicker.aimNumber),this.setPickerBeatCenterClass(this.baseBeatPicker.pickerBeats,this.baseBeatPicker.aimNumber),this.centerBeatsOnLoad()}toggleBeatPickers(){this.againstBeatPicker.pickerBeats.classList.contains(i.BEAT_PICKER_FOCUS_CLASS)?(this.againstBeatPicker.pickerBeats.classList.remove(i.BEAT_PICKER_FOCUS_CLASS),this.baseBeatPicker.pickerBeats.classList.add(i.BEAT_PICKER_FOCUS_CLASS)):(this.againstBeatPicker.pickerBeats.classList.add(i.BEAT_PICKER_FOCUS_CLASS),this.baseBeatPicker.pickerBeats.classList.remove(i.BEAT_PICKER_FOCUS_CLASS))}updateBeatPickerCenterNumbers(){const e=this.againstBeatPicker.aimNumber,t=this.baseBeatPicker.aimNumber;[this.againstBeatPicker.aimNumber,this.baseBeatPicker.aimNumber]=[t,e]}setPickerBeatCenterClass(e,t){const s=`${i.BEAT_PICKER_ITEM_SELECTOR}:nth-of-type(${t-1})`;e.querySelector(s)?.classList.add(i.BEATS_PICKER_CENTER_CLASS)}centerBeatsOnLoad(){this.againstBeatPicker.centerBeatOnLoad(),this.baseBeatPicker.centerBeatOnLoad()}}},509:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(588);t.default=class{metronome;bpmKnob;tapChip;newTap;lastTap;counterTap;differenceBetweenTaps;avgBPM;previousTap;elapsedTime;constructor(e,t){this.metronome=e,this.bpmKnob=t,this.tapChip=document.querySelector(i.TAP_CHIP_SELECTOR),this.newTap=0,this.lastTap=0,this.counterTap=0,this.differenceBetweenTaps=0,this.avgBPM=0,this.previousTap=0,this.elapsedTime=0,this.tapChip.addEventListener("click",this.updateTempo.bind(this))}updateTempo(){0===this.lastTap&&this.handleFirstTap(),this.handleSubsequentTap(),this.updateMetronomeTempo(),this.updateBpmUi()}handleFirstTap(){this.newTap=(new Date).getTime(),this.counterTap=0}handleSubsequentTap(){this.lastTap=(new Date).getTime(),this.elapsedTime=(new Date).getTime()-this.previousTap,this.previousTap=this.lastTap,this.differenceBetweenTaps=this.lastTap-this.newTap,this.updateAvgBPM(),this.counterTap+=1}updateAvgBPM(){0!==this.differenceBetweenTaps?this.avgBPM=Math.round(i.SIXTY_SECONDS*this.counterTap/this.differenceBetweenTaps):this.avgBPM=i.BPM_MIN}updateMetronomeTempo(){this.metronome.tempo=this.avgBPM}updateBpmUi(){this.bpmKnob.bpmKnobRange.value=this.metronome.tempo.toString(),this.bpmKnob.bpmKnobRange.setAttribute("value",this.metronome.tempo.toString()),this.bpmKnob.updateKnob()}}},97:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=i(s(73)),n=i(s(693)),E=i(s(558)),o=i(s(808)),_=i(s(660)),h=i(s(860)),r=i(s(425)),T=i(s(421)),c=i(s(952)),S=i(s(509)),l=s(588);t.default=class{metronome;engine;againstBeatPicker;baseBeatPicker;bpmKnob;canvasPicker;controllerPanel;modal;muteButton;playButton;switchBeatsChip;tapChip;constructor(e,t){this.metronome=e,this.engine=t,this.canvasPicker=new o.default,this.modal=new h.default,this.againstBeatPicker=new a.default("against",l.BEAT_MIN,l.BEAT_MAX,this.metronome.againstBeat,this.metronome,this.modal),this.baseBeatPicker=new n.default("base",l.BEAT_MIN,l.BEAT_MAX,this.metronome.baseBeat,this.metronome,this.modal),this.switchBeatsChip=new c.default(this.metronome,this.againstBeatPicker,this.baseBeatPicker),this.bpmKnob=new E.default(this.metronome),this.tapChip=new S.default(this.metronome,this.bpmKnob),this.controllerPanel=new _.default,this.muteButton=new r.default(this.engine),this.playButton=new T.default(this.muteButton,this.engine)}}},588:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CANVAS_PICKER_SELECTED_CLASS=t.CANVAS_PICKER_BUTTON_SELECTOR=t.CANVAS_PICKER_SELECTOR=t.CANVAS_PIXEL_HEIGHT_DESKTOP=t.CANVAS_PIXEL_WIDTH_DESKTOP=t.CANVAS_PIXEL_HEIGHT_TABLET=t.CANVAS_PIXEL_WIDTH_TABLET=t.CANVAS_PIXEL_HEIGHT_PHONE=t.CANVAS_PIXEL_WIDTH_PHONE=t.CANVAS_SELECTOR=t.BPM_KNOB_ACTIVE_COLOR=t.BPM_KNOB_INACTIVE_COLOR=t.BPM_KNOB_TEXT_SELECTOR=t.BPM_KNOB_LABEL_SELECTOR=t.BPM_KNOB_RANGE_SELECTOR=t.BPM_KNOB_BALL_SELECTOR=t.BPM_KNOB_INNER_TRACK_SELECTOR=t.BPM_KNOB_SELECTOR=t.BPM_KNOB_CONTAINER_SELECTOR=t.BPM_KNOB_CSS_ORIGIN_FIX=t.BPM_MAX=t.BPM_MIN=t.BEAT_PICKER_AIM_CLASS=t.BEATS_PICKER_CENTER_CLASS=t.BEAT_PICKER_FOCUS_CLASS=t.BEAT_PICKER_ITEM_CLASS=t.BEAT_PICKER_DOTS_SELECTOR=t.BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR=t.AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR=t.BEAT_PICKER_ITEM_SELECTOR=t.BASE_BEAT_PICKER_BEATS_SELECTOR=t.AGAINST_BEAT_PICKER_BEATS_SELECTOR=t.BEAT_PICKER_BEATS_SELECTOR=t.BASE_BEAT_PICKER_SELECTOR=t.AGAINST_BEAT_PICKER_SELECTOR=t.BEAT_PICKERS_CONTAINER_SELECTOR=t.BEAT_MAX=t.BEAT_MIN=t.WORKER_STOP_MESSAGE=t.WORKER_START_MESSAGE=t.DESKTOP_VIEWPORT=t.TABLET_VIEWPORT=t.MOBILE_VIEWPORT=t.ONE_MINUTE_IN_SECONDS=t.SIXTY_SECONDS=t.BORDER_RADIUS=t.SHOW_CLASS=t.ESC_KEY_CODE=t.URL=t.APP_SOUND_DELAY=void 0,t.TAP_CHIP_SELECTOR=t.SWITCH_BEATS_CHIP_SELECTOR=t.SHAPE_DOT_END_ANGLE=t.SHAPE_DOT_START_ANGLE=t.SHAPE_SIZE_DESKTOP=t.SHAPE_SIZE_TABLET=t.SHAPE_SIZE_MOBILE=t.SHAPE_GRID_BORDER_COLOR=t.SHAPE_INACTIVE_BEAT_COLOR=t.SHAPE_ACTIVE_BEAT_COLOR_CURRENT=t.SHAPE_ACTIVE_BEAT_COLOR_OTHER=t.PLAY_ICON_STOP_SELECTOR=t.PLAY_ICON_PLAY_SELECTOR=t.PLAY_BUTTON_SELECTOR=t.MUTE_BUTTON_SOUND_RESET_LABEL=t.MUTE_BUTTON_SOUND_OFF_LABEL=t.MUTE_BUTTON_SOUND_ON_LABEL=t.MUTE_BUTTON_SELECTOR=t.MODAL_BUTTON_SELECTOR=t.MODAL_SECOND_MESSAGE_SELECTOR=t.MODAL_FIRST_MESSAGE_SELECTOR=t.MODAL_MESSAGES_SELECTOR=t.MODAL_SUPPORTING_TEXT_SELECTOR=t.MODAL_TITLE_SELECTOR=t.MODAL_CONTENT_SELECTOR=t.MODAL_OVERLAY_SELECTOR=t.MODAL_SELECTOR=t.ENGINE_FREQUENCIES_AGAINST_BEAT=t.ENGINE_FREQUENCIES_BASE_BEAT=t.ENGINE_FREQUENCIES_BEAT_ONE=t.ENGINE_SMALL_DELAY=t.CONTROLLER_PANEL_ACTIVE_CLASS=t.CONTROLLER_PANEL_ACTIVE_SELECTOR=t.CONTROLLER_PANEL_PANEL_SELECTOR=t.CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR=t.CONTROLLER_PANEL_BUTTON_BPM_SELECTOR=t.CONTROLLER_PANEL_BUTTON_SELECTOR=t.CONTROLLER_PANEL_BUTTONS_SELECTOR=t.CONTROLLER_PANEL_SELECTOR=t.CANVAS_SELECTION_DOT=t.CANVAS_SELECTION_GRID=t.CANVAS_SELECTION_LINE=t.CANVAS_SELECTION_SQUARE=t.CANVAS_PICKER_SELECTED_DEFAULT=void 0,t.APP_SOUND_DELAY=.01,t.URL="http://192.168.0.56:3000/";const s=getComputedStyle(document.documentElement).getPropertyValue("--color-gray-100"),i=getComputedStyle(document.documentElement).getPropertyValue("--color-gray-200"),a=getComputedStyle(document.documentElement).getPropertyValue("--color-black");t.ESC_KEY_CODE=27,t.SHOW_CLASS="-show",t.BORDER_RADIUS=6,t.SIXTY_SECONDS=6e4,t.ONE_MINUTE_IN_SECONDS=60,t.MOBILE_VIEWPORT=0,t.TABLET_VIEWPORT=700,t.DESKTOP_VIEWPORT=1e3,t.WORKER_START_MESSAGE="start",t.WORKER_STOP_MESSAGE="stop",t.BEAT_MIN=2,t.BEAT_MAX=9,t.BEAT_PICKERS_CONTAINER_SELECTOR=".BeatPickers",t.AGAINST_BEAT_PICKER_SELECTOR=".BeatPicker--againstBeat",t.BASE_BEAT_PICKER_SELECTOR=".BeatPicker--baseBeat",t.BEAT_PICKER_BEATS_SELECTOR=".BeatPicker__beats",t.AGAINST_BEAT_PICKER_BEATS_SELECTOR=".BeatPicker--againstBeat > .BeatPicker__beats",t.BASE_BEAT_PICKER_BEATS_SELECTOR=".BeatPicker--baseBeat > .BeatPicker__beats",t.BEAT_PICKER_ITEM_SELECTOR=".BeatPicker__item",t.AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR=`${t.AGAINST_BEAT_PICKER_BEATS_SELECTOR} ${t.BEAT_PICKER_ITEM_SELECTOR}.-center`,t.BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR=`${t.BASE_BEAT_PICKER_BEATS_SELECTOR} ${t.BEAT_PICKER_ITEM_SELECTOR}.-center`,t.BEAT_PICKER_DOTS_SELECTOR=".BeatPicker__dots",t.BEAT_PICKER_ITEM_CLASS="BeatPicker__item",t.BEAT_PICKER_FOCUS_CLASS="-focus",t.BEATS_PICKER_CENTER_CLASS="-center",t.BEAT_PICKER_AIM_CLASS="BeatPicker__aim",t.BPM_MIN=30,t.BPM_MAX=300,t.BPM_KNOB_CSS_ORIGIN_FIX=90,t.BPM_KNOB_CONTAINER_SELECTOR=".BpmKnob-container",t.BPM_KNOB_SELECTOR=".BpmKnob",t.BPM_KNOB_INNER_TRACK_SELECTOR=".BpmKnob__track",t.BPM_KNOB_BALL_SELECTOR=".BpmKnob__ball",t.BPM_KNOB_RANGE_SELECTOR=".BpmKnob__range",t.BPM_KNOB_LABEL_SELECTOR=".BpmKnob__label",t.BPM_KNOB_TEXT_SELECTOR=".BpmKnob__text",t.BPM_KNOB_INACTIVE_COLOR=i,t.BPM_KNOB_ACTIVE_COLOR=a,t.CANVAS_SELECTOR=".Canvas",t.CANVAS_PIXEL_WIDTH_PHONE=350,t.CANVAS_PIXEL_HEIGHT_PHONE=130,t.CANVAS_PIXEL_WIDTH_TABLET=450,t.CANVAS_PIXEL_HEIGHT_TABLET=100,t.CANVAS_PIXEL_WIDTH_DESKTOP=600,t.CANVAS_PIXEL_HEIGHT_DESKTOP=150,t.CANVAS_PICKER_SELECTOR=".CanvasPicker",t.CANVAS_PICKER_BUTTON_SELECTOR=".CanvasPicker__button",t.CANVAS_PICKER_SELECTED_CLASS="-selected",t.CANVAS_PICKER_SELECTED_DEFAULT="square",t.CANVAS_SELECTION_SQUARE='[data-canvas-picker-button="square"]',t.CANVAS_SELECTION_LINE='[data-canvas-picker-button="line"]',t.CANVAS_SELECTION_GRID='[data-canvas-picker-button="grid"]',t.CANVAS_SELECTION_DOT='[data-canvas-picker-button="dot"]',t.CONTROLLER_PANEL_SELECTOR=".ControllerPanel",t.CONTROLLER_PANEL_BUTTONS_SELECTOR=".ControllerPanel__buttons",t.CONTROLLER_PANEL_BUTTON_SELECTOR=".ControllerPanel__button",t.CONTROLLER_PANEL_BUTTON_BPM_SELECTOR=".ControllerPanel__button--bpm",t.CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR=".ControllerPanel__button--beats",t.CONTROLLER_PANEL_PANEL_SELECTOR=".ControllerPanel__panel",t.CONTROLLER_PANEL_ACTIVE_SELECTOR=".-active",t.CONTROLLER_PANEL_ACTIVE_CLASS="-active",t.ENGINE_SMALL_DELAY=.25,t.ENGINE_FREQUENCIES_BEAT_ONE=880,t.ENGINE_FREQUENCIES_BASE_BEAT=440,t.ENGINE_FREQUENCIES_AGAINST_BEAT=220,t.MODAL_SELECTOR=".Modal",t.MODAL_OVERLAY_SELECTOR=".Modal__overlay",t.MODAL_CONTENT_SELECTOR=".Modal__content",t.MODAL_TITLE_SELECTOR=".Modal__title",t.MODAL_SUPPORTING_TEXT_SELECTOR=".Modal__supporting-text",t.MODAL_MESSAGES_SELECTOR=".Modal__supporting-text > p",t.MODAL_FIRST_MESSAGE_SELECTOR=".Modal__supporting-text p:nth-child(1)",t.MODAL_SECOND_MESSAGE_SELECTOR=".Modal__supporting-text p:nth-child(2)",t.MODAL_BUTTON_SELECTOR=".Modal__button",t.MUTE_BUTTON_SELECTOR=".Mute",t.MUTE_BUTTON_SOUND_ON_LABEL="SOUND: ON",t.MUTE_BUTTON_SOUND_OFF_LABEL="SOUND: OFF",t.MUTE_BUTTON_SOUND_RESET_LABEL="SOUND:",t.PLAY_BUTTON_SELECTOR=".Play",t.PLAY_ICON_PLAY_SELECTOR=".Play__icon-play",t.PLAY_ICON_STOP_SELECTOR=".Play__icon-stop",t.SHAPE_ACTIVE_BEAT_COLOR_OTHER=i,t.SHAPE_ACTIVE_BEAT_COLOR_CURRENT=a,t.SHAPE_INACTIVE_BEAT_COLOR=s,t.SHAPE_GRID_BORDER_COLOR=a,t.SHAPE_SIZE_MOBILE=25,t.SHAPE_SIZE_TABLET=20,t.SHAPE_SIZE_DESKTOP=32,t.SHAPE_DOT_START_ANGLE=0,t.SHAPE_DOT_END_ANGLE=2*Math.PI,t.SWITCH_BEATS_CHIP_SELECTOR=".SwitchBeats",t.TAP_CHIP_SELECTOR=".Tap"},844:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.app=void 0;const a=i(s(625)),n=i(s(97)),E=i(s(430)),o=i(s(338)),_=s(588);class h{isPlaying;metronome;engine;view;audioContext;timerWorker;canvas;constructor(){this.isPlaying=!1,this.metronome=new E.default(3,4,120),this.audioContext=new AudioContext,this.engine=new a.default(this.metronome,this.audioContext),this.view=new n.default(this.metronome,this.engine),this.canvas=new o.default(this.metronome,this.engine,this.view,this.audioContext),this.init(),"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("./serviceWorker.js")}))}init(){this.canvas.playAnimation(),this.timerWorker=new Worker("../workers/worker.js"),this.canvas.render(),this.timerWorker.onmessage=e=>"tick"===e.data?this.engine.scheduler():console.log(`message: ${e.data}`),this.timerWorker.postMessage({interval:this.engine.lookahead})}play(){this.isPlaying=!0,this.canvas.playAnimation(),this.isPlaying&&(this.engine.current16thNote=0,this.engine.nextNoteTime=this.audioContext.currentTime,this.engine.nextNoteTime+=_.APP_SOUND_DELAY,this.timerWorker.postMessage(_.WORKER_START_MESSAGE))}pause(){this.isPlaying=!1,this.canvas.stopAnimation(),this.isPlaying||(this.timerWorker.postMessage(_.WORKER_STOP_MESSAGE),this.timerWorker.postMessage({interval:0}))}}t.default=h,t.app=new h}},t={};function s(i){var a=t[i];if(void 0!==a)return a.exports;var n=t[i]={exports:{}};return e[i].call(n.exports,n,n.exports,s),n.exports}s(844);s(762)})();