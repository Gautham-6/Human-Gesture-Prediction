const tf = require('@tensorflow/tfjs-node');
const posenet = require('@tensorflow-models/posenet');
const fs = require("fs");
let converter = require('json-2-csv');


const {
    createCanvas, Image
} = require('canvas')
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;


const tryModel = async(paths,path_folder) => {
    //console.log('start');
    const net = await posenet.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: 513,
      multiplier: 0.75
    });
    const img = new Image();
    img.src = paths;
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const input = tf.browser.fromPixels(canvas);
    const pose = await net.estimateSinglePose(input, imageScaleFactor, flipHorizontal, outputStride);
    // console.log(pose);
    // for(const keypoint of pose.keypoints) {
    //     console.log(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`);
    // }
    //console.log(pose.keypoints);
//     let documents = pose.keypoints;
//
//     let json2csvCallback = function (err, csv) {
//     if (err) throw err;
//     console.log(csv);
// };
//
// converter.json2csv(documents, json2csvCallback);
let rows = ""

for(const value of pose.keypoints ){
rows = rows +","+value.score+","+value.position.x+","+value.position.y

}
rows = rows.substring(1)+"\n"
console.log(rows+"\n");

fs.appendFileSync(path_folder+'data.csv', rows);
// setTimeout(function() {
//   fs.appendFileSync(path_folder+'data.csv', rows);
// }, 100);
    //console.log('end');
}



const extract = async(path_folder)=>{

  //let path_to_images = "C:/Users/glakkava/Documents/ASU/CS535/AssignmentGestureDetection/HumanGesture/HumanGesture/public/uploads/GESTURE_PRACTICE_flooding_1655662631323_Gautham/"
    //let path_to_images = "C:/Users/glakkava/Documents/ASU/CS535/AssignmentGestureDetection/HumanGesture/HumanGesture/public/uploads/GESTURE_PRACTICE_domain_1655661931397_Gautham/"
  var stream = fs.createWriteStream(path_folder+"data.csv");
  stream.once('open', function() {
    stream.write("Nose_Score,Nose_X,Nose_Y,LeftEye_Score,LeftEye_X,LeftEye_Y,RightEye_Score,RightEye_X,RightEye_Y,LeftEar_Score,LeftEar_X,LeftEar_Y,RightEar_Score,RightEar_X,RightEar_Y,LeftShoulder_Score,LeftShoulder_X,LeftShoulder_Y,RightShoulder_Score,RightShoulder_X,RightShoulder_Y,LeftElbow_Score,LeftElbow_X,LeftElbow_Y,RightElbow_Score,RightElbow_X,RightElbow_Y,LeftWrist_Score,LeftWrist_X,LeftWrist_Y,RightWrist_Score,RightWrist_X,RightWrist_Y,LeftHip_Score,LeftHip_X,LeftHip_Y,RightHip_Score,RightHip_X,RightHip_Y,LeftKnee_Score,LeftKnee_X,LeftKnee_Y,RightKnee_Score,RightKnee_X,RightKnee_Y,LeftAnkle_Score,LeftAnkle_X,LeftAnkle_Y,RightAnkle_Score,RightAnkle_X,RightAnkle_Y \n");
    stream.end();
  });
  //tryModel(path_to_images+"0.png");

  // fs.readdir(path_to_images, function (err, files) {
  //     //handling error
  //     if (err) {
  //         return console.log('Unable to scan directory: ' + err);
  //     }
  //     //listing all files using forEach
  //     files.forEach(function (file) {
  //         // Do whatever you want to do with the file
  //         console.log(file);
  //     });
  // });
  //
  fs.readdir(path_folder, function(err, files){
    files = files.map(function (fileName) {
      return {
        name: fileName,
        time: fs.statSync(path_folder + '/' + fileName).mtime.getTime()
      };
    })
    .sort(function (a, b) {
      return a.time - b.time; })
    .map(function (v) {
      return v.name; });

      files.forEach(function (file) {
          //console.log(file);
          tryModel(path_folder+file,path_folder);
      });

  });

}

// let csvexists = async(insider)=>{
//   fs.readdir(insider, (err, files) => {
//     if(files.includes("data.csv")){
//       console.log("file undi");
//       return true
//     }else{
//       console.log("file ledu");
//       return false
//     }
//
// //   files.forEach(function (file) {
// //       //console.log(file);
// //       if(file.includes("data.csv")){
// // console.log(file);
// //         return true
// //       }
// //
// //   });
//
//    });
//
// }

//let all_videos_path = "C:/Users/glakkava/Documents/ASU/CS535/AssignmentGestureDetection/HumanGesture/HumanGesture/public/uploads/GESTURE_PRACTICE_firewall_1654381940749_Gautham/"

let all_videos_path = "C:/Users/glakkava/Documents/ASU/CS535/AssignmentGestureDetection/HumanGesture/HumanGesture/public/uploads/"
const args = process.argv;
console.log(args);

if(args[2]){
console.log(all_videos_path+args[2]+"/");
extract(all_videos_path+args[2]+"/");
}else{
//extract(all_videos_path+"GESTURE_PRACTICE_acpower_1654375244354_Gautham/");
console.log("provide parameters for the frames");
}


// fs.readdir(all_videos_path, function(err, files){
// files.forEach(file => {
//   if(!file.includes(".mp4")){
// extract(all_videos_path+file+"/")
//   }
// });
//
// })




// fs.readdir(all_videos_path, (err, files) => {
//   files.forEach(file => {
//     if(!file.includes(".mp4")){
//       //console.log(all_videos_path+file);
//       // setTimeout(function() {
//       //   //if(!csvexists(all_videos_path+file+"/")){
//       //     //extract(all_videos_path+file+"/")
//       //     fs.unlinkSync(all_videos_path+file+"/data.csv")
//       //     //console.log("2 file ledu");
//       //   //}else{
//       //   //  console.log("2 file undi");
//       //   //}
//       // }, 6000);
//
//       //extract(all_videos_path+file+"/")
//
//
//     }
//   });
// });







//extract(all_videos_path);
