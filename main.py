from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    with open('index.html', 'r', encoding="utf-8") as file:
        content = file.read()
    return content

if __name__ == '__main__':
    app.run(port=1000, debug=True)