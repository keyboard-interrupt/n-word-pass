import cv2
from flask import Flask, request
from os import path
from random import randint

app = Flask(__name__)


@app.route('/detect-race', methods=['POST'])
def detect_race():
    photo = request.files['photo']
    filename = path.join('uploads', str(randint(0, 4096)) + photo.filename)
    photo.save(filename)
    
    return {"race": "black"}


if __name__ == '__main__':
    app.run(debug=True)
