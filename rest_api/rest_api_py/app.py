from operator import ne
import re
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime, timezone
from sqlalchemy import func
from flask_migrate import Migrate

from sqlalchemy.orm import backref, relationship
from flask_cors import CORS, cross_origin


#Configuracion de app

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/juan_sql'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

migrate=Migrate(app,db)


#Modelos 
class Usuario(db.Model):
    __tablename__='usuario'
    id=db.Column(db.Integer,primary_key=True)
    nombre=db.Column(db.String(100))
    email=db.Column(db.String(100))
    tarjeta=db.Column(db.Integer)
    fecha = db.Column(db.DateTime(timezone=True), default=func.now())

   
    def __init__(self,nombre,email,tarjeta):
        self.nombre=nombre
        self.email=email
        self.tarjeta=tarjeta
        

class Product(db.Model):
    __tablename__='product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70), unique=True)
    image = db.Column(db.String(200))
    price=db.Column(db.Integer)
    tax=db.Column(db.Integer)
    def __init__(self, name,image,price,tax):
        self.name=name
        self.image=image
        self.price = price
        self.tax = tax

db.create_all()

class UsuarioSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','email','tarjeta','fecha')

class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'image','price','tax')

usuario_schema=UsuarioSchema()
usuarios_schema=UsuarioSchema(many=True)

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


#Enrutamiendo y funciones
@app.route('/postuser',methods=['Post'])
def create_user():
    nombre=request.json['nombre']
    email=request.json['email']
    tarjeta=request.json['tarjeta']
    

    new_user=Usuario(nombre,email,tarjeta)
    db.session.add(new_user)
    db.session.commit()
    return usuario_schema.jsonify(new_user)


@app.route('/postproduct', methods=['Post'])
def create_task():
    name = request.json['name']
    price = request.json['price']
    image=request.json['image']
    tax=request.json['tax']
    new_product= Product(name, price,image,tax)

    db.session.add(new_product)
    db.session.commit()

    return product_schema.jsonify(new_product)

@app.route('/products', methods=['GET'])
def get_tasks_with_taxes():
    all_tasks = Product.query.all()
    result = products_schema.dump(all_tasks)
    descuento=[]
    iva=[]
    for i in result:
        if i['id']==1 and datetime.now().hour%2==0:
            i['price']= i['price']-(i['price']*(20/100))
            descuento.append(i)
            return jsonify(descuento)
        if i['id']==1 and datetime.now().hour%2!=0:
            i['price']=i['price']+(i['price']*(i['tax']/100))
            iva.append(i)
            return jsonify(iva) 
    return jsonify(result) 


@app.route('/all', methods=['GET'])
def get_tasks():
    all_tasks = Product.query.all()
    result = products_schema.dump(all_tasks)
    return jsonify(result)

@app.route('/usuarios', methods=['GET'])
def get_users():
    all_tasks = Usuario.query.all()
    result = usuarios_schema.dump(all_tasks)
    return jsonify(result)

@app.route('/products/<id>', methods=['GET'])
def get_task(id):
    task = Product.query.get(id)
    return products_schema.jsonify(task)


@app.route('/products/<id>',methods=['PUT'])
def up_pro(id):
    task=Product.query.get(id)
    name=request.json['name']
    price=request.json['price']
    image=request.json['image']
    tax=request.json['tax']

    task.name=name
    task.price=price
    task.image=image
    task.tax=tax

    db.session.commit()

    return product_schema.jsonify(task)




if __name__ == "__main__":
    app.run(debug=True)