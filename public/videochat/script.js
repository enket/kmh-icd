'use strict';

let localStream = null;
let peer = null;
let existingCall = null;

navigator.mediaDevices.getUserMedia({video: { width: 320, height: 240 }, audio: true})
    .then(function (stream) {
        // Success
        $('#my-video').get(0).srcObject = stream;
        localStream = stream;
    }).catch(function (error) {
    // Error
    console.error('mediaDevice.getUserMedia() error:', error);
    return;
});
//peer = new Peer('haha');
peer = new Peer({
    key: '052513f8-9504-43e7-8214-f63a60ccda0a',
    debug: 3
});

peer.on('open', function(){
    console.log("open my id");
    $('#my-id').text(peer.id);
});

peer.on('error', function(err){
    alert(err.message);
});

peer.on('close', function(){
    console.log("open close");
});

peer.on('disconnected', function(){
    console.log("open disconnect");
});

$('#make-call').submit(function(e){
    e.preventDefault();
    console.log("open summit");
    const call = peer.call($('#callto-id').val(), localStream);
    setupCallEventHandlers(call);
});

$('#end-call').click(function(){
    console.log("open end call");
    existingCall.close();
});

peer.on('call', function(call){
    call.answer(localStream);
    setupCallEventHandlers(call);
});

function setupCallEventHandlers(call){
    if (existingCall) {
        existingCall.close();
    };

    existingCall = call;

    call.on('stream', function(stream){
        addVideo(call,stream);
        setupEndCallUI();
        $('#their-id').text(call.remoteId);
    });
    call.on('close', function(){
        removeVideo(call.remoteId);
        setupMakeCallUI();
    });
}

function addVideo(call,stream){
    console.log("open addvideo");
    $('#their-video').get(0).srcObject = stream;
}

function removeVideo(peerId){
    console.log("open removevideo");
    $('#'+peerId).remove();
}

function setupMakeCallUI(){
    console.log("open setupMakeCallUI");
    $('#make-call').show();
    $('#end-call').hide();
}

function setupEndCallUI() {
    console.log("open setupEndCallUI");
    $('#make-call').hide();
    $('#end-call').show();
}
