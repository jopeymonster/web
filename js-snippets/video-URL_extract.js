// video event capture

// w/ SearchParams()
function() {
  var videoUrl = {{Video URL}};  // Replace "Video URL" with the name of your auto-captured Video URL parameter
  var urlParams = new URLSearchParams(videoUrl);
  return urlParams.get("v");
}

// noSearchParams()
function() {
  var videoUrl = {{Video URL}}; // Replace "Video URL" with the name of your auto-captured Video URL parameter
  var regex = /[?&]v=([^&]+)/;
  var match = regex.exec(videoUrl);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}
