FROM python:3-alpine

RUN addgroup -S flask && adduser -S flask -G flask

RUN mkdir -p /home/flask/app && chown -R flask:flask /home/flask/app

WORKDIR /home/flask/app

COPY requirements*.txt ./

USER flask

RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install --upgrade pip && \
    pip3 install -r requirements.txt

COPY --chown=flask:flask . .

EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD [ "app.py" ]
