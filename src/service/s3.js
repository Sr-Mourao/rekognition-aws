const AWS = require("aws-sdk");
const s3 = new AWS.S3();

async function saveFile(file) {
  const BucketName = process.env.BUCKET_NAME;
  const params = {
    Bucket: BucketName,
    Key: file.filename,
    Body: file.content,
  };
  const savedFile = await s3.putObject(params).promise();

  return savedFile;
}

module.exports = { saveFile };
