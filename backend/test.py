import base64
import cv2
import numpy as np
import face_recognition


# with open("food.jpeg", "rb") as image2string:
#     converted_string = base64.b64encode(image2string.read())
# print(converted_string)
  
# with open('encode.bin', "wb") as file:
#     file.write(converted_string)


def data_uri_to_cv2_img(uri):
    nparr = np.fromstring(base64.b64decode(uri), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img


file = open('encode.bin', 'r')
byte = file.read()
file.close()


# jpg_original = base64.b64decode(byte)

# imgElon=cv2.cvtColor(jpg_original,cv2.COLOR_BGR2RGB)

# cv2.imshow("Elon mUsk",imgElon)
img = data_uri_to_cv2_img(byte)
cv2.imshow("Elon mUsk",img)


cv2.waitKey(0)

cv2.destroyAllWindows()


