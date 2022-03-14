from flask import Flask, request
import cv2
import numpy as np
import face_recognition
import json
import base64

app = Flask(__name__)

def data_uri_to_cv2_img(uri):
    nparr = np.frombuffer(base64.b64decode(uri), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img
@app.route("/")
def hello():
    return "Hello World"


@app.route('/imagechecker', methods = ['POST']) 
def faceverification(): 
    data = request.get_json() 
    # print(data)

    document = data['document'] 
    faceimage=data['faceimage']

    # print("This is first image",document)

    documentimg = data_uri_to_cv2_img(document)
    faceimage=data_uri_to_cv2_img(faceimage)

    # imgdocument=face_recognition.load_image_file(documentimg)
    imgdocument=cv2.cvtColor(documentimg,cv2.COLOR_BGR2RGB)


    # imgface=face_recognition.load_image_file(faceimage)
    imgface=cv2.cvtColor(faceimage,cv2.COLOR_BGR2RGB)

    faceLoc=face_recognition.face_locations(imgdocument)[0]
    encodedocument=face_recognition.face_encodings(imgdocument)[0]  
    # # cv2.rectangle(imgdocument,(faceLoc[3],faceLoc[0]),(faceLoc[1],faceLoc[2]),(255,0,255),2)

    faceLocTest=face_recognition.face_locations(imgface)[0]
    encodeface=face_recognition.face_encodings(imgface)[0] 
    # # cv2.rectangle(imgface,(faceLocTest[3],faceLocTest[0]),(faceLocTest[1],faceLocTest[2]),(255,0,255),2)

    result=face_recognition.compare_faces([encodedocument],encodeface)
    faceDis=face_recognition.face_distance([encodedocument],encodeface)

    cv2.waitKey(0)

    cv2.destroyAllWindows()

    if(result[0]):
       return json.dumps({"result":"true"})
    return json.dumps({"result":"false"})


if __name__ == "__main__":
    app.debug = True
    app.run(port=5000)