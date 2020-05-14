const ndJsonStrem = require("can-ndjson-stream");
const fetch = require("cross-fetch");

fetch("https://jsonplaceholder.typicode.com/albums/1/photos")
  .then((response) => {
    return ndJsonStrem(response.body);
  })
  .then((exampleStream) => {
    const reader = exampleStream.getReader();
    let read;
    reader.read().then(
      (read = (result) => {
        if (result.done) {
          return;
        }

        console.log(result.value);
        reader.read().then(read);
      })
    );
  });
