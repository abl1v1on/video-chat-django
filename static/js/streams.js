const APP_ID = 'ef075a2d21484945aa268eaa5050d2ab';
const CHANNEL = 'main'
const TOKEN = '007eJxTYGDz6TttqZD5QTRaV1nkY8CxRbYFwmr/I0xuhWVPOJki56TAkJpmYG6aaJRiZGhiYWJpYpqYaGRmkZqYaGpgapBilJjkapaQ1hDIyBAR7cnCyACBID4LQ25iZh4DAwBGtRuF'
let UID;

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});

let localTracks = [];
let remoteUsers = {};

const joinAndDisplayLocalStream = async () => {
    client.on('user-published', async (user, mediaType) => {
        remoteUsers[user.uid] = user;
        await client.subscribe(user, mediaType);

        if (mediaType === 'video') {
            let player = document.getElementById('user-container-' + user.uid);
            
            if (player != null) {
                player.remove();
            }

            player = `
                <div id="user-container-${user.uid}" class="video-container">
                    <div class="username"><span id="user-name">Username</span></div>
                    <div id="user-${user.uid}" class="video-player"></div>
                </div>`;

            document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);
            user.videoTrack.play(`user-${user.uid}`);
        }

        if (mediaType === 'audio') {
            user.audioTrack.play(`user-${user.uid}`);
        }
    })

    UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
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
