from flask import Flask, render_template, request, redirect, session, jsonify

app = Flask(__name__)

app.secret_key = "capivara"

@app.route("/")
def pg_inicio():
    return render_template("index.html")

app.run(debug=True)