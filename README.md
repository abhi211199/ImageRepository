# ImageRepository
Welcome to Image Repository, your own library of images, which helps you to add, delete and classify images into groups! The App is built on top of ReactJS. 
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="500" />  | ![Firebase](https://miro.medium.com/max/300/1*R4c8lHBHuH5qyqOtZb3h-w.png)  | ![TesseractJS](https://twilio-cms-prod.s3.amazonaws.com/images/tesseract-featured-image.width-808.png)  | ![Tensorflow](https://pbs.twimg.com/profile_images/1103339571977248768/FtFnqC38.png)  |
|---|---|---|---|
## Algorithm/Features
- The images chosen by a user are uploaded to Firebase Storage/ Google Cloud Platform storage buckets.(To choose an image, hover to the cloud button at the bottom right position)
- The Image is passed through [TesseractJS](https://tesseract.projectnaptha.com/) to identify characters!(OCR)
- The Image is then passed through [TensorflowJS's MobileNet Image Classification model](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet) to get labels related to the image.
- The data collected from the above two steps is uploaded to Firestore database(NoSQL).
- To search image labels, type a search term in the search box.(multiple queries, should be comma separated, eg: "cat, grass" with no trailing commas)
- A list of identified labels appears on the left sidebar, which on clicking, shows the images corresponding to the clicked label!
- The images can also searched on the basis of another chosen image, to those the image query, click on the camera button next to the search bar!
- The images can be deleted from the library by clicking the `Delete` button corresponding to an image.
- Information about images can be retreived by clicking the `Details` button corresponding to an image.

## Use a production Version
The production version is hosted at https://imagerepository-38d54.web.app/

## Use the development Version
- Make sure, the latest version of Node and NPM are installed!
- Clone the project!
- Install the necessary NPM dependencies using `npm install`.
- [Create](https://firebase.google.com/docs/web/setup) a Firebase project and integrate the App with the Firebase project!
- Place the Firebase config in ImageRepository/FirebaseConfig.js in the following format!
```js
var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

export default firebaseConfig;
```
- To start the project, use `npm start`.

## Screenshots!
| ![](https://user-images.githubusercontent.com/36303692/92319489-6ca6ea80-f036-11ea-9ae6-1615f1a7b923.png)  | ![](https://user-images.githubusercontent.com/36303692/92319493-6f094480-f036-11ea-9f42-d2d15ca02b55.png)  |
|---|---|
| ![](https://user-images.githubusercontent.com/36303692/92319494-6fa1db00-f036-11ea-9f81-9f0be3b0a7cb.png)  | ![](https://user-images.githubusercontent.com/36303692/92319495-703a7180-f036-11ea-83f8-32f93ac5c1f4.png)  |

### Notes!
- The app uses TensorflowJS MobileNet's pretrained model which only use browser resources instead of a GPU, so the performance may be a bit lower, as compared to **paid** cloud solutions like Google Cloud Vision, Amazon Rekognition or Azure Computer Vision!
- **Only for the users testing the development version** - While running `npm run build`, The user may face issues in the production version,(not the currently hosted version), please refer [this](https://github.com/tensorflow/tfjs/issues/3384#issuecomment-667607535) to fix the Tensorflow issue.
