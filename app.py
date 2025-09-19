from flask import Flask, request, jsonify, render_template , send_from_directory, url_for, redirect
from flask_cors import CORS
from models import db, Order, OrderItem, initialize_db, User
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError

from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt 

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///orders.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'shakoor'
CORS(app)

# Initialisiere die Datenbank
initialize_db(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

bcrypt = Bcrypt(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id)) #that user_id was causing some issues

class LoginForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(
        min=4, max=20)], render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[InputRequired(), Length(
        min=4, max=20)], render_kw={"placeholder": "Password"})  

    submit = SubmitField("Login")

# Index Route
@app.route('/')
def home():
    return render_template('index.html')

#checkout Route
@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

#admin Route
@app.route('/admin', methods=['GET', 'POST'])
@login_required
def admin():
    return render_template('admin.html')

#confirmation Route
@app.route('/confirmation')
def confirmation():
    return render_template('confirmation.html')

#Privacy Policy Route
@app.route('/privacy_policy')
def privacy():
    return render_template('Datenschutz.html')

#Privacy Policy Route
@app.route('/additives')
def additives():
    return render_template('zusatsstoffe.html')

#Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user)
                return redirect(url_for('admin'))
    return render_template('login.html', form=form)

#logout Route
@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

#Print Receipt
# @app.route("/api/orders/<int:order_id>/receipt", methods=["GET"])
# def print_receipt(order_id):
#     try:
#         order = Order.query.get_or_404(order_id)
#         return render_template("receipt.html", order=order)
#     except Exception as e:
#         return f"Error generating receipt: {str(e)}", 500
@app.route("/api/orders/<int:order_id>/receipt", methods=["GET"])
def print_receipt(order_id):
    try:
        order = Order.query.get_or_404(order_id)
        total = sum(item.price * item.quantity for item in order.items)
        return render_template("receipt.html", order=order, total=total)
    except Exception as e:
        return f"Error generating receipt: {str(e)}", 500


# GET: Alle Bestellungen abrufen
@app.route("/api/orders", methods=["GET"])
def get_orders():
    try:
        orders = Order.query.all()
        return jsonify([
            {
                "id": order.id,
                "customer": order.customer,
                "deliveryOption": order.delivery_option,
                "address": order.address,
                "pickupTime": order.pickup_time,
                "paymentMethod": order.payment_method,
                "date": order.date.isoformat(),
                "phoneNumber": order.phone_number,
                "items": [
                    {"name": item.name, "price": item.price, "quantity": item.quantity}
                    for item in order.items
                ]
            }
            for order in orders
        ]), 200
    except Exception as e:
        return jsonify({"error": "Fehler beim Abrufen der Bestellungen", "details": str(e)}), 500

# POST: Neue Bestellung hinzufügen
@app.route("/api/orders", methods=["POST"])
def create_order():
    try:
        data = request.get_json()

        # Validierung der Eingabedaten
        if not data.get("name") or not data.get("items"):
            return jsonify({"error": "Name und Artikel sind erforderlich"}), 400

        new_order = Order(
            customer=data["name"],
            delivery_option=data["deliveryOption"],
            address=data.get("address"),
            pickup_time=data.get("pickupTime"),
            payment_method=data["paymentMethod"],
            phone_number=data["phoneNumber"],
        )
        for item in data["items"]:
            new_order.items.append(OrderItem(name=item["name"], price=item["price"], quantity=item["quantity"]))
        db.session.add(new_order)
        db.session.commit()
        return jsonify({"message": "Bestellung erfolgreich hinzugefügt"}), 201
    except Exception as e:
        return jsonify({"error": "Fehler beim Hinzufügen der Bestellung", "details": str(e)}), 500

# DELETE: Bestellung löschen
@app.route("/api/orders/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    try:
        order = Order.query.get(order_id)
        if not order:
            return jsonify({"error": "Bestellung nicht gefunden"}), 404
        db.session.delete(order)
        db.session.commit()
        return jsonify({"message": "Bestellung erfolgreich gelöscht"}), 200
    except Exception as e:
        return jsonify({"error": "Fehler beim Löschen der Bestellung", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
