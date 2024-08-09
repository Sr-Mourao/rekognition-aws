const parser = require("lambda-multipart-parser");
const { compareFacesFiles } = require("../../service/rekognition");
const { getHeaders } = require("../../utils/response");
exports.handler = async (event) => {
  const { files } = await parser.parse(event);

  const sourceFile = files.find((file) => file.fieldname === "source");
  const targetFile = files.find((file) => file.fieldname === "target");

  if (!sourceFile || !targetFile) {
    return {
      statusCode: 400,
      headers: getHeaders(),
      body: JSON.stringify({
        error: "Both source and target images are required.",
      }),
    };
  }

  try {
    const result = await compareFacesFiles(sourceFile, targetFile);
    return {
      statusCode: 200,
      headers: getHeaders(),
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: getHeaders(),
      body: JSON.stringify({ message: "Error processing request" }),
    };
  }
};
