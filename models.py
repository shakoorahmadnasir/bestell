from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import UserMixin

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
    phone_number = db.Column(db.String(13), nullable=True) # ✅ New field
    deleted = db.Column(db.Boolean, default=False)  # soft delete flag
    items = db.relationship("OrderItem", backref="order", cascade="all, delete-orphan")

class OrderItem(db.Model):
    __tablename__ = "order_items"
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    # ✅ New fields
    toppings = db.Column(db.String(255), nullable=True)   # Comma-separated list
    comment = db.Column(db.String(255), nullable=True)    # Customer comment

class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

# Initialisiere die Datenbank
def initialize_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
