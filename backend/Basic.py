import cv2
import numpy as np
import face_recognition


imgElon=face_recognition.load_image_file("imageBasic/test1.jpg")
imgElon=cv2.cvtColor(imgElon,cv2.COLOR_BGR2RGB)


imgTest=face_recognition.load_image_file("imageBasic/test2.jpg")
imgTest=cv2.cvtColor(imgTest,cv2.COLOR_BGR2RGB)

#Find the face location from the image
faceLoc=face_recognition.face_locations(imgElon)[0]
encodeElon=face_recognition.face_encodings(imgElon)[0]  #This is use for verfication of face
cv2.rectangle(imgElon,(faceLoc[3],faceLoc[0]),(faceLoc[1],faceLoc[2]),(255,0,255),2)

faceLocTest=face_recognition.face_locations(imgTest)[0]
encodeElonTest=face_recognition.face_encodings(imgTest)[0]  #This is use for verfication of face
cv2.rectangle(imgTest,(faceLocTest[3],faceLocTest[0]),(faceLocTest[1],faceLocTest[2]),(255,0,255),2)

result=face_recognition.compare_faces([encodeElon],encodeElonTest)
faceDis=face_recognition.face_distance([encodeElon],encodeElonTest)
print(result[0],faceDis)

if(result[0]):
    cv2.putText(imgTest, f'{result} {round(faceDis[0], 2)}', (60, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
else:
    cv2.putText(imgTest, f'{result} {round(faceDis[0], 2)}', (60, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

imgElon=cv2.resize(imgElon,(512,512))
imgTest=cv2.resize(imgTest,(512,512))

cv2.imshow("Elon mUsk",imgElon)
cv2.imshow("elon Test",imgTest)

cv2.waitKey(0)

cv2.destroyAllWindows()