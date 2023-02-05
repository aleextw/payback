FROM python:3.11

WORKDIR /code

COPY ./requirements.txt ./requirements.txt

RUN apt-get update
RUN apt-get install -y ffmpeg libsm6 libxext6 libgl1-mesa-glx python3-pil tesseract-ocr

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY ./app ./app

EXPOSE 8000

# CMD [ "gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "app.main:app"]

# Use this command on windows since gunicorn is not supported
# CMD ["uvicorn", "--workers", "4", "app.main:app"]

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]