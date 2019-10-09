/* eslint-disable  no-undef*/


const ws_uri = 'ws://' + window.location.hostname + ':8888/kurento';

function setIceCandidateCallbacks(webRtcEndpoint, webRtcPeer, onError){
  webRtcPeer.on('icecandidate', function(candidate){
    console.log("Local icecandidate " + JSON.stringify(candidate));

    candidate = kurentoClient.register.complexTypes.IceCandidate(candidate);

    webRtcEndpoint.addIceCandidate(candidate, onError);

  });
  webRtcEndpoint.on('OnIceCandidate', function(event){
    var candidate = event.candidate;

    console.log("Remote icecandidate " + JSON.stringify(candidate));

    webRtcPeer.addIceCandidate(candidate, onError);
  });
}


export function startVideo(remoteVideo, url, showSpinner) {
  showSpinner(true);
  function onError(error) {
    if(error)
    {
      console.error(error);
      stop();
    }
  }

  let pipeline;
  let webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly({ remoteVideo},
    function(error){
      if(error){
        return console.error(error);
      }
      webRtcPeer.generateOffer(onOffer);
      webRtcPeer.peerConnection.addEventListener('iceconnectionstatechange', function(event){
        if(webRtcPeer && webRtcPeer.peerConnection){
          console.log("oniceconnectionstatechange -> " + webRtcPeer.peerConnection.iceConnectionState);
          console.log('icegatheringstate -> ' + webRtcPeer.peerConnection.iceGatheringState);
        }
      });
    });

  function onOffer(error, sdpOffer){
    if(error) return onError(error);

    kurentoClient(ws_uri, function(error, kurentoClient) {
      if(error) return onError(error);

      kurentoClient.create("MediaPipeline", function(error, p) {
        if(error) return onError(error);

        pipeline = p;
        pipeline.create("PlayerEndpoint", {uri: url}, function(error, player){
          if(error) return onError(error);

          pipeline.create("WebRtcEndpoint", function(error, webRtcEndpoint){
            if(error) return onError(error);

            setIceCandidateCallbacks(webRtcEndpoint, webRtcPeer, onError);

            webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer){
              if(error) return onError(error);
              webRtcEndpoint.gatherCandidates(onError);
              webRtcPeer.processAnswer(sdpAnswer);
            });

            player.connect(webRtcEndpoint, function(error){
              if(error) return onError(error);
              console.log("PlayerEndpoint-->WebRtcEndpoint connection established");
              player.play(function(error){
                if(error) return onError(error);
                console.log("Player playing ...");
              });
            });
          });
        });
      });
    });
  }


  function stop() {
    if (webRtcPeer) {
      webRtcPeer.dispose();
      webRtcPeer = null;
    }
    if(pipeline){
      pipeline.release();
      pipeline = null;
    }

    console.error('close spinner')
    showSpinner(false)
  }
}
