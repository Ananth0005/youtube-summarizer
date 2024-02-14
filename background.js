// Function to fetch captions from YouTube API
function fetchCaptions(videoId, apiKey) {
    const url = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`;
    console.log(videoId)
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch captions');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw new Error('Failed to fetch captions: ' + error.message);
        });
}

// Function to fetch and process captions
function fetchAndProcessCaptions() {
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    console.log(youtubeUrl)
    // Extract video ID from the YouTube URL
    const videoId = extractVideoId(youtubeUrl);

    if (videoId) {
        const apiKey = 'AIzaSyChEyZQKWkrsMPPo01nka1Vdkp6I07IujE'; // Replace with your YouTube Data API key

        fetchCaptions(videoId, apiKey)
            .then(captions => {
                console.log('Captions:', captions);
                // Using bracket notation
                const id = captions['items'][0]['id'];

                console.log('Caption ID:', id);
                const captionsDiv = document.getElementById('captions');
                captionsDiv.textContent = `Captions ID: ${id}`;
                capDownload(id, apiKey)
                // Process the captions as needed
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    } else {
        console.error('Invalid YouTube URL');
    }
}

// Function to extract video ID from YouTube URL
function extractVideoId(url) {
    const videoIdRegex = /[?&]v=([^?&]+)/;
    const match = url.match(videoIdRegex);
    console.log(match)
    return match ? match[1] : null;
}


function capDownload(id, apiKey) {
    const url = `https://youtube.googleapis.com/youtube/v3/captions/${id}?tfmt=srt&tlang=en&key=${apiKey}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch captions');
            }
            console.log(response.json())
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw new Error('Failed to fetch captions: ' + error.message);
        });
}
// Function to convert text to audio
function textToSpeech(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;

    // Uncomment the following lines to specify voice and language
    // speech.voice = speechSynthesis.getVoices().filter(voice => voice.lang === 'en-US')[0];
    // speech.lang = 'en-US';

    speechSynthesis.speak(speech);
}

// Function to handle the button click event
function convertTextToSpeech() {
    const textInput = document.getElementById('textInput').value;
    if (textInput) {
        textToSpeech(textInput);
    } else {
        alert('Please enter some text.');
    }
}

