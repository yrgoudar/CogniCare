const AWS = require("aws-sdk");
const uuid = require("uuid").v4;

const {
  COLLECTION_ID,
  FACES_TABLENAME,
  MIN_CONFIDENCE,
  OBJECTS_OF_INTEREST_LABELS,
  REGION,
} = process.env;

const rekognition = new AWS.Rekognition({ region: REGION });
const dynamo = new AWS.DynamoDB({ region: REGION });
const docClient = new AWS.DynamoDB.DocumentClient({ region: REGION });


const respond = (statusCode, response) => ({
  statusCode,
  body: JSON.stringify(response),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const fetchCount = async (sessionId, displayImageTag) => {
  console.log("entering fetch count --------3");
  const filterExpression = `sessionId = :session_id AND displayImageTag = :image_tag`;

  const expressionAttributeValues = {
  ':sessionId': {S:sessionId}
  };

  // emotions.forEach((emotion, i) => {
  // expressionAttributeValues[`:emotion${i}`] = emotion;
  // });

  const params = {
  TableName: FACES_TABLENAME,
  FilterExpression: 'sessionId = :sessionId',
  //KeyConditionExpression: 'sessionId = :sessionId',
  ExpressionAttributeValues: expressionAttributeValues,
  };
  console.log("scanning dynamo db table and entering if statement")
  const findSessionId = (val) => 
    dynamo.scan(val, (err, data) => {
    if (err) {
    console.error('Error scanning table:', err);
    } else {
      console.log("Done with scan");
   // const count = data.Count; 
    //console.log("DATA -----"+ JSON.stringify(data));
    //console.log(`Number of happy and sad emotions for dog images in session ${sessionID}: ${count}`);
    }
    if(data.Count==0){
      console.log("No data");
    }else{
      console.log("Data found")
    }
  }).promise();

  // const persistMetadata = () =>
  //     dynamo
  //       .putItem({
  //         Item: {
  //           sessionID: { S: sessionId },
  //           date: { S: formattedDate },
  //           displayImageTag: {S: displayImageTag},
  //           emotion: { S: emotionRecorded },
  //           count : {S: count}
          
  //         },
  //         TableName: summarizedResults,
  //     })
  //       .promise();

  try {
      console.log("Saving to summary Dynamo DB ")
      await findSessionId(params);
  }   catch(e){

    console.error("Error fetching db ",e)
  }
  console.log("DONE Wth FUNC-------");
}

exports.indexHandler = async (event) => {
  console.log("---calling index/faces");
  //const ExternalImageId = uuid();
  const body = JSON.parse(event.body);
  //console.log("external image id "+ ExternalImageId);
  console.log("body " + JSON.stringify(body));
  console.log("Collection id " + COLLECTION_ID)
  const params = {
    TableName: FACES_TABLENAME,
    FilterExpression: 'sessionId= :sessionId AND displayImageTag = :displayImageTag',
    ExpressionAttributeValues: {
      ':sessionId': '11112',
      ':displayImageTag': 'dog', 
    },
  };

  try {
    const data = await docClient.scan(params).promise();
    console.log("Done with scan test----");
    const emotionCountMap = new Map();
    data.Items.forEach(item => {
      const emotion = item.emotionRecorded;
      if(emotionCountMap.has(emotion)){
        emotionCountMap.set(emotion, emotionCountMap.get(emotion)+1);
      } else {
        emotionCountMap.set(emotion,1);
      }
    })
    console.log(emotionCountMap)
    return { body: JSON.stringify(data) };
  } catch (err) {
    console.error(err)
    return { error: err };
  }


  // const indexFace = () =>
  //   rekognition
  //     .indexFaces({
  //       CollectionId: COLLECTION_ID,
  //       ExternalImageId,
  //       Image: { Bytes: Buffer.from(body.image, "base64") },
  //     })
  //     .promise();

  // const persistMetadata = () =>
  //   dynamo
  //     .putItem({
  //       Item: {
  //         CollectionId: { S: COLLECTION_ID },
  //         ExternalImageId: { S: ExternalImageId },
  //         FullName: { S: body.fullName },
  //       },
  //       TableName: FACES_TABLENAME,
  //     })
  //     .promise();

  // try {
  //    fetchCount(body.sessionId,'dog');
  //   //await persistMetadata();
  //   return respond(200, { ExternalImageId });
  // } catch (e) {
  //   console.log(e);
  //   return respond(500, { error: e });
  // }
};

//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------

const fetchFaces = async (imageBytes,sessionId, displayImageTag) => {
  /*
    Detect Faces
    Uses Rekognition's DetectFaces functionality
  */
  var emotion = "TEST";
  const facesTest = {
    TestName: "Face Detection",
    EmotionName: "Emotion Type"
  };

  const detectFaces = () =>
    rekognition.detectFaces({ Image: { Bytes: imageBytes },Attributes:["EMOTIONS"]}).promise();
    const id = uuid();
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = currentDate.getDate().toString().padStart(2, '0'); 
    const year = currentDate.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    console.log(formattedDate);
    const persistMetadata = () =>
      dynamo
      .putItem({
        Item: {
          ExternalImageId: { S: id },
          sessionId: { S: sessionId },
          date: {S: formattedDate},
          displayImageTag: { S: displayImageTag },
          emotionRecorded : {S: emotion}
          
        },
        TableName: FACES_TABLENAME,
      })
      .promise();

  try {
    const faces = await detectFaces();
    console.log("FACES =====" + faces);
    const nFaces = faces.FaceDetails.length;
    facesTest.Success = nFaces === 1;
    facesTest.Details = nFaces;
    facesTest.EmotionName = faces.FaceDetails[0].Emotions[0].Type;
    emotion = facesTest.EmotionName;
    console.log("Saving to Dynamo DB ----#2" + emotion)
    await persistMetadata();
  } catch (e) {
    console.log(e);
    facesTest.Success = false;
    facesTest.Details = "Server error";
  }
  return facesTest;
};


exports.processHandler = async (event) => {
  console.log("entering process handler")
  const body = JSON.parse(event.body);
  console.log("********body*********" + JSON.stringify(body));

  const imageBytes = Buffer.from(body.image, "base64");

  const result = await Promise.all([
   // fetchLabels(imageBytes),
   //searchForIndexedFaces(imageBytes),
    fetchFaces(imageBytes, body.sessionId, body.displayImageTag)
    //fetchModerationLabels(imageBytes),
  ]);

  const answer =  respond(200, result.flat());
  console.log("answer------------" + JSON.stringify(answer));
  return answer;
};
