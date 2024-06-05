const APP_ID = 'ef075a2d21484945aa268eaa5050d2ab';
const CHANNEL = 'main'
const TOKEN = '007eJxTYGDz6TttqZD5QTRaV1nkY8CxRbYFwmr/I0xuhWVPOJki56TAkJpmYG6aaJRiZGhiYWJpYpqYaGRmkZqYaGpgapBilJjkapaQ1hDIyBAR7cnCyACBID4LQ25iZh4DAwBGtRuF'
let UID;

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});

let localTracks = [];
let remoteUsers = {};

const joinAndDisplayLocalStream = async () => {
    console.log('Joining channel');
    
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
    alert(UID);
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    let player = `
        <div id="user-container-${UID}" class="video-container">
            <div class="username"><span id="user-name">Username</span></div>
            <div id="user-${UID}" class="video-player"></div>
        </div>`;

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);

    localTracks[1].play(`user-${UID}`);

    await client.publish([localTracks[0], localTracks[1]]);
}

joinAndDisplayLocalStream()