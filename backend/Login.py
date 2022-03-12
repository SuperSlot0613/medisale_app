import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
import sys
import json

path='Knowimages'
images=[]
className=[]
myList=os.listdir(path)
# print(myList)
response=False
imageName=""

for cl in myList:
    curImg=cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    className.append(os.path.splitext(cl)[0])
# print(className)

def findEncoding(images):
    encodeList=[]

    for img in images:
        img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        encode=face_recognition.face_encodings(img)
        encodeList.append(encode)
    return encodeList

encodeListKnown=findEncoding(images)
# print(len(encodeListKnown))
# print("Encoding Complete")

img=cv2.imread('./Uknowimages/image.png')
# cv2.imshow("window",img)
val=0

while val==0:
    # cv2.imshow("video",img)
    imgs=cv2.resize(img,(0,0),None,0.25,0.25)
    imgs=cv2.cvtColor(imgs,cv2.COLOR_BGR2RGB)

    faceCurFrame=face_recognition.face_locations(imgs)
    encodesCurFrame=face_recognition.face_encodings(imgs)
    # print(encodesCurFrame)

    for encodeFace,faceLoc in zip(encodesCurFrame,faceCurFrame):
        matches=face_recognition.compare_faces(encodeListKnown,encodeFace)
        # print(matches)
        faceDis=face_recognition.face_distance(encodeListKnown,encodeFace)

        # print(faceDis)
        matchIndex=np.argmin(faceDis)
        # print(matchIndex)

        if np.any(matches):
            response=True
            name=className[matchIndex%(len(className))].upper()
            # print(name,response)
            imageName=name
            break
    val=1

if response==True:
    res={
        "name":imageName,
        "response":True
    }
    print(json.dumps(res))
    sys.stdout.flush(res)
else:
    res={
        "response":False
    }
    print(json.dumps(res))
    sys.stdout.flush(res)

cv2.waitKey(0)
cv2.destroyAllWindows()