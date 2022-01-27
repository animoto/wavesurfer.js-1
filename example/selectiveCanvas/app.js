'use strict';

// Create an instance
var wavesurfer;

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    const SelectionPlugin = WaveSurfer.selection;
    // Init
    wavesurfer = WaveSurfer.create({
        barGap        : 1,
        barHeight     : 0.8,
        barMinHeight  : 2,
        barWidth      : 1,
        height        : '72',
        container: document.querySelector('#waveform'),
        cursorColor   : '#ff47d7',
        cursorWidth   : 2,
        progressColor : '#ffb2be80',
        responsive    : false,
        waveColor     : '#afb2be',
        scrollParent  : false,
        hideScrollbar : false,
        fillParent    : false,
        plugins       : [WaveSurfer.selection.create({
            selection : [
                {
                    start : 0,
                    end   : 5,
                    color : 'rgba(155, 169, 223, 0.3',
                    minLength : 0.2
                }
            ],
            displayDuration : 20,
            displayStart : 0
        })],
        renderer      : SelectionPlugin.SelectiveCanvas
    });


    wavesurfer.on('ready', () => {
        window.ws = wavesurfer;
        window.peakCache = wavesurfer.backend.mergedPeaks;
    });

    wavesurfer.on('error', function(e) {
        console.warn(e);
    });

    // Load audio from URL
    wavesurfer.load('../media/count.wav');


    document.querySelector(
        '[data-action="play"]'
    ).addEventListener('click', function() {
        let region = wavesurfer.selection.region;
        region.play();
    });

    document.querySelector(
        '[data-action="pause"]'
    ).addEventListener('click', function() {
        wavesurfer.pause();
    });
});
