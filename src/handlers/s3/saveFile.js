const parser = require("lambda-multipart-parser");
const { saveFile } = require("../../service/s3");
exports.handler = async (event) => {
  try {
    const { files } = await parser.parse(event);
    const filesData = files.map(saveFile);
    const results = await Promise.all(filesData);

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (err) {
    console.error("Error processing request:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error processing request" }),
    };
  }
};
