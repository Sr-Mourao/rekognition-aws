const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();

async function detectLabelsFiles(file) {
  const labels = await rekognition
    .detectLabels({
      Image: {
        Bytes: file.content,
      },
    })
    .promise();

  return { labels };
}

async function compareFacesFiles(sourceFile, targetFile) {
  try {
    const comparison = await rekognition
      .compareFaces({
        SourceImage: { Bytes: sourceFile.content },
        TargetImage: { Bytes: targetFile.content },
        SimilarityThreshold: 70,
      })
      .promise();

    return comparison;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { detectLabelsFiles, compareFacesFiles };
