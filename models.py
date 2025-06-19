from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    customer = db.Column(db.String(100), nullable=False, index=True)  # Index für bessere Filterung
    delivery_option = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(200), nullable=True)
    pickup_time = db.Column(db.String(50), nullable=True)
    payment_method = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow, index=True)  # Index für Sortierung nach Datum
    items = db.relationship("OrderItem", backref="order", cascade="all, delete-orphan")

class OrderItem(db.Model):
    __tablename__ = "order_items"
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

# Initialisiere die Datenbank
def initialize_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
