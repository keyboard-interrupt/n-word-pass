import cv2
from flask import Flask, request
from os import path
from random import randint
from deepface import DeepFace
from os import remove

print('imported packages')

app = Flask(__name__)


@app.route('/detect-race', methods=['POST'])
def detect_race():
    photo = request.files['photo']
    filename = path.join('uploads', str(randint(0, 4096)) + photo.filename)

    if filename.split('.')[-1] not in ['png', 'jpg', 'jpeg']:
        return {'error': 'photo must be of type png, jpg or jpeg'}

    # temporarily saving
    photo.save(filename)

    # reading image
    try:
        img = cv2.imread(filename)
    except:
        return {'error': 'invalid image'}

    # deleting file
    remove(filename)

    # detecting race
    try:
        predictions = DeepFace.analyze(img, actions=['race'])
    except:
        return {'error': 'could not find face'}

    # responding with predictions
    return {"race": predictions}


if __name__ == '__main__':
    app.run(debug=True)
