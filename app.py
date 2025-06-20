from flask import Flask, request, jsonify, render_template , send_from_directory
from flask_cors import CORS
from models import db, Order, OrderItem, initialize_db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///orders.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)

# Initialisiere die Datenbank
initialize_db(app)

# Index Route
@app.route('/')
def home():
    return render_template('index.html')

#checkout Route
@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

#admin Route
@app.route('/admin')
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
