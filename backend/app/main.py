from starlite import Starlite, post, get
from starlite.config.cors import CORSConfig

from urllib.request import urlopen

import cv2
import numpy as np

import pytesseract

from pymongo import MongoClient
from bson.objectid import ObjectId

import logging
from starlite.status_codes import HTTP_500_INTERNAL_SERVER_ERROR
from starlite.response import Response
from starlite.utils import create_exception_response
from starlite.connection import Request
from starlite import Starlite

cc = CORSConfig(allow_origins=["*"], allow_methods=["POST"], allow_headers=["*"])

logger = logging.getLogger(__name__)


def logging_exception_handler(request: Request, exc: Exception) -> Response:
    """
    Logs exception and returns appropriate response.

    Parameters
    ----------
    request : Request
        The request that caused the exception.
    exc :
        The exception caught by the Starlite exception handling middleware and passed to the
        callback.

    Returns
    -------
    Response
    """
    logger.error("Application Exception", exc_info=exc)
    return create_exception_response(exc)


def get_database():
    client = MongoClient("mongodb://localhost:27017/")
    return client["receipts"]


@get("/api/receipts/{id: str}")
def get_receipt(id: str) -> dict:
    try:
        db = get_database()
        data = db.receipts.find_one({"_id": ObjectId(id)}, {"_id": 0})
        print(data)
        print(type(data))
        return data
    except Exception as e:
        print(e)
        return {}


@post("/api/create")
def create_receipt(data: dict) -> str:
    try:
        db = get_database()
        result = db.receipts.insert_one(data)
        print(result.inserted_id)
        print(type(result.inserted_id))
        return str(result.inserted_id)
    except Exception as e:
        print(e)
        return ""


@post("/api/receipt_cv")
def receipt_cv(data: dict) -> dict:
    # print(data)

    x_pct = float(data["x"]) / 100
    y_pct = float(data["y"]) / 100
    width_pct = float(data["width"]) / 100
    height_pct = float(data["height"]) / 100

    with urlopen(data["imgSrc"]) as response:
        data = response.read()

    try:
        nparr = np.fromstring(data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)  # cv2.IMREAD_COLOR in OpenCV 3.1

        height, width, channel = image.shape

        crop_x_1 = int(x_pct * width)
        crop_y_1 = int(y_pct * height)
        crop_x_2 = int((x_pct + width_pct) * width)
        crop_y_2 = int((y_pct + height_pct) * height)

        image = image[
            crop_y_1:crop_y_2,
            crop_x_1:crop_x_2,
        ]

        height, width, channel = image.shape
        image = cv2.resize(
            image, (2 * width, 2 * height), interpolation=cv2.INTER_LINEAR
        )

        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        (T, image) = cv2.threshold(image, 0, 255, cv2.THRESH_TRIANGLE)

        extracted_text = pytesseract.image_to_string(image, config="--psm 6")

        items = {}

        for row in extracted_text.split("\n"):
            print(row)
            if row:
                *name, price = (
                    row.replace("$", "", 1)
                    .replace(",", ".")
                    .replace(" . ", ".")
                    .replace(" .", ".")
                    .replace(". ", ".")
                    .split(" ")
                )

                if (filtered_price := price).replace(".", "", 1).isdigit():
                    items[" ".join(name)] = float(filtered_price)

        print(items)

        return {
            "documentName": "",
            "people": [],
            "items": [[i, items[i], []] for i in items],
            "serviceCharge": 10,
            "gst": 9,
            "isServiceCharge": True,
            "isGst": True,
        }

    except Exception as e:
        print(e)

        return {
            "documentName": "",
            "people": [],
            "items": [
                ["Rice", 3, []],
                ["Yuzu Chawanmushi", 7, []],
                ["Sashimi", 10, []],
            ],
            "serviceCharge": 10,
            "gst": 9,
            "isServiceCharge": True,
            "isGst": True,
        }


app = Starlite(
    exception_handlers={HTTP_500_INTERNAL_SERVER_ERROR: logging_exception_handler},
    route_handlers=[receipt_cv, create_receipt, get_receipt],
    cors_config=cc,
)
