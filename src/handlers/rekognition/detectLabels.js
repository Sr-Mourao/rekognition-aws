const parser = require("lambda-multipart-parser");
const { detectLabelsFiles } = require("../../service/rekognition");
const { getHeaders } = require("../../utils/response");
exports.handler = async (event) => {
  try {
    const { files } = await parser.parse(event);
    const filesData = files.map(detectLabelsFiles);
    const results = await Promise.all(filesData);

    return {
      statusCode: 200,
      headers: getHeaders(),
      body: JSON.stringify(results),
    };
  } catch (err) {
    console.error("Error processing request:", err);

    return {
      statusCode: 500,
      headers: getHeaders(),
      body: JSON.stringify({ message: "Error processing request" }),
    };
  }
};
