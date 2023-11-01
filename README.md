## CogniCare

  Our innovative app leverages various industry-standard, highly efficient services powered by AWS to track subtle changes in emotions over time and generate trends in levels of emotional intensity for different emotional categories, serving as a pivotal resource for medical professionals for potentially identifying preclinical symptoms and early detection of Alzheimer’s disease. 
  
  The motivation for the methodology behind the app stems from previous research conducted by the Center for Alzheimer’s Disease and the National Council for Scientific and Technological Development, which has suggested a possible link between negative emotions and the onset of developing Alzheimer’s. Emotion processing impairments are harder to detect for people experiencing mild stages of Alzheimer’s, but various studies—such as neuroimaging studies—have shown that deficits in emotional processing can be a strong clinical symptom as a feature of early stages of neurodegenerative disorders such as Alzheimer’s. Our app is especially important because PET and CT scans that measure brain damage are extremely expensive and will likely only inform the patient once their brain has significant and notable brain damage. However, for our target users, this will not be an efficient and cost-effective method, and our app will provide targeted suggestions of the possibility of the disease developing in the comfort of their homes. 
  
  While using the app each month, the user uploads images, which will be categorized by machine learning models. Then, they’ll be presented with a series of these images, and their respective emotional responses will be tracked. Over time, the user takes more of these tests, and the app will generate trends in overall emotion fluctuations. Combining all the data, it’ll make a logical prediction that a person may develop Alzheimer’s if they demonstrate more tendency toward negative emotions in later detections.  Predictions are based on conclusive evidence and the confidence levels of certain types of emotions, and they'll be compared/analyzed relative to their initial state.If a patient wishes to consult his/her doctor on potential future implications based on the data collected and his/her situation, doctors can flexibly work with them to create action plans to prevent further spread and development.
  
  The app can be used anywhere and will be free of cost, with the primary motivation focused on providing quick and accessible solutions to people globally. We hope to broaden the scope of the app to include additional neurodegenerative diseases that relate to emotional dysregulation, such as dementia, to extend the impact of our app to a larger target population.
  

### Inspiration

  As a whole, our group each had a teammate who was affected by Alzheimer’s in one way or another. Whether it be a grandfather suffering to remember his children’s names or a mother struggling to remember her birthday, Alzheimer’s is a very serious condition that has affected each of our lives. 
  
  In the US alone, 6.7 million Americans 65 years and older are living with Alzheimer’s, one of them being our very own teammate’s grandfather. Many struggle with simple tasks such as remembering their name or brushing their teeth; they are slowly losing themselves and their life through this degenerative disease.  After witnessing the intense effects and issues of this problem, we all decided that we could not be stagnant and wait for change as everyone deserves to remember their lives. 
  
  Therefore, we decided to tackle a specific concern regarding Alzheimer’s: the diagnosis. Alzheimer’s currently does not have a cure, but there are treatments that alleviate the intensity of the disease. However, for those diagnosed with Alzheimer’s, the majority are diagnosed during stage 4 of Alzheimer’s: More Than Memory Loss. This is the 4th stage of the 7 stages of Alzheimer’s, according to Penn Medicine, and is considered relatively far into the Alzheimer’s journey as patients are now having difficulties with language, organization, and calculation. Because of this, treatments that are effective in treating Alzheimer’s are not as relieving as they could be due to the delay in detection. This number is not expected to decrease anytime soon with the extensive measures required to detect Alzheimer’s. The multiple PTE Scans, blood tests, depression screens, and more are all time-consuming and ineffective as the detection of the disease occurs far beyond its initial stage. Not to add, the amount of money required to have the testing done is significant and is, therefore, not accessible to everyone. Overall, the diagnosis of Alzheimer’s is currently lacking in many aspects, specifically efficiency and accessibility and we wanted to address these setbacks.
  
  And so to help people detect accurate early signs of Alzheimer’s from the comfort of their homes with zero cost, we created an app that contributes to the progression of an Alzheimer’s 's-free world. With our actions, we were able to make a product that everyone and anyone could access to better their well-being and reduce the chance of other people’s loved ones developing Alzheimer's. 
  

### Technical Difficulties

  One of the biggest technical difficulties we faced was ensuring that our app could be a viable product with high rates of success and low rates of failure while detecting facial expressions. At first, we attempted to create our own custom machine learning (ML) models and Convolutional Neural Networks (CNNs) to detect and classify facial emotions. However, we plateaued at around 75% accuracy. We believed this cap to be insufficient, especially for an app that has considerable real-life implications like ours. Therefore, to ensure the maximum accuracy and effectiveness for our users, we decided to employ AWS’s Rekognition service. We modified our code to instead make API calls to the Rekognition service, achieving an accuracy of 99% on emotion detection at a nominal cost. 
  
  In addition, we prioritized high security and efficiency when executing the various components of our app. One of the main areas was storing our data since our app deals with highly sensitive data such as personal photos and faces. Therefore, we also decided to use AWS’s DynamoDB to store our information. We also decided to shift to other AWS services with the goal of optimizing our application for rapid and seamless deployment. This transition included the adoption of AWS Lambda to expedite the execution of our functions and computations with an eye toward minimizing cost, as well as the incorporation of AWS Cognito to streamline login security management, and AWS API Gateway to facilitate the orchestration of API calls. The utilization of a suite of AWS services allowed us to easily tackle our technical difficulties while delivering an efficient, ready-to-utilize, and cost-effective product. 


### Improvements

  In the envisioned 2.0 iteration of our application, an improvement would be the refinement of the post-session reports to optimize user-friendliness. Currently, our reporting mechanism is limited to graphical representations, which may at times pose challenges in terms of comprehensibility and effective communication of time-sensitive information. Therefore, we look towards the integration of a Large Language Model (LLM) or generative AI to generate text-based reports following each session, providing users with a more accessible means of interpreting the results.
  
  This text-based report will improve our app on many levels. Firstly, it will provide users with an assessment of whether there are discernible indications of Alzheimer's disease development. Secondly, it will provide recommendations on when it may be advisable for them to seek medical consultation. This improvement will provide users with valuable insights into their cognitive health, potentially prompting timely intervention in cases of concern.
  
  To obtain this improvement, several strategies must be considered. One strategy involves the development of a customely trained Large Language Model (LLM) for our specific purpose. Alternatively, we may utilize OpenAI's API to harness the capabilities of established models for generating text-based reports. Additionally, the utilization of AWS's Bedrock, with its suite of advanced machine-learning tools, stands as another viable option to explore. Each of these strategies merits thorough consideration, with a careful evaluation of factors such as model performance, scalability, and computational resource requirements to inform the ultimate selection of the most suitable approach.
  
  This 2.0 version not only promises to improve the user’s experience but also demonstrates our commitment to leveraging cutting-edge AI technologies to deliver an innovative solution that tackles the problem of Alzheimer’s. 

#### Tech Stack

-JavaScript<br>
-HTML<br>
-CSS<br>
-React<br>
-AWS Rekognition<br>
-AWS Lambda<br>
-AWS DynamoDB<br>
-AWS API Gateway<br>
-AWS Cognito<br>
