import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import sharp from "sharp"

const accessKeyId = process.env.AWS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const awsRegion = 'us-west-2'
const awsBucket = 'cw-upload-demoz'

const s3Client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  }
})

class UploadsService {

  async uploadImage(imageFile, userId) {
    const filePath = `${userId}/${imageFile.name.slice(0, imageFile.name.indexOf('.'))}.webp`

    const sharpData = sharp(imageFile.data)
    sharpData.resize({ width: 400 })
    // let jpeg = sharpData.jpeg({ quality: 80, chromaSubsampling: '4:4:4' })
    let webp = sharpData.webp({ quality: 40, nearLossless: true })

    const uploadCommand = new PutObjectCommand({
      Bucket: awsBucket,
      Key: filePath,
      Body: await webp.toBuffer(),
      ContentType: 'image/webp',
      CacheControl: 'max-age=36000'
    })
    const s3Response = await s3Client.send(uploadCommand)
    if (s3Response.$metadata.httpStatusCode != 200) {
      console.error(s3Response)
      throw new Error("Problem uploading image to s3")
    }

    const imagePayload = {
      url: `https://${awsBucket}.s3.${awsRegion}.amazonaws.com/${filePath}`
    }
    return imagePayload
  }

}

export const uploadsService = new UploadsService()