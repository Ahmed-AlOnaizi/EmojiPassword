from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests for development

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)  # Storing as plain text

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    pin = data.get("pin")  # This will be stored in plain text

    if not username or not pin:
        return jsonify({"message": "Missing username or PIN"}), 400

    # Check if the user already exists
    if User.query.filter_by(username=username).first() is not None:
        return jsonify({"message": "User already exists"}), 400

    # Create new user with plain text password
    new_user = User(username=username, password=pin)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Registered successfully!"}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    pin = data.get("pin")

    if not username or not pin:
        return jsonify({"message": "Missing username or PIN"}), 400

    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"message": "User not found"}), 400

    # Compare plain text passwords
    if user.password == pin:
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 400
    

@app.route('/admin')
def admin_page():
    # Query all users
    users = User.query.all()
    # Render the admin.html template, passing the users
    return render_template('admin.html', users=users)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True)
