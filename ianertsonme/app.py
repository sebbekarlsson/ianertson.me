from flask import Flask

from ianertsonme.views.index import bp as index_bp
from ianertsonme.views.content import bp as content_bp


app = Flask(__name__)

app.register_blueprint(index_bp)
app.register_blueprint(content_bp)

app.secret_key = '1923919AKSDKASD39'
